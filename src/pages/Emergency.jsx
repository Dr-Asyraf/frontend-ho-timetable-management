import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import Header from "../components/Header";
import {
  inputContainer,
  sectionBorder,
  sectionContainer,
} from "../sharedStyles/Form";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:8181";

const Emergency = () => {
  const [shiftId, setShiftId] = useState("");
  const [reason, setReason] = useState("");
  const [suggestedReplacement, setSuggestedReplacement] = useState(null);
  const navigate = useNavigate();

  function handleNavigateToEmergencySuggestions() {
    navigate("/leaderDashboard/emergency/suggestions");
  }

  const handleMarkAbsent = async () => {
    const token = Cookies.get("authToken");
    try {
      const res = await axios.post(
        `${API_URL}/leaderDashboard/emergency/absent`,
        {
          shiftId,
          reason,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      setSuggestedReplacement(res.data.replacement);
    } catch (error) {
      console.error("Error marking HO absent", error);
    }
  };

  return (
    <div>
      <Header />
      <div style={sectionContainer}>
        <section style={sectionBorder}>
          <h2 style={{ marginBottom: "1rem" }}>Mark HO Absent</h2>
          <input
            style={inputContainer}
            type="text"
            placeholder="Shift ID"
            value={shiftId}
            onChange={(e) => setShiftId(e.target.value)}
          />
          <input
            style={inputContainer}
            type="text"
            placeholder="Reason for Absence"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
          <button
            style={{ marginTop: "1rem" }}
            className="primary-purple"
            onClick={handleMarkAbsent}
          >
            Submit
          </button>

          {suggestedReplacement && (
            <div>
              <h4 style={{ marginTop: "1.5rem" }}>Suggested Replacement:</h4>
              <p>User ID: {suggestedReplacement.user_id}</p>
              <p>Username: {suggestedReplacement.username}</p>
              <button
                className="primary-yellow"
                style={{ padding: "0.7rem", marginTop: "1rem" }}
                onClick={handleNavigateToEmergencySuggestions}
              >
                Confirm Replacement
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Emergency;
