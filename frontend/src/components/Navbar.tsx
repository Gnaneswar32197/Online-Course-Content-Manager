import React from "react";
import "../styles/publicCourses.css";

const Navbar: React.FC = () => {
  return (
    <div className="navbar">
      <h1 className="logo">CourseFlow</h1>
      <button className="login-btn">Admin Login</button>
    </div>
  );
};

export default Navbar;