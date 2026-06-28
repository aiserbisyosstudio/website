import { useState, useTransition } from "react";
import "./PrivacyPolicy.css";
import { Link, useLocation } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { useTranslation } from "react-i18next";

const sections = [
  {
    title: "1. Information We Collect",
    content: (
      <ul>
        <li>Account information such as your name, email address, or phone number.</li>
        <li>Images, videos, and media files you upload.</li>
        <li>Text prompts used for AI generation and editing.</li>
        <li>Device information, browser type, IP address, and usage statistics.</li>
      </ul>
    ),
  },
  {
    title: "2. How We Use Your Information",
    content: (
      <ul>
        <li>Create AI-generated images and videos.</li>
        <li>Edit, enhance, restore, or transform uploaded media.</li>
        <li>Generate photo collages.</li>
        <li>Analyze images and videos.</li>
        <li>Improve our services and AI models.</li>
        <li>Provide customer support.</li>
      </ul>
    ),
  },
  {
    title: "3. AI Processing",
    content: (
      <ul>
        <li>Image generation</li>
        <li>Video generation</li>
        <li>Background removal</li>
        <li>Object removal</li>
        <li>Style transfer</li>
        <li>Image enhancement</li>
        <li>Image and video analysis</li>
      </ul>
    ),
  },
  {
    title: "4. Uploaded Images & Videos",
    content: (
      <p>
        Uploaded files are processed only to complete your requested task.
        Temporary copies may be stored during processing and automatically
        removed according to our retention policy.
      </p>
    ),
  },
  {
    title: "5. Generated Content",
    content: (
      <p>
        You retain ownership of content you upload. You are responsible for
        ensuring you have the necessary rights to use uploaded media and that
        generated content complies with applicable laws.
      </p>
    ),
  },
  {
    title: "6. Data Security",
    content: (
      <ul>
        <li>Encrypted communication</li>
        <li>Secure cloud infrastructure</li>
        <li>Access controls</li>
        <li>Regular security monitoring</li>
      </ul>
    ),
  },
  {
    title: "7. Data Retention",
    content: (
      <p>
        Data is retained only as long as necessary to provide services, improve
        performance, comply with legal obligations, and maintain account
        functionality.
      </p>
    ),
  },
  {
    title: "8. Sharing Information",
    content: (
      <p>
        We do not sell your personal information. Information may be shared
        with trusted cloud, payment, analytics, and AI service providers when
        required to operate our services.
      </p>
    ),
  },
  {
    title: "9. Your Rights",
    content: (
      <ul>
        <li>Access your data</li>
        <li>Correct inaccurate information</li>
        <li>Delete your account</li>
        <li>Request data portability</li>
        <li>Withdraw consent where applicable</li>
      </ul>
    ),
  },
  {
    title: "10. Contact Us",
    content: (
      <p>
        If you have any questions regarding this Privacy Policy, please contact
        our support team through the application or website.
      </p>
    ),
  },
];

function AccordionItem({ title, children, isOpen, onClick }) {
  return (
    <div className="accordion-item">
      <button className="accordion-header" onClick={onClick}>
        <span>{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      <div className={`accordion-content ${isOpen ? "open" : ""}`}>
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);
  const location = useLocation();
  const from = location?.state?.from;

  return (
    <section className="privacy">
      <Link to={from ? from : "/"} className="back-home">
        <IoArrowBack />
        <span>Back</span>
      </Link>
      <div className="privacy-container">
        <h1>Privacy Policy</h1>

        <p className="last-updated">
          Last Updated: June 27, 2026
        </p>

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
            onClick={() =>
              setOpenIndex(openIndex === index ? -1 : index)
            }
          >
            {section.content}
          </AccordionItem>
        ))}
      </div>
    </section>
  );
}