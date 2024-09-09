import Header from "../components/Header";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "https://backend-ho-timetable-management.onrender.com";

const HoDashboard = () => {
  const [shifts, setShifts] = useState([]);
  const navigate = useNavigate();

  const [role, setRole] = useState("");

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) {
      const decodedToken = jwtDecode(token); // Decode the token to get the role
      setRole(decodedToken.role); // Set the role in state
    }
  }, []); // This effect runs only once, when the component mounts

  function handleNavigateToLeaderDashboard() {
    navigate("/leaderDashboard");
  }

  function handleNavigateToGenerate() {
    navigate("/leaderDashboard/generate");
  }

  function handleNavigateToEmergency() {
    navigate("/leaderDashboard/emergency/absent");
  }

  useEffect(() => {
    const fetchShifts = async () => {
      const token = Cookies.get("authToken");
      const res = await axios.get(`${API_URL}/timetables/week`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShifts(res.data);
    };

    fetchShifts();
  }, []);

  return (
    <div>
      <Header />
      {role === "Leader" ? (
        <div>
          <button
            className="primary-blue"
            style={{ padding: "1rem", margin: "2rem" }}
            onClick={handleNavigateToLeaderDashboard}
          >
            Leader Dashboard
          </button>
          <button
            className="primary-green"
            style={{ padding: "1rem", margin: "2rem" }}
            onClick={handleNavigateToGenerate}
          >
            Generate Timetable
          </button>
          <button
            className="primary-red"
            style={{ padding: "1rem", margin: "2rem" }}
            onClick={handleNavigateToEmergency}
          >
            Emergency
          </button>
        </div>
      ) : null}

      <div style={{ padding: "2rem" }}>
        <h2 style={{ marginBottom: "1.5rem" }}>Your Shifts for the Week</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Shift</th>
              <th>Ward</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift.shift_id}>
                <td>{shift.date}</td>
                <td>{shift.shift_type}</td>
                <td>{shift.ward_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HoDashboard;
