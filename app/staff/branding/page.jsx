import { Suspense } from 'react'
import { SBranding } from '@/components/pages/partners'
export const metadata = { title: 'Branding' }
export default function Page(props) { return <Suspense fallback={null}><SBranding {...props}/></Suspense> }