import { Suspense } from 'react'
import { VSettings } from '@/components/pages/vendor'
export default function Page(props) { return <Suspense fallback={null}><VSettings {...props}/></Suspense> }