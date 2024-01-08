"use client";

import React, { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import Card from "../ui/Card/Card";
import Pagination from "../ui/pagination/Pagination";
import Loader from "../ui/loader/Loader";
import SelectOption from "../home/select-option/SelectOption";
import Search from "../ui/search/Search";
import { Service, Temple } from "@/models/interfaces";
import NotFound from "../not-found/NotFound";
import { useRouter } from "next/navigation";
import Http from "@/config/Http";

const Dashboard = ({
  service,
  search,
}: {
  search: string;
  service: boolean;
}) => {
  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const router = useRouter();
  const [items, setItems] = useState<Service[] | Temple[] | undefined>();
  const [page, setPage] = useState(1);
  const newPage =typeof window !== "undefined" ? localStorage.getItem("page") : null;
  const pageName =typeof window !== "undefined" ? localStorage.getItem("pageName") : null;

  useEffect(() => {
    if (newPage) {
      setPage(Number(localStorage.getItem("page")));
      if (
        (pageName === "dashboardService" && service) ||
        (pageName === "dashboardTemple" && !service)
      ) {
        setPage(Number(newPage));
      } else {
        setPage(1);
      }
    }
    (async () => {
      setLoading(true);
      if (service) {
        const {data}=await Http.get(`cms/temples/service-details/?filter=my_listing&search=${search}&limit=4&offset=${pageName === "dashboardService" &&Number(newPage)!=0?  Number(newPage)-1 : 0}`);
          setItems(data?.data?.results);
          setTotalPage(Math.ceil(Number(data?.data?.count)/10));
          setLoading(false);
      } else {
        const {data} =await Http.get(`cms/temples/temple-details/?filter=my_listing&search=${search}&limit=4&offset=${pageName === "dashboardTemple" &&Number(newPage)!=0?  Number(newPage)-1 : 0}`);
          setItems(data?.data?.results);
          setTotalPage(Math.ceil(Number(data?.data?.count)/10));
          setLoading(false);
      }
    })();
  }, [newPage, search]);

  return (
    <div>
      <h1 className="font-poppins text-2xl md:no-underline underline md:text-3xl text-black text-center font-semibold leading-53 tracking-normal">
        My {service ? "Services" : "Temples"}
      </h1>
      <div className=" w-full mt-10 md:mt-10">
        <SelectOption
          route1="/dashboard"
          route2="/dashboard/services"
          service={service}
        />
        <Search
          route={service ? "/dashboard/services" : "/dashboard"}
          search={search}
        />

        {!loading && items?.length > 0 && (
          <div className="temples mt-10 grid lg:grid-cols-2 grid-cols-1 gap-10">
            {items.map((item) => (
              <Card data={item} key={item.id} service={service} admin={true} />
            ))}
          </div>
        )}
        {!loading && !search && items?.length === 0 && (
        <div className="border-2 border-primary rounded-xl flex justify-center items-center h-40">
          <button
            onClick={() =>
              router.push(`${service ? "/service/add" : "/temple/add"}`)
            }
          >
            <h1 className="font-Poppins mb-5 mr-5 whitespace-nowrap text-xl   text-center font-semibold tracking-normal ">
              Add Your {service ? "Service" : "Temple"}
            </h1>
            <div className="flex justify-center">
              <Button
                name={service ? "Add Service" : "Add Temple"}
                bg={true}
                tick={false}
              />
            </div>
          </button>
        </div>
         )} 

        {(!items || items.length === 0) && search && !loading && <NotFound />}

        {loading && (
          <div className="flex justify-center items-center w-full h-full">
            <Loader />
          </div>
        )}

        {Math.floor(totalPage) > 1 && (
          <Pagination
            currentPage={page}
            count={totalPage}
            setPage={setPage}
            newPageName={service ? "dashboardService" : "dashboardTemple"}
            pageName={pageName}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
