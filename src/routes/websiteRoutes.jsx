import WebsiteLayout from "@/layouts/website/WebsiteLayout";
import Home from "@/pages/website/home/Home";
import Contact from "@/pages/website/contact/Contact";
import TermsConditions from "@/pages/website/terms/TermsConditions";
import PrivacyPolicy from "@/pages/website/privacy/PrivacyPolicy";
import Blogs from "@/pages/website/blog/Blogs";
import Profile from "@/pages/website/profile/Profile";
import ProtectedRoute from "../utils/ProtectedRoute";
import CreateImage from "../pages/website/features/image/create/CreateImage";
import TransactionHistory from "../pages/website/transaction-history/TransactionHistory";
import EditImage from "../pages/website/features/image/edit/EditImage";
import ImageCollage from "../pages/website/features/image/collage/ImageCollage";

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
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "transaction-history",
            element: <TransactionHistory />,
          },
          {
            path: "features",
            children: [
              {
                path: "image",
                children: [
                  {
                    path: "create",
                    element: <CreateImage />,
                  },
                  {
                    path: "edit",
                    element: <EditImage />,
                  },
                  {
                    path: "collage",
                    element: <ImageCollage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export default websiteRoutes;