'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { Field, Input, PublicShell } from '@/components/ui'
import { clientApi, requireAuth } from '@/lib/client-api'

const Wrap = ({ children }) => <main className="mx-auto max-w-2xl px-4 py-10">{children}</main>

function dateAfter(hours = 0) {
  const value = new Date()
  value.setDate(value.getDate() + Math.max(2, Math.ceil(Number(hours) / 24) + 1))
  return value.toISOString().slice(0, 10)
}

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve()
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = resolve
    script.onerror = () => reject(new Error('Razorpay Checkout could not be loaded.'))
    document.head.appendChild(script)
  })
}

export function Phase1Checkout({ mode = 'booking' }) {
  const { slug } = useParams()
  const search = useSearchParams()
  const router = useRouter()
  const requested = mode === 'donation' ? (search.get('purpose') || '') : (search.get('pooja') || search.get('event') || '')
  const [listing, setListing] = useState(null)
  const [config, setConfig] = useState(null)
  const [selected, setSelected] = useState(requested)
  const [amount, setAmount] = useState('')
  const [serviceDate, setServiceDate] = useState('')
  const [name, setName] = useState('')
  const [star, setStar] = useState('')
  const [quote, setQuote] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const options = useMemo(() => {
    if (mode === 'donation') return (listing?.donation_purposes || []).map(row => ({ ...row, item_type: 'donation', target_uuid: row.uuid }))
    const poojas = (listing?.poojas || []).map(row => ({ ...row, item_type: 'pooja', target_uuid: row.uuid }))
    const specials = (listing?.events || []).filter(row => row.registration_mode === 'paid_booking').flatMap(event => (event.occurrences || []).map(occurrence => ({ ...event, uuid: occurrence.uuid, target_uuid: occurrence.uuid, item_type: 'special_pooja', occurrence, name_en: `${event.name_en} — ${occurrence.date}` })))
    return [...poojas, ...specials]
  }, [listing, mode])
  const item = options.find(row => row.uuid === selected)

  useEffect(() => {
    Promise.all([clientApi(`listings/${slug}`, { auth: false }), clientApi('config', { auth: false })]).then(([data, platform]) => {
      setConfig(platform)
      setListing(data)
      const specialOccurrences = (data.events || []).filter(row => row.registration_mode === 'paid_booking').flatMap(row => row.occurrences || [])
      const rows = mode === 'donation' ? data.donation_purposes : [...(data.poojas || []), ...specialOccurrences]
      const initial = requested || rows?.[0]?.uuid || ''
      setSelected(initial)
      const picked = rows?.find(row => row.uuid === initial) || rows?.[0]
      if (mode === 'donation') setAmount(picked?.suggested_amount || '100')
      else setServiceDate(dateAfter(picked?.lead_time_hours))
    }).catch(err => setError(err.message))
  }, [slug, mode, requested])

  async function submit(event) {
    event.preventDefault()
    if (!requireAuth(router, `/${mode === 'donation' ? 'donate' : 'book'}/${slug}`)) return
    setBusy(true); setError(''); setQuote(null)
    const raw = mode === 'donation'
      ? { item_type: 'donation', target_uuid: selected, amount }
      : { item_type: item.item_type, target_uuid: item.target_uuid, ...(item.item_type === 'pooja' ? { service_date: serviceDate } : {}), quantity: 1, devotee_name: name, star_value: star }
    try {
      const preview = await clientApi('bookings/quote', { method: 'POST', body: { listing_uuid: listing.uuid, items: [raw] } })
      setQuote(preview)
      const idempotencyKey = crypto.randomUUID()
      const booking = await clientApi('bookings', {
        method: 'POST',
        headers: { 'Idempotency-Key': idempotencyKey, 'X-Client': 'web' },
        body: { listing_uuid: listing.uuid, contact_name: name, client_reference: idempotencyKey, items: [raw] },
      })
      if (!booking.payment_order?.uuid) throw new Error('Razorpay order was not created.')
      if (config?.payment_mode === 'mock') {
        // Local mode follows the same authorize/capture/finalize service as the webhook.
        await clientApi(`dev/payment-orders/${booking.payment_order.uuid}/authorize`, { method: 'POST', body: { method: 'upi' } })
      } else {
        if (!config?.razorpay_key_id) throw new Error('Razorpay is not configured.')
        await loadRazorpay()
        await new Promise((resolve, reject) => {
          const checkout = new window.Razorpay({
            key: config.razorpay_key_id,
            order_id: booking.payment_order.provider_order_id,
            amount: Math.round(Number(booking.amount_total) * 100),
            currency: booking.currency,
            name: 'TempleAddress',
            description: `${mode === 'donation' ? 'Donation' : 'Pooja booking'} ${booking.code}`,
            handler: resolve,
            modal: { ondismiss: () => reject(new Error('Payment window was closed. Your booking remains pending until the hold expires.')) },
          })
          checkout.on('payment.failed', response => reject(new Error(response.error?.description || 'Payment failed.')))
          checkout.open()
        })
      }
      router.push(`/receipt/${booking.code}`)
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  if (!listing) return <PublicShell booking><Wrap><p>{error || 'Loading checkout…'}</p></Wrap></PublicShell>
  return <PublicShell booking><Wrap>
    <p className="text-sm font-semibold uppercase tracking-wide text-saffron-600">{mode === 'donation' ? 'Donation' : 'Pooja booking'}</p>
    <h1 className="mt-2 text-3xl font-semibold">{listing.name_en}</h1>
    <p className="mt-2 text-sm text-brown-500">Phase 1 uses Razorpay only. TempleAddress convenience fee is ₹0. Razorpay may show any method-specific fee inside its payment window.</p>
    <form onSubmit={submit} className="card mt-6 space-y-4 p-6">
      <Field label={mode === 'donation' ? 'Donation purpose' : 'Pooja'}><select className="input" required value={selected} onChange={event => { setSelected(event.target.value); setQuote(null); const picked = options.find(row => row.uuid === event.target.value); if (mode === 'donation') setAmount(picked?.suggested_amount || '100'); else setServiceDate(dateAfter(picked?.lead_time_hours)) }}>{options.map(row => <option key={row.uuid} value={row.uuid}>{row.name_en}{row.price ? ` — ₹${row.price}` : ''}</option>)}</select></Field>
      {mode === 'donation' ? <Field label="Amount ₹"><Input type="number" min="1" step="0.01" value={amount} onChange={event => setAmount(event.target.value)} required/></Field> : <>
        {item?.item_type === 'special_pooja' ? <p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-700">Scheduled for {item.occurrence.date} at {item.occurrence.start_time}. Capacity {item.occurrence.capacity}.</p> : <Field label="Service date" hint={`This pooja requires at least ${item?.lead_time_hours || 0} hours lead time; the platform also enforces the fixed chart cutoff.`}><Input type="date" value={serviceDate} onChange={event => setServiceDate(event.target.value)} required/></Field>}
        <Field label="Devotee name"><Input value={name} onChange={event => setName(event.target.value)} required/></Field>
        <Field label="Birth star"><Input value={star} onChange={event => setStar(event.target.value)} placeholder="Optional where the pooja permits it"/></Field>
      </>}
      {mode === 'donation' && <Field label="Donor name"><Input value={name} onChange={event => setName(event.target.value)} required/></Field>}
      {quote && <p className="rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">Platform amount: ₹{quote.amount_total}. Convenience fee: ₹0.</p>}
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      {!options.length ? <p className="text-sm text-brown-500">No active items are available.</p> : <button disabled={busy} className="btn-p w-full">{busy ? 'Authorizing test payment…' : `Confirm and pay ₹${mode === 'donation' ? amount || '0' : item?.price || '0'}`}</button>}
    </form>
  </Wrap></PublicShell>
}

export function Phase1Receipt() {
  const { bookingCode } = useParams()
  const router = useRouter()
  const [booking, setBooking] = useState(null)
  const [receipt, setReceipt] = useState(null)
  const [error, setError] = useState('')
  useEffect(() => {
    if (!requireAuth(router, `/receipt/${bookingCode}`)) return
    let cancelled = false
    async function load(attempt = 0) {
      try {
        const row = await clientApi(`me/bookings/${bookingCode}`)
        if (cancelled) return
        setBooking(row)
        if (row.receipt_number) setReceipt(await clientApi(`me/receipts/${row.receipt_number}`))
        else if (attempt < 10) setTimeout(() => load(attempt + 1), 1500)
        else setError('Payment confirmation is still pending. Check My Account shortly.')
      } catch (err) { if (!cancelled) setError(err.message) }
    }
    load()
    return () => { cancelled = true }
  }, [router, bookingCode])
  return <PublicShell><Wrap>
    <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">Payment receipt</p><h1 className="mt-2 text-3xl font-semibold">{receipt?.number || bookingCode}</h1>
    {error && <p className="mt-4 rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}
    {!receipt && !error && <p className="mt-5">Loading receipt…</p>}
    {receipt && <div className="card mt-6 p-6"><div className="grid gap-3 text-sm sm:grid-cols-2"><p><span className="text-brown-500">Booking</span><br/><b>{receipt.snapshot.booking_code}</b></p><p><span className="text-brown-500">Status</span><br/><b>{booking?.status}</b></p><p><span className="text-brown-500">Paid</span><br/><b>₹{receipt.snapshot.amount}</b></p><p><span className="text-brown-500">Issued</span><br/><b>{new Date(receipt.issued_at).toLocaleString()}</b></p></div><div className="mt-5 border-t pt-4">{receipt.snapshot.items?.map(row => <div key={row.code} className="flex justify-between py-2"><span>{row.name} × {row.quantity}</span><b>₹{row.amount}</b></div>)}</div><p className="mt-4 text-xs text-brown-500">This is a payment receipt. It is not an 80G certificate.</p></div>}
    <Link href="/account" className="btn-g mt-5">Back to account</Link>
  </Wrap></PublicShell>
}
