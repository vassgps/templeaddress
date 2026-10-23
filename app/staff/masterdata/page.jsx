import { Suspense } from 'react'
import { SMasterData } from '@/components/pages/partners'
export const metadata = { title: 'Master Data' }
export default function Page(props) { return <Suspense fallback={null}><SMasterData {...props}/></Suspense> }