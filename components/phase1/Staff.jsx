'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Field, Input, PublicShell, Stat } from '@/components/ui'
import { API_ORIGIN } from '@/lib/api'
import { clientApi, readAuth, requireAuth } from '@/lib/client-api'

const Wrap = ({ children }) => <main className="mx-auto max-w-6xl px-4 py-9">{children}</main>
const ErrorBox = ({ value }) => value ? <p className="my-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{value}</p> : null

function StaffNav() {
  return <div className="flex flex-wrap gap-2"><Link className="btn-g" href="/staff">Reviews</Link><Link className="btn-g" href="/staff/charts">Charts</Link><Link className="btn-g" href="/staff/payouts">Payouts</Link></div>
}

function useStaff(load) {
  const router = useRouter()
  const [error, setError] = useState('')
  const run = useCallback(async () => {
    const auth = requireAuth(router, window.location.pathname)
    if (!auth) return
    const me = await clientApi('me')
    if (!me.is_staff) throw new Error('A staff account is required.')
    await load()
  }, [router, load])
  useEffect(() => { run().catch(err => setError(err.message)) }, [run])
  return { error, setError, reload: run }
}

export function StaffReviews() {
  const [overview, setOverview] = useState(null)
  const [revisions, setRevisions] = useState([])
  const [banks, setBanks] = useState([])
  const [events, setEvents] = useState([])
  const [listings, setListings] = useState([])
  const load = useCallback(async () => {
    const [summary, reviewRows, bankRows, eventRows, listingPayload] = await Promise.all([clientApi('staff/overview'), clientApi('staff/listing-revisions'), clientApi('staff/bank-accounts'), clientApi('staff/events'), clientApi('listings?page_size=100', { auth: false })])
    setOverview(summary); setRevisions(reviewRows); setBanks(bankRows); setEvents(eventRows); setListings(listingPayload.results || listingPayload)
  }, [])
  const { error, setError, reload } = useStaff(load)
  async function decideRevision(row, decision) {
    try {
      await clientApi(`staff/listing-revisions/${row.uuid}/${decision}`, { method: 'POST', body: {} })
      if (decision === 'approve' && row.submitted_by_uuid) await clientApi(`staff/listings/${row.listing_uuid}/memberships`, { method: 'POST', body: { user_uuid: row.submitted_by_uuid, role: 'owner' } })
      await reload()
    } catch (err) { setError(err.message) }
  }
  async function decide(path) { try { await clientApi(path, { method: 'POST', body: {} }); await reload() } catch (err) { setError(err.message) } }
  async function createPaidEvent(event) { event.preventDefault(); try { await clientApi('staff/paid-events', { method: 'POST', body: Object.fromEntries(new FormData(event.currentTarget)) }); event.currentTarget.reset(); await reload() } catch (err) { setError(err.message) } }
  return <PublicShell><Wrap><div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm text-saffron-600">Phase 1 operations</p><h1 className="text-3xl font-semibold">Staff review queues</h1></div><StaffNav/></div><ErrorBox value={error}/>
    {overview && <div className="mt-5 grid gap-3 sm:grid-cols-4"><Stat v={overview.listing_reviews} l="Listing reviews"/><Stat v={overview.pending_bookings} l="Pending bookings"/><Stat v={overview.prepared_charts} l="Prepared charts"/><Stat v={overview.payment_exceptions} l="Payment exceptions"/></div>}
    <section className="mt-8"><h2 className="text-2xl font-semibold">Listing submissions</h2><div className="mt-3 space-y-3">{!revisions.length && <div className="card p-4">Queue is clear.</div>}{revisions.map(row => <div className="card flex flex-wrap items-center justify-between gap-4 p-4" key={row.uuid}><div><b>{row.name_en}</b><p className="text-sm text-brown-500">{row.code} · {row.listing_type} · submitted by {row.submitted_by || 'user'}</p></div><div className="flex gap-2"><button className="btn-g" onClick={() => decideRevision(row, 'request-changes')}>Request changes</button><button className="btn-p" onClick={() => decideRevision(row, 'approve')}>Approve + grant owner</button></div></div>)}</div></section>
    <section className="mt-8"><h2 className="text-2xl font-semibold">Bank verification</h2><div className="mt-3 space-y-3">{!banks.length && <div className="card p-4">Queue is clear.</div>}{banks.map(row => <div className="card flex flex-wrap items-center justify-between gap-4 p-4" key={row.uuid}><div><b>{row.listing}</b><p className="text-sm text-brown-500">{row.beneficiary_name} · •••• {row.account_last_four} · {row.ifsc} · {row.bank_name}</p></div><div className="flex gap-2"><button className="btn-g" onClick={() => decide(`staff/bank-accounts/${row.uuid}/reject`)}>Reject</button><button className="btn-p" onClick={() => decide(`staff/bank-accounts/${row.uuid}/verify`)}>Verify</button></div></div>)}</div></section>
    <section className="mt-8"><h2 className="text-2xl font-semibold">Event review</h2><div className="mt-3 space-y-3">{!events.length && <div className="card p-4">Queue is clear.</div>}{events.map(row => <div className="card flex flex-wrap items-center justify-between gap-4 p-4" key={row.uuid}><div><b>{row.name_en}</b><p className="text-sm text-brown-500">{row.host_listing?.name_en} · {row.registration_mode}</p></div><button className="btn-p" onClick={() => decide(`staff/events/${row.uuid}/approve`)}>Publish</button></div>)}</div></section>
    <section className="mt-8"><h2 className="text-2xl font-semibold">Create priced special-pooja event</h2><p className="text-sm text-brown-500">Staff-only in Phase 1; this creates a paid occurrence under an existing listing.</p><form onSubmit={createPaidEvent} className="card mt-3 grid gap-3 p-5 md:grid-cols-3"><Field label="Host listing"><select className="input" name="listing_uuid" required>{listings.map(row => <option value={row.uuid} key={row.uuid}>{row.name_en}</option>)}</select></Field><Field label="Event name"><Input name="name_en" required/></Field><Field label="Price ₹"><Input type="number" min="0.01" step="0.01" name="price" required/></Field><Field label="Date"><Input type="date" name="date" required/></Field><Field label="Start time"><Input type="time" name="start_time" required/></Field><Field label="Capacity"><Input type="number" min="1" name="capacity" defaultValue="50" required/></Field><Field label="Lead time hours"><Input type="number" min="0" name="lead_time_hours" defaultValue="8" required/></Field><div className="self-end md:col-span-2"><button className="btn-p">Publish priced special pooja</button></div></form></section>
  </Wrap></PublicShell>
}

export function StaffCharts() {
  const [rows, setRows] = useState([]); const [listings, setListings] = useState([])
  const load = useCallback(async () => { const [chartRows, payload] = await Promise.all([clientApi('staff/charts'), clientApi('listings?page_size=100', { auth: false })]); setRows(chartRows); setListings(payload.results || payload) }, [])
  const { error, setError, reload } = useStaff(load)
  async function prepare(event) { event.preventDefault(); try { await clientApi('staff/charts', { method: 'POST', body: Object.fromEntries(new FormData(event.currentTarget)) }); await reload() } catch (err) { setError(err.message) } }
  return <PublicShell><Wrap><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-semibold">Daily chart preparation</h1><p className="text-sm text-brown-500">Platform-fixed chart workflow; no vendor acknowledgement is required in Phase 1.</p></div><StaffNav/></div><ErrorBox value={error}/>
    <form onSubmit={prepare} className="card mt-6 grid gap-4 p-5 sm:grid-cols-3"><Field label="Published listing"><select className="input" name="listing_uuid" required>{listings.map(row => <option key={row.uuid} value={row.uuid}>{row.name_en}</option>)}</select></Field><Field label="Business date"><Input name="business_date" type="date" defaultValue={new Date().toISOString().slice(0, 10)} required/></Field><div className="self-end"><button className="btn-p w-full">Prepare chart</button></div></form>
    <div className="mt-6 space-y-3">{rows.map(row => <div className="card flex flex-wrap justify-between gap-3 p-4" key={row.uuid}><div><b>{row.code}</b><p className="text-sm text-brown-500">{row.listing} · {row.business_date} · {row.line_count} lines</p></div><span className="font-semibold">₹{row.total} · {row.status}</span></div>)}</div>
  </Wrap></PublicShell>
}

export function StaffPayouts() {
  const [rows, setRows] = useState([]); const [exports, setExports] = useState([]); const [message, setMessage] = useState('')
  const load = useCallback(async () => { const [payoutRows, exportRows] = await Promise.all([clientApi('finance/payouts'), clientApi('finance/payout-exports')]); setRows(payoutRows); setExports(exportRows) }, [])
  const { error, setError, reload } = useStaff(load)
  async function createExport() { try { const result = await clientApi('finance/payout-exports', { method: 'POST', headers: { 'Idempotency-Key': crypto.randomUUID() }, body: {} }); setMessage(`${result.code} created with ${result.row_count} payout(s).`); await reload() } catch (err) { setError(err.message) } }
  async function download(code) {
    try {
      const response = await fetch(`${API_ORIGIN}/finance/payout-exports/${code}/file`, { headers: { Authorization: `Bearer ${readAuth()?.access}` } })
      if (!response.ok) throw new Error('Could not download payout workbook.')
      const url = URL.createObjectURL(await response.blob()); const anchor = document.createElement('a'); anchor.href = url; anchor.download = `${code}.xlsx`; anchor.click(); URL.revokeObjectURL(url)
    } catch (err) { setError(err.message) }
  }
  return <PublicShell><Wrap><div className="flex flex-wrap items-end justify-between gap-4"><div><h1 className="text-3xl font-semibold">Linear daily payouts</h1><p className="text-sm text-brown-500">All pending Chart IDs roll forward until the accountant exports and completes them.</p></div><StaffNav/></div><ErrorBox value={error}/>{message && <p className="my-4 rounded-xl bg-emerald-50 p-3 text-emerald-700">{message}</p>}
    <div className="mt-6 flex justify-end"><button className="btn-p" onClick={createExport}>Export all pending to FedOne XLSX</button></div><div className="mt-4 space-y-3">{rows.map(row => <div className="card flex justify-between gap-3 p-4" key={row.uuid}><span><b>{row.chart_id}</b><small className="block text-brown-500">{row.listing}</small></span><b>₹{row.amount} · {row.status}</b></div>)}</div>
    <section className="mt-8"><h2 className="text-2xl font-semibold">Export history</h2><div className="mt-3 space-y-3">{exports.map(row => <div className="card flex items-center justify-between p-4" key={row.uuid}><span><b>{row.code}</b><small className="block text-brown-500">{row.row_count} rows · ₹{row.total_amount}</small></span><button className="btn-g" onClick={() => download(row.code)}>Download</button></div>)}</div></section>
  </Wrap></PublicShell>
}
