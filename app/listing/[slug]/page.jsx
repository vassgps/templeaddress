import { permanentRedirect } from 'next/navigation'
import { temples } from '@/lib/data'

export function generateStaticParams() {
  return temples.map(({ slug }) => ({ slug }))
}

export default async function LegacyListingPage({ params }) {
  const { slug } = await params
  permanentRedirect(`/t/${encodeURIComponent(slug)}`)
}
