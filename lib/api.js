const API_ORIGIN = process.env.TEMPLEADDRESS_API_URL || process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000'

export async function apiFetch(path, options = {}) {
  const url = `${API_ORIGIN.replace(/\/$/, '')}/api/v1/${path.replace(/^\//, '')}`
  const response = await fetch(url, {
    ...options,
    headers: { Accept: 'application/json', ...options.headers },
    next: options.next ?? { revalidate: 300 },
  })
  const body = await response.json().catch(() => null)
  if (!response.ok) {
    const error = new Error(body?.error?.message || `TempleAddress API returned ${response.status}`)
    error.status = response.status
    error.payload = body
    throw error
  }
  return body?.data ?? body
}

export const getPublishedListings = (params = '') => apiFetch(`listings${params ? `?${params}` : ''}`)
export const getListing = (slug) => apiFetch(`listings/${encodeURIComponent(slug)}`)
