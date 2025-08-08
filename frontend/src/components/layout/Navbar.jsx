import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const handleLogout = () => {};

  return (
    <div>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/" className="Link">Users</Link>
          </li>
          <li>
            <Link to="/course-list" className="Link">Course</Link>
          </li>
          <li>
            <Link to="/enrollment-list" className="Link">Enrollment</Link>
          </li>
          <li>
            <Link to="/lesson-list" className="Link">Lesson</Link>
          </li>
          <li>
            <Link onClick={handleLogout} className="Link">Logout</Link>
          </li>
          <li>
            <Link to="/login" className="Link">Login</Link>
          </li>
          <li>
            <Link to="/register" className="Link">Register</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
