import { Suspense } from 'react'
import { StaffDirectory } from '@/components/pages/staffDirectory'
export default function Page(props) { return <Suspense fallback={null}><StaffDirectory {...props}/></Suspense> }