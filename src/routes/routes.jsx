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
// import ProfilePosts from "../components/profile/ProfilePosts";
import EditPhoto from "../components/profile/EditPhoto";
import ChangePassword from "../components/auth/ChangePassword";
// import PostCard from "../components/Posts/PostCard";
import PostDetails from "../components/Posts/PostDetails";
import EditPost from "../components/Posts/EditPost";
// import ProfileAvatar from "../components/profile/ProfileAvatar";

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
      {
        path: `post/:postId`,
        element: <PostDetails />
      },
      {
        path: "post/:postId/edit",
        element: (
          <PrivateRoutes>
            <EditPost />
          </PrivateRoutes>
        ),
      },

      // 🔥 PROFILE (NESTED ROUTES)
      {
        path: "/profile",
        element: (
          <PrivateRoutes>
            <ProfileLayout />
          </PrivateRoutes>
        ),
        children: [
          {
            index: true,
            element: <Profile />,        // My Grave
          },
          {
            path: "edit",
            element: <EditProfile />,    // Edit Epitaph
          },
          {
            path: "edit-photo",
            element: <EditPhoto />,      // Change Portrait
          },
          {
            path: "/profile/change-password",
            element: <ChangePassword />,
          },
        ],
      }


    ],
  },
]);

export default routes;
