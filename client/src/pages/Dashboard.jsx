import React, { useState, useEffect } from 'react';
import Card from '../components/Card';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    totalPackages: 3,
    totalServices: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const cars = JSON.parse(localStorage.getItem('cars') || '[]');
    const services = JSON.parse(localStorage.getItem('services') || '[]');
    const payments = JSON.parse(localStorage.getItem('payments') || '[]');

    const totalRevenue = payments.reduce((sum, payment) => sum + Number(payment.amount), 0);

    setStats({
      totalCars: cars.length,
      totalPackages: 3,
      totalServices: services.length,
      totalRevenue: totalRevenue,
    });
  }, []);

  const statCards = [
    { title: 'Total Cars', value: stats.totalCars, icon: '🚗', color: 'bg-blue-500' },
    { title: 'Available Packages', value: stats.totalPackages, icon: '📦', color: 'bg-green-500' },
    { title: 'Total Services', value: stats.totalServices, icon: '🧼', color: 'bg-purple-500' },
    { title: 'Total Revenue', value: `${stats.totalRevenue.toLocaleString()} RWF`, icon: '💰', color: 'bg-yellow-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div
            key={index}
            className={`${stat.color} text-white rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white text-opacity-90 text-sm font-medium mb-1">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <span className="text-4xl">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      <Card title="Welcome to Car Washing Sales Management System">
        <p className="text-gray-600 mb-4">
          This system helps you manage your car washing business efficiently. Here's what you can do:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Register and manage customer cars</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Create and manage washing packages</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Record car wash services</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Track payments and revenue</span>
          </li>
          <li className="flex items-start">
            <span className="text-blue-600 mr-2">✓</span>
            <span>Generate comprehensive reports</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};

export default Dashboard;
