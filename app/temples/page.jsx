import { ListingDirectory } from '@/components/phase1/Public'
import { getPublishedListings } from '@/lib/api'

// Render on request; lib/api retains its 300-second fetch cache.
export const revalidate = 0

export const metadata = { title: 'Temple Directory', description: 'Find verified temples by deity, district or pooja and book vazhipadu online.', alternates: { canonical: '/temples' } }
export default async function Page() {
  const payload = await getPublishedListings('type=temple&page_size=100')
  return <ListingDirectory title="Published temples" listings={payload.results || payload} type="temple"/>
}
