import React from "react";

interface Props {
  admin: any;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

const AdminCard: React.FC<Props> = ({ admin, onToggle, onDelete }) => {
  return (
    <div className="admin-card">
      <h3>{admin.name}</h3>
      <p>{admin.email}</p>

      {/*  STATUS */}
      <span className={admin.isActive ? "active" : "inactive"}>
        {admin.isActive ? "Active" : "Inactive"}
      </span>

      <div className="actions">
        <button onClick={() => onToggle(admin.id)}>
          {admin.isActive ? "Deactivate" : "Activate"}
        </button>

        <button onClick={() => onDelete(admin.id)}>Delete</button>
      </div>
    </div>
  );
};

export default AdminCard;