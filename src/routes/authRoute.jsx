import { Navigate } from "react-router-dom";
import WebsiteLayout from "@/layouts/website/WebsiteLayout";
import Home from "@/pages/website/home/Home";
import Contact from "@/pages/website/contact/Contact";
import Login from "@/pages/auth/login/Login";
import Register from "@/pages/auth/register/Register";

const authRoutes = [
  {
    path: "/auth",
    element: <WebsiteLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="login" replace />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default authRoutes;