import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      
      {/* Dashboard Routes wrapped in the Layout */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Index route for /dashboard */}
        <Route index element={<Dashboard />} />
        {/* Child routes */}
        <Route path="inventory" element={<Inventory />} />
        
        {/* Placeholders for future pages */}
        <Route path="orders" element={<div style={{ padding: '2rem' }}>Orders Page (Coming Soon)</div>} />
        <Route path="customers" element={<div style={{ padding: '2rem' }}>Customers Page (Coming Soon)</div>} />
        <Route path="settings" element={<div style={{ padding: '2rem' }}>Settings Page (Coming Soon)</div>} />
      </Route>
    </Routes>
  );
}

export default App;
