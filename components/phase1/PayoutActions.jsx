'use client'

import { useState } from 'react'
import { clientApi } from '@/lib/client-api'

export default function PayoutActions({ row, roles = [], onChange }) {
  const [error, setError] = useState(''), [busy, setBusy] = useState(false), [release, setRelease] = useState(false)
  async function action(suffix, body = {}) {
    setError(''); setBusy(true)
    try { await clientApi(`finance/payouts/${row.uuid}/${suffix}`, { method: 'POST', body }); setRelease(false); await onChange() }
    catch (error) { setError(error.message) } finally { setBusy(false) }
  }
  return <div className="w-full"><div className="mt-2 flex flex-wrap gap-2">
    {row.status === 'pending' && row.approval_required && !row.approved && <><button className="btn-g" disabled={busy} onClick={() => action('approval')}>Propose approval</button>{roles.includes('portal admin') && <button className="btn-g" disabled={busy} onClick={() => action('approval/approve')}>Approve proposal</button>}</>}
    {row.approved && <span className="text-sm text-emerald-700">Dual approval recorded</span>}
    {['exported', 'retry_required'].includes(row.status) && <button className="btn-g" disabled={busy} onClick={() => setRelease(!release)}>Release for retry</button>}
  </div>{release && <form className="mt-3 space-y-2" onSubmit={event => { event.preventDefault(); action('release-for-retry', Object.fromEntries(new FormData(event.currentTarget))) }}><input aria-label="Retry reason" name="reason" className="input" placeholder="Reason" required/><textarea aria-label="Bank failure evidence" name="evidence_note" className="input" placeholder="Evidence confirming the bank did not transfer this payout" required/><button className="btn-p" disabled={busy}>Confirm failed bank attempt</button></form>}{error && <p role="alert" className="mt-2 text-sm text-red-700">{error}</p>}</div>
}
