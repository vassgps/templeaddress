import Image from "next/image";
import React from "react";
import "../../../../components/about/about.css";
import Text from "../text/Text";
import { IoLogoYoutube } from "react-icons/io";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TempleHistory = ({
  name,
  social_media,
  description,
  contact_number,
  id
}: {
  name: string;
  description: string;
  contact_number: string;
  social_media: any;
  id:string
}) => {
  const router = useRouter();

  return (
    <div className=" grid  md:grid-cols-3 grid-cols-2  mt-5">
      <div className="col-span-2 bg-white  rounded-lg lg:rounded-none p-10">
        <div className="md:flex justify-between">

        <h1 className="font-Poppins text-2xl  font-semibold leading-24 tracking-normal text-left">
          {name}
        </h1>
        <div onClick={()=>router.push(`/temple/${id}/view-poojas`)} className="font-Poppins text-sm mt-2 md:whitespace-nowrap hover:opacity-75 font-normal text-primary cursor-pointer  tracking-normal text-left">
          <strong className="mr-2"> View Poojas</strong>
        </div>
        </div>

        <p className="font-Poppins text-sm mt-5 lg:w-[80%] font-normal leading-7 tracking-normal text-left">
          {description}
        </p>
        <Text title={"Phone Number"} description={contact_number} />
        
        <div className="flex gap-3 mt-2">
          {social_media?.whatsapp_number && (
            <Link
              target="_blank"
              href={"http://wa.me/+91" + social_media?.whatsapp_number}
              className="  bg-white cursor-pointer text-green-600 "
            >
              {React.createElement(FaSquareWhatsapp, { size: "25" })}
            </Link>
          )}
          {social_media?.facebook_link && (
            <Link
              target="_blank"
              href={social_media?.facebook_link}
              className=" bg-white cursor-pointer text-blue-500 "
            >
              {React.createElement(FaFacebook, { size: "25" })}
            </Link>
          )}
          {social_media?.instagram_link && (
            <Link
              target="_blank"
              href={social_media?.instagram_link}
              className="  bg-white cursor-pointer text-pink-600 "
            >
              {React.createElement(FaInstagramSquare, { size: "25" })}
            </Link>
          )}
          {social_media?.youtube_link && (
            <Link
              target="_blank"
              href={social_media?.youtube_link}
              className="  bg-white cursor-pointer text-red-600 "
            >
              {React.createElement(IoLogoYoutube, { size: "27" })}
            </Link>
          )}
        </div>
      </div>
      <div className="md:col-span-1 h-80 col-span-2 md:mx-0 mx-10 flex mt-5 md:mt-7 ">
        <Image
          className="rounded-tr-3xl rounded-bl-3xl"
          width={1000}
          height={1000}
          src="https://antiquebetabucket.s3.ap-south-1.amazonaws.com/file1704689553046"
          alt="temple History"
        />
      </div>
    </div>
  );
};

export default TempleHistory;
