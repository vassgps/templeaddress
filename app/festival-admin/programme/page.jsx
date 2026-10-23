import { Suspense } from 'react'
import { FProgramme } from '@/components/pages/vendorFestival'
export default function Page(props) { return <Suspense fallback={null}><FProgramme {...props}/></Suspense> }