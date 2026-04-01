import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicCourses from "./pages/PublicCourses";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicCourses />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;