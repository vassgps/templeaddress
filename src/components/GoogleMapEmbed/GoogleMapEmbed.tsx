"use client";

import { useEffect, useState } from "react";

const GoogleMapEmbed = ({ data }:{data:any}) => {
   const [srcAttribute, setSrcAttribute] = useState<string | null>(null);
   useEffect(() => {
    const tempDiv = typeof window !== 'undefined' ? document.createElement('div') : null;

     tempDiv.innerHTML = data;
      const iframeElement = tempDiv.firstChild as HTMLIFrameElement;
      const src = iframeElement.src;
     setSrcAttribute(src);
   }, [data]);

 return( <div style={{ width: '100%', maxWidth: '100%' }}>
 <iframe
   title="Google Map"
   src={srcAttribute}
   width="100%"
   height="450"
   style={{ border: 0 }}
   allowFullScreen={true}
   loading="lazy"
   referrerPolicy="no-referrer-when-downgrade"
 ></iframe>
</div>
 ) 

}

export default GoogleMapEmbed;
