import { createRoot } from "react-dom/client";
import ReduxProvider from "./providers/ReduxProvider";
import "./styles/globals.css";
import App from "./App.jsx";
import "./i18n";

createRoot(document.getElementById("root")).render(
  <ReduxProvider>
    <App />
  </ReduxProvider>,
);