import { Link, useLocation } from "react-router-dom";
import "./Footer.css";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <h3 className="footer-logo">{t("footer.company.name")}</h3>
          <p className="footer-description">{t("footer.company.description")}</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>{t("footer.quickLinks.title")}</h4>
          <ul>
            <li>
              <Link to="/">{t("footer.quickLinks.home")}</Link>
            </li>
            <li>
              <Link to="/about">{t("footer.quickLinks.about")}</Link>
            </li>
            <li>
              <Link to="/contact">{t("footer.quickLinks.contact")}</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="footer-section">
          <h4>{t("footer.resources.title")}</h4>
          <ul>
            <li>
              <Link to="/blogs">{t("footer.resources.blogs")}</Link>
            </li>
            <li>
              <Link to="/privacy-policy"state={{ from: location.pathname }}>{t("footer.resources.privacyPolicy")}</Link>
            </li>
            <li>
              <Link to="/terms-conditions" state={{ from: location.pathname }}>{t("footer.resources.termsConditions")}</Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="contact-section">
          <h4>{t("footer.contact.title")}</h4>
          <p>{t("footer.contact.labels.email")}: {t("footer.contact.values.email")}</p>
          <p>{t("footer.contact.labels.phone")}: {t("footer.contact.values.phone")}</p>
          <p>{t("footer.contact.labels.place")}: {t("footer.contact.values.place")}</p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-left">
          <p>© {currentYear} {t("footer.bottom.copyright")}</p>
        </div>

        <div className="footer-right">
          <p>{t("footer.bottom.credits")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;