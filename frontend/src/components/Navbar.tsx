import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

useEffect(() => {
  const storedUser = localStorage.getItem("user");

  if (storedUser && storedUser !== "undefined") {
    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Invalid JSON:", err);
      localStorage.removeItem("user");
    }
  }
}, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <div className="navbar">
      <h1 className="logo">CourseFlow</h1>

      <div className="nav-links">
        
        {user && <Link to="/courses">Courses</Link>}

        
        {user?.role === "superadmin" && (
          <Link to="/adminpanel">Admin Panel</Link>
        )}

      
        {!user ? (
          <Link to="/login">
            <button className="login-btn">Admin Login</button>
          </Link>
        ) : (
          <>
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