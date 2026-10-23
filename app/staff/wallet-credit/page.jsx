import { Suspense } from 'react'
import { SWalletCredit } from '@/components/pages/partners'
export const metadata = { title: 'Wallet Credit' }
export default function Page(props) { return <Suspense fallback={null}><SWalletCredit {...props}/></Suspense> }