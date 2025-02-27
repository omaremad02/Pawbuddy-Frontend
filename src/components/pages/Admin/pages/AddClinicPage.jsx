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
  
  const AddClinicPage = () => {
    const [isNextClicked, setIsNextClicked] = useState(false);
    const [isSubmitClicked, setIsSubmitClickedClicked] = useState(false);
  
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [validationErrors, setValidationErrors] = useState({}); // Track validation errors
    const [formData, setFormData] = useState({
      clinicData: {
        clinicName: '',
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
      clinicManagerData: {
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
  
    const steps = ['Clinic Information', 'Manager Information'];
  
    const validateStep = () => {
      const errors = {};
      if (activeStep === 0) {
        if (!formData.clinicData.clinicName) errors.clinicName = "Clinic Name is required.";
        if (!formData.clinicData.contactNumber) errors.contactNumber = "Contact Number is required.";
        if (!formData.clinicData.address) errors.address = "Address is required.";
        formData.clinicData.operationHours.forEach((hour, index) => {
          if (!hour.day) errors[`day-${index}`] = "Day is required.";
          if (!hour.openFrom) errors[`openFrom-${index}`] = "Open time is required.";
          if (!hour.To) errors[`To-${index}`] = "Closing time is required.";
        });
      } else if (activeStep === 1) {
   
        if (!formData.clinicManagerData.email) errors.email = "Valid email is required.";
        if (!formData.clinicManagerData.password) errors.password = "Password is required.";
        if (!formData.clinicManagerData.ssn) errors.ssn = "SSN is required.";
        if (!formData.clinicManagerData.gender) errors.gender = "Gender is required.";
        if (!formData.clinicManagerData.address) errors.address = "Address is required.";
        if (!formData.clinicManagerData.dateOfBirth) errors.dateOfBirth = "Date of Birth is required.";
        if (!formData.clinicManagerData.phoneNumber) errors.phoneNumber = "Phone Number is required.";
        if (!formData.clinicManagerData.username) errors.username = "Username is required.";
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
          endpoints.ADD_CLINIC,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
          }
        );
      
        console.log(response.data);
        alert('Clinic Manager added successfully!');
      } catch (error) {
        console.error(error);
        alert('An error occurred while adding the Clinic Manager.');
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
        clinicData: {
          ...prevData.clinicData,
          operationHours: [
            ...prevData.clinicData.operationHours,
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
        <Container maxWidth="md"  >
          <Typography variant="h4" gutterBottom >
            Add Clinic Manager
          </Typography>
          <Stepper activeStep={activeStep} alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label} >
                <StepLabel >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box mt={4} >
            {activeStep === 0 && (
              <Box>
                <TextField
                  label="Clinic Name"
                  fullWidth
                  margin="normal"
                  value={formData.clinicData.clinicName}
                  onChange={(e) =>
                    handleChange('clinicData', 'clinicName', e.target.value)
                  }
                  required
                  error={isNextClicked &&isNextClicked &&!formData.clinicData.clinicName}
                  helperText={isNextClicked &&isNextClicked &&!formData.clinicData.clinicName && "Clinic Name is required."}
                />
                <TextField
                  label="Contact Number"
                  fullWidth
                  margin="normal"
                  value={formData.clinicData.contactNumber}
                  onChange={(e) =>
                    handleChange('clinicData', 'contactNumber', e.target.value)
                  }
                  required
                  error={isNextClicked &&!formData.clinicData.contactNumber}
                  helperText={isNextClicked &&!formData.clinicData.contactNumber && "Contact Number is required."}
                />
                <TextField
                  label="Address"
                  fullWidth
                  margin="normal"
                  value={formData.clinicData.address}
                  onChange={(e) =>
                    handleChange('clinicData', 'address', e.target.value)
                  }
                  required
                  error={isNextClicked &&!formData.clinicData.address}
                  helperText={isNextClicked &&!formData.clinicData.address && "Address is required."}
                />
                {formData.clinicData.operationHours.map((hour, index) => (
                  <Box key={index} mb={2} display="flex" flexDirection="column" >
                    <TextField
                      select
                      label="Day"
                      value={hour.day}
                      onChange={(e) =>
                        handleChange('clinicData', 'day', e.target.value, index)
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
                          handleChange('clinicData', 'openFrom', e.target.value, index)
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
                          handleChange('clinicData', 'To', e.target.value, index)
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
                <Button onClick={addOperationHour} 
                sx={{
                          backgroundColor: "#c0a676", // Button background color
                          color: "#ffffff", // Text color
                          "&:hover": {
                            backgroundColor: "#bbae9d", // Hover state color
                            
                          },
                        }}>
                  Add Operation Hour
                </Button>
              </Box>
            )}
  
            {activeStep === 1 && (
              <Box >
                <TextField
                  label="Username"
                  fullWidth
                  margin="normal"
                  value={formData.clinicManagerData.username}
                  onChange={(e) =>
                    handleChange('clinicManagerData', 'username', e.target.value)
                  }
                  required
                  error={isSubmitClicked &&!formData.clinicManagerData.username}
                  helperText={isSubmitClicked &&!formData.clinicManagerData.username && "Username is required."}
                />
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={formData.clinicManagerData.email}
                  onChange={(e) =>
                    handleChange('clinicManagerData', 'email', e.target.value)
                  }
                  required
                  error={isSubmitClicked &&!formData.clinicManagerData.email}
                  helperText={isSubmitClicked &&!formData.clinicManagerData.email && "Valid email is required."}
                />
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  margin="normal"
                  value={formData.clinicManagerData.password}
                  onChange={(e) =>
                    handleChange('clinicManagerData', 'password', e.target.value)
                  }
                  required
                  error={isSubmitClicked &&!formData.clinicManagerData.password}
                  helperText={isSubmitClicked &&!formData.clinicManagerData.password && "Password is required."}
                />
                <TextField
                  label="SSN"
                  fullWidth
                  margin="normal"
                  value={formData.clinicManagerData.ssn}
                  onChange={(e) =>
                    handleChange('clinicManagerData', 'ssn', e.target.value)
                  }
                  required
                  error={isSubmitClicked &&!formData.clinicManagerData.ssn}
                  helperText={isSubmitClicked &&!formData.clinicManagerData.ssn && "SSN is required."}
                />
        <TextField
    select
    label="Gender"
    fullWidth
    margin="normal"
    value={formData.clinicManagerData.gender}
    onChange={(e) =>
      handleChange('clinicManagerData', 'gender', e.target.value)
    }
    required
    error={isSubmitClicked && !formData.clinicManagerData.gender}
    helperText={isSubmitClicked && !formData.clinicManagerData.gender && "Gender is required."}
  >
    <MenuItem value="Male">Male</MenuItem>
    <MenuItem value="Female">Female</MenuItem>
  </TextField>
  
                <TextField
                  label="Address"
                  fullWidth
                  margin="normal"
                  value={formData.clinicManagerData.address}
                  onChange={(e) =>
                    handleChange('clinicManagerData', 'address', e.target.value)
                  }
                  required
                  error={isSubmitClicked &&!formData.clinicManagerData.address}
                  helperText={isSubmitClicked &&!formData.clinicManagerData.address && "Address is required."}
                />
                <TextField
                  label="Date of Birth"
                  type="date"
                  fullWidth
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                  value={formData.clinicManagerData.dateOfBirth}
                  onChange={(e) =>
                    handleChange('clinicManagerData', 'dateOfBirth', e.target.value)
                  }
                  required
                  error={isSubmitClicked &&!formData.clinicManagerData.dateOfBirth}
                  helperText={isSubmitClicked &&!formData.clinicManagerData.dateOfBirth && "Date of Birth is required."}
                />
                <TextField
                  label="Phone Number"
                  fullWidth
                  margin="normal"
                  value={formData.clinicManagerData.phoneNumber}
                  onChange={(e) =>
                    handleChange('clinicManagerData', 'phoneNumber', e.target.value)
                  }
                  required
                  error={isSubmitClicked &&! formData.clinicManagerData.phoneNumber}
                  helperText={isSubmitClicked &&!formData.clinicManagerData.phoneNumber && "Phone Number is required."}
                />
            
              </Box>
            )}
  
  
          <Box mt={2} display="flex" justifyContent="space-between">
            {activeStep > 0 && (
              <Button onClick={handleBack} 
              sx={{
                          backgroundColor: "#c0a676", // Button background color
                          color: "#ffffff", // Text color
                          "&:hover": {
                            backgroundColor: "#bbae9d", // Hover state color
                            
                          },
                        }}>
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button onClick={handleNext} 
              sx={{
                          backgroundColor: "#c0a676", // Button background color
                          color: "#ffffff", // Text color
                          "&:hover": {
                            backgroundColor: "#bbae9d", // Hover state color
                            
                          },
                        }}>
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                sx={{
                          backgroundColor: "#c0a676", // Button background color
                          color: "#ffffff", // Text color
                          "&:hover": {
                            backgroundColor: "#bbae9d", // Hover state color
                            
                          },
                        }}
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
  
  export default AddClinicPage;
  