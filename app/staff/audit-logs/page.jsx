import { Suspense } from 'react'
import { SAuditLogs } from '@/components/pages/partners'
export const metadata = { title: 'Audit Logs' }
export default function Page(props) { return <Suspense fallback={null}><SAuditLogs {...props}/></Suspense> }