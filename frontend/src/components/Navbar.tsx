import React from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <h1 className="logo">CourseFlow</h1>

      {/* ✅ Correct navigation (NO href="") */}
      <Link to="/login">
        <button className="login-btn">Admin Login</button>
      </Link>
    </div>
  );
};

export default Navbar;