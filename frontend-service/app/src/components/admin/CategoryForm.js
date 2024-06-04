import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

const CategoryForm = ({ category, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    Name: '',
    Description: '',
  });

  useEffect(() => {
    if (category) {
      setFormData(category);
    }
  }, [category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = category ? 'PUT' : 'POST';
      const url = category ? `http://localhost:5010/api/categories/${category._id}` : 'http://localhost:5010/api/categories';
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
      console.error('Error saving category:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, bgcolor: 'background.paper' }}>
      <TextField
        label="Name"
        name="Name"
        value={formData.Name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Description"
        name="Description"
        value={formData.Description}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {category ? 'Update' : 'Add'} Category
      </Button>
    </Box>
  );
};

export default CategoryForm;
