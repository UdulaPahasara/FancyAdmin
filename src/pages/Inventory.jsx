import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  TextField,
  InputAdornment,
  Avatar,
  IconButton
} from '@mui/material';
import { Add as AddIcon, Search as SearchIcon, Delete as DeleteIcon } from '@mui/icons-material';
import AddProductModal from '../components/AddProductModal';

// Mock inventory data
const inventoryData = [
  { id: 1, name: 'Herbal Essence Shampoo', category: 'Hair Care', price: 12.99, stock: 45, status: 'In Stock', image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=100&q=80' },
  { id: 2, name: 'Purifying Face Wash', category: 'Skincare', price: 8.50, stock: 5, status: 'Low Stock', image: 'https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=100&q=80' },
  { id: 3, name: 'Aloe Vera Body Wash', category: 'Body Care', price: 10.00, stock: 0, status: 'Out of Stock', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=100&q=80' },
  { id: 4, name: 'Nourishing Conditioner', category: 'Hair Care', price: 14.00, stock: 120, status: 'In Stock', image: 'https://images.unsplash.com/photo-1585232351009-aa87416fca90?auto=format&fit=crop&w=100&q=80' },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'In Stock': return 'success';
    case 'Low Stock': return 'warning';
    case 'Out of Stock': return 'error';
    default: return 'default';
  }
};

const initialCategories = ['Hair Care', 'Skincare', 'Body Care', 'Accessories'];

const Inventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [inventory, setInventory] = useState(inventoryData);
  const [categories, setCategories] = useState(initialCategories);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const filteredData = inventory.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 4, flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Inventory Management
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your products, pricing, and stock levels.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', flexWrap: 'wrap' }}>
          <TextField
            placeholder="Search products..."
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 2, bgcolor: 'white', minWidth: 250 }
            }}
          />
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddIcon />} 
            onClick={() => { setProductToEdit(null); setOpenAddModal(true); }}
            sx={{ borderRadius: 2, height: 40 }}
          >
            Add Product
          </Button>
        </Box>
      </Box>

      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="inventory table">
            <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Product Name</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Price</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Stock</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'rgba(0,0,0,0.01)' } }}
                >
                  <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                      <Avatar src={row.image} variant="rounded" sx={{ width: 40, height: 40 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell align="right">Rs. {row.price.toFixed(2)}</TableCell>
                  <TableCell align="right">{row.stock}</TableCell>
                  <TableCell align="center">
                    <Chip 
                      label={row.status} 
                      color={getStatusColor(row.status)} 
                      size="small" 
                      variant="outlined" 
                      sx={{ fontWeight: 'bold', borderRadius: 1 }} 
                    />
                  </TableCell>
                  <TableCell align="right" sx={{ whiteSpace: 'nowrap' }}>
                    <Button size="small" color="primary" onClick={() => { setProductToEdit(row); setOpenAddModal(true); }}>
                      Edit
                    </Button>
                    <IconButton size="small" color="error" onClick={() => setInventory(inventory.filter(p => p.id !== row.id))} sx={{ ml: 0.5 }}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <AddProductModal 
        open={openAddModal} 
        onClose={() => setOpenAddModal(false)}
        categories={categories}
        initialData={productToEdit}
        onAddCategory={(newCat) => setCategories([...categories, newCat])}
        onAddProduct={(newProduct) => {
          if (productToEdit) {
            setInventory(inventory.map(p => p.id === productToEdit.id ? newProduct : p));
          } else {
            setInventory([{ id: inventory.length + 1, ...newProduct }, ...inventory]);
          }
          setOpenAddModal(false);
        }}
      />
    </Box>
  );
};

export default Inventory;
