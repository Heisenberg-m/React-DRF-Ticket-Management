import React, { useState, useEffect } from "react";
import "./Viewdetails.css";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../Interceptor/api";
import { useAuth } from "../../Context/AuthContext";

const Viewdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [ticketDetails, setTicketDetails] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    created_at: "",
    updated_at: "",
    assigned_to: "",
    assigned_by_name: "",
    resolution_note: "",
  });

  const [engineers, setEngineers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ticketRes = await api.get(`/tickets/${id}/`);
        setTicketDetails(ticketRes.data);

        const usersRes = await api.get(`/users/`);
        setEngineers(usersRes.data);
      } catch (err) {
        console.warn("Failed to fetch data:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/tickets/${id}/`, ticketDetails);
      alert("Ticket updated successfully!");
      navigate("/manager/dashboard");
    } catch (err) {
      console.error("Failed to update ticket", err);
      alert("Failed to update the ticket. Please try again.");
    }
  };

  const handleAssignToSelf = async () => {
    try {
      const res = await api.put(`/tickets/${id}/`, {
        assigned_to: user.id,
        assigned_by: user.id,
      });
      setTicketDetails(res.data);
      alert("Ticket assigned to you!");
    } catch (err) {
      console.error("Failed to assign ticket", err);
      alert("Failed to assign the ticket. Please try again.");
    }
  };

  const createdDate = new Date(ticketDetails.created_at).toLocaleDateString();
  const updatedDate = new Date(ticketDetails.updated_at).toLocaleDateString();

  const isEngineer = user?.role === "engineer";
  const alreadyAssignedToSelf = ticketDetails.assigned_to === user?.id;

  return (
    <div className="main-container">
      <div className="form-container">
        <h2 id="view">Ticket Details</h2>
        <input
          type="text"
          className="title"
          name="title"
          value={ticketDetails.title}
          onChange={handleChange}
        />

        <textarea
          className="description"
          name="description"
          rows="5"
          value={ticketDetails.description}
          onChange={handleChange}
        />

        <div className="dropdown">
          <div className="status">
            <label className="status-label">
              Status:
              <select
                className="status-input"
                name="status"
                value={ticketDetails.status}
                onChange={handleChange}
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </label>
          </div>

          <div className="priority">
            <label className="priority-label">
              Priority:
              <select
                className="priority-input"
                name="priority"
                value={ticketDetails.priority}
                onChange={handleChange}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
          </div>
        </div>

        <div className="dates">
          <div className="created">Created: {createdDate}</div>
          <div className="updated">Updated: {updatedDate}</div>
        </div>

        <div className="assigned">
          <div className="assigned_by">
            Assigned by: {ticketDetails.assigned_by_name || "-----"}
          </div>

          <div className="assigned_to">
            <label className="assigned-label">
              Assigned To:
              <select
                className="assigned-input"
                name="assigned_to"
                value={ticketDetails.assigned_to || ""}
                onChange={handleChange}
              >
                <option value="">-- Unassigned --</option>
                {engineers.map((engineer) => (
                  <option key={engineer.id} value={engineer.id}>
                    {engineer.username}
                  </option>
                ))}
              </select>
            </label>
          </div>

          {isEngineer && !alreadyAssignedToSelf && (
            <button className="assign-self-btn" onClick={handleAssignToSelf}>
              Assign to me
            </button>
          )}
        </div>

        <textarea
          className="resolution-note"
          name="resolution_note"
          rows="4"
          placeholder="Enter resolution note..."
          value={ticketDetails.resolution_note || ""}
          onChange={handleChange}
        />

        <div className="button-group">
          <button className="update-btn" onClick={handleUpdate}>
            Update
          </button>
          <button className="back-btn" onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Viewdetails;
