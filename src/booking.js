// Demo-only booking rules. Production must recheck capacity and payment on the server.
export const bookingKey = 'ta-pooja-bookings-v1'
export function readBookings() { try { return JSON.parse(sessionStorage.getItem(bookingKey) || '[]') } catch { return [] } }
export const indiaDate = (now = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now)
function time24(value) {
  const match = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(value || '')
  if (!match) return '00:00'
  return `${String(Number(match[1]) % 12 + (/PM/i.test(match[3]) ? 12 : 0)).padStart(2, '0')}:${match[2]}`
}
export function unavailable(temple, pooja, date, quantity = 1, records = [], now = new Date()) {
  if (!Number.isInteger(quantity) || quantity < 1 || quantity > 100) return 'Quantity must be a whole number between 1 and 100.'
  if (!temple.bookable || pooja.bookable === false || pooja.bookingType === 'Offline') return 'Online booking is unavailable. Please contact the temple.'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date) || date < indiaDate(now)) return 'Choose today or a future date.'
  if (pooja.availableFrom && date < pooja.availableFrom || pooja.availableTo && date > pooja.availableTo || pooja.unavailableDates?.includes(date)) return 'This date is unavailable.'
  const start = new Date(`${date}T${time24(pooja.startTime)}:00+05:30`)
  if (!pooja.startTime || !pooja.endTime) return 'Time slots have not been configured. Please contact the temple.'
  const end = new Date(`${date}T${time24(pooja.endTime || pooja.startTime)}:00+05:30`)
  if (pooja.availableWeekdays && !pooja.availableWeekdays.includes(new Date(`${date}T12:00:00+05:30`).getUTCDay())) return 'This pooja is not offered on this weekday.'
  if (end <= now) return 'This time slot has ended.'
  if (!pooja.live) {
    const days = Number(/(\d+) days? ahead/.exec(pooja.minBookingTime)?.[1] || 0)
    const hours = Number(pooja.cutoffHours || days * 24)
    const previous = new Date(`${date}T12:00:00Z`); previous.setUTCDate(previous.getUTCDate() - 1)
    const deadline = hours ? new Date(start.getTime() - hours * 3600000) : new Date(`${previous.toISOString().slice(0,10)}T${time24(temple.cutoff)}:00+05:30`)
    if (now >= deadline) return hours ? `Booking closes ${hours} hours before this pooja.` : `Booking closed at ${temple.cutoff} the previous day.`
  }
  const used = records.filter(r => r.status === 'paid' && r.templeCode === temple.code && r.poojaCode === pooja.code && r.dates.includes(date)).reduce((sum,r) => sum + r.quantity, 0)
  if (pooja.dailyLimit > 0 && used + quantity > pooja.dailyLimit) return `Only ${Math.max(0, pooja.dailyLimit - used)} places remain for this date.`
  return ''
}
