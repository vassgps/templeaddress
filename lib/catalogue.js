import { apiFetch } from './api.js'

export const listingPath = listing => listing.listing_type === 'festival' ? `/festival/${listing.slug}` : listing.listing_type === 'service' ? `/service/${listing.slug}` : `/t/${listing.slug}`

export async function apiCollection(path, fetcher = apiFetch) {
  const [base, query = ''] = path.split('?')
  const params = new URLSearchParams(query)
  params.set('page_size', '100')
  const rows = []
  for (let page = 1; ; page++) {
    params.set('page', String(page))
    const data = await fetcher(`${base}?${params}`)
    const result = data.results || data
    rows.push(...result)
    if (Array.isArray(data) || !data.next) return rows
  }
}

export async function catalogueReference(kind, reference, type, fetcher = apiFetch) {
  let row
  try { row = await fetcher(`${kind}/${encodeURIComponent(reference)}`) }
  catch (error) {
    if (error.status !== 404) throw error
    const rows = await apiCollection(`${kind}${type ? `?type=${type}` : ''}`, fetcher)
    const match = rows.find(item => [item.slug, item.code, item.uuid].includes(reference))
    if (match) row = await fetcher(`${kind}/${encodeURIComponent(match.slug)}`)
  }
  if (!row || (type && row.listing_type !== type)) {
    const error = new Error('This published page could not be found.')
    error.status = 404
    throw error
  }
  return row
}
