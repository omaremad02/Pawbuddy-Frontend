import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage/HomePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import ApplyPage from "./components/pages/ApplyPage/ApplyPage";
//import Dashboard from "./components/pages/Dashboard/Dashboard"; // Placeholder if needed

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
