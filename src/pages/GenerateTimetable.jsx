import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Header from "../components/Header";
import {
  formContainer,
  inputContainer,
  sectionBorder,
  sectionContainer,
} from "../sharedStyles/Form";
import { useForm } from "react-hook-form";

const API_URL = "http://localhost:8181";

const GenerateTimetable = () => {
  const [weekStart, setWeekStart] = useState("");
  const [weekEnd, setWeekEnd] = useState("");
  const [message, setMessage] = useState("");
  const { reset } = useForm();

  const handleGenerateTimetable = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    const token = Cookies.get("authToken");

    try {
      const res = await axios.post(
        `${API_URL}/leaderDashboard/generate`, // URL for generating the timetable
        { weekStart, weekEnd }, // Send the start and end date in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token for authorization
          },
        }
      );

      setMessage(res.data.message || "Timetable generated successfully");
      alert(res.data.message);
      reset();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error generating timetable");
    }
  };

  return (
    <div>
      <Header />
      <div style={sectionContainer}>
        <section style={sectionBorder}>
          <h2 style={{ marginBottom: "1rem" }}>Generate Timetable</h2>
          <form onSubmit={handleGenerateTimetable} style={formContainer}>
            <div style={inputContainer}>
              <label>Week Start Date:</label>
              <input
                type="date"
                value={weekStart}
                onChange={(e) => setWeekStart(e.target.value)}
                required
              />
            </div>
            <div style={inputContainer}>
              <label>Week End Date:</label>
              <input
                type="date"
                value={weekEnd}
                onChange={(e) => setWeekEnd(e.target.value)}
                required
              />
            </div>
            <button className="primary-purple" type="submit">
              Generate Timetable
            </button>
          </form>

          {/* Display success or error message */}
          {message && <p>{message}</p>}
        </section>
      </div>
    </div>
  );
};

export default GenerateTimetable;
