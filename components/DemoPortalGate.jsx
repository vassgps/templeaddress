'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { clientApi } from '@/lib/client-api'
import { demoPortalsEnabled, isDemoPortal } from '@/lib/demo-portals'

const DemoPortals = createContext(false)
export const useDemoPortals = () => useContext(DemoPortals)

export default function DemoPortalGate({ children }) {
  const pathname = usePathname()
  const [enabled, setEnabled] = useState(false)
  useEffect(() => {
    let active = true
    clientApi('config', { auth: false }).then(config => { if (active) setEnabled(demoPortalsEnabled(config.feature_flags)) }).catch(() => {})
    return () => { active = false }
  }, [])
  return <DemoPortals.Provider value={enabled}>{!enabled && isDemoPortal(pathname)
    ? <main className="mx-auto max-w-2xl px-4 py-16"><h1 className="text-3xl font-semibold">Coming soon</h1><p className="mt-3 text-brown-600">This portal is not available yet.</p><Link href="/" className="btn-g mt-6">Back to home</Link></main>
    : children}</DemoPortals.Provider>
}
