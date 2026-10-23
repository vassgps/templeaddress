import { Suspense } from 'react'
import { SBackup } from '@/components/pages/partners'
export const metadata = { title: 'Backup' }
export default function Page(props) { return <Suspense fallback={null}><SBackup {...props}/></Suspense> }