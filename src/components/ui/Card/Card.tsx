"use client";
import React, { useEffect, useState } from "react";
import Location from "../location/Location";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationPopup from "./confirmationPopup/ConfirmationPopup";
import { useRouter } from "next/navigation";
import { TfiMenu } from "react-icons/tfi";
import { IoMdClose } from "react-icons/io";
import { MdTempleBuddhist } from "react-icons/md";

const Card = ({
  service,
  admin,
  data,
}: {
  service: boolean;
  admin?: boolean;
  data?: any;
}) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [open, setOpen] = useState(false);

  const [itemDelete, setItemDelete] = useState(false);
  const [description, setDescription] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (data.description.length > 10) {
      const truncatedText = data.description.slice(0, 180);
      setDescription(truncatedText);
    } else {
      setDescription(data.description);
    }
  }, [data]);

  return (
    <>
      {!itemDelete && data && (
        <div
          style={{ backgroundColor: "rgba(255, 255, 255, 0.77)" }}
          className="min-h-72 w-full  md:flex grid items-center  gap-3 md:rounded-3xl  rounded-2xl"
        >
          <div className="w-full  md:p-8 pt-0 p-4 pb-5 md:pt-8   pr-2  grid  md:col-start-2 md:col-end-3 col-start-0 col-end-1 order-2 md:order-1">
            <div className="flex justify-between cursor-pointer">
              <h1
                onClick={() =>
                  router.push(
                    `${
                      service ? `/service/${data.slug}` : `/temple/${data.slug}`
                    }`
                  )
                }
                className="font-poppins text-base font-semibold leading-6 tracking-normal text-left"
              >
                {data.name}
              </h1>
              {admin && (
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      router.push(
                        `${
                          service
                            ? `/service/edit?id=${data.uuid}`
                            : `/temple/edit?id=${data.uuid}`
                        }`
                      )
                    }
                    className="text-primary text-right cursor-pointer"
                  >
                    {React.createElement(FaEdit, { size: "25" })}
                  </button>
                  <button
                    onClick={() => setDeletePopup(true)}
                    className="text-primary text-right cursor-pointer"
                  >
                    {React.createElement(MdDelete, { size: "25" })}
                  </button>
                </div>
              )}
            </div>
            <p className=" font-poppins md:mt-2 mt-5   text-black text-xs font-normal leading-6 tracking-normal text-left">
              {description} {data.description.length > 180 && "...."}
            </p>
            {admin&& !service&&<div>
              <button
                onClick={() => router.push(`/temple/${data.uuid}/add-pooja`)}
                className="flex"
              >
                <h1
                  style={{ color: " rgba(255, 0, 0, 1)" }}
                  className=" font-poppins  text-xs  font-extrabold tracking-normal "
                >
                  Add Poojas
                </h1>
              </button>
            </div>}
            <div className="flex justify-between mt-5 ">
              {service ? (
                <button
                  onClick={() => router.push(`/service/${data.slug}`)}
                  className="flex"
                >
                  <h1
                    style={{ color: " rgba(255, 0, 0, 1)" }}
                    className=" font-poppins  text-xs  font-extrabold tracking-normal "
                  >
                    View Details
                  </h1>
                </button>
              ) : (
                <>
                  {" "}
                  {data.map_url && (
                    <Location
                      googleMapLink={data.map_url}
                      location={`${data.town} ${
                        data.state ? ", " + data.state : ""
                      }`}
                    />
                  )}
                </>
              )}
            </div>
          </div>
          <div className="relative  h-72 w-full md:w-[470px] flex justify-center  md:pt-0 pt-5 items-center  lg:justify-end  order-1 md:order-2 ">
            <img
              loading="lazy"
              className="h-48 md:h-72  w-48   md:w-full rounded-3xl object-cover"
              src={service ? data.image : data.image}
              alt=""
            />
            {!service && (
              <>
                {open ? (
                  <div
                    onClick={() => setOpen(false)}
                    className="text-primary cursor-pointer bg-white p-2 absolute top-0 rounded-tr-3xl right-0"
                  >
                    {React.createElement(IoMdClose, { size: "20" })}
                  </div>
                ) : (
                  <div
                    onClick={() => setOpen(true)}
                    className="text-primary cursor-pointer bg-white p-2 absolute top-0 rounded-tr-3xl right-0"
                  >
                    {React.createElement(TfiMenu, { size: "20" })}
                  </div>
                )}
                {open && !service && (
                  <div className="bg-white w-40 rounded-lg  absolute top-8 right-0">
                    <button
                      onClick={() =>
                        router.push(`/temple/${data.uuid}/view-poojas`)
                      }
                      type="button"
                      className="flex  text-center w-full shadow-xl  p-3 cursor-pointer  font-semibold  hover:bg-primary hover:text-white rounded-lg"
                    >
                      <div className="mr-3 ml-2 ">
                        {React.createElement(MdTempleBuddhist, { size: "20" })}
                      </div>
                      <p>view poojas</p>
                    </button>
                  </div>
                )}
              </>
            )}

            <button
              onClick={() =>
                router.push(
                  `${
                    service ? `/service/${data.slug}` : `/temple/${data.slug}`
                  }`
                )
              }
              className="cursor-pointer  p-3 w-48 md:w-full rounded-b-3xl absolute bottom-9 md:bottom-0 lg:right-0 font-poppins text-base font-semibold text-center opacity-70 bg-primary text-white "
            >
              view
            </button>
          </div>
          {deletePopup && (
            <ConfirmationPopup
              setItemDelete={setItemDelete}
              id={data.uuid}
              setDeletePopup={setDeletePopup}
              service={service}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Card;
