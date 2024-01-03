'use client'

import React, { useEffect, useState } from "react";
import { Service } from "@/models/interfaces";
import Loader from "@/components/ui/loader/Loader";
import Search from "@/components/ui/search/Search";
import {  useSearchParams } from 'next/navigation'
import Navbar from "@/components/layout/navbar/Navbar";
import Http from "@/config/Http";
import dynamic from 'next/dynamic'
const ServiceCard = dynamic(() => import('@/components/ui/Card/Card'))
const Pagination = dynamic(() => import('@/components/ui/pagination/Pagination'))
const Footer = dynamic(() => import('@/components/layout/footer/Footer'))
const TitleCard = dynamic(() => import('@/components/ui/titleCard/TitleCard'))
const NotFound = dynamic(() => import('@/components/not-found/NotFound'))


const page = () => {
  const searchParams = useSearchParams()
  let search = searchParams.get('search') || "";
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [services, setServices] = useState<Service[] |undefined>();
  const [page, setPage] = useState(typeof window !== 'undefined' ?Number(localStorage.getItem("page")):1);
  const newPage = typeof window !== 'undefined' ? localStorage.getItem("page") : null;
  const pageName = typeof window !== 'undefined' ? localStorage.getItem("pageName") : null;

  useEffect(()=>{
    (async()=>{
      setLoading(true)

      if (newPage) {      
        if(pageName==="allService"){
          setPage(Number(newPage));
        }else{
          setPage(1);
        }
      }
    
      const {data} = await Http.get(`cms/temples/service-details/?search=${search}&limit=8&offset=${pageName === "allService" &&Number(newPage)!=0?  Number(newPage)-1 : 0}`)         

      setServices(data?.data?.results)
      setTotalPage(Number(data?.data?.count)/8)
      setLoading(false)
    })()
  },[newPage,search])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <TitleCard title="Services" />
      <div className="mt-5">
        <Search route={"/service/all"} search={search} />
      </div>

      {!loading ? (
        <div className="main lg:mx-40 mx-5 mb-10">
          <div className="temples mt-14 grid lg:grid-cols-2 grid-cols-1 gap-10">
            {services &&
              services.map((item) => (
                <ServiceCard key={item.id} data={item} service={true} />
              ))}
          </div>
          {(!services || services.length === 0) &&search &&!loading&&<NotFound/>}

          {totalPage > 1 && (
            <Pagination
            currentPage={page}
            count={totalPage}
            setPage={setPage}
            newPageName={"allService"}
            pageName={pageName}
          />
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center w-full h-full">
          <Loader />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default page;
