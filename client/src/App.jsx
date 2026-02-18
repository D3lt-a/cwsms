import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Dashboard from './pages/Dashboard';
import CarManagement from './pages/CarManagement';
import PackageManagement from './pages/PackageManagement';
import ServicePackage from './pages/ServicePackage';
import PaymentManagement from './pages/PaymentManagement';
import Reports from './pages/Reports';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="cars" element={<CarManagement />} />
          <Route path="packages" element={<PackageManagement />} />
          <Route path="services" element={<ServicePackage />} />
          <Route path="payments" element={<PaymentManagement />} />
          <Route path="reports" element={<Reports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
