import { Suspense } from 'react'
import { Temples } from '@/components/pages/public'
export const metadata = { title: 'Temple Directory' }
export default function Page(props) { return <Suspense fallback={null}><Temples {...props}/></Suspense> }