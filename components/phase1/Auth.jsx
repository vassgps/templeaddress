'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { PublicShell, Field, Input, TempleMark } from '@/components/ui'
import { clientApi, readAuth, safeNextPath, saveAuth } from '@/lib/client-api'

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export default function Phase1Login() {
  const router = useRouter()
  const params = useSearchParams()
  const googleButton = useRef(null)
  const [mobile, setMobile] = useState('')
  const [name, setName] = useState('')
  const [challenge, setChallenge] = useState(null)
  const [code, setCode] = useState('')
  const [linking, setLinking] = useState(false)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const destination = safeNextPath(params.get('next'), '/account')

  function finish(result) {
    saveAuth(result)
    if (!result.user?.mobile_verified_at) {
      setLinking(true); setChallenge(null)
      return
    }
    router.replace(result.user?.is_staff ? '/staff' : destination)
    router.refresh()
  }

  useEffect(() => {
    const existing = readAuth()
    if (existing?.access && existing.user?.mobile_verified_at) router.replace(destination)
  }, [destination, router])

  useEffect(() => {
    if (!seconds) return
    const timer = window.setInterval(() => setSeconds(value => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [seconds])

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || linking) return
    const setup = () => {
      if (!window.google || !googleButton.current) return
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async ({ credential }) => {
          setBusy(true); setError('')
          try { finish(await clientApi('auth/google', { method: 'POST', auth: false, body: { credential } })) }
          catch (err) { setError(err.message) }
          finally { setBusy(false) }
        },
      })
      googleButton.current.replaceChildren()
      window.google.accounts.id.renderButton(googleButton.current, { theme: 'outline', size: 'large', width: 350, text: 'continue_with' })
    }
    if (window.google) setup()
    else {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true; script.defer = true; script.onload = setup
      document.head.appendChild(script)
      return () => script.remove()
    }
  // Google callback intentionally uses the current login destination.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [linking])

  async function requestOtp(event) {
    event?.preventDefault(); setBusy(true); setError('')
    try {
      const result = await clientApi(linking ? 'auth/mobile-link/request' : 'auth/otp/request', {
        method: 'POST', auth: linking, body: { mobile_e164: mobile },
      })
      setChallenge(result); setSeconds(60)
      if (result.debug_otp) setCode(result.debug_otp)
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  async function verify(event) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const result = await clientApi(linking ? 'auth/mobile-link/verify' : 'auth/otp/verify', {
        method: 'POST', auth: linking,
        body: { challenge_uuid: challenge.challenge_uuid, code, mobile_e164: mobile, name },
      })
      finish(result)
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return <PublicShell><main className="mx-auto max-w-md px-4 py-12">
    <div className="text-center"><TempleMark size={46} className="mx-auto"/><h1 className="mt-4 text-3xl font-semibold">{linking ? 'Verify your mobile' : 'Login or register'}</h1><p className="mt-2 text-sm text-brown-500">{linking ? 'A verified mobile is required before booking or donating.' : 'Use mobile OTP or Google. The same account works on web and the future mobile app.'}</p></div>
    {!linking && GOOGLE_CLIENT_ID && <><div className="card mt-7 flex justify-center p-5"><div ref={googleButton}/></div><div className="my-4 flex items-center gap-3 text-xs text-brown-400"><span className="h-px flex-1 bg-brown-100"/>or use mobile OTP<span className="h-px flex-1 bg-brown-100"/></div></>}
    <form onSubmit={challenge ? verify : requestOtp} className={`card ${!GOOGLE_CLIENT_ID || linking ? 'mt-7' : ''} space-y-4 p-6`}>
      {!linking && !challenge && <Field label="Full name" hint="Used when creating a new account"><Input value={name} onChange={event => setName(event.target.value)} maxLength={160}/></Field>}
      <Field label="Mobile number" hint="Include country code, for example +91"><Input value={mobile} onChange={event => setMobile(event.target.value.replace(/[^+\d]/g, ''))} placeholder="+919876543210" inputMode="tel" required disabled={Boolean(challenge)}/></Field>
      {challenge && <Field label="6-digit OTP" hint={challenge.debug_otp ? `Local test OTP: ${challenge.debug_otp}` : `Sent to ${challenge.destination}`}><Input value={code} onChange={event => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" required/></Field>}
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button disabled={busy || (challenge && code.length !== 6)} className="btn-p w-full">{busy ? 'Please wait…' : challenge ? 'Verify and continue' : 'Send OTP'}</button>
      {challenge && <div className="flex gap-2"><button type="button" onClick={() => { setChallenge(null); setCode('') }} className="btn-g flex-1">Change number</button><button type="button" disabled={busy || seconds > 0} onClick={requestOtp} className="btn-g flex-1">{seconds ? `Resend in ${seconds}s` : 'Resend OTP'}</button></div>}
    </form>
    <p className="mt-4 text-center text-xs text-brown-500">OTP expires in 5 minutes. TempleAddress never asks for your OTP outside this page.</p>
    <p className="mt-3 text-center text-sm"><Link href="/temples" className="text-saffron-600">Continue browsing without login</Link></p>
  </main></PublicShell>
}
