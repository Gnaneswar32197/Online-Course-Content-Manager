import "./AdminCourses.css";

//need to be updated Gnaneshwar.
const courses = [
  {
    id: 1,
    title: "React Mastery",
    category: "Web Dev",
    instructor: "Alice Chen",
    duration: "12h",
    level: "Intermediate",
    status: "Published",
  },
  {
    id: 2,
    title: "Python for Data Science",
    category: "Data Science",
    instructor: "Bob Kumar",
    duration: "20h",
    level: "Beginner",
    status: "Published",
  },
  {
    id: 3,
    title: "Advanced Node.js",
    category: "Backend",
    instructor: "Sara Lee",
    duration: "8h",
    level: "Advanced",
    status: "Draft",
  },
  {
    id: 4,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    instructor: "Mark Davis",
    duration: "10h",
    level: "Beginner",
    status: "Published",
  },
  {
    id: 5,
    title: "DevOps & CI/CD",
    category: "DevOps",
    instructor: "Nina Patel",
    duration: "15h",
    level: "Intermediate",
    status: "Draft",
  },
];

const AdminCourses = () => {
  const total = courses.length;
  const published = courses.filter(c => c.status === "Published").length;
  const draft = courses.filter(c => c.status === "Draft").length;

  return (
    <div className="admin-container">

      <h2>Course Management</h2>
      <p className="subtitle">Abhishek Manage the courses here</p>

      {/* STATS */}
      <div className="stats">
        <div className="card">Total Courses <span>{total}</span></div>
        <div className="card">Published <span>{published}</span></div>
        <div className="card">Draft <span>{draft}</span></div>
      </div>

      {/* FILTER */}
      <div className="filters">
        <input placeholder="Search courses..." />
        <select>
          <option>All Categories</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="course-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Instructor</th>
            <th>Duration</th>
            <th>Level</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <td><b>{course.title}</b></td>
              <td>{course.category}</td>
              <td>{course.instructor}</td>
              <td>{course.duration}</td>
              <td>
                <span className={`level ${course.level.toLowerCase()}`}>
                  {course.level}
                </span>
              </td>
              <td>
                <span className={`status ${course.status.toLowerCase()}`}>
                  {course.status}
                </span>
              </td>
              <td>
                <button className="btn publish">
                  {course.status === "Published" ? "Unpublish" : "Publish"}
                </button>
                <button className="btn edit">Edit</button>
                <button className="btn delete">Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
};

export default AdminCourses;