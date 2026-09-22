import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Card,
  CardContent,
  Avatar,
  Button,
  Divider,
  FormControl,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Warning as WarningIcon,
  ArrowUpward as ArrowUpIcon,
  ArrowDownward as ArrowDownIcon,
} from '@mui/icons-material';
import {
  AreaChart, Area, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

// ── Data ──────────────────────────────────────────────
const chartDataMap = {
  weekly: [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 5000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 6890 },
    { name: 'Sat', revenue: 8390 },
    { name: 'Sun', revenue: 9490 },
  ],
  monthly: [
    { name: 'Week 1', revenue: 28000 },
    { name: 'Week 2', revenue: 35000 },
    { name: 'Week 3', revenue: 42000 },
    { name: 'Week 4', revenue: 51000 },
  ],
  yearly: [
    { name: 'Jan', revenue: 120000 }, { name: 'Feb', revenue: 98000 },
    { name: 'Mar', revenue: 145000 }, { name: 'Apr', revenue: 130000 },
    { name: 'May', revenue: 160000 }, { name: 'Jun', revenue: 175000 },
    { name: 'Jul', revenue: 190000 }, { name: 'Aug', revenue: 210000 },
    { name: 'Sep', revenue: 195000 }, { name: 'Oct', revenue: 230000 },
    { name: 'Nov', revenue: 245000 }, { name: 'Dec', revenue: 280000 },
  ],
};

const recentOrders = [
  { id: '#1014', customer: 'Amal Perera',        time: '2 mins ago',  amount: 'Rs. 14,158', status: 'Processing' },
  { id: '#1024', customer: 'Nimal Silva',         time: '15 mins ago', amount: 'Rs. 8,249',  status: 'Delivered'  },
  { id: '#1034', customer: 'Kamal Fernando',      time: '1 hr ago',    amount: 'Rs. 8,552',  status: 'Processing' },
  { id: '#1044', customer: 'Saman Bandara',       time: '2 hrs ago',   amount: 'Rs. 13,727', status: 'Delivered'  },
  { id: '#1054', customer: 'Dilani Jayawardena',  time: '3 hrs ago',   amount: 'Rs. 6,499',  status: 'Pending'    },
  { id: '#1064', customer: 'Priya Senanayake',    time: '5 hrs ago',   amount: 'Rs. 21,000', status: 'Delivered'  },
];

const KPI_CARDS = [
  { title: 'Total Revenue',    value: 'Rs. 34,540', trend: '+12.5%',  up: true,  icon: <TrendingUpIcon />,    color: '#10B981', bgColor: 'rgba(16,185,129,0.1)'  },
  { title: 'New Orders',       value: '143',         trend: '+8.2%',   up: true,  icon: <ShoppingCartIcon />, color: '#6D28D9', bgColor: 'rgba(109,40,217,0.1)' },
  { title: 'Active Customers', value: '1,204',       trend: '+3.1%',   up: true,  icon: <PeopleIcon />,       color: '#F97316', bgColor: 'rgba(249,115,22,0.1)'  },
  { title: 'Low Stock Alerts', value: '12',          trend: '+4 items',up: false, icon: <WarningIcon />,      color: '#EF4444', bgColor: 'rgba(239,68,68,0.1)'   },
];

// ── Helpers ───────────────────────────────────────────
const formatRs = (value) => {
  if (value >= 1000000) return `Rs.${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000)    return `Rs.${(value / 1000).toFixed(0)}K`;
  return `Rs.${value}`;
};

const statusStyle = (status) => {
  const map = {
    Delivered:  { bg: 'rgba(16,185,129,0.1)',  color: '#10B981' },
    Processing: { bg: 'rgba(109,40,217,0.1)', color: '#6D28D9' },
    Pending:    { bg: 'rgba(249,115,22,0.1)', color: '#F97316' },
  };
  return map[status] || {};
};

const initials = (name) =>
  name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

// ── Custom Tooltip ────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Box sx={{ bgcolor: '#0F172A', color: 'white', px: 2, py: 1.5, borderRadius: 2, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.6)' }}>{label}</Typography>
        <Typography variant="body2" fontWeight="bold" sx={{ color: '#A78BFA' }}>
          Rs. {payload[0].value.toLocaleString()}
        </Typography>
      </Box>
    );
  }
  return null;
};

// ── Dashboard ─────────────────────────────────────────
const Dashboard = () => {
  const [revenueFilter, setRevenueFilter] = useState('weekly');

  return (
    <Box sx={{ width: '100%' }}>

      {/* Page Header */}
      <Box sx={{ mb: { xs: 2.5, md: 4 } }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
          sx={{ color: '#0F172A', fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' } }}
        >
          Overview
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back! Here is what's happening with your store today.
        </Typography>
      </Box>

      {/* ── KPI Cards ── */}
      <Box
        sx={{
          display: 'grid',
          // xs: 1 col (prevents cramping on small phones), sm: 2 cols, md: 4 cols
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
          gap: { xs: 1.5, sm: 2, md: 3 },
          mb: { xs: 2.5, md: 4 },
          width: '100%',
        }}
      >
        {KPI_CARDS.map((kpi, i) => (
          <Card
            key={i}
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': { transform: 'translateY(-3px)', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' },
            }}
          >
            <CardContent sx={{ p: { xs: 2, md: 3 }, '&:last-child': { pb: { xs: 2, md: 3 } } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: { xs: 1.5, md: 2 } }}>
                <Avatar sx={{ bgcolor: kpi.bgColor, color: kpi.color, width: { xs: 40, md: 48 }, height: { xs: 40, md: 48 } }}>
                  {kpi.icon}
                </Avatar>
                <Chip
                  size="small"
                  label={kpi.trend}
                  icon={kpi.up ? <ArrowUpIcon sx={{ fontSize: '12px !important' }} /> : <ArrowDownIcon sx={{ fontSize: '12px !important' }} />}
                  sx={{
                    fontSize: '0.65rem',
                    fontWeight: 700,
                    bgcolor: kpi.up ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    color: kpi.up ? '#10B981' : '#EF4444',
                    border: 'none',
                    '& .MuiChip-icon': { color: 'inherit' },
                  }}
                />
              </Box>
              <Typography
                fontWeight="bold"
                sx={{ mb: 0.5, lineHeight: 1.2, fontSize: { xs: '1.2rem', sm: '1.35rem', md: '1.5rem' } }}
              >
                {kpi.value}
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight="500" sx={{ fontSize: { xs: '0.78rem', md: '0.875rem' } }}>
                {kpi.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* ── Revenue Chart ── */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2, md: 3 },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          width: '100%',
          mb: 3,
          boxSizing: 'border-box',
        }}
      >
        {/* Chart header — wraps to column on small screens */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 }, flexWrap: 'wrap', gap: 1.5 }}>
          <Box>
            <Typography variant="h6" fontWeight="700" sx={{ color: '#0F172A', fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Revenue Overview
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Compare revenue across different periods
            </Typography>
          </Box>
          <FormControl size="small">
            <Select
              value={revenueFilter}
              onChange={(e) => setRevenueFilter(e.target.value)}
              sx={{ borderRadius: 2, minWidth: { xs: 120, sm: 150 }, bgcolor: '#F8FAFC', fontWeight: 500, fontSize: { xs: '0.82rem', md: '0.9rem' } }}
            >
              <MenuItem value="weekly">Last 7 Days</MenuItem>
              <MenuItem value="monthly">This Month</MenuItem>
              <MenuItem value="yearly">This Year</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Chart — shorter on mobile to avoid large blank space */}
        <Box sx={{ width: '100%', height: { xs: 200, sm: 260, md: 320 } }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartDataMap[revenueFilter]}
              margin={{ top: 10, right: 4, left: 4, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6D28D9" stopOpacity={0.35} />
                  <stop offset="95%" stopColor="#6D28D9" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E2E8F0" />
              <XAxis
                dataKey="name" axisLine={false} tickLine={false}
                tick={{ fill: '#64748B', fontSize: 11 }} dy={10}
              />
              <YAxis
                axisLine={false} tickLine={false}
                tick={{ fill: '#64748B', fontSize: 11 }}
                tickFormatter={formatRs}
                width={55}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone" dataKey="revenue"
                stroke="#6D28D9" strokeWidth={2.5}
                fillOpacity={1} fill="url(#colorRevenue)"
                dot={false}
                activeDot={{ r: 5, fill: '#6D28D9', strokeWidth: 2, stroke: '#fff' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Paper>

      {/* ── Recent Orders ── */}
      <Paper
        elevation={0}
        sx={{
          p: { xs: 1.5, sm: 2, md: 3 },
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: 3,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        {/* Section header — wraps on mobile */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 }, flexWrap: 'wrap', gap: 1.5 }}>
          <Box>
            <Typography variant="h6" fontWeight="700" sx={{ color: '#0F172A', fontSize: { xs: '1rem', md: '1.25rem' } }}>
              Recent Orders
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Latest {recentOrders.length} transactions
            </Typography>
          </Box>
          <Button
            variant="outlined" size="small"
            sx={{ borderRadius: 2, fontWeight: 600, textTransform: 'none', px: 2, fontSize: { xs: '0.75rem', md: '0.875rem' } }}
          >
            View All Orders
          </Button>
        </Box>

        {/*
          Orders grid:
          xs (mobile):  3 cols — Order | Status | Amount  (Customer hidden)
          sm+:          4 cols — Order | Customer | Status | Amount
          md+:          5 cols — Order | Customer | Time   | Status | Amount
        */}
        {/* Table Header */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '0.8fr 1fr 1fr', sm: '0.7fr 1.4fr 1fr 1fr', md: '0.5fr 1.4fr 1.2fr 1fr 1fr' },
            px: { xs: 1, md: 2 }, py: 1.2,
            mb: 0.5,
            bgcolor: '#F8FAFC',
            borderRadius: 2,
          }}
        >
          {/* xs headers */}
          <Typography variant="caption" fontWeight="700" color="text.secondary"
            sx={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.68rem' }}>Order</Typography>
          {/* Customer — hidden on xs */}
          <Typography variant="caption" fontWeight="700" color="text.secondary"
            sx={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.68rem', display: { xs: 'none', sm: 'block' } }}>Customer</Typography>
          {/* Time — hidden on xs, sm */}
          <Typography variant="caption" fontWeight="700" color="text.secondary"
            sx={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.68rem', display: { xs: 'none', md: 'block' } }}>Time</Typography>
          <Typography variant="caption" fontWeight="700" color="text.secondary"
            sx={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.68rem' }}>Status</Typography>
          <Typography variant="caption" fontWeight="700" color="text.secondary"
            sx={{ textTransform: 'uppercase', letterSpacing: '0.06em', fontSize: '0.68rem', textAlign: 'right' }}>Amount</Typography>
        </Box>

        {/* Table Rows */}
        {recentOrders.map((order, i) => {
          const s = statusStyle(order.status);
          return (
            <Box key={order.id}>
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: { xs: '0.8fr 1fr 1fr', sm: '0.7fr 1.4fr 1fr 1fr', md: '0.5fr 1.4fr 1.2fr 1fr 1fr' },
                  px: { xs: 1, md: 2 }, py: { xs: 1.2, md: 1.6 },
                  alignItems: 'center',
                  borderRadius: 2,
                  transition: 'background 0.15s',
                  '&:hover': { bgcolor: '#F8FAFC' },
                  cursor: 'pointer',
                }}
              >
                {/* Order ID */}
                <Typography variant="body2" fontWeight="700" sx={{ color: '#6D28D9', fontSize: { xs: '0.78rem', md: '0.875rem' } }}>
                  {order.id}
                </Typography>

                {/* Customer — hidden on xs */}
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: { xs: 26, md: 30 }, height: { xs: 26, md: 30 }, fontSize: '0.6rem', bgcolor: '#EDE9FE', color: '#6D28D9', fontWeight: 700, flexShrink: 0 }}>
                    {initials(order.customer)}
                  </Avatar>
                  <Typography variant="body2" fontWeight="600" sx={{ display: { xs: 'none', sm: 'block' }, fontSize: { sm: '0.78rem', md: '0.875rem' }, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {order.customer}
                  </Typography>
                </Box>

                {/* Time — hidden on xs, sm */}
                <Typography variant="body2" color="text.secondary" sx={{ display: { xs: 'none', md: 'block' }, fontSize: '0.8rem' }}>
                  {order.time}
                </Typography>

                {/* Status badge */}
                <Box>
                  <Typography
                    variant="caption"
                    fontWeight="700"
                    sx={{
                      px: { xs: 1, md: 1.5 }, py: 0.5,
                      borderRadius: 5,
                      bgcolor: s.bg,
                      color: s.color,
                      fontSize: { xs: '0.62rem', md: '0.72rem' },
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {order.status}
                  </Typography>
                </Box>

                {/* Amount */}
                <Typography
                  variant="body2"
                  fontWeight="700"
                  color="primary"
                  sx={{ textAlign: 'right', fontSize: { xs: '0.75rem', md: '0.875rem' }, whiteSpace: 'nowrap' }}
                >
                  {order.amount}
                </Typography>
              </Box>
              {i < recentOrders.length - 1 && <Divider sx={{ borderColor: '#F1F5F9' }} />}
            </Box>
          );
        })}
      </Paper>

    </Box>
  );
};

export default Dashboard;
