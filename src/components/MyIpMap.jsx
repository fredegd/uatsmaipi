import React from "react";
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";

import "react-tabs/style/react-tabs.css";
import "../App.css"
export default function MyIpMap({position}) {
  return (
    <div id="map">
      <MapContainer center={position} zoom={12} scrollWheelZoom={true}         style={{ height: "80vh", width: "100%" }}
>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            {`${position[0]} - ${position[1]}`}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
