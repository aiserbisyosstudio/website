import { useEffect, useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import "./MoveToTop.css";

export default function MoveToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className={`scroll-top-btn ${visible ? "show" : ""}`}
      onClick={scrollToTop}
      aria-label="Move to top"
    >
      <FaArrowUp />
    </button>
  );
}