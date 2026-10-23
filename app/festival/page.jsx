import { Suspense } from 'react'
import { Festivals } from '@/components/pages/public'
export const metadata = { title: 'Festivals' }
export default function Page(props) { return <Suspense fallback={null}><Festivals {...props}/></Suspense> }