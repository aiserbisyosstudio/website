import { useState } from "react";
import "./TermsConditions.css";
import { IoArrowBack } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import usePageTitle from "../../../hooks/usePageTitle";

function AccordionItem({ title, children, isOpen, onClick }) {
  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={onClick}>
        <span>{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        {children.type === "refund" ? (
          <>
            <p>{children.intro}</p>

            <h4>{children.eligibleTitle}</h4>
            <ul>
              {children.eligible.map((_, i) => (
                <li key={i}>{_}</li>
              ))}
            </ul>

            <h4>{children.notEligibleTitle}</h4>
            <ul>
              {children.notEligible.map((_, i) => (
                <li key={i}>{_}</li>
              ))}
            </ul>
          </>
        ) : (
          <p>{children.content}</p>
        )}
      </div>
    </div>
  );
}

export default function TermsConditions() {
  usePageTitle("Terms & Conditions | AISerbisyosStudios");
  const { t } = useTranslation();
  const sections = t("terms.sections", { returnObjects: true });
  const [openIndex, setOpenIndex] = useState(0);
  const location = useLocation();
  const from = location.state.from;

  return (
    <section className="privacy">
      <Link to={from ? from : "/"} className="back-home">
        <IoArrowBack />
        <span>Back</span>
      </Link>
      <div className="privacy-container">
        <h1>Privacy Policy</h1>

        <p className="last-updated">Last Updated: June 27, 2026</p>

        <p className="intro">
          Your privacy is important to us. This policy explains how we collect,
          use, store, and protect your information while using our AI-powered
          image and video generation, editing, collage, and analysis services.
        </p>

        {sections.map((section, index) => (
          <AccordionItem
            key={index}
            title={section.title}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
          >
            {section}
          </AccordionItem>
        ))}
      </div>
    </section>
  );
}