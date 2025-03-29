// pages/index.tsx
import React, { useState, useEffect } from "react";

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
  
    </div>
  );
};

export default IndexPage;
