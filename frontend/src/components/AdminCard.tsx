import React from "react";

interface Props {
  admin: any;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (admin: any) => void; 
}

const AdminCard: React.FC<Props> = ({
  admin,
  onToggle,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="admin-card">
      <h3>{admin.name}</h3>
      <p>{admin.email}</p>

      <span className={admin.isActive ? "active" : "inactive"}>
        {admin.isActive ? "Active" : "Inactive"}
      </span>

      <div className="actions">
        <button onClick={() => onToggle(admin.id)}>
          {admin.isActive ? "Deactivate" : "Activate"}
        </button>

        <button onClick={() => onDelete(admin.id)}>Delete</button>

        <button className="edit" onClick={() => onEdit(admin)}>
          Edit
        </button>
      </div>
    </div>
  );
};

export default AdminCard;