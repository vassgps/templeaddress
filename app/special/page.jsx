import { Suspense } from 'react'
import { Special } from '@/components/pages/public'
export const metadata = { title: 'Special Poojas', description: 'Discover limited and seasonal poojas performed in your name at verified temples.', alternates: { canonical: '/special' } }
export default function Page(props) { return <Suspense fallback={null}><Special {...props}/></Suspense> }
