

import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Symptoms from "./components/symtoms/Symptoms";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const location = useLocation();

  // Hide Navbar on Login and Signup routes
  const pathsWithoutNavbar = new Set(["/login", "/signup"]);
  const normalizedPathname = location.pathname.endsWith("/")
    ? location.pathname.slice(0, -1)
    : location.pathname;
  const hideNavbar = pathsWithoutNavbar.has(normalizedPathname.toLowerCase());

  return (
    <div className="flex flex-col min-h-screen font-inter">
      {/* Show Navbar conditionally */}
      {!hideNavbar && <Navbar />}

      <div className={`flex-grow flex flex-col ${!hideNavbar ? "" : ""}`}>
        <Routes>
          {/* Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/report" element={<Symptoms />} />
        </Routes>
      </div>
    </div>
  );

}
export default App;
