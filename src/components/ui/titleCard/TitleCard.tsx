import React from 'react';

const TitleCard = ({ title ,image}: { title: string,image?:string }) => {
  return (
    <div
      className='flex justify-center opacity-75 items-center h-40 w-full'
      style={{
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <img
        src={image?image:'https://antiquebetabucket.s3.ap-south-1.amazonaws.com/file1704352251183'}
        alt={title}
        loading="lazy"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
      <h1
        className='font-Poppins text-xl font-medium text-white tracking-normal text-left'
        style={{
          position: 'relative',
          zIndex: 1,
        }}
      >
        {title}
      </h1>
    </div>
  );
};

export default TitleCard;
