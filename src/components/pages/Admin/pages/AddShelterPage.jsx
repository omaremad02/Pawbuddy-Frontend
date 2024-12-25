import {
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import endpoints from '../../../../utils/apiEndpoints';

const AddShelterPage = () => {
  const [isNextClicked, setIsNextClicked] = useState(false);
  const [isSubmitClicked, setIsSubmitClickedClicked] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({}); // Track validation errors
  const [formData, setFormData] = useState({
    shelterData: {
      shelterName: '',
      contactNumber: '',
      address: '',
      operationHours: [
        {
          day: '',
          openFrom: '',
          To: '',
        },
      ],
    },
    shelterManagerData: {
      email: '',
      password: '',
      ssn: '',
      gender: '',
      address: '',
      dateOfBirth: '',
      phoneNumber: '',
      username: '',
    },
  });

  const steps = ['Shelter Information', 'Manager Information'];

  const validateStep = () => {
    const errors = {};
    if (activeStep === 0) {
      if (!formData.shelterData.shelterName) errors.shelterName = "Shelter Name is required.";
      if (!formData.shelterData.contactNumber) errors.contactNumber = "Contact Number is required.";
      if (!formData.shelterData.address) errors.address = "Address is required.";
      formData.shelterData.operationHours.forEach((hour, index) => {
        if (!hour.day) errors[`day-${index}`] = "Day is required.";
        if (!hour.openFrom) errors[`openFrom-${index}`] = "Open time is required.";
        if (!hour.To) errors[`To-${index}`] = "Closing time is required.";
      });
    } else if (activeStep === 1) {
 
      if (!formData.shelterManagerData.email) errors.email = "Valid email is required.";
      if (!formData.shelterManagerData.password) errors.password = "Password is required.";
      if (!formData.shelterManagerData.ssn) errors.ssn = "SSN is required.";
      if (!formData.shelterManagerData.gender) errors.gender = "Gender is required.";
      if (!formData.shelterManagerData.address) errors.address = "Address is required.";
      if (!formData.shelterManagerData.dateOfBirth) errors.dateOfBirth = "Date of Birth is required.";
      if (!formData.shelterManagerData.phoneNumber) errors.phoneNumber = "Phone Number is required.";
      if (!formData.shelterManagerData.username) errors.username = "Username is required.";
    }
    return errors;
  };

  const handleNext = () => {
    const errors = validateStep();
    setIsNextClicked(true); // Mark that the "Next" button has been clicked
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    setIsNextClicked(false); // Reset for the next step
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setValidationErrors({});
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    
    const errors = validateStep();
    setIsSubmitClickedClicked(true); // Mark that the "Next" button has been clicked
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    setValidationErrors({});
    setIsNextClicked(false); // Reset for the next step
    setLoading(true);
    try {
      const response = await axios.post(
        endpoints.ADD_SHELTER,
        formData,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
    
      console.log(response.data);
      alert('Shelter Manager added successfully!');
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the Shelter Manager.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (section, field, value, index = null) => {
    setFormData((prevData) => {
      const updatedSection = { ...prevData[section] };

      if (index !== null) {
        updatedSection.operationHours[index][field] = value;
      } else {
        updatedSection[field] = value;
      }

      return {
        ...prevData,
        [section]: updatedSection,
      };
    });
  };

  const addOperationHour = () => {
    setFormData((prevData) => ({
      ...prevData,
      shelterData: {
        ...prevData.shelterData,
        operationHours: [
          ...prevData.shelterData.operationHours,
          { day: '', openFrom: '', To: '' },
        ],
      },
    }));
  };


  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <Box
    mt={4}
    sx={{
      height: '70vh', // Adjust height as needed
      overflowY: 'auto', // Enable vertical scrolling
      padding: 2,
      borderRadius: '8px',
    }}
  >
      <Container maxWidth="md">
        <Typography variant="h4" gutterBottom>
          Add Shelter Manager
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={4}>
          {activeStep === 0 && (
            <Box>
              <TextField
                label="Shelter Name"
                fullWidth
                margin="normal"
                value={formData.shelterData.shelterName}
                onChange={(e) =>
                  handleChange('shelterData', 'shelterName', e.target.value)
                }
                required
                error={isNextClicked &&isNextClicked &&!formData.shelterData.shelterName}
                helperText={isNextClicked &&isNextClicked &&!formData.shelterData.shelterName && "Shelter Name is required."}
              />
              <TextField
                label="Contact Number"
                fullWidth
                margin="normal"
                value={formData.shelterData.contactNumber}
                onChange={(e) =>
                  handleChange('shelterData', 'contactNumber', e.target.value)
                }
                required
                error={isNextClicked &&!formData.shelterData.contactNumber}
                helperText={isNextClicked &&!formData.shelterData.contactNumber && "Contact Number is required."}
              />
              <TextField
                label="Address"
                fullWidth
                margin="normal"
                value={formData.shelterData.address}
                onChange={(e) =>
                  handleChange('shelterData', 'address', e.target.value)
                }
                required
                error={isNextClicked &&!formData.shelterData.address}
                helperText={isNextClicked &&!formData.shelterData.address && "Address is required."}
              />
              {formData.shelterData.operationHours.map((hour, index) => (
                <Box key={index} mb={2} display="flex" flexDirection="column">
                  <TextField
                    select
                    label="Day"
                    value={hour.day}
                    onChange={(e) =>
                      handleChange('shelterData', 'day', e.target.value, index)
                    }
                    margin="normal"
                    required
                    error={isNextClicked &&!hour.day}
                    helperText={isNextClicked &&!hour.day && "Day is required."}
                  >
                    {daysOfWeek.map((day) => (
                      <MenuItem key={day} value={day}>
                        {day}
                      </MenuItem>
                    ))}
                  </TextField>
                  <Box display="flex" gap={2}>
                    <TextField
                      label="Open From"
                      type="time"
                      value={hour.openFrom}
                      onChange={(e) =>
                        handleChange('shelterData', 'openFrom', e.target.value, index)
                      }
                      margin="normal"
                      required
                      error={isNextClicked &&!hour.openFrom}
                      helperText={isNextClicked &&!hour.openFrom && "Open time is required."}
                      style={{ flex: 1 }}
                    />
                    <TextField
                      label="To"
                      type="time"
                      value={hour.To}
                      onChange={(e) =>
                        handleChange('shelterData', 'To', e.target.value, index)
                      }
                      margin="normal"
                      required
                      error={isNextClicked &&!hour.To}
                      helperText={isNextClicked &&!hour.To && "Closing time is required."}
                      style={{ flex: 1 }}
                    />
                  </Box>
                </Box>
              ))}
              <Button onClick={addOperationHour} variant="outlined">
                Add Operation Hour
              </Button>
            </Box>
          )}

          {activeStep === 1 && (
            <Box>
              <TextField
                label="Username"
                fullWidth
                margin="normal"
                value={formData.shelterManagerData.username}
                onChange={(e) =>
                  handleChange('shelterManagerData', 'username', e.target.value)
                }
                required
                error={isSubmitClicked &&!formData.shelterManagerData.username}
                helperText={isSubmitClicked &&!formData.shelterManagerData.username && "Username is required."}
              />
              <TextField
                label="Email"
                type="email"
                fullWidth
                margin="normal"
                value={formData.shelterManagerData.email}
                onChange={(e) =>
                  handleChange('shelterManagerData', 'email', e.target.value)
                }
                required
                error={isSubmitClicked &&!formData.shelterManagerData.email}
                helperText={isSubmitClicked &&!formData.shelterManagerData.email && "Valid email is required."}
              />
              <TextField
                label="Password"
                type="password"
                fullWidth
                margin="normal"
                value={formData.shelterManagerData.password}
                onChange={(e) =>
                  handleChange('shelterManagerData', 'password', e.target.value)
                }
                required
                error={isSubmitClicked &&!formData.shelterManagerData.password}
                helperText={isSubmitClicked &&!formData.shelterManagerData.password && "Password is required."}
              />
              <TextField
                label="SSN"
                fullWidth
                margin="normal"
                value={formData.shelterManagerData.ssn}
                onChange={(e) =>
                  handleChange('shelterManagerData', 'ssn', e.target.value)
                }
                required
                error={isSubmitClicked &&!formData.shelterManagerData.ssn}
                helperText={isSubmitClicked &&!formData.shelterManagerData.ssn && "SSN is required."}
              />
      <TextField
  select
  label="Gender"
  fullWidth
  margin="normal"
  value={formData.shelterManagerData.gender}
  onChange={(e) =>
    handleChange('shelterManagerData', 'gender', e.target.value)
  }
  required
  error={isSubmitClicked && !formData.shelterManagerData.gender}
  helperText={isSubmitClicked && !formData.shelterManagerData.gender && "Gender is required."}
>
  <MenuItem value="Male">Male</MenuItem>
  <MenuItem value="Female">Female</MenuItem>
</TextField>

              <TextField
                label="Address"
                fullWidth
                margin="normal"
                value={formData.shelterManagerData.address}
                onChange={(e) =>
                  handleChange('shelterManagerData', 'address', e.target.value)
                }
                required
                error={isSubmitClicked &&!formData.shelterManagerData.address}
                helperText={isSubmitClicked &&!formData.shelterManagerData.address && "Address is required."}
              />
              <TextField
                label="Date of Birth"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={formData.shelterManagerData.dateOfBirth}
                onChange={(e) =>
                  handleChange('shelterManagerData', 'dateOfBirth', e.target.value)
                }
                required
                error={isSubmitClicked &&!formData.shelterManagerData.dateOfBirth}
                helperText={isSubmitClicked &&!formData.shelterManagerData.dateOfBirth && "Date of Birth is required."}
              />
              <TextField
                label="Phone Number"
                fullWidth
                margin="normal"
                value={formData.shelterManagerData.phoneNumber}
                onChange={(e) =>
                  handleChange('shelterManagerData', 'phoneNumber', e.target.value)
                }
                required
                error={isSubmitClicked &&! formData.shelterManagerData.phoneNumber}
                helperText={isSubmitClicked &&!formData.shelterManagerData.phoneNumber && "Phone Number is required."}
              />
          
            </Box>
          )}


        <Box mt={2} display="flex" justifyContent="space-between">
          {activeStep > 0 && (
            <Button onClick={handleBack} variant="outlined">
              Back
            </Button>
          )}
          {activeStep < steps.length - 1 ? (
            <Button onClick={handleNext} variant="contained">
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="primary"
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          )}
        </Box>
      </Box>
      </Container>
      </Box>
  );
};

export default AddShelterPage;
