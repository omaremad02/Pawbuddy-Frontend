import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Button as MuiButton,
  Select,
  TextField,
} from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import endpoints from "../../../../utils/apiEndpoints"; // Adjust the import as per your project structure

const AddStaffPage = () => {
  const [staff, setStaff] = useState({
    username: "",
    email: "",
    password: "",
    ssn: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "Male",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (field, value) => {
    setStaff((prev) => ({ ...prev, [field]: value }));
    if (submitted) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateFields = () => {
    const newErrors = {};

    if (!staff.username.trim()) newErrors.username = "Username is required";
    if (!staff.email.trim()) newErrors.email = "Email is required";
    if (!staff.password.trim()) newErrors.password = "Password is required";
    if (!staff.ssn.trim()) newErrors.ssn = "SSN is required";
    if (!staff.phoneNumber.trim()) newErrors.phoneNumber = "Phone number is required";
    if (!staff.dateOfBirth) newErrors.dateOfBirth = "Date of Birth is required";
    if (!staff.address.trim()) newErrors.address = "Address is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveStaff = async () => {
    setSubmitted(true);

    if (!validateFields()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(
        endpoints.ADD_STAFF,
        {
          username: staff.username,
          email: staff.email,
          password: staff.password,
          ssn: staff.ssn,
          phoneNumber: staff.phoneNumber,
          dateOfBirth: new Date(staff.dateOfBirth).toISOString(),
          gender: staff.gender,
          address: staff.address,
        },
        {
          headers: endpoints.getAuthHeader(),
        }
      );

      Swal.fire({
        title: "Success!",
        text: "Staff added successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Reset form after successful submission
      setStaff({
        username: "",
        email: "",
        password: "",
        ssn: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "Male",
        address: "",
      });
      setSubmitted(false);
      setErrors({});
    } catch (error) {
      console.error("Error adding staff:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while adding the staff.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", color: "black", fontSize: "36px", fontWeight: "bold" }}>
        Add Staff
      </h2>

      <Box mb={2}>
        <TextField
          label="Username"
          value={staff.username}
          onChange={(e) => handleFieldChange("username", e.target.value)}
          fullWidth
          error={submitted && !!errors.username}
          helperText={submitted && errors.username}
          disabled={isLoading}
        />
      </Box>

      <Box mb={2}>
        <TextField
          label="Email"
          type="email"
          value={staff.email}
          onChange={(e) => handleFieldChange("email", e.target.value)}
          fullWidth
          error={submitted && !!errors.email}
          helperText={submitted && errors.email}
          disabled={isLoading}
        />
      </Box>

      <Box mb={2}>
        <TextField
          label="Password"
          type="password"
          value={staff.password}
          onChange={(e) => handleFieldChange("password", e.target.value)}
          fullWidth
          error={submitted && !!errors.password}
          helperText={submitted && errors.password}
          disabled={isLoading}
        />
      </Box>

      <Box mb={2}>
        <TextField
          label="SSN"
          value={staff.ssn}
          onChange={(e) => handleFieldChange("ssn", e.target.value)}
          fullWidth
          error={submitted && !!errors.ssn}
          helperText={submitted && errors.ssn}
          disabled={isLoading}
        />
      </Box>

      <Box mb={2}>
        <TextField
          label="Phone Number"
          value={staff.phoneNumber}
          onChange={(e) => handleFieldChange("phoneNumber", e.target.value)}
          fullWidth
          error={submitted && !!errors.phoneNumber}
          helperText={submitted && errors.phoneNumber}
          disabled={isLoading}
        />
      </Box>

      <Box mb={2}>
        <TextField
          label="Date of Birth"
          type="date"
          value={staff.dateOfBirth}
          onChange={(e) => handleFieldChange("dateOfBirth", e.target.value)}
          fullWidth
          error={submitted && !!errors.dateOfBirth}
          helperText={submitted && errors.dateOfBirth}
          disabled={isLoading}
          InputLabelProps={{ shrink: true }}
        />
      </Box>

      <Box mb={2}>
        <FormControl fullWidth error={submitted && !!errors.gender}>
          <InputLabel>Gender</InputLabel>
          <Select
            value={staff.gender}
            onChange={(e) => handleFieldChange("gender", e.target.value)}
            disabled={isLoading}
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box mb={2}>
        <TextField
          label="Address"
          value={staff.address}
          onChange={(e) => handleFieldChange("address", e.target.value)}
          fullWidth
          error={submitted && !!errors.address}
          helperText={submitted && errors.address}
          disabled={isLoading}
        />
      </Box>

      {!isLoading && (
        <MuiButton
          variant="contained"
          color="primary"
          onClick={saveStaff}
          fullWidth
        >
          Save
        </MuiButton>
      )}

      {isLoading && (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100px" }}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
};

export default AddStaffPage;
