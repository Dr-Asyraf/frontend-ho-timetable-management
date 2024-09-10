import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import LeaderDashboard from "./pages/LeaderDashboard";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import Login from "./pages/Login";
import HoDashboard from "./pages/HoDashboard";
import Cookie from "js-cookie";
import Emergency from "./pages/Emergency";
import ConfirmReplacement from "./pages/EmergencySuggestions";
import GenerateTimetable from "./pages/GenerateTimetable";
import AddNewWard from "./pages/Ward";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoutes />}>
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/timetables/week" element={<PrivateRoutes />}>
          <Route index element={<HoDashboard />} />
        </Route>
        <Route path="/leaderDashboard" element={<LeaderRoutes />}>
          <Route index element={<LeaderDashboard />} />
          <Route path="/leaderDashboard/ward" element={<AddNewWard />} />
          <Route
            path="/leaderDashboard/emergency/absent"
            element={<Emergency />}
          />
          <Route
            path="/leaderDashboard/emergency/suggestions"
            element={<ConfirmReplacement />}
          />
          <Route
            path="/leaderDashboard/generate"
            element={<GenerateTimetable />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function PublicRoutes() {
  const location = useLocation();
  const pathname = location.pathname;
  const selectedRoutes = ["/login", "/register"];
  const isRouteSelected = selectedRoutes.includes(pathname);
  const authToken = Cookie.get("authToken");

  // if authToken is present, means user is logged in then redirect to dashboard
  if (authToken && isRouteSelected) {
    return <Navigate to="/timetables/week" />;
  }
  return <Outlet />;
}

function PrivateRoutes() {
  const authToken = Cookie.get("authToken");
  if (!authToken) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

function LeaderRoutes() {
  const authToken = Cookie.get("authToken");
  if (!authToken) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}

export default AppRoutes;
