import Image from "next/image";
import React from "react";
import tickicon from "../../../assets/tickicon.png";
import tickiconbg from "../../../assets/tickiconbg.png";
import unTickIcon from "../../../assets/unTickicon.png";
type ClickHandler = () => void;

const Button = ({ name , bgColor,bg ,tick ,onClick}: {bgColor?:string, name: string, bg: boolean ,tick:boolean,onClick?:ClickHandler}) => {
  return (
    <>
      {bg ? (
          <button onClick={onClick} type="button" className={`${bgColor?bgColor:" bg-primary "}  flex    rounded-lg py-3 px-5  text-sm md:text-base   hover:opacity-75 text-white font-semibold`}>
            {tick && <div className="relative mr-2 w-5 mt-0.5 ">
              <Image className="" src={tickiconbg} alt="tickiconbg" />
              <Image className="absolute bottom-1 ml-0.5 " src={tickicon}  alt="tickicon"/>
            </div>}
            {name}
          </button>
      ) : (
        <button onClick={onClick} type="button"  className="flex  rounded-lg py-3 px-5 border border-black hover:border-primary hover:text-primary hover:opacity-75 text-black font-semibold">
          {tick && <div className=" mr-2 mt-0.5">
            <Image className="" src={unTickIcon} alt="unTickIcon"/>
          </div>}
          {name}
        </button>
      )}
    </>
  );
};

export default Button;
