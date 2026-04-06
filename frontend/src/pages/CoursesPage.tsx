import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/course.css";

const CoursesPage: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [filtered, setFiltered] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const initialForm = {
    title: "",
    description: "",
    category: "Web Dev",
    level: "Beginner",
    instructor: "",
    duration: "",
    status: "Draft",
  };

  const [form, setForm] = useState(initialForm);

  
  const fetchCourses = async () => {
    const res = await api.get("/courses");
    setCourses(res.data);
    setFiltered(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  
  useEffect(() => {
    let data = courses;

    if (search) {
      data = data.filter((c) =>
        c.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== "All") {
      data = data.filter((c) => c.category === category);
    }

    setFiltered(data);
  }, [search, category, courses]);

  
  const total = courses.length;
  const published = courses.filter((c) => c.status === "Published").length;
  const draft = courses.filter((c) => c.status === "Draft").length;

  
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  
  const handleSubmit = async () => {
    await api.post("/courses", form);
    setShowModal(false);
    setForm(initialForm);
    fetchCourses();
  };

  
  const handleUpdate = async () => {
    await api.put(`/courses/${editId}`, form);
    setShowModal(false);
    setEditId(null);
    setForm(initialForm);
    fetchCourses();
  };

  
  const handleEdit = (c: any) => {
    setForm({
      title: c.title,
      description: c.description,
      category: c.category,
      level: c.level,
      instructor: c.instructor,
      duration: c.duration,
      status: c.status,
    });

    setEditId(c.id);
    setShowModal(true);
  };

  
  const handleToggle = async (id: number) => {
    await api.patch(`/courses/${id}/status`);
    fetchCourses();
  };

  
  const handleDelete = async (id: number) => {
    await api.delete(`/courses/${id}`);
    fetchCourses();
  };

  return (
    <div className="course-page">
      <div className="container">
        <div className="header">
          <h1>Course Management</h1>

          <button
            className="add-btn"
            onClick={() => {
              setShowModal(true);
              setEditId(null);
              setForm(initialForm);
            }}
          >
            + Add Course
          </button>
        </div>

        {/* STATS */}
        <div className="stats">
          <div className="card">Total: {total}</div>
          <div className="card green">Published: {published}</div>
          <div className="card orange">Draft: {draft}</div>
        </div>

        {/* FILTER */}
        <div className="filters">
          <input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select onChange={(e) => setCategory(e.target.value)}>
            <option>All</option>
            <option>Web Dev</option>
            <option>Data Science</option>
            <option>Design</option>
          </select>
        </div>

        {/* TABLE */}
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
            {filtered.map((c) => (
              <tr key={c.id}>
                <td>{c.title}</td>
                <td>{c.category}</td>
                <td>{c.instructor}</td>
                <td>{c.duration}</td>
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
                    className="publish"
                    onClick={() => handleToggle(c.id)}
                  >
                    {c.status === "Published" ? "Unpublish" : "Publish"}
                  </button>

                  <button
                    className="delete"
                    onClick={() => handleDelete(c.id)}
                  >
                    Delete
                  </button>

                  <button
                    className="edit"
                    onClick={() => handleEdit(c)}
                  >
                    Edit
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
              <h2>{editId ? "Update Course" : "Add Course"}</h2>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
              />

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
              />

              <input
                name="instructor"
                value={form.instructor}
                onChange={handleChange}
                placeholder="Instructor"
              />

              <input
                name="duration"
                value={form.duration}
                onChange={handleChange}
                placeholder="Duration"
              />

              <select name="category" value={form.category} onChange={handleChange}>
                <option>Web Dev</option>
                <option>Data Science</option>
                <option>Design</option>
              </select>

              <select name="level" value={form.level} onChange={handleChange}>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              <select name="status" value={form.status} onChange={handleChange}>
                <option>Draft</option>
                <option>Published</option>
              </select>

              <button onClick={editId ? handleUpdate : handleSubmit}>
                {editId ? "Update" : "Add"}
              </button>

              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CoursesPage;