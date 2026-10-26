const origin = process.env.SMOKE_ORIGIN || 'http://127.0.0.1:3000'
const apiOrigin = `${origin}/api/backend`

async function api(path, { token, method = 'GET', body, headers = {} } = {}) {
  const response = await fetch(`${apiOrigin}/${path}`, {
    method,
    headers: { Accept: 'application/json', ...(body === undefined ? {} : { 'Content-Type': 'application/json' }), ...(token ? { Authorization: `Bearer ${token}` } : {}), ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  })
  const payload = await response.json().catch(() => null)
  if (!response.ok) throw new Error(`${method} ${path} → ${response.status}: ${JSON.stringify(payload)}`)
  return payload?.data ?? payload
}

async function login(mobile, name, password = '') {
  let challenge
  try {
    challenge = await api('users/login/', { method: 'POST', body: { identifier: mobile } })
  } catch (error) {
    challenge = await api('users/register/', { method: 'POST', body: { name, country_code: mobile.slice(0, 3), mobile_number: mobile.slice(3) } })
  }
  if (challenge.password_required) {
    if (!password) throw new Error('SMOKE_STAFF_PASSWORD is required for the seeded staff account.')
    challenge = await api('users/login/', { method: 'POST', body: { identifier: mobile, password, login_challenge_token: challenge.login_challenge_token } })
  }
  if (!challenge.debug_otp) throw new Error('Local debug OTP is disabled.')
  return api('users/login/verify-otp/', { method: 'POST', body: { challenge_uuid: challenge.challenge_uuid, otp: challenge.debug_otp, identifier: challenge.identifier || mobile } })
}

async function approveListing(staff, user, listing) {
  await api(`me/listings/${listing.uuid}/submit`, { token: user.access, method: 'POST', body: {} })
  const queue = await api('staff/listing-revisions', { token: staff.access })
  const revision = queue.find(row => row.listing_uuid === listing.uuid)
  if (!revision) throw new Error(`Submitted revision not found for ${listing.code}`)
  await api(`staff/listing-revisions/${revision.uuid}/approve`, { token: staff.access, method: 'POST', body: {} })
  await api(`staff/listings/${listing.uuid}/memberships`, { token: staff.access, method: 'POST', body: { user_uuid: user.user.uuid, role: 'owner' } })
}

const stamp = `${Date.now()}`.slice(-9)
const devotee = await login(`+919${stamp}`, `Smoke Devotee ${stamp}`)
const staff = await login('+919999999998', 'Demo Staff', process.env.SMOKE_STAFF_PASSWORD || '')
if (!staff.user.is_staff) throw new Error('Seeded staff account is not staff.')

const templeCreated = await api('me/listings', { token: devotee.access, method: 'POST', body: { listing_type: 'temple', name_en: `Smoke Temple ${stamp}`, address: 'Phase 1 Test Road, Kerala', pincode: '695001', payout_email: `accounts-${stamp}@example.com`, sections_completed: ['basics', 'contact'] } })
const temple = templeCreated.listing
await approveListing(staff, devotee, temple)

const bank = await api(`me/listings/${temple.uuid}/bank-accounts`, { token: devotee.access, method: 'POST', body: { beneficiary_name: temple.name_en, account_number: `12345${stamp}`, ifsc: 'FDRL0001001', bank_name: 'Federal Bank' } })
await api(`staff/bank-accounts/${bank.uuid}/verify`, { token: staff.access, method: 'POST', body: {} })

const pooja = await api(`me/managed-listings/${temple.uuid}/poojas`, { token: devotee.access, method: 'POST', body: { name_en: 'Smoke Archana', price: '101.00', start_time: '08:00', lead_time_hours: 8, daily_capacity: 10 } })
const purpose = await api(`me/managed-listings/${temple.uuid}/donation-purposes`, { token: devotee.access, method: 'POST', body: { name_en: 'Smoke Annadanam', suggested_amount: '151.00' } })
const event = await api(`me/managed-listings/${temple.uuid}/events`, { token: devotee.access, method: 'POST', body: { name_en: 'Smoke Free Event', date: new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 10), start_time: '17:00', default_capacity: 50 } })
await api(`staff/events/${event.uuid}/approve`, { token: staff.access, method: 'POST', body: {} })
if (!event.occurrences?.[0]) throw new Error('Event occurrence was not created.')
await api(`events/${event.uuid}/occurrences/${event.occurrences[0].uuid}/registrations`, { token: devotee.access, method: 'POST', headers: { 'Idempotency-Key': crypto.randomUUID() }, body: { attendee_name: devotee.user.name, attendees: 1 } })
const paidEvent = await api('staff/paid-events', { token: staff.access, method: 'POST', body: { listing_uuid: temple.uuid, name_en: `Smoke Special Pooja ${stamp}`, price: '251.00', date: new Date(Date.now() + 86400000 * 6).toISOString().slice(0, 10), start_time: '09:00', capacity: 25, lead_time_hours: 8 } })

const serviceCreated = await api('me/listings', { token: devotee.access, method: 'POST', body: { listing_type: 'service', name_en: `Smoke Poojari ${stamp}`, address: 'Phase 1 Service Address', phone: '+919900000000', sections_completed: ['basics', 'contact'] } })
await approveListing(staff, devotee, serviceCreated.listing)
await api(`me/managed-listings/${serviceCreated.listing.uuid}/service-offerings`, { token: devotee.access, method: 'POST', body: { name_en: 'Sree Chakra Pooja', indicative_price_text: 'Contact for details', duration_text: '90 minutes', availability_text: 'By appointment' } })

const item = { item_type: 'donation', target_uuid: purpose.uuid, amount: '151.00' }
const quote = await api('bookings/quote', { token: devotee.access, method: 'POST', body: { listing_uuid: temple.uuid, items: [item] } })
if (quote.amount_total !== '151.00') throw new Error(`Unexpected quote ${quote.amount_total}`)
const key = crypto.randomUUID()
const booking = await api('bookings', { token: devotee.access, method: 'POST', headers: { 'Idempotency-Key': key, 'X-Client': 'smoke' }, body: { listing_uuid: temple.uuid, contact_name: devotee.user.name, client_reference: key, items: [item] } })
const paid = await api(`dev/payment-orders/${booking.payment_order.uuid}/authorize`, { token: devotee.access, method: 'POST', body: { method: 'upi' } })
if (!paid.receipt_number || paid.status !== 'completed') throw new Error('Donation capture did not issue a completed receipt.')
await api(`me/receipts/${paid.receipt_number}`, { token: devotee.access })

const poojaDate = new Date(Date.now() + 86400000 * 5).toISOString().slice(0, 10)
const poojaItem = { item_type: 'pooja', target_uuid: pooja.uuid, service_date: poojaDate, quantity: 1, devotee_name: devotee.user.name, star_value: 'Rohini' }
const poojaKey = crypto.randomUUID()
const poojaBooking = await api('bookings', { token: devotee.access, method: 'POST', headers: { 'Idempotency-Key': poojaKey, 'X-Client': 'smoke' }, body: { listing_uuid: temple.uuid, contact_name: devotee.user.name, client_reference: poojaKey, items: [poojaItem] } })
const poojaPaid = await api(`dev/payment-orders/${poojaBooking.payment_order.uuid}/authorize`, { token: devotee.access, method: 'POST', body: { method: 'upi' } })
if (!poojaPaid.receipt_number || poojaPaid.status !== 'confirmed') throw new Error('Pooja booking was not confirmed and receipted.')
const specialKey = crypto.randomUUID()
const specialBooking = await api('bookings', { token: devotee.access, method: 'POST', headers: { 'Idempotency-Key': specialKey, 'X-Client': 'smoke' }, body: { listing_uuid: temple.uuid, contact_name: devotee.user.name, client_reference: specialKey, items: [{ item_type: 'special_pooja', target_uuid: paidEvent.occurrences[0].uuid, quantity: 1, devotee_name: devotee.user.name }] } })
const specialPaid = await api(`dev/payment-orders/${specialBooking.payment_order.uuid}/authorize`, { token: devotee.access, method: 'POST', body: { method: 'upi' } })
if (!specialPaid.receipt_number || specialPaid.status !== 'confirmed') throw new Error('Special-pooja event booking was not confirmed.')

const businessDate = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date())
const chart = await api('staff/charts', { token: staff.access, method: 'POST', body: { listing_uuid: temple.uuid, business_date: businessDate } })
if (chart.total !== '151.00') throw new Error(`Unexpected chart total ${chart.total}`)
const payouts = await api('finance/payouts', { token: staff.access })
const payout = payouts.find(row => row.chart_id === chart.code)
if (!payout) throw new Error('Chart payout was not created.')
const exportKey = crypto.randomUUID()
const payoutExport = await api('finance/payout-exports', { token: staff.access, method: 'POST', headers: { 'Idempotency-Key': exportKey }, body: { payout_uuids: [payout.uuid] } })
const workbook = await fetch(`${apiOrigin}/finance/payout-exports/${payoutExport.code}/file`, { headers: { Authorization: `Bearer ${staff.access}` } })
if (!workbook.ok || (await workbook.arrayBuffer()).byteLength < 1000) throw new Error('FedOne payout workbook download failed.')

for (const path of ['/', '/temples', `/t/${temple.slug}`, `/book/${temple.slug}`, `/donate/${temple.slug}`, '/login', '/staff', '/staff/charts', '/staff/payouts']) {
  const response = await fetch(`${origin}${path}`)
  if (!response.ok) throw new Error(`Page ${path} returned ${response.status}`)
}

console.log(JSON.stringify({ ok: true, user: devotee.user.mobile_e164, listing: temple.slug, service: serviceCreated.listing.slug, pooja_booking: poojaPaid.code, special_pooja_booking: specialPaid.code, donation_booking: paid.code, donation_receipt: paid.receipt_number, chart: chart.code, payout_export: payoutExport.code }, null, 2))
