import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Stepper,
  Step,
  StepLabel,
  Grid,
} from '@mui/material';

const trackingSteps = ['Placed', 'Processing', 'Shipped', 'Delivered'];

const getStepIndex = (status) => {
  if (status === 'Cancelled') return -1;
  return trackingSteps.indexOf(status);
};

const OrderManagementModal = ({ open, onClose, order, onUpdateStatus }) => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (order) {
      setStatus(order.status);
    }
  }, [order, open]);

  const handleSave = () => {
    if (order && status !== order.status) {
      onUpdateStatus(order.id, status);
    }
    onClose();
  };

  if (!order) return null;

  const currentStep = getStepIndex(status);

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="md" 
      fullWidth
      PaperProps={{ sx: { borderRadius: 3 } }}
    >
      <DialogTitle sx={{ fontWeight: 'bold', pb: 1 }}>Manage Order {order.id}</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ display: 'grid', gap: 3, pt: 1 }}>
          
          {/* Order Details Header */}
          <Box sx={{ bgcolor: '#f8fafc', p: { xs: 2, md: 3 }, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Customer</Typography>
                <Typography variant="body1" fontWeight="600" sx={{ mt: 0.5 }}>{order.customer}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order Date</Typography>
                <Typography variant="body1" fontWeight="600" sx={{ mt: 0.5 }}>{order.date}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Amount</Typography>
                <Typography variant="body1" fontWeight="600" sx={{ mt: 0.5 }}>{order.total}</Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>Shipping Address</Typography>
                <Typography variant="body2" color="text.primary" sx={{ mt: 0.5, lineHeight: 1.4 }}>{order.address}</Typography>
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Purchased Items */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Purchased Items</Typography>
            {order.items && order.items.map((item, idx) => (
              <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">{item.qty}x {item.name}</Typography>
                <Typography variant="body2">{item.price}</Typography>
              </Box>
            ))}
          </Box>

          <Divider />

          {/* Tracking Status */}
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Update Tracking Status</Typography>
            
            <Box sx={{ mb: 4, mt: 2 }}>
              <Stepper activeStep={currentStep} alternativeLabel>
                {trackingSteps.map((label) => (
                  <Step key={label}>
                    <StepLabel error={status === 'Cancelled'}>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            <FormControl fullWidth size="small">
              <InputLabel>Order Status</InputLabel>
              <Select 
                label="Order Status" 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Placed">Placed</MenuItem>
                <MenuItem value="Processing">Processing</MenuItem>
                <MenuItem value="Shipped">Shipped</MenuItem>
                <MenuItem value="Delivered">Delivered</MenuItem>
                <Divider />
                <MenuItem value="Cancelled" sx={{ color: 'error.main' }}>Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Box>

        </Box>
      </DialogContent>
      <DialogActions sx={{ p: 2, pt: 1.5 }}>
        <Button onClick={onClose} color="inherit" sx={{ fontWeight: 600 }}>
          Cancel
        </Button>
        <Button 
          variant="contained" 
          onClick={handleSave} 
          disabled={status === order.status}
          sx={{ fontWeight: 'bold', borderRadius: 1.5, px: 3, boxShadow: 'none' }}
        >
          Update Status
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderManagementModal;
