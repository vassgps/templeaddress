import { temples, festivals, services, specials } from '@/lib/data'
import { getPublishedListings } from '@/lib/api'

const BASE = 'https://templeaddress.com'
const now  = new Date().toISOString()

/** @returns {import('next').MetadataRoute.Sitemap} */
export default async function sitemap() {
  const static_pages = [
    ['/', 'daily',   1.0],
    ['/temples',  'daily',   0.9],
    ['/special',  'weekly',  0.8],
    ['/festival', 'weekly',  0.8],
    ['/services', 'weekly',  0.7],
    ['/sponsor',  'monthly', 0.6],
    ['/submit-temple', 'monthly', 0.5],
    ['/login',    'monthly', 0.4],
    ['/whatsapp', 'monthly', 0.4],
  ].map(([url, changeFrequency, priority]) => ({ url: `${BASE}${url}`, lastModified: now, changeFrequency, priority }))

  let apiListings = []
  try {
    const payload = await getPublishedListings('page_size=100')
    apiListings = payload?.results || payload || []
  } catch {
    // Build remains available when the local/API service is temporarily offline.
  }
  const sourceTemples = apiListings.filter(item => item.listing_type === 'temple')
  const temple_pages = (sourceTemples.length ? sourceTemples : temples).map(t => ({ url: `${BASE}/t/${t.slug}`, lastModified: now, changeFrequency: 'weekly', priority: 0.85 }))
  const festival_pages = festivals.map(f => ({ url: `${BASE}/festival/${f.code}`, lastModified: now, changeFrequency: 'weekly', priority: 0.75 }))
  const service_pages  = services.map(s => ({ url: `${BASE}/service/${s.id}`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 }))
  const special_pages  = specials.map(s => ({ url: `${BASE}/special/${s.id}`,   lastModified: now, changeFrequency: 'weekly',  priority: 0.7 }))

  return [...static_pages, ...temple_pages, ...festival_pages, ...service_pages, ...special_pages]
}
