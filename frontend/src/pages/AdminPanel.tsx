import React, { useEffect, useState } from "react";
import api from "../services/api";
import AdminCard from "../components/AdminCard";
import "../styles/admin.css";

const AdminPanel: React.FC = () => {
  const [admins, setAdmins] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);

  const initialForm = {
    name: "",
    email: "",
    password: "",
  };

  const [form, setForm] = useState(initialForm);

  // 🔹 FETCH ADMINS
  const fetchAdmins = async () => {
    const res = await api.get("/users");
    setAdmins(res.data);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // 🔹 INPUT CHANGE
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 ADD ADMIN
  const handleAddAdmin = async () => {
    await api.post("/users", form);

    setForm(initialForm);
    setShowModal(false);

    fetchAdmins();
  };

  // 🔹 UPDATE ADMIN ✏️
  const handleUpdateAdmin = async () => {
    await api.put(`/users/${editId}`, form);

    setEditId(null);
    setForm(initialForm);
    setShowModal(false);

    fetchAdmins();
  };

  // 🔹 EDIT CLICK
  const handleEdit = (admin: any) => {
    setForm({
      name: admin.name,
      email: admin.email,
      password: "", // password empty for security
    });

    setEditId(admin.id);
    setShowModal(true);
  };

  // 🔹 TOGGLE
  const handleToggle = async (id: number) => {
    try {
      const res = await api.patch(`/users/${id}/toggle`);

      setAdmins((prev) =>
        prev.map((a) => (a.id === id ? res.data : a))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 DELETE
  const handleDelete = async (id: number) => {
    await api.delete(`/users/${id}`);
    fetchAdmins();
  };

  return (
    <div className="admin-container">
      <div className="header">
        <h1>Admin Panel</h1>

        <button
          className="add-btn"
          onClick={() => {
            setShowModal(true);
            setEditId(null);
            setForm(initialForm);
          }}
        >
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
            onEdit={handleEdit}   // 🔥 NEW
          />
        ))}
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="modal">
          <div className="modal-box">
            <h2>{editId ? "Update Admin" : "Add Admin"}</h2>

            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
            />

            <input
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <input
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <div className="modal-actions">
              <button
                onClick={editId ? handleUpdateAdmin : handleAddAdmin}
              >
                {editId ? "Update" : "Create"}
              </button>

              <button onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;