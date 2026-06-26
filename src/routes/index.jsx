import { useRoutes } from "react-router-dom";
import websiteRoutes from "./websiteRoutes";

export default function AppRoutes() {
  const routes = useRoutes([...websiteRoutes]);
  return routes;
}