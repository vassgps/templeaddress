// One transport for the existing /api/v1 contract. Tokens stay in this tab.
export const apiEnabled = import.meta.env?.VITE_API_ENABLED !== 'false'
const base = (import.meta.env?.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '')
const sessionKey = 'ta-api-session-v1'
let refreshPending

export function getSession() {
  try { return JSON.parse(sessionStorage.getItem(sessionKey) || 'null') } catch { return null }
}

export function setSession(session) {
  if (session) sessionStorage.setItem(sessionKey, JSON.stringify(session))
  else sessionStorage.removeItem(sessionKey)
  if (typeof window !== 'undefined') window.dispatchEvent(new Event('ta:session'))
}

export class ApiError extends Error {
  constructor(message, status, details) { super(message); this.status = status; this.details = details }
}

function errorText(value) {
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map(errorText).join(' ')
  if (value && typeof value === 'object') return Object.entries(value).map(([key, item]) => `${key === 'detail' || key === 'non_field_errors' ? '' : `${key}: `}${errorText(item)}`).join(' ')
  return ''
}

export async function api(path, { method = 'GET', body, auth = true, signal, headers = {}, retry = true } = {}) {
  // Paths are always relative resources, including pagination links converted by callers.
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Use a relative API resource.')
  const session = auth ? getSession() : null
  const requestHeaders = { Accept: 'application/json', 'X-Client': 'web', ...headers }
  if (session?.access) requestHeaders.Authorization = `Bearer ${session.access}`
  const multipart = typeof FormData !== 'undefined' && body instanceof FormData
  if (body !== undefined && !multipart) requestHeaders['Content-Type'] = 'application/json'
  let response
  try {
    response = await fetch(`${base}${path}`, {
      method, headers: requestHeaders, body: body === undefined ? undefined : multipart ? body : JSON.stringify(body),
      credentials: 'omit', signal: signal ? AbortSignal.any([signal, AbortSignal.timeout(30000)]) : AbortSignal.timeout(30000),
    })
  } catch (error) {
    if (error.name === 'AbortError') throw error
    throw new ApiError('Unable to reach TempleAddress. Check the backend connection and try again.', 0)
  }
  if (response.status === 401 && auth && retry && session?.refresh) {
    if (!refreshPending) {
      refreshPending = api('/users/token/refresh/', { method: 'POST', body: { refresh: session.refresh }, auth: false })
        .then(next => {
          // A refresh finishing after logout must never restore the session.
          if (getSession()?.refresh !== session.refresh) throw new ApiError('Please sign in again.', 401)
          setSession(next)
        })
        .catch(error => { if ([400, 401, 403].includes(error.status) && getSession()?.refresh === session.refresh) setSession(null); throw error })
        .finally(() => { refreshPending = null })
    }
    await refreshPending
    return api(path, { method, body, auth, signal, headers, retry: false })
  }
  let payload
  if (response.status === 204) return null
  try { payload = await response.json() } catch { throw new ApiError('The backend returned an invalid API response.', response.status) }
  if (!response.ok || payload.success === false) {
    if (response.status === 401 && auth && getSession()?.access === session?.access) setSession(null)
    const details = payload.error?.details || payload.data?.errors || payload.error || payload
    throw new ApiError(errorText(details) || payload.message || 'Request failed.', response.status, details)
  }
  return Object.hasOwn(payload, 'success') ? payload.data : payload
}

export async function logout() {
  const session = getSession()
  try { if (session) await api('/users/logout/', { method: 'POST', body: { refresh: session.refresh } }) }
  finally { setSession(null) }
}

export const resource = value => encodeURIComponent(value)
