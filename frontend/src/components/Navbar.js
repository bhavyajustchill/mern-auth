import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    if (!user.role) {
      axios
        .get("http://localhost:8081/auth")
        .then((response) => {
          console.log(response.data);
          setIsLoggedOut(false);
          if (response.data.role) {
            setUser(response.data);
            setUserName(response.data.name.name);
            if (response.data.role === "admin") {
              if (!location.pathname.includes("/admin")) {
                navigate("/admin/dashboard");
              }
            } else {
              if (location.pathname.includes("/admin") || location.pathname === "/") {
                navigate("/home");
              }
            }
          }
        })
        .catch((err) => {
          console.log(err);
          if (location.pathname !== "/" && location.pathname !== "/register") {
            navigate("/login");
          }
        });
    }
  }, [location.pathname, user, isLoggedOut]);

  const handleLogout = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:8081/auth/logout").then(async (response) => {
      await setUser({});
      setIsLoggedOut(true);
      alert("Logged out successfully!");
      navigate("/login");
    });
  };
  return (
    <>
      {location.pathname !== "/login" && location.pathname !== "/register" ? (
        <div>
          <nav className="navbar navbar-expand-lg bg-dark navbar-dark text-light">
            <div className="container-fluid">
              <Link to="/" className="navbar-brand">
                Application Name
              </Link>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {user.role === "admin" ? (
                    <li className="nav-item">
                      <Link to="/admin/dashboard" className="nav-link" aria-current="page">
                        Dashboard
                      </Link>
                    </li>
                  ) : null}
                  {user.role === "client" ? (
                    <li>
                      <Link to="/home" className="nav-link" aria-current="page">
                        Home
                      </Link>
                    </li>
                  ) : null}
                  <li className="nav-item">
                    <a href="#" className="nav-link" aria-current="page">
                      Link 1
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="#" className="nav-link" aria-current="page">
                      Link 2
                    </a>
                  </li>
                </ul>
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-dark dropdown-toggle"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false">
                    <i className="bi bi-person-fill" style={{ fontSize: "1.25rem" }}></i>
                    {user.email ? ` ${userName} ` : null}
                  </button>
                  <ul className="dropdown-menu dropdown-menu-lg-end">
                    {user.email ? (
                      <>
                        <li>
                          <a className="dropdown-item" href="#">
                            Profile
                          </a>
                        </li>
                        <li>
                          <button className="dropdown-item" type="button" onClick={handleLogout}>
                            Logout
                          </button>
                        </li>
                      </>
                    ) : (
                      <>
                        <li>
                          <Link to="/login" className="dropdown-item">
                            Login
                          </Link>
                        </li>
                        <li>
                          <Link to="/register" className="dropdown-item">
                            Register
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </nav>
        </div>
      ) : null}
    </>
  );
}
