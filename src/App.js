import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Routes, Route } from "react-router-dom";

import Spinner from "./components/common/Spinner"; // Import Spinner component

import ApplyPage from "./components/pages/ApplyPage/ApplyPage";
import HomePage from "./components/pages/HomePage/HomePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import AdminLayout from "./components/pages/Admin/pages/AdminLayout";
import useCheckUserRole from "./utils/useCheckUserRole";

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Define the proceed function to navigate based on user role
  const proceed = (user) => {
    if (user.role === "Admin") {
      navigate("/Admin");
    } else {
      navigate("/");
    }
  };

  const { loading } = useCheckUserRole(proceed);

  if (loading) {
    return <Spinner />; // Show spinner while loading
  }

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/Admin" element={<AdminLayout />} />
      </Routes>
    </AnimatePresence>
  );
};

export default App;
