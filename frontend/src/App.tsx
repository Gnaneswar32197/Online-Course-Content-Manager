import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h2 style={{ color: "white" }}>Home Page</h2>} />
        <Route path="/admin" element={<h2>Admin Dashboard</h2>} />
        <Route path="/superadmin" element={<h2>SuperAdmin Dashboard</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;