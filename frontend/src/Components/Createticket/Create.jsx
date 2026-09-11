import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Interceptor/api";
import "./Create.css";

const CreateTicket = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "medium",
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title.trim() || !form.description.trim()) {
      setError("Title and description are both required.");
      return;
    }

    setSubmitting(true);
    try {
      // assigned_to and assigned_by are set by the backend automatically,
      const { data } = await api.post("/tickets/", form);
      navigate(`/viewdetails/${data.id}`);
    } catch (err) {
      setError(
        "Couldn't create the ticket. Please check the fields and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="ct-page">
      <div className="ct-card">
        <h2 className="ct-heading">Create ticket</h2>

        <div className="ct-field">
          <label className="ct-label" htmlFor="ct-title">
            Title
          </label>
          <input
            id="ct-title"
            className="ct-input"
            type="text"
            name="title"
            placeholder="Short summary of the issue"
            value={form.title}
            onChange={handleChange}
          />
        </div>

        <div className="ct-field">
          <label className="ct-label" htmlFor="ct-description">
            Description
          </label>
          <textarea
            id="ct-description"
            className="ct-textarea"
            name="description"
            rows="5"
            placeholder="What's going on, and any steps to reproduce it..."
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="ct-field">
          <label className="ct-label" htmlFor="ct-priority">
            Priority
          </label>
          <select
            id="ct-priority"
            className="ct-select"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        {error && <p className="ct-error">{error}</p>}

        <div className="ct-actions">
          <button
            className="ct-submit-btn"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? "Creating..." : "Create ticket"}
          </button>
          <button
            className="ct-cancel-btn"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;
