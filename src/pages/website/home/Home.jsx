import usePageTitle from "../../../hooks/usePageTitle";
import HeroSection from "../../../components/sections/hero/HeroSection";
import Features from "../../../components/sections/features/Features";
import { useTranslation } from "react-i18next";
import Gallery from "../../../components/sections/gallery/Gallery";
import PricingPlans from "../../../components/sections/pricing/PricingPlans";
import { useSelector } from "react-redux";
import PremiumCard from "../../../components/sections/pcard/PremiumCard";

const Home = () => {
  const { t } = useTranslation();
  usePageTitle(t("home.pageTitle"));
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      <HeroSection t={t}/>
      <Features t={t} />
      <Gallery t={t}/>
      <PricingPlans t={t} />
      {isLoggedIn && (
        <PremiumCard />
      )}
    </>
  );
};

export default Home;