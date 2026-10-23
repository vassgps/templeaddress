import { Suspense } from 'react'
import { Claim } from '@/components/pages/public'
export default function Page(props) { return <Suspense fallback={null}><Claim {...props}/></Suspense> }