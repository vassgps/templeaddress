/**
 * /service/[id] — statically generated service professional profile
 * Next.js 16: params is a Promise.
 */
import { notFound } from 'next/navigation'
import { services } from '@/lib/data'
import { ServiceDetail } from '@/components/pages/public'

export async function generateStaticParams() {
  return services.map(s => ({ id: s.id }))
}
export async function generateMetadata({ params }) {
  const { id } = await params
  const svc = services.find(s => s.id === id)
  if (!svc) return { title: 'Service not found' }

  const title = `${svc.name} — ${svc.type}`
  const description = `${svc.name}, ${svc.type} in ${svc.place}, ${svc.district}. ${svc.exp} years experience. Book appointments on TempleAddress.`
  return {
    title,
    description,
    alternates: { canonical: `https://templeaddress.com/service/${id}` },
    openGraph: {
      title: `${title} | TempleAddress`,
      description,
      url:   `https://templeaddress.com/service/${id}`,
      type:  'profile',
      locale: 'en_IN',
    },
  }
}
export default async function ServicePageRoute({ params }) {
  const { id } = await params
  const svc = services.find(s => s.id === id)
  if (!svc) notFound()
  return <ServiceDetail />
}
