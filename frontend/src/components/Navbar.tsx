import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <h1 className="logo">CourseFlow</h1>

      <div className="nav-links">
        {/* 🔹 Always visible */}
        <Link to="/courses">Courses</Link>

        {/* 🔹 Only SuperAdmin */}
        {user?.role === "superadmin" && (
          <Link to="/adminpanel">Admin Panel</Link>
        )}

        {/* 🔹 If NOT logged in */}
        {!user ? (
          <Link to="/login">
            <button className="login-btn">Admin Login</button>
          </Link>
        ) : (
          <>
            {/* 🔹 Show role */}
            <span className="role-badge">{user.role}</span>

            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;