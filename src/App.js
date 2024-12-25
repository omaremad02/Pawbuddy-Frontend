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
import Shelter from "./components/pages/ShelterDashboard/ShelterLayout";
import { AddStaff } from "./components/pages/ShelterDashboard/staff/AddStaff";
import ShowAllPetsPage from "./components/pages/ShelterDashboard/pets/ShowAllPetsPage";
import AddPetPage from "./components/pages/ShelterDashboard/pets/AddPetPage";
import EditPetPage from "./components/pages/ShelterDashboard/pets/EditPetPage";
import AddShelterPage from "./components/pages/Admin/pages/AddShelterPage";
import ShelterTable from "./components/pages/Admin/pages/showAllShelters";
import ShowAllShelters from "./components/pages/Admin/pages/showAllShelters";
import { CssBaseline } from "@mui/material";
import { UpdateShelter } from "./components/pages/Admin/pages/UpdateShelter";

const App = () => {

 
  return (
<>
<CssBaseline/>

    <AnimatePresence mode="wait" initial={false}>
      <Routes >
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/apply" element={<ApplyPage />} />
        <Route path="/Admin" element={<AdminLayout />} />

        <Route path="/Admin" element={<AdminLayout />}>
          <Route index element={<ShowAllShelters />} /> {/* Default */}
          <Route path="add-shelter" element={<AddShelterPage />} />
          <Route path="show-all-shelters" element={<ShowAllShelters />} />
          <Route path="update-shelter/:shelterId" element={<UpdateShelter />} />

        </Route>

      <Route path="/shelter" element={<Shelter />}>
          <Route index element={<ShowAllPetsPage />} /> {/* Default */}
          <Route path="show-all-pets" element={<ShowAllPetsPage />} />
          <Route path="add-pet" element={<AddPetPage />} />
          <Route path="edit-pet/:petId" element={<EditPetPage />} />

          <Route path="add-staff" element={<AddStaff />} />
        </Route>
      </Routes>


    </AnimatePresence>
    </>
  );
};

export default App;
