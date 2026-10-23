import { Suspense } from 'react'
import { AListings } from '@/components/pages/partners'
export default function Page(props) { return <Suspense fallback={null}><AListings {...props}/></Suspense> }