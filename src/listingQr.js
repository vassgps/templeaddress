// The prototype has no listing API: QR records are shared by dashboards in this browser.
export const LISTING_QR_PREFIX = 'ta:listing-qr:v1:'

export function listingQrKey(code) {
  if (typeof code !== 'string' || !code.trim()) throw new Error('A listing code is required.')
  return `${LISTING_QR_PREFIX}${code}`
}

export function templePageUrl(temple, location = window.location) {
  if (!temple?.slug) throw new Error('A public temple page is required.')
  const url = new URL(`${location.origin}${location.pathname}`)
  if (!['http:', 'https:'].includes(url.protocol)) throw new Error('Open the hosted website to generate a temple QR.')
  url.hash = `/t/${encodeURIComponent(temple.slug)}`
  return url.href
}

export function readListingQr(code, storage = window.localStorage) {
  const saved = storage.getItem(listingQrKey(code))
  if (saved === null) return null
  const record = JSON.parse(saved)
  const url = new URL(record.targetUrl)
  if (record.version !== 1 || record.listingCode !== code || !['http:', 'https:'].includes(url.protocol) || !url.hash.startsWith('#/t/') || !Number.isFinite(Date.parse(record.generatedAt))) {
    throw new Error('The saved listing QR is invalid. It cannot be replaced automatically.')
  }
  return record
}

// Repeated requests return the original record, even if the listing slug has changed.
// Never replace an existing record or claim success when browser storage fails.
export function generateListingQr(temple, storage = window.localStorage, location = window.location) {
  const existing = readListingQr(temple.code, storage)
  if (existing) return existing
  const record = {
    version: 1,
    listingCode: temple.code,
    targetUrl: templePageUrl(temple, location),
    generatedAt: new Date().toISOString(),
  }
  storage.setItem(listingQrKey(temple.code), JSON.stringify(record))
  return record
}
