import { Phase1Home } from '@/components/phase1/Public'
import { apiFetch } from '@/lib/api'

// Render on request; lib/api retains its 300-second fetch cache.
export const revalidate = 0

export default async function Page() {
  const data = await apiFetch('home')
  return <Phase1Home listings={data.listings} events={data.events}/>
}
