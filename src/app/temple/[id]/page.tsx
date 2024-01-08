import React from "react";
import TitleCard from "@/components/ui/titleCard/TitleCard";
import dynamic from 'next/dynamic'
import Navbar from "@/components/layout/navbar/Navbar";
const ViewTemple = dynamic(() => import('@/components/temple/view-temple/ViewTemple'))
const Footer = dynamic(() => import('@/components/layout/footer/Footer'))

const page = ({params}) => {

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <TitleCard title="Home > Details" />
      <div className=" lg:mx-40 mx-5 mb-10">
        <ViewTemple templeId={params.id}/>
      </div>
      <Footer />
    </div>
  );
};

export default page;
