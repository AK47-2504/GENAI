import { Link, useNavigate } from "react-router";
import "../style/auth.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { submitting, error, setError, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleRegister({ username, email, password });
    if (result.success) {
      navigate("/home");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Left Section */}
        <div className="auth-left">
          <div className="brand-wrapper">
            <h1 className="brand-title">Start Your Interview Journey</h1>
            <p className="brand-subtitle">
              Upload your resume, practice AI-driven interviews, and prepare for
              real job opportunities.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="auth-right">
          <h2 className="form-title">Register</h2>

          {/* Error banner — sits right below heading, above the form */}
          {error && (
            <div className="auth-error" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" width="16" height="16">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="input-group">
              <input
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(null); }}
                type="text"
                name="username"
                id="reg-username"
                placeholder=" "
                required
                autoComplete="username"
              />
              <label htmlFor="reg-username">Username</label>
            </div>

            <div className="input-group">
              <input
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                type="email"
                name="email"
                id="reg-email"
                placeholder=" "
                required
                autoComplete="email"
              />
              <label htmlFor="reg-email">Email</label>
            </div>

            <div className="input-group">
              <input
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                type="password"
                name="password"
                id="reg-password"
                placeholder=" "
                required
                autoComplete="new-password"
              />
              <label htmlFor="reg-password">Password</label>
            </div>

            <button className="auth-btn" disabled={submitting}>
              {submitting ? <span className="btn-spinner" /> : "Create Account"}
            </button>

            <p className="switch-auth">
              Already have an account?
              <span>
                {" "}
                <Link to="/login">Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
