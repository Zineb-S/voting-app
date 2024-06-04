import React from 'react';
import { Typography, Box } from '@mui/material';

const HomePage = () => {
  return (
    <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Bienvenue sur la page d'accueil
      </Typography>
    </Box>
  );
};

export default HomePage;
