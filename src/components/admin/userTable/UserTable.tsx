  "use client";
import React, { useEffect, useState } from "react";
import Pagination from "@/components/ui/pagination/Pagination";
import Search from "@/components/ui/search/Search";
import Tr from "./tr/tr";
import { User } from "@/models/interfaces";
import Loader from "@/components/ui/loader/Loader";
import NotFound from "@/components/not-found/NotFound";
import Http from "@/config/Http";

const UserTable =  ({ search}) => {

  const [loading, setLoading] = useState(true);
  const [totalPage, setTotalPage] = useState(0);
  const [items, setItems] = useState<User[] | undefined>();
  const [page, setPage] = useState(1);
  const newPage = typeof window !== 'undefined' ? localStorage.getItem("page") : null;
  const pageName = typeof window !== 'undefined' ? localStorage.getItem("pageName") : null;

  useEffect(() => {
    if (newPage) {      
      if(pageName==="adminUsers"){
        setPage(Number(newPage));
      }else{
        setPage(1);
      }
    }
    (async () => {
      setLoading(true);
      const {data} = await Http.get(`user/view-users/?search=${search}&limit=6&offset=${pageName === "adminUsers" &&Number(newPage)!=0?  Number(newPage)-1 : 0}`)         
      setLoading(false);
      setItems(data.data.results);      
      setTotalPage(Math.ceil(Number(data?.data?.count)/6));
    })();
  
  }, [search,newPage]);

  return (
    <>
        <div className="w-full  mb-12  px-4 mx-auto mt-10">
        <Search route={"/admin/users"} search={search}/>
        
        {(!items || items.length === 0) &&search &&!loading&&<NotFound/>}

        {!loading?<> {items&&items.length>0 && (<div className="example relative flex flex-col min-w-0 mt-5  w-[170vh]  break-words bg-white  mb-6 shadow-lg rounded ">
            
            <div className="rounded-t mb-0 px-4 py-3 border-0">
              <div className="flex flex-wrap items-center">
                <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                  <h3 className="font-semibold text-base text-blueGray-700">
                    Users list
                  </h3>
                </div>
              </div>
            </div>

              <div className=" block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100  py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                        name
                      </th>
                      <th className="text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                        email
                      </th>
                      <th className=" text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                        phone number
                      </th>
                      <th className="text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                        referrer user
                      </th>
                      <th className="text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                        coins
                      </th>
                      <th className="text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                        status
                      </th>
                      <th className="text-center px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold ">
                        user name
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((user: User) => (
                      <Tr key={user.id} user={user} />
                    ))}
                  </tbody>
                </table>
              </div>
          </div>
            )}

          {Math.floor(totalPage) > 1 && (
            <Pagination
            currentPage={page}
            count={totalPage}
            setPage={setPage}
            newPageName={"adminUsers"}
            pageName={pageName}
            />
          )}</>
          :<div className="flex justify-center items-center w-full h-full">
          <Loader />
        </div>}
        </div>
    
    </>
  );
};

export default UserTable;
