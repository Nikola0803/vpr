import type { RouteObject } from "react-router-dom";
import { Navigate } from "react-router-dom";
import NotFound from "@/pages/NotFound";
import Home from "@/pages/home/page";
import Vendors from "@/pages/vendors/page";
import VendorProfile from "@/pages/vendor/page";
import Pricing from "@/pages/pricing/page";
import Seo from "@/pages/seo/page";
import Migration from "@/pages/migration/page";
import Verification from "@/pages/verification/page";
import Certification from "@/pages/certification/page";
import ReviewGuidelines from "@/pages/reviewGuidelines/page";
import Blog from "@/pages/blog/page";
import BlogPost from "@/pages/blog/post/page";
import ClaimVendor from "@/pages/claim/page";
import SignIn from "@/pages/auth/SignIn";
import Register from "@/pages/auth/Register";
import Dashboard from "@/pages/dashboard/page";
import RateReview from "@/pages/rate/page";
import ReviewModeration from "@/pages/admin/page";
import CoaVerifier from "@/pages/coaVerifier/page";
import ScamAlerts from "@/pages/scamAlerts/page";
import Sponsorship from "@/pages/sponsorship/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/vendors",
    element: <Vendors />,
  },
  {
    path: "/vendors/:slug",
    element: <VendorProfile />,
  },
  {
    path: "/pricing",
    element: <Pricing />,
  },
  {
    path: "/seo",
    element: <Seo />,
  },
  {
    path: "/migration",
    element: <Migration />,
  },
  {
    path: "/verification",
    element: <Verification />,
  },
  {
    path: "/coa-verifier",
    element: <CoaVerifier />,
  },
  {
    path: "/peptide-scams",
    element: <ScamAlerts />,
  },
  {
    path: "/scam-alerts",
    element: <Navigate to="/peptide-scams" replace />,
  },
  {
    path: "/certification",
    element: <Certification />,
  },
  {
    path: "/review-guidelines",
    element: <ReviewGuidelines />,
  },
  {
    path: "/blog",
    element: <Blog />,
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
  },
  {
    path: "/claim",
    element: <ClaimVendor />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/rate/:orderHash",
    element: <RateReview />,
  },
  {
    path: "/write-review",
    element: <RateReview />,
  },
  {
    path: "/admin/reviews",
    element: <ReviewModeration />,
  },
  {
    path: "/sponsorship",
    element: <Sponsorship />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;