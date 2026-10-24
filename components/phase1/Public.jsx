import Image from 'next/image'
import Link from 'next/link'
import { Clock3, Landmark, MapPin, ShieldCheck } from 'lucide-react'
import { PublicShell } from '@/components/ui'
import ListingDetailClient from '@/components/phase1/ListingDetailClient'

const Wrap = ({ children }) => <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

export function Phase1Home({ listings = [], events = [] }) {
  return <PublicShell><Wrap>
    <section className="rounded-3xl bg-temple-grad px-6 py-14 text-white md:px-12"><p className="text-sm font-semibold uppercase tracking-wider text-gold-300">TempleAddress Phase 1</p><h1 className="mt-3 max-w-3xl text-4xl font-semibold md:text-5xl">Discover verified temples, book poojas and support approved causes.</h1><p className="mt-4 max-w-2xl text-brown-100">Server-rendered from the Django catalogue, with OTP accounts, Razorpay booking, receipts, daily charts and traceable payouts.</p><div className="mt-6 flex flex-wrap gap-3"><Link className="btn bg-white text-brown-900" href="/temples">Browse temples</Link><Link className="btn border border-white/30 text-white" href="/services">Find services</Link></div></section>
    <section className="mt-10"><div className="flex items-end justify-between"><div><p className="text-sm text-saffron-600">Published by staff</p><h2 className="text-3xl font-semibold">Featured listings</h2></div><Link href="/temples" className="text-sm font-semibold text-saffron-700">View directory →</Link></div><div className="mt-5 grid gap-4 md:grid-cols-3">{listings.slice(0, 6).map(row => <Link className="card-premium p-5" href={`/t/${row.slug}`} key={row.uuid}><span className="pill bg-emerald-50 text-emerald-700">{row.listing_type}</span><h3 className="mt-3 text-xl font-semibold">{row.name_en}</h3><p className="mt-2 text-sm text-brown-500">{row.address}</p></Link>)}</div></section>
    {!!events.length && <section className="mt-10"><h2 className="text-3xl font-semibold">Upcoming events</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{events.slice(0, 6).map(row => <div className="card p-5" key={row.uuid}><b>{row.name_en}</b><p className="mt-1 text-sm text-brown-500">{row.host_listing?.name_en}</p><p className="mt-3 text-xs text-blue-700">{row.registration_mode === 'free_registration' ? 'Free registration' : 'Priced special pooja'}</p></div>)}</div></section>}
  </Wrap></PublicShell>
}

export function ListingDirectory({ title = 'TempleAddress listings', listings = [], type }) {
  return <PublicShell><Wrap>
    <div className="mb-8"><p className="text-sm font-semibold uppercase tracking-wide text-saffron-600">Verified directory</p><h1 className="mt-2 text-4xl font-semibold">{title}</h1><p className="mt-2 text-brown-500">Published Phase 1 profiles from the Django catalogue. Sensitive contacts are never included in this page data.</p></div>
    {!listings.length && <div className="card p-8">No published {type || ''} listings yet.</div>}
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{listings.map(item => <Link key={item.uuid} href={`/t/${item.slug}`} className="card-premium group overflow-hidden">
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
  </Wrap></PublicShell>
}

export function ListingDetail({ listing }) {
  return <ListingDetailClient listing={listing}/>
}
