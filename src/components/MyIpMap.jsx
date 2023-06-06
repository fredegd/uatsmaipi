// import { React, useState, useEffect } from "react";
// import axios from "axios";
// import { client } from "../client";
// import { MapContainer, TileLayer } from "react-leaflet";

// export default function MyIpMap() {
//   useEffect(()=>{
//     axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${client.apiKey}`)
//       .then((response)=>{
//          const { lat, lng } = response.data.location;
//          setPosition({ lat, lng });
         
//         // setIsLoading(false);
//       })
//       .catch((err)=>{console.error(err)})
//    },[]);
//    console.log(position, "diocan")
//   return (
//     <>
//     <MapContainer center={position} zoom={3} scrollWheelZoom={true}>
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//     </MapContainer>
//     </>
//   );
// }
