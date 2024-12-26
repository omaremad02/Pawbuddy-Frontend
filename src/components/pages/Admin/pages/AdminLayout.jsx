import React, { useEffect } from "react";
import { CircularProgress, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MiniDrawer from "../../../common/MiniDrawer";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import GroupIcon from "@mui/icons-material/Group";
import useUser from "../../../../utils/hooks/fetchUserHook";
import { navigateBasedOnRole } from "../../../../utils/navigation/navigateBasedOnRole";

const sections = [
  {
    label: "Section 1",
    items: [
      {
        text: "Add shelter",
        icon: <DomainAddIcon />,
        route: "add-shelter",
      },
      {
        text: "Show All Shelters",
        icon: <HomeWorkIcon />,
        route: "show-all-shelters",
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

  // Success function: navigate based on user role
  const onSuccess = (user) => {
      navigateBasedOnRole(user, navigate);
    
    console.log("Admin successfully fetched:", user);
    // Additional admin-specific operations if needed
  };

  // Error function: handle errors (e.g., show an alert and navigate to login)
  const onError = (error) => {
    console.error("Error fetching admin:", error);
    navigate("/login");
  };

  // Fetch user data from the useUser hook
  const { user: adminData, loading } = useUser(onSuccess, onError);

  useEffect(() => {
    if (adminData) {
      // If user data is available, navigate based on the user's role
      navigateBasedOnRole(adminData, navigate);
    }
  }, [adminData, navigate]); // Only run when adminData changes

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
      title={`Hello ${adminData?.username || ""}`}
      sections={sections}
    />
  );
};

export default AdminLayout;
