import { createBrowserRouter } from "react-router";
import MainPage from "./features/Auth/pages/MainPage";
import Login from "./features/Auth/pages/Login";
import Register from "./features/Auth/pages/Register";
import Home from "./components/Home";
import Protected from "./features/Auth/components/Protected";
import GuestRoute from "./features/Auth/components/GuestRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <Login />
      </GuestRoute>
    ),
  },
  {
    path: "/register",
    element: (
      <GuestRoute>
        <Register />
      </GuestRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <Protected>
        <Home />
      </Protected>
    ),
  },
]);
