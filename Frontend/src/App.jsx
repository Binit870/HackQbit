// src/App.jsx
import React from "react";
import Report from "./pages/Report"; // Make sure Report.jsx is in src/components/

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-cyan-900 to-blue-900 font-inter">
      <Report />
    </div>
  );
}

export default App;
