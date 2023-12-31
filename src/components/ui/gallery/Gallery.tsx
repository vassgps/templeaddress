"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Gallery = ({ gallery }: { gallery: any }) => {
  const [duplicatedImages, setDuplicatedImages] = useState<string[] | undefined>();
  const [images,setImages]=useState<string[] | undefined>()
  useEffect(() => {
    let resultArray = [];
    if(gallery &&Object.keys(gallery).length > 0){

      for (let i = 0; i < 3; i++) {
        if (gallery[`image_${i + 1}`]) {
          resultArray.push(gallery[`image_${i + 1}`]);
        }
      }
      setImages(resultArray)
      if (resultArray.length > 2) {
        const duplicatedImages = [...resultArray, ...resultArray];
        setDuplicatedImages(duplicatedImages);
      } else {
        setDuplicatedImages(resultArray);
      }
    }
  }, [gallery]);

  return (
    <>
      <div className="example w-full inline-flex flex-nowrap overflow-x-auto">
        <div
          className={`flex items-center justify-center md:justify-start ${
            images&&  images.length > 2 &&
            "[&_li]:mx-8 [&_img]:max-w-none animate-infinite-scroll slower-animation"
          }`}
          style={{
            scrollSnapType: "x mandatory",
            width: `${duplicatedImages?.length * 300}px`,
            animationDuration: "100s",
          }}
        >
          {duplicatedImages?.map((item, index) => (
            <div key={index}>
              {item && (
                <div
                  
                  className={`lg:p-5 pt-5 ${
                    index === duplicatedImages.length - 1 ? "mr-0" : "mr-8"
                  }`}
                  style={{ flex: "0 0 auto", scrollSnapAlign: "start" }}
                >
                  <Image
                    width={300}
                    className="max-h-40"
                    height={200}
                    src={item}
                    alt={`table  Img ${index + 1}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Gallery;
