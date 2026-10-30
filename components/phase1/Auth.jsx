'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { PublicShell, Field, Input, TempleMark } from '@/components/ui'
import { clientApi, needsMobileVerification, readAuth, safeNextPath, saveAuth } from '@/lib/client-api'

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
import { rolesFor, staffNext } from '@/lib/staff-access'

const countryOptions = ['+91', '+971', '+968', '+1', '+44']

function mobileIdentifier(countryCode, value) {
  const clean = value.trim()
  if (clean.includes('@')) return clean.toLowerCase()
  const digits = clean.replace(/\D/g, '')
  const country = countryCode.replace(/\D/g, '')
  return `+${digits.startsWith(country) && digits.length > 10 ? digits : `${country}${digits}`}`
}

// One login for every public user, as in the prototype: mobile OTP or Google. New devotees are created on first
// verified login and asked for their name once. Staff are sent to the password step by the server.
export default function Phase1Login() {
  const router = useRouter()
  const params = useSearchParams()
  const googleButton = useRef(null)
  const recaptchaBox = useRef(null)
  const [step, setStep] = useState('identify')
  const [countryCode, setCountryCode] = useState('+91')
  const [identifier, setIdentifier] = useState('')
  const [activeIdentifier, setActiveIdentifier] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginChallenge, setLoginChallenge] = useState('')
  const [otpChallenge, setOtpChallenge] = useState(null)
  const [code, setCode] = useState('')
  const [googleSignup, setGoogleSignup] = useState(null)
  const [pendingSession, setPendingSession] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [recaptchaRequired, setRecaptchaRequired] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const destination = safeNextPath(params.get('next') || params.get('redirect'), '/account')
  const linkingMobile = step === 'google_mobile' || step === 'google_mobile_otp'
  const verifyingOtp = step === 'otp' || step === 'google_mobile_otp'

  const finish = useCallback(result => {
    saveAuth(result)
    if (needsMobileVerification(result.user)) {
      setName(result.user.name || ''); setEmail(result.user.email || '')
      setIdentifier(result.user.mobile_e164 || ''); setActiveIdentifier('')
      setOtpChallenge(null); setCode(''); setStep('google_mobile')
      setRecaptchaRequired(false); setRecaptchaToken(''); setNotice('')
      return
    }
    if (!result.user?.name && !rolesFor(result.user).length && !result.user?.is_staff) { setPendingSession(result); setEmail(result.user?.email || ''); setStep('profile'); return }
    router.replace(rolesFor(result.user).length ? staffNext(result.user, destination) : destination)
    router.refresh()
  }, [destination, router])

  function reset() {
    setStep('identify'); setError(''); setNotice(''); setPassword('')
    setLoginChallenge(''); setOtpChallenge(null); setCode(''); setGoogleSignup(null)
    setRecaptchaRequired(false); setRecaptchaToken('')
  }

  useEffect(() => {
    const session = readAuth()
    if (session?.access) finish(session)
  }, [finish])

  useEffect(() => {
    if (!seconds) return
    const timer = window.setInterval(() => setSeconds(value => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [seconds])

  useEffect(() => {
    if (!recaptchaRequired || !RECAPTCHA_SITE_KEY || !recaptchaBox.current) return
    const render = () => window.grecaptcha?.ready(() => {
      if (!recaptchaBox.current || recaptchaBox.current.dataset.rendered) return
      window.grecaptcha.render(recaptchaBox.current, { sitekey: RECAPTCHA_SITE_KEY, callback: token => setRecaptchaToken(token), 'expired-callback': () => setRecaptchaToken('') })
      recaptchaBox.current.dataset.rendered = 'true'
    })
    if (window.grecaptcha) render()
    else {
      const script = document.createElement('script')
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'; script.async = true; script.defer = true; script.onload = render
      document.head.appendChild(script)
      return () => script.remove()
    }
  }, [recaptchaRequired])

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID || step !== 'identify') return
    const setup = () => {
      if (!window.google?.accounts?.id || !googleButton.current) return
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: async ({ credential }) => {
          setBusy(true); setError('')
          try {
            const result = await clientApi('auth/google', { method: 'POST', auth: false, body: { provider: 'google', credential } })
            if (result.profile_completion_required) {
              setGoogleSignup(result); setName(result.google_profile?.name || ''); setEmail(result.google_profile?.email || ''); setIdentifier(''); setStep('google_profile')
            } else finish(result)
          } catch (err) { setError(err.message) } finally { setBusy(false) }
        },
      })
      googleButton.current.replaceChildren()
      window.google.accounts.id.renderButton(googleButton.current, { theme: 'outline', size: 'large', width: 320, shape: 'pill', text: 'continue_with', locale: 'en' })
    }
    if (window.google?.accounts?.id) setup()
    else {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'; script.async = true; script.defer = true; script.onload = setup
      document.head.appendChild(script)
      return () => script.remove()
    }
  }, [finish, step])

  async function requestOtp({ staffPassword = '', channel = '' } = {}) {
    setBusy(true); setError(''); setNotice('')
    try {
      const normalized = activeIdentifier || mobileIdentifier(countryCode, identifier)
      const result = await clientApi('auth/otp/request', {
        method: 'POST', auth: false,
        body: { identifier: normalized, country_code: countryCode, password: staffPassword || undefined, login_challenge_token: loginChallenge || undefined, recaptcha_token: recaptchaToken, ...(channel ? { channel } : {}) },
      })
      if (result.recaptcha_required) { setRecaptchaRequired(true); setNotice('Complete reCAPTCHA, then continue.'); return }
      if (result.password_required) { setActiveIdentifier(normalized); setLoginChallenge(result.login_challenge_token); setStep('password'); return }
      if (result.otp_sent) {
        setActiveIdentifier(result.identifier || normalized); setOtpChallenge(result); setCode(result.debug_otp || ''); setStep('otp'); setSeconds(30)
        if (channel) setNotice(`OTP sent via ${channel === 'whatsapp' ? 'WhatsApp' : 'SMS'}.`)
      }
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  async function verify(event) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const result = await clientApi(linkingMobile ? 'auth/mobile-link/verify' : 'auth/otp/verify', {
        method: 'POST', auth: linkingMobile,
        body: { identifier: activeIdentifier, otp: code, challenge_uuid: otpChallenge?.challenge_uuid, country_code: countryCode },
      })
      if (linkingMobile) {
        const session = readAuth()
        if (!session?.access || session.user?.uuid !== result.uuid) throw new Error('Your session changed. Please sign in again.')
        finish({ ...session, user: result })
      } else finish(result)
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  async function saveProfile(event) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const user = await clientApi('me', { method: 'PATCH', body: { name: name.trim(), ...(email ? { email } : {}) } })
      finish({ ...pendingSession, user: { ...pendingSession.user, ...user } })
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  async function requestMobile(event) {
    event?.preventDefault(); setBusy(true); setError(''); setNotice('')
    try {
      const result = await clientApi('auth/mobile-link/request', { method: 'POST', body: { mobile_number: identifier, country_code: countryCode } })
      setActiveIdentifier(result.identifier); setOtpChallenge(result); setCode(result.debug_otp || '')
      setStep('google_mobile_otp'); setSeconds(30)
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  async function completeGoogle(event) {
    event.preventDefault(); setBusy(true); setError('')
    try { finish(await clientApi('auth/google', { method: 'POST', auth: false, body: { provider: 'google', signup_token: googleSignup.signup_token, country_code: countryCode, mobile_number: identifier } })) }
    catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  function resend(channel = '') {
    if (seconds) return
    if (linkingMobile) return requestMobile()
    return requestOtp({ staffPassword: loginChallenge ? password : '', channel })
  }

  const submit = step === 'profile' ? saveProfile : verifyingOtp ? verify : step === 'google_mobile' ? requestMobile : step === 'google_profile' ? completeGoogle
    : event => { event.preventDefault(); requestOtp({ staffPassword: step === 'password' ? password : '' }) }
  const mobileField = <Field label="Mobile number"><div className="flex"><select aria-label="Country code" className="input w-24 shrink-0 rounded-r-none" value={countryCode} onChange={event => setCountryCode(event.target.value)} disabled={verifyingOtp}>{countryOptions.map(value => <option key={value}>{value}</option>)}</select><Input value={verifyingOtp ? identifier || activeIdentifier : identifier} onChange={event => setIdentifier(event.target.value)} inputMode="tel" autoComplete="tel" placeholder="98765 43210" required disabled={verifyingOtp} aria-label="Mobile number"/></div></Field>

  return <PublicShell><main className="mx-auto max-w-md px-4 py-12">
    <div className="text-center"><TempleMark size={46} className="mx-auto"/>
      <h1 className="mt-4 text-3xl font-semibold">{step === 'profile' ? 'Welcome to TempleAddress' : linkingMobile ? 'Verify your mobile' : step === 'google_profile' ? 'Complete Google sign-in' : 'Login'}</h1>
      {step === 'identify' && <><p className="mt-2 text-sm text-brown-500">Just browsing or submitting a temple&apos;s basic details? You don&apos;t need an account — <Link href="/submit-temple" className="font-semibold text-saffron-700 underline">use the public form</Link>.</p><Link href="/staff/login" className="mt-3 inline-block text-sm font-semibold text-saffron-700 underline">Staff sign in</Link></>}
    </div>
    <form onSubmit={submit} className="card mt-7 space-y-4 p-6">
      {step === 'profile' && <><p className="text-sm text-brown-500">Your mobile is verified. Tell us your name once; it is used as the devotee name for your bookings and can be changed later.</p><Field label="Your name"><Input value={name} onChange={event => setName(event.target.value)} minLength={2} maxLength={160} required autoFocus/></Field><Field label="Email" hint="Optional, for receipts"><Input type="email" value={email} onChange={event => setEmail(event.target.value)}/></Field></>}
      {(step === 'identify' || step === 'otp') && mobileField}
      {(step === 'google_profile' || step === 'google_mobile' || step === 'google_mobile_otp') && <>{linkingMobile ? <p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-800">Signed in with Google as {email || name}. Verify your mobile to book poojas, donate or register for events.</p> : <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-800"><b>{name}</b><br/>{email}<br/><span className="text-xs">Add a mobile number for bookings and account recovery.</span></div>}{mobileField}</>}
      {step === 'password' && <><p className="text-sm text-brown-500">{activeIdentifier}</p><Field label="Staff password" hint="Staff accounts need a password and an OTP."><Input type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required autoFocus/></Field></>}
      {verifyingOtp && <Field label="Enter the 6-digit code" hint={otpChallenge?.debug_otp ? `Local test OTP: ${otpChallenge.debug_otp}` : `Sent to ${otpChallenge?.destination || activeIdentifier}`}><Input value={code} onChange={event => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" required autoFocus/></Field>}
      {recaptchaRequired && <div><div ref={recaptchaBox}/>{!RECAPTCHA_SITE_KEY && <p className="text-sm text-red-700">reCAPTCHA site key is not configured.</p>}</div>}
      {notice && <p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-700">{notice}</p>}
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button disabled={busy || (recaptchaRequired && !recaptchaToken) || (verifyingOtp && code.length !== 6)} className="btn-p w-full">{busy ? 'Please wait…' : step === 'profile' ? 'Save and continue' : verifyingOtp ? 'Verify & continue' : step === 'google_mobile' ? 'Send OTP' : step === 'password' ? 'Continue to OTP' : step === 'google_profile' ? 'Complete sign-in' : 'Send OTP'}</button>
      {verifyingOtp && <div className="flex flex-wrap items-center justify-between gap-2 text-sm"><button type="button" disabled={busy} onClick={() => { if (linkingMobile) { setStep('google_mobile'); setCode(''); setError('') } else reset() }} className="text-saffron-700 underline">Change number</button>
        {seconds ? <span className="text-brown-500">Resend in {seconds}s</span> : <span className="flex gap-3"><button type="button" disabled={busy} onClick={() => resend()} className="text-saffron-700 underline">Resend</button>{!linkingMobile && <button type="button" disabled={busy} onClick={() => resend('whatsapp')} className="text-saffron-700 underline">Send via WhatsApp</button>}</span>}</div>}
      {(step === 'password' || step === 'google_profile') && <button type="button" onClick={reset} className="btn-g w-full">Back</button>}
      {step === 'identify' && GOOGLE_CLIENT_ID && <><div className="flex items-center gap-3 text-xs text-brown-400"><span className="h-px flex-1 bg-brown-100"/>or<span className="h-px flex-1 bg-brown-100"/></div><div className="flex justify-center" ref={googleButton}/></>}
      {step === 'identify' && <p className="text-center text-xs text-brown-500">New devotees are created automatically on first login.</p>}
    </form>
    <p className="mt-4 text-center text-sm"><Link href="/temples" className="text-saffron-600">Continue browsing without login</Link></p>
  </main></PublicShell>
}
