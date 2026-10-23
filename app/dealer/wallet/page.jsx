import { Suspense } from 'react'
import { DWallet } from '@/components/pages/partners'
export default function Page(props) { return <Suspense fallback={null}><DWallet {...props}/></Suspense> }