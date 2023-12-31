import React from "react";

const Content = () => {
  return (
    <div className="mt-5 grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x grid-cols-1 bg-white p-5">
      <Text
        border={false}
        title="Divine Serenity"
        description="Discover unparalleled peace amidst the sacred surroundings of ancient temples. Experience tranquility as you immerse yourself in the divine energy that echoes through the hallowed walls.
        Experience the gentle whispers of devotion, the soothing melodies of rituals, and the serene ambiance that envelopes these sanctuaries."
      />
      <Text
        border={true}
        title="Spiritual Harmony Assured"
        description="Delve into a world where spiritual contentment meets unwavering satisfaction. Our temple listings promise a seamless blend of traditions, offering a sanctuary for seekers of spiritual fulfillment.
        Unravel the secrets of ancient wisdom and find solace in the harmony of rituals, ceremonies, and timeless traditions."
      />
      <Text
        border={true}
        title="Sacred Temples Unveiled"
        description="Embark on a journey to explore revered temples and sacred sites that echo with centuries of devotion. Unveil the profound history and significance of these architectural marvels, each with its unique story waiting to be discovered.
        Engage in the spiritual narratives, rituals, and cultural marvels that define these remarkable heritage sites."
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
