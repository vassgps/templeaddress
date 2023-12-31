import React from 'react'
import ProtectRouter from '@/components/auth/authenticationRoute/protectRouter'
import dynamic from 'next/dynamic'
const EditTempleForm = dynamic(() => import('@/components/temple/editTempleForm/EditTempleForm'))
import Navbar from "@/components/layout/navbar/Navbar";
const Footer = dynamic(() => import('@/components/layout/footer/Footer'))
const Content = dynamic(() => import('@/components/content/Content'))
const TitleCard = dynamic(() => import('@/components/ui/titleCard/TitleCard'))



const page = ({searchParams}) => { 
  return (
    <ProtectRouter>
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <TitleCard title="Temple > Edit Temple" />
      <div className=" lg:mx-40 mx-5 mt-5 mb-10">
        <EditTempleForm id={searchParams.id}/>
        <Content/>
        </div>
      <Footer/>
    </div>
    </ProtectRouter>
  )
}

export default page
