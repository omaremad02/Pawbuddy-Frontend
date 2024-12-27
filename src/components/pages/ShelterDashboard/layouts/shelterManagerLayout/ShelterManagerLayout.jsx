import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import PetsIcon from "@mui/icons-material/Pets";
import MiniDrawer from "../../../../common/MiniDrawer";
import useUser from "../../../../../utils/hooks/fetchUserHook";

const sections = [
  {
    label: "Shelter Staffs",
    items: [
      { text: "Show All Pets", icon: <HomeWorkIcon />, route: "show-all-pets" },
      { text: "Add Pet", icon: <PetsIcon />, route: "add-pet" },
      {
        text: "Show All Shelter Staff",
        icon: <HomeWorkIcon />,
        route: "show-all-shelter-staff",
      },
      {
        text: "Add Shelter Staff",
        icon: <HomeWorkIcon />,
        route: "add-shelter-staff",
      },

      {
        text: "Get All Adoption Requests",
        icon: <HomeWorkIcon />,
        route: "get-all-adoption-requests",
      },
    ],
  },
];

const ShelterManagerLayout = () => {
  const navigate = useNavigate();

  // Memoize the success and error callbacks to prevent re-creation
  const onSuccess = useCallback(
    (user) => {
      if (user.role !== "ShelterManager") {
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

  return (
    <MiniDrawer
      title={`Hello ${shelter?.username || ""}`}
      sections={sections}
    />
  );
};

export default ShelterManagerLayout;
