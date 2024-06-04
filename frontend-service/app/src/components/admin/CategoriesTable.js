import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Box, IconButton, Button, Modal } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CategoryForm from './CategoryForm';

const CategoriesTable = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5010/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
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

  const handleEdit = (category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleDelete = async (categoryId) => {
    try {
      await fetch(`http://localhost:5010/api/categories/${categoryId}`, {
        method: 'DELETE',
      });
      setCategories(categories.filter(category => category._id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingCategory(null);
  };

  const filteredCategories = categories.filter((category) =>
    (category.Name && category.Name.toLowerCase().includes(search.toLowerCase())) ||
    (category.Description && category.Description.toLowerCase().includes(search.toLowerCase()))
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
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAddCategory}>
          Add Category
        </Button>
      </Box>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="categories table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
              <TableRow key={category._id}>
                <TableCell>{category.Name}</TableCell>
                <TableCell>{category.Description}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(category)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(category._id)}>
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
        count={filteredCategories.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={{ bgcolor: 'background.paper', p: 4 }}>
          <CategoryForm category={editingCategory} onClose={handleCloseModal} onSave={fetchCategories} />
        </Box>
      </Modal>
    </Paper>
  );
};

export default CategoriesTable;
