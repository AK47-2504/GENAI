import { Link } from "react-router";
import "../style/mainpage.scss";

const MainPage = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* LEFT CONTENT */}
        <div className="hero-left">
          <span className="hero-badge">AI Powered Interview Preparation</span>

          <h1 className="hero-title">
            Prepare for Tech Interviews <br />
            with <span>AI Guidance</span>
          </h1>

          <p className="hero-description">
            Upload your resume, analyze your skills, and practice real interview
            questions with AI. Build confidence and get ready for your next
            developer job.
          </p>

          {/* CTA BUTTONS */}

          <div className="hero-actions">
            <Link to="/register" className="hero-primary-btn">
              Get Started Free
            </Link>

            <Link to="/demo" className="hero-secondary-btn">
              See How It Works
            </Link>
          </div>

          {/* FEATURE HIGHLIGHTS */}

          <div className="hero-features">
            <div className="feature">
              <span className="feature-icon">📄</span>
              <p>AI Resume Analysis</p>
            </div>

            <div className="feature">
              <span className="feature-icon">🤖</span>
              <p>Mock Interviews</p>
            </div>

            <div className="feature">
              <span className="feature-icon">🎯</span>
              <p>Personalized Questions</p>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT */}

        <div className="hero-right">
          <div className="hero-card">
            <h3 className="card-title">AI Interview Practice</h3>

            <p className="card-desc">
              Simulate real technical interviews with AI-generated questions
              based on your resume.
            </p>

            <button className="card-btn">Start Mock Interview</button>
          </div>

          <div className="hero-card secondary">
            <h3 className="card-title">Resume Insights</h3>

            <p className="card-desc">
              Upload your resume and get instant AI feedback to improve your
              chances of getting shortlisted.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainPage;
