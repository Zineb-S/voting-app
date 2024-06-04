import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ element, adminOnly = false }) => {
  const { isAuthenticated, user, loading } = useContext(AuthContext);

  console.log('ProtectedRoute - isAuthenticated:', isAuthenticated); // Log isAuthenticated
  console.log('ProtectedRoute - user:', user); // Log user
  console.log('ProtectedRoute - loading:', loading); // Log loading state

  if (loading) {
    return <div>Loading...</div>; // Show loading state until auth check is complete
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (adminOnly && user?.role?.IsAdmin !== true) {
    return <Navigate to="/home" />;
  }

  return element;
};

export default ProtectedRoute;
