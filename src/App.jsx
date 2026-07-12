import AppRoutes from "./routes";
import AuthInitializer from "./utils/AuthInitializer";
import ScrollToTop from "./utils/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ScrollToTop />
      <AuthInitializer>
        <AppRoutes />
      </AuthInitializer>
      <ToastContainer
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
        toastStyle={{
          width: "fit-content",
          maxWidth: "90vw",
          fontFamily: getComputedStyle(
            document.documentElement,
          ).getPropertyValue("--font-primary"),
          fontSize: ".8rem",
        }}
      />
    </>
  );
}

export default App;