import "./WebsiteLayout.css";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const WebsiteLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default WebsiteLayout;