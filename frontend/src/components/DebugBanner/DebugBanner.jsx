import React, { useEffect, useContext, useState } from "react";
import axios from "axios";
import { StoreContext } from "../../context/StoreContext";
import "./DebugBanner.css";

const DebugBanner = () => {
  const { url } = useContext(StoreContext);
  const [status, setStatus] = useState("Checking...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        console.log("Checking health at:", url + "/health");
        const response = await axios.get(url + "/health");
        if (response.data.status === "OK") {
          setStatus("Connected ✅");
        } else {
          setStatus("Invalid Response ⚠️");
        }
      } catch (err) {
        console.error("Health check failed:", err);
        setError(err.message);
        setStatus("Connection Failed ❌");
      }
    };

    if (url) checkHealth();
  }, [url]);

  if (status.includes("Connected")) return null; // Hide if working

  return (
    <div className="debug-banner">
      <p>
        <strong>Backend Status:</strong> {status} <br />
        <small>Target: {url}</small> <br />
        {error && <small className="error">Error: {error}</small>}
      </p>
    </div>
  );
};

export default DebugBanner;
