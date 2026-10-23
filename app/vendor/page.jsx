import { Suspense } from 'react'
import { VToday } from '@/components/pages/vendor'
export default function Page(props) { return <Suspense fallback={null}><VToday {...props}/></Suspense> }