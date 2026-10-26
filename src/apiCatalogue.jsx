import React, { createContext, useContext, useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams } from 'react-router-dom'
import { api, apiEnabled, resource } from './api'
import { PublicShell } from './ui'
import * as samples from './data'

const Catalogue = createContext(samples)
export const useCatalogue = () => useContext(Catalogue)
const rows = data => Array.isArray(data) ? data : data.results || []

export function listingFromApi(item) {
  const reviews = item.reviews || []
  const poojas = (item.poojas || []).map(p => ({
    ...p, name: p.name_en, ml: p.name_ml, price: Number(p.price), purpose: p.description_en,
    bookingType: p.booking_mode === 'online' ? 'Online' : 'Offline', live: p.is_live,
    bookable: p.booking_mode === 'online', dailyLimit: p.daily_capacity || 0,
    startTime: p.start_time || '', endTime: p.end_time || '', category: '',
    minBookingTime: `${p.lead_time_hours} hours ahead`,
  }))
  const programmes = item.programmes || []
  return {
    ...item, apiRecord: item, id: item.slug, name: item.name_en, ml: item.name_ml,
    district: item.district?.name_en || '', districtCode: item.district?.code,
    place: item.address || '', category: item.category?.name_en || '', type: item.category?.name_en || '',
    deity: item.main_deity || '', others: (item.deities || []).filter(d => !d.is_primary).map(d => d.name_en),
    hue: '#7A5238', plan: '', gateway: 'razorpay', g80: false, bookable: item.booking_enabled,
    about: item.description_en || item.short_description_en || '', story: '',
    history: item.history || '', remarks: item.remarks || '', speciality: item.speciality || '', guidelines: item.guidelines || '',
    poojas, publicPhone: '', publicEmail: '', upiId: '', chiefPriest: item.temple_profile?.chief_priest || '',
    timings: (item.opening_periods || []).map(p => `${p.label || ''} ${p.opens || ''}–${p.closes || ''}`).join(' · '),
    nearby: (item.nearby_places || []).map(p => p.name_en),
    rating: reviews.length ? Math.round(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length * 10) / 10 : 0,
    reviews: reviews.length, reviewCount: reviews.length,
    temple: item.name_en, from: item.listing_type === 'service' ? 0 : programmes[0]?.date || '',
    to: programmes.at(-1)?.date || '', committee: '', status: item.publication_status,
    programme: programmes.map(p => [p.date, p.name_en, `${p.start_time || ''}–${p.end_time || ''}`, p.kind, p.performer, 'Confirmed']),
    offerings: item.listing_type === 'service'
      ? (item.service_offerings || []).map(p => [p.name_en, Number(p.indicative_price_amount || 0), p.description_en || p.indicative_price_text])
      : poojas.map(p => ({ ...p, sold: 0 })),
    sponsorPacks: [], travel: [], artists: [], exp: '', slots: [], specials: [],
    availabilityDays: '', feedback: reviews.map((r, i) => [`Review ${i + 1}`, r.rating, '', r.body]),
  }
}

export function eventFromApi(item) {
  const occurrences = item.occurrences.filter(o => o.status === 'scheduled')
  const first = occurrences[0]
  return { ...item, apiRecord: item, id: item.slug, title: item.name_en, ml: item.name_ml,
    temple: listingFromApi(item.host_listing), price: Number(item.price), date: first?.date || '',
    seats: first?.capacity || 0, left: first?.capacity || 0, tag: item.kind, proof: item.proof_details || '',
    desc: item.description_en, hue: '#7A5238', occurrences }
}

export function ApiStatus({ error, retry }) {
  return <PublicShell hideChatbot><div className="mx-auto max-w-3xl px-4 py-10" role={error ? 'alert' : 'status'}>
    <h1 className="text-2xl font-semibold">{error?.status === 404 ? 'Listing not found' : error ? 'Unable to load this page' : 'Loading…'}</h1>
    {error && <><p className="mt-3">{error.message}</p><button className="btn-p mt-4" onClick={retry}>Try again</button><Link className="btn-g ml-2" to="/temples">Browse temples</Link></>}
  </div></PublicShell>
}

async function loadCatalogue(path, page, signal) {
  const result = { temples: [], festivals: [], services: [], specials: [] }
  const get = path => api(path, { auth: false, signal })
  let data, pagination
  if (path === '/') {
    data = await get('/home')
    for (const item of data.listings) result[`${item.listing_type === 'temple' ? 'temple' : item.listing_type === 'festival' ? 'festival' : 'service'}s`].push(listingFromApi(item))
    result.specials = data.events.filter(e => e.registration_mode === 'paid_booking').map(eventFromApi)
  } else if (path === '/special' || path.startsWith('/special/')) {
    if (path === '/special') {
      data = await get(`/events?page=${page}`)
      result.specials = rows(data).filter(e => e.registration_mode === 'paid_booking').map(eventFromApi)
      pagination = data
    } else result.specials = [eventFromApi(await get(`/events/${resource(decodeURIComponent(path.split('/')[2]))}`))]
  } else {
    const type = path.startsWith('/festival') ? 'festival' : path.startsWith('/service') ? 'service' : 'temple'
    const key = `${type}s`
    const segments = path.split('/')
    const identifier = segments[2] && decodeURIComponent(segments[2])
    if (!identifier) {
      data = await get(`/listings?type=${type}&page=${page}`)
      result[key] = rows(data).map(listingFromApi)
      pagination = data
    } else {
      // Festival links historically use stable codes. Resolve those without substituting another record.
      let slug = identifier
      if (type === 'festival' && /^[A-Z]\d+$/.test(identifier)) {
        let current = 1, found
        do {
          data = await get(`/listings?type=festival&page=${current++}&page_size=100`)
          found = rows(data).find(row => row.code === identifier)
        } while (!found && data.next)
        if (!found) throw Object.assign(new Error('Festival not found.'), { status: 404 })
        slug = found.slug
      }
      result[key] = [listingFromApi(await get(`/listings/${resource(slug)}`))]
    }
  }
  return { ...result, pagination }
}

export function ApiCatalogue({ children }) {
  const { pathname } = useLocation()
  const [query, setQuery] = useSearchParams()
  const page = Math.max(1, Number(query.get('page')) || 1)
  const supported = pathname === '/' || /^\/(temples|t\/|listing\/|book\/|donate\/|special(?:\/|$)|festival(?:\/|$)|services$|service\/)/.test(pathname)
  const [state, setState] = useState({}), [version, setVersion] = useState(0)
  const key = `${pathname}:${page}:${version}`
  useEffect(() => {
    if (!apiEnabled || !supported) return
    const controller = new AbortController()
    loadCatalogue(pathname, page, controller.signal)
      .then(data => setState({ key, data }))
      .catch(error => { if (!controller.signal.aborted) setState({ key, error }) })
    return () => controller.abort()
  }, [key, pathname, page, supported])
  if (!apiEnabled || !supported) return children
  if (state.key !== key || !state.data) return <ApiStatus error={state.key === key ? state.error : null} retry={() => setVersion(v => v + 1)}/>
  const pagination = state.data.pagination
  const changePage = next => { const params = new URLSearchParams(query); params.set('page', String(next)); setQuery(params); window.scrollTo(0, 0) }
  return <Catalogue.Provider value={state.data}>{children}{pagination && <div className="mx-auto flex max-w-6xl items-center justify-center gap-4 px-4 py-6">
    <button className="btn-g" disabled={!pagination.previous} onClick={() => changePage(page - 1)}>Previous</button>
    <span>Page {page} · {pagination.count} records</span><button className="btn-g" disabled={!pagination.next} onClick={() => changePage(page + 1)}>Next</button>
  </div>}</Catalogue.Provider>
}
