import { createBrowserRouter } from "react-router";
import MainPage from "./features/Auth/pages/MainPage";
import Login from "./features/Auth/pages/Login";
import Register from "./features/Auth/pages/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
