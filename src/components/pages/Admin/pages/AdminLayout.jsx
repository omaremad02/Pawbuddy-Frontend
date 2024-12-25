import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { CircularProgress, Box } from "@mui/material";
import MiniDrawer from "../../../common/MiniDrawer";
import DomainAddIcon from "@mui/icons-material/DomainAdd";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import endpoints from "../../../../utils/apiEndpoints";

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
    ],
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true); // State for loading indicator

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Token is missing. Please log in.");
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(endpoints.getUserWithToken, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok && data.user.role === "Admin") {
          setAdminData(data.user);
        } else {
          alert("Invalid token or unauthorized access. Please log in again.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/login");
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    checkAdmin();
  }, [navigate]);

  if (loading) {
    // Show loading indicator while fetching data
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
