import { Suspense } from 'react'
import { Sponsor } from '@/components/pages/public'
export const metadata = { title: 'Sponsor a Temple' }
export default function Page(props) { return <Suspense fallback={null}><Sponsor {...props}/></Suspense> }