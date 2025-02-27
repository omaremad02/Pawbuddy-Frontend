import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes } from "react-router-dom";

import { CssBaseline } from "@mui/material";
import AddShelterPage from "./components/pages/Admin/pages/AddShelterPage";
import AddClinicPage from "./components/pages/Admin/pages/AddClinicPage";
import AdminLayout from "./components/pages/Admin/pages/AdminLayout";
import ShowAllShelters from "./components/pages/Admin/pages/showAllShelters";
import ShowAllClinics from "./components/pages/Admin/pages/showAllClinics";
import ShowAllUsers from "./components/pages/Admin/pages/showAllUsers";
import { UpdateShelter } from "./components/pages/Admin/pages/UpdateShelter";
import UpdateClinic from "./components/pages/Admin/pages/UpdateClinic";
import UpdateUser from "./components/pages/Admin/pages/UpdateUser";
import ApplyPage from "./components/pages/ApplyPage/ApplyPage";
import HomePage from "./components/pages/HomePage/HomePage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import ShelterLayout from "./components/pages/ShelterDashboard/layouts/shelterStaffLayout/ShelterStaffLayout";
import AddPetPage from "./components/pages/ShelterDashboard/pets/AddPetPage";
import EditPetPage from "./components/pages/ShelterDashboard/pets/EditPetPage";
import ShowAllPetsPage from "./components/pages/ShelterDashboard/pets/ShowAllPetsPage";
import AddStaffPage from "./components/pages/ShelterDashboard/staff/AddStaff";
import ShowAllShelterStaff from "./components/pages/ShelterDashboard/staff/showAllShelterStaff";
import ShelterManagerLayout from "./components/pages/ShelterDashboard/layouts/shelterManagerLayout/ShelterManagerLayout";
import ShelterStaffLayout from "./components/pages/ShelterDashboard/layouts/shelterStaffLayout/ShelterStaffLayout";
import UpdateShelterStaffPage from "./components/pages/ShelterDashboard/staff/updateStaffPage";
import ShowAdoptionRequestsPage from "./components/pages/ShelterDashboard/adoption/showAllAdoptionRequestsPage";

const App = () => {
  return (
    <>
      <CssBaseline />

      <AnimatePresence mode="wait" initial={false}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="/Admin" element={<AdminLayout />}>
            <Route index element={<ShowAllShelters />} /> {/* Default */}
            <Route path="add-shelter" element={<AddShelterPage />} />
            <Route path="show-all-shelters" element={<ShowAllShelters />} />
            <Route path="update-shelter/:shelterId" element={<UpdateShelter />} />
            {/* Clinics */}
            <Route path="add-clinic" element={<AddClinicPage />} />
            <Route path="show-all-clinics" element={<ShowAllClinics />} />
            <Route path="update-clinic/:clinicId" element={<UpdateClinic />} />
            {/* Users */}
            <Route path="show-all-users" element={<ShowAllUsers />} />
            <Route path="update-user/:userId" element={<UpdateUser />} />
          </Route>

          <Route path="/shelterManager" element={<ShelterManagerLayout />}>
            <Route index element={<ShowAllPetsPage />} /> {/* Default */}
            <Route path="show-all-pets" element={<ShowAllPetsPage />} />
            <Route path="add-pet" element={<AddPetPage />} />
            <Route path="edit-pet/:petId" element={<EditPetPage />} />
            <Route path="add-shelter-staff" element={<AddStaffPage />} />
            <Route path="show-all-shelter-staff" element={<ShowAllShelterStaff />} />
            <Route path="update-shelter-staff/:shelterStaffId" element={<UpdateShelterStaffPage />} />
            <Route path="get-all-adoption-requests" element={<ShowAdoptionRequestsPage />} />
          </Route>

          <Route path="/shelterStaff" element={<ShelterStaffLayout />}>
            <Route index element={<ShowAllPetsPage />} /> {/* Default */}
            <Route path="show-all-pets" element={<ShowAllPetsPage />} />
            <Route path="add-pet" element={<AddPetPage />} />
            <Route path="edit-pet/:petId" element={<EditPetPage />} />
          </Route>
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
