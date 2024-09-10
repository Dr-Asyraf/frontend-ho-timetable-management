import { Link } from "react-router-dom";
import { useState } from "react";
import Header from "../components/Header";
import {
  formContainer,
  inputContainer,
  sectionBorder,
  sectionContainer,
} from "../sharedStyles/Form";
import { useForm } from "react-hook-form";
import { postApi } from "../utils/api";

const API_URL = "https://backend-ho-timetable-management.onrender.com";

function Register() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  async function registerApi(data) {
    setIsLoading(true);
    try {
      const res = await postApi(`${API_URL}/register`, data);
      if (!res.ok) {
        const serverError = await res.json();
        alert(serverError.error);
        throw new Error(serverError);
      }
      const resData = await res.json();
      console.log(resData);
      alert("User registered successfully");
      reset();
    } catch (error) {
      console.error("Error at registerApi");
    } finally {
      console.log("Register API completed");
      setIsLoading(false);
    }
  }

  function onSubmit(data) {
    registerApi(data);
  }
  return (
    <div>
      <Header />
      <div style={sectionContainer}>
        <section style={sectionBorder}>
          <h1 style={{ marginBottom: "1rem" }}>Register</h1>
          <form onSubmit={handleSubmit(onSubmit)} style={formContainer}>
            <div style={inputContainer}>
              <label htmlFor="username">Username</label>
              <input {...register("username")} type="text" />
            </div>
            <div style={inputContainer}>
              <label htmlFor="password">Password</label>
              <input {...register("password")} type="password" />
            </div>
            <div style={inputContainer}>
              <label htmlFor="role">Role</label>
              <input {...register("role")} type="text" />
            </div>
            <div style={inputContainer}>
              <label htmlFor="join_date">Join date</label>
              <input {...register("join_date")} type="date" />
            </div>
            <div>
              <button
                className="primary-purple"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Register"}
              </button>
              <span>
                {" "}
                or{" "}
                <Link to="/login" className="primary-black">
                  Login
                </Link>
              </span>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Register;
