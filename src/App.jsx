import { useState, useEffect } from "react";
import axios from "axios";
import { client } from "./client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import GridEyes from "./assets/Grid_Eyes.gif";
import IpDetails from "./components/IpDetails";

import "react-tabs/style/react-tabs.css";
import "./App.css";
// import MyIpMap from "./components/MyIpMap";

function App() {
  const [allData, setAllData] = useState({});
  const [ipAddress, setIpAddress] = useState("");
  const [geodata, setGeodata] = useState({});
  const [position, setPosition] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [countryFlag, setCountryFlag] = useState();
  const [countryName, setCountryName] = useState();

  useEffect(() => {
    axios
      .get(`https://geo.ipify.org/api/v2/country,city?apiKey=${client.apiKey}`)
      .then((response) => {
        setAllData(response.data);
        setIpAddress(response.data.ip);
        const { city, postalCode, region, country, timezone, lat, lng } =
          response.data.location;
        setGeodata({ city, postalCode, region, country, timezone, lat, lng });
        setPosition([response.data.location.lat, response.data.location.lng]);
        axios
          .get(`https://restcountries.com/v3.1/name/${country}`)
          .then((response) => {
            const nationId = response.data.findIndex((el) => el.cca2 === "DE");
            setCountryFlag(response.data[nationId].flags.png);
            setCountryName(response.data[nationId].altSpellings[1]);
          })
          .catch((err) => {
            console.error("impossible to set the flag,", err);
          });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <main>
      <header>
        <h1>System Surveillance</h1>
        <div className="scanner-container">
          <div className="eyeWrapper">
            <img className="eye" src={GridEyes} alt="scanning eye" />
            <img className="eye" src={GridEyes} alt="scanning eye" />
          </div>
        </div>
      </header>

      {isLoading ? (
        <div className="scanner-container">
          <p className="mono">Initializing connection... Scanning network...</p>
        </div>
      ) : (
        <section className="dashboard">
          <div className="status-grid">
            <div className="info-card">
              <h3>Device IP Address</h3>
              <p className="accent-text">{ipAddress}</p>
            </div>
            <div className="info-card location-card">
              <div className="location-content">
                <h3>Current Location</h3>
                <p>
                  {geodata.city}, {geodata.region}, <span className="accent-text">{countryName}</span>
                </p>
              </div>
              {countryFlag && (
                <div className="mini-flag">
                  <img
                    src={countryFlag}
                    alt={`${countryName} flag`}
                    className="flag-img-small"
                  />
                </div>
              )}
            </div>
            <div className="info-card">
              <h3>Precise Coordinates</h3>
              <p className="mono">
                LAT: {geodata.lat} | LNG: {geodata.lng}
              </p>
            </div>
            <div className="info-card">
              <h3>Temporal Zone</h3>
              <p className="mono">UTC {geodata.timezone}</p>
            </div>
          </div>


          <IpDetails
            geodata={geodata}
            position={position}
            ipAddress={ipAddress}
            allData={allData}
          />
        </section>
      )}
    </main>
  );
}

export default App;
