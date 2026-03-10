import { Link } from "react-router";
import "../style/auth.scss";

const Register = () => {
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

          <form className="auth-form">
            <div className="input-group">
              <input type="text" name="username" placeholder=" " required />
              <label>Username</label>
            </div>

            <div className="input-group">
              <input type="email" name="email" placeholder=" " required />
              <label>Email</label>
            </div>

            <div className="input-group">
              <input type="password" name="password" placeholder=" " required />
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
