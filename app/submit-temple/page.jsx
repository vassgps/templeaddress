import { Suspense } from 'react'
import { SubmitTemple } from '@/components/pages/public'
export const metadata = { title: 'Submit a Temple', description: 'Submit a temple or sacred listing for verification and publication on TempleAddress.', alternates: { canonical: '/submit-temple' } }
export default function Page(props) { return <Suspense fallback={null}><SubmitTemple {...props}/></Suspense> }
