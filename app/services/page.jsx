import { Suspense } from 'react'
import { Services } from '@/components/pages/public'
export const metadata = { title: 'Temple Service Professionals', description: 'Find verified priests, astrologers, artists and temple service professionals.', alternates: { canonical: '/services' } }
export default function Page(props) { return <Suspense fallback={null}><Services {...props}/></Suspense> }
