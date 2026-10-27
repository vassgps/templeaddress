import { notFound } from 'next/navigation'
import { catalogueReference, listingPath } from '@/lib/catalogue'
import ListingDetailClient from './ListingDetailClient'
import EventRegistration from './EventRegistration'

export async function loadCatalogue(kind, reference, type) {
  try { return await catalogueReference(kind, reference, type) }
  catch (error) { if (error.status === 404) notFound(); throw error }
}

export async function catalogueMetadata(kind, reference, type) {
  const row = await loadCatalogue(kind, reference, type)
  return { title: row.seo_title || row.name_en, description: row.seo_description || row.short_description_en || row.description_en,
    alternates: { canonical: kind === 'events' ? `/events/${row.slug}` : listingPath(row) } }
}

export async function CataloguePage({ kind = 'listings', reference, type }) {
  const row = await loadCatalogue(kind, reference, type)
  return kind === 'events' ? <EventRegistration event={row}/> : <ListingDetailClient listing={row}/>
}
