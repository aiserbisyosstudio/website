import "./Input.css";

const Input = ({
  label,
  error,
  type = "text",
  textarea = false,
  rows = 5,
  className = "",
  ...props
}) => {

  return (
    <div className="contact__field">
      {textarea ? (
        <textarea
          rows={rows}
          className={`${className} ${error ? "error-input shake" : ""}`}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={`${className} ${error ? "error-input shake" : ""}`}
          {...props}
        />
      )}

      <label htmlFor={props.id}>{label}</label>

      {error && <small className="error-text">{error}</small>}
    </div>
  );
};

export default Input;