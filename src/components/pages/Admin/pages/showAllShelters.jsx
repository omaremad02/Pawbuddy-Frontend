import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Typography, TablePagination } from "@mui/material";
import axios from "axios";
import endpoints from "../../../../utils/apiEndpoints";

const ShowAllShelters = () => {
  const [shelters, setShelters] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Fetch shelters from API
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const response = await axios.get(endpoints.GET_ALL_SHELTERS, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        setShelters(response.data.shelters);
      } catch (error) {
        console.error("Error fetching shelters:", error);
      }
    };
    fetchShelters();
  }, []);

  // Handle delete shelter
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/shelters/${id}`); // Replace with your API delete endpoint
      setShelters(shelters.filter((shelter) => shelter._id !== id));
    } catch (error) {
      console.error("Error deleting shelter:", error);
    }
  };

  // Handle edit shelter
  const handleEdit = (id) => {
    // Logic to edit shelter (this could open a modal, form, etc.)
    console.log("Edit shelter with ID:", id);
  };

  // Handle change page in pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle change rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing rows per page
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Shelters List
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Shelters Table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Shelter Name</strong></TableCell>
              <TableCell><strong>Contact Number</strong></TableCell>
              <TableCell><strong>Address</strong></TableCell>
              <TableCell><strong>Operation Hours</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shelters.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((shelter) => (
              <TableRow key={shelter._id} hover>
                <TableCell>{shelter.shelterName}</TableCell>
                <TableCell>{shelter.contactNumber}</TableCell>
                <TableCell>{shelter.address}</TableCell>
                <TableCell>
                  {shelter.operationHours.map((hour) => (
                    <div key={hour._id}>
                      {hour.day}: {hour.openFrom} - {hour.To}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleEdit(shelter._id)}
                    variant="contained"
                    color="primary"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => handleDelete(shelter._id)}
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
        count={shelters.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ShowAllShelters;
