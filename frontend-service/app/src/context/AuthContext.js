import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    console.log(`Bearer ${token}`); // Log the token
    if (token) {
      try {
        const response = await axios.get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Auth check response:', response.data); // Log the response data
        setUser(response.data);
        setIsAuthenticated(true);
      } catch (err) {
        console.error('Authentication check failed:', err);
        localStorage.removeItem('token');
      }
    }
    setLoading(false); // Set loading to false after check
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, setIsAuthenticated, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };
export default AuthProvider;
