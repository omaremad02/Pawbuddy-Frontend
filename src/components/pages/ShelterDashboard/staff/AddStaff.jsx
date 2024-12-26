import { useState } from 'react';
import { 
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Container,
  Typography,
  Alert,
  Backdrop
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import endpoints from '../../../../utils/apiEndpoints';

const AddStaffPage = () => {
  const [staffData, setStaffData] = useState({
    username: '',
    email: '',
    password: '',
    ssn: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: 'Male',
    address: '',
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleFieldChange = (field, value) => {
    setStaffData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
    setFormError('');
  };

  const validateFields = () => {
    const newErrors = {};
    
    // Username validation
    if (!staffData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (staffData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!staffData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(staffData.email)) {
      newErrors.email = 'Invalid email format';
    }

    // Password validation
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!staffData.password) {
      newErrors.password = 'Password is required';
    } else if (!passwordRegex.test(staffData.password)) {
      newErrors.password = 'Password must be at least 8 characters and include letters, numbers, and special characters';
    }

    // SSN validation
    const ssnRegex = /^\d{3}-\d{2}-\d{4}$/;
    if (!staffData.ssn.trim()) {
      newErrors.ssn = 'SSN is required';
    } else if (!ssnRegex.test(staffData.ssn)) {
      newErrors.ssn = 'Invalid SSN format (XXX-XX-XXXX)';
    }

    // Phone validation
    const phoneRegex = /^\+1\d{10}$/;
    if (!staffData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!phoneRegex.test(staffData.phoneNumber)) {
      newErrors.phoneNumber = 'Invalid phone format (+1XXXXXXXXXX)';
    }

    // Date of Birth validation
    if (!staffData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of Birth is required';
    }

    // Address validation
    if (!staffData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    setErrors(newErrors);
    
    // Set form error message if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setFormError('Please fix the errors in the form before submitting.');
    }
    
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    
    if (!validateFields()) {
      // Scroll to the first error
      const firstError = document.querySelector('.Mui-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsLoading(true);
    setFormError('');

    try {
      const response = await axios.post(endpoints.ADD_STAFF, staffData, {
        headers: endpoints.getAuthHeader(),
      });
      
      Swal.fire({
        title: 'Success!',
        text: 'Staff member added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      });

      // Reset form after successful submission
      setStaffData({
        username: '',
        email: '',
        password: '',
        ssn: '',
        phoneNumber: '',
        dateOfBirth: '',
        gender: 'Male',
        address: '',
      });
      setSubmitted(false);
      
    } catch (error) {
      console.error('Error saving staff:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to add staff member',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, p: 3, boxShadow: 3, borderRadius: 2, bgcolor: 'background.paper' }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Add Staff Member
        </Typography>

        {/* Show form error message if exists */}
        {formError && (
          <Box mb={2}>
            <Alert severity="error">{formError}</Alert>
          </Box>
        )}

        <form onSubmit={handleSubmit}>
          {/* Form fields remain the same */}
          <Box mb={2}>
            <TextField
              label="Username"
              value={staffData.username}
              onChange={(e) => handleFieldChange('username', e.target.value)}
              error={submitted && !!errors.username}
              helperText={submitted && errors.username}
              disabled={isLoading}
              fullWidth
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Email"
              type="email"
              value={staffData.email}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              error={submitted && !!errors.email}
              helperText={submitted && errors.email}
              disabled={isLoading}
              fullWidth
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Password"
              type="password"
              value={staffData.password}
              onChange={(e) => handleFieldChange('password', e.target.value)}
              error={submitted && !!errors.password}
              helperText={submitted && errors.password}
              disabled={isLoading}
              fullWidth
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="SSN"
              value={staffData.ssn}
              onChange={(e) => handleFieldChange('ssn', e.target.value)}
              error={submitted && !!errors.ssn}
              helperText={submitted && errors.ssn}
              disabled={isLoading}
              placeholder="XXX-XX-XXXX"
              fullWidth
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Phone Number"
              value={staffData.phoneNumber}
              onChange={(e) => handleFieldChange('phoneNumber', e.target.value)}
              error={submitted && !!errors.phoneNumber}
              helperText={submitted && errors.phoneNumber}
              disabled={isLoading}
              placeholder="+1XXXXXXXXXX"
              fullWidth
            />
          </Box>

          <Box mb={2}>
            <TextField
              label="Date of Birth"
              type="date"
              value={staffData.dateOfBirth}
              onChange={(e) => handleFieldChange('dateOfBirth', e.target.value)}
              error={submitted && !!errors.dateOfBirth}
              helperText={submitted && errors.dateOfBirth}
              disabled={isLoading}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>

          <Box mb={2}>
            <FormControl fullWidth error={submitted && !!errors.gender}>
              <InputLabel>Gender</InputLabel>
              <Select
                value={staffData.gender}
                onChange={(e) => handleFieldChange('gender', e.target.value)}
                disabled={isLoading}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Other">Other</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box mb={2}>
            <TextField
              label="Address"
              value={staffData.address}
              onChange={(e) => handleFieldChange('address', e.target.value)}
              error={submitted && !!errors.address}
              helperText={submitted && errors.address}
              disabled={isLoading}
              multiline
              rows={2}
              fullWidth
            />
          </Box>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isLoading}
            fullWidth
            sx={{ 
              py: 2,
              position: 'relative'
            }}
          >
            {isLoading ? (
              <>
                <CircularProgress
                  size={24}
                  sx={{
                    position: 'absolute',
                    left: '50%',
                    marginLeft: '-12px'
                  }}
                />
                Saving...
              </>
            ) : 'Add Staff Member'}
          </Button>
        </form>
      </Box>

      {/* Full-screen loading overlay */}
      <Backdrop
        sx={{ 
          color: '#fff', 
          zIndex: (theme) => theme.zIndex.drawer + 1 
        }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Container>
  );
};

export default AddStaffPage;