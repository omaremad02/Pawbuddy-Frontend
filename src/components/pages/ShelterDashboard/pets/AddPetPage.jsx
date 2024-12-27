import { Box, CircularProgress, FormControl, InputLabel, MenuItem, Button as MuiButton, Select, TextField, Input, IconButton } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import endpoints from "../../../../utils/apiEndpoints";
import { AddPhotoAlternate, RemoveCircleOutline } from "@mui/icons-material"; // For the upload button icon
import styles from "./css/AddPetPage.module.css";

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
      images: [] // Added images field to store uploaded images
    }
  );

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFieldChange = (field, value) => {
    setAddPet((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setAddPet((prev) => ({
      ...prev,
      images: [...prev.images, ...files], // Append the new images to the existing array
    }));
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

    setIsLoading(true);
    setSubmitted(true);
    try {
      const formData = new FormData();
      // Append regular fields
      formData.append("name", petData.name);
      formData.append("type", petData.type);
      formData.append("gender", petData.gender);
      formData.append("dob", new Date(petData.dob).toISOString());
      formData.append("houseTrained", petData.houseTrained);
      formData.append("breed", petData.breed);

      // Append images to form data
      petData.images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios.post(endpoints.ADD_PET, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...endpoints.getAuthHeader(),
        },
      });

      console.log("Pet saved successfully:", response.data);
      Swal.fire({
        title: "Success!",
        text: "Pet saved successfully!",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error saving pet:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while saving the pet.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.scrollableContainer}>
        <div>
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
                sx={{ marginTop: 1 }}
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
                sx={{ marginTop: 1 }}
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
                sx={{ marginTop: 1 }}
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

          {/* Image Upload */}
          <Box mb={2}>
            <Input
              type="file"
              multiple
              onChange={handleImageChange}
              inputProps={{ accept: "image/jpeg, image/png" }} // Accept only jpg and png files
              disabled={isLoading}
            />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, marginTop: 2 }}>
              {AddPet.images.map((image, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative', // Positioning the remove button over the image
                    width: 200,
                    height: 200,
                    overflow: 'hidden', // Ensures image doesn't overflow the box
                  }}
                >
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Pet Image ${index + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover', // Ensure image covers the container
                    }}
                  />
                  <IconButton
                    onClick={() => {
                      setAddPet((prev) => ({
                        ...prev,
                        images: prev.images.filter((_, i) => i !== index), // Remove image at the current index
                      }));
                    }}
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      backgroundColor: 'rgba(255, 255, 255, 0.7)',
                      borderRadius: '50%',
                      padding: '4px',
                      color: 'red',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 1)',
                      },
                    }}
                  >
                    <RemoveCircleOutline />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Save Button */}
          {!isLoading && (
            <MuiButton
              sx={{ marginTop: 10 }}
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
          {isLoading && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddPetPage;
