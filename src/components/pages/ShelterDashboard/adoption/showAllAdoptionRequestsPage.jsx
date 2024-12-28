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
import axios from "axios";
import Swal from "sweetalert2";
import endpoints from "../../../../utils/apiEndpoints";

const ShowAdoptionRequestsPage = () => {
  const [adoptionRequests, setAdoptionRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // Fetch adoption requests
  const fetchAdoptionRequests = async () => {
    try {
      const response = await axios.get(endpoints.GET_ALL_ADOPTION_REQUESTS, {
        headers: endpoints.getAuthHeader(),
      });
      console.log(response.data.adoptionRequests);
      
      setAdoptionRequests(response.data.adoptionRequests);
    } catch (error) {
      console.error("Error fetching adoption requests:", error);
    }
  };

  useEffect(() => {
    fetchAdoptionRequests();
  }, []);

  // Handle Accept
  const handleAccept = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to accept this adoption request.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, accept it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.put(endpoints.UPDATE_ADOPTION_REQUESTS(id), {
status:"Approved"
          },{
            headers: endpoints.getAuthHeader(),

          });
          Swal.fire("Accepted!", "The adoption request has been accepted.", "success");
          fetchAdoptionRequests();
        } catch (error) {
          console.error("Error accepting request:", error);
          Swal.fire("Error!", "Could not accept the request. Try again.", "error");
        }
      }
    });
  };

  // Handle Reject
  const handleReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to reject this adoption request.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
            try {
                await axios.put(endpoints.UPDATE_ADOPTION_REQUESTS(id), {
      status:"Denied"
                },{
                    headers: endpoints.getAuthHeader(),
        
                  });
          Swal.fire("Rejected!", "The adoption request has been rejected.", "success");
          fetchAdoptionRequests();
        } catch (error) {
          console.error("Error rejecting request:", error);
          Swal.fire("Error!", "Could not reject the request. Try again.", "error");
        }
      }
    });
  };

  // Handle pagination
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
        Adoption Requests
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="Adoption Requests Table">
          <TableHead>
            <TableRow>
              <TableCell><strong>User Name</strong></TableCell>
              <TableCell><strong>Pet Name</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Created At</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {adoptionRequests
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((request) => (
                
                <TableRow key={request._id} hover>
                  <TableCell>{request.user.username}</TableCell>
                  <TableCell>{request.pet.name}</TableCell>
                  <TableCell>{request.status}</TableCell>
                  <TableCell>{new Date(request.createdAt).toLocaleString()}</TableCell>
                  <TableCell>
  {request.status === "No Action" ? (
    <>
      <Button
        onClick={() => handleAccept(request._id)}
        variant="contained"
        color="success"
        sx={{ mr: 1 }}
      >
        Accept
      </Button>
      <Button
        onClick={() => handleReject(request._id)}
        variant="contained"
        color="error"
      >
        Reject
      </Button>
    </>
  ) : (
    <Typography variant="body2" color={request.status === "Approved" ? "green" : "red"}>
      {request.status}
    </Typography>
  )}
</TableCell>

                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={adoptionRequests.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ShowAdoptionRequestsPage;
