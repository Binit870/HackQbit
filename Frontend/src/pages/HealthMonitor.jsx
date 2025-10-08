// src/pages/HealthMonitor.jsx
import React, { useEffect, useState, useRef } from "react";
import Api from "../utils/Api"; // Import the Api utility

const ZERO_DATA = {
  heartRate: 0,
  temperature: 0,
  oxygenLevel: 0,
  timestamp: new Date().toISOString(),
};

const HealthMonitor = () => {
  const [data, setData] = useState(ZERO_DATA);
  const [monitoring, setMonitoring] = useState(false);
  const intervalRef = useRef(null); // avoid stale state issues

  const fetchHealthData = async () => {
    try {
      // Use the Api utility to make the GET request
      const res = await Api.get("/health/monitor");
      // Expect numeric values from backend
      if (res && res.data) setData(res.data);
    } catch (err) {
      console.error("Error fetching health data:", err);
      // keep showing previous data; you can show an error indicator if needed
    }
  };

  const startMonitoring = () => {
    if (monitoring) return; // already running
    setMonitoring(true);

    // Fetch immediately
    fetchHealthData();

    // Start interval (store id in ref)
    intervalRef.current = setInterval(fetchHealthData, 5000);
  };

  const stopMonitoring = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setMonitoring(false);
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="p-6 bg-gradient-to-br from-purple-700 to-green-900 text-white rounded-2xl shadow-lg w-full max-w-md mx-auto mt-10 text-center">
      <h2 className="text-2xl font-semibold mb-4">Health Monitoring</h2>

      {!monitoring ? (
        <button
          onClick={startMonitoring}
          className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Start Monitoring
        </button>
      ) : (
        <button
          onClick={stopMonitoring}
          className="bg-red-500 px-4 py-2 rounded-md hover:bg-red-600 transition"
        >
          Stop Monitoring
        </button>
      )}

      {/* Always show the grid (initially zeroes) */}
      <div className="mt-6 grid grid-cols-1 gap-4">
        <div className="p-4 bg-purple-800 rounded-lg shadow">
          <p className="text-lg font-semibold">Heart Rate</p>
          <p className="text-2xl">{data?.heartRate ?? 0} bpm</p>
        </div>
        <div className="p-4 bg-green-800 rounded-lg shadow">
          <p className="text-lg font-semibold">Temperature</p>
          <p className="text-2xl">{data?.temperature ?? 0} °C</p>
        </div>
        <div className="p-4 bg-blue-800 rounded-lg shadow">
          <p className="text-lg font-semibold">Oxygen Level</p>
          <p className="text-2xl">{data?.oxygenLevel ?? 0} %</p>
        </div>
        <div className="p-4 bg-gray-800 rounded-lg shadow">
          <p className="text-lg font-semibold">Last Update</p>
          <p>{new Date(data?.timestamp ?? new Date()).toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
};

export default HealthMonitor;