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
import moment from 'moment/moment';

export const UpdateUser = () => {
  const { userId } = useParams(); // Get userId from URL params

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [loadingUser, setLoadingUser] = useState(true); // Loading state for fetching data
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitClicked, setIsSubmitClicked] = useState(false);
  const genders = ['Male', 'Female', 'Other'];

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `${endpoints.GET_ALL_USERS}?userId=${userId}`,
          {
            headers: endpoints.getAuthHeader(),
          }
        );
        console.log(response);
        
        const user = response.data.data.user; // Assuming the API response contains the user data

        setFormData({
          username: user.username || '',
          email: user.email || '',
          phoneNumber: user.phoneNumber || '',
          dateOfBirth: moment(user.dateOfBirth).format('YYYY-MM-DD') || '', // Format the date
          gender: user.gender || '',
          address: user.address || '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to load user data. Please refresh the page or try again later.',
        });
      } finally {
        setLoadingUser(false);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Username is required.';
    if (!formData.email) errors.email = 'Email is required.';
    if (!formData.phoneNumber) errors.phoneNumber = 'Phone Number is required.';
    if (!formData.dateOfBirth) errors.dateOfBirth = 'Date of Birth is required.';
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
      const response = await axios.put(endpoints.UPDATE_USER(userId), formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'User updated successfully!',
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'An error occurred while updating the user. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loadingUser) {
    return (
      <Container maxWidth="sm">
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Update User
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
          label="Phone Number"
          fullWidth
          margin="normal"
          value={formData.phoneNumber}
          onChange={(e) => handleChange('phoneNumber', e.target.value)}
          required
          error={isSubmitClicked && !formData.phoneNumber}
          helperText={isSubmitClicked && !formData.phoneNumber && 'Phone Number is required.'}
        />
        <TextField
          label="Date of Birth"
          type="date"
          fullWidth
          margin="normal"
          value={formData.dateOfBirth}
          onChange={(e) => handleChange('dateOfBirth', e.target.value)}
          required
          error={isSubmitClicked && !formData.dateOfBirth}
          helperText={isSubmitClicked && !formData.dateOfBirth && 'Date of Birth is required.'}
        />
        <TextField
          select
          label="Gender"
          value={formData.gender}
          onChange={(e) => handleChange('gender', e.target.value)}
          margin="normal"
          required
          error={isSubmitClicked && !formData.gender}
          helperText={isSubmitClicked && !formData.gender && 'Gender is required.'}
        >
          {genders.map((gender) => (
            <MenuItem key={gender} value={gender}>
              {gender}
            </MenuItem>
          ))}
        </TextField>
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
            {loading ? <CircularProgress size={24} /> : 'Update User'}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default UpdateUser;
