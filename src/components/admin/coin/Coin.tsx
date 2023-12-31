"use client";
import React, { useEffect, useState } from "react";
import Input from "@/components/ui/input/Input";
import Button from "@/components/ui/button/Button";
import { get, put } from "@/Api/Api";
import LoadingButton from "@/components/ui/loadingButton/LoadingButton";
import { successToast } from "@/toasts/toasts";
import Loader from "@/components/ui/loader/Loader";

const Coin = () => {
  const [oneCoin_Err, SetOneCoin_Err] = useState("");
  const [coin, SetCoin] = useState<string>('');
  const [submit, SetSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  useEffect(()=>{
    (async()=>{
      const data = await get(`/admin/coin`);
      SetCoin(data.one_coins)
      setPageLoading(false)
    })()
  },[])
  
  const handleSubmit =async () => {
    setLoading(true)
    SetSubmit(true)
    if(Number(coin)>0){
      SetOneCoin_Err("")
      const data=await put("/admin/coin",{coin})
      if(data.status){
        successToast(`Coin price updated successfully`);
      }
      setLoading(false)
    }else{
      setLoading(false)
      SetOneCoin_Err("Please enter your  coin price")
    }
  };

  const handleChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
    SetCoin(e.target.value)
    if(oneCoin_Err.trim().length>0){
      SetOneCoin_Err("")
    }else{
      SetOneCoin_Err("Please enter your  coin price")
    }
  }

  return (
    <>
    {!pageLoading?<div className="w-1/2 flex items-center gap-5">
      <Input
        err={oneCoin_Err}
        submit={submit}
        handleChange={handleChange}
        value={coin}
        type={"number"}
        title={"One Coin in Indian Rupee :-"}
        name={"coin"}
      />
      <div className="mt-8">
        {!loading?<Button name="save" onClick={handleSubmit} bg={true} tick={false} />:<LoadingButton/>}
      </div>
    </div>: <div className="flex justify-center items-center w-full h-full">
          <Loader />
        </div>}
    </>
  );
};

export default Coin;
