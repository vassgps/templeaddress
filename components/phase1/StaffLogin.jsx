'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Field, Input, PublicShell } from '@/components/ui'
import { clientApi, saveAuth } from '@/lib/client-api'
import { canUseStaff, staffNext, staffRoles } from '@/lib/staff-access'

const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY
export default function StaffLogin() {
  const router = useRouter(), params = useSearchParams(), captchaBox = useRef(null)
  const [role, setRole] = useState('moderator'), [identifier, setIdentifier] = useState(''), [password, setPassword] = useState('')
  const [method, setMethod] = useState('otp'), [challenge, setChallenge] = useState(null), [code, setCode] = useState('')
  const [busy, setBusy] = useState(false), [error, setError] = useState(''), [notice, setNotice] = useState(''), [seconds, setSeconds] = useState(0)
  const [captchaRequired, setCaptchaRequired] = useState(false), [captchaToken, setCaptchaToken] = useState('')
  useEffect(() => {
    if (!seconds) return
    const timer = window.setTimeout(() => setSeconds(value => value - 1), 1000)
    return () => window.clearTimeout(timer)
  }, [seconds])
  useEffect(() => {
    if (!captchaRequired || !siteKey) return
    let active = true
    const render = () => window.grecaptcha?.ready(() => {
      if (!active || !captchaBox.current || captchaBox.current.dataset.rendered) return
      window.grecaptcha.render(captchaBox.current, { sitekey: siteKey, callback: setCaptchaToken, 'expired-callback': () => setCaptchaToken('') })
      captchaBox.current.dataset.rendered = 'true'
    })
    let script
    if (window.grecaptcha) render()
    else { script = document.createElement('script'); script.src = 'https://www.google.com/recaptcha/api.js?render=explicit'; script.async = true; script.onload = render; document.head.appendChild(script) }
    return () => { active = false; script?.remove() }
  }, [captchaRequired])
  async function start(event) {
    event?.preventDefault()
    if (busy) return
    setBusy(true); setError(''); setNotice('')
    try {
      const body = { identifier: identifier.trim(), country_code: '+91', role, mfa_method: method, recaptcha_token: captchaToken }
      let result = await clientApi('auth/staff/login', { method: 'POST', auth: false, body })
      if (result.recaptcha_required) { setCaptchaRequired(true); setNotice('Complete reCAPTCHA, then continue.'); return }
      if (result.password_required) result = await clientApi('auth/staff/login', { method: 'POST', auth: false, body: { ...body, password, login_challenge_token: result.login_challenge_token } })
      if (!result.otp_sent && !result.mfa_required) throw new Error('Could not start verification. Please try again.')
      setChallenge(result); setCode(''); setSeconds(60)
      setNotice(method === 'totp' ? 'Enter the code from your enrolled authenticator.' : 'Enter the code sent to your registered mobile.')
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  async function verify(event) {
    event.preventDefault()
    if (busy) return
    setBusy(true); setError('')
    try {
      const result = await clientApi('auth/staff/mfa', { method: 'POST', auth: false, body: { identifier: challenge.identifier || identifier.trim(), otp: code, challenge_uuid: challenge.challenge_uuid, mfa_method: method, login_challenge_token: challenge.login_challenge_token } })
      if (!canUseStaff(result.user, role)) throw new Error('This account is not assigned the selected staff role.')
      saveAuth(result); setPassword('')
      router.replace(staffNext(result.user, params.get('next') || (role === 'accountant' ? '/staff/payouts' : '/staff'))); router.refresh()
    } catch (err) { setError(err.message) } finally { setBusy(false) }
  }
  return <PublicShell><main className="mx-auto max-w-lg px-4 py-12"><div className="card space-y-5 p-7"><h1 className="text-3xl font-semibold">Staff sign in</h1><p className="text-brown-500">{challenge ? 'Verify your identity' : 'Sign in with your assigned role and password.'}</p>{error && <p role="alert" className="rounded-xl bg-red-50 p-3 text-red-700">{error}</p>}{notice && <p role="status" className="text-sm">{notice}</p>}<form onSubmit={challenge ? verify : start} className="space-y-4">
    {!challenge ? <><Field label="Role"><select className="input capitalize" value={role} onChange={e => setRole(e.target.value)}>{staffRoles.map(value => <option key={value} value={value}>{value}</option>)}</select></Field><Field label="Mobile number or email"><Input autoComplete="username" required value={identifier} onChange={e => setIdentifier(e.target.value)} placeholder="Registered mobile number"/></Field><Field label="Password"><Input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)}/></Field><Field label="Verification method"><select className="input" value={method} onChange={e => setMethod(e.target.value)}><option value="otp">Mobile OTP</option><option value="totp">Authenticator app</option></select></Field></> : <Field label={method === 'totp' ? 'Authenticator code' : 'One-time password'}><Input autoFocus inputMode="numeric" autoComplete="one-time-code" pattern="[0-9]{6}" maxLength={6} required value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ''))}/></Field>}
    {captchaRequired && !challenge && <div><div ref={captchaBox}/>{!siteKey && <p role="alert">reCAPTCHA site key is not configured.</p>}</div>}
    <button className="btn-p w-full" disabled={busy || (challenge ? code.length !== 6 : captchaRequired && !captchaToken)}>{busy ? 'Please wait…' : challenge ? 'Verify and sign in' : method === 'otp' ? 'Send OTP to continue' : 'Continue to authenticator'}</button></form>
    {challenge && <div className="flex flex-wrap gap-3">{method === 'otp' && <button className="btn-g" disabled={busy || seconds > 0} onClick={start}>{seconds ? `Resend in ${seconds}s` : 'Resend code'}</button>}<button className="btn-g" disabled={busy} onClick={() => { setChallenge(null); setCode(''); setError(''); setNotice(''); setPassword(''); setCaptchaRequired(false); setCaptchaToken('') }}>Back</button></div>}<Link className="text-sm text-saffron-700" href="/login">Devotee sign in</Link></div></main></PublicShell>
}
