import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Box, Card, CardContent, AppBar, Toolbar, Tooltip, IconButton, InputAdornment, Alert } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import axios from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('/auth/login', { email, password });

      // Save the token in local storage
      const token = response.data.refresh_token;
      localStorage.setItem('token', token);

      // Fetch user details
      const userResponse = await axios.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const user = userResponse.data;
      setUser(user);
      setIsAuthenticated(true);

      // Redirect based on role
      if (user.role.IsAdmin) {
        navigate('/dashboard');
      } else {
        navigate('/home');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Card sx={{ width: '100%' }}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'center' }}>
                AUTHENTIFICATION
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
            <form onSubmit={handleLogin}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircleIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type="password"
                id="password"
                autoComplete="current-password"
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
              >
                Se connecter
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

export default LoginPage;
