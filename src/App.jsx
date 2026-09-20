import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      {/* Future dashboard route */}
      <Route path="/dashboard" element={
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h2>Welcome to FancyAdmin Dashboard</h2>
          <p>The dashboard is currently under construction.</p>
        </div>
      } />
    </Routes>
  );
}

export default App;
