'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { PublicShell, Field, Input } from '@/components/ui'
import { clearAuth, clientApi, readAuth, requireAuth } from '@/lib/client-api'

const Wrap = ({ children }) => <main className="mx-auto max-w-5xl px-4 py-9">{children}</main>
const ErrorBox = ({ value }) => value ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{value}</p> : null

export function Phase1Account() {
  const router = useRouter(); const [me, setMe] = useState(null); const [bookings, setBookings] = useState([]); const [error, setError] = useState('')
  useEffect(() => {
    if (!requireAuth(router, '/account')) return
    Promise.all([clientApi('me'), clientApi('me/bookings')]).then(([user, rows]) => { setMe(user); setBookings(rows.results || rows) }).catch(err => setError(err.message))
  }, [router])
  return <PublicShell><Wrap><div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-sm text-saffron-600">Verified devotee account</p><h1 className="text-3xl font-semibold">{me?.name || 'My account'}</h1><p className="text-sm text-brown-500">{me?.mobile_e164}</p></div><div className="flex gap-2"><Link href="/account/listings" className="btn-g">My listings</Link><button className="btn-g" onClick={() => { clearAuth(); router.push('/login') }}>Logout</button></div></div><ErrorBox value={error}/>
    <section className="mt-7"><h2 className="text-2xl font-semibold">Bookings and donations</h2><div className="mt-3 space-y-3">{!bookings.length && <div className="card p-5">No bookings yet. <Link className="text-saffron-600" href="/temples">Browse temples</Link></div>}{bookings.map(row => <div className="card flex flex-wrap items-center justify-between gap-4 p-4" key={row.uuid}><div><b>{row.code}</b><p className="text-sm text-brown-500">{row.listing.name_en} · {row.items.map(i => i.item_name_en).join(', ')}</p><p className="text-xs text-brown-500">{row.status} · ₹{row.amount_total}</p></div>{row.receipt_number ? <Link className="btn-p" href={`/receipt/${row.code}`}>Receipt</Link> : <span className="pill bg-amber-50 text-amber-700">Payment pending</span>}</div>)}</div></section>
  </Wrap></PublicShell>
}

export function MyListings() {
  const router = useRouter(); const [rows, setRows] = useState([]); const [error, setError] = useState('')
  useEffect(() => { if (!requireAuth(router, '/account/listings')) return; clientApi('me/listings').then(setRows).catch(err => setError(err.message)) }, [router])
  return <PublicShell><Wrap><div className="flex items-end justify-between"><div><h1 className="text-3xl font-semibold">My listing submissions</h1><p className="text-sm text-brown-500">Submission does not grant operational ownership; staff grants memberships after verification.</p></div><Link className="btn-p" href="/account/listings/new">Create listing</Link></div><ErrorBox value={error}/><div className="mt-6 grid gap-4">{rows.map(row => <div className="card flex flex-wrap items-center justify-between gap-3 p-5" key={row.uuid}><div><b>{row.name_en}</b><p className="text-sm text-brown-500">{row.listing_type} · {row.code} · {row.publication_status}</p></div><div className="flex gap-2">{row.publication_status === 'published' && <Link className="btn-g" href={`/t/${row.slug}`}>Public page</Link>}<Link className="btn-p" href={`/account/listings/${row.uuid}/manage`}>Manage submission</Link></div></div>)}</div></Wrap></PublicShell>
}

export function CreateListing() {
  const router = useRouter(); const [error, setError] = useState(''); const [busy, setBusy] = useState(false)
  async function submit(event) {
    event.preventDefault(); if (!requireAuth(router, '/account/listings/new')) return; setBusy(true); setError('')
    const form = Object.fromEntries(new FormData(event.currentTarget))
    form.sections_completed = ['basics', 'contact']
    try { const result = await clientApi('me/listings', { method: 'POST', body: form }); router.push(`/account/listings/${result.listing.uuid}/manage`) } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  return <PublicShell><Wrap><h1 className="text-3xl font-semibold">Create a listing submission</h1><p className="mt-2 text-brown-500">Temple, festival and service are the only Phase 1 listing types. Events are created beneath an approved listing.</p><form onSubmit={submit} className="card mt-6 grid gap-4 p-6 md:grid-cols-2"><Field label="Listing type"><select name="listing_type" className="input" defaultValue="temple"><option value="temple">Temple</option><option value="festival">Festival</option><option value="service">Service person/provider</option></select></Field><Field label="English name"><Input name="name_en" required/></Field><Field label="Malayalam name"><Input name="name_ml"/></Field><Field label="Address"><Input name="address" required/></Field><Field label="Pincode"><Input name="pincode"/></Field><Field label="Official phone"><Input name="phone"/></Field><Field label="Official email"><Input type="email" name="email"/></Field><Field label="Payout notification email"><Input type="email" name="payout_email"/></Field><Field label="Short description" className="md:col-span-2"><textarea name="short_description_en" className="input" rows={3}/></Field><div className="md:col-span-2"><ErrorBox value={error}/><button disabled={busy} className="btn-p">{busy ? 'Creating…' : 'Create draft'}</button></div></form></Wrap></PublicShell>
}

export function ManageListing() {
  const { slug: uuid } = useParams(); const router = useRouter(); const [listing, setListing] = useState(null); const [message, setMessage] = useState(''); const [error, setError] = useState(''); const [catalogue, setCatalogue] = useState([]); const [events, setEvents] = useState([])
  const load = useCallback(async () => {
    const rows = await clientApi('me/listings'); const item = rows.find(row => row.uuid === uuid); setListing(item)
    if (item?.publication_status === 'published') {
      const kind = item.listing_type === 'service' ? 'service-offerings' : 'poojas'
      clientApi(`me/managed-listings/${uuid}/${kind}`).then(setCatalogue).catch(() => {})
      clientApi(`me/managed-listings/${uuid}/events`).then(setEvents).catch(() => {})
    }
  }, [uuid])
  useEffect(() => { if (!requireAuth(router, `/account/listings/${uuid}/manage`)) return; load().catch(err => setError(err.message)) }, [router, uuid, load])
  async function action(path, body, method = 'POST') { setError(''); setMessage(''); try { const result = await clientApi(path, { method, body }); setMessage('Saved successfully.'); await load(); return result } catch (err) { setError(err.message); throw err } }
  async function submitRevision() { try { await action(`me/listings/${uuid}/submit`, {}) } catch {} }
  async function submitKyc(event) { event.preventDefault(); try { await action(`me/listings/${uuid}/kyc`, Object.fromEntries(new FormData(event.currentTarget)), 'PUT') } catch {} }
  async function submitBank(event) { event.preventDefault(); try { await action(`me/listings/${uuid}/bank-accounts`, Object.fromEntries(new FormData(event.currentTarget))) } catch {} }
  async function addCatalogue(event) { event.preventDefault(); const kind = listing.listing_type === 'service' ? 'service-offerings' : event.currentTarget.dataset.kind; try { await action(`me/managed-listings/${uuid}/${kind}`, Object.fromEntries(new FormData(event.currentTarget))) } catch {} }
  async function addEvent(event) { event.preventDefault(); try { await action(`me/managed-listings/${uuid}/events`, Object.fromEntries(new FormData(event.currentTarget))) } catch {} }
  if (!listing) return <PublicShell><Wrap><h1>Loading listing…</h1><ErrorBox value={error}/></Wrap></PublicShell>
  return <PublicShell><Wrap><div className="flex flex-wrap justify-between gap-3"><div><h1 className="text-3xl font-semibold">{listing.name_en}</h1><p className="text-sm text-brown-500">{listing.code} · {listing.listing_type} · {listing.publication_status}</p></div>{listing.publication_status === 'published' && <Link className="btn-g" href={`/t/${listing.slug}`}>View public page</Link>}</div>{message && <p className="mt-4 rounded-xl bg-emerald-50 p-3 text-sm text-emerald-700">{message}</p>}<ErrorBox value={error}/>
    {listing.publication_status === 'draft' && <section className="card mt-6 p-5"><h2 className="text-xl font-semibold">Submit for staff review</h2><p className="mt-1 text-sm text-brown-500">Staff reviews the complete snapshot before publishing.</p><button onClick={submitRevision} className="btn-p mt-3">Submit listing</button></section>}
    <div className="mt-6 grid gap-5 lg:grid-cols-2"><form onSubmit={submitKyc} className="card space-y-3 p-5"><h2 className="text-xl font-semibold">Beneficiary KYC</h2><Field label="Beneficiary name"><Input name="beneficiary_name" required/></Field><Field label="Registration number"><Input name="registration_number"/></Field><Field label="PAN"><Input name="pan"/></Field><button className="btn-p">Submit KYC</button></form><form onSubmit={submitBank} className="card space-y-3 p-5"><h2 className="text-xl font-semibold">Bank account version</h2><Field label="Beneficiary name"><Input name="beneficiary_name" required/></Field><Field label="Account number"><Input name="account_number" required/></Field><Field label="IFSC"><Input name="ifsc" required/></Field><Field label="Bank name"><Input name="bank_name" required/></Field><button className="btn-p">Submit for verification</button></form></div>
    {listing.publication_status === 'published' && <><section className="mt-7"><h2 className="text-2xl font-semibold">Phase 1 catalogue</h2><div className="mt-3 grid gap-4 lg:grid-cols-2"><form data-kind={listing.listing_type === 'service' ? 'service-offerings' : 'poojas'} onSubmit={addCatalogue} className="card space-y-3 p-5"><h3 className="font-semibold">Add {listing.listing_type === 'service' ? 'service offering' : 'pooja'}</h3><Field label="Name"><Input name="name_en" required/></Field>{listing.listing_type === 'service' ? <><Field label="Indicative price text"><Input name="indicative_price_text" placeholder="Contact for details"/></Field><Field label="Duration"><Input name="duration_text"/></Field><Field label="Availability"><Input name="availability_text"/></Field></> : <><Field label="Price ₹"><Input type="number" name="price" min="0.01" step="0.01" required/></Field><Field label="Lead time hours"><Input type="number" name="lead_time_hours" defaultValue="8"/></Field><Field label="Daily capacity"><Input type="number" name="daily_capacity" defaultValue="10"/></Field><Field label="Start time"><Input type="time" name="start_time" required/></Field></>}<button className="btn-p">Add</button></form>{listing.listing_type !== 'service' && <form data-kind="donation-purposes" onSubmit={addCatalogue} className="card space-y-3 p-5"><h3 className="font-semibold">Add donation purpose</h3><Field label="Name"><Input name="name_en" required/></Field><Field label="Suggested amount ₹"><Input type="number" name="suggested_amount" min="0.01" step="0.01"/></Field><button className="btn-p">Add</button></form>}</div><div className="mt-3 text-sm text-brown-500">{catalogue.map(row => row.name_en).join(' · ') || 'No catalogue entries yet.'}</div></section>
    <section className="mt-7"><h2 className="text-2xl font-semibold">Free events</h2><form onSubmit={addEvent} className="card mt-3 grid gap-3 p-5 md:grid-cols-2"><Field label="Event name"><Input name="name_en" required/></Field><Field label="Date"><Input type="date" name="date" required/></Field><Field label="Start time"><Input type="time" name="start_time" required/></Field><Field label="Capacity"><Input type="number" name="default_capacity" defaultValue="50"/></Field><div className="md:col-span-2"><button className="btn-p">Create and submit event</button></div></form><p className="mt-2 text-sm text-brown-500">{events.map(row => `${row.name_en} (${row.publication_status || 'review'})`).join(' · ') || 'No events yet.'}</p></section></>}
  </Wrap></PublicShell>
}
