/**
 * /special/[id] — Special pooja detail page (SSG)
 * Next.js 16: params is a Promise.
 */
import { notFound } from 'next/navigation'
import { specials } from '@/lib/data'
import { SpecialDetail } from '@/components/pages/public'

export async function generateStaticParams() {
  return specials.map(s => ({ id: s.id }))
}

export async function generateMetadata({ params }) {
  const { id } = await params
  const sp = specials.find(s => s.id === id)
  if (!sp) return { title: 'Special pooja not found' }
  return {
    title: sp.name,
    description: `${sp.name} at ${sp.temple} — ₹${sp.price}. Book online on TempleAddress. Prasadam and photo proof on WhatsApp.`,
    alternates: { canonical: `https://templeaddress.com/special/${id}` },
    openGraph: { title: `${sp.name} | TempleAddress`, description: `Book ${sp.name} at ${sp.temple}`, url: `https://templeaddress.com/special/${id}`, type: 'website' },
  }
}

export default async function SpecialPageRoute({ params }) {
  const { id } = await params
  if (!specials.find(s => s.id === id)) notFound()
  return <SpecialDetail />
}
