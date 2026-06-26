import "./Button.css";

export default function Button({ loading = false, children, ...props }) {
  return (
    <button className="btn" disabled={loading} {...props}>
      {loading ? <span className="spinner"></span> : children}
    </button>
  );
}