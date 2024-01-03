import React from "react";
import dynamic from 'next/dynamic'
import Navbar from "@/components/layout/navbar/Navbar";
const ViewService = dynamic(() => import('@/components/view-service/ViewService'))
const Footer = dynamic(() => import('@/components/layout/footer/Footer'))
const TitleCard = dynamic(() => import('@/components/ui/titleCard/TitleCard'))


const page = async ({ params }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <TitleCard title="Service > Details" />
      <ViewService  id={params.id}/>
      <Footer />
    </div>
  );
};

export default page;
