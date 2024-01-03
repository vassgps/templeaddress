import React from "react";
import { SiGooglemaps } from "react-icons/si";
import { MdLocationPin } from "react-icons/md";
import { useRouter } from "next/navigation";

const Location = ({location,googleMapLink}:{googleMapLink:string,location?:string}) => {
  const router=useRouter()

  if (!location && !googleMapLink) {
    return null;
  }

  return (
    <>
      <div className="flex">
      {location&& location.length>3&& <>
      <div className="text-primary">
        {React.createElement(MdLocationPin, { size: "20" })}
        </div> 
        

        <h1
          style={{ color: " rgba(255, 0, 0, 1)" }}
          className=" font-poppins ml-1 text-xs pt-1 font-semibold tracking-normal "
          >
          { location}
        </h1>
          </> }
      </div>
      {googleMapLink&&<a target="_blank"  href={googleMapLink} className="flex ">
      <div className="text-primary">
        {React.createElement(SiGooglemaps, { size: "20" })}
        </div> 
        
        <h1
          style={{ color: " rgba(13, 121, 200, 1)" }}
          className=" font-poppins text-xs ml-1 mr-5 pt-1 bottom-0 whitespace-nowrap  font-semibold   "
        >
          Google Map
        </h1>
      </a>}
    </>
  );
};

export default Location;
