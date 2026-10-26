import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { api, resource } from '../api'
import { ServerCheckout, useApiResource } from '../apiBooking'
import { Field, Input, Money, Pill } from '../ui'

function Family() {
  const state = useApiResource('/me/family-members/'), [name, setName] = useState(''), [star, setStar] = useState(''), [error, setError] = useState(''), [busy, setBusy] = useState(false)
  const save = async e => {
    e.preventDefault(); setBusy(true); setError('')
    try { await api('/me/family-members/', { method: 'POST', body: { name, star_kind: 'nakshatra', star_value: star } }); setName(''); setStar(''); state.reload() }
    catch (error) { setError(error.message) } finally { setBusy(false) }
  }
  return <div className="card space-y-3 p-5"><h2 className="text-xl font-semibold">Family members</h2>{(state.data?.results || state.data || []).map(row => <p key={row.uuid}>{row.name} · {row.star_value}</p>)}{state.error && <p role="alert">{state.error.message}</p>}
    <form onSubmit={save} className="space-y-3"><Field label="Name"><Input required value={name} onChange={e => setName(e.target.value)}/></Field><Field label="Nakshatra"><Input value={star} onChange={e => setStar(e.target.value)}/></Field>{error && <p role="alert">{error}</p>}<button disabled={busy} className="btn-g">Add family member</button></form>
  </div>
}

export function ApiAccountBookings() {
  const [page, setPage] = useState(1), bookings = useApiResource(`/me/bookings?page=${page}`)
  const [retry, setRetry] = useState(null)
  return <div className="mt-6 space-y-5"><div className="grid gap-6 lg:grid-cols-[1fr_340px]"><section className="card space-y-4 p-5"><h2 className="text-xl font-semibold">My bookings & receipts</h2>
      {bookings.error && <p role="alert">{bookings.error.message}</p>}{!bookings.data && !bookings.error && <p>Loading…</p>}
      {bookings.data?.results?.length === 0 && <p>No bookings yet.</p>}
      {(bookings.data?.results || []).map(row => <article className="border-b border-brown-100 py-3" key={row.uuid}><div className="flex flex-wrap justify-between gap-3"><div><b>{row.listing.name_en}</b><p className="text-sm">{row.code}</p></div><Pill>{row.status}</Pill><Money v={row.amount_total}/></div>
        <div className="mt-2 text-sm">{row.items.map(item => <p key={item.uuid}>{item.item_name_en} · {item.service_date} · {item.devotee_name}</p>)}</div>
        {row.receipt_number && <Link className="btn-g mt-3" to={`/receipt/${row.code}`}>View receipt</Link>}
        {row.status === 'payment_pending' && <button className="btn-p mt-3" onClick={() => setRetry(row)}>Check / retry payment</button>}
      </article>)}
      {bookings.data && <div className="flex items-center gap-3"><button className="btn-g" disabled={!bookings.data.previous} onClick={() => setPage(p => p - 1)}>Previous</button><span>Page {page}</span><button className="btn-g" disabled={!bookings.data.next} onClick={() => setPage(p => p + 1)}>Next</button></div>}
    </section><aside className="space-y-5"><Family/></aside></div>
    {retry && <div className="card space-y-3 p-5"><ServerCheckout key={retry.code} existingBooking={retry} listing={{ ...retry.listing, name: retry.listing.name_en }} items={[]} contactName={retry.contact_name} contactMobile={retry.contact_mobile} contactEmail={retry.contact_email}/><button className="btn-g" onClick={() => { setRetry(null); bookings.reload() }}>Close</button></div>}
  </div>
}
