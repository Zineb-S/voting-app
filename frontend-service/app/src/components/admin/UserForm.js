import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

const UserForm = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Password: '',
    DateOfBirth: '',
    PhoneNumber: '',
    Role: '',
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = user ? 'PUT' : 'POST';
      const url = user ? `http://localhost:5040/api/users/${user._id}` : 'http://localhost:5040/api/users';
      await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, bgcolor: 'background.paper' }}>
      <TextField
        label="First Name"
        name="FirstName"
        value={formData.FirstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Last Name"
        name="LastName"
        value={formData.LastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="Email"
        value={formData.Email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="Password"
        type="password"
        value={formData.Password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Date of Birth"
        name="DateOfBirth"
        type="date"
        value={formData.DateOfBirth.split('T')[0]}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Phone Number"
        name="PhoneNumber"
        value={formData.PhoneNumber}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Role"
        name="Role"
        value={formData.Role}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {user ? 'Update' : 'Add'} User
      </Button>
    </Box>
  );
};

export default UserForm;
