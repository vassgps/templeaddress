"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

import paginationLeft from "../../../assets/paginationLeft.png";
import paginationRight from "../../../assets/paginationRight.png";
import { useRouter } from "next/navigation";

const Pagination = ({
  count,
  currentPage,
  setPage,
  newPageName,
  pageName
}: {
  pageName:string
  newPageName:string
  count: number;
  currentPage: number;
  setPage:any
}) => {
  const [skip, setSkip] = useState(0);
  const [number, setNumber] = useState(0);
  useEffect(() => {
    if (count < 5) {
      setNumber(count);
      setSkip(0);
    } else if ((currentPage + 1) / 5 >= 1) {
      setNumber(currentPage + 3);
      setSkip(currentPage - 3);
    } else {
      setNumber(5);
      setSkip(0);
    }
  }, [currentPage,count]);

  const prevClickHandler = () => {
    if(currentPage !== 1){
      const newpage=currentPage-1
      setPage(newpage)
      localStorage.setItem("page", newpage+'');
    }else{
      setPage(count)
      localStorage.setItem("page", count+'');
    }
    if(pageName!=newPageName){
      localStorage.setItem("pageName", newPageName);
    }
  };

  const nextClickHandler = () => {
    if(currentPage === count){
      localStorage.setItem("page", '1');
      setPage(1)
    }else{
      const newpage=currentPage+1
      setPage(newpage)
      localStorage.setItem("page", newpage+'');
    }
    if(pageName!=newPageName){
      localStorage.setItem("pageName", newPageName);
    }
  };

  const handlePageClick = (number: number) => {    
    setPage(number)
    localStorage.setItem("page", number+'');
    if(pageName!=newPageName){
      localStorage.setItem("pageName", newPageName);
    }
  };

  return (
    <div className="w-full mt-5 flex justify-center">
      <div className="flex rounded-lg bg-white cursor-pointer">
        <div onClick={prevClickHandler}>
          <Image
            src={paginationLeft}
            className="w-4 h-4 mx-4 my-3 "
            alt="pagination Left"
          />
        </div>
        {Array.from({ length: Number(number) }, (_, index) => (
          <React.Fragment key={`page-${index + 1}`}>
            {skip < index + 1 && (
              <div
                onClick={() => handlePageClick(index + 1)}
                className={`${
                  currentPage === index + 1 && " bg-primary "
                } px-5 py-2 border-r border-l hover:bg-primary border-gray-300`}
              >
                {index + 1}
              </div>
            )}
          </React.Fragment>
        ))}
        <div onClick={nextClickHandler}>
          <Image
            className="w-4 h-4 mx-4 my-3 "
            src={paginationRight}
            alt="pagination Right"
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
