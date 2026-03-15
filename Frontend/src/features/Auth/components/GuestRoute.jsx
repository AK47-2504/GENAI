import { Navigate } from "react-router";
import LoadingScreen from "../../../components/LoadingScreen";
import { useAuth } from "../hooks/useAuth";

/**
 * GuestRoute: Redirects already-authenticated users to /home.
 * Used to guard /login and /register so logged-in users can't visit them.
 */
const GuestRoute = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

export default GuestRoute;
