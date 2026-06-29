import "./WebsiteLayout.css";
import { Outlet } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MoveToTop from "../../components/common/movetotop/MoveToTop";

const WebsiteLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="content">
        <Outlet />
      </main>
      <Footer />
      <MoveToTop />
    </div>
  );
};

export default WebsiteLayout;
