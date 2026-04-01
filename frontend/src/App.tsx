import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Demo credentials
  const demoEmail = "admin@gmail.com";
  const demoPassword = "123456";

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    if (email === demoEmail && password === demoPassword) {
      setMessage("Login Successful ✅");
    } else {
      setMessage("Invalid Credentials ❌");
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
        />

        <label>Password</label>
        <input
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Sign In</button>

        <p>{message}</p>
      </form>
    </div>
  );
}

export default App;