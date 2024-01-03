"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Styles from "./navbar.module.css";
import close from "../../../assets/close.svg";
import menu from "../../../assets/menu.svg";
import { successToast } from "@/toasts/toasts";
import Http from "@/config/Http";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const tokens =typeof window !== "undefined" ?localStorage.getItem("access_token") :null

  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();
  const toggleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (toggleRef.current && !toggleRef.current.contains(e.target as Node)) {
        setToggle(false);
      }
    };
    document.addEventListener("mousedown", handler);
    if (tokens) {
      setToken(tokens);
    }
  }, [tokens]);

  const signOutHandel = async () => {    
      await Http.post("user/logout/", {});
      localStorage.clear()
      successToast("Signed out successfully")
      router.push("/login");
  };

  return (
    <nav
      className={`${Styles["navbar"]}${
        toggle ? " bg-primary   fixed" : " fixed "
      }   lg:bg-primary w-full lg:sticky top-0 left-0 z-10`}
    >
      {/*  Laptop view */}
      <div className=" hidden  lg:flex justify-between  items-center   py-[25px] px-[100px]">
        <button onClick={()=>{router.push("/")}} className={`${Styles["logo"]}`}>
          TempleAddres
        </button>
        <ul className="relative flex gap-10  text-white font-semibold justify-between w-1/2 items-center ">
          <li>
            <button className="hover:opacity-75" onClick={()=>{router.push("/")}}>
              Home
            </button>
          </li>
          <li>
            <button className="hover:opacity-75" onClick={()=>{router.push("/dashboard/")}}>Dashboard</button>
          </li>
          <li>
            <button className="hover:opacity-75" onClick={()=>{router.push("/temple/add")}} >
              Add Temple
            </button>
          </li>
         
          <li>
            <button className="hover:opacity-75" onClick={()=>{router.push("/service/add")}}  >
              Add Service
            </button>
          </li>
         {token&& <li>
            <button className="hover:opacity-75" onClick={()=>{router.push("/profile")}}  >
            Profile
            </button>
          </li>}
        </ul>
        {!token ? (
          <button
          onClick={()=>{router.push("/login")}}
            className="py-[7px] font-semibold text-black px-8 bg-[#fff] rounded-[10px]"
          >
            Login
          </button>
        ) : (
          <div className="flex">
            <button
              onClick={signOutHandel}
              className=" py-[7px] font-semibold text-black px-8 bg-[#fff] rounded-[10px]"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/*  Phone  view */}
      <div className="flex ">
        <button
          onClick={()=>{router.push("/")}}
          className={`${Styles["logo"]} lg:hidden  flex p-5 ${
            toggle ? "flex" : "hidden"
          }`}
        >
          TempleAddres
        </button>
        <div
          ref={toggleRef}
          className={`lg:hidden  flex flex-1 justify-end items-center `}
        >
          <button
            onClick={() => {
              setToggle((prev) => !prev);
            }}
            className={`${!toggle && "bg-white"}  focus:outline-none `}
          >
            <Image
              src={toggle ? close : menu}
              alt="menu"
              width={28}
              height={28}
              className="object-contain m-2"
            />
          </button>
          <div
            className={`${
              toggle ? "flex" : "hidden"
            } p-6 bg-primary absolute  top-16 right-0 w-full z-10  sidebar`}
          >
            <ul className="relative flex flex-col font-semibold text-white justify-center gap-5 items-start ">
              <li className="mt-2">
                <button onClick={()=>{router.push("/")}} className="text-white mt-5" >
                  Home
                </button>
              </li>
              <li className="mt-2">
                <button onClick={()=>{router.push("/dashboard/")}} >
                  Dashboard
                </button>
              </li>
              <li className="mt-2 ">
                <button className=" break-normal" onClick={()=>{router.push("/temple/add")}} >
                  Add Temple
                </button>
              </li>
              <li className="mt-2 ">
                <button className=" break-normal" onClick={()=>{router.push("/service/add")}} >
                  Add Service
                </button>
              </li>
              {token&&<li className="mt-2 ">
                <button className=" break-normal" onClick={()=>{router.push("/profile")}}  >
                  profile
                </button>
              </li>}
              <div className="mt-5 ml-5 ">
                {!token ? (
                  <button
                    onClick={()=>{router.push("/login")}}
                    className=" py-[7px] font-semibold text-[#ff6b07] px-8 bg-[#fff] rounded-[10px]"
                  >
                    Login
                  </button>
                ) : (
                  <button
                    onClick={signOutHandel}
                    className=" py-[7px] font-semibold text-[#ff6b07] px-8 bg-[#fff] rounded-[10px]"
                  >
                    Sign Out
                  </button>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
