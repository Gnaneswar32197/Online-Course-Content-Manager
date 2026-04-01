import { BrowserRouter, Routes, Route } from "react-router-dom";
import PublicCourses from "./pages/PublicCourses";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicCourses />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;