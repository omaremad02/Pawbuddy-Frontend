import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
    MenuItem,
  } from '@mui/material';
  import axios from 'axios';
  import React, { useEffect, useState } from 'react';
  import endpoints from '../../../../utils/apiEndpoints';
  import { useParams } from 'react-router-dom';
  import Swal from 'sweetalert2';
  
  export const UpdateClinic = () => {
    const { clinicId } = useParams(); // Get clinicId from URL params
  
    const [formData, setFormData] = useState({
      clinicName: '',
      contactNumber: '',
      address: '',
      operationHours: [{ day: '', openFrom: '', to: '' }],
    });
    const [loading, setLoading] = useState(false);
    const [loadingClinic, setLoadingClinic] = useState(true); // Loading state for fetching data
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
    const daysOfWeek = [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
      'Sunday',
    ];
  
    // Fetch clinic data
    useEffect(() => {
      const fetchClinicData = async () => {
        try {
          const response = await axios.get(
            `${endpoints.GET_ALL_CLINICS}?clinicId=${clinicId}`,
            {
              headers: endpoints.getAuthHeader(),
            }
          );
          console.log(response);
  
          const clinic = response.data.clinic; // Assuming the API response contains the clinic data
          console.log(clinic);
  
          setFormData({
            clinicName: clinic.clinicName || '',
            contactNumber: clinic.contactNumber || '',
            address: clinic.address || '',
            operationHours: (clinic.operationHours || []).map(({ day, openFrom, To }) => ({
              day,
              openFrom,
              To,
            })),
          });
        } catch (error) {
          console.error('Error fetching clinic data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load clinic data. Please refresh the page or try again later.',
          });
        } finally {
          setLoadingClinic(false);
        }
      };
  
      fetchClinicData();
    }, [clinicId]);
  
    const handleChange = (field, value, index = null) => {
      setFormData((prev) => {
        if (index !== null) {
          const updatedHours = [...prev.operationHours];
          updatedHours[index][field] = value;
          return { ...prev, operationHours: updatedHours };
        }
        return { ...prev, [field]: value };
      });
    };
  
    const addOperationHour = () => {
      setFormData((prev) => ({
        ...prev,
        operationHours: [...prev.operationHours, { day: '', openFrom: '', to: '' }],
      }));
    };
  
    const validateForm = () => {
      const errors = {};
      if (!formData.clinicName) errors.clinicName = 'Clinic Name is required.';
      if (!formData.contactNumber) errors.contactNumber = 'Contact Number is required.';
      if (!formData.address) errors.address = 'Address is required.';
      formData.operationHours.forEach((hour, index) => {
        if (!hour.day) errors[`day-${index}`] = 'Day is required.';
        if (!hour.openFrom) errors[`openFrom-${index}`] = 'Opening time is required.';
        if (!hour.To) errors[`to-${index}`] = 'Closing time is required.';
      });
      return errors;
    };
  
    const handleSubmit = async () => {
      setIsSubmitClicked(true);
      const errors = validateForm();
      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        Swal.fire({
          icon: 'error',
          title: 'Validation Error',
          text: 'Please fix the highlighted errors and try again.',
        });
        return;
      }
      setValidationErrors({});
      setLoading(true);
  
      try {
        const response = await axios.put(endpoints.UPDATE_CLINIC(clinicId), formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Clinic updated successfully!',
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the clinic. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };
  
    if (loadingClinic) {
      return (
        <Container maxWidth="sm">
          <CircularProgress />
        </Container>
      );
    }
  
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Update Clinic
        </Typography>
        <Box>
          <TextField
            label="Clinic Name"
            fullWidth
            margin="normal"
            value={formData.clinicName}
            onChange={(e) => handleChange('clinicName', e.target.value)}
            required
            error={isSubmitClicked && !formData.clinicName}
            helperText={isSubmitClicked && !formData.clinicName && 'Clinic Name is required.'}
          />
          <TextField
            label="Contact Number"
            fullWidth
            margin="normal"
            value={formData.contactNumber}
            onChange={(e) => handleChange('contactNumber', e.target.value)}
            required
            error={isSubmitClicked && !formData.contactNumber}
            helperText={isSubmitClicked && !formData.contactNumber && 'Contact Number is required.'}
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            required
            error={isSubmitClicked && !formData.address}
            helperText={isSubmitClicked && !formData.address && 'Address is required.'}
          />
          <Button onClick={addOperationHour} variant="outlined">
            Add Operation Hour
          </Button>
          <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Update Clinic'}
            </Button>
          </Box>
        </Box>
      </Container>
    );
  };
  
  export default UpdateClinic;