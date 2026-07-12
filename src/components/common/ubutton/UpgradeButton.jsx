import PaymentModal from "@/components/common/payment/PaymentModal";
import { useState } from "react";

const UpgradeButton = ({
  user,
  action = () => {},
  className = "",
  currentPlan,
  children,
}) => {
  const [showPayment, setShowPayment] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setShowPayment(true);
        }}
        className={className}
      >
        {children}
      </button>
      {showPayment && (
        <PaymentModal
          currentPlan={currentPlan}
          setShowPayment={setShowPayment}
          isOpen={showPayment}
          user={user}
        />
      )}
    </>
  );
};

export default UpgradeButton;