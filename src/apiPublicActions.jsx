import React, { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { api, resource } from './api'
import { useCatalogue } from './apiCatalogue'
import { useSession } from './apiAuth'
import { ServerCheckout } from './apiBooking'
import { PublicShell, Field, Input } from './ui'

export function ContactReveal({ listing }) {
  const session = useSession(), [contact, setContact] = useState(null), [error, setError] = useState(''), [busy, setBusy] = useState(false)
  const reveal = async () => {
    setBusy(true); setError('')
    try { setContact(await api(`/listings/${resource(listing.slug)}/contact-reveals`, { method: 'POST', body: {} })) }
    catch (error) { setError(error.message) } finally { setBusy(false) }
  }
  return <div className="my-3 space-y-2">{!session ? <Link className="btn-g" to={`/login?next=${encodeURIComponent(`/listing/${listing.slug}`)}`}>Sign in to view contact details</Link> : !contact ? <button disabled={busy} className="btn-g" onClick={reveal}>Show contact details</button> : <div className="flex flex-wrap gap-3">
    {contact.phone && <a className="btn-g" href={`tel:${contact.phone}`}>Call office</a>}{contact.whatsapp && <a className="btn-wa" href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer">WhatsApp</a>}{contact.email && <a className="btn-g" href={`mailto:${contact.email}`}>{contact.email}</a>}
  </div>}{error && <p role="alert">{error}</p>}</div>
}

export function EnquiryForm({ listing }) {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', message: '' }), [notice, setNotice] = useState(''), [busy, setBusy] = useState(false)
  const locked = useRef(false)
  const submit = async e => {
    e.preventDefault(); if (locked.current) return; locked.current = true; setBusy(true); setNotice('')
    try { await api(`/listings/${resource(listing.slug)}/enquiries`, { method: 'POST', auth: false, body: form }); setNotice('Enquiry sent.'); setForm({ name: '', mobile: '', email: '', message: '' }) }
    catch (error) { setNotice(error.message) } finally { locked.current = false; setBusy(false) }
  }
  return <form onSubmit={submit} className="card space-y-3 p-5"><h3 className="font-semibold">Contact / quick enquiry</h3><ContactReveal listing={listing}/>{[['name', 'Your name'], ['mobile', 'Mobile / WhatsApp'], ['email', 'Email (optional)']].map(([key, label]) => <Field key={key} label={label}><Input required={key !== 'email'} type={key === 'email' ? 'email' : key === 'mobile' ? 'tel' : 'text'} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })}/></Field>)}<Field label="Message"><textarea required className="input" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}/></Field>{notice && <p role="status">{notice}</p>}<button className="btn-wa w-full" disabled={busy}>Send enquiry</button></form>
}

export function ApiDonate() {
  const { slug } = useParams(), data = useCatalogue(), listing = [...data.temples, ...data.festivals].find(row => row.slug === slug)
  const purposes = listing?.donation_purposes || []
  const [purpose, setPurpose] = useState(purposes[0]?.uuid || ''), [amount, setAmount] = useState('1000'), [name, setName] = useState('')
  const session = useSession()
  const valid = /^\d+(\.\d{1,2})?$/.test(amount) && Number(amount) > 0 && purpose && name.trim()
  return <PublicShell hideChatbot><div className="mx-auto max-w-xl space-y-5 px-4 py-8"><h1 className="text-3xl font-semibold">Donate · {listing?.name}</h1>{!listing?.donation_enabled || !purposes.length ? <p>This listing is not accepting donations.</p> : <><div className="card space-y-4 p-6"><Field label="Purpose"><select className="input" value={purpose} onChange={e => setPurpose(e.target.value)}>{purposes.map(item => <option key={item.uuid} value={item.uuid}>{item.name_en}</option>)}</select></Field><Field label="Amount"><Input type="number" min="0.01" step="0.01" value={amount} onChange={e => setAmount(e.target.value)}/></Field><Field label="Donor name"><Input required value={name} onChange={e => setName(e.target.value)}/></Field></div>
    {valid && <ServerCheckout key={`${purpose}:${amount}:${name}`} listing={listing} contactName={name} contactMobile={session?.user?.mobile_e164 || ''} items={[{ item_type: 'donation', target_uuid: purpose, amount, devotee_name: name }]}/>}
  </>}</div></PublicShell>
}

export function SpecialCheckout({ event }) {
  const [occurrence, setOccurrence] = useState(event.occurrences[0]?.uuid || ''), [name, setName] = useState(''), [star, setStar] = useState('')
  const session = useSession()
  return <div className="space-y-4"><Field label="Date"><select className="input" value={occurrence} onChange={e => setOccurrence(e.target.value)}>{event.occurrences.map(item => <option key={item.uuid} value={item.uuid}>{item.date} · {item.start_time} IST</option>)}</select></Field><Field label="Devotee name"><Input value={name} onChange={e => setName(e.target.value)}/></Field><Field label="Nakshatra"><Input value={star} onChange={e => setStar(e.target.value)}/></Field>
    {occurrence && name.trim() && star.trim() && <ServerCheckout key={`${occurrence}:${name}:${star}`} listing={event.temple} contactName={name} contactMobile={session?.user?.mobile_e164 || ''} items={[{ item_type: 'special_pooja', target_uuid: occurrence, quantity: 1, devotee_name: name, star_kind: 'nakshatra', star_value: star }]}/>}
  </div>
}
