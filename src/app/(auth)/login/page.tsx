import PublicRoute from '@/components/auth/authenticationRoute/PublicRoute'
import React from 'react'
import dynamic from 'next/dynamic'
 

const Login = dynamic(() => import('@/components/auth/login/Login'))
const page = () => {
  return (
      <PublicRoute>
        <Login/>
      </PublicRoute>
  )
}

export default page
