import "./Login.css";
import usePageTitle from "../../../hooks/usePageTitle";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useLoginValidation from "../../../hooks/useLoginValidation";
import validateLogin from "../../../utils/validations/validateLogin";
import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";
import { useTranslation } from "react-i18next";
import { IoArrowBack } from "react-icons/io5";
import { login } from "@/services/authService";
import { toast } from "react-toastify";
import { login as reduxLogin } from "../../../redux/slices/authSlice";
import { setUser, setUserPlan, setUserUsage } from "../../../redux/slices/userSlice";

const Login = () => {
  const { t } = useTranslation();
  usePageTitle(t("login.pageTitle"));
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const screen = location.state ? location.state.from : "/";

  const initialState = {
    emailMobile: "",
    password: "",
  };

  const {
    loginData,
    errors,
    touched,
    submitted,
    handleChange,
    handleBlur,
    handleSubmit,
    clearLoginForm,
  } = useLoginValidation(initialState, validateLogin, t);

  const submitLogin = async () => {
    try {
      setLoading(true);
      const response = await login(loginData);
      setLoading(false);
      if (response.success) {
        dispatch(reduxLogin());
        dispatch(setUser(response.user));
        dispatch(setUserPlan(response.plan));
        dispatch(setUserUsage(response.usage));
        clearLoginForm();
        navigate(screen);
        toast.success("Login successful!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to login");
    }
  };

  const showError = (field) => (touched[field] || submitted) && errors[field];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(submitLogin)(e);
    }
  };
  return (
    <div className="login-page">
      <div className="login-card">
        <Link to="/" className="back-home">
          <IoArrowBack />
          <span>{t("login.return")}</span>
        </Link>
        <h2>{t("login.title")}</h2>
        <p className="subtitle">{t("login.heading")}</p>

        <div className="contact__form">
          <Input
            id="emailMobile"
            name="emailMobile"
            label={t("login.form.label.emailmobile")}
            placeholder={t("login.form.placeholder.emailmobile")}
            value={loginData.emailMobile}
            onChange={handleChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            error={showError("emailMobile") ? errors.emailMobile : ""}
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
              label={t("login.form.label.password")}
              placeholder={t("login.form.placeholder.password")}
              value={loginData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              error={showError("password") ? errors.password : ""}
              disabled={loading}
            />
          </div>
        </div>

        <div className="btn-group">
          <Button loading={loading} onClick={handleSubmit(submitLogin)}>
            {t("login.form.buttons.login")}
          </Button>
          <Button disabled={loading} onClick={clearLoginForm}>
            {t("login.form.buttons.clear")}
          </Button>
        </div>

        <p className="footer-text">
          {t("login.register")}{" "}
          <span onClick={() => navigate("/auth/register")}>
            {t("login.link")}{" "}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;