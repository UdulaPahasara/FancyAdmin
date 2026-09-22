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
  Tabs,
  Tab,
} from '@mui/material';
import OrderManagementModal from '../components/OrderManagementModal';

// Mock Order Data
const initialOrders = [
  { 
    id: '#ORD-9831', 
    customer: 'Amal Perera', 
    date: '12 Sept 2026', 
    total: 'Rs 1,900.00', 
    status: 'Delivered',
    address: '123 Main St, Colombo 03',
    items: [
      { qty: 2, name: 'Nivea Intensive Body Wash', price: 'Rs 1,900.00' }
    ]
  },
  { 
    id: '#ORD-9832', 
    customer: 'Nimal Silva', 
    date: '14 Sept 2026', 
    total: 'Rs 850.00', 
    status: 'Processing',
    address: '45/B Galle Rd, Mount Lavinia',
    items: [
      { qty: 1, name: "L'Oreal Paris Shampoo", price: 'Rs 850.00' }
    ]
  },
  { 
    id: '#ORD-9833', 
    customer: 'Kamal Fernando', 
    date: '15 Sept 2026', 
    total: 'Rs 4,500.00', 
    status: 'Placed',
    address: '7 Temple Rd, Kandy',
    items: [
      { qty: 1, name: 'Olay Regenerist Micro-Sculpting Cream', price: 'Rs 4,500.00' }
    ]
  },
  { 
    id: '#ORD-9834', 
    customer: 'Saman Bandara', 
    date: '16 Sept 2026', 
    total: 'Rs 1,200.00', 
    status: 'Shipped',
    address: '88 High Level Rd, Nugegoda',
    items: [
      { qty: 1, name: 'Garnier Micellar Water', price: 'Rs 1,200.00' }
    ]
  },
  { 
    id: '#ORD-9835', 
    customer: 'Dilani Jayawardena', 
    date: '16 Sept 2026', 
    total: 'Rs 3,200.00', 
    status: 'Cancelled',
    address: '12 Park Ave, Colombo 07',
    items: [
      { qty: 1, name: 'Dove Beauty Bar 6-Pack', price: 'Rs 3,200.00' }
    ]
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Placed': return 'info';
    case 'Processing': return 'warning';
    case 'Shipped': return 'secondary';
    case 'Delivered': return 'success';
    case 'Cancelled': return 'error';
    default: return 'default';
  }
};

const filterTabs = ['All', 'Placed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const Orders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleManageClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const activeFilter = filterTabs[tabIndex];
  const filteredOrders = activeFilter === 'All' 
    ? orders 
    : orders.filter(o => o.status === activeFilter);

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Order Management
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track and update customer orders.
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
        
        {/* Filter Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 2, pt: 1, bgcolor: '#f8fafc' }}>
          <Tabs 
            value={tabIndex} 
            onChange={handleTabChange} 
            variant="scrollable"
            scrollButtons="auto"
          >
            {filterTabs.map((label, idx) => (
              <Tab key={idx} label={label} sx={{ fontWeight: 600, textTransform: 'none' }} />
            ))}
          </Tabs>
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="orders table">
            <TableHead sx={{ bgcolor: 'rgba(0,0,0,0.02)' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Order ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Date</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Total Amount</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="center">Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                    <Typography variant="body2" color="text.secondary">No orders found for this status.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { bgcolor: 'rgba(0,0,0,0.01)' } }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: 600, color: 'primary.main' }}>
                      {row.id}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 500 }}>{row.customer}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.total}</TableCell>
                    <TableCell align="center">
                      <Chip 
                        label={row.status} 
                        color={getStatusColor(row.status)} 
                        size="small" 
                        variant="outlined" 
                        sx={{ fontWeight: 'bold', borderRadius: 1 }} 
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" color="primary" onClick={() => handleManageClick(row)}>
                        Manage
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Order Management Modal */}
      <OrderManagementModal 
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
        onUpdateStatus={handleUpdateStatus}
      />
    </Box>
  );
};

export default Orders;
