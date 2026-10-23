import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { PublicShell } from '../ui'
export const policies = {terms:'Terms of service',privacy:'Privacy policy',data:'Data policy',cancellation:'Cancellation policy',refund:'Refund policy'}
export function Policy() {
  const {kind} = useParams()
  return <PublicShell><div className="mx-auto max-w-3xl px-4 py-10"><h1 className="text-3xl font-semibold">{policies[kind] || 'Policy not found'}</h1><div className="card mt-6 space-y-4 p-6"><p>This prototype does not collect real payments or send OTP messages. Booking details are stored in your browser session for demonstration.</p><p>The approved {policies[kind]?.toLowerCase() || 'policy'} has not been supplied for this demo. Contact TempleAddress for the applicable published terms before making a real booking.</p><a className="text-saffron-700 underline" href="mailto:help@templeaddress.com">help@templeaddress.com</a><p>Production bookings must display the temple’s cancellation deadline and approved refund conditions before payment.</p></div><Link className="btn-g mt-4" to="/">Back to home</Link></div></PublicShell>
}
