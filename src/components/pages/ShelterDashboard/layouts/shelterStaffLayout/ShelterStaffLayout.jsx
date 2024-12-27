import DomainAddIcon from "@mui/icons-material/DomainAdd";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PetsIcon from "@mui/icons-material/Pets";
import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../../../../utils/hooks/fetchUserHook";
import MiniDrawer from "../../../../common/MiniDrawer";

const sections = [
  {
    label: "Shelter Staffs",
    items: [
    
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

  // Memoize success and error callbacks
  const onSuccess = useCallback(
    (user) => {
      if (user.role !== "ShelterStaff") {
        alert("Unauthorized access. Please log in.");
        navigate("/login");
      }
      console.log("User successfully fetched:", user);
    },
    [navigate]
  );

  const onError = useCallback(
    (error) => {
      console.error("Error occurred:", error);
      alert("An error occurred. Redirecting to login.");
      navigate("/login");
    },
    [navigate]
  );

  // Call the hook at the top level
  const { user: shelter, loading } = useUser(onSuccess, onError);

  useEffect(() => {
    if (shelter) {
      console.log("Fetched shelter user:", shelter);
      // Additional logic for shelter user can go here if needed
    }
  }, [shelter]);

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
