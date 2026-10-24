import { ListingDirectory } from '@/components/phase1/Public'
import { getPublishedListings } from '@/lib/api'
export const metadata = { title: 'Temple Service Professionals', description: 'Find verified priests, astrologers, artists and temple service professionals.', alternates: { canonical: '/services' } }
export default async function Page() {
  const payload = await getPublishedListings('type=service&page_size=100')
  return <ListingDirectory title="Published service providers" listings={payload.results || payload} type="service"/>
}
