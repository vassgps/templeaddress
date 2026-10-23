import { Suspense } from 'react'
import { SWithdrawals } from '@/components/pages/partners'
export const metadata = { title: 'Withdrawals' }
export default function Page(props) { return <Suspense fallback={null}><SWithdrawals {...props}/></Suspense> }