import {
    Box,
    Button,
    CircularProgress,
    Container,
    TextField,
    Typography,
  } from '@mui/material';
  import axios from 'axios';
  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import Swal from 'sweetalert2';
  import endpoints from "../../../../utils/apiEndpoints"; // Adjust the import as per your project structure
import moment from 'moment';

  export const UpdateShelterStaffPage = () => {
    const { shelterStaffId } = useParams(); // Get shelterStaffId from URL params
  
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      ssn: '',
      phoneNumber: '',
      dateOfBirth: '',
      gender: '',
      address: '',
    });
    const [loading, setLoading] = useState(false);
    const [loadingStaff, setLoadingStaff] = useState(true); // Loading state for fetching data
    const [validationErrors, setValidationErrors] = useState({});
    const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  
    // Fetch shelter staff data
    useEffect(() => {
      const fetchShelterStaffData = async () => {
        try {
          const response = await axios.get(
            `${endpoints.GET_ALL_STAFF}?shelterStaffId=${shelterStaffId}`,
            {
              headers: endpoints.getAuthHeader(),
            }
          );
  
          const staff = response.data.staffList[0]; // Assuming API response contains the staff data
          console.log(staff);
          
          setFormData({
            username: staff.username || '',
            email: staff.email || '',
            ssn: staff.ssn || '',
            phoneNumber: staff.phoneNumber || '',
          dateOfBirth: moment(staff.dateOfBirth).format('YYYY-MM-DD') || '', // Format the date
            gender: staff.gender || '',
            address: staff.address || '',
          });
        } catch (error) {
          console.error('Error fetching shelter staff data:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to load staff data. Please refresh the page or try again later.',
          });
        } finally {
          setLoadingStaff(false);
        }
      };
  
      fetchShelterStaffData();
    }, [shelterStaffId]);
  
    const handleChange = (field, value) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };
  
    const validateForm = () => {
      const errors = {};
      if (!formData.username) errors.username = 'Username is required.';
      if (!formData.email) errors.email = 'Email is required.';
      if (!formData.ssn) errors.ssn = 'SSN is required.';
      if (!formData.phoneNumber) errors.phoneNumber = 'Phone number is required.';
      if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of birth is required.';
      if (!formData.gender) errors.gender = 'Gender is required.';
      if (!formData.address) errors.address = 'Address is required.';
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
        const response = await axios.put(
            endpoints.UPDATE_STAFF(shelterStaffId),
            formData,
          {
            headers: endpoints.getAuthHeader(),
          }
        );
        console.log(response.data);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Shelter staff updated successfully!',
        });
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'An error occurred while updating the staff. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };
  
    if (loadingStaff) {
      return (
        <Container maxWidth="sm">
          <CircularProgress />
        </Container>
      );
    }
  
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Update Shelter Staff
        </Typography>
        <Box>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            required
            error={isSubmitClicked && !formData.username}
            helperText={isSubmitClicked && !formData.username && 'Username is required.'}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
            error={isSubmitClicked && !formData.email}
            helperText={isSubmitClicked && !formData.email && 'Email is required.'}
          />
          <TextField
            label="SSN"
            fullWidth
            margin="normal"
            value={formData.ssn}
            onChange={(e) => handleChange('ssn', e.target.value)}
            required
            error={isSubmitClicked && !formData.ssn}
            helperText={isSubmitClicked && !formData.ssn && 'SSN is required.'}
          />
          <TextField
            label="Phone Number"
            fullWidth
            margin="normal"
            value={formData.phoneNumber}
            onChange={(e) => handleChange('phoneNumber', e.target.value)}
            required
            error={isSubmitClicked && !formData.phoneNumber}
            helperText={isSubmitClicked && !formData.phoneNumber && 'Phone number is required.'}
          />
          <TextField
            label="Date of Birth"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={formData.dateOfBirth}
            onChange={(e) => handleChange('dateOfBirth', e.target.value)}
            required
            error={isSubmitClicked && !formData.dateOfBirth}
            helperText={isSubmitClicked && !formData.dateOfBirth && 'Date of birth is required.'}
          />
          <TextField
            label="Gender"
            fullWidth
            margin="normal"
            value={formData.gender}
            onChange={(e) => handleChange('gender', e.target.value)}
            required
            error={isSubmitClicked && !formData.gender}
            helperText={isSubmitClicked && !formData.gender && 'Gender is required.'}
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
          <Box mt={3} display="flex" justifyContent="space-between" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Update Staff'}
            </Button>
          </Box>
        </Box>
      </Container>
    );
  };
  
  export default UpdateShelterStaffPage;
  