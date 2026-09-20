import test from 'node:test'
import assert from 'node:assert/strict'
import { unavailable } from './booking.js'
const temple = {code:'T1',bookable:true,cutoff:'8:00 PM'}
const pooja = {code:'P1',bookable:true,bookingType:'Online',startTime:'7:00 AM',endTime:'9:00 AM',live:true,dailyLimit:2}
const now = new Date('2026-09-20T08:00:00+05:30')
test('live slot open until end, not after end', () => {
  assert.equal(unavailable(temple,pooja,'2026-09-20',1,[],now),'')
  assert.match(unavailable(temple,pooja,'2026-09-20',1,[],new Date('2026-09-20T09:00:00+05:30')),/ended/)
})
test('past, offline and invalid quantities blocked', () => {
  assert.match(unavailable(temple,pooja,'2026-09-19',1,[],now),/future/)
  assert.match(unavailable(temple,{...pooja,bookingType:'Offline'},'2026-09-21',1,[],now),/unavailable/)
  assert.match(unavailable(temple,pooja,'2026-09-21',0,[],now),/Quantity/)
})
test('non-live advance deadline and capacity enforced', () => {
  assert.match(unavailable(temple,{...pooja,live:false,minBookingTime:'2 days ahead'},'2026-09-21',1,[],now),/48 hours/)
  assert.equal(unavailable(temple,{...pooja,live:false,minBookingTime:'2 days ahead'},'2026-09-23',1,[],now),'')
  const records = [{status:'paid',templeCode:'T1',poojaCode:'P1',dates:['2026-09-21'],quantity:2}]
  assert.match(unavailable(temple,pooja,'2026-09-21',1,records,now),/0 places/)
})
test('blocked dates and weekday restrictions enforced', () => {
  assert.match(unavailable(temple,{...pooja,unavailableDates:['2026-09-21']},'2026-09-21',1,[],now),/unavailable/)
  assert.match(unavailable(temple,{...pooja,availableWeekdays:[5]},'2026-09-21',1,[],now),/weekday/)
})
