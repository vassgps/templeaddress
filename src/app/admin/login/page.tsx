import AdminPublicRoute from '@/components/auth/authenticationRoute/AdminPublicRoute'
import React from 'react'
import dynamic from 'next/dynamic'

const Login = dynamic(() => import('@/components/auth/login/Login'))
const page = () => {
  return (
      <AdminPublicRoute>
        <Login admin={true}/>
      </AdminPublicRoute>
  )
}

export default page
