import "./Features.css";
import {
  IoImageOutline,
  IoColorWandOutline,
  IoImagesOutline,
  IoSearchOutline,
  IoVideocamOutline,
  IoFilmOutline,
  IoAnalyticsOutline,
  IoArrowForwardCircleOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";
import { FaPenNib, FaDownload } from "react-icons/fa";
import { IoArrowForwardOutline } from "react-icons/io5";
import { IoSparkles } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Features({ t }) {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const features = [
    {
      icon: <IoImageOutline />,
      title: t("home.features.cards.one.heading"),
      description: t("home.features.cards.one.description"),
      tooltip: t("home.features.cards.one.tooltip"),
      color: "#8b5cf6",
      path: "/features/image/create",
    },
    {
      icon: <IoColorWandOutline />,
      title: t("home.features.cards.two.heading"),
      description: t("home.features.cards.two.description"),
      tooltip: t("home.features.cards.two.tooltip"),
      color: "#ec4899",
      path: "/features/image/edit",
    },
    {
      icon: <IoImagesOutline />,
      title: t("home.features.cards.three.heading"),
      description: t("home.features.cards.three.description"),
      tooltip: t("home.features.cards.three.tooltip"),
      color: "#3b82f6",
      path: "/features/image/collage",
    },
    {
      icon: <IoSearchOutline />,
      title: t("home.features.cards.four.heading"),
      description: t("home.features.cards.four.description"),
      tooltip: t("home.features.cards.four.tooltip"),
      color: "#f59e0b",
      path: "/features/image/analyze",
    },
    {
      icon: <IoVideocamOutline />,
      title: t("home.features.cards.five.heading"),
      description: t("home.features.cards.five.description"),
      tooltip: t("home.features.cards.five.tooltip"),
      color: "#10b981",
      path: "/features/video/create",
    },
    {
      icon: <IoFilmOutline />,
      title: t("home.features.cards.six.heading"),
      description: t("home.features.cards.six.description"),
      tooltip: t("home.features.cards.six.tooltip"),
      color: "#ef4444",
      path: "/features/image/edit",
    },
    {
      icon: <IoAnalyticsOutline />,
      title: t("home.features.cards.seven.heading"),
      description: t("home.features.cards.seven.description"),
      tooltip: t("home.features.cards.seven.tooltip"),
      color: "#6366f1",
      path: "/features/image/analyze",
    },
  ];

  const navigateTo = (pageUrl) => {
    if(!isLoggedIn) return;
    navigate(pageUrl, { replace: true });
  };

  return (
    <>
      <section className="features-section">
        <p className="section-tag">{t("home.features.heading")}</p>

        <h2>{t("home.features.title")}</h2>

        <p className="section-desc">{t("home.features.description")}</p>

        <div className="features-grid">
          {features.map((item, index) => (
            <div
              className="feature-cards"
              key={index}
              onClick={() => navigateTo(item.path)}
            >
              <button className="info-icon">
                <IoInformationCircleOutline size={20} />
                <span className="tooltip">{item.tooltip}</span>
              </button>
              <div
                className="feature-icon"
                style={{
                  color: item.color,
                  background: `${item.color}15`,
                }}
              >
                {item.icon}
              </div>

              <h3>{item.title}</h3>

              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="steps-section">
        <p className="section-tag">{t("home.works.title")}</p>

        <h2>{t("home.works.heading")}</h2>

        <div className="steps-wrapper">
          <div className="step">
            <div className="step-number">
              {t("home.works.cards.one.number")}
            </div>

            <div className="step-icon">
              <FaPenNib />
            </div>

            <div>
              <h4>{t("home.works.cards.one.heading")}</h4>
              <p>{t("home.works.cards.one.description")}</p>
            </div>
          </div>

          <IoArrowForwardOutline className="step-arrow" />

          <div className="step">
            <div className="step-number">
              {t("home.works.cards.two.number")}
            </div>

            <div className="step-icon">
              <IoSparkles />
            </div>

            <div>
              <h4>{t("home.works.cards.two.heading")}</h4>
              <p>{t("home.works.cards.two.description")}</p>
            </div>
          </div>

          <IoArrowForwardOutline className="step-arrow" />

          <div className="step">
            <div className="step-number">
              {t("home.works.cards.three.number")}
            </div>

            <div className="step-icon">
              <FaDownload />
            </div>

            <div>
              <h4>{t("home.works.cards.three.heading")}</h4>
              <p>{t("home.works.cards.three.description")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}