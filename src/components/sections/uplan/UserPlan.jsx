import "./UserPlan.css";
import {
  Image,
  Video,
  Sparkles,
  WandSparkles,
  LayoutGrid,
  ScanSearch,
  MessageSquareText,
} from "lucide-react";
import UpgradeButton from "../../common/ubutton/UpgradeButton";
import { getUserProfileStatistics } from "@/services/statisticsService";
import { useState } from "react";

export default function UserPlan({ user, plan, usage, t }) {
  const currentPlan = plan.hasOwnProperty("planId")
    ? plan.planId.code
    : plan.planName;
  const plans = t("profile.plan.plans", { returnObjects: true });
  const [statistics, setStatistics] = useState([]);

  const getUserProfileStats = async () => {
    try {
      const response = await getUserProfileStatistics({ userId: user._id });
      const flattened = response.stats.reduce((acc, item) => {
        acc[`${item._id.type}_${item._id.operation}`] = item.count;
        return acc;
      }, {});
      console.log(flattened);
      setStatistics(flattened);
    } catch (error) {
      setStatistics([]);
    }
  };

  useState(() => {
    getUserProfileStats();
  }, []);

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
                <span>{t("profile.plan.details.new.heading")}</span>
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
          <UpgradeButton
            style={{ width: "30rem" }}
            user={user}
            className="upgrade-btn"
            currentPlan={currentPlan || ""}
          >
            {t("profile.plan.buttons.upgrade")}
          </UpgradeButton>
        </div>
        {currentPlan !== "new" && (
          <>
            <div className="plan-info">
              <div className="info-item">
                <span>
                  {t("profile.plan.details.plan.labels.plan.expires")}
                </span>
                <strong>{formatDate(plan.expiresAt)}</strong>
              </div>

              <div className="info-item">
                <span>
                  {t("profile.plan.details.plan.labels.plan.purchased")}
                </span>
                <strong>
                  {formatNumber(plan.purchasedCredits)}{" "}
                  Credits
                </strong>
              </div>

              <div className="info-item">
                <span>{t("profile.plan.details.plan.labels.plan.used")}</span>
                <strong>{formatNumber(plan.purchasedCredits - plan.remainingCredits)} Credits</strong>
              </div>

              <div className="info-item">
                <span>
                  {t("profile.plan.details.plan.labels.plan.remaining")}
                </span>
                <strong>{formatNumber(plan.remainingCredits)} Credits</strong>
              </div>
            </div>
            <div className="stats-container">
              {/* Images */}
              <div className="stats-card">
                <div className="stats-header">
                  <Image size={22} />
                  <h3>
                    {t("profile.plan.details.plan.labels.category.images")}
                  </h3>
                </div>

                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">
                      <Sparkles size={16} />
                      {t("profile.plan.details.plan.labels.stats.created")}
                    </span>
                    <span className="stat-value">{statistics["image_create"] ?? 0}</span>
                  </div>

                  <div className="stat-item">
                    <span className="stat-label">
                      <WandSparkles size={16} />
                      {t("profile.plan.details.plan.labels.stats.edited")}
                    </span>
                    <span className="stat-value">{statistics["image_edit"] ?? 0}</span>
                  </div>

                  <div className="stat-item">
                    <span className="stat-label">
                      <LayoutGrid size={16} />
                      {t("profile.plan.details.plan.labels.stats.collages")}
                    </span>
                    <span className="stat-value">{statistics["image_collage"] ?? 0}</span>
                  </div>

                  <div className="stat-item">
                    <span className="stat-label">
                      <ScanSearch size={16} />
                      {t("profile.plan.details.plan.labels.stats.analyzed")}
                    </span>
                    <span className="stat-value">{statistics["image_analyze"] ?? 0}</span>
                  </div>
                </div>
              </div>

              {/* Videos */}
              <div className="stats-card">
                <div className="stats-header">
                  <Video size={22} />
                  <h3>
                    {t("profile.plan.details.plan.labels.category.videos")}
                  </h3>
                </div>

                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">
                      <Sparkles size={16} />
                      {t("profile.plan.details.plan.labels.stats.created")}
                    </span>
                    <span className="stat-value">{statistics["video_create"] ?? 0}</span>
                  </div>

                  <div className="stat-item">
                    <span className="stat-label">
                      <WandSparkles size={16} />
                      {t("profile.plan.details.plan.labels.stats.edited")}
                    </span>
                    <span className="stat-value">{statistics["video_edit"] ?? 0}</span>
                  </div>

                  <div className="stat-item full-width">
                    <span className="stat-label">
                      <ScanSearch size={16} />
                      {t("profile.plan.details.plan.labels.stats.analyzed")}
                    </span>
                    <span className="stat-value">{statistics["video_analyze"] ?? 0}</span>
                  </div>
                </div>
              </div>

              {/* Prompts */}
              <div className="stats-card">
                <div className="stats-header">
                  <MessageSquareText size={22} />
                  <h3>Prompts</h3>
                </div>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">
                      <Sparkles size={16} />
                      Created
                    </span>
                    <span className="stat-value">{statistics["prompt_create"] ?? 0}</span>
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