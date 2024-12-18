import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "./components/pages/HomePage/HomePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import ApplyPage from "./components/pages/ApplyPage/ApplyPage";
// import Dashboard from "./components/pages/Dashboard/Dashboard"; // Placeholder if needed

const App = () => {
  const location = useLocation(); // Get the current location for animation

  return (
    <AnimatePresence mode="wait" initial={false}> {/* Enables exit animations */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </AnimatePresence>
  );
};

const RootApp = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default RootApp;
