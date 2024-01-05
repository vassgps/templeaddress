'use client'

import React, { useEffect, useState } from "react";
import TitleCard from "@/components/ui/titleCard/TitleCard";
import { Temple } from "@/models/interfaces";
import Loader from "@/components/ui/loader/Loader";
import {  useSearchParams } from "next/navigation";
import dynamic from 'next/dynamic'
const TempleCard = dynamic(() => import('@/components/ui/Card/Card'))
import Navbar from "@/components/layout/navbar/Navbar";
import Http from "@/config/Http";
const Footer = dynamic(() => import('@/components/layout/footer/Footer'))
const NotFound = dynamic(() => import('@/components/not-found/NotFound'))
const Pagination = dynamic(() => import('@/components/ui/pagination/Pagination'))
const Search = dynamic(() => import('@/components/ui/search/Search'))

const page = () => {
  const searchParams = useSearchParams()
  let search = searchParams.get('search') || "";
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [temples, setTemples] = useState<Temple[] |undefined>();
  const [page, setPage] = useState( typeof window !== 'undefined' ?Number(localStorage.getItem("page")):1);
  const newPage = typeof window !== 'undefined' ? localStorage.getItem("page") : null;
  const pageName = typeof window !== 'undefined' ? localStorage.getItem("pageName") : null;

  useEffect(()=>{
    (async()=>{
      if (newPage) {      
        setLoading(true)
        if(pageName==="allTemple"){
          setPage(Number(newPage));
        }else{
          setPage(1);
        }
      }
      const {data} = await Http.get(`cms/temples/temple-details/?filter=public_listing&search=${search}&limit=8&offset=${pageName === "allTemple" &&Number(newPage)!=0?  Number(newPage)-1 : 0}`);        

      setTemples(data?.data?.results)
      setTotalPage(Number(data?.data?.count)/8)
      setLoading(false)
    })()
  },[newPage,search])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <TitleCard title="Temples" />
      <div className="mt-5">
      <Search route={"/temple/all"} search={search}/>
      </div>
      {!loading ? (
        <div className="main lg:mx-40 mx-5 mb-10">
          <div className="temples mt-14 grid lg:grid-cols-2 grid-cols-1 gap-10">
            {temples &&
              temples.map((item) => (
                <TempleCard key={item.id} data={item} service={false} />
              ))}
          </div>
          {(!temples || temples.length === 0) &&search &&!loading&&<NotFound/>}
          {totalPage > 1 && (
              <Pagination
              currentPage={page}
              count={totalPage}
              setPage={setPage}
              newPageName={"allTemple"}
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
