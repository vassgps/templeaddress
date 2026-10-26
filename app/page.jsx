import { Phase1Home } from '@/components/phase1/Public'
import { apiFetch } from '@/lib/api'

export default async function Page() {
  const data = await apiFetch('home')
  return <Phase1Home listings={data.listings} events={data.events}/>
}
