import test from 'node:test'
import assert from 'node:assert/strict'
import { generateListingQr, listingQrKey, readListingQr, templePageUrl } from './listingQr.js'
import { temples } from './data.js'

const location = { origin: 'https://prototype.example', pathname: '/templeaddress/index.html' }
function browserStorage() {
  const records = new Map()
  return {
    writes: 0,
    getItem: key => records.get(key) ?? null,
    setItem(key, value) { this.writes++; records.set(key, value) },
  }
}

test('moderator and vendor generation reuse one saved QR after reload', () => {
  const storage = browserStorage()
  const first = generateListingQr(temples[0], storage, location)
  const loaded = readListingQr(temples[0].code, storage)
  const repeat = generateListingQr(temples[0], storage, location)
  assert.deepEqual(loaded, first)
  assert.deepEqual(repeat, first)
  assert.equal(storage.writes, 1)
})

test('existing QR retains its original destination and creation time after listing changes', () => {
  const storage = browserStorage()
  const first = generateListingQr(temples[0], storage, location)
  const repeat = generateListingQr({ ...temples[0], slug: 'renamed-temple' }, storage, { ...location, pathname: '/new-site/' })
  assert.deepEqual(repeat, first)
  assert.equal(storage.writes, 1)
})

test('every temple has a distinct QR targeting its actual public hash route', () => {
  const storage = browserStorage()
  const records = temples.map(temple => generateListingQr(temple, storage, location))
  assert.equal(new Set(records.map(record => record.targetUrl)).size, temples.length)
  records.forEach((record, index) => {
    const url = new URL(record.targetUrl)
    assert.equal(url.origin, location.origin)
    assert.equal(url.pathname, location.pathname)
    assert.equal(url.hash, `#/t/${temples[index].slug}`)
    assert.equal(record.listingCode, temples[index].code)
  })
})

test('invalid saved data is never silently replaced', () => {
  const storage = browserStorage()
  const key = listingQrKey(temples[0].code)
  for (const invalid of ['broken JSON', 'null', JSON.stringify({ version: 1, listingCode: 'OTHER', targetUrl: 'https://prototype.example/#/t/other', generatedAt: new Date().toISOString() })]) {
    storage.setItem(key, invalid)
    const writes = storage.writes
    assert.throws(() => generateListingQr(temples[0], storage, location))
    assert.equal(storage.getItem(key), invalid)
    assert.equal(storage.writes, writes)
  }
})

test('failed storage writes do not return an unsaved QR', () => {
  const storage = { getItem: () => null, setItem: () => { throw new Error('Storage quota exceeded') } }
  assert.throws(() => generateListingQr(temples[0], storage, location), /Storage quota exceeded/)
})

test('public URL preserves the deployment directory and safely encodes the slug', () => {
  assert.equal(templePageUrl({ slug: 'temple & shrine' }, location), 'https://prototype.example/templeaddress/index.html#/t/temple%20%26%20shrine')
  assert.throws(() => templePageUrl({ slug: '' }, location), /public temple page/)
  assert.throws(() => templePageUrl(temples[0], { origin: 'file://', pathname: '/tmp/index.html' }), /hosted website/)
})
