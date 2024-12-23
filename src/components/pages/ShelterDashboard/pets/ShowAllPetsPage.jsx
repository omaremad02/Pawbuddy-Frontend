import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import Button from "../../../common/Button";
import Table from "../../../common/Table";
import styles from "./css/ShowAllPetsPage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Axios for making API calls
import Spinner from "../../../common/Spinner";
import endpoints from "../../../../utils/apiEndpoints";

const ShowAllPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true); // For tracking the loading state

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.post(endpoints.GET_PETS, {
          shelterId: "60d21b4667d0d8992e610c86",
        });
        if (response.data.pets) {
          const processedPets = response.data.pets.map((pet) => ({
            ...pet,
            age: calculateAge(pet.dob),
          }));
          setPets(processedPets);
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return "Unknown";
    const birthDate = new Date(dob);
    if (isNaN(birthDate)) return "Invalid Date";

    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    if (today.getDate() < birthDate.getDate()) {
      months -= 1;
      if (months < 0) {
        years -= 1;
        months += 12;
      }
    }

    if (years > 0 && months > 0) return `${years} years, ${months} months`;
    if (years > 0) return `${years} years`;
    if (months > 0) return `${months} months`;

    return "Less than a month";
  };

  const confirmAndDeletePet = async (id) => {
    const petName = pets.find((pet) => pet.petId === id)?.name || "this pet";
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: `Do you really want to delete ${petName}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.post(`${endpoints.DELETE_PET}`,{
            petId:id
          });
          if (response.status === 200) {
            Swal.fire("Deleted!", `${petName} has been deleted.`, "success");
            setPets(pets.filter((pet) => pet.petId !== id));
          }
        } catch (error) {
          console.error("Error deleting pet:", error);
          Swal.fire("Error!", "An error occurred while deleting the pet.", "error");
        }
      }
    });
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Type", accessor: "type" },
    { header: "Breed", accessor: "breed" },
    { header: "House Trained", accessor: "houseTrained" },
    { header: "Age", accessor: "age" },
    {
      header: "Actions",
      accessor: "actions",
      Cell: (pet) => (
        <>
          <Button
            label="Edit"
            onClick={() => {
              navigate(`/shelter/edit-pet/${pet.petId}`);
            }}
            variant="secondary"
          />
          <Button
            label="Delete"
            onClick={() => confirmAndDeletePet(pet.petId)}
            variant="danger"
          />
        </>
      ),
    },
  ];

  return (
    <div className={styles.pageContainer}>
      <div className={styles.contentContainer}>
        <div className={styles.tableHeader}>
          <h2>All Pets</h2>
          <Button
            label="Add Pet"
            onClick={() => navigate("/shelter/add-pet")}
            variant="primary"
          />
        </div>
        {loading ? (
          <Spinner /> // Show a loader while data is being fetched
        ) : (
          <Table data={pets} columns={columns} />
        )}
      </div>
    </div>
  );
};

export default ShowAllPetsPage;
