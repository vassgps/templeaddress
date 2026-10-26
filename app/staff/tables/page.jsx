import { Suspense } from 'react'
import { STables } from '@/components/pages/partners'
export const metadata = { title: 'Tables' }
export default function Page(props) { return <Suspense fallback={null}><STables {...props}/></Suspense> }