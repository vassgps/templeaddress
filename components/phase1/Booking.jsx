'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Field, Input, PublicShell } from '@/components/ui'
import { API_ORIGIN } from '@/lib/api'
import { clientApi, readAuth, requireAuth } from '@/lib/client-api'

const Wrap = ({ children }) => <main className="mx-auto max-w-2xl px-4 py-10">{children}</main>

function indiaDate(value = new Date()) {
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(value)
  const pick = type => parts.find(part => part.type === type)?.value
  return `${pick('year')}-${pick('month')}-${pick('day')}`
}

function earliestDate(item) {
  if (item?.is_live) return indiaDate()
  const value = new Date(Date.now() + Number(item?.lead_time_hours || 0) * 3600000)
  return indiaDate(value)
}

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-razorpay-checkout]')
    if (existing) { existing.addEventListener('load', resolve, { once: true }); existing.addEventListener('error', reject, { once: true }); return }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.dataset.razorpayCheckout = 'true'; script.onload = resolve
    script.onerror = () => reject(new Error('Razorpay Checkout could not be loaded.'))
    document.head.appendChild(script)
  })
}

async function openPayment({ booking, config, user, mode }) {
  if (!booking.payment_order?.uuid) throw new Error('Razorpay order was not created.')
  const remainingSeconds = Math.floor((new Date(booking.payment_deadline_at).getTime() - Date.now()) / 1000)
  if (remainingSeconds <= 0) throw new Error('This booking hold has expired. Create a new booking.')
  if (config?.payment_mode === 'mock') {
    return clientApi(`dev/payment-orders/${booking.payment_order.uuid}/authorize`, { method: 'POST', body: { method: 'upi' } })
  }
  if (!config?.razorpay_key_id || !booking.payment_order.provider_order_id) throw new Error('Razorpay is not configured.')
  await loadRazorpay()
  return new Promise((resolve, reject) => {
    const checkout = new window.Razorpay({
      key: config.razorpay_key_id,
      order_id: booking.payment_order.provider_order_id,
      amount: Math.round(Number(booking.amount_total) * 100),
      currency: booking.currency,
      timeout: remainingSeconds,
      name: 'TempleAddress',
      description: `${mode === 'donation' ? 'Donation' : 'Pooja booking'} ${booking.code}`,
      prefill: { name: user?.name || booking.contact_name, email: user?.email || booking.contact_email, contact: user?.mobile_e164 || booking.contact_mobile },
      notes: { booking_code: booking.code },
      theme: { color: '#c85b20' },
      handler: resolve,
      modal: { ondismiss: () => reject(new Error('Payment window was closed. Your booking remains payable until its hold expires.')) },
    })
    checkout.on('payment.failed', response => reject(new Error(response.error?.description || 'Payment failed. You may retry while the hold is valid.')))
    checkout.open()
  })
}

export function Phase1Checkout({ mode = 'booking' }) {
  const { slug } = useParams()
  const search = useSearchParams()
  const router = useRouter()
  const idempotency = useRef(null)
  const requested = mode === 'donation' ? (search.get('purpose') || '') : (search.get('pooja') || search.get('event') || '')
  const resumeCode = search.get('resume')
  const [listing, setListing] = useState(null)
  const [config, setConfig] = useState(null)
  const [user, setUser] = useState(null)
  const [pending, setPending] = useState(null)
  const [selected, setSelected] = useState(requested)
  const [amount, setAmount] = useState('')
  const [serviceDate, setServiceDate] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [star, setStar] = useState('')
  const [stars, setStars] = useState([])
  const [family, setFamily] = useState([])
  const [quantity, setQuantity] = useState(1)
  const [quote, setQuote] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const options = useMemo(() => {
    if (mode === 'donation') return (listing?.donation_purposes || []).map(row => ({ ...row, item_type: 'donation', target_uuid: row.uuid }))
    const poojas = (listing?.poojas || []).filter(row => row.booking_mode === 'online').map(row => ({ ...row, item_type: 'pooja', target_uuid: row.uuid }))
    const specials = (listing?.events || []).filter(row => row.registration_mode === 'paid_booking').flatMap(event => (event.occurrences || []).filter(occurrence => occurrence.status === 'scheduled').map(occurrence => ({ ...event, uuid: occurrence.uuid, target_uuid: occurrence.uuid, item_type: 'special_pooja', occurrence, name_en: `${event.name_en} — ${occurrence.date}` })))
    return [...poojas, ...specials]
  }, [listing, mode])
  const item = options.find(row => row.uuid === selected)

  useEffect(() => {
    clientApi('master-values/star', { auth: false }).then(setStars).catch(error => setError(error.message))
    if (readAuth()?.access) clientApi('me/family-members').then(data => setFamily(data.results || data)).catch(error => setError(error.message))
  }, [])

  useEffect(() => {
    Promise.all([
      clientApi(`listings/${slug}`, { auth: false }),
      clientApi('config', { auth: false }),
      clientApi('me').catch(() => null),
      resumeCode ? clientApi(`me/bookings/${resumeCode}`) : Promise.resolve(null),
    ]).then(([data, platform, me, resumed]) => {
      setConfig(platform); setListing(data); setUser(me); setPending(resumed)
      setName(me?.name || resumed?.contact_name || ''); setEmail(me?.email || resumed?.contact_email || '')
      const specialOccurrences = (data.events || []).filter(row => row.registration_mode === 'paid_booking').flatMap(row => row.occurrences || [])
      const rows = mode === 'donation' ? data.donation_purposes : [...(data.poojas || []), ...specialOccurrences]
      const initial = requested || rows?.[0]?.uuid || ''
      setSelected(initial)
      const picked = rows?.find(row => row.uuid === initial) || rows?.[0]
      if (mode === 'donation') setAmount(picked?.suggested_amount || '100')
      else setServiceDate(earliestDate(picked))
    }).catch(err => setError(err.message))
  }, [slug, mode, requested, resumeCode])

  async function pay(booking) {
    if (new Date(booking.payment_deadline_at) <= new Date()) throw new Error('This booking hold has expired. Create a new booking.')
    let payable = booking
    if (booking.payment_order?.status !== 'open' || new Date(booking.payment_order.expires_at) <= new Date()) {
      payable = await clientApi(`me/bookings/${booking.code}/payment-orders`, { method: 'POST', headers: { 'Idempotency-Key': crypto.randomUUID() } })
    }
    await openPayment({ booking: payable, config, user, mode })
    router.push(`/receipt/${payable.code}`)
  }

  async function submit(event) {
    event.preventDefault()
    const next = `/${mode === 'donation' ? 'donate' : 'book'}/${slug}${selected ? `?${mode === 'donation' ? 'purpose' : 'pooja'}=${selected}` : ''}`
    const auth = requireAuth(router, next, { verifiedMobile: true })
    if (!auth) return
    setBusy(true); setError(''); setQuote(null)
    const raw = mode === 'donation'
      ? { item_type: 'donation', target_uuid: selected, amount }
      : { item_type: item.item_type, target_uuid: item.target_uuid, ...(item.item_type === 'pooja' ? { service_date: serviceDate } : {}), quantity: Number(quantity), devotee_name: name, star_kind: star ? 'nakshatra' : '', star_value: star }
    try {
      const preview = await clientApi('bookings/quote', { method: 'POST', body: { listing_uuid: listing.uuid, items: [raw] } })
      setQuote(preview)
      idempotency.current ||= crypto.randomUUID()
      const booking = await clientApi('bookings', {
        method: 'POST', headers: { 'Idempotency-Key': idempotency.current, 'X-Client': 'web' },
        body: { listing_uuid: listing.uuid, contact_name: name, contact_email: email, items: [raw] },
      })
      setPending(booking)
      await pay(booking)
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  async function resumePayment() {
    setBusy(true); setError('')
    try { await pay(pending) } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  if (!listing) return <PublicShell booking><Wrap><p>{error || 'Loading checkout…'}</p></Wrap></PublicShell>
  if (pending) return <PublicShell booking><Wrap><p className="text-sm font-semibold uppercase tracking-wide text-saffron-600">Payment pending</p><h1 className="mt-2 text-3xl font-semibold">Booking {pending.code}</h1><div className="card mt-6 space-y-3 p-6"><p>{pending.listing.name_en}</p><p className="text-sm text-brown-500">{pending.items.map(row => row.item_name_en).join(', ')} · ₹{pending.amount_total}</p><p className="text-sm text-brown-500">Complete payment before {new Date(pending.payment_deadline_at).toLocaleString()}.</p>{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}<button onClick={resumePayment} disabled={busy} className="btn-p w-full">{busy ? 'Opening Razorpay…' : `Continue payment ₹${pending.amount_total}`}</button><Link href="/account" className="btn-g w-full">Back to account</Link></div></Wrap></PublicShell>
  return <PublicShell booking><Wrap>
    <p className="text-sm font-semibold uppercase tracking-wide text-saffron-600">{mode === 'donation' ? 'Donation' : 'Pooja booking'}</p>
    <h1 className="mt-2 text-3xl font-semibold">{listing.name_en}</h1>
    <p className="mt-2 text-sm text-brown-500">Razorpay only. TempleAddress convenience fee is ₹0. Razorpay is the fee bearer and shows any method-specific charge in its secure window.</p>
    <form onSubmit={submit} className="card mt-6 space-y-4 p-6">
      <Field label={mode === 'donation' ? 'Donation purpose' : 'Pooja'}><select className="input" required value={selected} onChange={event => { setSelected(event.target.value); setQuote(null); const picked = options.find(row => row.uuid === event.target.value); if (mode === 'donation') setAmount(picked?.suggested_amount || '100'); else setServiceDate(earliestDate(picked)) }}>{options.map(row => <option key={row.uuid} value={row.uuid}>{row.name_en}{row.price ? ` — ₹${row.price}` : ''}{row.is_live ? ' — Live today' : ''}</option>)}</select></Field>
      {mode === 'donation' ? <Field label="Amount ₹"><Input type="number" min="1" step="0.01" value={amount} onChange={event => setAmount(event.target.value)} required/></Field> : <>
        {item?.item_type === 'special_pooja' ? <p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-700">Scheduled for {item.occurrence.date} at {item.occurrence.start_time}. Capacity {item.occurrence.capacity}.</p> : <Field label="Service date" hint={item?.is_live ? 'Live pooja is bookable today until its end time.' : `Minimum lead time: ${item?.lead_time_hours || 0} hours. Final availability is checked by the server.`}><Input type="date" min={earliestDate(item)} value={serviceDate} onChange={event => setServiceDate(event.target.value)} required/></Field>}
        <Field label="Quantity"><Input type="number" min="1" max="100" value={quantity} onChange={event => setQuantity(event.target.value)} required/></Field>
        <Field label="Family member"><select className="input" defaultValue="" onChange={event => { const member = family.find(row => row.uuid === event.target.value); if (member) { setName(member.name); setStar(member.star_value) } }}><option value="">Enter devotee details</option>{family.map(row => <option key={row.uuid} value={row.uuid}>{row.name}</option>)}</select></Field>
        <Field label="Devotee name"><Input value={name} onChange={event => setName(event.target.value)} required/></Field>
        <Field label="Birth star"><select className="input" value={star} onChange={event => setStar(event.target.value)}><option value="">Not specified</option>{stars.map(row => <option value={row.code} key={row.code}>{row.name_en}</option>)}</select></Field>
      </>}
      {mode === 'donation' && <Field label="Donor name"><Input value={name} onChange={event => setName(event.target.value)} required/></Field>}
      <Field label="Receipt email" hint="Optional"><Input type="email" value={email} onChange={event => setEmail(event.target.value)}/></Field>
      {quote && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">Platform amount: ₹{quote.amount_total}. Convenience fee: ₹0.</p>}
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {!options.length ? <p className="text-sm text-brown-500">No active online items are available.</p> : <button disabled={busy} className="btn-p w-full">{busy ? 'Preparing secure payment…' : `Confirm and pay ₹${mode === 'donation' ? amount || '0' : Number(item?.price || 0) * Number(quantity || 0)}`}</button>}
    </form>
  </Wrap></PublicShell>
}

export function Phase1Receipt() {
  const { bookingCode } = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState(null)
  const [receipt, setReceipt] = useState(null)
  const [error, setError] = useState('')
  async function downloadPdf() {
    try {
      const response = await fetch(`${API_ORIGIN}/me/receipts/${receipt.number}/pdf`, { headers: { Authorization: `Bearer ${readAuth()?.access}` } })
      if (!response.ok) throw new Error('Could not download the receipt PDF.')
      const url = URL.createObjectURL(await response.blob())
      const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${receipt.number}.pdf`; anchor.click()
      URL.revokeObjectURL(url)
    } catch (err) { setError(err.message) }
  }
  useEffect(() => {
    if (!requireAuth(router, `/receipt/${bookingCode}`)) return
    let cancelled = false; let timer
    async function load(attempt = 0) {
      try {
        const row = await clientApi(`me/bookings/${bookingCode}`)
        if (cancelled) return
        setBooking(row)
        if (row.receipt_number) setReceipt(await clientApi(`me/receipts/${row.receipt_number}`))
        else if (attempt < 15) timer = window.setTimeout(() => load(attempt + 1), 1500)
        else if (row.status === 'payment_pending') setError('Payment has not been confirmed. You can continue it from My Account while the hold is valid.')
        else setError('Payment confirmation is still pending. Check My Account shortly.')
      } catch (err) { if (!cancelled) setError(err.message) }
    }
    load()
    return () => { cancelled = true; window.clearTimeout(timer) }
  }, [router, bookingCode])
  return <PublicShell><Wrap>
    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Payment receipt</p><h1 className="mt-2 text-3xl font-semibold">{receipt?.number || bookingCode}</h1>
    {error && <p className="mt-4 rounded-xl bg-amber-50 p-3 text-amber-800">{error}</p>}
    {!receipt && !error && <p className="mt-5">Waiting for Razorpay confirmation…</p>}
    {receipt && <div className="card mt-6 p-6"><div className="grid gap-3 text-sm sm:grid-cols-2"><p><span className="text-brown-500">Booking</span><br/><b>{receipt.snapshot.booking_code}</b></p><p><span className="text-brown-500">Status</span><br/><b>{booking?.status}</b></p><p><span className="text-brown-500">Paid</span><br/><b>₹{receipt.snapshot.amount}</b></p><p><span className="text-brown-500">Issued</span><br/><b>{new Date(receipt.issued_at).toLocaleString()}</b></p></div><div className="mt-5 border-t pt-4">{receipt.snapshot.items?.map(row => <div key={row.code} className="flex justify-between py-2"><span>{row.name} × {row.quantity}</span><b>₹{row.amount}</b></div>)}</div><p className="mt-4 text-xs text-brown-500">Official payment receipt.</p></div>}
    {receipt && <button className="btn-p mt-5" onClick={downloadPdf}>Download PDF</button>}
    <Link href="/account" className="btn-g mt-5">Back to account</Link>
  </Wrap></PublicShell>
}
