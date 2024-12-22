import React from "react";
import { FaPaw, FaUser } from "react-icons/fa";
import Navbar from "../../common/Navbar";

const navItems = [
    {
      label: "Shelter Staffs",
      icon: FaUser,
      subItems: [
        {
          label: "Add Shelter Staff",
          route: "add-staff", // Route for sub-item
        },
        {
          label: "Show Shelter Staff",
        },
      ],
    },
    {
      label: "Pets",
      icon: FaPaw,
      subItems: [
        {
          label: "Add Pet",
          route: "add-pet", // Route for sub-item
        },
        {
          label: "Show All Shelter Pets",
          route: "show-all-pets", // Route for sub-item

        },
      ],
    },
  ];

const Shelter = () => {
  return (
    <div className="app-container">
      <Navbar title="Shelter Dashboard" navItems={navItems} />
      <main className="outlet-content">
      <div style={{ flex: 1 }}>
       
        </div>
      </main>
    </div>
  );
};

export default Shelter;
