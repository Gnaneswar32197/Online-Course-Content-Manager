import React, { useState } from "react";
import api from "../services/api";
import "../styles/profile.css";

const DEFAULT_IMG =
  "https://cdn-icons-png.flaticon.com/512/149/149071.png";

const Profile: React.FC = () => {
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [user, setUser] = useState(storedUser);
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(user.name || "");
  const [email, setEmail] = useState(user.email || "");

  // 🔥 IMAGE UPLOAD (FIXED FOR BACKEND)
  const handleImageUpload = async (e: any) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      const formData = new FormData();

      // 🔥 IMPORTANT FIX (match backend)
      formData.append("file", file);

      const res = await api.post("/users/profile/upload", formData);

      const updatedUser = res.data.user || res.data;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

    } catch (err: any) {
      console.error("UPLOAD ERROR 👉", err.response?.data || err);
      alert(err.response?.data?.message || "Image upload failed");
    }
  };

  // 🔥 SAVE PROFILE
  const handleSave = async () => {
    try {
      const res = await api.put("/users/profile/update", {
        name,
        email,
      });

      const updatedUser = res.data.user || res.data;

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setIsEditing(false);
    } catch (err: any) {
      console.error("UPDATE ERROR 👉", err.response?.data || err);
      alert("Update failed");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">

        {/* PROFILE IMAGE */}
        <div className="profile-img-wrapper">
          <img
            src={user.profileImage || DEFAULT_IMG}
            alt="profile"
            className="profile-img"
          />

          <label className="upload-btn">
            📷
            <input type="file" onChange={handleImageUpload} hidden />
          </label>
        </div>

        {isEditing ? (
          <>
            <input
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="btn-group">
              <button className="save-btn" onClick={handleSave}>
                Save
              </button>
              <button
                className="cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>{user.name}</h2>
            <p className="email">{user.email}</p>
            <span className="role">{user.role}</span>

            <div className="info">
              <p>📧 Email: {user.email}</p>
              <p>👤 Role: {user.role}</p>
            </div>

            <button
              className="edit-btn"
              onClick={() => setIsEditing(true)}
            >
              Edit Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;