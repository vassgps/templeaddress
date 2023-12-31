import React from "react";
import {InputProps} from "@/models/interfaces"

const Input = ({err,submit,handleChange,value,type,name,bg,title,width=false}:InputProps) => {
  return (
    <div className={`${width ? " md:col-span-2 ":"" } w-full mt-2`}>
      <label className="block " htmlFor={name}>
        {title}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        onChange={handleChange}
        value={value}
        className={` ${bg&&" bg-white "} outline-none py-3 pl-4 w-full bg-transparent border mt-2 rounded-lg border-black`}
      />
      {submit && (
        <span className="text-[red] text-[13px]">{err}</span>
      )}
    </div>
  );
};

export default Input;
