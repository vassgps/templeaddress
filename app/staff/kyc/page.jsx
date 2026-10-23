import { Suspense } from 'react'
import { SKyc } from '@/components/pages/partners'
export const metadata = { title: 'KYC Queue' }
export default function Page(props) { return <Suspense fallback={null}><SKyc {...props}/></Suspense> }