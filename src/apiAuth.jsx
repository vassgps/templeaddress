import React, { useEffect, useRef, useState } from 'react'
import { Link, Navigate, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { api, apiEnabled, getSession, logout, setSession } from './api'
import { PublicShell, Field, Input } from './ui'

export function useSession() {
  const [session, update] = useState(getSession)
  useEffect(() => { const refresh = () => update(getSession()); window.addEventListener('ta:session', refresh); return () => window.removeEventListener('ta:session', refresh) }, [])
  return session
}

const scripts = new Map()
function loadScript(src) {
  if (!scripts.has(src)) scripts.set(src, new Promise((resolve, reject) => {
    const script = document.createElement('script'); script.src = src; script.async = true
    script.onload = resolve; script.onerror = () => { scripts.delete(src); script.remove(); reject(new Error('Unable to load the sign-in provider. Try again.')) }
    document.head.appendChild(script)
  }))
  return scripts.get(src)
}

function IdentityProviders({ complete, onError, onCaptcha }) {
  const google = useRef(), captcha = useRef()
  useEffect(() => {
    let active = true, widget
    const client = import.meta.env.VITE_GOOGLE_CLIENT_ID
    const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY
    if (client) loadScript('https://accounts.google.com/gsi/client').then(() => {
      if (!active) return
      window.google.accounts.id.initialize({ client_id: client, callback: async ({ credential }) => {
        try {
          const result = await api('/users/social-login/', { method: 'POST', auth: false, body: { provider: 'google', credential } })
          if (result.profile_completion_required) { onError('Register your mobile number first, then sign in with Google using the same email.'); return }
          setSession(result); complete(result)
        } catch (error) { onError(error.message) }
      } })
      window.google.accounts.id.renderButton(google.current, { type: 'standard', size: 'large' })
    }).catch(error => active && onError(error.message))
    if (siteKey) loadScript('https://www.google.com/recaptcha/api.js?render=explicit').then(() => {
      if (!active) return
      window.grecaptcha.ready(() => { if (active) widget = window.grecaptcha.render(captcha.current, { sitekey: siteKey, callback: onCaptcha, 'expired-callback': () => onCaptcha('') }) })
    }).catch(error => active && onError(error.message))
    return () => { active = false; if (widget !== undefined) window.grecaptcha.reset(widget) }
  }, [])
  return <><div ref={captcha}/><div ref={google} className="mt-4"/></>
}

export function AuthForm({ onComplete }) {
  const [register, setRegister] = useState(false), [identifier, setIdentifier] = useState(''), [name, setName] = useState(''), [email, setEmail] = useState('')
  const [challenge, setChallenge] = useState(null), [password, setPassword] = useState(''), [otp, setOtp] = useState('')
  const [error, setError] = useState(''), [busy, setBusy] = useState(false), [captcha, setCaptcha] = useState('')
  const locked = useRef(false)
  const submit = async event => {
    event.preventDefault()
    if (locked.current) return
    locked.current = true; setBusy(true); setError('')
    try {
      if (challenge?.challenge_uuid) {
        const session = await api('/users/login/verify-otp/', { method: 'POST', auth: false, body: { identifier: challenge.identifier, challenge_uuid: challenge.challenge_uuid, otp } })
        setSession(session); onComplete(session)
      } else {
        const body = register
          ? { name, email, mobile_number: identifier, country_code: '+91', recaptcha_token: captcha }
          : { identifier, country_code: '+91', password, login_challenge_token: challenge?.login_challenge_token, recaptcha_token: captcha }
        const result = await api(`/users/${register ? 'register' : 'login'}/`, { method: 'POST', auth: false, body })
        if (result.recaptcha_required) throw new Error('Complete reCAPTCHA to continue. The frontend site key must be configured if no challenge is visible.')
        setChallenge(result)
      }
    } catch (error) { setError(error.message) }
    finally { locked.current = false; setBusy(false) }
  }
  return <form onSubmit={submit} className="space-y-4">
    {!challenge && <div className="flex gap-2"><button type="button" className={!register ? 'btn-p' : 'btn-g'} onClick={() => setRegister(false)}>Login</button><button type="button" className={register ? 'btn-p' : 'btn-g'} onClick={() => setRegister(true)}>Create account</button></div>}
    {register && !challenge && <><Field label="Name"><Input required value={name} onChange={e => setName(e.target.value)}/></Field><Field label="Email (optional)"><Input type="email" value={email} onChange={e => setEmail(e.target.value)}/></Field></>}
    {!challenge?.challenge_uuid && <Field label={register ? 'Mobile number (+91)' : 'Mobile number or email'}><Input required autoComplete="username" value={identifier} onChange={e => setIdentifier(e.target.value)} disabled={!!challenge}/></Field>}
    {challenge?.password_required && <Field label="Staff password"><Input required autoComplete="current-password" type="password" value={password} onChange={e => setPassword(e.target.value)}/></Field>}
    {challenge?.challenge_uuid && <><p>Enter the code sent to {challenge.destination}.</p>{import.meta.env.DEV && challenge.debug_otp && <p className="rounded-xl bg-blue-50 p-3">Local development OTP: <b>{challenge.debug_otp}</b></p>}<Field label="Six-digit OTP"><Input required inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} value={otp} onChange={e => setOtp(e.target.value)}/></Field></>}
    {!challenge && <IdentityProviders complete={onComplete} onError={setError} onCaptcha={setCaptcha}/>}
    {error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    <button disabled={busy} className="btn-p w-full">{busy ? 'Please wait…' : challenge?.challenge_uuid ? 'Verify & continue' : challenge?.password_required ? 'Continue with password' : register ? 'Register & send OTP' : 'Send OTP'}</button>
    {challenge && <button type="button" disabled={busy} className="btn-g w-full" onClick={() => { setChallenge(null); setPassword(''); setOtp(''); setError(''); setCaptcha('') }}>Start again / request a new code</button>}
  </form>
}

export function ApiLogin() {
  const navigate = useNavigate(), [params] = useSearchParams(), session = useSession()
  const target = params.get('next')
  const destination = target?.startsWith('/') && !target.startsWith('//') && !target.startsWith('/login') ? target : '/account'
  if (session) return <Navigate to={destination} replace/>
  return <PublicShell hideChatbot><div className="mx-auto max-w-md px-4 py-10"><div className="card p-6"><h1 className="mb-5 text-3xl font-semibold">Login / Register</h1><AuthForm onComplete={() => navigate(destination, { replace: true })}/></div></div></PublicShell>
}

export function RequireSession({ children }) {
  const session = useSession(), location = useLocation()
  if (apiEnabled && !session) return <Navigate to={`/login?next=${encodeURIComponent(location.pathname + location.search)}`} replace/>
  return children
}

export function SessionLink() {
  const session = useSession()
  return <Link to={session ? '/account' : '/login'} className="btn !py-2">{session ? 'My account' : 'Login / Register'}</Link>
}

export function LogoutButton() {
  const [error, setError] = useState('')
  return <><button className="btn-g" onClick={() => logout().catch(() => setError('Signed out of this tab. The backend could not be reached to revoke the token.'))}>Sign out</button>{error && <p role="alert">{error}</p>}</>
}
