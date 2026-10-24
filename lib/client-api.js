import { API_ORIGIN } from './api'

const TOKEN_KEY = 'ta-phase1-auth'

export function readAuth() {
  if (typeof window === 'undefined') return null
  try { return JSON.parse(window.localStorage.getItem(TOKEN_KEY) || 'null') } catch { return null }
}

export function saveAuth(auth) {
  window.localStorage.setItem(TOKEN_KEY, JSON.stringify(auth))
  window.dispatchEvent(new Event('ta:auth'))
}

export function clearAuth() {
  window.localStorage.removeItem(TOKEN_KEY)
  window.dispatchEvent(new Event('ta:auth'))
}

export async function clientApi(path, { method = 'GET', body, headers = {}, auth = true } = {}) {
  const session = readAuth()
  const response = await fetch(`${API_ORIGIN.replace(/\/$/, '')}/${path.replace(/^\//, '')}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(auth && session?.access ? { Authorization: `Bearer ${session.access}` } : {}),
      ...headers,
    },
    body: body == null ? undefined : body instanceof FormData ? body : JSON.stringify(body),
    cache: 'no-store',
  })
  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    const error = new Error(payload?.error?.message || payload?.detail || `Request failed (${response.status})`)
    error.status = response.status
    error.fields = payload?.error?.fields || {}
    throw error
  }
  return payload?.data ?? payload
}

export function requireAuth(router, next) {
  const auth = readAuth()
  if (!auth?.access) {
    router.push(`/login?next=${encodeURIComponent(next || window.location.pathname)}`)
    return null
  }
  return auth
}
