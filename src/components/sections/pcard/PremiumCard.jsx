import { useDispatch, useSelector } from "react-redux";
import "./PremiumCard.css";
import { IoTrophy, IoChevronForward, IoClose } from "react-icons/io5";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Popup from "../../common/popup/Popup";
import { IoCheckmarkOutline } from "react-icons/io5";
import Loader from "@/components/common/loader/Loader";
import { toast } from "react-toastify";
import { updatePlan } from "@/services/userService";
import { setUserPlan, updateUser } from "../../../redux/slices/userSlice";

function PremiumCard() {
  const user = useSelector((state) => state.user.profile);
  const { t } = useTranslation();
  const [showPopup, setShowPopup] = useState(false);
  const [showCard, setShowCard] = useState(true);
  const [loading, setLoading] = useState(false);
  const credits = user.availableCredits;
  const dispatch = useDispatch();

  const membershipStatus = user?.memberShipStatus;
  const title = t(`home.card.${membershipStatus}.title`);
  const subTitle = t(`home.card.${membershipStatus}.subtitle`, {
    credits,
  });
  const button = t(`home.card.${membershipStatus}.button`);

  const freeTrialPlan = {
    features: t("home.plan.cards.one.features", { returnObjects: true }),
    price: t("home.plan.cards.one.price"),
    period: t("home.plan.cards.one.period"),
  };

  const updateUserPlan = async() => {
    try {
      setShowPopup(false);
      setLoading(true);

      const response = await updatePlan({userId: user._id, code: 'free'});
      setLoading(false);
      console.log(response);
      if( response.success ) {
        dispatch(setUserPlan(response.userPlan));
        dispatch(updateUser({
          memberShipStatus: 'trial',
          availableCredits: response.userPlan.remainingCredits
        }));
        toast.success("Plan activated successfully");
      } else {
        toast.error("Failed to activat plan");
      }
    } catch(error) {
      console.log(error);
      setLoading(false);
      toast.error(error.response?.data?.message || "Failed to activat plan");
    }
  }

  const openPopup = () => {
    if( membershipStatus == 'new' ) {
      setShowPopup(true);
    }
  }

  return (
    <>
      {showCard && (
        <div className="premium-card">
        <button
          className="premium-card__close"
          onClick={() => setShowCard(false)}
          aria-label="Close"
        >
          <IoClose size={20} />
        </button>
        <div className="premium-card__icon">
          <IoTrophy size={24} />
        </div>

        <div className="premium-card__content">
          <h3 className="premium-card__title">{title}</h3>

          <p className="premium-card__subtitle">{subTitle}</p>
        </div>

        <button
          className="premium-card__button"
          onClick={() => openPopup()}
        >
          {button}
          <IoChevronForward size={18} />
        </button>
      </div>
      )}
      <Popup
        open={showPopup}
        secondaryButton={t("home.plan.close")}
        primaryButton={button}
        onSecondaryClick={() => setShowPopup(false)}
        onPrimaryClick={() => updateUserPlan()}
      >
        <div style={{ padding: "2rem" }}>
          <h3>Below are the benefits of Free Trial</h3>
          <div className="plan-price" style={{ marginBottom: "0rem" }}>
            {freeTrialPlan.price}
            <span>{freeTrialPlan.period}</span>
          </div>
          <ul className="plan-features">
            {freeTrialPlan.features.map((feature, i) => (
              <li key={i}>
                <IoCheckmarkOutline />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </Popup>
      <Loader fullScreen={true} show={loading} />
    </>
  );
}

export default PremiumCard;