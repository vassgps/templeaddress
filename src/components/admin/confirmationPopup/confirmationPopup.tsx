import React from "react";
import Button from "@/components/ui/button/Button";
import LoadingButton from "@/components/ui/loadingButton/LoadingButton";

const ConfirmationPopup = ({ setBlockPopup,loading,handleSubmit ,message}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center ">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute md:w-1/3 border-2 border-primary   mx-10 rounded-xl p-10  overflow-y-auto overflow-x-hidden  top-60 bg-white  z-50 justify-center items-center w-full">
        <p className="font-Poppins  text-sm mr-10  text-center font-semibold tracking-normal ">
           {message}?
        </p>
        <div className="flex gap-2 mt-5 justify-center">
          {!loading ? (
            <>
              <div>
                <Button
                  name="Cancel"
                  onClick={() => setBlockPopup(false)}
                  bg={true}
                  tick={false}
                />
              </div>
              <Button
                name="Yes, Block"
                onClick={handleSubmit}
                bg={true}
                tick={false}
              />
            </>
          ) : (
             <LoadingButton/>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
