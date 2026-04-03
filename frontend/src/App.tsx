import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import AdminCourses from "./pages/AdminCourses";
import Courses from "./pages/Courses";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<h2 style={{ color: "white" }}>Home Page</h2>} />
        <Route path="/adminpanel" element={<AdminPanel />} />
        
        <Route path="/admincourses" element={<AdminCourses />} />
        <Route path="/Courses" element={<Courses />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;