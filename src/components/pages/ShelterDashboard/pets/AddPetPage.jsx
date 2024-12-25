import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Button as MuiButton, Select, TextField } from "@mui/material";
import axios from "axios"; // Import Axios
import React, { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import endpoints from "../../../../utils/apiEndpoints";

const AddPetPage = ({ petToEdit }) => {
  const [AddPet, setAddPet] = useState(
    petToEdit || {
      name: "",
      type: "Dog",
      breed: "",
      adoptionstatus: "",
      vaccinationstatus: "",
      size: "",
      temperament: "",
      gender: "Male",
      dob: "",
      houseTrained: "Street",
    }
  );

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [submitted, setSubmitted] = useState(false); // Track whether the form has been submitted

  const handleFieldChange = (field, value) => {
    setAddPet((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateFields = () => {
    const newErrors = {};

    if (!AddPet.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!AddPet.breed.trim()) {
      newErrors.breed = "Breed is required";
    }

    if (!AddPet.dob) {
      newErrors.dob = "Date of Birth is required";
    }

    if (!AddPet.gender) {
      newErrors.gender = "Gender is required";
    }

    if (!AddPet.type) {
      newErrors.type = "Type is required";
    }

    if (!AddPet.houseTrained) {
      newErrors.houseTrained = "House trained status is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const savePet = async (petData) => {
    if (!validateFields()) return;

    setIsLoading(true); // Show loading indicator
    setSubmitted(true); // Mark as submitted
    try {
      const response = await axios.post(endpoints.ADD_PET, {
        type: petData.type,
        gender: petData.gender,
        dob: new Date(petData.dob).toISOString(),
        houseTrained: petData.houseTrained,
        name: petData.name,
        breed: petData.breed,
      }, {
        headers: endpoints.getAuthHeader(),
      });

      console.log("Pet saved successfully:", response.data);
      // Using SweetAlert for success
      Swal.fire({
        title: "Success!",
        text: "Pet saved successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error saving pet:", error);
      // Using SweetAlert for error
      Swal.fire({
        title: "Error!",
        text: "An error occurred while saving the pet.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="container">
      <div className="scrollableContainer">
        <div className="editContainer">
          {/* Add Pet Title */}
          <h2 style={{ textAlign: 'center', color: 'black', fontSize: '36px', fontWeight: 'bold' }}>Add Pet</h2>

          {/* Name Field */}
          <Box mb={2}>
            <TextField
              label="Name"
              value={AddPet.name}
              onChange={(e) => handleFieldChange("name", e.target.value)}
              fullWidth
              error={submitted && !!errors.name}
              helperText={submitted && errors.name}
              disabled={isLoading}
            />
          </Box>

          {/* Type Dropdown */}
          <Box mb={2}>
            <FormControl fullWidth error={submitted && !!errors.type}>
              <InputLabel>Type</InputLabel>
              <Select
                            sx={{marginTop:1}}

                value={AddPet.type}
                onChange={(e) => handleFieldChange("type", e.target.value)}
                disabled={isLoading}
              >
                <MenuItem value="Dog">Dog</MenuItem>
                <MenuItem value="Cat">Cat</MenuItem>
              </Select>
              {submitted && errors.type && <div style={{ color: 'red', fontSize: '12px' }}>{errors.type}</div>}
            </FormControl>
          </Box>

          {/* Breed Field */}
          <Box mb={2}>
            <TextField
              label="Breed"
              value={AddPet.breed}
              onChange={(e) => handleFieldChange("breed", e.target.value)}
              fullWidth
              error={submitted && !!errors.breed}
              helperText={submitted && errors.breed}
              disabled={isLoading}
            />
          </Box>

          {/* Gender Dropdown */}
          <Box mb={2}>
            <FormControl fullWidth error={submitted && !!errors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select
              sx={{marginTop:1}}
                value={AddPet.gender}
                onChange={(e) => handleFieldChange("gender", e.target.value)}
                disabled={isLoading}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
              {submitted && errors.gender && <div style={{ color: 'red', fontSize: '12px' }}>{errors.gender}</div>}
            </FormControl>
          </Box>

          {/* Date of Birth Field */}
          <Box mb={2}>
            <TextField
              label="Date of Birth"
              type="date"
              value={AddPet.dob}
              onChange={(e) => handleFieldChange("dob", e.target.value)}
              fullWidth
              error={submitted && !!errors.dob}
              helperText={submitted && errors.dob}
              disabled={isLoading}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Box>

          {/* House Trained Dropdown */}
          <Box mb={2}>
            <FormControl fullWidth error={submitted && !!errors.houseTrained}>
              <InputLabel>House Trained</InputLabel>
              <Select
                            sx={{marginTop:1}}

                value={AddPet.houseTrained}
                onChange={(e) => handleFieldChange("houseTrained", e.target.value)}
                disabled={isLoading}
              >
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Street">Street</MenuItem>
              </Select>
              {submitted && errors.houseTrained && <div style={{ color: 'red', fontSize: '12px' }}>{errors.houseTrained}</div>}
            </FormControl>
          </Box>

        

          {/* Save Button */}
          {!isLoading && (
            <MuiButton
              variant="contained"
              color="primary"
              onClick={() => savePet(AddPet)}
              fullWidth
              style={{ padding: 20 }}
            >
              Save
            </MuiButton>
          )}

          {/* Loading Indicator */}
          {isLoading &&   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
    <CircularProgress />
  </div>}
        </div>
      </div>
    </div>
  );
};

export default AddPetPage;
