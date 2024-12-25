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
  
  export const UpdateShelter = () => {
    const { shelterId } = useParams(); // Get shelterId from URL params
  
    const [formData, setFormData] = useState({
      shelterName: '',
      contactNumber: '',
      address: '',
      operationHours: [{ day: '', openFrom: '', to: '' }],
    });
    const [loading, setLoading] = useState(false);
    const [loadingShelter, setLoadingShelter] = useState(true); // Loading state for fetching data
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
  
    // Fetch shelter data
    useEffect(() => {
      const fetchShelterData = async () => {
        try {
          const response = await axios.get(
            `${endpoints.GET_ALL_SHELTERS}?shelterId=${shelterId}`,
            {
              headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            }
          );
          console.log(response);
  
          const shelter = response.data.shelter; // Assuming the API response contains the shelter data
          console.log(shelter);
  
          setFormData({
            shelterName: shelter.shelterName || '',
            contactNumber: shelter.contactNumber || '',
            address: shelter.address || '',
            operationHours: (shelter.operationHours || []).map(({ day, openFrom, To }) => ({
              day,
              openFrom,
              To,
            })),
          });
        } catch (error) {
          console.error('Error fetching shelter data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load shelter data. Please refresh the page or try again later.',
          });
        } finally {
          setLoadingShelter(false);
        }
      };
  
      fetchShelterData();
    }, [shelterId]);
  
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
      if (!formData.shelterName) errors.shelterName = 'Shelter Name is required.';
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
        const response = await axios.put(endpoints.UPDATE_SHELTER(shelterId), formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Shelter updated successfully!',
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the shelter. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };
  
    if (loadingShelter) {
      return (
        <Container maxWidth="sm">
          <CircularProgress />
        </Container>
      );
    }
  
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Update Shelter
        </Typography>
        <Box>
          <TextField
            label="Shelter Name"
            fullWidth
            margin="normal"
            value={formData.shelterName}
            onChange={(e) => handleChange('shelterName', e.target.value)}
            required
            error={isSubmitClicked && !formData.shelterName}
            helperText={isSubmitClicked && !formData.shelterName && 'Shelter Name is required.'}
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
          {formData.operationHours.map((hour, index) => (
            <Box key={index} mb={2} display="flex" flexDirection="column">
              <TextField
                select
                label="Day"
                value={hour.day}
                onChange={(e) => handleChange('day', e.target.value, index)}
                margin="normal"
                required
                error={isSubmitClicked && !hour.day}
                helperText={isSubmitClicked && !hour.day && 'Day is required.'}
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
                  onChange={(e) => handleChange('openFrom', e.target.value, index)}
                  margin="normal"
                  required
                  error={isSubmitClicked && !hour.openFrom}
                  helperText={isSubmitClicked && !hour.openFrom && 'Opening time is required.'}
                  style={{ flex: 1 }}
                />
  
                <TextField
                  label="To"
                  type="time"
                  value={hour.To}
                  onChange={(e) => handleChange('To', e.target.value, index)}
                  margin="normal"
                  required
                  error={isSubmitClicked && !hour.To}
                  helperText={isSubmitClicked && !hour.To && 'Closing time is required.'}
                  style={{ flex: 1 }}
                />
              </Box>
            </Box>
          ))}
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
              {loading ? <CircularProgress size={24} /> : 'Update Shelter'}
            </Button>
          </Box>
        </Box>
      </Container>
    );
  };
  
  export default UpdateShelter;
  