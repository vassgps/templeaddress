'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock3, Landmark, MapPin, Search, ShieldCheck, SlidersHorizontal } from 'lucide-react'
import { filterListings, listingFacets } from '@/lib/listing-search'

export default function ListingDirectoryClient({ listings = [], type, initialQuery = '' }) {
  const [query, setQuery] = useState(initialQuery)
  const [district, setDistrict] = useState('')
  const [deity, setDeity] = useState('')
  const [category, setCategory] = useState('')
  const [bookable, setBookable] = useState(false)
  const [sort, setSort] = useState('name_asc')
  const districts = useMemo(() => listingFacets(listings, 'district'), [listings])
  const deities = useMemo(() => [...new Set(listings.map(row => row.main_deity).filter(Boolean))].sort(), [listings])
  const categories = useMemo(() => listingFacets(listings, 'category'), [listings])
  const results = useMemo(() => filterListings(listings, { query, district, deity, category, bookable, sort }), [listings, query, district, deity, category, bookable, sort])
  const filtered = query || district || deity || category || bookable

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('q')
    if (requested) setQuery(requested)
  }, [])

  function reset() {
    setQuery(''); setDistrict(''); setDeity(''); setCategory(''); setBookable(false); setSort('name_asc')
  }

  return <>
    <section className="card mb-6 p-5" aria-label="Listing search filters">
      <div className="mb-4 flex items-center gap-2"><SlidersHorizontal size={17} className="text-saffron-600"/><h2 className="font-semibold">Search and filter</h2></div>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <label className="lg:col-span-2"><span className="mb-1 block text-xs font-semibold uppercase text-brown-500">Search</span><span className="relative block"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brown-400"/><input className="input !pl-9" value={query} onChange={event => setQuery(event.target.value)} placeholder="Name, code, deity or place"/></span></label>
        <label><span className="mb-1 block text-xs font-semibold uppercase text-brown-500">District</span><select className="input" value={district} onChange={event => setDistrict(event.target.value)}><option value="">All districts</option>{districts.map(value => <option key={value}>{value}</option>)}</select></label>
        <label><span className="mb-1 block text-xs font-semibold uppercase text-brown-500">{type === 'service' ? 'Category' : 'Main deity'}</span><select className="input" value={type === 'service' ? category : deity} onChange={event => type === 'service' ? setCategory(event.target.value) : setDeity(event.target.value)}><option value="">All {type === 'service' ? 'categories' : 'deities'}</option>{(type === 'service' ? categories : deities).map(value => <option key={value}>{value}</option>)}</select></label>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-brown-100 pt-4">
        {type === 'temple' && <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={bookable} onChange={event => setBookable(event.target.checked)}/>Pooja booking open</label>}
        <label className="ml-auto flex items-center gap-2 text-sm"><span className="text-brown-500">Sort</span><select className="input !w-auto !py-2" value={sort} onChange={event => setSort(event.target.value)}><option value="name_asc">Name A–Z</option><option value="name_desc">Name Z–A</option></select></label>
        <button type="button" className="btn-g !py-2" onClick={reset}>Reset</button>
      </div>
    </section>

    <div className="mb-4 flex items-end justify-between gap-3"><div><h2 className="text-xl font-semibold">Search results</h2><p className="text-sm text-brown-500">{results.length} {results.length === 1 ? 'listing' : 'listings'}{query && <> for “{query}”</>}</p></div></div>
    {!results.length && <div className="card p-8 text-center"><Search size={28} className="mx-auto text-brown-300"/><h3 className="mt-3 font-semibold">No listings match these filters</h3><p className="mt-1 text-sm text-brown-500">Try another name, place or filter.</p>{filtered && <button type="button" onClick={reset} className="btn-g mt-4">Clear filters</button>}</div>}
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{results.map(item => <Link key={item.uuid} href={`/t/${item.slug}`} className="card-premium group overflow-hidden">
      <div className="relative aspect-[16/10] bg-brown-100">
        {item.cover ? <Image src={item.cover} alt={item.name_en} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition duration-300 group-hover:scale-105"/> : <span className="grid h-full place-items-center text-saffron-700"><Landmark size={38}/></span>}
        <span className="pill absolute right-3 top-3 bg-white/95 text-emerald-700 shadow-sm"><ShieldCheck size={12}/>Verified</span>
        <span className="pill absolute left-3 top-3 bg-brown-900/85 text-white">{item.code}</span>
      </div>
      <div className="p-5">
        <h2 className="text-xl font-semibold">{item.name_en}</h2>{item.name_ml && <p className="ml text-sm text-brown-500">{item.name_ml}</p>}
        {item.main_deity && <p className="mt-2 text-sm font-medium text-saffron-700">Main deity · {item.main_deity}</p>}
        <p className="mt-3 flex items-start gap-2 text-sm text-brown-500"><MapPin size={15} className="mt-0.5 shrink-0"/>{item.address || 'Location available on detail page'}</p>
        {!!item.opening_periods?.length && <p className="mt-2 flex items-start gap-2 text-xs text-brown-500"><Clock3 size={14} className="mt-0.5 shrink-0"/>{item.opening_periods.map(period => `${period.label}: ${period.opens}–${period.closes}`).join(' · ')}</p>}
        <div className="mt-4 flex flex-wrap gap-2">{item.booking_enabled ? <span className="pill bg-saffron-50 text-saffron-700">Pooja booking</span> : <span className="pill bg-brown-100 text-brown-500">Profile only</span>}{item.donation_enabled && <span className="pill bg-blue-50 text-blue-700">Donations</span>}{item.listing_type === 'service' && <span className="pill bg-brown-100">Enquiry only</span>}</div>
      </div>
    </Link>)}</div>
  </>
}
