import React, { useState, useEffect } from "react";
import bootstrapLogo from "../../assets/svg/bootstrap-logo.svg";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    const registerData = {
      name: name,
      email: email,
      password: password,
    };
    await axios
      .post("http://localhost:8081/auth/register", registerData)
      .then((response) => {
        alert("Registered successfully!");
        navigate("/login");
      })
      .catch((error) => alert(error));
  };
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
  return (
    <>
      <div className="d-flex justify-content-center align-items-center py-4 bg-body-tertiary vh-100">
        <div className="form-signin w-100 m-auto text-center">
          <form onSubmit={handleRegister}>
            <img className="mb-4" src={bootstrapLogo} alt="" width="72" height="57" />
            <h1 className="h3 mb-3 fw-normal">Registration Form</h1>
            <div className="form-floating">
              <input
                type="text"
                className="form-control"
                id="floatingInputName"
                placeholder="Ex. Bhavya Popat"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="floatingInputName">Name</label>
            </div>
            <div className="form-floating">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="Ex. bhavya@gmail.com"
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
            <button className="btn btn-primary w-100 py-2" type="submit">
              Register
            </button>
            <div>
              Already have an account? <Link to="/login">Login</Link>
            </div>
            <p className="mt-5 mb-3 text-body-secondary">&copy; 2023 JustChill Inc.</p>
          </form>
        </div>
      </div>
    </>
  );
}
