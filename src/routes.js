import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./components/MainLayout/Loading";
import MainLayout from "./components/MainLayout/index";
import NonAuthLayout from './components/MainLayout/nonAuthLayout';
import ErrorPage from "./components/Pages/ErrorPage";

// auth
import Signin from "./components/Auth//SignInPage";
import ForgotPassword from "./components/Auth/ForgotPassword";
import Register from "./components/Auth/Register";

// non-auth 
const About = React.lazy(() => import("./components/Pages/About"));

// auth-user
const Profile = React.lazy(() => import("./components/InnerApp/Profile/ProfileManager"));
const Dashboard = React.lazy(() => import("./components/InnerApp/Dashboard/Dashboard"));
const ShareZone = React.lazy(() => import("./components/InnerApp/ShareZone/sharezoneManager"))

const AllRoutes = (isAuthUser) => {
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // window.scrollTo(0, 0);
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Adjust the timeout as needed
  }, [pathname]);

  if (loading) {
    return <Loading />;
  }


  return (
    <>
      <ToastContainer theme="light" />
      <Routes>
        {isAuthUser ? (
          <>
            <Route path="/" element={<MainLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="profile" element={<Profile />} />
              <Route path="sharezone" element={< ShareZone />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/" element={<About />} />
            <Route path="/" element={<NonAuthLayout />}>
              <Route path="signin" element={<Signin />} />
              <Route path="register" element={<Register />} />
              <Route path="forgotpassword" element={<ForgotPassword />} />
              <Route path="*" element={<ErrorPage />} />
            </Route>
          </>
        )}
      </Routes>
    </>
  );
};

export default AllRoutes;
