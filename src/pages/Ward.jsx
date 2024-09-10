import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import Header from "../components/Header";
import {
  formContainer,
  inputContainer,
  sectionBorder,
  sectionContainer,
} from "../sharedStyles/Form";
import { useForm } from "react-hook-form";

const API_URL = "https://backend-ho-timetable-management.onrender.com";

const AddNewWard = () => {
  const [wardName, setWardName] = useState("");
  const [message, setMessage] = useState("");
  const { reset } = useForm();

  const handleAddNewWard = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page

    const token = Cookies.get("authToken");

    try {
      const res = await axios.post(
        `${API_URL}/leaderDashboard/ward`, // URL for generating the timetable
        { wardName }, // Send the start and end date in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token for authorization
          },
        }
      );

      setMessage(res.data.message || "New ward added successfully");
      alert(res.data.message);
      reset();
    } catch (error) {
      setMessage(error.response?.data?.message || "Error adding new ward");
    }
  };

  return (
    <div>
      <Header />
      <div style={sectionContainer}>
        <section style={sectionBorder}>
          <h2 style={{ marginBottom: "1rem" }}>Add new ward</h2>
          <form onSubmit={handleAddNewWard} style={formContainer}>
            <div style={inputContainer}>
              <label>New Ward Name:</label>
              <input
                type="text"
                value={wardName}
                onChange={(e) => setWardName(e.target.value)}
                required
              />
            </div>

            <button className="primary-purple" type="submit">
              Add New Ward
            </button>
          </form>

          {/* Display success or error message */}
          {message && <p>{message}</p>}
        </section>
      </div>
    </div>
  );
};

export default AddNewWard;
