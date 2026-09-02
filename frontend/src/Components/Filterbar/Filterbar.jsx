import React, { useState } from "react";
import { useAuth } from "../../Context/AuthContext";
import "./Filterbar.css";

const Filterbar = ({ onApplyFilter, assignedActive, onToggleAssigned }) => {
  const { user } = useAuth();

  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("");

  const handleFilterClick = () => {
    onApplyFilter({ priority, status });
  };

  const assignedButtonLabel =
    user?.role === "manager" ? "Assigned by me" : "Assigned to me";

  return (
    <div className="filter-container">
      <div className="priority">
        <label>
          Ticket Priority:
          <select
            name="selectedpriority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>
      </div>

      <div className="status">
        <label>
          Ticket Status:
          <select
            name="selectedstatus"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="in_progress">In-progress</option>
            <option value="resolved">Resolved</option>
            <option value="closed">Closed</option>
          </select>
        </label>
      </div>

      <div className="filter-btn">
        <button onClick={handleFilterClick}>Filter</button>
      </div>

      <div className="assigned-to-me">
        <button onClick={onToggleAssigned}>
          {assignedActive ? `${assignedButtonLabel} ✓` : assignedButtonLabel}
        </button>
      </div>
    </div>
  );
};

export default Filterbar;
