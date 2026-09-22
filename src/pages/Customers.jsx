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
  Avatar,
  TextField,
  InputAdornment,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  MoreVert as MoreVertIcon,
  PersonAdd as PersonAddIcon,
  GetApp as ExportIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

// Mock Customer Data
const initialCustomers = [
  { id: 'CUST-001', name: 'Amal Perera', email: 'amal.p@example.com', phone: '+94 77 123 4567', joined: '12 Jan 2026', orders: 14, spent: 'Rs 45,200', status: 'Active', avatarColor: '#6D28D9' },
  { id: 'CUST-002', name: 'Nimal Silva', email: 'nimal.s@example.com', phone: '+94 71 234 5678', joined: '05 Mar 2026', orders: 3, spent: 'Rs 8,500', status: 'Active', avatarColor: '#F97316' },
  { id: 'CUST-003', name: 'Kamal Fernando', email: 'kamal.f@example.com', phone: '+94 76 345 6789', joined: '22 Apr 2026', orders: 21, spent: 'Rs 120,500', status: 'Active', avatarColor: '#10B981' },
  { id: 'CUST-004', name: 'Saman Bandara', email: 'saman.b@example.com', phone: '+94 77 456 7890', joined: '14 May 2026', orders: 1, spent: 'Rs 1,200', status: 'Inactive', avatarColor: '#64748B' },
  { id: 'CUST-005', name: 'Dilani Jayawardena', email: 'dilani.j@example.com', phone: '+94 70 567 8901', joined: '30 Jun 2026', orders: 8, spent: 'Rs 25,800', status: 'Active', avatarColor: '#EC4899' },
  { id: 'CUST-006', name: 'Sunil Rathnayake', email: 'sunil.r@example.com', phone: '+94 72 678 9012', joined: '10 Aug 2026', orders: 0, spent: 'Rs 0', status: 'Inactive', avatarColor: '#64748B' },
  { id: 'CUST-007', name: 'Chathurika Peiris', email: 'chathu.p@example.com', phone: '+94 75 789 0123', joined: '02 Sep 2026', orders: 5, spent: 'Rs 18,400', status: 'Active', avatarColor: '#3B82F6' },
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [searchTerm, setSearchTerm] = useState('');

  // Handle Search Filtering
  const filteredCustomers = customers.filter((cust) =>
    cust.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cust.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ width: '100%', pb: 4 }}>
      
      {/* ── Page Header ── */}
      <Box sx={{ mb: 4, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2 }}>
        <Box>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#0F172A', fontSize: { xs: '1.5rem', md: '2rem' } }}>
            Customer Directory
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            Manage your customer base, view purchase history, and track engagement.
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1.5, width: { xs: '100%', md: 'auto' } }}>
          <Button variant="outlined" startIcon={<ExportIcon />} sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none', borderColor: 'divider', color: 'text.secondary', '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }, flex: { xs: 1, md: 'none' } }}>
            Export
          </Button>
          <Button variant="contained" startIcon={<PersonAddIcon />} sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none', bgcolor: '#6D28D9', '&:hover': { bgcolor: '#4F46E5' }, boxShadow: '0 4px 14px rgba(109,40,217,0.3)', flex: { xs: 1, md: 'none' } }}>
            Add Customer
          </Button>
        </Box>
      </Box>

      {/* ── Filter & Search Bar ── */}
      <Paper elevation={0} sx={{ p: { xs: 2, md: 3 }, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 3, bgcolor: '#ffffff' }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            fullWidth
            placeholder="Search customers by name or email..."
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              flex: 1,
              minWidth: { xs: '100%', md: 300 },
              '& .MuiOutlinedInput-root': {
                bgcolor: '#f8fafc',
                borderRadius: 2,
                transition: 'all 0.2s',
                '&:hover': { bgcolor: '#f1f5f9' },
                '&.Mui-focused': { bgcolor: '#ffffff', boxShadow: '0 0 0 4px rgba(109,40,217,0.1)' }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="outlined" startIcon={<FilterListIcon />} sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none', color: 'text.secondary', borderColor: 'divider', px: 3, height: 56, width: { xs: '100%', md: 'auto' } }}>
            Filters
          </Button>
        </Box>
      </Paper>

      {/* ── Customers Table ── */}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden', bgcolor: '#ffffff' }}>
        
        <Box sx={{ px: 3, py: 2, bgcolor: '#f8fafc', borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1rem' }}>
            All Customers
          </Typography>
          <Chip label={`${filteredCustomers.length} Total`} size="small" variant="outlined" sx={{ fontWeight: 600, borderRadius: 1, fontSize: '0.75rem', bgcolor: '#ffffff' }} />
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'rgba(0,0,0,0.015)' }}>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', display: { xs: 'none', sm: 'table-cell' } }}>Contact</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase', display: { xs: 'none', md: 'table-cell' } }}>Joined</TableCell>
                <TableCell sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase' }}>Orders & Spent</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase' }}>Status</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary', fontSize: '0.75rem', textTransform: 'uppercase' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Avatar sx={{ width: 64, height: 64, bgcolor: '#f1f5f9', color: '#94a3b8', mx: 'auto', mb: 2 }}>
                      <SearchIcon fontSize="large" />
                    </Avatar>
                    <Typography variant="h6" fontWeight="bold" color="text.primary" gutterBottom>No customers found</Typography>
                    <Typography variant="body2" color="text.secondary">We couldn't find any customers matching "{searchTerm}"</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                filteredCustomers.map((row) => (
                  <TableRow key={row.id} sx={{ '&:last-child td': { border: 0 }, '&:hover': { bgcolor: '#fafafa' }, transition: 'background-color 0.2s' }}>
                    
                    {/* Customer Profile */}
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar sx={{ width: 42, height: 42, bgcolor: row.avatarColor, fontWeight: 'bold', fontSize: '1rem' }}>
                          {row.name.charAt(0)}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="700" color="text.primary">{row.name}</Typography>
                          <Typography variant="caption" color="text.secondary" sx={{ display: { xs: 'block', sm: 'none' } }}>{row.email}</Typography>
                          <Typography variant="caption" sx={{ color: '#6D28D9', fontWeight: 600, bgcolor: 'rgba(109,40,217,0.08)', px: 1, py: 0.2, borderRadius: 1, mt: 0.5, display: 'inline-block' }}>
                            {row.id}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    {/* Contact (Hidden on mobile) */}
                    <TableCell sx={{ display: { xs: 'none', sm: 'table-cell' } }}>
                      <Typography variant="body2" fontWeight="500">{row.email}</Typography>
                      <Typography variant="caption" color="text.secondary">{row.phone}</Typography>
                    </TableCell>

                    {/* Joined Date (Hidden on mobile and tablet) */}
                    <TableCell sx={{ display: { xs: 'none', md: 'table-cell' } }}>
                      <Typography variant="body2" color="text.secondary" fontWeight="500">{row.joined}</Typography>
                    </TableCell>

                    {/* Orders & Spent */}
                    <TableCell>
                      <Typography variant="body2" fontWeight="700">{row.spent}</Typography>
                      <Typography variant="caption" color="text.secondary">{row.orders} Orders</Typography>
                    </TableCell>

                    {/* Status */}
                    <TableCell align="center">
                      <Chip
                        label={row.status}
                        size="small"
                        sx={{
                          fontWeight: 700, borderRadius: 1.5, fontSize: '0.7rem', px: 1,
                          color: row.status === 'Active' ? '#10B981' : '#64748B',
                          bgcolor: row.status === 'Active' ? 'rgba(16,185,129,0.1)' : 'rgba(100,116,139,0.1)',
                        }}
                      />
                    </TableCell>

                    {/* Action */}
                    <TableCell align="right">
                      <Tooltip title="Delete Customer">
                        <IconButton size="small" sx={{ color: '#EF4444', '&:hover': { bgcolor: 'rgba(239,68,68,0.08)' } }}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>

                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Customers;
