"use client";
import Button from '@/components/ui/button/Button';
import { useRouter } from 'next/navigation'
import React,{useEffect, useRef} from 'react'

const SelectOption = ({service,search,route1,route2}:{search?:string,route1:string,route2:string,service:boolean}) => {
    const router=useRouter()
    const isFirstRender = useRef(true);

    useEffect(() => {
      if (isFirstRender.current ) {
        isFirstRender.current = false;
      } else if( search?.trim().length>0||service ) {
          window.scrollTo({
              top: 600,
              left: 100,
              behavior: "smooth",
          });
      }
  }, [ search,service]);
  return (
    <div className="  flex justify-between gap-2 md:mx-auto mb-10 w-full md:w-1/2">
    <Button
      name="Temple"
      onClick={() => router.push(route1)}
      bg={!service}
      tick={true}
    />
    <Button
      name="Service"
      onClick={() => router.push(route2)}
      bg={service}
      tick={true}
    />
  </div>
  )
}

export default SelectOption
