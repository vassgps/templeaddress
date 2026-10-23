import { Suspense } from 'react'
import { SConfig } from '@/components/pages/partners'
export const metadata = { title: 'Config' }
export default function Page(props) { return <Suspense fallback={null}><SConfig {...props}/></Suspense> }