import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Box, IconButton, Button, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ElectionForm from './ElectionForm';

const ElectionsTable = () => {
  const [elections, setElections] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingElection, setEditingElection] = useState(null);

  useEffect(() => {
    fetchElections();
  }, []);

  const fetchElections = async () => {
    try {
      const response = await fetch('http://localhost:5020/api/elections');
      const data = await response.json();
      setElections(data);
    } catch (error) {
      console.error('Error fetching elections:', error);
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

  const handleEdit = (election) => {
    setEditingElection(election);
    setModalOpen(true);
  };

  const handleDelete = async (electionId) => {
    try {
      await fetch(`http://localhost:5020/api/elections/${electionId}`, {
        method: 'DELETE',
      });
      setElections(elections.filter(election => election._id !== electionId));
    } catch (error) {
      console.error('Error deleting election:', error);
    }
  };

  const handleAddElection = () => {
    setEditingElection(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingElection(null);
  };

  const filteredElections = elections.filter((election) =>
    (election.Title && election.Title.toLowerCase().includes(search.toLowerCase())) ||
    (election.Description && election.Description.toLowerCase().includes(search.toLowerCase()))
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
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddElection}>
          Add Election
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="elections table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date Start</TableCell>
              <TableCell>Date End</TableCell>
              <TableCell>Category ID</TableCell>
              <TableCell>isActive</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredElections.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((election) => (
              <TableRow key={election._id}>
                <TableCell>{election.Title}</TableCell>
                <TableCell>{election.Description}</TableCell>
                <TableCell>{new Date(election.DateStart).toLocaleString()}</TableCell>
                <TableCell>{new Date(election.DateEnd).toLocaleString()}</TableCell>
                <TableCell>{election.CategoryID}</TableCell>
                <TableCell>{election.isActive.toString()}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(election)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(election._id)}>
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
        count={filteredElections.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{ bgcolor: 'background.paper', p: 4 }}>
          <ElectionForm election={editingElection} onClose={handleCloseModal} onSave={fetchElections} />
        </Box>
      </Modal>
    </Paper>
  );
};

export default ElectionsTable;
