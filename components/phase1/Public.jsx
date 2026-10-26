import Link from 'next/link'
import { PublicShell } from '@/components/ui'
import ListingDetailClient from '@/components/phase1/ListingDetailClient'
import ListingDirectoryClient from '@/components/phase1/ListingDirectoryClient'

const Wrap = ({ children }) => <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>

export function Phase1Home({ listings = [], events = [] }) {
  return <PublicShell><Wrap>
    <section className="rounded-3xl bg-temple-grad px-6 py-14 text-white md:px-12"><p className="text-sm font-semibold uppercase tracking-wider text-gold-300">TempleAddress Phase 1</p><h1 className="mt-3 max-w-3xl text-4xl font-semibold md:text-5xl">Discover verified temples, book poojas and support approved causes.</h1><p className="mt-4 max-w-2xl text-brown-100">Server-rendered from the Django catalogue, with OTP accounts, Razorpay booking, receipts, daily charts and traceable payouts.</p><div className="mt-6 flex flex-wrap gap-3"><Link className="btn bg-white text-brown-900" href="/temples">Browse temples</Link><Link className="btn border border-white/30 text-white" href="/services">Find services</Link></div></section>
    <section className="mt-10"><div className="flex items-end justify-between"><div><p className="text-sm text-saffron-600">Published by staff</p><h2 className="text-3xl font-semibold">Featured listings</h2></div><Link href="/temples" className="text-sm font-semibold text-saffron-700">View directory →</Link></div><div className="mt-5 grid gap-4 md:grid-cols-3">{listings.slice(0, 6).map(row => <Link className="card-premium p-5" href={`/t/${row.slug}`} key={row.uuid}><span className="pill bg-emerald-50 text-emerald-700">{row.listing_type}</span><h3 className="mt-3 text-xl font-semibold">{row.name_en}</h3><p className="mt-2 text-sm text-brown-500">{row.address}</p></Link>)}</div></section>
    {!!events.length && <section className="mt-10"><h2 className="text-3xl font-semibold">Upcoming events</h2><div className="mt-5 grid gap-4 md:grid-cols-3">{events.slice(0, 6).map(row => <div className="card p-5" key={row.uuid}><b>{row.name_en}</b><p className="mt-1 text-sm text-brown-500">{row.host_listing?.name_en}</p><p className="mt-3 text-xs text-blue-700">{row.registration_mode === 'free_registration' ? 'Free registration' : 'Priced special pooja'}</p></div>)}</div></section>}
  </Wrap></PublicShell>
}

export function ListingDirectory({ title = 'TempleAddress listings', listings = [], type, initialQuery = '' }) {
  return <PublicShell><Wrap>
    <div className="mb-8"><p className="text-sm font-semibold uppercase tracking-wide text-saffron-600">Verified directory</p><h1 className="mt-2 text-4xl font-semibold">{title}</h1><p className="mt-2 text-brown-500">Published Phase 1 profiles from the Django catalogue. Sensitive contacts are never included in this page data.</p></div>
    <ListingDirectoryClient listings={listings} type={type} initialQuery={initialQuery}/>
  </Wrap></PublicShell>
}

export function ListingDetail({ listing }) {
  return <ListingDetailClient listing={listing}/>
}
