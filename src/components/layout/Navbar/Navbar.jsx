import { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import logo from "../../../assets/images/logos/app-logo.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ConfirmPopup from "@/components/common/confirm/ConfirmPopup";
import Loader from "@/components/common/loader/Loader";
import { logout as logoutService } from "@/services/authService";
import { logout as logoutAction } from "@/redux/slices/authSlice";
import PaymentModal from "@/components/common/payment/PaymentModal";
import { toast } from "react-toastify";
import { createPlanOrder } from "@/services/orderService";
import { IoGlobeOutline, IoChevronDownOutline, IoCheckmarkOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const languages = [
    { code: "en", label: "English" },
    { code: "kn", label: "ಕನ್ನಡ" },
    { code: "hi", label: "हिंदी" },
  ];

function Navbar() {
  const user = useSelector((state) => state.auth.user);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isMobile = window.innerWidth <= 768;
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const profileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [loggedinUser, setLoggedinUser] = useState(user);
  const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn);
  const [showPayment, setShowPayment] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const language = languages.filter(lang => lang.code === localStorage.getItem("language"))[0] || languages[0]
  const [selectedLanguage, setSelectedLanguage] = useState(language);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  const navItems = [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.features"), path: "/features" },
    { name: t("navigation.help"), path: "/help-support" },
    { name: t("navigation.contact"), path: "/contact" },
    { name: t("navigation.login"), path: "/login", auth: !isAuthenticated },
  ];

  useEffect(() => {
    document.documentElement.lang = selectedLanguage.code;
  }, [selectedLanguage])

  useEffect(() => {
    setLoggedinUser(user);
    setIsAuthenticated(isLoggedIn);
  }, [isLoggedIn, user]);

  useEffect(() => {
    setShowProfileMenu(false);
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      setShowProfileMenu(false);
      setShowConfirm(false);
      setLoading(true);
      const response = await logoutService({ userId: loggedinUser._id });
      setLoading(false);
      dispatch(logout());
      setIsAuthenticated(false);
      setLoggedinUser(null);
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleLanguageChange = (language) => {
    document.documentElement.lang = language.code;
    i18n.changeLanguage(language.code);
    localStorage.setItem("language", language.code);
    setSelectedLanguage(language);
    setIsLanguageMenuOpen(false);
    setIsOpen(false);
  };

  return (
    <>
      <header className="navbar">
        <div className="navbar__container">
          {/* Brand */}
          <div className="navbar__brand" onClick={() => navigate("/")}>
            <img src={logo} alt="Logo" className="navbar__logo" />
            <span className="navbar__title">{t("navigation.appName")}</span>
          </div>

          {/* Nav */}
          <div className="navbar-content">
            {/* Mobile Toggle */}
            <button
              className="navbar__toggle"
              onClick={() => {
                setShowProfileMenu(false);
                setIsOpen(!isOpen);
              }}
            >
              ☰
            </button>

            <nav className={`navbar__nav ${isOpen ? "active" : ""}`}>
              {navItems.map((item) => {
                if (item.auth === false) return null;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === "/"}
                    className={({ isActive }) =>
                      `navbar__link ${isActive ? "active" : ""}`
                    }
                  >
                    {item.name}
                  </NavLink>
                );
              })}
              <div className="language-dropdown">
                <button
                  type="button"
                  className="language-pill navbar__link"
                  aria-label={`Selected language: ${selectedLanguage}`}
                  aria-haspopup="menu"
                  aria-expanded={isLanguageMenuOpen}
                  onClick={toggleLanguageMenu}
                >
                  <IoGlobeOutline className="language-pill__icon" />
                  <span className="language-pill__text">
                    {selectedLanguage.label}
                  </span>
                  <IoChevronDownOutline className="language-pill__arrow" />
                </button>

                {isLanguageMenuOpen && (
                  <div className="language-dropdown__menu" role="menu">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        type="button"
                        role="menuitem"
                        className={`language-dropdown__item ${
                          selectedLanguage.code === language.code
                            ? "active"
                            : ""
                        }`}
                        onClick={() => handleLanguageChange(language)}
                      >
                        <span>{language.label}</span>

                        {selectedLanguage.code === language.code && (
                          <IoCheckmarkOutline size={18} />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            {isAuthenticated && (
              <div className="navbar__profile-wrapper" ref={profileRef}>
                <div
                  className="navbar__profile"
                  onClick={() => {
                    setIsOpen(false);
                    setShowProfileMenu(!showProfileMenu);
                  }}
                >
                  {user?.profile_url ? (
                    <img
                      src={user.profile_url}
                      alt={user.name}
                      className="navbar__profile-image"
                    />
                  ) : (
                    user?.name?.charAt(0)?.toUpperCase() || "U"
                  )}
                </div>

                {showProfileMenu && (
                  <div className="navbar__profile-menu">
                    <button
                      className="navbar__profile-item"
                      onClick={() => {
                        navigate("/profile");
                        setShowProfileMenu(false);
                      }}
                    >
                      👤 Profile
                    </button>

                    <button
                      className="navbar__profile-item"
                      onClick={() => setShowPayment(true)}
                    >
                      💎 Buy Credits
                    </button>

                    <button
                      className="navbar__profile-item navbar__logout"
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowConfirm(true);
                      }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
      <ConfirmPopup
        isOpen={showConfirm}
        message="Are you sure you want to logout?"
        onConfirm={handleLogout}
        onCancel={() => setShowConfirm(false)}
      />
      <Loader fullScreen={true} show={loading} />
      <PaymentModal
        isOpen={showPayment}
        user={user}
        onClose={() => setShowPayment(false)}
      />
    </>
  );
}

export default Navbar;