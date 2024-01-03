import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import ConfirmationPopup from "@/components/admin/confirmationPopup/confirmationPopup";
import Http from "@/config/Http";
import { successToast } from "@/toasts/toasts";

const Offerings = ({
  title,
  description,
  amount,
  booking_available,
  admin,
  uuid,
}: {
  booking_available: boolean;
  admin?: boolean;
  uuid?: string;
  amount: string | number;
  description: string;
  title: string;
}) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPooja, setShowPooja] = useState(true);

  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    const { data } = await Http.delete(`cms/temples/pooja-details/${uuid}`);
    setLoading(false);
    setDeletePopup(false);
    setShowPooja(false);
    successToast(`pooja  deleted successfully`);
  };

  return (
    <>
      {showPooja && (
        <div className="bg-white cursor-pointer group hover:bg-primary text-black hover:text-white p-5 md:p-10 rounded-lg">
          <div className="flex justify-between">
            <h1 className="font-poppins text-base font-semibold leading-6 tracking-normal text-left">
              {title}
            </h1>
            {admin && (
              <div className="flex gap-2">
                <button
                  onClick={() => router.push(`/temple/${uuid}/edit-pooja`)}
                  className="  text-right cursor-pointer"
                >
                  {React.createElement(FaEdit, { size: "25" })}
                </button>
                <button
                  onClick={() => setDeletePopup(true)}
                  className=" text-right cursor-pointer"
                >
                  {React.createElement(MdDelete, { size: "25" })}
                </button>
              </div>
            )}
          </div>
          <p className="font-Poppins mt-5 text-base font-normal leading-7 tracking-normal text-left">
            {description}
          </p>
          <div className="flex justify-between font-sans mt-2">
            <h1>Amount : {amount}</h1>
            {booking_available ? (
              <h1 className="text-lime-500 font-bold">Available</h1>
            ) : (
              <h1 className="font-bold">Not Available</h1>
            )}
          </div>
        </div>
      )}
      {deletePopup && (
        <ConfirmationPopup
          message="Are you sure you want to delete this, Pooja "
          handleSubmit={handleSubmit}
          loading={loading}
          setBlockPopup={setDeletePopup}
        />
      )}
    </>
  );
};

export default Offerings;
