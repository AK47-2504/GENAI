import { Link, useNavigate } from "react-router";
import "../style/auth.scss";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import LoadingScreen from "../../../components/LoadingScreen";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { loading, handleRegister } = useAuth();
  const handleRegiter = (e) => {
    e.preventDefault();
    handleRegister({ username, email, password });
    navigate("/login");
  };

  if (loading) {
    return <LoadingScreen />;
  }
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

          <form onSubmit={handleRegiter} className="auth-form">
            <div className="input-group">
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                name="username"
                placeholder=" "
                required
              />
              <label>Username</label>
            </div>

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

            <button className="auth-btn">Create Account</button>

            <p className="switch-auth">
              Already have an account?
              <span>
                {" "}
                <Link to="/Login">Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
