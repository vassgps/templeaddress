import React from "react";

const Content = () => {
  return (
    <div className="mt-5 grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x grid-cols-1 bg-white p-5">
      <Text
        border={false}
        title="Peace of Mind"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos magnam, esse corrupti at ducimus omnis dolorem facere, quod itaque quisquam, ad sint vel tempora? Sint illum quae quam ullam. Accusamus."
      />
      <Text
        border={true}
        title="100% Satisfaction"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos magnam, esse corrupti at ducimus omnis dolorem facere, quod itaque quisquam, ad sint vel tempora? Sint illum quae quam ullam. Accusamus."
      />
      <Text
        border={true}
        title="Set For Pastor"
        description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eos magnam, esse corrupti at ducimus omnis dolorem facere, quod itaque quisquam, ad sint vel tempora? Sint illum quae quam ullam. Accusamus."
      />
    </div>
  );
};

export default Content;

const Text = ({
  title,
  description,
  border,
}: {
  title: string;
  description: string;
  border: boolean;
}) => {
  return (
    <div className="lg:flex items-center">
      {/* <div
        className={`${
          border &&
          "lg:border-l-2 lg:border-t-0 border-l-0 lg:h-32 lg:mx-0  mx-20 border-t-2  border-gray-300 "
        }`}
      ></div> */}
      <div className="p-5 ">
        <h1 className="font-poppins text-xl font-semibold text-primary tracking-normal text-left ">
          {title}
        </h1>
        <p className="font-poppins text-sm font-normal leading-6 tracking-normal text-left mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};
