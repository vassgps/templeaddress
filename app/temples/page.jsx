import { Suspense } from 'react'
import { Temples } from '@/components/pages/public'
export const metadata = { title: 'Temple Directory', description: 'Find verified temples by deity, district or pooja and book vazhipadu online.', alternates: { canonical: '/temples' } }
export default function Page(props) { return <Suspense fallback={null}><Temples {...props}/></Suspense> }
