import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Paper,
  Typography,
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import endpoints from "../../../../utils/apiEndpoints";
import Swal from "sweetalert2"; // Import SweetAlert2

const ShowAllClinics = () => {
  const [clinics, setClinics] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const navigate = useNavigate();

  // Fetch clinics from API
  const fetchClinics = async () => {
    try {
      const response = await axios.get(endpoints.GET_ALL_CLINICS, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setClinics(response.data.clinics);
    } catch (error) {
      console.error("Error fetching clinics:", error);
    }
  };

  useEffect(() => {
    fetchClinics(); // Initial fetch
  }, []);

  // Handle delete clinic with SweetAlert confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(endpoints.DELETE_CLINIC(id), {
            headers: endpoints.getAuthHeader(),
          });
          Swal.fire("Deleted!", "The clinic has been deleted.", "success");
          fetchClinics(); // Refresh clinics list after deletion
        } catch (error) {
          console.error("Error deleting clinic:", error);
          Swal.fire(
            "Error!",
            "Something went wrong. Please try again.",
            "error"
          );
        }
      }
    });
  };

  // Handle edit clinic
  const handleEdit = (id) => {
    navigate(`/admin/update-clinic/${id}`);
  };

  // Handle change page in pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Clinics List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Clinics Table">
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>Clinic Name</strong>
              </TableCell>
              <TableCell>
                <strong>Contact Number</strong>
              </TableCell>
              <TableCell>
                <strong>Address</strong>
              </TableCell>
              <TableCell>
                <strong>Operation Hours</strong>
              </TableCell>
              <TableCell>
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clinics
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((clinic) => (
                <TableRow key={clinic._id} hover>
                  <TableCell>{clinic.clinicName}</TableCell>
                  <TableCell>{clinic.contactNumber}</TableCell>
                  <TableCell>{clinic.address}</TableCell>
                  <TableCell>
                    {clinic.operationHours.map((hour) => (
                      <div key={hour._id}>
                        {hour.day}: {hour.openFrom} - {hour.To}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleEdit(clinic._id)}
                      variant="contained"
                      sx={{
                        marginRight: 1,
                        backgroundColor: "#bbae9d", // Button background color
                        color: "#ffffff", // Text color
                        "&:hover": {
                          backgroundColor: "#c0a676", // Hover state color
                        },
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(clinic._id)}
                      variant="contained"
                      sx={{
                        backgroundColor: "#947d34", // Button background color
                        color: "#ffffff", // Text color
                        "&:hover": {
                          backgroundColor: "#c0a676", // Hover state color
                        },
                      }}
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
        count={clinics.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ShowAllClinics;
