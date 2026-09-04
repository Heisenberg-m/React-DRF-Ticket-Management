import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Auth.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      const user = await login(username, password);

      if (user.role === "manager") {
        navigate("/manager/dashboard");
      } else if (user.role === "engineer") {
        navigate("/engineer/dashboard");
      } else {
        navigate("/unauthorized");
      }
    } catch (err) {
      setError("Invalid username or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-glow" />

      <header className="auth-topbar">
        <Link to="/" className="auth-brand">
          Ticket Manager
        </Link>
      </header>

      <main className="auth-panel">
        <div className="auth-hero">
          <div className="auth-hero-badges">
            <span className="auth-pill auth-status-open">open</span>
            <span className="auth-pill auth-status-in_progress">
              in progress
            </span>
            <span className="auth-pill auth-status-resolved">resolved</span>
          </div>

          <h1 className="auth-hero-title">Welcome back</h1>
          <p className="auth-hero-subtitle">
            Log in to pick up your queue right where you left it.
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label">
            Username
            <input
              className="auth-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="auth-label">
            Password
            <input
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="auth-error">{error}</p>}
          <button className="auth-button" type="submit" disabled={submitting}>
            {submitting ? "Logging in..." : "Log in"}
          </button>
          <p className="auth-footer">
            No account? <Link to="/register">Register</Link>
          </p>
        </form>
      </main>
    </div>
  );
};

export default Login;
