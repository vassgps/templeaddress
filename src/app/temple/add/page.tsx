import ProtectRouter from '@/components/auth/authenticationRoute/protectRouter'
import React from 'react'
import dynamic from 'next/dynamic'
import Navbar from "@/components/layout/navbar/Navbar";
const TempleForms = dynamic(() => import('@/components/temple/templeForm/TempleForm'))
const Footer = dynamic(() => import('@/components/layout/footer/Footer'))
const TitleCard = dynamic(() => import('@/components/ui/titleCard/TitleCard'))
const Content = dynamic(() => import('@/components/content/Content'))



const page = () => {
  return (
    <ProtectRouter>
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <TitleCard title="Temple > Add Temple"/>
      <div className=" lg:mx-40 mx-5 mt-5 mb-10">
        <TempleForms/>
        <Content/>
        </div>
      <Footer/>
    </div>
    </ProtectRouter>
  )
}

export default page
