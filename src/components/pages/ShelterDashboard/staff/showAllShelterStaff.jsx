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
  
  const ShowAllShelterStaff = () => {
    const [staffList, setStaffList] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchStaff = async () => {
        try {
          const response = await axios.get(endpoints.GET_ALL_STAFF, {
            headers: endpoints.getAuthHeader(),
          });
          if (response.data.staffList) {
            setStaffList(response.data.staffList);
          }
        } catch (error) {
          console.error("Error fetching staff:", error);
        }
      };
  
      fetchStaff();
    }, []);
  
    const handleDelete = (id) => {
      const staffName = staffList.find((staff) => staff._id === id)?.username || "this staff member";
  
      Swal.fire({
        title: "Are you sure?",
        text: `Do you really want to delete ${staffName}? This action cannot be undone.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "Cancel",
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios.post(`${endpoints.DELETE_STAFF}`, {
              staffId: id,
            });
            if (response.status === 200) {
              Swal.fire("Deleted!", `${staffName} has been deleted.`, "success");
              setStaffList(staffList.filter((staff) => staff._id !== id));
            }
          } catch (error) {
            console.error("Error deleting staff:", error);
            Swal.fire("Error!", "An error occurred while deleting the staff.", "error");
          }
        }
      });
    };
  
    const handleEdit = (id) => {
      navigate(`/shelter/edit-staff/${id}`);
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
          Shelter Staff List
        </Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="Shelter Staff Table">
            <TableHead>
              <TableRow>
                <TableCell><strong>Username</strong></TableCell>
                <TableCell><strong>Phone Number</strong></TableCell>
                <TableCell><strong>Date of Birth</strong></TableCell>
                <TableCell><strong>Gender</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>SSN</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((staff) => (
                  <TableRow key={staff._id} hover>
                    <TableCell>{staff.username}</TableCell>
                    <TableCell>{staff.phoneNumber}</TableCell>
                    <TableCell>{new Date(staff.dateOfBirth).toLocaleDateString()}</TableCell>
                    <TableCell>{staff.gender}</TableCell>
                    <TableCell>{staff.email}</TableCell>
                    <TableCell>{staff.role}</TableCell>
                    <TableCell>{staff.ssn}</TableCell>
                    <TableCell>{staff.address}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleEdit(staff._id)}
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => handleDelete(staff._id)}
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
          count={staffList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    );
  };
  
  export default ShowAllShelterStaff;
  