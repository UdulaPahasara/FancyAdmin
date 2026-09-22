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
  Grid,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Avatar,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import {
  Download as DownloadIcon,
  TrendingUp as SalesIcon,
  Inventory as InventoryIcon,
  ShoppingCart as OrderIcon,
  PictureAsPdf as PdfIcon,
  Description as CsvIcon,
  AutoGraph as GenerateIcon,
  History as HistoryIcon,
  Close as CloseIcon,
  Print as PrintIcon,
} from '@mui/icons-material';

// ── Report Type Config ─────────────────────────────────────────────
const REPORT_TYPES = [
  { value: 'Sales Summary',         icon: <SalesIcon />,     color: '#6D28D9', bg: 'rgba(109,40,217,0.1)' },
  { value: 'Inventory & Low Stock', icon: <InventoryIcon />, color: '#F97316', bg: 'rgba(249,115,22,0.1)' },
  { value: 'Pending Orders',        icon: <OrderIcon />,     color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
];



const initialHistory = [
  { id: 'REP-1004', type: 'Sales Summary',         date: '21 Sept 2026', range: 'This Month',  format: 'PDF' },
  { id: 'REP-1003', type: 'Inventory & Low Stock', date: '15 Sept 2026', range: 'All Time',    format: 'PDF' },
  { id: 'REP-1002', type: 'Pending Orders',        date: '01 Sept 2026', range: 'Last 7 Days', format: 'PDF' },
];

const Reports = () => {
  const [history, setHistory]           = useState(initialHistory);
  const [reportType, setReportType]     = useState('Sales Summary');
  const [startDate, setStartDate]       = useState('');
  const [endDate, setEndDate]           = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [previewReport, setPreviewReport] = useState(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const rangeLabel = startDate && endDate ? `${startDate} → ${endDate}` : 'All Time';
      setHistory(prev => [{
        id: `REP-${1005 + prev.length}`,
        type: reportType,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        range: rangeLabel,
        format: 'PDF',
      }, ...prev]);
      setIsGenerating(false);
      setSnackbarOpen(true);
      setStartDate(''); setEndDate('');
    }, 1500);
  };

  const selectedType = REPORT_TYPES.find(r => r.value === reportType) || REPORT_TYPES[0];

  return (
    <Box sx={{ width: '100%' }}>

      {/* ── Page Header ── */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" fontWeight="bold" sx={{ color: '#0F172A', fontSize: { xs: '1.5rem', md: '2rem' } }}>
          Reports & Analytics
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Configure, generate, and download detailed business reports.
        </Typography>
      </Box>

      {/* ══ FILTER CARD (full-width horizontal) ══ */}
      <Paper
        elevation={0}
        sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden', mb: 3 }}
      >
        {/* Gradient Header */}
        <Box sx={{
          px: { xs: 2.5, md: 4 }, py: 2,
          background: 'linear-gradient(135deg, #6D28D9 0%, #4F46E5 100%)',
          display: 'flex', alignItems: 'center', gap: 1.5,
        }}>
          <GenerateIcon sx={{ color: 'rgba(255,255,255,0.9)', fontSize: 20 }} />
          <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'white' }}>
            Generate New Report
          </Typography>
        </Box>

        {/* Horizontal Filters Row */}
        <Box sx={{ px: { xs: 2, md: 3, lg: 4 }, py: { xs: 2.5, md: 3 } }}>
          <Grid container spacing={{ xs: 2, lg: 3 }} alignItems="flex-start" justifyContent={{ xs: 'flex-start', md: 'center' }}>

            {/* Report Type */}
            <Grid item xs={12} sm={6} md="auto">
              <Typography variant="caption" fontWeight="700" color="text.secondary"
                sx={{ textTransform: 'uppercase', letterSpacing: '0.07em', mb: 1, display: 'block' }}>
                Report Type
              </Typography>
              <FormControl size="small" sx={{ minWidth: { xs: '100%', md: 240 } }}>
                <Select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  sx={{ bgcolor: '#f8fafc', borderRadius: 2, height: 40 }}
                  renderValue={(val) => {
                    const rt = REPORT_TYPES.find(r => r.value === val);
                    return (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ width: 22, height: 22, bgcolor: rt?.bg, color: rt?.color }}>
                          {React.cloneElement(rt?.icon || <SalesIcon />, { sx: { fontSize: 14 } })}
                        </Avatar>
                        <Typography variant="body2" fontWeight="600">{val}</Typography>
                      </Box>
                    );
                  }}
                >
                  {REPORT_TYPES.map(rt => (
                    <MenuItem key={rt.value} value={rt.value}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: rt.bg, color: rt.color }}>
                          {React.cloneElement(rt.icon, { sx: { fontSize: 16 } })}
                        </Avatar>
                        {rt.value}
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Date Range */}
            <Grid item xs={12} sm={6} md="auto">
              <Typography variant="caption" fontWeight="700" color="text.secondary"
                sx={{ textTransform: 'uppercase', letterSpacing: '0.07em', mb: 1, display: 'block' }}>
                Date Range
              </Typography>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField type="date" size="small" fullWidth
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      sx={{ '& .MuiInputBase-root': { fontSize: '0.82rem', bgcolor: '#f8fafc', borderRadius: 2, height: 40, minWidth: { md: 130 } } }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField type="date" size="small" fullWidth
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      sx={{ '& .MuiInputBase-root': { fontSize: '0.82rem', bgcolor: '#f8fafc', borderRadius: 2, height: 40, minWidth: { md: 130 } } }}
                    />
                  </Grid>
                </Grid>
            </Grid>



            {/* Generate Button */}
            <Grid item xs={12} sm={6} md="auto" sx={{ ml: { sm: 'auto' }, display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
              <Box sx={{ width: { xs: '100%', md: 'auto' }, minWidth: { md: 200 } }}>
                <Typography variant="caption" sx={{ mb: 1, display: { xs: 'none', md: 'block' }, visibility: 'hidden' }}>
                  Generate
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                  startIcon={isGenerating ? <CircularProgress size={18} color="inherit" /> : <GenerateIcon />}
                  sx={{
                    borderRadius: 2, fontWeight: 'bold', height: 40, width: '100%',
                    background: isGenerating ? undefined : 'linear-gradient(135deg, #6D28D9, #4F46E5)',
                    boxShadow: '0 4px 14px rgba(109,40,217,0.3)',
                    textTransform: 'none', fontSize: { xs: '0.95rem', md: '0.8rem', lg: '0.95rem' },
                    whiteSpace: 'nowrap',
                    '&:hover': { boxShadow: '0 6px 20px rgba(109,40,217,0.45)', transform: 'translateY(-1px)' },
                    transition: 'all 0.2s',
                  }}
                >
                  {isGenerating ? 'Generating...' : <Box component="span">Generate <Box component="span" sx={{ display: { xs: 'inline', md: 'none', lg: 'inline' } }}>Report</Box></Box>}
                </Button>
              </Box>
            </Grid>

          </Grid>
        </Box>
      </Paper>

      {/* ══ HISTORY TABLE (full-width) ══ */}
      <Paper elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>

        {/* Table Header */}
        <Box sx={{
          px: { xs: 2.5, md: 4 }, py: 2.5,
          bgcolor: '#f8fafc', borderBottom: '1px solid', borderColor: 'divider',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1,
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <HistoryIcon color="action" fontSize="small" />
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: '1rem' }}>
              Recent Reports
            </Typography>
          </Box>
          <Chip label={`${history.length} reports`} size="small" variant="outlined"
            sx={{ fontWeight: 600, borderRadius: 1, fontSize: '0.75rem' }} />
        </Box>

        <TableContainer>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: 'rgba(0,0,0,0.015)' }}>
                {['Report ID', 'Report Details', 'Generated On', 'Format', 'Action'].map((h, i) => (
                  <TableCell key={h} align={i === 3 ? 'center' : i === 4 ? 'right' : 'left'}
                    sx={{
                      fontWeight: 700, color: '#475569', fontSize: '0.72rem',
                      textTransform: 'uppercase', letterSpacing: '0.07em',
                      display: i === 2 ? { xs: 'none', sm: 'table-cell' } : undefined,
                    }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {history.map((row) => {
                const rt = REPORT_TYPES.find(r => r.value === row.type) || REPORT_TYPES[0];
                return (
                  <TableRow key={row.id}
                    sx={{ '&:last-child td': { border: 0 }, '&:hover': { bgcolor: '#fafafa' } }}>
                    <TableCell sx={{ fontWeight: 700, color: '#6D28D9', fontSize: '0.85rem' }}>
                      {row.id}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 34, height: 34, bgcolor: rt.bg, color: rt.color, flexShrink: 0 }}>
                          {React.cloneElement(rt.icon, { sx: { fontSize: 18 } })}
                        </Avatar>
                        <Box>
                          <Typography variant="body2" fontWeight="600">{row.type}</Typography>
                          <Typography variant="caption" color="text.secondary">{row.range}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell sx={{ color: '#64748B', fontSize: '0.85rem', display: { xs: 'none', sm: 'table-cell' } }}>
                      {row.date}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        icon={row.format === 'PDF'
                          ? <PdfIcon sx={{ fontSize: '13px !important' }} />
                          : <CsvIcon sx={{ fontSize: '13px !important' }} />}
                        label={row.format}
                        size="small"
                        onClick={() => setPreviewReport(row)}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': { opacity: 0.8 },
                          fontWeight: 700, borderRadius: 1, fontSize: '0.72rem',
                          color: row.format === 'PDF' ? '#EF4444' : '#10B981',
                          bgcolor: row.format === 'PDF' ? 'rgba(239,68,68,0.08)' : 'rgba(16,185,129,0.08)',
                          border: '1px solid',
                          borderColor: row.format === 'PDF' ? 'rgba(239,68,68,0.3)' : 'rgba(16,185,129,0.3)',
                          '& .MuiChip-icon': { color: 'inherit' },
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Button size="small" startIcon={<DownloadIcon sx={{ fontSize: '16px !important' }} />}
                        onClick={() => setPreviewReport(row)}
                        sx={{
                          borderRadius: 1.5, fontWeight: 600, fontSize: '0.78rem', textTransform: 'none',
                          color: '#6D28D9', border: '1px solid rgba(109,40,217,0.25)',
                          '&:hover': { bgcolor: 'rgba(109,40,217,0.07)', borderColor: '#6D28D9' },
                          transition: 'all 0.15s',
                        }}>
                        Download
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* ── Success Toast ── */}
      <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={() => setSnackbarOpen(false)} severity="success" variant="filled"
          sx={{ width: '100%', borderRadius: 2, fontWeight: 'bold', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
          ✅ Report generated successfully!
        </Alert>
      </Snackbar>

      <Dialog open={!!previewReport} onClose={() => setPreviewReport(null)} maxWidth="md" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box>
            <Typography variant="h6" fontWeight="bold">Report Preview</Typography>
            <Typography variant="caption" color="text.secondary">
              {previewReport?.id} • {previewReport?.type}
            </Typography>
          </Box>
          <IconButton onClick={() => setPreviewReport(null)}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ bgcolor: '#f8fafc', p: { xs: 2, md: 4 }, display: 'flex', justifyContent: 'center' }}>
           <Paper sx={{ width: '100%', maxWidth: 700, minHeight: 400, p: 4, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: 2 }}>
              <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>{previewReport?.type}</Typography>
              <Typography variant="subtitle2" align="center" color="text.secondary" gutterBottom>
                 Date Range: {previewReport?.range} | Generated On: {previewReport?.date}
              </Typography>
              <Divider sx={{ my: 3 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, opacity: 0.6 }}>
                 {previewReport?.format === 'PDF' ? <PdfIcon sx={{ fontSize: 48, color: '#EF4444', mb: 2 }} /> : <CsvIcon sx={{ fontSize: 48, color: '#10B981', mb: 2 }} />}
                 <Typography variant="body1" align="center">
                    Mock document preview content for <strong>{previewReport?.id}</strong>.
                 </Typography>
                 <Typography variant="body2" align="center" color="text.secondary" sx={{ mt: 1 }}>
                    In a real application, the {previewReport?.format} viewer would render here.
                 </Typography>
              </Box>
           </Paper>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, px: 3, justifyContent: 'space-between', bgcolor: '#f8fafc' }}>
          <Button onClick={() => setPreviewReport(null)} color="inherit" sx={{ fontWeight: 600 }}>Close</Button>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button variant="outlined" startIcon={<DownloadIcon />} sx={{ fontWeight: 600, borderRadius: 1.5, borderColor: '#6D28D9', color: '#6D28D9' }} onClick={() => setPreviewReport(null)}>
              Download {previewReport?.format}
            </Button>
            <Button variant="contained" startIcon={<PrintIcon />} onClick={() => window.print()}
              sx={{ fontWeight: 600, borderRadius: 1.5, bgcolor: '#6D28D9', '&:hover': { bgcolor: '#4F46E5' }, textTransform: 'none' }}>
              Print
            </Button>
          </Box>
        </DialogActions>
      </Dialog>

    </Box>
  );
};

export default Reports;
