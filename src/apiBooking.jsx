import React, { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api, resource } from './api'
import { AuthForm, useSession } from './apiAuth'
import { PublicShell, Money } from './ui'

export function useApiResource(path) {
  const [state, setState] = useState({}), [version, setVersion] = useState(0)
  useEffect(() => {
    if (!path) return
    const controller = new AbortController()
    api(path, { signal: controller.signal }).then(data => setState({ path, data })).catch(error => { if (!controller.signal.aborted) setState({ path, error }) })
    return () => controller.abort()
  }, [path, version])
  return { ...(state.path === path ? state : {}), reload: () => setVersion(v => v + 1) }
}

let razorpayScript
function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve()
  if (!razorpayScript) razorpayScript = new Promise((resolve, reject) => {
    const script = document.createElement('script'); script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = resolve; script.onerror = () => { razorpayScript = null; script.remove(); reject(new Error('Unable to load Razorpay. Try again.')) }
    document.head.appendChild(script)
  })
  return razorpayScript
}

export function ServerCheckout({ listing, items, contactName, contactMobile, contactEmail = '', existingBooking }) {
  const session = useSession(), [quote, setQuote] = useState(null), [booking, setBooking] = useState(existingBooking)
  const [error, setError] = useState(''), [busy, setBusy] = useState(false), [config, setConfig] = useState(null)
  const key = useRef(crypto.randomUUID()), locked = useRef(false), active = useRef(true), gateway = useRef(null)
  const payload = JSON.stringify({ listing_uuid: listing.uuid, items, contact_name: contactName, contact_mobile: contactMobile, contact_email: contactEmail })
  useEffect(() => { active.current = true; return () => { active.current = false; gateway.current?.close() } }, [])
  useEffect(() => {
    if (!session) return
    const controller = new AbortController()
    setQuote(null); setError('')
    Promise.all([
      existingBooking ? Promise.resolve({ amount_total: existingBooking.amount_total }) : api('/bookings/quote', { method: 'POST', body: JSON.parse(payload), signal: controller.signal }),
      api('/config', { auth: false, signal: controller.signal }),
    ]).then(([result, settings]) => { setQuote(result); setConfig(settings) }).catch(error => { if (!controller.signal.aborted) setError(error.message) })
    return () => controller.abort()
  }, [payload, session?.user?.uuid, existingBooking?.code])

  const release = () => { locked.current = false; if (active.current) setBusy(false) }
  const refreshBooking = async code => {
    if (!active.current) return
    try { const result = await api(`/me/bookings/${resource(code)}`); if (active.current) setBooking(result) }
    catch (error) { if (active.current) setError(error.message) }
  }
  const pay = async () => {
    if (locked.current || !quote || !config) return
    locked.current = true; setBusy(true); setError('')
    try {
      const mock = config.payment_mode === 'mock'
      if (!mock) { if (!config.razorpay_key_id) throw new Error('Razorpay is not configured. Please try later.'); await loadRazorpay() }
      let next = booking || await api('/bookings', { method: 'POST', body: JSON.parse(payload), headers: { 'Idempotency-Key': key.current } })
      setBooking(next)
      if (next.status !== 'payment_pending') { release(); return }
      if (booking) {
        next = await api(`/me/bookings/${resource(next.code)}/payment-orders`, { method: 'POST', body: {}, headers: { 'Idempotency-Key': key.current } })
        setBooking(next)
      }
      const order = next.payment_order
      if (!order?.provider_order_id) throw new Error('Payment order is not ready. Retry from My account.')
      if (mock) {
        if (!import.meta.env.DEV) throw new Error('The backend is in development payment mode. Live payments are unavailable.')
        next = await api(`/dev/payment-orders/${resource(order.uuid)}/authorize`, { method: 'POST', body: { method: 'upi' } })
        if (active.current) setBooking(next)
        release()
      } else {
        gateway.current = new window.Razorpay({
          key: config.razorpay_key_id, order_id: order.provider_order_id, name: 'TempleAddress',
          description: `${listing.name} · ${next.code}`,
          prefill: { name: contactName || session.user.name, contact: contactMobile || session.user.mobile_e164, email: contactEmail || session.user.email },
          handler: async () => { await refreshBooking(next.code); release() },
          modal: { ondismiss: async () => { await refreshBooking(next.code); release() } },
        })
        gateway.current.on('payment.failed', async () => { setError('Payment was not confirmed. Check booking status before retrying.'); await refreshBooking(next.code); release() })
        gateway.current.open()
      }
    } catch (error) { if (active.current) setError(error.message); release() }
  }
  if (!session) return <div className="card space-y-4 p-6"><h2 className="text-xl font-semibold">Sign in to continue</h2><AuthForm onComplete={() => {}}/></div>
  const confirmed = booking?.receipt_number && ['confirmed', 'completed'].includes(booking.status)
  return <div className="card space-y-4 p-6">
    <h2 className="text-xl font-semibold">{confirmed ? 'Booking confirmed' : 'Payment'}</h2>
    {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}
    {quote && <div className="flex justify-between text-lg font-bold"><span>Booking amount</span><Money v={quote.amount_total}/></div>}
    <p className="text-sm text-brown-500">Gateway charges, if applicable, are shown by Razorpay. TempleAddress adds no platform fee.</p>
    {booking && <div><p>Booking: {booking.code} · {booking.status}</p>{booking.hold_expires_at && !confirmed && <p>Hold expires: {new Date(booking.hold_expires_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p>}</div>}
    {confirmed ? <Link className="btn-p" to={`/receipt/${booking.code}`}>View receipt</Link> : <>
      {config?.payment_mode === 'mock' && <p className="rounded-xl bg-blue-50 p-3 text-sm">Development payment mode. No real money will be collected.</p>}
      {(!booking || booking.status === 'payment_pending') && <button className="btn-p" disabled={!quote || busy || (config?.payment_mode === 'mock' && !import.meta.env.DEV)} onClick={pay}>{busy ? 'Waiting for payment…' : config?.payment_mode === 'mock' ? 'Confirm development payment' : booking ? 'Retry Razorpay payment' : 'Pay with Razorpay'}</button>}
      {booking && <><button className="btn-g ml-2" disabled={busy} onClick={() => refreshBooking(booking.code)}>Check payment status</button><p className="text-sm">Payment confirmation may take a moment. Your booking and receipt are available in <Link className="underline" to="/account">My account</Link>.</p></>}
    </>}
  </div>
}

export function ApiBookingReceipt() {
  const { bookingCode } = useParams()
  const state = useApiResource(`/me/bookings/${resource(bookingCode)}`)
  const receipt = useApiResource(state.data?.receipt_number ? `/me/receipts/${resource(state.data.receipt_number)}` : null)
  const booking = state.data
  return <PublicShell hideChatbot><div className="mx-auto max-w-3xl space-y-5 px-4 py-8">
    <h1 className="text-3xl font-semibold">{booking?.receipt_number ? 'Booking receipt' : 'Booking status'}</h1>
    {state.error ? <p role="alert">{state.error.message}</p> : !booking ? <p>Loading…</p> : <>
      <p>{booking.listing.name_en} · {booking.listing.code}</p><p>Booking {booking.code} · {booking.status}</p>
      {booking.receipt_number && receipt.data ? <article className="card space-y-4 p-6" translate="no"><b>{receipt.data.number}</b><p>{new Date(receipt.data.issued_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</p><p>{booking.contact_name}</p>
        {booking.items.map(item => <div key={item.uuid} className="border-b border-brown-100 py-2"><p>{item.item_name_en} · {item.devotee_name}</p><p>{item.service_date} · {item.star_kind}: {item.star_value} · Quantity {item.quantity}</p><Money v={item.amount}/></div>)}
        <p className="font-bold">Booking amount: <Money v={booking.amount_total}/></p><p>Payment reference: {receipt.data.snapshot.provider_payment_id}</p><button className="btn-p print:hidden" onClick={() => window.print()}>Print / Save PDF</button>
      </article> : <><p>{receipt.error && booking.receipt_number ? receipt.error.message : 'A receipt is issued only after the backend confirms payment.'}</p><button className="btn-g" onClick={() => { state.reload(); receipt.reload() }}>Refresh status</button></>}
    </>}<Link className="btn-g" to="/account">My account</Link>
  </div></PublicShell>
}
