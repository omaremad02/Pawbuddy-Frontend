import DomainAddIcon from "@mui/icons-material/DomainAdd";
import GroupIcon from '@mui/icons-material/Group';
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import endpoints from "../../../utils/apiEndpoints";
import MiniDrawer from "../../common/MiniDrawer";
  const sections = [
    {
      label: "Shelter Staffs",
      items: [
        {


          text: "Add Shelter Staff",
          route: "add-staff", // Route for sub-item
        

          icon: <DomainAddIcon />,
        },
        {
          text: "Show All Shelters",
          icon: <HomeWorkIcon />,
          route: "show-all-shelters",
        },
  
      
        {
          text: "Add Pet",
          icon: <GroupIcon />,

          route: "add-pet", // Route for sub-item
        },
        {
          text: "Show All Shelter Pets",
          icon: <GroupIcon />,

          route: "show-all-pets", // Route for sub-item

        },
      ],
    },
  ];



  const ShelterLayout = () => {
    const navigate = useNavigate();
    const [shelter, setShelter] = useState(null);
    const [loading, setLoading] = useState(true); // State for loading indicator
  
    useEffect(() => {
      const checkShelter = async () => {
        const token = localStorage.getItem("token");
        console.log('///////');
        
  console.log(token);
  
        if (!token) {
          alert("Token is missing. Please log in.");
          navigate("/login");
          return;
        }
  
        try {
          const response = await fetch(endpoints.getUserWithToken, {
            method: "GET",
            headers: endpoints.getAuthHeader(),

          },);
  
          const data = await response.json();
  
          if (response.ok && ( data.user.role === "ShelterManager" || data.user.role === "ShelterStaff" )) {
            setShelter(data.user);
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
  
      checkShelter();
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
        title={`Hello ${shelter?.username || ""}`}
        sections={sections}
      />
    );
  };
  
  export default ShelterLayout;
  

