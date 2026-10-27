import { API_ORIGIN } from './api.js'

const TOKEN_KEY = 'ta-phase1-auth'
let refreshPromise = null

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

export function safeNextPath(value, fallback = '/account') {
  return typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') ? value : fallback
}

function messageFrom(payload, status) {
  const source = payload?.error?.fields || payload
  if (typeof payload?.error?.message === 'string') return payload.error.message
  if (typeof payload?.detail === 'string') return payload.detail
  if (typeof source === 'object' && source) {
    const value = Object.values(source).flat(Infinity).find(item => typeof item === 'string')
    if (value) return value
  }
  return `Request failed (${status})`
}

async function request(path, options, access) {
  const { method = 'GET', body, headers = {}, auth = true } = options
  return fetch(`${API_ORIGIN.replace(/\/$/, '')}/${path.replace(/^\//, '')}`, {
    method,
    headers: {
      Accept: 'application/json',
      ...(body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(auth && access ? { Authorization: `Bearer ${access}` } : {}),
      ...headers,
    },
    body: body == null ? undefined : body instanceof FormData ? body : JSON.stringify(body),
    cache: 'no-store',
  })
}

async function refreshAccess() {
  if (refreshPromise) return refreshPromise
  const session = readAuth()
  refreshPromise = (async () => {
    if (!session?.refresh) throw new Error('Your session has expired. Please sign in again.')
    const response = await request('auth/token/refresh', { method: 'POST', auth: false, body: { refresh: session.refresh } })
    const payload = await response.json().catch(() => null)
    const data = payload?.data ?? payload
    if (!response.ok || !data?.access) throw new Error('Your session has expired. Please sign in again.')
    if (readAuth()?.refresh !== session.refresh) throw new Error('The session changed. Please sign in again.')
    const updated = { ...session, ...data, access: data.access, refresh: data.refresh || session.refresh }
    saveAuth(updated)
    return updated.access
  })().catch(error => { if (readAuth()?.refresh === session?.refresh) clearAuth(); throw error }).finally(() => { refreshPromise = null })
  return refreshPromise
}

export async function clientApi(path, options = {}) {
  const auth = options.auth !== false
  let session = readAuth()
  let response = await request(path, options, session?.access)
  if (auth && response.status === 401 && session?.refresh) {
    const access = await refreshAccess()
    response = await request(path, options, access)
  }
  if (options.responseType === 'blob' && response.ok) return response.blob()
  const payload = await response.json().catch(() => null)
  if (!response.ok) {
    const error = new Error(messageFrom(payload, response.status))
    error.status = response.status
    error.fields = payload?.error?.fields || {}
    throw error
  }
  return payload?.data ?? payload
}

export async function logout() {
  const session = readAuth()
  try {
    if (session?.access) await clientApi('auth/logout', { method: 'POST', body: { refresh: session.refresh } })
  } finally {
    clearAuth()
  }
}

export function requireAuth(router, next) {
  const auth = readAuth()
  if (!auth?.access) {
    router.push(`/login?next=${encodeURIComponent(next || window.location.pathname)}`)
    return null
  }
  return auth
}
