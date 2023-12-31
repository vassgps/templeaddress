
import React from "react";
import "./loader.css"

const Loader = () => {
  return (

    <div className="loaderdiv  flex justify-center items-center h-full" id="loaderContainer">
  <svg viewBox="0 0 100 100">
    <defs>
      <filter id="shadow">
        <feDropShadow dx="0" dy="0" stdDeviation="1.5" 
          floodColor={"#e93c2d"}/>
      </filter>
    </defs>
    <circle
        id="loaderSpinner"
        style={{
          fill: 'transparent',
          stroke: '#FF6633',
          strokeWidth: '7px',
          strokeLinecap: 'round',
          filter: 'url(#shadow)',
        }}
        cx="50"
        cy="50"
        r="45"
      /></svg>
    </div>
  );
};

export default Loader;