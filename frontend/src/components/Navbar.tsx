import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/publicCourses.css";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h1 className="logo">CourseFlow</h1>
      <button className="login-btn">Admin Login</button>
    </div>
  );
};

export default Navbar;