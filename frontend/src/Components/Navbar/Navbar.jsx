import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import client from "../../Interceptor/api";
import "./Navbar.css";

const Navbar = ({ onSearchChange }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    resolved_count: 0,
    closed_count: 0,
    open_count: 0,
    in_progress_count: 0,
  });

  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await client.get("/tickets/stats/");
        setStats(res.data);
      } catch (err) {
        console.warn("Stats fetch failed:", err);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(inputValue);
    }, 500);

    return () => clearTimeout(timer);
  }, [inputValue, onSearchChange]);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const pending = (stats.open_count || 0) + (stats.in_progress_count || 0);
  const solved = (stats.resolved_count || 0) + (stats.closed_count || 0);

  return (
    <div className="navbar-container">
      <div className="first-row">
        <div className="logo">#logo</div>
        <div className="search">
          <input
            type="text"
            placeholder="🔍Search with ID"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>
        <div className="welcome">Welcome, {user?.username || "User"}</div>
      </div>
      <div className="second-row">
        <div className="stats">
          <div className="solve-stats">Solved : {solved}</div>
          <div className="pending-stats">Pending : {pending}</div>
        </div>

        <div className="logout-btn">
          <button onClick={handleLogout}>Logout</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
