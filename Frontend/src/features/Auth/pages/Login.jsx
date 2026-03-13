import { Link } from "react-router";
import "../style/auth.scss";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import LoadingScreen from "../../../components/LoadingScreen";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleLogin } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  if (loading) {
    return <LoadingScreen />;
  }
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

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="input-group">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                placeholder=" "
                required
              />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                name="password"
                placeholder=" "
                required
              />
              <label>Password</label>
            </div>

            <div className="auth-options">
              <label className="remember">
                <input type="checkbox" />
                Remember me
              </label>

              <span className="forgot">Forgot password?</span>
            </div>

            <button className="auth-btn">Login</button>

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
