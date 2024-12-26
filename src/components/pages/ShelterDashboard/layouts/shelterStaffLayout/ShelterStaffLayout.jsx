import DomainAddIcon from "@mui/icons-material/DomainAdd";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PetsIcon from '@mui/icons-material/Pets';
import { Box, CircularProgress } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../../../../utils/hooks/fetchUserHook";
import MiniDrawer from "../../../../common/MiniDrawer";
const sections = [
  {
    label: "Shelter Staffs",
    items: [
      {
        text: "Add Shelter Staff",
        route: "add-staff",
        icon: <DomainAddIcon />,
      },
      {
        text: "Show All Pets",
        icon: <HomeWorkIcon />,
        route: "show-all-pets",
      },
      {
        text: "Add Pet",
        icon: <PetsIcon />,
        route: "add-pet",
      },
     
    ],
  },
];

const ShelterStaffLayout = () => {
  const navigate = useNavigate();

  const onSuccess = (user) => {
    if (user.role !== "ShelterManager" && user.role !== "ShelterStaff") {
      alert("Unauthorized access. Please log in.");
      navigate("/login");
    }
    console.log("User successfully fetched:", user);
    // Additional operations based on user role
  };

  const onError = (error) => {
    console.error("Error occurred:", error);
    navigate("/login");

  };

  const { user: shelter, loading } = useUser(onSuccess, onError);

  if (loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  
console.log(shelter);

  return (
    <MiniDrawer
      title={`Hello ${shelter?.username || ""}`}
      sections={sections}
    />
  );
};

export default ShelterStaffLayout;
