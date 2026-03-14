import MyIpMap from "./MyIpMap";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
export default function IpDetails({ geodata, position, ipAddress, allData }) {
  return (
    <div className="details-wrapper">
      <Tabs>
        <TabList>
          <Tab>GEOGRAPHIC POSITION</Tab>
          <Tab>NETWORK METRICS</Tab>
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
              <h3>Assigned IP</h3>
              <p className="accent-text">{ipAddress}</p>
            </div>
            <div className="info-card">
              <h3>Service Provider</h3>
              <p>{allData.isp}</p>
            </div>
            <div className="info-card">
              <h3>Network Domain</h3>
              <p className="mono">{allData.as?.domain || "N/A"}</p>
            </div>
            <div className="info-card">
              <h3>Routing Info</h3>
              <p className="mono">{allData.as?.name || "N/A"}</p>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
