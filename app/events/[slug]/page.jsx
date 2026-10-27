import { notFound } from 'next/navigation'

import EventRegistration from '@/components/phase1/EventRegistration'
import { apiFetch } from '@/lib/api'

async function load(slug) {
  try { return await apiFetch(`events/${encodeURIComponent(slug)}`) }
  catch (error) { if (error.status === 404) notFound(); throw error }
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const event = await load(slug)
  return { title: event.name_en, description: event.description_en || `${event.name_en} at ${event.host_listing?.name_en || 'TempleAddress'}.` }
}

export default async function Page({ params }) {
  const { slug } = await params
  return <EventRegistration event={await load(slug)}/>
}
