import "./Profile.css";
import usePageTitle from "../../../hooks/usePageTitle";
import { useSelector } from "react-redux";
import UserProfile from "../../../components/sections/uprofile/UserProfile";
import UserPlan from "../../../components/sections/uplan/UserPlan";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation();
  usePageTitle(t("profile.pageTitle"));
  const user = useSelector((state) => state.user.profile);
  const plan = useSelector((state) => state.user.plan);
  const usage = useSelector((state) => state.user.usage);

  return (
    <section className="profile">
      <div className="profile__card">
        <div className="profile__container">
          <UserProfile user={user} t={t}/>
          <UserPlan user={user} plan={plan} usage={usage} t={t}/>
        </div>
      </div>
    </section>
  );
}