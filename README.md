# System Surveillance (uatsmaipi)

A modern, React-based IP tracking dashboard with a cyber surveillance aesthetic. This application provides real-time network scanning and geolocation data.

![Eyes](./src/assets/Grid_Eyes.gif)

## 📡 Live Demo
[uatsmaipi](https://fredegd.github.io/uatsmaipi/)

## 🚀 Features
- **Real-time IP Detection**: Automatically identifies the user's public IP address.
- **Detailed Geolocation**: Displays city, region, country, and precise coordinates (Lat/Lng).
- **Global Context**: Integrates national flags and timezone information.
- **Interactive Map**: Visualizes the location using an interactive Leaflet map.
- **Cyber Aesthetic**: Features a dark-themed, premium UI with scanning animations and monospace typography.

## 🛠️ Tech Stack
- **Frontend**: [React](https://reactjs.org/) (Hooks, State Management)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Mapping**: [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Styling**: Vanilla CSS with a focus on modern, responsive design.

## 🔑 APIs
- [IPify](https://www.ipify.org/): Geolocation API for IP-to-location data.
- [REST Countries](https://restcountries.com/): Metadata API for country flags and localized names.

## 🛠️ Development

### Commands
- `npm run dev`: Start local development server.
- `npm run build`: Build for production.
- `npm run deploy`: Deploy to GitHub Pages.