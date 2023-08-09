import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "../App.css";
import "react-tabs/style/react-tabs.css";

export default function MyIpMap({ position }) {
  console.log(position);

  function MyComponent() {
    const map = useMap();
    console.log("map center:", map.getCenter());
    return null;
  }

  return (
    <div id="map">
      <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
        <MyComponent />

        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>{`${position[0] - position[1]}`}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
