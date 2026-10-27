import test from 'node:test'
import assert from 'node:assert/strict'
import { safeNextPath, clientApi } from './client-api.js'
import { apiCollection, catalogueReference, listingPath } from './catalogue.js'

test('login redirects stay inside TempleAddress', () => {
  assert.equal(safeNextPath('/book/test-temple?pooja=P1'), '/book/test-temple?pooja=P1')
  assert.equal(safeNextPath('https://evil.example'), '/account')
  assert.equal(safeNextPath('//evil.example'), '/account')
})

test('catalogue resolves legacy codes through the API and preserves type identity', async () => {
  const fetcher = async path => {
    if (path === 'listings/F1016') throw Object.assign(new Error('missing slug'), { status: 404 })
    if (path.startsWith('listings?')) return { results: [{ code: 'F1016', slug: 'festival' }], next: null }
    return { code: 'F1016', slug: 'festival', listing_type: 'festival' }
  }
  assert.equal((await catalogueReference('listings', 'F1016', 'festival', fetcher)).slug, 'festival')
  await assert.rejects(catalogueReference('listings', 'festival', 'service', fetcher), error => error.status === 404)
  assert.equal(listingPath({ listing_type: 'service', slug: 'priest' }), '/service/priest')
})

test('API collections include later pages and propagate outages', async () => {
  const result = await apiCollection('events', async path => path.includes('page=1') ? { results: [{ code: 'EV1' }], next: 'page2' } : { results: [{ code: 'EV2' }], next: null })
  assert.equal(result.length, 2)
  await assert.rejects(catalogueReference('listings', 'temple', 'temple', async () => { throw Object.assign(new Error('Unavailable'), { status: 503 }) }), /Unavailable/)
})

test('expired access refreshes through the canonical endpoint and keeps friendly errors', async () => {
  const previousWindow = globalThis.window
  const previousFetch = globalThis.fetch
  const values = new Map([['ta-phase1-auth', JSON.stringify({ access: 'old', refresh: 'refresh' })]])
  globalThis.window = { localStorage: { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value), removeItem: key => values.delete(key) }, dispatchEvent() {} }
  const calls = []
  globalThis.fetch = async (url, options) => {
    calls.push([url, options])
    if (String(url).endsWith('auth/token/refresh')) return new Response(JSON.stringify({ data: { access: 'new', refresh: 'rotated' } }), { status: 200 })
    if (options.headers.Authorization === 'Bearer old') return new Response('{}', { status: 401 })
    return new Response(JSON.stringify({ error: { code: 'BOOKING_CLOSED', message: 'Please choose a later date.' } }), { status: 400 })
  }
  try {
    await assert.rejects(clientApi('bookings/quote'), /Please choose a later date/)
    assert.equal(calls.length, 3)
    assert.ok(calls[1][0].endsWith('auth/token/refresh'))
    assert.equal(calls[2][1].headers.Authorization, 'Bearer new')
    assert.ok(calls[2][1].headers['X-Device-ID'])
  } finally { globalThis.window = previousWindow; globalThis.fetch = previousFetch }
})
