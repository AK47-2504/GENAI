import { Link } from "react-router";
import "../style/auth.scss";

const Login = () => {
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

          <form className="auth-form">
            <div className="input-group">
              <input type="email" name="email" placeholder=" " required />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input type="password" name="password" placeholder=" " required />
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
