import MyIpMap from "./MyIpMap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import InfoModal, { InfoButton } from "./InfoModal";
export default function IpDetails({ geodata, position, ipAddress, allData, deviceData, locationSource, setModalInfo }) {
  const openModal = (title, key) => setModalInfo({ isOpen: true, title, contentKey: key });
  
  return (
    <div className="details-wrapper">
      <Tabs>
        <TabList>
          <Tab>GEOGRAPHIC POSITION</Tab>
          <Tab>NETWORK METRICS</Tab>
          <Tab>DEVICE INFO</Tab>
        </TabList>

        <TabPanel key={1}>
          <h2 className="mono" style={{ color: "var(--accent-cyan)", marginBottom: "1rem" }}>
            {geodata.city} TERMINAL
          </h2>
          <div className="map-card">
            <MyIpMap position={position} />
          </div>
        </TabPanel>

        <TabPanel key={2}>
          <div className="status-grid" style={{ marginTop: "0" }}>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Assigned IP", "assignedIP")} />
              <h3>Assigned IP</h3>
              <p className="accent-text">{ipAddress}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Service Provider", "serviceProvider")} />
              <h3>Service Provider</h3>
              <p>{allData.isp}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Network Domain", "networkDomain")} />
              <h3>Network Domain</h3>
              <p className="mono">{allData.as?.domain || "N/A"}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Routing Info", "routingInfo")} />
              <h3>Routing Info</h3>
              <p className="mono">{allData.as?.name || "N/A"}</p>
            </div>
          </div>
        </TabPanel>

        <TabPanel key={3}>
          <div className="status-grid" style={{ marginTop: "0" }}>
            <div className="info-card">
              <InfoButton onClick={() => openModal("User Agent", "userAgent")} />
              <h3>User Agent</h3>
              <p className="mono">{deviceData.userAgent}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Platform", "platform")} />
              <h3>Platform</h3>
              <p>{deviceData.platform}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Language", "language")} />
              <h3>Language</h3>
              <p>{deviceData.language}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Languages", "languages")} />
              <h3>Languages</h3>
              <p className="mono">{deviceData.languages}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Timezone", "deviceTimezone")} />
              <h3>Timezone</h3>
              <p className="mono">{deviceData.timezone}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Screen Resolution", "screenResolution")} />
              <h3>Screen Resolution</h3>
              <p className="mono">{deviceData.screenWidth} x {deviceData.screenHeight}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Color Depth", "colorDepth")} />
              <h3>Color Depth</h3>
              <p>{deviceData.screenColorDepth} bit</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Pixel Ratio", "pixelRatio")} />
              <h3>Pixel Ratio</h3>
              <p>{deviceData.pixelRatio}x</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Window Size", "windowSize")} />
              <h3>Window Size</h3>
              <p className="mono">{deviceData.innerWidth} x {deviceData.innerHeight}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Touch Support", "touchSupport")} />
              <h3>Touch Support</h3>
              <p>{deviceData.touchSupport ? "Yes" : "No"} ({deviceData.maxTouchPoints} points)</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("CPU Cores", "cpuCores")} />
              <h3>CPU Cores</h3>
              <p>{deviceData.hardwareConcurrency}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Device Memory", "deviceMemory")} />
              <h3>Device Memory</h3>
              <p>{deviceData.deviceMemory}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Cookies Enabled", "cookiesEnabled")} />
              <h3>Cookies Enabled</h3>
              <p>{deviceData.cookieEnabled ? "Yes" : "No"}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Online Status", "onlineStatus")} />
              <h3>Online Status</h3>
              <p>{deviceData.onLine ? "Online" : "Offline"}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Do Not Track", "doNotTrack")} />
              <h3>Do Not Track</h3>
              <p>{deviceData.doNotTrack}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Webdriver", "webdriver")} />
              <h3>Webdriver</h3>
              <p>{deviceData.webdriver ? "Yes" : "No"}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Geolocation", "geolocation")} />
              <h3>Geolocation</h3>
              <p>{deviceData.geolocation ? "Available" : "N/A"}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Bluetooth API", "bluetooth")} />
              <h3>Bluetooth API</h3>
              <p>{deviceData.bluetoothAvailable ? "Available" : "N/A"}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("MIDI API", "midi")} />
              <h3>MIDI API</h3>
              <p>{deviceData.midiAvailable ? "Available" : "N/A"}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("USB API", "usb")} />
              <h3>USB API</h3>
              <p>{deviceData.usbAvailable ? "Available" : "N/A"}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Clipboard API", "clipboard")} />
              <h3>Clipboard API</h3>
              <p>{deviceData.clipboardApi ? "Available" : "N/A"}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("Fullscreen API", "fullscreen")} />
              <h3>Fullscreen API</h3>
              <p>{deviceData.fullscreenApi ? "Available" : "N/A"}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("WebGL Vendor", "webglVendor")} />
              <h3>WebGL Vendor</h3>
              <p className="mono">{deviceData.webglVendor}</p>
            </div>
            <div className="info-card">
              <InfoButton onClick={() => openModal("WebGL Renderer", "webglRenderer")} />
              <h3>WebGL Renderer</h3>
              <p className="mono">{deviceData.webglRenderer}</p>
            </div>
            {deviceData.batteryAvailable && deviceData.level && (
              <>
                <div className="info-card">
                  <InfoButton onClick={() => openModal("Battery Level", "batteryLevel")} />
                  <h3>Battery Level</h3>
                  <p>{deviceData.level}</p>
                </div>
                <div className="info-card">
                  <InfoButton onClick={() => openModal("Charging", "charging")} />
                  <h3>Charging</h3>
                  <p>{deviceData.charging === true ? "Yes" : "No"}</p>
                </div>
              </>
            )}
            {deviceData.connectionAvailable && deviceData.effectiveType && (
              <>
                <div className="info-card">
                  <InfoButton onClick={() => openModal("Connection Type", "connectionType")} />
                  <h3>Connection Type</h3>
                  <p>{deviceData.effectiveType}</p>
                </div>
                <div className="info-card">
                  <InfoButton onClick={() => openModal("Downlink Speed", "downlink")} />
                  <h3>Downlink Speed</h3>
                  <p>{deviceData.downlink}</p>
                </div>
                <div className="info-card">
                  <InfoButton onClick={() => openModal("RTT", "rtt")} />
                  <h3>RTT</h3>
                  <p>{deviceData.rtt}</p>
                </div>
              </>
            )}
            {locationSource === "DEVICE" && (
              <>
                <div className="info-card" style={{ gridColumn: "span 2" }}>
                  <InfoButton onClick={() => openModal("GPS Accuracy", "gpsAccuracy")} />
                  <h3>GPS Accuracy</h3>
                  <p>{geodata.accuracy ? `±${geodata.accuracy.toFixed(0)} meters` : "N/A"}</p>
                </div>
                {geodata.altitude !== null && (
                  <div className="info-card">
                    <InfoButton onClick={() => openModal("Altitude", "altitude")} />
                    <h3>Altitude</h3>
                    <p>{geodata.altitude.toFixed(1)} m</p>
                  </div>
                )}
                {geodata.heading !== null && (
                  <div className="info-card">
                    <InfoButton onClick={() => openModal("Heading", "heading")} />
                    <h3>Heading</h3>
                    <p>{geodata.heading !== null ? `${geodata.heading.toFixed(1)}°` : "N/A"}</p>
                  </div>
                )}
                {geodata.speed !== null && (
                  <div className="info-card">
                    <InfoButton onClick={() => openModal("Speed", "speed")} />
                    <h3>Speed</h3>
                    <p>{geodata.speed !== null ? `${(geodata.speed * 3.6).toFixed(1)} km/h` : "N/A"}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}