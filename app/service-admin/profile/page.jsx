import { Suspense } from 'react'
import { SProfile } from '@/components/pages/vendorService'
export default function Page(props) { return <Suspense fallback={null}><SProfile {...props}/></Suspense> }