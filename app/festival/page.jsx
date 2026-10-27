import { ListingDirectory } from '@/components/phase1/Public'
import { apiCollection } from '@/lib/catalogue'
export const metadata = { title: 'Temple Festivals', alternates: { canonical: '/festival' } }
export default async function Page() {
  return <ListingDirectory title="Published festivals" type="festival" listings={await apiCollection('listings?type=festival')}/>
}
