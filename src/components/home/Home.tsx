  "use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import image from "../../assets/new.png";
import "../about/about.css";
import Card from "@/components/ui/Card/Card";
import Search from "@/components/ui/search/Search";
import { Service, Temple } from "@/models/interfaces";
import Loader from "@/components/ui/loader/Loader";
import SelectOption from "./select-option/SelectOption";
import NotFound from "../not-found/NotFound";
import Http from "@/config/Http";
const Pagination = React.lazy(() => import('@/components/ui/pagination/Pagination'));
const ViewAll = React.lazy(() => import('./view-All/ViewAll'));

const Home = ({ service, search }: { search?: string; service: boolean }) => {
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);

  const [items, setItems] = useState<Service[] | Temple[] | undefined>();
  const [page, setPage] = useState(1);
  const newPage =typeof window !== "undefined" ? localStorage.getItem("page") : null;
  const pageName =typeof window !== "undefined" ? localStorage.getItem("pageName") : null;

  useEffect(() => {
    (async () => {
      if (newPage) {
        const pageNumber = newPage ? Number(newPage) : 1;
        setPage(pageNumber);
        if (pageName === "service" && service||pageName === "temple" && !service) {
          setPage(Number(newPage));
        } else {
          setPage(1);
        }
      }
      setLoading(true);

      if (service) {
        const {data} = await Http.get(`cms/temples/service-details/?search=${search}&limit=4&offset=${pageName === "service" &&Number(newPage)!=0?  Number(newPage)-1 : 0}`)         
        setItems(data?.data?.results);
        setTotalPage(Math.ceil(Number(data?.data?.count)/4));
        setLoading(false);
      } else {
        const {data} = await Http.get(`cms/temples/temple-details/?search=${search}&limit=4&offset=${pageName === "temple" &&Number(newPage)!=0?  Number(newPage)-1 : 0}`);        
        setItems(data?.data?.results);
        setTotalPage(Math.ceil(Number(data?.data?.count)/4));
        setLoading(false);
      }
    })();
  }, [newPage,search]);

  return (
    <>
      <div className="flex justify-center mt-5">
        <div>
          <h1 className="font-poppins text-2xl md:no-underline underline md:text-3xl text-black font-semibold leading-53 tracking-normal">
            Find Your Favourite {`${service ? "Services" : "Temples"}`}
          </h1>
          <div className=" justify-between md:flex hidden mt-2">
            <hr className="w-36 h-1    bg-primary" />
            <Image className="absolute ml-28" loading="lazy" src={image} alt="image" />
            <hr className="w-36   h-1  bg-primary" />
          </div>
        </div>
      </div>
      <div className=" w-full mt-10 md:mt-24">
        <SelectOption
          search={search}
          route1={`/`}
          route2={`/services`}
          service={service}
        />
        <Search route={service ? "/services" : "/"} search={search} />
        {!loading ? (
          <>
            <div className="temples mt-10 grid lg:grid-cols-2 grid-cols-1 gap-10">
              {items &&
                items.length > 0 &&
                items.map((data: Service | Temple) => (
                  <Card data={data} key={data.id} service={service} />
                ))}
            </div>
            {(!items || items.length === 0) && search && !loading && (
              <NotFound />
            )}
            {search.trim().length === 0 && totalPage > 1 && (
              <ViewAll service={service} />
            )}
            {totalPage > 1&& (
              <Pagination
                currentPage={page}
                count={totalPage}
                setPage={setPage}
                newPageName={service ? "service" : "temple"}
                pageName={pageName}
              />
            )}
          </>
        ) : (
          <div className="flex justify-center items-center w-full h-full">
            <Loader />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
