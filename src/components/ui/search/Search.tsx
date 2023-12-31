"use client";
import React, { useState } from "react";
import "./search.css";
import { useRouter } from "next/navigation";

const Search = ({route,search}:{search?:string,route?:string}) => {
  const router=useRouter()
  const [searchInput, setSearchInput] = useState(search);
  const [searchInput_err, setSearchInput_err] = useState("");
  const handleSubmit = () => {
    if (searchInput.trim().length > 0) {
      localStorage.setItem("page", '1');
      router.push(`${route}?search=${searchInput}`)
      setSearchInput_err("");
    }else if(search.trim().length >0&& searchInput.trim().length ===0){
      router.push(`${route}`)
    } else {
      setSearchInput_err("Please enter search name");
    }
  };
  return (
    <>
      <div className="flex justify-center rounded-md overflow-hidden w-full ">
        <input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
          value={searchInput}
          placeholder="search ..."
          className="searchInput w-full pl-5 md:w-1/2  border border-primary outline-none rounded-l-lg"
        />
        <button
          onClick={handleSubmit}
          className="bg-primary hover:opacity-75  text-white px-6 text-lg font-semibold py-3 rounded-r-lg"
        >
          Search
        </button>
        <br />
      </div>
      <div className="flex justify-center mt-2">
        <span className=" text-[red] text-[13px]">{searchInput_err}</span>
      </div>
    </>
  );
};

export default Search;
