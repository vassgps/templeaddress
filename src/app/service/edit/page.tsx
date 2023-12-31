import ProtectRouter from '@/components/auth/authenticationRoute/protectRouter'
import TitleCard from '@/components/ui/titleCard/TitleCard'
import React from 'react'
import dynamic from 'next/dynamic'
const ServiceForm = dynamic(() => import('@/components/serviceForm/ServiceForm'))
import Navbar from "@/components/layout/navbar/Navbar";
const Footer = dynamic(() => import('@/components/layout/footer/Footer'))
const Content = dynamic(() => import('@/components/content/Content'))


const page = ({searchParams}) => {

  return (
    <ProtectRouter>
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <TitleCard title="Service > Edit Service" />
      <div className=" lg:mx-40 mx-5 mt-5 mb-10">
        <ServiceForm edit={true} id={searchParams.id}/>
        <Content/>
        </div>
      <Footer/>
    </div>
    </ProtectRouter>
  )
}

export default page
