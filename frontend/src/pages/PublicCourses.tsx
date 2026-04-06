import React, { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/publicCourses.css";

const PublicCourses: React.FC = () => {
  const [courses, setCourses] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const fetchCourses = async () => {
    try {
      const res = await api.get("/courses/published");
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  
  const categories = ["All", ...Array.from(new Set(courses.map((c) => c.category)))];

  
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

      {/*  Filters */}
      <div className="filters">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/*  Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/*  Course Cards */}
      <div className="course-grid">
        {filteredCourses.map((course) => (
          <div className="course-card" key={course.id}>
            <h3>{course.title}</h3>
            <p>{course.description}</p>

            <span className="badge">Published</span>

            <div className="meta">
              <span>{course.level}</span>
              <span>{course.category}</span>
              <span>{course.duration}h</span>
            </div>

            <div className="author">{course.instructor}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PublicCourses;