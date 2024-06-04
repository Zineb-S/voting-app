import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

const ElectionForm = ({ election, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    DateStart: '',
    DateEnd: '',
    CategoryID: '',
    Title: '',
    Description: '',
    isActive: true,
  });

  useEffect(() => {
    if (election) {
      setFormData({
        DateStart: election.DateStart.split('T')[0],
        DateEnd: election.DateEnd.split('T')[0],
        CategoryID: election.CategoryID,
        Title: election.Title,
        Description: election.Description,
        isActive: election.isActive,
      });
    }
  }, [election]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = election ? 'PUT' : 'POST';
      const url = election ? `http://localhost:5020/api/elections/${election._id}` : 'http://localhost:5020/api/elections';
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
      console.error('Error saving election:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3, bgcolor: 'background.paper' }}>
      <TextField
        label="Title"
        name="Title"
        value={formData.Title}
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
      <TextField
        label="Date Start"
        name="DateStart"
        type="date"
        value={formData.DateStart}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Date End"
        name="DateEnd"
        type="date"
        value={formData.DateEnd}
        onChange={handleChange}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        label="Category ID"
        name="CategoryID"
        value={formData.CategoryID}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="isActive"
        name="isActive"
        type="checkbox"
        checked={formData.isActive}
        onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
        {election ? 'Update' : 'Add'} Election
      </Button>
    </Box>
  );
};

export default ElectionForm;
