import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import endpoints from "../../../../utils/apiEndpoints";

const ShowAllPetsPage = () => {
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(endpoints.GET_PETS, {
          headers: endpoints.getAuthHeader(),

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

  const handleDelete = (id) => {
    const petName = pets.find((pet) => pet.petId === id)?.name || "this pet";

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
          const response = await axios.post(`${endpoints.DELETE_PET}`, {
            petId: id,
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

  const handleEdit = (id) => {
    navigate(`/shelter/edit-pet/${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Pets List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Pets Table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Type</strong></TableCell>
              <TableCell><strong>Breed</strong></TableCell>
              <TableCell><strong>House Trained</strong></TableCell>
              <TableCell><strong>Age</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pets
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((pet) => (
                <TableRow key={pet.petId} hover>
                  <TableCell>{pet.name}</TableCell>
                  <TableCell>{pet.type}</TableCell>
                  <TableCell>{pet.breed}</TableCell>
                  <TableCell>{pet.houseTrained ? "Yes" : "No"}</TableCell>
                  <TableCell>{pet.age}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEdit(pet.petId)}
                      variant="contained"
                      color="primary"
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(pet.petId)}
                      variant="contained"
                      color="secondary"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pets.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ShowAllPetsPage;
