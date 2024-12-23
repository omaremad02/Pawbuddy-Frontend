import { AnimatePresence } from "framer-motion";
import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import ApplyPage from "./components/pages/ApplyPage/ApplyPage";
import HomePage from "./components/pages/HomePage/HomePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import HelpPage from "./components/pages/ShelterDashboard/HelpPage";
import SettingsPage from "./components/pages/ShelterDashboard/SettingsPage";
import Shelter from "./components/pages/ShelterDashboard/ShelterLayout";
import { AddStaff } from "./components/pages/ShelterDashboard/staff/AddStaff";
import ShowAllPetsPage from "./components/pages/ShelterDashboard/pets/ShowAllPetsPage";
import AddPetPage from "./components/pages/ShelterDashboard/pets/AddPetPage";
import EditPetPage from "./components/pages/ShelterDashboard/pets/EditPetPage";

const App = () => {
  const location = useLocation(); // Get the current location for animation

  return (
    <AnimatePresence mode="wait" initial={false}>
      {" "}
      {/* Enables exit animations */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />

        <Route path="/shelter" element={<Shelter />}>
          <Route index element={<ShowAllPetsPage />} /> {/* Default */}
          <Route path="show-all-pets" element={<ShowAllPetsPage />} />
          <Route path="add-pet" element={<AddPetPage />} />
          <Route path="edit-pet/:petId" element={<EditPetPage />} />

          <Route path="add-staff" element={<AddStaff />} />
        </Route>
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
