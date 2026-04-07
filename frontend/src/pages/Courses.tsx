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
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const addCourse = async () => {
    try {
      await api.post("/courses", {
        ...form,
        createdBy: "admin",
      });

      setForm({
        title: "",
        description: "",
        category: "Web Dev",
        instructor: "",
        duration: "",
        level: "Beginner",
        status: "Draft",
      });

      setShowModal(false);
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
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
    <div className="courses-page">
      <div className="container">

        {/* HEADER */}
        <div className="header">
          <h1>Course Management</h1>
          <button className="add-btn" onClick={() => setShowModal(true)}>
            + Add Course
          </button>
        </div>

        {/* TABLE */}
        <div className="table-container">
          <table className="course-table">
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
                  <td>{c.duration}h</td>
                  <td>{c.level}</td>

                  <td>
                    <span
                      className={
                        c.status === "Published"
                          ? "status-green"
                          : "status-yellow"
                      }
                    >
                      {c.status}
                    </span>
                  </td>

                  <td>{c.createdBy}</td>

                  <td className="actions">
                    <button
                      className="toggle-btn"
                      onClick={() => toggleStatus(c.id)}
                    >
                      {c.status === "Published" ? "Unpublish" : "Publish"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteCourse(c.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="modal" onClick={() => setShowModal(false)}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
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
              <input name="duration" placeholder="Duration (hours)" onChange={handleChange} />

              <select name="status" onChange={handleChange}>
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
              </select>

              <div className="modal-actions">
                <button onClick={addCourse}>Add</button>
                <button onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Courses;