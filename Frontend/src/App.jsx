import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Symptoms from "./components/symtoms/Symptoms";
import Navbar from "./components/Navbar/Navbar";
import ProtectedRoute from './components/ProtectedRoutes';
import HealthMonitor from "./pages/HealthMonitor";
import Report from "./pages/Report";
import Community from "./components/Community/Community"
import Consult from "./pages/Consultancy";
import ConsultChat from "./pages/ConsultChat";

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

      <div className={`flex-grow flex flex-col ${!hideNavbar ? "pt-16" : ""}`}>
        <Routes>
          {/* Pages */}
          <Route path="/" element={<Home />} />
   
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/healthmonitor"
            element={
              <ProtectedRoute>
                <HealthMonitor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/report"
            element={
              <ProtectedRoute>
                <Report />
              </ProtectedRoute>
            }
          />
          <Route
            path="/symptom"
            element={
              <ProtectedRoute>
                <Symptoms />
              </ProtectedRoute>
            }
          />
          <Route
            path="/community"
            element={
              <ProtectedRoute>
                <Community />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consult"
            element={
              <ProtectedRoute>
                <Consult />
              </ProtectedRoute>
            }
          />
          <Route
            path="/consult/chat/:doctorId"
            element={
              <ProtectedRoute>
                <ConsultChat />
              </ProtectedRoute>
            }
          />
          
        </Routes>
      </div>
     </div>
  );
}


export default App;
