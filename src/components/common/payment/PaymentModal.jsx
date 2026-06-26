import "./PaymentModal.css";
import { useEffect, useState } from "react";
import upiIcon from "../../../assets/icons/upi.png";
import cardIcon from "../../../assets/icons/card.png";
import bankIcon from "../../../assets/icons/bank.png";
import { toast } from "react-toastify";
import useRazorpay from "../../../hooks/useRazorpay";
import Button from "@/components/common/button/Button";

function PaymentModal({ isOpen, user, onClose }) {
  const { startPayment, loading } = useRazorpay();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      id: "101",
      title: "Silver",
      plan: "300 Credits",
      price: "299",
    },
    {
      id: "102",
      title: "Gold",
      plan: "800 Credits",
      price: "999",
    },
    {
      id: "103",
      title: "Platinum",
      plan: "1500 Credits",
      price: "1999",
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setSelectedPlan(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProceed = () => {
    if (!selectedPlan) {
      toast.error("Please select a plan");
      return;
    }

    startPayment({
      amount: parseInt(selectedPlan.price),
      userId: user._id,
      credits: parseInt(selectedPlan.plan.replaceAll("credits", "").trim()),
      name: "AISerbisyoStudio",
      description: "Purchase Credits",

      prefill: {
        name: user.name,
        email: user.email,
        contact: user.mobile,
      },

      onSuccess: (data) => {
        onClose();
        toast.success("Payment successful");
        console.log("Payment verified", data);
      },

      onFailure: (error) => {
        toast.error(error.message || "Failed to make payemnt");
      },
    });
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-header">
          <h2>Buy Credits</h2>

          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="wallet-balance">
          <span className="balance-text">Available Credits</span>
          <span className="balance-text">{user.credits}</span>
        </div>

        {/* Plans */}
        <div className="plans-section">
          <h3>Select Plan</h3>

          <div className="plans-grid">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`plan-card ${
                  selectedPlan?.id === plan.id ? "selected" : ""
                }`}
                onClick={() => {
                  selectedPlan && selectedPlan.id == plan.id
                    ? setSelectedPlan(null)
                    : setSelectedPlan(plan);
                }}
              >
                <h4>{plan.title}</h4>

                <div className="plan-details">
                  <span>{plan.credits} Credits</span>
                  <span>₹{plan.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          className="proceed-btn"
          style={{ marginTop: "1rem", marginBottom: ".5rem" }}
        >
          Transaction History
        </button>
        <Button loading={loading} onClick={() => handleProceed()}>
          Proceed to Pay
        </Button>
      </div>
    </div>
  );
}

export default PaymentModal;