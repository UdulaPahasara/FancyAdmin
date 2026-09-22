import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';

const AddProductModal = ({ open, onClose, onAddProduct, categories, onAddCategory, initialData }) => {
  const [productForm, setProductForm] = useState({ name: '', category: '', price: '', stock: '' });
  
  // Inline Category Creation State
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  useEffect(() => {
    if (initialData) {
      setProductForm({
        name: initialData.name || '',
        category: initialData.category || '',
        price: initialData.price?.toString() || '',
        stock: initialData.stock?.toString() || ''
      });
    } else {
      setProductForm({ name: '', category: '', price: '', stock: '' });
    }
  }, [initialData, open]);

  const handleSaveProduct = () => {
    // Determine status based on stock
    let status = 'In Stock';
    if (productForm.stock === 0 || productForm.stock === '0') status = 'Out of Stock';
    else if (productForm.stock < 10) status = 'Low Stock';

    const newProduct = {
      id: initialData ? initialData.id : undefined,
      name: productForm.name,
      category: productForm.category,
      price: parseFloat(productForm.price) || 0,
      stock: parseInt(productForm.stock) || 0,
      status,
      image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=100&q=80', // Generic placeholder
    };

    onAddProduct(newProduct);
    
    // Reset form
    setProductForm({ name: '', category: '', price: '', stock: '' });
    setIsAddingCategory(false);
  };

  const handleAddNewCategory = () => {
    const trimmed = newCategoryName.trim();
    if (trimmed) {
      if (!categories.includes(trimmed)) {
        onAddCategory(trimmed);
      }
      setProductForm({ ...productForm, category: trimmed });
    }
    setIsAddingCategory(false);
    setNewCategoryName('');
  };

  const handleClose = () => {
    onClose();
    setProductForm({ name: '', category: '', price: '', stock: '' });
    setIsAddingCategory(false);
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }}>{initialData ? 'Edit Product' : 'Add New Product'}</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'grid', gap: 2.5, pt: 1 }}>
          
          <TextField 
            label="Product Name" 
            fullWidth 
            value={productForm.name} 
            onChange={(e) => setProductForm({...productForm, name: e.target.value})} 
          />
          
          {/* ── Category Selection / Inline Creation ── */}
          {!isAddingCategory ? (
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select 
                label="Category" 
                value={productForm.category}
                onChange={(e) => {
                  if (e.target.value === 'ADD_NEW') {
                    setIsAddingCategory(true);
                  } else {
                    setProductForm({...productForm, category: e.target.value});
                  }
                }}
              >
                {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
                <Divider sx={{ my: 0.5 }} />
                <MenuItem value="ADD_NEW" sx={{ color: 'primary.main', fontWeight: 'bold' }}>
                  + Add New Category
                </MenuItem>
              </Select>
            </FormControl>
          ) : (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', p: 1.5, bgcolor: '#f8fafc', borderRadius: 2, border: '1px solid #e2e8f0' }}>
              <TextField 
                label="New Category Name" 
                size="small"
                fullWidth 
                autoFocus
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNewCategory()}
              />
              <Button variant="contained" onClick={handleAddNewCategory} sx={{ minWidth: 80, height: 40, boxShadow: 'none' }}>
                Save
              </Button>
              <Button variant="outlined" color="inherit" onClick={() => setIsAddingCategory(false)} sx={{ minWidth: 80, height: 40 }}>
                Cancel
              </Button>
            </Box>
          )}

          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
             <TextField 
               label="Price (Rs)" 
               type="number" 
               fullWidth 
               value={productForm.price} 
               onChange={(e) => setProductForm({...productForm, price: e.target.value})} 
             />
             <TextField 
               label="Stock Quantity" 
               type="number" 
               fullWidth 
               value={productForm.stock} 
               onChange={(e) => setProductForm({...productForm, stock: e.target.value})} 
             />
          </Box>

        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 1.5 }}>
        <Button onClick={handleClose} color="inherit" sx={{ fontWeight: 600 }}>
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSaveProduct} 
          disabled={!productForm.name || !productForm.category || !productForm.price || !productForm.stock}
          sx={{ fontWeight: 'bold', borderRadius: 1.5, px: 3, boxShadow: 'none' }}
        >
          {initialData ? 'Update Product' : 'Create Product'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductModal;
