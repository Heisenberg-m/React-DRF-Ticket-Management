import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import "./Auth.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("engineer");

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await register(username, password, role);
      navigate("/login");
    } catch (err) {
      setError("Could not create that account. Try a different username.");
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="auth-title">Create account</h2>

        <p
          style={{
            color: "#9f9f9f",
            fontSize: "0.85rem",
            margin: "-8px 0 0 0",
          }}
        >
          Create an account by choosing your username, password, and role.
        </p>

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

        <label className="auth-label">
          Role
          <select
            className="auth-input"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="engineer">Engineer</option>

            <option value="manager">Manager</option>
          </select>
        </label>
        {error && <p className="auth-error">{error}</p>}

        <button className="auth-button" type="submit" disabled={submitting}>
          {submitting ? "Creating account..." : "Create account"}
        </button>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
