import { useState, useEffect } from "react";
import axios from "axios";
import { client } from "./client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import GridEyes from "./assets/Grid_Eyes.gif";
import IpDetails from "./components/IpDetails";
import InfoModal, { InfoButton } from "./components/InfoModal";

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
  const [deviceData, setDeviceData] = useState({});
  const [locationSource, setLocationSource] = useState("IP");
  const [modalInfo, setModalInfo] = useState({ isOpen: false, title: "", contentKey: "" });

  useEffect(() => {
    const getDeviceData = () => {
      const nav = navigator;
      const screen = window.screen;
      
      const deviceData = {
        userAgent: nav.userAgent,
        platform: nav.platform,
        language: nav.language,
        languages: nav.languages?.join(", ") || "N/A",
        cookieEnabled: nav.cookieEnabled,
        onLine: nav.onLine,
        hardwareConcurrency: nav.hardwareConcurrency || "N/A",
        deviceMemory: nav.deviceMemory ? `${nav.deviceMemory} GB` : "N/A",
        screenWidth: screen.width,
        screenHeight: screen.height,
        screenAvailWidth: screen.availWidth,
        screenAvailHeight: screen.availHeight,
        screenColorDepth: screen.colorDepth,
        screenPixelDepth: screen.pixelDepth,
        pixelRatio: window.devicePixelRatio,
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        outerWidth: window.outerWidth,
        outerHeight: window.outerHeight,
        touchSupport: "ontouchstart" in window,
        maxTouchPoints: nav.maxTouchPoints || 0,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        batteryAvailable: false,
        level: "N/A",
        charging: false,
        chargingTime: "N/A",
        dischargingTime: "N/A",
        pdfViewerEnabled: nav.pdfViewerEnabled,
        webdriver: nav.webdriver || false,
        doNotTrack: nav.doNotTrack || "Not supported",
        vendor: nav.vendor || "N/A",
        appCodeName: nav.appCodeName || "N/A",
        appName: nav.appName || "N/A",
        appVersion: nav.appVersion || "N/A",
        geolocation: "geolocation" in nav,
        mediaDevices: nav.mediaDevices ? true : false,
        clipboardApi: "clipboard" in nav,
        fullscreenApi: "fullscreen" in document,
        webglVendor: (() => {
          try {
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
            return debugInfo ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : "N/A";
          } catch (e) { return "N/A"; }
        })(),
        webglRenderer: (() => {
          try {
            const canvas = document.createElement("canvas");
            const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
            return debugInfo ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : "N/A";
          } catch (e) { return "N/A"; }
        })(),
        vibrationSupport: "vibrate" in nav,
        presentationApi: "presentation" in nav,
        lockOrientation: "lockOrientation" in screen || "orientation" in window,
        persistentStorage: navigator.persistentStorage ? true : false,
        temporaryStorage: navigator.temporaryStorage ? true : false,
      };

      if (navigator.getBattery && typeof navigator.getBattery === 'function') {
        navigator.getBattery().then(battery => {
          if (!battery) return;
          
          const updateBattery = () => {
            navigator.getBattery().then(b => {
              if (!b) return;
              setDeviceData(prev => ({
                ...prev,
                batteryAvailable: true,
                level: Math.round(b.level * 100) + "%",
                charging: b.charging === true,
                chargingTime: b.chargingTime === Infinity ? "N/A" : b.chargingTime,
                dischargingTime: b.dischargingTime === Infinity ? "N/A" : b.dischargingTime,
              }));
            });
          };
          
          updateBattery();
          
          battery.addEventListener("chargingchange", updateBattery);
          battery.addEventListener("levelchange", updateBattery);
        }).catch(e => {
          console.log("Battery error:", e);
        });
      }

      const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
      if (conn) {
        deviceData.connectionAvailable = true;
        deviceData.effectiveType = conn.effectiveType;
        deviceData.downlink = conn.downlink ? conn.downlink.toFixed(2) + " Mbps" : "N/A";
        deviceData.rtt = conn.rtt ? conn.rtt + " ms" : "N/A";
        deviceData.saveData = conn.saveData ? "Enabled" : "Disabled";
      }

      deviceData.bluetoothAvailable = !!navigator.bluetooth;
      deviceData.midiAvailable = !!navigator.requestMIDIAccess;
      deviceData.usbAvailable = !!navigator.usb;

      setDeviceData(deviceData);
    };
    getDeviceData();

    axios
      .get(`https://geo.ipify.org/api/v2/country,city?apiKey=${client.apiKey}`)
      .then((ipResponse) => {
        setAllData(ipResponse.data);
        setIpAddress(ipResponse.data.ip);

        const loc = ipResponse.data.location;
        setGeodata({
          city: loc.city,
          region: loc.region,
          country: loc.country,
          postalCode: loc.postalCode,
          timezone: loc.timezone,
          lat: loc.lat,
          lng: loc.lng,
          accuracy: null,
          altitude: null,
          heading: null,
          speed: null,
        });
        setPosition([loc.lat, loc.lng]);
        setLocationSource("IP");

        if (loc.country) {
          axios
            .get(`https://restcountries.com/v3.1/alpha/${loc.country}`)
            .then((response) => {
              setCountryFlag(response.data.flags.png);
              setCountryName(response.data.altSpellings[1]);
            })
            .catch((err) => {
              console.error("impossible to set the flag,", err);
            });
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const geoLat = pos.coords.latitude;
          const geoLng = pos.coords.longitude;
          setLocationSource("DEVICE");
          setGeodata(prev => ({
            ...prev,
            lat: geoLat,
            lng: geoLng,
            accuracy: pos.coords.accuracy,
            altitude: pos.coords.altitude,
            altitudeAccuracy: pos.coords.altitudeAccuracy,
            heading: pos.coords.heading,
            speed: pos.coords.speed,
          }));
          setPosition([geoLat, geoLng]);

          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${geoLat}&lon=${geoLng}`)
            .then(res => res.json())
            .then(data => {
              if (data.address) {
                setGeodata(prev => ({
                  ...prev,
                  city: data.address.city || data.address.town || data.address.village || data.address.county || "Device",
                  country: data.address.country || "",
                }));
                if (data.address.country_code) {
                  axios.get(`https://restcountries.com/v3.1/alpha/${data.address.country_code}`)
                    .then(resp => {
                      setCountryFlag(resp.data.flags.png);
                      setCountryName(resp.data.altSpellings[1]);
                    })
                    .catch(() => {});
                }
              }
            })
            .catch(() => {});
        },
        (err) => {
          console.log("Geolocation error:", err.message);
        },
        { enableHighAccuracy: false, timeout: 5000, maximumAge: 300000 }
      );
    }
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
              <InfoButton onClick={() => setModalInfo({ isOpen: true, title: "IP Address", contentKey: "ipAddress" })} />
              <h3>Device IP Address</h3>
              <p className="accent-text">{ipAddress}</p>
            </div>
            <div className="info-card location-card">
              <InfoButton onClick={() => setModalInfo({ isOpen: true, title: "Current Location", contentKey: "currentLocation" })} />
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
              <InfoButton onClick={() => setModalInfo({ isOpen: true, title: "Precise Coordinates", contentKey: "coordinates" })} />
              <h3>Precise Coordinates</h3>
              <p className="mono">
                LAT: {geodata.lat} | LNG: {geodata.lng}
              </p>
              <p style={{ fontSize: "0.75rem", opacity: 0.7 }}>Source: {locationSource}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => setModalInfo({ isOpen: true, title: "Timezone", contentKey: "timezone" })} />
              <h3>Temporal Zone</h3>
              <p className="mono">UTC {geodata.timezone}</p>
            </div>
          </div>


          <IpDetails
            geodata={geodata}
            position={position}
            ipAddress={ipAddress}
            allData={allData}
            deviceData={deviceData}
            locationSource={locationSource}
            setModalInfo={setModalInfo}
          />

          <InfoModal
            isOpen={modalInfo.isOpen}
            onClose={() => setModalInfo({ ...modalInfo, isOpen: false })}
            title={modalInfo.title}
            contentKey={modalInfo.contentKey}
          />
        </section>
      )}
    </main>
  );
}

export default App;
