import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import DashboardLayout from './components/layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Reports from './pages/Reports';
import Customers from './pages/Customers';
import Settings from './pages/Settings';
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
        <Route path="orders" element={<Orders />} />
        <Route path="reports" element={<Reports />} />
        
        {/* Customers Route */}
        <Route path="customers" element={<Customers />} />
        
        {/* Settings Route */}
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
