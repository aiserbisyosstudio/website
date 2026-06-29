import {
  User,
  Crown,
  Coins,
  Image,
  Video,
  Settings,
  CreditCard,
  LogOut,
  ChevronRight,
  Pencil,
} from "lucide-react";
import "./Profile.css";
import usePageTitle from "../../../hooks/usePageTitle";
import { getProfile } from "../../../services/userService";
import { useSelector, useDispatch } from "react-redux";
import Loader from "@/components/common/loader/Loader";
import { useEffect, useRef, useState } from "react";
import Input from "@/components/common/input/Input";
import { useTranslation } from "react-i18next";
import Button from "@/components/common/button/Button";
import ProfileImagePopup from "../../../components/common/pphoto/ProfileImagePopup";

export default function Profile() {
  const { t } = useTranslation();
  usePageTitle("Profile | AISerbisyosStudios");
  const user = useSelector((state) => state.user.profile);
  const [profile, setProfile] = useState({});
  const [plan, setPlan] = useState({});
  const [usage, setUsage] = useState({});
  const [loading, setLoading] = useState(false);
  const [enableEditing, setEnableEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const fileInputRef = useRef(null);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const initialState = {
    name: "",
    email: "",
    mobile: "",
  };

  const getUserProfile = async () => {
    try {
      const userId = user._id;
      setLoading(true);
      const response = await getProfile({ userId });
      setLoading(false);
      if (response.success) {
        setProfile(response.profile.user);
        setPlan(response.profile.plan);
        setUsage(response.profile.usage);
      } else {
        setProfile({});
        setPlan({});
        setUsage({});
      }
    } catch (error) {
      setLoading(false);
      setProfile({});
      setPlan({});
      setUsage({});
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const cancelEdit = () => {
    setEnableEditing(false);
    resetProfileForm();
  };

  const resetProfileForm = () => {
    setProfile({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(updateUser)(e);
    }
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = runValidation(profile);
    setErrors(validationErrors || {});

    if (Object.keys(validationErrors).length === 0) {
      callback(registerData);
    }
  };

  const runValidation = (currentValues) => {
    const validationErrors = validate(currentValues, t);
    setErrors(validationErrors || {});
    return validationErrors || {};
  };

  const validate = (values, t) => {
    const errors = {};

    const validateMobile = (mobile) => {
      const mobileRegex = /^[6-9][0-9]{9}$/;
      return mobileRegex.test(mobile);
    };

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!values.name.trim()) {
      errors.name = t("register.form.errors.name");
    }

    if (!values.mobile.trim()) {
      errors.mobile = t("register.form.errors.mobile");
    } else if (!validateMobile(values.mobile)) {
      errors.mobile = t("register.form.errors.mobile1");
    }

    if (!values.email.trim()) {
      errors.email = t("register.form.errors.email");
    } else if (!validateEmail(values.email)) {
      errors.email = t("register.form.errors.email1");
    }
    return errors;
  };

  const updateUser = async () => {};

  const showError = (field) => (touched[field] || submitted) && errors[field];

  const sendOtps = () => {};

  const handleIconClick = () => {
    setShowProfileModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(file);
      setShowProfileModal(true);
    }
    e.target.value = "";
  };

  return (
    <>
      <section className="profile">
        <div className="profile__card">
          <div className="profile__container">
            <div className="profile__profile">
              <div className="profile-card">
                <div className="profile-avatar-container">
                  <div className="profile-avatar">
                    <User size={45} />
                  </div>

                  <Button className="edit-avatar-btn" onClick={handleIconClick}>
                    <Pencil size={14} />
                  </Button>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />

                <div className="profile-info">
                  <span>{profile.name}</span>
                  <p>{profile.email}</p>
                </div>
              </div>
              <div className="contact__form">
                <Input
                  id="name"
                  name="name"
                  label={t("register.form.label.name")}
                  placeholder={t("register.form.placeholder.name")}
                  value={profile.name}
                  disabled={loading || !enableEditing}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  error={showError("name") ? errors.name : ""}
                />

                <Input
                  id="email"
                  name="email"
                  label={t("register.form.label.email")}
                  placeholder={t("register.form.placeholder.email")}
                  value={profile.email}
                  disabled={loading || !enableEditing}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  error={showError("email") ? errors.email : ""}
                />

                <Input
                  id="mobile"
                  name="mobile"
                  label={t("register.form.label.mobile")}
                  placeholder={t("register.form.placeholder.mobile")}
                  value={profile.mobile}
                  disabled={loading || !enableEditing}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  error={showError("mobile") ? errors.mobile : ""}
                />

                <div
                  className="btn-group"
                  style={{ justifyContent: "end", marginTop: "0rem" }}
                >
                  {!enableEditing && (
                    <Button
                      loading={loading}
                      onClick={() => setEnableEditing(true)}
                      style={{ width: "49%", flex: "none" }}
                    >
                      Edit
                    </Button>
                  )}

                  {enableEditing && (
                    <>
                      <Button
                        loading={loading}
                        style={{ width: "32%", flex: "none" }}
                        onClick={handleSubmit(updateUser)}
                      >
                        Save
                      </Button>
                      <Button
                        loading={loading}
                        style={{ width: "32%", flex: "none" }}
                        onClick={() => resetProfileForm()}
                      >
                        Reset
                      </Button>
                      <Button
                        disabled={loading}
                        onClick={() => cancelEdit()}
                        style={{ width: "32%", flex: "none" }}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                </div>
              </div>
              <div className="contact__form" style={{ marginTop: "2rem" }}>
                <h3>Change Password</h3>
                <div className="password-group">
                  <Input
                    id="password"
                    name="password"
                    setShowPassword={setShowCurrent}
                    showPassword={showCurrent}
                    rightIcon={true}
                    type={showCurrent ? "text" : "password"}
                    label="Current Password"
                    placeholder="Please enter your current password"
                    value={passwords.current}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    error={showError("password") ? errors.password : ""}
                    disabled={loading}
                    sideButton={true}
                    sideButtonText="Forgot Password"
                    onSideButtonClick={sendOtps}
                    sideButtonDisabled={loading}
                  />
                </div>
                <div className="password-group">
                  <Input
                    id="password"
                    name="password"
                    setShowPassword={setShowNew}
                    showPassword={showNew}
                    rightIcon={true}
                    type={showNew ? "text" : "password"}
                    label="New Password"
                    placeholder="Please enter new password"
                    value={passwords.new}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    error={showError("password") ? errors.password : ""}
                    disabled={loading}
                  />
                </div>
                <div className="password-group">
                  <Input
                    id="password"
                    name="password"
                    setShowPassword={setShowConfirm}
                    showPassword={showConfirm}
                    rightIcon={true}
                    type={showConfirm ? "text" : "password"}
                    label="Confirm Password"
                    placeholder="Please enter new password again"
                    value={passwords.confirm}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    error={showError("password") ? errors.password : ""}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
            <div className="profile__plan"></div>
          </div>
        </div>
      </section>
      <Loader fullScreen={true} show={loading} />
      <ProfileImagePopup imageFile={profileImage} showModal={showProfileModal} setShowModal={setShowProfileModal} changeImage={handleIconClick} userId={user._id}/>
    </>
  );
}