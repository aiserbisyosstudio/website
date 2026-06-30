import "./Register.css";
import usePageTitle from "../../../hooks/usePageTitle";
import { useState } from "react";
import useRegisterValidation from "../../../hooks/useRegisterValidation";
import validateRegister from "../../../utils/validations/validateRegister";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";
import { useTranslation } from "react-i18next";
import { IoArrowBack } from "react-icons/io5";
import { register } from "@/services/userService";
import { toast } from "react-toastify";

const Register = () => {
  const { t } = useTranslation();
  usePageTitle(t("register.pageTitle"));
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const initialState = {
    name: "",
    email: "",
    mobile: "",
    password: "",
  };

  const {
    registerData,
    errors,
    touched,
    submitted,
    handleChange,
    handleBlur,
    handleSubmit,
    clearRegisterForm,
  } = useRegisterValidation(initialState, validateRegister, t);

  const submitRegister = async () => {
    try {
      setLoading(true);
      const response = await register(registerData);
      setLoading(false);
      if (response.success) {
        clearRegisterForm();
        toast.success("Registered successfully!");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.message || "Failed to register!");
    }
  };

  const showError = (field) => (touched[field] || submitted) && errors[field];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(submitRegister)(e);
    }
  };

  const getPasswordStrength = () => {
    if (registerData.password.length === 0) {
      return "";
    }

    if (registerData.password.length < 6) {
      return "Weak password";
    }

    if (
      registerData.password.length >= 6 &&
      /[A-Z]/.test(registerData.password) &&
      /[a-z]/.test(registerData.password) &&
      /[0-9]/.test(registerData.password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(registerData.password)
    ) {
      return "Strong password";
    }

    return "Medium password";
  };

  const getStrengthColor = () => {
    if (registerData.password.length < 6) {
      return "#ef4444";
    }

    if (
      registerData.password.length >= 6 &&
      /[A-Z]/.test(registerData.password) &&
      /[a-z]/.test(registerData.password) &&
      /[0-9]/.test(registerData.password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(registerData.password)
    ) {
      return "#22c55e";
    }

    return "#f59e0b";
  };

  return (
    <div className="register-page">
      <div className="register-card">
        <Link to="/" className="back-home">
          <IoArrowBack />
          <span>{t("register.return")}</span>
        </Link>
        <h2>{t("register.title")}</h2>
        <p className="subtitle">{t("register.heading")}</p>

        <div className="contact__form">
          <Input
            id="name"
            name="name"
            label={t("register.form.label.name")}
            placeholder={t("register.form.placeholder.name")}
            value={registerData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={showError("name") ? errors.name : ""}
            disabled={loading}
          />

          <Input
            id="email"
            name="email"
            label={t("register.form.label.email")}
            placeholder={t("register.form.placeholder.email")}
            value={registerData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={showError("email") ? errors.email : ""}
            disabled={loading}
          />

          <Input
            id="mobile"
            name="mobile"
            label={t("register.form.label.mobile")}
            placeholder={t("register.form.placeholder.mobile")}
            value={registerData.mobile}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={showError("mobile") ? errors.mobile : ""}
            disabled={loading}
          />

          <div className="password-group">
            <Input
              id="password"
              name="password"
              setShowPassword={setShowPassword}
              showPassword={showPassword}
              rightIcon={true}
              type={showPassword ? "text" : "password"}
              label={t("register.form.label.password")}
              placeholder={t("register.form.placeholder.password")}
              value={registerData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              error={showError("password") ? errors.password : ""}
              disabled={loading}
            />
          </div>
        </div>
        {!!registerData.password && (
          <small
            className="register-error-text"
            style={{ color: getStrengthColor() }}
          >
            {getPasswordStrength()}
          </small>
        )}

        <div className="btn-group">
          <Button loading={loading} onClick={handleSubmit(submitRegister)}>
            {t("register.form.buttons.register")}
          </Button>

          <Button disabled={loading} onClick={clearRegisterForm}>
            {t("register.form.buttons.clear")}
          </Button>
        </div>

        <p className="footer-text">
          {t("register.login")}{" "}
          <span onClick={() => navigate("/auth")}>{t("register.link")}</span>
        </p>
      </div>
    </div>
  );
};

export default Register;