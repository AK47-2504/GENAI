import { useContext, useState } from "react";
import { AuthContext } from "../auth.context";
import { register, login, logout } from "../services/auth.api.js";

export const useAuth = () => {
  const { user, setUser, loading } = useContext(AuthContext);

  // Per-action states — separate from global auth loading
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleRegister = async ({ username, email, password }) => {
    setSubmitting(true);
    setError(null);
    try {
      const data = await register({ username, email, password });
      if (data?.data?.user) {
        setUser(data.data.user);
      }
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    setSubmitting(true);
    setError(null);
    try {
      const data = await login({ email, password });
      if (data?.data?.user) {
        setUser(data.data.user);
      }
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false };
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = async () => {
    setSubmitting(true);
    setError(null);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // `loading` = global initial session-check loading (used by Protected/GuestRoute)
  // `submitting` = per-action loading (used by Login/Register buttons)
  return { user, loading, submitting, error, setError, handleLogin, handleLogout, handleRegister };
};
