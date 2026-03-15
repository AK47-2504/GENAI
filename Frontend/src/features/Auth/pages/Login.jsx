import { Link, useNavigate } from "react-router";
import "../style/auth.scss";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { submitting, error, setError, handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await handleLogin({ email, password });
    if (result.success) {
      navigate("/home");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Left Branding Section */}
        <div className="auth-left">
          <div className="brand-wrapper">
            <h1 className="brand-title">Welcome Back</h1>
            <p className="brand-subtitle">
              Pick up where you left off and continue preparing for real-world
              interviews with AI guidance.
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <div className="auth-right">
          <h2 className="form-title">Login</h2>

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
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                type="email"
                name="email"
                id="login-email"
                placeholder=" "
                required
                autoComplete="email"
              />
              <label htmlFor="login-email">Email</label>
            </div>

            <div className="input-group">
              <input
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                type="password"
                name="password"
                id="login-password"
                placeholder=" "
                required
                autoComplete="current-password"
              />
              <label htmlFor="login-password">Password</label>
            </div>

            <div className="auth-options">
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>
              <span className="forgot">Forgot password?</span>
            </div>

            <button className="auth-btn" disabled={submitting}>
              {submitting ? <span className="btn-spinner" /> : "Login"}
            </button>

            <p className="switch-auth">
              Don't have an account?
              <span>
                <Link to="/register">Register</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
