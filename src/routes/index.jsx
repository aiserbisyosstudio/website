import { useRoutes } from "react-router-dom";
import websiteRoutes from "./websiteRoutes";
import authRoutes from "./authRoute";
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  const routes = useRoutes([
    ...websiteRoutes,
    ...authRoutes,
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return routes;
}
