import Link from 'next/link'
import { PublicShell } from '@/components/ui'
import { apiCollection } from '@/lib/catalogue'

// Render on request; lib/api retains its 300-second fetch cache.
export const revalidate = 0

export const metadata = { title: 'Special Poojas', alternates: { canonical: '/special' } }
export default async function Page() {
  const events = (await apiCollection('events')).filter(row => row.kind === 'special_pooja')
  return <PublicShell><main className="mx-auto max-w-6xl px-4 py-10"><h1 className="text-4xl font-semibold">Special poojas</h1><div className="mt-6 grid gap-4 md:grid-cols-3">{events.map(row => <Link key={row.uuid} href={`/special/${row.slug}`} className="card p-5"><h2 className="text-xl font-semibold">{row.name_en}</h2><p>{row.host_listing?.name_en}</p></Link>)}</div>{!events.length && <p className="mt-5">No special poojas are currently published.</p>}</main></PublicShell>
}
