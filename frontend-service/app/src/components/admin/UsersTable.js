import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Box, IconButton, Button, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import UserForm from './UserForm';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5040/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

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

  const handleEdit = (user) => {
    setEditingUser(user);
    setModalOpen(true);
  };

  const handleDelete = async (userId) => {
    try {
      await fetch(`http://localhost:5040/api/users/${userId}`, {
        method: 'DELETE',
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingUser(null);
  };

  const filteredUsers = users.filter((user) =>
    (user.FirstName && user.FirstName.toLowerCase().includes(search.toLowerCase())) ||
    (user.LastName && user.LastName.toLowerCase().includes(search.toLowerCase())) ||
    (user.Email && user.Email.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Paper>
      <Box sx={{ padding: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={handleSearch}
        />
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddUser}>
          Add User
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="users table">
          <TableHead>
            <TableRow>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date of Birth</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.FirstName}</TableCell>
                <TableCell>{user.LastName}</TableCell>
                <TableCell>{user.Email}</TableCell>
                <TableCell>{new Date(user.DateOfBirth).toLocaleDateString()}</TableCell>
                <TableCell>{user.PhoneNumber}</TableCell>
                <TableCell>{user.Role}</TableCell>
                <TableCell>{new Date(user.CreatedAt).toLocaleString()}</TableCell>
                <TableCell>{new Date(user.UpdatedAt).toLocaleString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(user)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(user._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredUsers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{ bgcolor: 'background.paper', p: 4 }}>
          <UserForm user={editingUser} onClose={handleCloseModal} onSave={fetchUsers} />
        </Box>
      </Modal>
    </Paper>
  );
};

export default UsersTable;
