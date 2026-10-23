/**
 * /festival/[code] — statically generated festival page
 * Next.js 16: params is a Promise.
 */
import { notFound } from 'next/navigation'
import { festivals } from '@/lib/data'
import { Festival } from '@/components/pages/public'

export async function generateStaticParams() {
  return festivals.map(f => ({ code: f.code }))
}
export async function generateMetadata({ params }) {
  const { code } = await params
  const festival = festivals.find(f => f.code === code)
  if (!festival) return { title: 'Festival not found' }

  const title = festival.name
  const description = `${festival.name} — ${festival.place ?? ''}, Kerala. Festival schedule, offerings, sponsors and visitor information on TempleAddress.`
  return {
    title,
    description,
    alternates: { canonical: `https://templeaddress.com/festival/${code}` },
    openGraph: {
      title: `${title} — TempleAddress`,
      description,
      url:   `https://templeaddress.com/festival/${code}`,
      type:  'website',
      locale: 'en_IN',
    },
  }
}
export default async function FestivalPageRoute({ params }) {
  const { code } = await params
  const festival = festivals.find(f => f.code === code)
  if (!festival) notFound()
  return <Festival />
}
