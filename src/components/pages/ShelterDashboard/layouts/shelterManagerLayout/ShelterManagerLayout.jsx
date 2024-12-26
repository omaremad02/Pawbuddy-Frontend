import DomainAddIcon from "@mui/icons-material/DomainAdd";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PetsIcon from "@mui/icons-material/Pets";
import { Box, CircularProgress } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../../../../utils/hooks/fetchUserHook";
import MiniDrawer from "../../../../common/MiniDrawer";
import { navigateBasedOnRole } from "../../../../../utils/navigation/navigateBasedOnRole";

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

const ShelterManagerLayout = () => {
  const navigate = useNavigate();
  const { user: fetchedUser, loading } = useUser();

  const [shelter, setShelter] = useState(null); // Store user data here

  useEffect(() => {
    if (fetchedUser) {
      // Fetch user data only once and set it to state
      navigateBasedOnRole(fetchedUser,navigate);

      // Handle user authorization based on the role
      if (fetchedUser.role !== "ShelterManager" && fetchedUser.role !== "ShelterStaff") {
        alert("Unauthorized access. Please log in.");
        navigate("/login");
      }
    }
  }, [fetchedUser, navigate]); // Runs only when fetchedUser changes

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

  return (
    <MiniDrawer
      title={`Hello ${fetchedUser?.username || ""}`}
      sections={sections}
    />
  );
};

export default ShelterManagerLayout;
