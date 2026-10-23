import { Suspense } from 'react'
import { SPlansAdmin } from '@/components/pages/partners'
export const metadata = { title: 'Plans' }
export default function Page(props) { return <Suspense fallback={null}><SPlansAdmin {...props}/></Suspense> }