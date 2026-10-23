import { Suspense } from 'react'
import { SSupport } from '@/components/pages/partners'
export const metadata = { title: 'Support' }
export default function Page(props) { return <Suspense fallback={null}><SSupport {...props}/></Suspense> }