import { Suspense } from 'react'
import { VData } from '@/components/pages/vendor'
export default function Page(props) { return <Suspense fallback={null}><VData {...props}/></Suspense> }