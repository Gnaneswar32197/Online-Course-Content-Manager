import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "../styles/publicCourses.css";

interface Course {
  id: number;
  title: string;
  category: string;
}

const dummyCourses: Course[] = [
  { id: 1, title: "React Basics", category: "Web Dev" },
  { id: 2, title: "Node.js Mastery", category: "Web Dev" },
  { id: 3, title: "Data Science Intro", category: "Data Science" },
];

const PublicCourses: React.FC = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredCourses = dummyCourses.filter((course) => {
    return (
      course.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || course.category === category)
    );
  });

  return (
    <div className="page">
      <Navbar />

      <div className="hero">
        <h1>Explore Courses</h1>
        <p>Browse our published course catalog</p>

        <div className="filters">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Web Dev">Web Dev</option>
            <option value="Data Science">Data Science</option>
          </select>
        </div>
      </div>

      {/* Course List */}
      <div className="course-list">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course) => (
            <div key={course.id} className="course-card">
              <h3>{course.title}</h3>
              <p>{course.category}</p>
            </div>
          ))
        ) : (
          <p>No courses found</p>
        )}
      </div>
    </div>
  );
};

export default PublicCourses;