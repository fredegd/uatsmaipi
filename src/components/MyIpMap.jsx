 import { MapContainer, TileLayer } from "react-leaflet";
 import "../App.css";

 
 export default function MyIpMap({position}) {
  console.log(position)
   return (
    <div id="map">
   <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  </div>
   )
 }
 