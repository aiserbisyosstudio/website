import "./Contact.css";
import { useTranslation } from "react-i18next";
import usePageTitle from "../../../hooks/usePageTitle";
import { useState } from "react";
import useContactValidation from "../../../hooks/useContactValidation";
import validateContact from "../../../utils/validations/validateContact";
import { MdTurnRight, MdTurnLeft } from "react-icons/md";
import Button from "@/components/common/button/Button";
import Input from "@/components/common/input/Input";
import { toast } from "react-toastify";
import { createNewContact } from "@/services/contactService";
import FAQSection from "../../../components/sections/faq/FAQSection";

const Contact = () => {
  const { t, i18n } = useTranslation();
  usePageTitle(t("contact.title"));

  const [loading, setLoading] = useState(false);

  const initialState = {
    name: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
    from: "Website",
  };
  const {
    contact,
    errors,
    touched,
    submitted,
    handleChange,
    handleBlur,
    handleSubmit,
    clearContactForm,
  } = useContactValidation(initialState, validateContact, t);

  const submitContact = async () => {
    try {
      setLoading(true);
      const response = await createNewContact(contact);
      setLoading(false);
      if (response.success) {
        clearContactForm();
        toast.success(
          "Message sent successfully. Our team will get back to you soon!",
        );
      } else {
        toast.error("Failed to send message!");
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
      toast.error("Failed to send message!");
    }
  };

  const showError = (field) => (touched[field] || submitted) && errors[field];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(submitContact)(e);
    }
  };

  return (
    <>
      <section className="contact">
        <div className="contact__card">
          <div className="contact__container">
            {/* Map Section */}
            <div className="contact__map">
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=16.814909,75.909926"
                target="_blank"
                rel="noopener noreferrer"
                className="contact__directionBtn"
              >
                <MdTurnRight size={24} /> {t("contact.buttons.getdirection")}
              </a>
              <iframe
                title="Location Map"
                src={`https://maps.google.com/maps?q=16.81503430955684,75.90987044396597&z=15&output=embed&hl=${i18n.language}`}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Form Section */}
            <div className="contact__content">
              <h2 className="contact__title">{t("contact.contact.title")}</h2>

              <p className="contact__description">
                {t("contact.contact.description")}
              </p>

              <div className="contact__form">
                <Input
                  id="name"
                  name="name"
                  label={t("contact.contact.label.name")}
                  placeholder={t("contact.contact.placeholder.name")}
                  value={contact.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  error={showError("name") ? errors.name : ""}
                  disabled={loading}
                />

                <Input
                  id="email"
                  name="email"
                  label={t("contact.contact.label.email")}
                  placeholder={t("contact.contact.placeholder.email")}
                  value={contact.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  error={showError("email") ? errors.email : ""}
                  disabled={loading}
                />

                <Input
                  id="mobile"
                  name="mobile"
                  label={t("contact.contact.label.mobile")}
                  placeholder={t("contact.contact.placeholder.mobile")}
                  maxLength="10"
                  value={contact.mobile}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  error={showError("mobile") ? errors.mobile : ""}
                  disabled={loading}
                />

                <Input
                  id="name"
                  name="subject"
                  label={t("contact.contact.label.subject")}
                  placeholder={t("contact.contact.placeholder.subject")}
                  value={contact.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  onKeyDown={handleKeyDown}
                  error={showError("subject") ? errors.subject : ""}
                  disabled={loading}
                />

                <Input
                  textarea
                  id="message"
                  name="message"
                  label={t("contact.contact.label.message")}
                  placeholder={t("contact.contact.placeholder.message")}
                  rows={6}
                  value={contact.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={showError("message") ? errors.message : ""}
                  disabled={loading}
                />

                <div className="btn-group">
                  <Button
                    loading={loading}
                    onClick={handleSubmit(submitContact)}
                  >
                    {t("contact.buttons.sendmessage")}
                  </Button>
                  <Button onClick={clearContactForm}>
                    {t("contact.buttons.clear")}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSection t={t}/>
    </>
  );
};

export default Contact;