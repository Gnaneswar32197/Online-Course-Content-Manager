import React, { useEffect, useState } from "react";
import api from "../services/api";
import AdminCard from "../components/AdminCard";
import "../styles/admin.css";

const AdminPanel: React.FC = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //  FETCH ADMINS
  const fetchAdmins = async () => {
    const res = await api.get("/users");
    setAdmins(res.data);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  //  ADD ADMIN
  const handleAddAdmin = async () => {
    await api.post("/users", { name, email, password });

    setName("");
    setEmail("");
    setPassword("");
    setShowModal(false);

    fetchAdmins();
  };

  //  TOGGLE (FIXED)
  const handleToggle = async (id: number) => {
    try {
      const res = await api.patch(`/users/${id}/toggle`);

      setAdmins((prev) =>
        prev.map((admin) =>
          admin.id === id ? res.data : admin
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  //  DELETE
  const handleDelete = async (id: number) => {
    await api.delete(`/users/${id}`);
    fetchAdmins();
  };

  return (
    <div className="admin-container">
      <div className="header">
        <h1>Admin Panel</h1>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          + Add Admin
        </button>
      </div>

      <p className="subtitle">Manage administrator accounts</p>

      <div className="admin-grid">
        {admins.map((admin) => (
          <AdminCard
            key={admin.id}
            admin={admin}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {/*  MODAL */}
      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h2>Add Admin</h2>

            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="modal-actions">
              <button onClick={handleAddAdmin}>Create</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;