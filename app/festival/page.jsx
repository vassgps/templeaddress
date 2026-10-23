import { Suspense } from 'react'
import { Festivals } from '@/components/pages/public'
export const metadata = { title: 'Temple Festivals', description: 'Explore Kerala temple festivals, programmes, offerings and sponsorship opportunities.', alternates: { canonical: '/festival' } }
export default function Page(props) { return <Suspense fallback={null}><Festivals {...props}/></Suspense> }
