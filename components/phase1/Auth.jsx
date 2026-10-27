'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { PublicShell, Field, Input, TempleMark } from '@/components/ui'
import { clientApi, readAuth, safeNextPath, saveAuth } from '@/lib/client-api'

const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
const countryOptions = ['+91', '+971', '+968', '+1', '+44']

function mobileIdentifier(countryCode, value) {
  const clean = value.trim()
  if (clean.includes('@')) return clean.toLowerCase()
  const digits = clean.replace(/\D/g, '')
  const country = countryCode.replace(/\D/g, '')
  return `+${digits.startsWith(country) && digits.length > 10 ? digits : `${country}${digits}`}`
}

export default function Phase1Login({ initialMode = 'login' }) {
  const router = useRouter()
  const params = useSearchParams()
  const googleButton = useRef(null)
  const recaptchaBox = useRef(null)
  const [mode, setMode] = useState(params.get('auth') === 'register' || initialMode === 'register' ? 'register' : 'login')
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
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')
  const [busy, setBusy] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [recaptchaRequired, setRecaptchaRequired] = useState(false)
  const [recaptchaToken, setRecaptchaToken] = useState('')
  const destination = safeNextPath(params.get('next') || params.get('redirect'), '/account')

  const finish = useCallback(result => {
    saveAuth(result)
    router.replace(result.user?.is_staff ? '/staff' : destination)
    router.refresh()
  }, [destination, router])

  function reset(nextMode = mode) {
    setMode(nextMode); setStep('identify'); setError(''); setNotice(''); setPassword('')
    setLoginChallenge(''); setOtpChallenge(null); setCode(''); setGoogleSignup(null)
    setRecaptchaRequired(false); setRecaptchaToken('')
  }

  useEffect(() => {
    const session = readAuth()
    if (session?.access) router.replace(session.user?.is_staff ? '/staff' : destination)
  }, [destination, router])

  useEffect(() => {
    if (!seconds) return
    const timer = window.setInterval(() => setSeconds(value => Math.max(0, value - 1)), 1000)
    return () => window.clearInterval(timer)
  }, [seconds])

  useEffect(() => {
    if (!recaptchaRequired || !RECAPTCHA_SITE_KEY || !recaptchaBox.current) return
    const render = () => window.grecaptcha?.ready(() => {
      if (!recaptchaBox.current || recaptchaBox.current.dataset.rendered) return
      window.grecaptcha.render(recaptchaBox.current, {
        sitekey: RECAPTCHA_SITE_KEY,
        callback: token => setRecaptchaToken(token),
        'expired-callback': () => setRecaptchaToken(''),
      })
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
            const result = await clientApi('users/social-login/', { method: 'POST', auth: false, body: { provider: 'google', credential } })
            if (result.profile_completion_required) {
              setGoogleSignup(result); setName(result.google_profile?.name || ''); setEmail(result.google_profile?.email || ''); setIdentifier(''); setStep('google_profile')
            } else finish(result)
          } catch (err) { setError(err.message) } finally { setBusy(false) }
        },
      })
      googleButton.current.replaceChildren()
      window.google.accounts.id.renderButton(googleButton.current, { theme: 'outline', size: 'large', width: 350, shape: 'pill', text: mode === 'register' ? 'signup_with' : 'signin_with' })
    }
    if (window.google?.accounts?.id) setup()
    else {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'; script.async = true; script.defer = true; script.onload = setup
      document.head.appendChild(script)
      return () => script.remove()
    }
  }, [finish, mode, step])

  async function begin(event, staffPassword = '') {
    event?.preventDefault(); setBusy(true); setError(''); setNotice('')
    try {
      if (mode === 'register' && step === 'identify') {
        const normalized = mobileIdentifier(countryCode, identifier)
        const result = await clientApi('users/register/', { method: 'POST', auth: false, body: { name, email, country_code: countryCode, mobile_number: identifier, recaptcha_token: recaptchaToken } })
        if (result.recaptcha_required) { setRecaptchaRequired(true); setNotice('Complete reCAPTCHA, then continue.'); return }
        setActiveIdentifier(result.identifier || normalized); setOtpChallenge(result); setCode(result.debug_otp || ''); setStep('otp'); setSeconds(30)
        return
      }
      const normalized = activeIdentifier || mobileIdentifier(countryCode, identifier)
      const result = await clientApi('users/login/', {
        method: 'POST', auth: false,
        body: { identifier: normalized, country_code: countryCode, password: staffPassword, login_challenge_token: loginChallenge, recaptcha_token: recaptchaToken },
      })
      if (result.recaptcha_required) { setRecaptchaRequired(true); setNotice('Complete reCAPTCHA, then continue.'); return }
      if (result.password_required) { setActiveIdentifier(normalized); setLoginChallenge(result.login_challenge_token); setStep('password'); return }
      if (result.otp_sent) { setActiveIdentifier(result.identifier || normalized); setOtpChallenge(result); setCode(result.debug_otp || ''); setStep('otp'); setSeconds(30) }
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  async function verify(event) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const result = await clientApi('users/login/verify-otp/', { method: 'POST', auth: false, body: { identifier: activeIdentifier, otp: code, challenge_uuid: otpChallenge?.challenge_uuid, country_code: countryCode } })
      finish(result)
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  async function completeGoogle(event) {
    event.preventDefault(); setBusy(true); setError('')
    try {
      const result = await clientApi('users/social-login/', { method: 'POST', auth: false, body: { provider: 'google', signup_token: googleSignup.signup_token, country_code: countryCode, mobile_number: identifier } })
      finish(result)
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  async function resend() {
    if (seconds) return
    setBusy(true); setError('')
    try {
      const result = await clientApi('users/login/', { method: 'POST', auth: false, body: { identifier: loginChallenge ? mobileIdentifier(countryCode, identifier) : activeIdentifier, country_code: countryCode, password: loginChallenge ? password : undefined, login_challenge_token: loginChallenge || undefined, recaptcha_token: recaptchaToken } })
      if (result.recaptcha_required) { setRecaptchaRequired(true); setNotice('Complete reCAPTCHA, then continue.'); return }
      if (result.password_required) { setLoginChallenge(result.login_challenge_token); setStep('password'); return }
      setActiveIdentifier(result.identifier || activeIdentifier); setOtpChallenge(result); setCode(result.debug_otp || ''); setSeconds(30)
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }

  return <PublicShell><main className="mx-auto max-w-md px-4 py-12">
    <div className="text-center"><TempleMark size={46} className="mx-auto"/><h1 className="mt-4 text-3xl font-semibold">{step === 'google_profile' ? 'Complete Google registration' : mode === 'register' ? 'Create your account' : 'Welcome back'}</h1><p className="mt-2 text-sm text-brown-500">Secure OTP and Google authentication for devotees, listing members and staff.</p></div>
    {step === 'identify' && <div className="mt-7 grid grid-cols-2 rounded-xl bg-brown-50 p-1"><button type="button" onClick={() => reset('login')} className={`rounded-lg px-3 py-2 text-sm ${mode === 'login' ? 'bg-white font-semibold shadow-sm' : ''}`}>Login</button><button type="button" onClick={() => reset('register')} className={`rounded-lg px-3 py-2 text-sm ${mode === 'register' ? 'bg-white font-semibold shadow-sm' : ''}`}>Register</button></div>}
    {step === 'identify' && GOOGLE_CLIENT_ID && <><div className="card mt-4 flex justify-center p-5"><div ref={googleButton}/></div><div className="my-4 flex items-center gap-3 text-xs text-brown-400"><span className="h-px flex-1 bg-brown-100"/>or continue with OTP<span className="h-px flex-1 bg-brown-100"/></div></>}
    <form onSubmit={step === 'otp' ? verify : step === 'google_profile' ? completeGoogle : event => begin(event, step === 'password' ? password : '')} className={`card ${step !== 'identify' || !GOOGLE_CLIENT_ID ? 'mt-7' : ''} space-y-4 p-6`}>
      {step === 'identify' && mode === 'register' && <><Field label="Full name"><Input value={name} onChange={event => setName(event.target.value)} minLength={2} maxLength={160} required/></Field><Field label="Email" hint="Optional"><Input type="email" value={email} onChange={event => setEmail(event.target.value)}/></Field></>}
      {(step === 'identify' || step === 'google_profile') && <div className="grid grid-cols-[105px_1fr] gap-3"><Field label="Country"><select className="input" value={countryCode} onChange={event => setCountryCode(event.target.value)}>{countryOptions.map(code => <option key={code}>{code}</option>)}</select></Field><Field label={mode === 'login' && step === 'identify' ? 'Email or mobile' : 'Mobile number'}><Input value={identifier} onChange={event => setIdentifier(event.target.value)} inputMode="tel" placeholder={mode === 'login' ? '9876543210 or email' : '9876543210'} required/></Field></div>}
      {step === 'google_profile' && <div className="rounded-xl bg-blue-50 p-3 text-sm text-blue-800"><b>{name}</b><br/>{email}<br/><span className="text-xs">Add a mobile number for bookings and account recovery.</span></div>}
      {step === 'password' && <Field label="Staff password" hint="Privileged accounts require password and OTP"><Input type="password" value={password} onChange={event => setPassword(event.target.value)} autoComplete="current-password" required/></Field>}
      {step === 'otp' && <Field label="6-digit OTP" hint={otpChallenge?.debug_otp ? `Local test OTP: ${otpChallenge.debug_otp}` : `Sent to ${otpChallenge?.destination || activeIdentifier}`}><Input value={code} onChange={event => setCode(event.target.value.replace(/\D/g, '').slice(0, 6))} inputMode="numeric" autoComplete="one-time-code" required autoFocus/></Field>}
      {recaptchaRequired && <div><div ref={recaptchaBox}/>{!RECAPTCHA_SITE_KEY && <p className="text-sm text-red-700">reCAPTCHA site key is not configured.</p>}</div>}
      {notice && <p className="rounded-xl bg-blue-50 p-3 text-sm text-blue-700">{notice}</p>}
      {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      <button disabled={busy || (recaptchaRequired && !recaptchaToken) || (step === 'otp' && code.length !== 6)} className="btn-p w-full">{busy ? 'Please wait…' : step === 'otp' ? 'Verify and continue' : step === 'password' ? 'Continue to OTP' : step === 'google_profile' ? 'Complete registration' : mode === 'register' ? 'Register and send OTP' : 'Send login OTP'}</button>
      {step === 'otp' && <div className="flex gap-2"><button type="button" onClick={() => reset(mode)} className="btn-g flex-1">Start again</button><button type="button" disabled={busy || seconds > 0} onClick={resend} className="btn-g flex-1">{seconds ? `Resend in ${seconds}s` : 'Resend OTP'}</button></div>}
      {(step === 'password' || step === 'google_profile') && <button type="button" onClick={() => reset(mode)} className="btn-g w-full">Back</button>}
    </form>
    <p className="mt-4 text-center text-xs text-brown-500">OTP expires in 5 minutes. Staff accounts require password plus OTP; public users cannot select privileged roles.</p>
    <p className="mt-3 text-center text-sm"><Link href="/temples" className="text-saffron-600">Continue browsing without login</Link></p>
  </main></PublicShell>
}
