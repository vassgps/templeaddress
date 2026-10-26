import { Suspense } from 'react'
import { SOwnership } from '@/components/pages/partners'
export const metadata = { title: 'Ownership' }
export default function Page(props) { return <Suspense fallback={null}><SOwnership {...props}/></Suspense> }