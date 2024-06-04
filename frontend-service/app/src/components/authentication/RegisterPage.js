import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Card, CardContent, Grid, AppBar, Toolbar, Tooltip, IconButton, InputAdornment, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import axios from '../../api/axios'; // Adjust the path as needed

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('/auth/register', { firstName, lastName, email, password });
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      setError('Failed to register');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card sx={{ width: '100%' }}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
                Inscription
              </Typography>
              <Tooltip title="Pour vous connecter, vous devez entrer le numéro de votre carte nationale CIM (ex: CD34839) et votre mot de passe.">
                <IconButton color="inherit">
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Toolbar>
          </AppBar>
          <CardContent>
            {error && <Alert severity="error">{error}</Alert>}
            <form onSubmit={handleSignUp}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Mot de passe"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="confirmPassword"
                    label="Confirmez le mot de passe"
                    type="password"
                    id="confirmPassword"
                    autoComplete="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                S'inscrire
              </Button>
            </form>
          </CardContent>
        </Card>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 2 }}>
          Pour des raisons de sécurité, fermez votre navigateur après vous être connecté aux services protégés !
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
