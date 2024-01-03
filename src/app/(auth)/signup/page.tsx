import PublicRoute from '@/components/auth/authenticationRoute/PublicRoute'
import React from 'react'
import dynamic from 'next/dynamic'
const Signup = dynamic(() => import('@/components/auth/signup/Signup'))

const page = () => {
  return (
    <PublicRoute>
      <Signup/>
    </PublicRoute>
  )
}

export default page
