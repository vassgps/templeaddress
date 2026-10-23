import { Suspense } from 'react'
import { SubmitTemple } from '@/components/pages/public'
export const metadata = { title: 'Submit a Temple' }
export default function Page(props) { return <Suspense fallback={null}><SubmitTemple {...props}/></Suspense> }