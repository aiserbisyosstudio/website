import "./VerifyEmailOtp.css";
import { useEffect, useRef, useState } from "react";
import Button from "@/components/common/button/Button";
import { toast } from "react-toastify";

export default function VerifyEmailOtp({
  t,
  open,
  emailOtp,
  email,
  onVerify,
  onResend,
  onCancel,
}) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    setOtp(["", "", "", "", "", ""]);
    if (!open) return;

    setTimer(60);

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [open]);

  const inputs = useRef([]);

  if (!open) return null;

  const resetOtpFields = () => {
    setOtp(["", "", "", "", "", ""]);
  };

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pasted) return;

    const newOtp = [...otp];

    pasted.split("").forEach((digit, i) => {
      newOtp[i] = digit;
    });

    setOtp(newOtp);

    inputs.current[Math.min(pasted.length, 5)].focus();
  };

  const verifyOTP = () => {
    if (otp.join("") === "") {
      toast.error("Please enter 6 digit otp");
      return;
    }
    if (parseInt(emailOtp) === parseInt(otp.join(""))) {
      onVerify(otp.join(""));
    } else {
      toast.error("Entered otp is not valid");
    }
  };

  const formatTime = (value) => String(value).padStart(2, "0");

  return (
    <div className="otp-modal-overlay">
      <div className="otp-modal">
        <h2>{t("profile.profile.emailverify.title")}</h2>

        <p>
          {t("profile.profile.emailverify.subtitle")}
          <br />
          <strong>{email}</strong>
        </p>

        <div className="otp-inputs" onPaste={handlePaste}>
          {otp.map((digit, index) => (
            <input
              placeholder="0"
              key={index}
              ref={(el) => (inputs.current[index] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              autoComplete="one-time-code"
              maxLength={1}
            />
          ))}
        </div>

        <div className="otp-buttons">
          <Button onClick={verifyOTP}>
            {t("profile.profile.emailverify.buttons.verify")}
          </Button>

          <Button
            onClick={() => {
              resetOtpFields();
              onResend();
            }}
            disabled={timer > 0}
          >
            {timer > 0
              ? `${t("profile.profile.emailverify.buttons.resend")} (${formatTime(timer)})`
              : t("profile.profile.emailverify.buttons.resend")}
          </Button>

          <Button onClick={onCancel}>
            {t("profile.profile.emailverify.buttons.cancel")}
          </Button>
        </div>
      </div>
    </div>
  );
}