import { Suspense } from 'react'
import { VPayouts } from '@/components/pages/vendor'
export default function Page(props) { return <Suspense fallback={null}><VPayouts {...props}/></Suspense> }