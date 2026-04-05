import React, { useState } from "react";
import axios from "axios";
import "../styles/Login.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.user.role);

      setMessage("Login Successful ✅");

      // ✅ role-based redirect
      if (res.data.user.role === "superadmin") {
        window.location.href = "/Courses";
      } else {
        window.location.href = "/Courses";
      }

    } catch (error: any) {
      setMessage(error.response?.data?.message || "Login Failed ❌");
    }
  };

  return (
    <div className="container">
      <h1 className="title">CourseFlow</h1>
      <p className="subtitle">Online Course Content Manager</p>

      <form className="card" onSubmit={handleLogin}>
        <h2>Sign In</h2>

        <label>Email Address</label>
        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign In</button>

        <p>{message}</p>
      </form>
    </div>
  );
};

export default Login;