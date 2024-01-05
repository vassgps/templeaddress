"use client";
import Image from "next/image";
import React, { useState } from "react";

import "./about.css"
import { GrFormPrevious } from "react-icons/gr";
import { MdNavigateNext } from "react-icons/md";


const About = () => {
  const images = ['https://antiquebetabucket.s3.ap-south-1.amazonaws.com/file1704347967708', 'https://antiquebetabucket.s3.ap-south-1.amazonaws.com/file1704348783051', 'https://antiquebetabucket.s3.ap-south-1.amazonaws.com/file1704348213667']; 
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="about lg:grid-cols-2 grid-cols-1 grid  justify-center items-center lg:p-10    lg:gap-x-24   ">
      <div className="flex lg:justify-end justify-center relative ">
      <button onClick={goToPrevious} type="button" className=" absolute text-white left-0 top-1/2">{React.createElement(GrFormPrevious, { size: "50" })}</button>
      <Image width={1000} height={1000} className="pr-0 h-[40vh] md:h-[50vh]  w-full rounded-xl" loading="lazy" src={images[currentIndex]} alt={`banner image ${currentIndex + 1}`} />
      <button onClick={goToNext} type="button" className=" absolute text-white right-0 top-1/2" >{React.createElement(MdNavigateNext, { size: "50" })}</button>

      </div>
      <div className="font-semibold   grid gap-3  p-5  text-primary">
        <h2 className=" lg:text-lg text-base text-left leading-33  font-poppins tracking-normal" >Global Heritage Listings</h2>
        <h1 className="flex  md:text-3xl text-2xl leading-33  font-poppins text-black font-semibold leading-53 tracking-normal text-left">JOURNEY INTO  <p className="flex leading-33  font-poppins tracking-normal md:text-3xl text-2xl font-medium leading-53 text-primary ml-2 text-left"> HINDU RITUALS</p></h1>
        <p  className="description w-full  font-medium leading-7 lg:leading-9" >Embark on a journey with TempleAddress.com, where rituals meet everyday life. Engage in our age-old practices that honor gods and goddesses, connecting us to the eternal cycle of existence </p>
      </div>
    </div>
  );
};

export default About;
