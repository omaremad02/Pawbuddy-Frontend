import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import Navbar from "../../../common/Navbar";
import endpoints from "../../../../utils/apiEndpoints";

const navItems = [
  {
    label: "Shelters",
    icon: FaUser,
    subItems: [
      {
        label: "Add AdminLayout Staff",
        route: "add-Shelter", // Route for sub-item
      },
    ],
  },
];

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token"); // Get token from local storage

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
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });

        const data = await response.json();

        if (response.ok && data.user.role === "Admin") {
          console.log("User is an admin. Proceeding to AdminLayout.");
        } else {
          alert("Invalid token or unauthorized access. Please log in again.");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        alert("An error occurred. Please log in again.");
        navigate("/login");
      }
    };

    checkAdmin();
  }, [navigate]);

  return (
    <div className="app-container">
      <Navbar title="AdminLayout Dashboard" navItems={navItems} />
      <main className="outlet-content">
        <div style={{ flex: 1 }}></div>
      </main>
    </div>
  );
};

export default AdminLayout;
