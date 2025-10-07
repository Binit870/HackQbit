import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Symptoms from "./components/symptoms/Symptoms";
import Navbar from "./components/Navbar/Navbar";
import HealthMonitor from "./pages/HealthMonitor";
import Report from "./pages/Report";
import Community from "./components/Community/Community"
function App() {
  const location = useLocation();

  // Hide Navbar on Login and Signup routes"
  const pathsWithoutNavbar = new Set(["/login", "/signup"]);
  const normalizedPathname = location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname;
  const hideNavbar = pathsWithoutNavbar.has(normalizedPathname.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen font-inter">
      {/* Show Navbar conditionally */}
      {!hideNavbar && <Navbar />}

      <div className={`flex-grow flex flex-col ${!hideNavbar ? "" : ""}`}/>
        <Routes>
          {/* Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/healthmonitor" element={<HealthMonitor />} /> {/* ✅ Added new route */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/report" element={<Report />} />
          <Route path="/symptom" element={<Symptoms/>}/>
          <Route path="/community" element={<Community/>}/>
        </Routes>
      </div>
    // </div>
  );
}


export default App;