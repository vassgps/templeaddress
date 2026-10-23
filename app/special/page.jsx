import { Suspense } from 'react'
import { Special } from '@/components/pages/public'
export const metadata = { title: 'Special Poojas' }
export default function Page(props) { return <Suspense fallback={null}><Special {...props}/></Suspense> }