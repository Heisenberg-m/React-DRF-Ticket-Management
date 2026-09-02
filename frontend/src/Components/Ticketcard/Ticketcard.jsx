import React, { useState, useEffect } from "react";
import "./Ticketcard.css";
import { Link } from "react-router-dom";
import api from "../../Interceptor/api";
import { useAuth } from "../../Context/AuthContext";

const TicketCard = ({ searchId, filters, assignedActive }) => {
  const { user } = useAuth();
  const [ticketList, setTicketList] = useState([]);

  useEffect(() => {
    const fetchTicketList = async () => {
      try {
        const res = await api.get("/tickets/");
        setTicketList(res.data);
      } catch (err) {
        console.warn("Ticket fetch failed:", err);
      }
    };

    fetchTicketList();
  }, []);

  const trimmedSearch = searchId ? searchId.trim() : "";

  let filteredTickets = ticketList;

  if (trimmedSearch) {
    filteredTickets = filteredTickets.filter(
      (ticket) => String(ticket.id) === trimmedSearch,
    );
  }

  if (filters?.priority) {
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.priority === filters.priority,
    );
  }

  if (filters?.status) {
    filteredTickets = filteredTickets.filter(
      (ticket) => ticket.status === filters.status,
    );
  }

  if (assignedActive && user) {
    if (user.role === "manager") {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.assigned_by === user.id,
      );
    } else {
      filteredTickets = filteredTickets.filter(
        (ticket) => ticket.assigned_to === user.id,
      );
    }
  }

  if (filteredTickets.length === 0) {
    return <p>No tickets found</p>;
  }

  return (
    <>
      {filteredTickets.map((ticket) => (
        <div className="ticket-card" key={ticket.id}>
          <div className="ticket-field ticket-id">
            <span className="mobile-label">ID</span>
            <Link to={`/viewdetails/${ticket.id}`}># {ticket.id}</Link>
          </div>

          <div className="ticket-field ticket-priority">
            <span className="mobile-label">Priority</span>
            <span className={`priority ${ticket.priority}`}>
              {ticket.priority}
            </span>
          </div>

          <div className="ticket-field ticket-created">
            <span className="mobile-label">Created At</span>
            <span>
              {new Date(ticket.created_at).toISOString().split("T")[0]}
            </span>
          </div>

          <div className="ticket-field ticket-created">
            <span className="mobile-label">Updated At</span>
            <span>
              {new Date(ticket.updated_at).toISOString().split("T")[0]}
            </span>
          </div>

          <div className="ticket-field ticket-status">
            <span className="mobile-label">Status</span>
            <span className={`status ${ticket.status}`}>{ticket.status}</span>
          </div>
        </div>
      ))}
    </>
  );
};

export default TicketCard;
