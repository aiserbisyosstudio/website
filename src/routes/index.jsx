import { useRoutes } from "react-router-dom";
import websiteRoutes from "./websiteRoutes";
import authRoutes from "./authRoute";

export default function AppRoutes() {
  const routes = useRoutes([...websiteRoutes, ...authRoutes]);
  return routes;
}