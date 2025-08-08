import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const path = location.pathname.toLowerCase();

  // if (!token && path !== "/login" && path !== "/create-user") {
  //   navigate("/login");
  // }
  // ✅ Redirect if token not found (side effect)
  useEffect(() => {
    if (!token && path !== "/login" && path !== "/create-user") {
      navigate("/login");
    }
  }, [token, path, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <ul>
          {token ? (
            <>
              <li>
                <Link to="/" className="Link">
                  Users
                </Link>
              </li>
              <li>
                <Link to="/course-list" className="Link">
                  Course
                </Link>
              </li>
              <li>
                <Link to="/enrollment-list" className="Link">
                  Enrollment
                </Link>
              </li>
              <li>
                <Link to="/lesson-list" className="Link">
                  Lesson
                </Link>
              </li>
              <li>
                <Link onClick={handleLogout} className="Link">
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="Link">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/create-user" className="Link">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </div>
  );
};
