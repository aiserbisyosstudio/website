import './HeroSection.css'
import heroImage from "../../../assets/images/background/hero.png";
import thumbnail1 from "../../../assets/icons/thumbnails/preview1.jpg";
import thumbnail2 from "../../../assets/icons/thumbnails/preview2.jpeg";
import thumbnail3 from "../../../assets/icons/thumbnails/preview3.jpg";
import thumbnail4 from "../../../assets/icons/thumbnails/preview4.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import {
  FaMagic,
  FaCut,
  FaPlay,
  FaImage,
  FaVideo,
  FaUsers,
  FaRocket,
} from "react-icons/fa";
import { IoArrowForward } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

const HeroSection = ({ t }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    usersCount: 0,
    imageCount: 0,
    videoCount: 0,
  });
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-badge">✨ {t("home.hero.badge")}</div>
        <h1 className="hero-title">
          {t("home.hero.title.main")}
          <br />
          <span>{t("home.hero.title.middle")}</span>
          <br />
          {t("home.hero.title.end")}
        </h1>
        <p className="hero-description">{t("home.hero.description")}</p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={() => navigate("/features")}>
            {t("home.hero.buttons.startCreating")} <IoArrowForward className="btn-icon" />
          </button>

          <button className="btn-secondary">
            <FaPlay className="btn-icon" /> {t("home.hero.buttons.watchDemo")}
          </button>
        </div>

        <div className="hero-stats">
          <div className="stat-item">
            <div className="stat-items-header">
              <FaImage className="stat-icon image-icon" />
              <h3>{stats?.imageCount}</h3>
            </div>
            <p>{t("home.hero.stats.imagesGenerated")}</p>
          </div>

          <div className="stat-item">
            <div className="stat-items-header">
              <FaVideo className="stat-icon video-icon" />
              <h3>{stats?.videoCount}</h3>
            </div>
            <p>{t("home.hero.stats.videosGenerated")}</p>
          </div>

          <div className="stat-item">
            <div className="stat-items-header">
              <FaUsers className="stat-icon users-icon" />
              <h3>{stats?.usersCount}</h3>
            </div>
            <p>{t("home.hero.stats.activeCreators")}</p>
          </div>

          <div className="stat-item">
            <div className="stat-items-header">
              <FaRocket className="stat-icon uptime-icon" />
              <h3>99.9%</h3>
            </div>
            <p>{t("home.hero.stats.platformUptime")}</p>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <div className="hero-img-wrapper">
          <div className="feature-card card-1">
            <div className="card-header">
              <div className="card-icon purple">
                <FontAwesomeIcon icon={faImage} />
              </div>
              <div>
                <h4>{t("home.hero.cards.one.heading")}</h4>
                <p>{t("home.hero.cards.one.description")}</p>
              </div>
            </div>

            <div className="card-preview">
              <img src={thumbnail1} alt="" />
              <div className="play-btn">▶</div>
            </div>
          </div>

          <div className="feature-card card-2">
            <div className="card-header">
              <div className="card-icon blue">
                <FontAwesomeIcon icon={faVideo} />
              </div>
              <div>
                <h4>{t("home.hero.cards.two.heading")}</h4>
                <p>{t("home.hero.cards.two.description")}</p>
              </div>
            </div>

            <div className="card-preview">
              <img src={thumbnail2} alt="" />
              <div className="play-btn">▶</div>
            </div>
          </div>

          <div className="feature-card card-3">
            <div className="card-header">
              <div className="card-icon green">
                <FaMagic />
              </div>
              <div>
                <h4>{t("home.hero.cards.three.heading")}</h4>
                <p>{t("home.hero.cards.three.description")}</p>
              </div>
            </div>

            <div className="card-preview">
              <img src={thumbnail3} alt="" />
            </div>
          </div>

          <div className="feature-card card-4">
            <div className="card-header">
              <div className="card-icon pink">
                <FaCut />
              </div>
              <div>
                <h4>{t("home.hero.cards.four.heading")}</h4>
                <p>{t("home.hero.cards.four.description")}</p>
              </div>
            </div>

            <div className="card-preview">
              <img src={thumbnail4} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;