import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/publicCourses.css";

import { Clock, BookOpen, Award, User } from "lucide-react";

const PublicCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

  const fetchCourses = async () => {
    const res = await api.get("/courses/published");
    setCourses(res.data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(courses.map((c) => c.category))),
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || course.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="public-container">
      <h1>Explore Courses</h1>
      <p className="subtitle">Browse our published course catalog</p>

      {/* Filters */}
      <div className="filters">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select onChange={(e) => setCategory(e.target.value)}>
          {categories.map((cat, i) => (
            <option key={i}>{cat}</option>
          ))}
        </select>
      </div>

      {/* Cards */}
      <div className="course-grid">
        {filteredCourses.map((course) => (
          <div
            className="course-card"
            key={course.id}
            onClick={() => setSelectedCourse(course)}
          >
            <h3>{course.title}</h3>

            {/* 🔥 LIMITED DESCRIPTION */}
            <p className="description">{course.description}</p>

            <span className="badge">Published</span>

            <div className="meta">
              <span>📘 {course.level}</span>
              <span>🏷️ {course.category}</span>
              <span>⏱ {course.duration} hrs</span>
            </div>

            <div className="author">👨‍🏫 {course.instructor}</div>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {selectedCourse && (
        <div className="modal" onClick={() => setSelectedCourse(null)}>
          <div
            className="modal-box advanced"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="close" onClick={() => setSelectedCourse(null)}>
              ✕
            </span>

            {/* Header */}
            <div className="badges">
              <span className="badge green">Published</span>
              <span className="badge green">{selectedCourse.level}</span>
              <span className="badge yellow">
                {selectedCourse.category}
              </span>
            </div>

            <h2>{selectedCourse.title}</h2>

           

            <hr />

            {/* ICON INFO */}
            <div className="info">
              <div className="info-box">
                <User className="icon" />
                <div>
                  <p className="label">Instructor</p>
                  <p>{selectedCourse.instructor}</p>
                </div>
              </div>

              <div className="info-box">
                <Clock className="icon" />
                <div>
                  <p className="label">Duration</p>
                  <p>{selectedCourse.duration}h</p>
                </div>
              </div>

              <div className="info-box">
                <BookOpen className="icon" />
                <div>
                  <p className="label">Lessons</p>
                  <p>- lessons</p>
                </div>
              </div>

              <div className="info-box">
                <Award className="icon" />
                <div>
                  <p className="label">Certificate</p>
                  <p>No</p>
                </div>
              </div>
            </div>

            {/* FULL DESCRIPTION */}
            <div className="about">
              <h4>ABOUT THIS COURSE</h4>
              <p>{selectedCourse.description}</p>
            </div>

            {/* Footer */}
            <div className="footer">
              <button className="enroll">Enroll Now — Free</button>
              <button
                className="close-btn"
                onClick={() => setSelectedCourse(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicCourses;