import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import Header from "../components/Header";
import {
  inputContainer,
  sectionBorder,
  sectionContainer,
} from "../sharedStyles/Form";

const API_URL = "https://backend-ho-timetable-management.onrender.com";

const ConfirmReplacement = () => {
  const [shiftId, setShiftId] = useState("");
  const [replacementUserId, setReplacementUserId] = useState("");

  const handleConfirmReplacement = async () => {
    const token = Cookies.get("authToken");
    try {
      await axios.put(
        `${API_URL}/leaderDashboard/emergency/suggestions`,
        {
          shiftId,
          replacementUserId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );
      alert("Replacement confirmed");
    } catch (error) {
      console.error("Error confirming replacement", error);
    }
  };

  return (
    <div>
      <Header />
      <div style={sectionContainer}>
        <section style={sectionBorder}>
          <h2 style={{ marginBottom: "1rem" }}>Confirm Replacement</h2>
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
            placeholder="Replacement User ID"
            value={replacementUserId}
            onChange={(e) => setReplacementUserId(e.target.value)}
          />
          <button
            style={{ marginTop: "1rem" }}
            className="primary-red"
            onClick={handleConfirmReplacement}
          >
            Confirm
          </button>
        </section>
      </div>
    </div>
  );
};

export default ConfirmReplacement;
