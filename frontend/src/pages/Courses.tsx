import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/courses.css";

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  instructor: string;
  duration: string;
  level: string;
  status: "Published" | "Draft";
  createdBy: string;
}

const Courses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Web Dev",
    instructor: "",
    duration: "",
    level: "Beginner",
    status: "Draft",
  });

  const fetchCourses = async () => {
    const res = await api.get("/courses");
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addCourse = async () => {
    await api.post("/courses", form);
    setShowModal(false);
    fetchCourses();
  };

  const toggleStatus = async (id: number) => {
    await api.patch(`/courses/${id}/status`);
    fetchCourses();
  };

  const deleteCourse = async (id: number) => {
    await api.delete(`/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Course Management</h1>
        <button onClick={() => setShowModal(true)}>+ Add Course</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Instructor</th>
            <th>Duration</th>
            <th>Level</th>
            <th>Status</th>
            <th>Created By</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map((c) => (
            <tr key={c.id}>
              <td>{c.title}</td>
              <td>{c.category}</td>
              <td>{c.instructor}</td>
              <td>{c.duration}</td>
              <td>{c.level}</td>
              <td>{c.status}</td>
              <td>{c.createdBy}</td>

              <td>
                <button onClick={() => toggleStatus(c.id)}>
                  {c.status === "Published"
                    ? "Unpublish"
                    : "Publish"}
                </button>

                <button onClick={() => deleteCourse(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h2>Add Course</h2>

            <input name="title" placeholder="Title" onChange={handleChange} />
            <textarea name="description" placeholder="Description" onChange={handleChange} />

            <select name="category" onChange={handleChange}>
              <option>Web Dev</option>
              <option>Data Science</option>
              <option>Design</option>
            </select>

            <select name="level" onChange={handleChange}>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <input name="instructor" placeholder="Instructor" onChange={handleChange} />
            <input name="duration" placeholder="Duration" onChange={handleChange} />

            <select name="status" onChange={handleChange}>
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>

            <button onClick={addCourse}>Add</button>
            <button onClick={() => setShowModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;