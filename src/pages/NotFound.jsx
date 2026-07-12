import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        height: "100vh",
        display: "grid",
        placeItems: "center",
        textAlign: "center",
      }}
    >
      <div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist.</p>

        <Link to="/">Go to Home</Link>
      </div>
    </div>
  );
}