import { React, useState, useEffect } from "react";
import axios from "axios";
import { client } from "./client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import "react-tabs/style/react-tabs.css";
import "./App.css";

function App() {
  const [ipAddress, setIpAddress] = useState('');
  const [geodata, setGeodata] = useState({});
  const[position, setPosition] = useState({lat:null,lng:null})
  const [isLoading, setIsLoading] = useState(true);
  const [countryFlag, setCountryFlag] = useState()
  const [countryName, setCountryName] = useState()

 useEffect(()=>{
  axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${client.apiKey}`)
    .then((response)=>{
      setIpAddress(response.data.ip)
       const { city,postalCode, region, country, timezone, lat, lng } = response.data.location;
       setGeodata({ city, postalCode, region, country, timezone, lat, lng });
       setPosition({lat:response.data.location.lat, lng: response.data.location.lng})
       axios.get(`https://restcountries.com/v3.1/name/${country}`)
            .then((response)=>{   
                const nationId = response.data.findIndex(el =>el.cca2==="DE")
                setCountryFlag(response.data[nationId].flags.png);
                setCountryName(response.data[nationId].altSpellings[1])
                })
            .catch((err)=>{console.error("impossible to set the flag,", err)});
      setIsLoading(false);
    })
    .catch((err)=>{console.error(err)})
 },[]);
 
  return (
    <div>
      <h1>Big Brother is watching You</h1>
      <h2>He Knows for example</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Your IP Address:  {ipAddress}</p>
          <h2>..as well as your position:</h2>
          <p>in this very moment You are located in: { geodata.city}, { geodata.region}, {countryName}</p>
          <h2>more precisely located at</h2>
          <p>latitude: { geodata.lat}, longitude: {geodata.lng}</p>
          <p>Time Zone is: UTC{geodata.timezone}</p>
          {countryFlag && <img src={countryFlag} alt="Country Flag" style={{ width: '300px' }} />}
          <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <h2>Any content 1</h2>
      <MapContainer center={position} zoom={1} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    
  </MapContainer>
    </TabPanel>

    <TabPanel>
      <h2>YOUR IP</h2>
      <p>{ipAddress}</p>
    </TabPanel>
    
  </Tabs>
        </div> 
        
      )}
      
      
    </div>
  );
}

export default App;