import { Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import {
  formContainer,
  inputContainer,
  sectionBorder,
  sectionContainer,
} from "../sharedStyles/Form";
import { useForm } from "react-hook-form";
import { postApi } from "../utils/api";
import Cookies from "js-cookie";

const API_URL = "http://localhost:8181";

function Login() {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  async function loginApi(data) {
    try {
      const res = await postApi(`${API_URL}/login`, data);
      if (!res.ok) {
        const serverError = await res.json();
        alert(serverError.error);
        throw new Error(serverError);
      }
      const resData = await res.json();
      const token = resData.token;
      console.log(token);
      alert("User logged in successfully");
      navigate("/timetables/week");

      // save the token in cookie using js-cookie
      Cookies.set("authToken", token);
      reset();
    } catch (error) {
      console.error("Error at loginApi");
    }
  }

  function onSubmit(data) {
    loginApi(data);
  }
  return (
    <div>
      <Header />
      <div style={sectionContainer}>
        <section style={sectionBorder}>
          <h1 style={{ marginBottom: "1rem" }}>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)} style={formContainer}>
            <div style={inputContainer}>
              <label htmlFor="username">Username</label>
              <input {...register("username")} type="text" />
            </div>
            <div style={inputContainer}>
              <label htmlFor="password">Password</label>
              <input {...register("password")} type="password" />
            </div>
            <div>
              <button className="primary-purple" type="submit">
                Login
              </button>
              <span>
                {" "}
                or{" "}
                <Link to="/register" className="primary-black">
                  Register
                </Link>
              </span>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Login;
