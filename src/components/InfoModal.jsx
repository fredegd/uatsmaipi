import { useState } from "react";

const infoContent = {
  ipAddress: {
    title: "IP Address",
    description: "A unique numerical identifier assigned to each device connected to a computer network. It serves as the primary method for locating and communicating with devices on the internet.",
    facts: [
      "IPv4 addresses are 32-bit numbers (e.g., 192.168.1.1) while IPv6 are 128-bit",
      "Your public IP can reveal your approximate geographic location",
      "Websites can use your IP address to track your online activity",
      "VPNs can mask your real IP address for privacy"
    ]
  },
  currentLocation: {
    title: "Current Location",
    description: "Your geographic position determined through IP geolocation or GPS coordinates. This data can be obtained through various methods including GPS, Wi-Fi positioning, or IP-based location services.",
    facts: [
      "IP-based location can be inaccurate by dozens to hundreds of miles",
      "Mobile devices can provide highly accurate GPS coordinates",
      "Location data is often used for targeted advertising",
      "Many apps request location access even when not needed"
    ]
  },
  coordinates: {
    title: "Precise Coordinates",
    description: "Exact geographic coordinates (latitude and longitude) that pinpoint a specific location on Earth's surface.",
    facts: [
      "GPS can pinpoint location within a few meters",
      "Coordinates can be used to locate addresses via reverse geocoding",
      "Many devices store location history which can be privacy risk",
      "Even metadata in photos can reveal coordinates"
    ]
  },
  geolocation: {
    title: "Geolocation API",
    description: "A browser API that provides the device's geographic position using GPS, WiFi, or cellular network.",
    facts: [
      "Requires user permission to access",
      "Can be very accurate (few meters) with GPS",
      "Can reveal your exact location to websites",
      "Battery drain increases when location is active"
    ]
  },
  timezone: {
    title: "Timezone",
    description: "A region of the Earth that has the same standard time. Timezones are typically based on the Earth's rotation and political boundaries.",
    facts: [
      "Timezone information can help identify your approximate location",
      "System timezone can be manipulated to bypass geo-restrictions",
      "Incorrect timezone settings can leak your real location",
      "Unix timestamps are timezone-independent"
    ]
  },
  assignedIP: {
    title: "Assigned IP",
    description: "The IP address assigned to your device by your network or ISP.",
    facts: [
      "Dynamic IPs change periodically, static IPs remain constant",
      "IPv4 addresses are running out, driving IPv6 adoption",
      "Your ISP knows all your IP addresses over time"
    ]
  },
  serviceProvider: {
    title: "Service Provider",
    description: "Your Internet Service Provider (ISP) - the company that provides your internet connection.",
    facts: [
      "ISPs can see all your unencrypted internet traffic",
      "In many countries, ISPs are required to retain user data",
      "ISPs can throttle bandwidth for certain activities",
      "Some ISPs sell user browsing data to advertisers"
    ]
  },
  networkDomain: {
    title: "Network Domain",
    description: "The autonomous system domain associated with your network, identifying the large network your ISP belongs to.",
    facts: [
      "AS numbers identify large network blocks",
      "Troubleshooting often involves analyzing AS paths",
      "BGP leaks can accidentally route traffic through wrong AS"
    ]
  },
  routingInfo: {
    title: "Routing Info",
    description: "The routing information (AS name) that describes how your network traffic is routed through the internet.",
    facts: [
      "Your traffic may pass through multiple AS systems",
      "Internet routing can be intercepted at any hop",
      "Some AS systems are known for poor routing practices"
    ]
  },
  userAgent: {
    title: "User Agent",
    description: "A string that identifies your browser and operating system to web servers. It contains details about your device, browser version, and system.",
    facts: [
      "User agent can be spoofed to appear as different device",
      "Fingerprinting uses user agent with other data to track you",
      "Some browsers send inordinate amount of identifying data",
      "User agent strings can reveal browser vulnerabilities"
    ]
  },
  platform: {
    title: "Platform",
    description: "The operating system platform your device is running.",
    facts: [
      "Platform information helps target exploits",
      "Different OS versions have different security patches",
      "Some websites serve different content per platform"
    ]
  },
  language: {
    title: "Language",
    description: "Your browser's primary language setting.",
    facts: [
      "Language preference can identify your nationality",
      "Accept-Language header reveals all preferred languages",
      "Can be used for fingerprinting even with VPN"
    ]
  },
  languages: {
    title: "Languages",
    description: "All languages your browser is configured to accept.",
    facts: [
      "The full language list is highly identifying",
      "Uncommon language combinations are very unique",
      "Order of languages matters for fingerprinting"
    ]
  },
  deviceTimezone: {
    title: "Timezone",
    description: "Your system's timezone setting.",
    facts: [
      "Timezone can reveal approximate real location",
      "Even with VPN, timezone may leak true location",
      "Many apps don't respect system timezone setting"
    ]
  },
  screenResolution: {
    title: "Screen Resolution",
    description: "The dimensions of your screen in pixels.",
    facts: [
      "Unusual resolutions make you more identifiable",
      "Screen size combined with resolution helps fingerprinting",
      "Bookmarks or windows can affect visible area"
    ]
  },
  colorDepth: {
    title: "Color Depth",
    description: "The number of bits used to indicate the color of a single pixel.",
    facts: [
      "Most devices use 24-bit color",
      "Some devices use 30-bit or higher for HDR"
    ]
  },
  pixelRatio: {
    title: "Pixel Ratio",
    description: "The ratio between physical pixels and CSS pixels on your device.",
    facts: [
      "High-DPI displays have pixel ratio > 1",
      "This helps create sharper text and images"
    ]
  },
  windowSize: {
    title: "Window Size",
    description: "The dimensions of your browser window.",
    facts: [
      "Window size varies with device and browser",
      "Can reveal if you're using multiple monitors",
      "Bookmarks bar affects available height"
    ]
  },
  touchSupport: {
    title: "Touch Support",
    description: "Whether your device supports touch input and how many touch points.",
    facts: [
      "Touch support helps identify device type",
      "Max touch points vary by device"
    ]
  },
  cpuCores: {
    title: "CPU Cores",
    description: "The number of logical processor cores available on your device.",
    facts: [
      "Hardware concurrency is used for fingerprinting",
      "Core count varies significantly between devices"
    ]
  },
  deviceMemory: {
    title: "Device Memory",
    description: "The approximate amount of RAM in your device.",
    facts: [
      "Only available in some browsers (Chrome-based)",
      "Values are rounded to nearest GB",
      "Helps narrow down device type"
    ]
  },
  cookiesEnabled: {
    title: "Cookies Enabled",
    description: "Whether your browser has cookies enabled.",
    facts: [
      "Cookies are used for session management",
      "Third-party cookies enable cross-site tracking",
      "Many sites don't work without cookies"
    ]
  },
  onlineStatus: {
    title: "Online Status",
    description: "Whether your device is currently connected to the internet.",
    facts: [
      "Online status can be tracked via JavaScript",
      "Can be used to determine when you're away",
      "Some sites abuse this for analytics"
    ]
  },
  doNotTrack: {
    title: "Do Not Track",
    description: "A browser setting that requests websites not to track your browsing behavior.",
    facts: [
      "Most websites ignore this setting",
      "Ironically, enabling it can make you more identifiable",
      "Not a legal requirement for websites to honor"
    ]
  },
  webdriver: {
    title: "Webdriver",
    description: "Whether your browser is being controlled by automated software.",
    facts: [
      "Used for testing and automation",
      "Fingerprinting can detect automated browsers",
      "Some sites block Selenium-controlled browsers"
    ]
  },
  bluetooth: {
    title: "Bluetooth API",
    description: "Whether your browser has access to Bluetooth functionality.",
    facts: [
      "Bluetooth can be used for proximity tracking",
      "Some websites use it to identify nearby devices",
      "Bluetooth has known security vulnerabilities"
    ]
  },
  midi: {
    title: "MIDI API",
    description: "Whether your browser supports MIDI (Musical Instrument Digital Interface).",
    facts: [
      "Rare API that can help fingerprinting",
      "Used for music production in browsers"
    ]
  },
  usb: {
    title: "USB API",
    description: "Whether your browser can access USB devices.",
    facts: [
      "Can enumerate connected USB devices",
      "USB device IDs can be very specific",
      "Used for hardware authentication"
    ]
  },
  clipboard: {
    title: "Clipboard API",
    description: "Whether your browser can access the system clipboard.",
    facts: [
      "Sites can read clipboard contents",
      "Often used for paste functionality",
      "Some sites read clipboard to track users"
    ]
  },
  fullscreen: {
    title: "Fullscreen API",
    description: "Whether your browser supports fullscreen mode.",
    facts: [
      "Used for video and games",
      "Can be used for UI spoofing attacks"
    ]
  },
  webglVendor: {
    title: "WebGL Vendor",
    description: "The graphics card manufacturer detected via WebGL.",
    facts: [
      "Very specific to your hardware",
      "Used heavily for browser fingerprinting",
      "Can reveal specific GPU model"
    ]
  },
  webglRenderer: {
    title: "WebGL Renderer",
    description: "The exact graphics card model detected via WebGL.",
    facts: [
      "Highly identifying when combined with other data",
      "Different drivers report different strings",
      "Can be spoofed but often breaks websites"
    ]
  },
  batteryLevel: {
    title: "Battery Level",
    description: "The current battery charge level of your device.",
    facts: [
      "Battery API is deprecated in many browsers due to privacy",
      "Can be used to track users across sessions",
      "Battery level can be used for timing attacks"
    ]
  },
  charging: {
    title: "Charging",
    description: "Whether your device is currently charging.",
    facts: [
      "Charging status can indicate user activity",
      "Combined with battery level can be tracking vector",
      "Not available in all browsers"
    ]
  },
  connectionType: {
    title: "Connection Type",
    description: "The type of network connection (4G, 3G, WiFi, etc.).",
    facts: [
      "Revealed via Network Information API",
      "Can indicate if user is on mobile network",
      "Bandwidth can be throttled by ISP"
    ]
  },
  downlink: {
    title: "Downlink Speed",
    description: "The estimated download speed of your connection.",
    facts: [
      "Varies significantly between connection types",
      "Can be used for bandwidth throttling decisions"
    ]
  },
  rtt: {
    title: "RTT (Round Trip Time)",
    description: "The estimated round-trip time for data to travel to the server and back.",
    facts: [
      "Lower RTT means faster connection",
      "Can reveal network congestion",
      "Used for adaptive streaming quality"
    ]
  },
  gpsAccuracy: {
    title: "GPS Accuracy",
    description: "The accuracy of GPS coordinates in meters.",
    facts: [
      "Modern GPS can be accurate within a few meters",
      "Assisted GPS uses cell towers for faster lock",
      "Indoor GPS is much less accurate"
    ]
  },
  altitude: {
    title: "Altitude",
    description: "The height above sea level if available from GPS.",
    facts: [
      "Barometric altimeters improve accuracy",
      "Can be used to determine building floor"
    ]
  },
  heading: {
    title: "Heading",
    description: "The direction the device is facing in degrees.",
    facts: [
      "Only available when device is moving",
      "Uses magnetometer for compass direction"
    ]
  },
  speed: {
    title: "Speed",
    description: "The current movement speed if available from GPS.",
    facts: [
      "Speed is only calculated when moving",
      "GPS speed is more accurate than phone speed sensors"
    ]
  }
};

export default function InfoModal({ isOpen, onClose, title, contentKey }) {
  if (!isOpen) return null;
  
  const content = infoContent[contentKey];
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>{content?.title || title}</h2>
        <p className="modal-description">{content?.description}</p>
        {content?.facts && (
          <div className="modal-facts">
            <h3>Security Facts</h3>
            <ul>
              {content.facts.map((fact, index) => (
                <li key={index}>{fact}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function InfoButton({ onClick }) {
  return (
    <button className="info-button" onClick={onClick} title="More information">
      i
    </button>
  );
}