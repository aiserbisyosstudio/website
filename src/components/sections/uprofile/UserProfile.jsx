import "./UserProfile.css";
import { User, Trash2, EllipsisVertical, ImageUp } from "lucide-react";
import usePageTitle from "../../../hooks/usePageTitle";
import { getProfile, removeProfilePhoto } from "../../../services/userService";
import { useSelector, useDispatch } from "react-redux";
import Loader from "@/components/common/loader/Loader";
import { useEffect, useRef, useState } from "react";
import Input from "@/components/common/input/Input";
import Button from "@/components/common/button/Button";
import ProfileImagePopup from "../../../components/common/pphoto/ProfileImagePopup";
import { toast } from "react-toastify";
import { updateUser } from "../../../redux/slices/userSlice";
import { updatePassword, sendEmailOtp } from "@/services/authService";
import { generateOtp } from "../../../utils/data/otp.util";
import VerifyEmailOtp from "../../common/otp/VerifyEmailOtp";

export default function UserProfile({ user, t }) {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState({});
  const [usage, setUsage] = useState({});
  const [ploading, setPloading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [enableEditing, setEnableEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [perrors, setPerrors] = useState({});
  const [touched, setTouched] = useState({});
  const [ptouched, setPtouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [psubmitted, setPsubmitted] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const fileInputRef = useRef(null);
  const menuRef = useRef(null);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    setSubmitted(false);
    setProfile({
      name: user.name,
      email: user.email,
      mobile: user.mobile,
    });
    setErrors({});
  };

  const resetPasswordForm = () => {
    setPsubmitted(false);
    setPasswords({
      current: "",
      new: "",
      confirm: "",
    });
    setPerrors({});
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

  const handlePasswordChange = (e) => {
    console.log("Password changing: ", e);
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPerrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handlePasswordBlur = (e) => {
    const { name } = e.target;

    setPtouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    setSubmitted(true);

    const validationErrors = runValidation(profile);
    setErrors(validationErrors || {});

    if (Object.keys(validationErrors).length === 0) {
      callback(profile);
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

  const validatePasswords = (values, t) => {
    const errors = {};

    if (!values.current.trim()) {
      errors.current = t("profile.profile.fields.errors.current");
    }

    if (!values.new.trim()) {
      errors.new = t("profile.profile.fields.errors.new");
    }

    if (!values.confirm.trim()) {
      errors.confirm = t("profile.profile.fields.errors.confirm");
    }

    if (values.new.trim() !== values.confirm.trim()) {
      errors.new = "";
      errors.confirm = t("profile.profile.fields.errors.nomatch");
    }
    return errors;
  };

  const runPasswordValidation = (currentValues) => {
    const validationErrors = validatePasswords(currentValues, t);
    setErrors(validationErrors || {});
    return validationErrors || {};
  };

  const handlePasswordSubmit = (callback) => (e) => {
    e.preventDefault();
    setPsubmitted(true);

    const validationErrors = runPasswordValidation(passwords);
    setPerrors(validationErrors || {});

    if (Object.keys(validationErrors).length === 0) {
      callback(passwords);
    }
  };

  const updateUserProfile = async (data) => {};

  const updateUserPassword = async (data) => {
    try {
      setPloading(true);
      const response = await updatePassword({
        userId: user._id,
        currentPassword: passwords.current,
        newPassword: passwords.new,
      });
      setPloading(false);
      if (response.success) {
        resetPasswordForm();
        toast.success("Password updated successfully");
      } else {
        toast.error("Failed to update password");
      }
    } catch (error) {
      setPloading(false);
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  const showError = (field) => (touched[field] || submitted) && errors[field];
  const showPasswordError = (field) =>
    (ptouched[field] || psubmitted) && perrors[field];

  const sendOtps = () => {};

  const handleIconClick = () => {
    setShowProfileModal(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleRemovePhoto = async () => {
    try {
      setLoading(true);
      const response = await removeProfilePhoto({ userId: user._id });
      setLoading(false);
      if (response.success) {
        dispatch(
          updateUser({
            avatar: "",
          }),
        );
        toast.success("Profile photo removed successfully");
      } else {
        toast.error("Faile to remove profile photo");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Faile to remove profile photo");
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

  const sendEmailOtpClick = async () => {
    try {
      setShowOtp(false);
      setLoading(true);
      const emailOtp = generateOtp();
      setEmailOtp(emailOtp);
      const response = await sendEmailOtp({ email: user.email, otp: emailOtp });
      setLoading(false);
      if (response.success) {
        toast.success("Email otp sent successfully");
        setShowOtp(true);
      } else {
        toast.error("Failed to send email otp");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send email otp");
    }
  };

  const verifyEmailOtp = (otp) => {
    setShowOtp(false);
    console.log()
  }

  return (
    <>
      <div className="profile__profile">
        <div className="profile-card">
          <div className="profile-avatar-container">
            <div
              className={`profile-avatar ${!user?.avatar ? "profile-avatar-gradient" : ""}`}
            >
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name || "Profile"}
                  className="profile-avatar-image"
                />
              ) : (
                <User size={45} />
              )}
            </div>

            <div className="menu-wrapper">
              <Button
                className="menu-avatar-btn"
                onClick={() => setShowMenu(!showMenu)}
              >
                <EllipsisVertical size={14} />
              </Button>

              {showMenu && (
                <div className="avatar-menu" ref={menuRef}>
                  <button
                    className="avatar-menu-item"
                    onClick={() => {
                      handleIconClick();
                      setShowMenu(false);
                    }}
                  >
                    <ImageUp size={16} />
                    <span>Update Profile Photo</span>
                  </button>

                  {user?.avatar && (
                    <button
                      className="avatar-menu-item danger"
                      onClick={() => {
                        handleRemovePhoto();
                        setShowMenu(false);
                      }}
                    >
                      <Trash2 size={16} />
                      <span>Remove Profile Photo</span>
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />

          <div className="profile-info">
            <span>{profile ? profile.name : ""}</span>
            <p>{profile ? profile.email : ""}</p>
          </div>
        </div>
        <div className="contact__form">
          <Input
            id="name"
            name="name"
            label={t("register.form.label.name")}
            placeholder={t("register.form.placeholder.name")}
            value={profile ? profile.name : ""}
            disabled={loading || !enableEditing}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("name") ? errors.name : ""}
          />

          <Input
            id="email"
            name="email"
            label={t("register.form.label.email")}
            placeholder={t("register.form.placeholder.email")}
            value={profile ? profile.email : ""}
            disabled={loading || !enableEditing}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("email") ? errors.email : ""}
            sideButton={!user?.isEmailVerified}
            sideButtonText={t("profile.profile.buttons.verifyemail")}
            onSideButtonClick={sendEmailOtpClick}
            sideButtonLoading={buttonLoading}
            sideButtonDisabled={enableEditing}
          />

          <Input
            id="mobile"
            name="mobile"
            label={t("register.form.label.mobile")}
            placeholder={t("register.form.placeholder.mobile")}
            value={profile ? profile.mobile : ""}
            disabled={loading || !enableEditing}
            onChange={handleChange}
            onBlur={handleBlur}
            error={showError("mobile") ? errors.mobile : ""}
            sideButton={!user?.isMobileVerified}
            sideButtonText={t("profile.profile.buttons.verifymobile")}
            onSideButtonClick={sendOtps}
            sideButtonLoading={buttonLoading}
            sideButtonDisabled={enableEditing}
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
                {t("profile.profile.buttons.edit")}
              </Button>
            )}

            {enableEditing && (
              <>
                <Button
                  loading={loading}
                  disabled={loading}
                  style={{ width: "32%", flex: "none" }}
                  onClick={handleSubmit(updateUserProfile)}
                >
                  {t("profile.profile.buttons.save")}
                </Button>
                <Button
                  disabled={loading}
                  style={{ width: "32%", flex: "none" }}
                  onClick={() => resetProfileForm()}
                >
                  {t("profile.profile.buttons.reset")}
                </Button>
                <Button
                  disabled={loading}
                  onClick={() => cancelEdit()}
                  style={{ width: "32%", flex: "none" }}
                >
                  {t("profile.profile.buttons.cancel")}
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="contact__form" style={{ marginTop: "2rem" }}>
          <h3>Change Password</h3>
          <div className="password-group">
            <Input
              id="current"
              name="current"
              setShowPassword={setShowCurrent}
              showPassword={showCurrent}
              rightIcon={true}
              type={showCurrent ? "text" : "password"}
              label={t("profile.profile.fields.label.current")}
              placeholder={t("profile.profile.fields.placeholder.current")}
              value={passwords.current}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={showPasswordError("current") ? perrors.current : ""}
              disabled={ploading}
              sideButton={true}
              sideButtonText={t("profile.profile.buttons.forgotpassword")}
              onSideButtonClick={sendOtps}
              sideButtonDisabled={ploading}
            />
          </div>
          <div className="password-group">
            <Input
              id="new"
              name="new"
              setShowPassword={setShowNew}
              showPassword={showNew}
              rightIcon={true}
              type={showNew ? "text" : "password"}
              label={t("profile.profile.fields.label.new")}
              placeholder={t("profile.profile.fields.placeholder.new")}
              value={passwords.new}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={showPasswordError("new") ? perrors.new : ""}
              disabled={ploading}
            />
          </div>
          <div className="password-group">
            <Input
              id="confirm"
              name="confirm"
              setShowPassword={setShowConfirm}
              showPassword={showConfirm}
              rightIcon={true}
              type={showConfirm ? "text" : "password"}
              label={t("profile.profile.fields.label.confirm")}
              placeholder={t("profile.profile.fields.placeholder.confirm")}
              value={passwords.confirm}
              onChange={handlePasswordChange}
              onBlur={handlePasswordBlur}
              error={showPasswordError("confirm") ? errors.confirm : ""}
              disabled={ploading}
            />
          </div>
          <div
            className="btn-group"
            style={{ justifyContent: "end", marginTop: "0rem" }}
          >
            <Button
              loading={ploading}
              disabled={ploading}
              style={{ width: "32%", flex: "none" }}
              onClick={handlePasswordSubmit(updateUserPassword)}
            >
              {t("profile.profile.buttons.save")}
            </Button>
            <Button
              disabled={ploading}
              style={{ width: "32%", flex: "none" }}
              onClick={() => resetPasswordForm()}
            >
              {t("profile.profile.buttons.reset")}
            </Button>
          </div>
        </div>
      </div>
      <Loader fullScreen={true} show={loading} />
      <ProfileImagePopup
        imageFile={profileImage}
        showModal={showProfileModal}
        setShowModal={setShowProfileModal}
        changeImage={handleIconClick}
        userId={user._id}
      />
      <VerifyEmailOtp
        open={showOtp}
        emailOtp={emailOtp}
        email={user.email}
        onVerify={(otp) => verifyEmailOtp(otp)}
        onResend={() => sendEmailOtpClick()}
        onCancel={() => {
          setShowOtp(false);
        }}
      />
    </>
  );
}