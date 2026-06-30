import "./UserPlan.css";
import Button from "@/components/common/button/Button";
import {
  Image,
  Video,
  Sparkles,
  WandSparkles,
  LayoutGrid,
  ScanSearch,
} from "lucide-react";

export default function UserPlan({ user, plan, usage, t }) {
  const currentPlan = plan.planId.code;
  const plans = t("profile.plan.plans", { returnObjects: true });

  const formatDate = (expiryDate) => {
    return new Date(expiryDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatNumber = (num) => new Intl.NumberFormat("en-IN").format(num);

  return (
    <>
      <div className="profile__plan">
        <div className="plan-header">
          <div>
            {currentPlan === "new" ? (
              <>
                <h3 style={{ marginBottom: "1rem" }}>
                  {t("profile.plan.details.new.title")}
                </h3>
                <span>
                  {t("profile.plan.details.new.heading")}
                </span>
              </>
            ) : (
              <>
                <h3>{plans[plan.planId.code]}</h3>
                <span
                  className={`plan-status ${
                    plan.status.toLowerCase() === "expired"
                      ? "expired"
                      : "active"
                  }`}
                >
                  {t(`profile.plan.details.plan.status.${plan.status}`)}
                </span>
              </>
            )}
          </div>
          {currentPlan === "new" ? (
            <Button style={{ width: "20rem" }} className="upgrade-btn">
              {t("profile.plan.buttons.start")}
            </Button>
          ) : (
            <Button style={{ width: "10rem" }} className="upgrade-btn">
              {t("profile.plan.buttons.upgrade")}
            </Button>
          )}
        </div>
        {currentPlan !== "new" && (
          <>
            <div className="plan-info">
              <div className="info-item">
                <span>{t("profile.plan.details.plan.labels.plan.expires")}</span>
                <strong>{formatDate(plan.expiresAt)}</strong>
              </div>

              <div className="info-item">
                <span>{t("profile.plan.details.plan.labels.plan.purchased")}</span>
                <strong>
                  {formatNumber(plan.purchasedCredits - plan.remainingCredits)}{" "}
                  Credits
                </strong>
              </div>

              <div className="info-item">
                <span>{t("profile.plan.details.plan.labels.plan.used")}</span>
                <strong>5,800 Credits</strong>
              </div>

              <div className="info-item">
                <span>{t("profile.plan.details.plan.labels.plan.remaining")}</span>
                <strong>{formatNumber(plan.remainingCredits)} Credits</strong>
              </div>
            </div>
            <div className="stats-container">
              {/* Images */}
              <div className="stats-card">
                <div className="stats-header">
                  <Image size={22} />
                  <h3>{t("profile.plan.details.plan.labels.category.images")}</h3>
                </div>

                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">
                      <Sparkles size={16} />
                      {t("profile.plan.details.plan.labels.stats.created")}
                    </span>
                    <span className="stat-value">524</span>
                  </div>

                  <div className="stat-item">
                    <span className="stat-label">
                      <WandSparkles size={16} />
                      {t("profile.plan.details.plan.labels.stats.edited")}
                    </span>
                    <span className="stat-value">187</span>
                  </div>

                  <div className="stat-item">
                    <span className="stat-label">
                      <LayoutGrid size={16} />
                      {t("profile.plan.details.plan.labels.stats.collages")}
                    </span>
                    <span className="stat-value">41</span>
                  </div>

                  <div className="stat-item">
                    <span className="stat-label">
                      <ScanSearch size={16} />
                      {t("profile.plan.details.plan.labels.stats.analyzed")}
                    </span>
                    <span className="stat-value">302</span>
                  </div>
                </div>
              </div>

              {/* Videos */}
              <div className="stats-card">
                <div className="stats-header">
                  <Video size={22} />
                  <h3>{t("profile.plan.details.plan.labels.category.videos")}</h3>
                </div>

                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">
                      <Sparkles size={16} />
                      {t("profile.plan.details.plan.labels.stats.created")}
                    </span>
                    <span className="stat-value">58</span>
                  </div>

                  <div className="stat-item">
                    <span className="stat-label">
                      <WandSparkles size={16} />
                      {t("profile.plan.details.plan.labels.stats.edited")}
                    </span>
                    <span className="stat-value">19</span>
                  </div>

                  <div className="stat-item full-width">
                    <span className="stat-label">
                      <ScanSearch size={16} />
                      {t("profile.plan.details.plan.labels.stats.analyzed")}
                    </span>
                    <span className="stat-value">96</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}