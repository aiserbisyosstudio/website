import { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import logo from "../../../assets/images/logos/app-logo.png";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ConfirmPopup from "@/components/common/confirm/ConfirmPopup";
import Loader from "@/components/common/loader/Loader";
import { logout as logoutService } from "@/services/authService";
import { logout as logoutAction } from "@/redux/slices/authSlice";
import { clearUser } from "@/redux/slices/userSlice"
import PaymentModal from "@/components/common/payment/PaymentModal";
import { toast } from "react-toastify";
import { createPlanOrder } from "@/services/orderService";
import {
  IoGlobeOutline,
  IoChevronDownOutline,
  IoCheckmarkOutline,
} from "react-icons/io5";
import { useTranslation } from "react-i18next";
import { updateLanguage } from "@/services/userService";

const languages = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "kn", label: "ಕನ್ನಡ" },
];

function Navbar() {
  const user = useSelector((state) => state.user.profile);
  const userPlan = useSelector((state) => state.user.userPlan);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const location = useLocation();
  const hideNavbarRoutes = [
    "/auth/login",
    "/auth/register",
    "/terms-conditions",
    "/privary-policy",
    "/blog",
    "/profile"
  ];
  const isAuthRoute = hideNavbarRoutes.includes(location.pathname);

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
  const language =
    languages.filter(
      (lang) => lang.code === localStorage.getItem("language"),
    )[0] || languages[0];
  const [selectedLanguage, setSelectedLanguage] = useState(language);

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
    { name: t("navigation.login"), path: "/auth", auth: !isAuthenticated },
  ];

  useEffect(() => {
    document.documentElement.lang = selectedLanguage.code;
  }, [selectedLanguage]);

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
    setIsOpen(false);
    setShowProfileMenu(false);
    setIsLanguageMenuOpen((prev) => !prev);
  };

  const handleLogout = async () => {
    try {
      setShowProfileMenu(false);
      setShowConfirm(false);
      setLoading(true);
      const response = await logoutService({ userId: loggedinUser._id });
      setLoading(false);
      dispatch(logoutAction());
      dispatch(clearUser());
      setIsAuthenticated(false);
      setLoggedinUser(null);
      navigate("/");
    } catch (error) {
    }
  };

  const handleLanguageChange = async (language) => {
    document.documentElement.lang = language.code;
    i18n.changeLanguage(language.code);
    localStorage.setItem("language", language.code);
    setSelectedLanguage(language);
    setIsLanguageMenuOpen(false);
    setIsOpen(false);
    if( isAuthenticated ) {
      try {
        const userId = loggedinUser._id;
        const code = language.code;
        const label = language.label;
        const response = await updateLanguage({userId, code, label});
      } catch(error) {
        console.log(error);
      }
    }
  };

  const showPaymentModal = () => {
    if( userPlan && userPlan.status == 'active' ) {
      setShowProfileMenu(false);
      toast.info("There is already an active plan");
    } else {
      setShowPayment(true);
    }
  }

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
            {!isAuthRoute && (
              <>
                <button
                  className="navbar__toggle"
                  onClick={() => {
                    setIsLanguageMenuOpen(false);
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
                </nav>
              </>
            )}

            <div className="language-dropdown">
              <button
                type="button"
                className="language-pill"
                aria-label={`Selected language: ${selectedLanguage}`}
                aria-haspopup="menu"
                aria-expanded={isLanguageMenuOpen}
                onClick={toggleLanguageMenu}
              >
                <IoGlobeOutline className="language-pill__icon" />
                <span className="language-pill__text">
                  {selectedLanguage.code.toUpperCase()}
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
                        selectedLanguage.code === language.code ? "active" : ""
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

            {isAuthenticated && (
              <div className="navbar__profile-wrapper" ref={profileRef}>
                <div
                  className="navbar__profile"
                  onClick={() => {
                    setIsLanguageMenuOpen(false);
                    setIsOpen(false);
                    setShowProfileMenu(!showProfileMenu);
                  }}
                >
                  {loggedinUser?.profile_url ? (
                    <img
                      src={loggedinUser.profile_url}
                      alt={loggedinUser.name}
                      className="navbar__profile-image"
                    />
                  ) : (
                    loggedinUser?.name?.charAt(0)?.toUpperCase() || "U"
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
                      👤 {t("navigation.profile.profile")}
                    </button>

                    <button
                      className="navbar__profile-item"
                      onClick={() => showPaymentModal()}
                    >
                      💎 {t("navigation.profile.buycredits")}
                    </button>

                    <button
                      className="navbar__profile-item navbar__logout"
                      onClick={() => {
                        setShowProfileMenu(false);
                        setShowConfirm(true);
                      }}
                    >
                      🚪 {t("navigation.profile.logout")}
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
        message={t("navigation.logout.title")}
        confirmText={t("navigation.logout.confirm")}
        cancelText={t("navigation.logout.cancel")}
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