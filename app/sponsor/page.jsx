import { Suspense } from 'react'
import { Sponsor } from '@/components/pages/public'
export const metadata = { title: 'Sponsor a Temple', description: 'Support a verified temple with a transparent TempleAddress sponsorship package.', alternates: { canonical: '/sponsor' } }
export default function Page(props) { return <Suspense fallback={null}><Sponsor {...props}/></Suspense> }
