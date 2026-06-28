import "./Button.css";

export default function Button({customClass = "", loading = false, disabled = false, children, ...props }) {
  return (
    <button className={`btn ${customClass}`} disabled={disabled} {...props}>
      {loading ? <span className="spinner"></span> : children}
    </button>
  );
}