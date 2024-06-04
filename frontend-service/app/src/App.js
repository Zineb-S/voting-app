import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import LoginPage from './components/authentication/LoginPage';
import RegisterPage from './components/authentication/RegisterPage';
import HomePage from './components/HomePage';
import Header from './components/Header';
import Dashboard from './components/admin/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, AuthContext } from './context/AuthContext'; // Ensure both are imported
import './style/App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#d32f2f',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
    },
    body1: {
      fontFamily: 'Roboto, sans-serif',
    },
    body2: {
      fontFamily: 'Roboto, sans-serif',
    },
  },
});

function App() {
  return (
    <div style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + '/background.jpg'})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      height: '100vh',
      width: '100vw'
    }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/login" element={<PublicRoute component={LoginPage} />} />
              <Route path="/register" element={<PublicRoute component={RegisterPage} />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} adminOnly={true} />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

function PublicRoute({ component: Component }) {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Show loading state until auth check is complete
  }

  return isAuthenticated ? <Navigate to="/home" /> : <Component />;
}

export default App;
