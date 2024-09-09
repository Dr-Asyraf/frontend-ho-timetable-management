import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Cookies from "js-cookie";
import {
  inputContainer,
  sectionContainer,
  sectionStyle,
} from "../sharedStyles/Form";

const API_URL = "https://backend-ho-timetable-management.onrender.com";

const LeaderDashboard = () => {
  const [username, setUsername] = useState("");
  const [shifts, setShifts] = useState([]);

  const searchHOShifts = async () => {
    const token = Cookies.get("authToken");
    try {
      const res = await axios.get(`${API_URL}/ho-shifts/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setShifts(res.data); // Set the HO's shifts
    } catch (error) {
      console.error("Error fetching shifts", error);
      alert(error);
    }
  };

  const deleteShift = async (shiftId) => {
    if (window.confirm("Are you sure you want to delete this link?")) {
      const token = Cookies.get("authToken");
      try {
        await axios.delete(`${API_URL}/delete-shift/${shiftId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShifts(shifts.filter((shift) => shift.shift_id !== shiftId)); // Remove deleted shift from list
        alert("Shift deleted successfully");
      } catch (error) {
        console.error("Error deleting shift", error);
      }
    }
  };

  const editShift = async (shiftId) => {
    const token = Cookies.get("authToken");
    const newShiftType = prompt("Enter new shift type (AM, PM, Night, Off):");
    const newDate = prompt("Enter new date (YYYY-MM-DD):");
    const newWardId = prompt("Enter new ward ID:");
    try {
      await axios.put(
        `${API_URL}/edit-shift/${shiftId}`,
        {
          newShiftType,
          newDate,
          newWardId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Shift updated successfully");
      searchHOShifts(); // Refresh the shifts after editing
    } catch (error) {
      console.error("Error editing shift", error);
    }
  };

  return (
    <div>
      <Header />
      <div>
        <section style={{ padding: "2rem" }}>
          <h2 style={{ marginBottom: "1rem" }}>Search for HO Shifts</h2>
          <input
            style={inputContainer}
            type="text"
            placeholder="Enter HO Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            style={{ margin: "1rem 0rem" }}
            className="primary-purple"
            onClick={searchHOShifts}
          >
            Search
          </button>
          <div>
            <h2>Shifts for {username}</h2>
            {shifts.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Shift Type</th>
                    <th>Ward</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shifts.map((shift) => (
                    <tr key={shift.shift_id}>
                      <td>{shift.date}</td>
                      <td>{shift.shift_type}</td>
                      <td>{shift.ward_name}</td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          style={{ margin: "1rem" }}
                          className="primary-yellow"
                          onClick={() => editShift(shift.shift_id)}
                        >
                          Edit
                        </button>
                        <button
                          className="primary-red"
                          onClick={() => deleteShift(shift.shift_id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No shifts found for this user.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default LeaderDashboard;
