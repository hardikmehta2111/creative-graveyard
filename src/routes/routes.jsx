import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import PrivateRoutes from "./PrivateRoutes";

// Pages
import Home from "../components/pages/Home";
import Explore from "../components/pages/Explore";
import AboutUs from "../components/pages/AboutUs";
import Profile from "../components/pages/Profile";

// Auth
import Login from "../components/auth/Login";
import Signup from "../components/auth/Signup";
import ForgotPassword from "../components/auth/ForgotPassword";

// Profile (nested)
import ProfileLayout from "../components/profile/ProfileLayout";
import EditProfile from "../components/profile/EditProfile";

// Posts
import CreatePost from "../components/Posts/CreatePost";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // 🔹 Public Routes
      { index: true, element: <Home /> },
      { path: "about", element: <AboutUs /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "forgot-password", element: <ForgotPassword /> },

      // 🔹 Protected Routes
      {
        path: "explore",
        element: (
          <PrivateRoutes>
            <Explore />
          </PrivateRoutes>
        ),
      },

      {
        path: "create-post",
        element: (
          <PrivateRoutes>
            <CreatePost />
          </PrivateRoutes>
        ),
      },

      // 🔥 PROFILE (NESTED ROUTES)
      {
        path: "profile",
        element: (
          <PrivateRoutes>
            <ProfileLayout />
          </PrivateRoutes>
        ),
        children: [
          {
            index: true,
            element: <Profile />, // /profile
          },
          {
            path: "edit-profile",
            element: <EditProfile />, // /profile/edit-profile
          },
        ],
      },
    ],
  },
]);

export default routes;
