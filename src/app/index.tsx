// pages/index.tsx
import React, { useState, useEffect } from "react";
import SimpleMap from "../components/WorldMap";

const IndexPage: React.FC = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data/minimal-map.json");
        const data = await response.json();
        setGeoJsonData(data);
      } catch (error) {
        console.error("Error fetching GeoJSON:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Simple Map</h1>
      {geoJsonData ? (
        <SimpleMap geoJson={geoJsonData} width={600} height={400} />
      ) : (
        <p>Loading map data...</p>
      )}
    </div>
  );
};

export default IndexPage;
