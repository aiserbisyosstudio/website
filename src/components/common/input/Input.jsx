import "./Input.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  label,
  error,
  setShowPassword,
  showPassword,
  rightIcon = false,
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
        <div className="input-wrapper">
          <input
            type={type}
            className={`${className} ${error ? "error-input shake" : ""}`}
            {...props}
          />
          <label htmlFor={props.id}>{label}</label>
          {rightIcon && (
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          )}
        </div>
      )}
      {error && <small className="error-text">{error}</small>}
    </div>
  );
};

export default Input;