import { apiCollection, listingPath } from '@/lib/catalogue'
const BASE = 'https://templeaddress.com'
export default async function sitemap() {
  const [listings, events] = await Promise.all([apiCollection('listings'), apiCollection('events')])
  const paths = ['/', '/temples', '/special', '/festival', '/services', '/submit-temple', '/login', '/whatsapp']
  return [...paths, ...listings.map(listingPath), ...events.map(row => `/events/${row.slug}`)].map(path => ({ url: `${BASE}${path}`, changeFrequency: 'weekly' }))
}
