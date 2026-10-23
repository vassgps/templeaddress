import { Suspense } from 'react'
import { VPage } from '@/components/pages/vendor'
export default function Page(props) { return <Suspense fallback={null}><VPage {...props}/></Suspense> }