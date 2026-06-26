import usePageTitle from "../../../hooks/usePageTitle";
import HeroSection from "../../../components/sections/hero/HeroSection";
import Features from "../../../components/sections/features/Features";
import { useTranslation } from "react-i18next";
import Gallery from "../../../components/sections/gallery/Gallery";
import PricingPlans from "../../../components/sections/pricing/PricingPlans";

const Home = () => {
  const { t } = useTranslation();
  usePageTitle(t("home.pageTitle"));

  return (
    <>
      <HeroSection t={t}/>
      <Features t={t}/>
      <Gallery t={t}/>
      <PricingPlans t={t} />
    </>
  );
};

export default Home;