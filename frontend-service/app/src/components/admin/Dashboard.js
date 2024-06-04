import React, { useState } from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField } from '@mui/material';
import UsersTable from './UsersTable';
import ElectionsTable from './ElectionsTable';
import CategoriesTable from './CategoriesTable';

const Dashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const users = [
    {
      _id: "665afc6337a35cc1ef5f40ca",
      FirstName: "Updated First Name",
      LastName: "Updated Last Name",
      Email: "updated@example.com",
      Password: "newpassword",
      DateOfBirth: "1990-01-01T00:00:00.000Z",
      PhoneNumber: "1234567890",
      Role: "665af1222e2a3424d3a2ea87",
      CreatedAt: "2024-06-01T10:48:03.583Z",
      UpdatedAt: "2024-06-01T10:48:03.583Z",
      __v: 0,
    },
    // Add more user objects if needed
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    setPage(0);
  };

  const filteredUsers = users.filter((user) =>
    user.FirstName.toLowerCase().includes(search.toLowerCase()) ||
    user.LastName.toLowerCase().includes(search.toLowerCase()) ||
    user.Email.toLowerCase().includes(search.toLowerCase())
  );
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <><Box sx={{ mt: 8, display: 'flex', width: '100%' }}>
        <Box sx={{ borderRight: 1, borderColor: 'divider', width: '200px' }}>
          <Tabs
            orientation="vertical"
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="Dashboard tabs"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Roles" />
            <Tab label="Utilisateurs" />
            <Tab label="Categories" />
            <Tab label="Elections" />
          </Tabs>
        </Box>
        <Box sx={{ flexGrow: 1, p: 3 }}>

          {selectedTab === 0 && (
            <Box>
              <Typography variant="h6">Roles Table</Typography>
              {/* Add your Users table component here */}
            </Box>
          )}
          {selectedTab === 1 && (
            <Box>
              <Typography variant="h6">Utilisateurs Table</Typography>
              <UsersTable/>
                </Box>
          )}
          {selectedTab === 2 && (
            <Box>
              <Typography variant="h6">Categories Table</Typography>
              <CategoriesTable/>
            </Box>
          )}
          {selectedTab === 3 && (
            <Box>
              <Typography variant="h6">Elections Table</Typography>
              <ElectionsTable/>
            </Box>
          )}
        </Box>
      </Box></>
  );
};

export default Dashboard;
