import { Suspense } from 'react'
import { SSpecial } from '@/components/pages/partners'
export const metadata = { title: 'Special Poojas' }
export default function Page(props) { return <Suspense fallback={null}><SSpecial {...props}/></Suspense> }