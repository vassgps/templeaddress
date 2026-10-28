import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { ListingDetail } from '@/components/phase1/Public'
import { getListing, getPublishedListings } from '@/lib/api'
import ListingUnavailable from '@/components/phase1/ListingUnavailable'

export async function generateStaticParams() {
  try {
    const payload = await getPublishedListings('type=temple&page_size=100')
    return (payload.results || payload).map(row => ({ slug: row.slug }))
  } catch { return [] }
}

async function load(slug) {
  try { return await getListing(slug) } catch (error) {
    if (error.status === 404) notFound()
    console.error('Public listing API request failed', error.status || 'network')
    return null
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const listing = await load(slug)
  if (!listing) return { title: 'Listing temporarily unavailable', robots: { index: false, follow: false } }
  const description = listing.seo_description || listing.short_description_en || `${listing.name_en} on TempleAddress.`
  return { title: listing.seo_title || listing.name_en, description, alternates: { canonical: `/t/${slug}` }, openGraph: { title: listing.name_en, description, type: 'website' } }
}

async function ListingContent({ params }) {
  const { slug } = await params
  const listing = await load(slug)
  if (!listing) return <ListingUnavailable/>
  const schema = { '@context': 'https://schema.org', '@type': listing.listing_type === 'service' ? 'ProfessionalService' : 'PlaceOfWorship', name: listing.name_en, description: listing.short_description_en, address: { '@type': 'PostalAddress', streetAddress: listing.address, postalCode: listing.pincode, addressCountry: 'IN' }, url: `https://templeaddress.com/t/${listing.slug}` }
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, '\\u003c') }}/><ListingDetail listing={listing}/></>
}

export default function Page(props) {
  return <Suspense fallback={<main className="mx-auto max-w-6xl px-4 py-16">Loading listing…</main>}><ListingContent {...props}/></Suspense>
}
