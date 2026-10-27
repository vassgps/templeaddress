'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SShell } from '@/components/pages/partners'
import { clientApi, requireAuth } from '@/lib/client-api'
import BookingCorrection from './BookingCorrection'

const configs = {
  bookings: { title: 'All bookings', path: 'staff/bookings', columns: ['Booking', 'Listing', 'Contact', 'Amount', 'Status'], order: '-created_at', statuses: ['confirmed', 'completed', 'payment_pending', 'expired'] },
  users: { title: 'All users', path: 'staff/users', columns: ['Name', 'Mobile', 'Email', 'Verified'], order: '-date_joined', statuses: [] },
  transactions: { title: 'All transactions', path: 'staff/payment-attempts', columns: ['Payment', 'Booking', 'Method', 'Payer total', 'Status'], order: '-created_at', statuses: ['authorized', 'capture_pending', 'captured', 'failed', 'exception', 'released'] },
  listings: { title: 'Listing queue', path: 'staff/listings', columns: ['Code', 'Name', 'Type', 'Status'], order: '-created_at', statuses: ['draft', 'review', 'published', 'rejected', 'disabled'] },
}

function RecordFields({ value }) {
  if (Array.isArray(value)) return <ul className="space-y-3">{value.map((row, index) => <li key={index}><RecordFields value={row}/></li>)}</ul>
  if (value && typeof value === 'object') return <dl className="space-y-3">{Object.entries(value).map(([key, item]) => <div key={key}><dt className="text-xs font-semibold capitalize text-brown-500">{key.replaceAll('_', ' ')}</dt><dd className="mt-1 break-words"><RecordFields value={item}/></dd></div>)}</dl>
  return <span>{value == null || value === '' ? 'Not recorded' : String(value)}</span>
}

export default function StaffDirectory({ kind }) {
  const config = configs[kind]
  const router = useRouter()
  const [search, setSearch] = useState(''), [status, setStatus] = useState(''), [order, setOrder] = useState(config.order), [page, setPage] = useState(1)
  const [payload, setPayload] = useState(null), [error, setError] = useState(''), [detail, setDetail] = useState(null)
  const load = useCallback(async () => {
    if (!requireAuth(router, window.location.pathname)) return
    const params = new URLSearchParams({ search, status, ordering: order, page: String(page) })
    setPayload(await clientApi(`${config.path}?${params}`))
  }, [config.path, search, status, order, page, router])
  useEffect(() => { setDetail(null); load().catch(error => setError(error.message)) }, [load])
  async function inspect(row) {
    try {
      const key = kind === 'bookings' ? row.code : row.uuid
      setDetail(kind === 'listings' ? row : await clientApi(`${config.path}/${key}`))
    } catch (error) { setError(error.message) }
  }
  const cells = row => kind === 'bookings' ? [row.code, row.listing.name_en, row.contact_name, row.amount_total, row.status]
    : kind === 'users' ? [row.name || row.username, row.mobile_e164, row.email, row.mobile_verified_at || row.google_verified_at ? 'Verified' : 'Pending']
      : kind === 'listings' ? [row.code, row.name_en, row.listing_type, row.publication_status]
        : [row.provider_payment_id, row.booking_code, row.method, row.payer_total || row.authorised_amount, row.status]
  return <SShell><h1 className="text-2xl font-semibold">{config.title}</h1><div className="my-5 flex flex-wrap gap-3"><input aria-label="Search records" className="input sm:max-w-xs" placeholder="Search" value={search} onChange={event => { setSearch(event.target.value); setPage(1) }}/>{config.statuses.length > 0 && <select aria-label="Filter status" className="input sm:max-w-xs" value={status} onChange={event => { setStatus(event.target.value); setPage(1) }}><option value="">All statuses</option>{config.statuses.map(value => <option key={value}>{value}</option>)}</select>}<select aria-label="Sort records" className="input sm:max-w-xs" value={order} onChange={event => { setOrder(event.target.value); setPage(1) }}><option value={config.order}>Newest first</option><option value={config.order.slice(1)}>Oldest first</option>{kind === 'bookings' && <option value="-amount_total">Highest amount</option>}{kind === 'users' && <option value="name">Name</option>}</select></div>
    {error && <p role="alert" className="my-3 text-red-700">{error}</p>}<div className="card overflow-x-auto"><table className="w-full"><thead><tr>{config.columns.map(column => <th className="th" key={column}>{column}</th>)}<th className="th">Details</th></tr></thead><tbody>{payload?.results.map(row => <tr key={row.uuid}>{cells(row).map((value, index) => <td className="td" key={index}>{value || '—'}</td>)}<td className="td"><button className="btn-g" onClick={() => inspect(row)}>View</button></td></tr>)}</tbody></table>{payload && !payload.results.length && <p className="p-5">No matching records.</p>}</div>
    <div className="mt-4 flex items-center gap-4"><button className="btn-g" disabled={!payload?.previous} onClick={() => setPage(page - 1)}>Previous</button><span>Page {page} · {payload?.count || 0} records</span><button className="btn-g" disabled={!payload?.next} onClick={() => setPage(page + 1)}>Next</button></div>
    {detail && <div role="dialog" aria-modal="true" aria-label="Record details" className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"><div className="card max-h-[85vh] w-full max-w-3xl overflow-auto p-6"><button className="btn-g float-right" onClick={() => setDetail(null)}>Close</button><h2 className="text-xl font-semibold">{detail.code || detail.name || detail.provider_payment_id || 'Record details'}</h2><div className="mt-4 text-sm"><RecordFields value={detail}/></div>{kind === 'bookings' && <BookingCorrection booking={detail} staff onSaved={async () => { setDetail(await clientApi(`staff/bookings/${detail.code}`)); await load() }}/>} {kind === 'listings' && <Link className="btn-p mt-3" href="/staff">Open review queues</Link>}</div></div>}
  </SShell>
}
