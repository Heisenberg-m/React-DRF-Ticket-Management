import React from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <header className="landing-topbar">
        <span className="landing-brand">Ticket Manager</span>
        <button
          className="landing-login-link"
          onClick={() => navigate("/login")}
        >
          Log in
        </button>
      </header>

      <main>
        <section className="landing-hero">
          <div className="landing-hero-text">
            <h1>Track every ticket, from open to closed.</h1>
            <p>
              Managers hand off work, engineers pick it up, and every status
              change is logged automatically so nothing gets lost along the way.
            </p>

            <div className="landing-hero-actions">
              <button
                className="landing-cta-btn"
                onClick={() => navigate("/register")}
              >
                Get started
              </button>
              <button
                className="landing-secondary-link"
                onClick={() => navigate("/login")}
              >
                Already have an account? Log in
              </button>
            </div>
          </div>

          <div className="landing-hero-preview">
            <div className="landing-preview-row">
              <span className="landing-preview-id">#241</span>
              <span className="landing-preview-title">
                Login page throwing 500 on submit
              </span>
              <span className="landing-pill landing-priority-high">high</span>
              <span className="landing-pill landing-status-open">open</span>
            </div>

            <div className="landing-preview-row">
              <span className="landing-preview-id">#238</span>
              <span className="landing-preview-title">
                Add pagination to reports table
              </span>
              <span className="landing-pill landing-priority-medium">
                medium
              </span>
              <span className="landing-pill landing-status-in_progress">
                in progress
              </span>
            </div>

            <div className="landing-preview-row">
              <span className="landing-preview-id">#235</span>
              <span className="landing-preview-title">
                Update onboarding doc email copy
              </span>
              <span className="landing-pill landing-priority-low">low</span>
              <span className="landing-pill landing-status-resolved">
                resolved
              </span>
            </div>
          </div>
        </section>

        <section className="landing-steps">
          <div className="landing-step">
            <h3>Log a ticket</h3>
            <p>Capture the issue with a priority and category set.</p>
          </div>

          <div className="landing-step-divider" />

          <div className="landing-step">
            <h3>Assign the work</h3>
            <p>
              Managers hand tickets to engineers, or engineers pick up open work
              themselves.
            </p>
          </div>

          <div className="landing-step-divider" />

          <div className="landing-step">
            <h3>Track it to resolution</h3>
            <p>
              Every status change and reassignment is recorded, so you always
              know what happened.
            </p>
          </div>
        </section>

        <section className="landing-closing">
          <h2>Ready to get your queue under control?</h2>
          <button
            className="landing-cta-btn"
            onClick={() => navigate("/register")}
          >
            Get started
          </button>
        </section>
      </main>

      <footer className="landing-footer">
        <p>Built for teams who'd rather track it than remember it.</p>
      </footer>
    </div>
  );
};

export default Landing;
