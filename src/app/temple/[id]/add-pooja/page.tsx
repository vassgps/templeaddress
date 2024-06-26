import React from "react";
import TitleCard from "@/components/ui/titleCard/TitleCard";
import dynamic from "next/dynamic";
import Navbar from "@/components/layout/navbar/Navbar";
const Footer = dynamic(() => import("@/components/layout/footer/Footer"));
const AddPooja = dynamic(() => import("@/components/temple/add-pooja/AddPooja"));

const page = ({ params }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <TitleCard  title="Temple > Add Pooja" />
      <div className=" lg:mx-40 mx-5 mb-10">
        <AddPooja id={params.id} />
      </div>
      <Footer />
    </div>
  );
};

export default page;
