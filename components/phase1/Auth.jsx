'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { PublicShell, Field, Input, TempleMark } from '@/components/ui'
import { clientApi, saveAuth } from '@/lib/client-api'

export default function Phase1Login() {
  const router = useRouter()
  const params = useSearchParams()
  const [mobile, setMobile] = useState('+919999999999')
  const [name, setName] = useState('Demo Devotee')
  const [challenge, setChallenge] = useState(null)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  async function requestOtp(event) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const result = await clientApi('auth/otp/request', { method: 'POST', auth: false, body: { mobile_e164: mobile, purpose: 'login' } })
      setChallenge(result)
      if (result.debug_otp) setCode(result.debug_otp)
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  async function verify(event) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const result = await clientApi('auth/otp/verify', { method: 'POST', auth: false, body: { challenge_uuid: challenge.challenge_uuid, code, mobile_e164: mobile, name } })
      saveAuth(result)
      router.push(params.get('next') || (result.user?.is_staff ? '/staff' : '/account'))
      router.refresh()
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return <PublicShell><main className="mx-auto max-w-md px-4 py-12">
    <div className="text-center"><TempleMark size={46} className="mx-auto"/><h1 className="mt-4 text-3xl font-semibold">Login or register</h1><p className="mt-2 text-sm text-brown-500">One verified mobile account works on web and mobile. New devotees are registered automatically.</p></div>
    <form onSubmit={challenge ? verify : requestOtp} className="card mt-7 space-y-4 p-6">
      <Field label="Full name"><Input value={name} onChange={e => setName(e.target.value)} maxLength={160}/></Field>
      <Field label="Mobile number" hint="Use country code, for example +91"><Input value={mobile} onChange={e => setMobile(e.target.value.replace(/[^+\d]/g, ''))} required/></Field>
      {challenge && <Field label="6-digit OTP" hint={challenge.debug_otp ? `Local test OTP: ${challenge.debug_otp}` : `Sent to ${challenge.destination}`}><Input value={code} onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" required/></Field>}
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button disabled={busy} className="btn-p w-full">{busy ? 'Please wait…' : challenge ? 'Verify and continue' : 'Send OTP'}</button>
      {challenge && <button type="button" onClick={() => { setChallenge(null); setCode('') }} className="btn-g w-full">Change number</button>}
    </form>
    <p className="mt-4 text-center text-xs text-brown-500">Demo devotee: +919999999999 · Demo staff: +919999999998. The local OTP is filled automatically.</p>
    <p className="mt-3 text-center text-sm"><Link href="/temples" className="text-saffron-600">Continue browsing without login</Link></p>
  </main></PublicShell>
}
