"use client";

import Button from "@/components/ui/button/Button";
import { useRouter } from "next/navigation";
import React from "react";

const ViewAll = ({service}:{service:boolean}) => {
    const router=useRouter()
  return (
    <div className="w-full flex justify-center mt-10">
      <Button
        onClick={() =>
          service ? router.push("/service/all") : router.push("/temple/all")
        }
        name="view All"
        bg={true}
        tick={false}
      />
    </div>
  );
};

export default ViewAll;
