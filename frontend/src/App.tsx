import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AdminPanel from "./pages/AdminPanel";
import CoursesPage from "./pages/CoursesPage";
import PublicCourses from "./pages/PublicCourses";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar /> 
        <PublicCourses />
      </>
    ),
  },
  {
    path: "/login",
    element: (
      <>
        <Navbar /> 
        <Login />
      </>
    ),
  },
  {
    path: "/courses",
    element: (
      <ProtectedRoute>
        <>
          <Navbar /> 
          <CoursesPage />
        </>
      </ProtectedRoute>
    ),
  },
  {
    path: "/adminpanel",
    element: (
      <ProtectedRoute adminOnly={true}>
        <>
          <Navbar />
          <AdminPanel />
        </>
      </ProtectedRoute>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;