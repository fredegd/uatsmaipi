import React from 'react'
import MyIpMap from "./MyIpMap"
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
export default function IpDetails({geodata, position, ipAddress, allData}) {
    console.log(geodata, position, ipAddress, allData)
  return (
    <div><Tabs>
    <TabList>
      <Tab>Location</Tab>
      <Tab>IP Data</Tab>
    </TabList>

    <TabPanel>
      <h2>{geodata.city}</h2>
      <MyIpMap position={position} />
    </TabPanel>

    <TabPanel>
      <div className="details">
        <div className="detailItem">
      <h2>YOUR IP</h2>
      <p>{ipAddress}</p>
      </div>
        <div className="detailItem">
      <h2>YOUR ISP </h2>
      <p>{allData.isp}</p>
      </div>
        <div className="detailItem">
      <h2>Domain: </h2>
      <p>{allData.as.domain}</p>
      </div>
      </div>
    </TabPanel>
  </Tabs></div>
  )
}
