import React, { useState, useEffect } from "react";
import "./login.css";
import bootstrapLogo from "../../assets/svg/bootstrap-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8081/auth")
      .then((response) => {
        console.log(response.data);
        if (response.data.role) {
          const role = response.data.role;
          switch (role) {
            case "admin":
              navigate("/admin/dashboard");
              break;
            case "client":
              navigate("/home");
              break;
            default:
              navigate("/");
              break;
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };
    await axios
      .post("http://localhost:8081/auth/login", loginData)
      .then((response) => {
        alert("Logged in successfully!");
        if (response.data.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/home");
        }
      })
      .catch((error) => alert(error));
  };
  return (
    <>
      <div className="d-flex justify-content-center align-items-center py-4 bg-body-tertiary vh-100">
        <div className="form-signin w-100 m-auto text-center">
          <form onSubmit={handleLogin}>
            <img className="mb-4" src={bootstrapLogo} alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Please Login!</h1>

            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <div className="form-check text-start my-3">
              <input
                className="form-check-input"
                type="checkbox"
                value="remember-me"
                id="flexCheckDefault"
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Remember me
              </label>
            </div>
            <button className="btn btn-primary w-100 py-2" type="submit">
              Login
            </button>
            <div>
              Don't have an account? <Link to="/register">Register</Link>
            </div>
            <p className="mt-5 mb-3 text-body-secondary">&copy; 2023 JustChill Inc.</p>
          </form>
        </div>
      </div>
    </>
  );
}
