import WebsiteLayout from "@/layouts/website/WebsiteLayout";
import Home from "@/pages/website/home/Home";
import Contact from "@/pages/website/contact/Contact";

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
    ],
  },
];

export default websiteRoutes;