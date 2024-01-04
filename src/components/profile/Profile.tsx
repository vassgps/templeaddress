"use client";
import React, { Suspense, lazy, useRef, useState, useEffect } from "react";
import { FaCoins } from "react-icons/fa6";
import { TbMoneybag } from "react-icons/tb";

import Styles from "../serviceForm/ServiceForm.module.css";
import Button from "../ui/button/Button";
import { User } from "@/models/interfaces";
import Loader from "../ui/loader/Loader";
import { useRouter } from "next/navigation";
import { successToast } from "@/toasts/toasts";
import Http from "@/config/Http";

const History = lazy(() => import("./history/History"));
const ResetPassword = lazy(() => import("../resetPassword/ResetPassword")); 


const Profile = () => {
  const [open, setOpen] = useState(false);
  const textRef = useRef(null);
  const router = useRouter();
  const [user, setUser] = useState<User | undefined>();
  const [coin, setCoin] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async()=>{
      setLoading(true)
      const {data}  = await Http.get("user/profile/");    
      setUser(data.data);
      setLoading(false)
      getAmount()
    })()
  }, []);
  async function getAmount(){
    const {data}  = await Http.get("cms/temples/dashboard/");    
    setCoin(Number(data.data.coin_value));
  }
  

  const handleCopy = () => {
    const range = document.createRange();
    range.selectNode(textRef.current);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand("copy");
    selection.removeAllRanges();
    successToast("copied successfully");
  };

  return (
   <> {!loading?<>
      {user && (
        <>
          <div className="flex  w-full  justify-center items-center mt-5 ">
            <div
              className={`${Styles["TempleForm"]} md:w-[80%]  md:flex p-7 justify-center items-center md:p-10`}
            >
              <div className="w-full md:ml-5 items-center p-5">
                <p className="font-Poppins text-sm mt-3 lg:w-[80%] font-normal leading-7 tracking-normal text-left">
                  <strong>name :</strong> {user.first_name}
                </p>
                <p className="font-Poppins text-sm mt-3 lg:w-[80%] font-normal leading-7 tracking-normal text-left">
                  <strong>Email :</strong>
                  {user.email}
                </p>
                <p className="font-Poppins text-sm mt-3 lg:w-[80%] font-normal leading-7 tracking-normal text-left">
                  <strong>mobile number :</strong>
                  {user.mobile_number}
                </p>
                
                <p className="font-Poppins md:flex text-sm mt-3 lg:w-[80%] font-normal leading-7 tracking-normal text-left">
                  <strong className="whitespace-nowrap mr-1 ">
                    referral link :
                  </strong>
                  <span ref={textRef} className="text-cyan-500">
                    {process.env.NEXT_PUBLIC_BASE_URL}signup?referralCode=
                    {user.username}
                  </span>
                  <button
                    className="ml-3 bg-slate-400 p-1 py-0 rounded-xl"
                    onClick={handleCopy}
                  >
                    Copy
                  </button>
                </p>
                <p className="font-Poppins md:flex text-sm mt-3 lg:w-[80%] font-normal leading-7 tracking-normal text-left">
                  <strong className="whitespace-nowrap mr-1 ">
                    referral id :
                  </strong>
                  <span className="text-black">
                    {user.username}
                  </span>
                 
                </p>
                <p className="font-Poppins  text-sm mt-3 flex lg:w-[80%] font-normal leading-7 tracking-normal text-left">
                  <strong>coins :</strong>
                  <strong className="text-primary flex text-lg ml-2">
                    {user.wallet_balance}{" "}
                  </strong>
                  <strong className="m-2 text-primary">
                    <FaCoins />
                  </strong>
                </p>
                <p className="font-Poppins mb-5 text-sm mt-1 flex lg:w-[80%] font-normal leading-7 tracking-normal text-left">
                  <strong>amount :</strong>
                  <strong className="text-primary flex text-lg ml-2">
                    {Math.floor(Number(coin)* Number(user.wallet_balance))}
                  </strong>
                  <strong className="m-1 text-primary ">
                    {React.createElement(TbMoneybag, { size: "20" })}
                  </strong>
                </p>
                <div className="flex gap-3">
                  {Math.floor(Number(coin)* Number(user.wallet_balance)) > 0 && (
                    <Button
                      tick={false}
                      onClick={() => router.push("/withdraw-form")}
                      bg={true}
                      name="withdraw Amount"
                    />
                  )}
                  {
                    <Button
                      tick={false}
                      onClick={() => setOpen(true)}
                      bg={true}
                      name="Reset Password"
                    />
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full  justify-center items-center">
            <Suspense
              fallback={
                <div className="flex justify-center items-center w-full  h-full">
                  <Loader />
                </div>
              }
            >
              <History />
            </Suspense>
          </div>
          {open && <ResetPassword setOpen={setOpen} />}
        </>
      )}
    </>:<div className="flex justify-center items-center w-full  h-full">
          <Loader />
        </div>}</>
  );
};

export default Profile;
