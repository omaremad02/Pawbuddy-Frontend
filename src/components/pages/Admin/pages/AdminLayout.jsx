import React, { useEffect, useCallback } from "react";
import { CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MiniDrawer from "../../../common/MiniDrawer";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import GroupIcon from "@mui/icons-material/Group";
import useUser from "../../../../utils/hooks/fetchUserHook";

const sections = [
  {
    label: "Section 1",
    items: [
      {
        text: "Add Admin",
        icon: <DomainAddIcon />,
        route: "add-Admin",
      },
      {
        text: "Show All Admins",
        icon: <HomeWorkIcon />,
        route: "show-all-Admins",
      },
      {
        text: "Show All Users",
        icon: <GroupIcon />,
        route: "show-all-users",
      },
    ],
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  // Memoize success and error callbacks
  const onSuccess = useCallback(
    (user) => {
      if (user.role !== "admin") {
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

  // Fetch user with the custom hook
  const { user: admin, loading } = useUser(onSuccess, onError);

  useEffect(() => {
    if (admin) {
      console.log("Fetched admin user:", admin);
      // Additional logic for admin user can go here if needed
    }
  }, [admin]);

  if (loading) {
    // Show loading spinner while fetching user data
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
      title={`Hello ${admin?.username || ""}`}
      sections={sections}
    />
  );
};

export default AdminLayout;
