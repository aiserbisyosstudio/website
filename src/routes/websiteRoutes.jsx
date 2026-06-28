import WebsiteLayout from "@/layouts/website/WebsiteLayout";
import Home from "@/pages/website/home/Home";
import Contact from "@/pages/website/contact/Contact";
import TermsConditions from "../pages/website/terms/TermsConditions";
import PrivacyPolicy from "../pages/website/privacy/PrivacyPolicy";
import Blogs from "../pages/website/blog/Blogs";

const websiteRoutes = [
  {
    path: "/",
    element: <WebsiteLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
    ],
  },
];

export default websiteRoutes;