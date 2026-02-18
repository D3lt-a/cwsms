import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';

const Reports = () => {
  const [services, setServices] = useState([]);
  const [payments, setPayments] = useState([]);
  const [packages, setPackages] = useState([]);
  const [reportData, setReportData] = useState({
    servicesPerPackage: [],
    totalRevenue: 0,
    totalServices: 0,
    totalPayments: 0,
  });

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
    const storedPayments = JSON.parse(localStorage.getItem('payments') || '[]');
    const storedPackages = JSON.parse(localStorage.getItem('packages') || '[]');
    setServices(storedServices);
    setPayments(storedPayments);
    setPackages(storedPackages);
    calculateReports(storedServices, storedPayments, storedPackages);
  }, []);

  const calculateReports = (services, payments, packages) => {
    const packageStats = packages.map(pkg => {
      const packageServices = services.filter(service => service.packageId === pkg.id);
      const totalRevenue = packageServices.reduce((sum, service) => sum + service.packagePrice, 0);
      return { packageName: pkg.name, packagePrice: pkg.price, totalServices: packageServices.length, totalRevenue: totalRevenue };
    });
    const totalRevenue = payments.reduce((sum, payment) => sum + payment.amount, 0);
    setReportData({ servicesPerPackage: packageStats, totalRevenue, totalServices: services.length, totalPayments: payments.length });
  };

  const packageTableHeaders = ['Package Name', 'Price (RWF)', 'Total Services', 'Total Revenue (RWF)'];
  const renderPackageRow = (pkg) => (
    <>
      <td className="px-6 py-4 text-sm font-semibold text-blue-600">{pkg.packageName}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{pkg.packagePrice.toLocaleString()} RWF</td>
      <td className="px-6 py-4 text-sm font-semibold text-purple-600">{pkg.totalServices}</td>
      <td className="px-6 py-4 text-sm font-bold text-green-600">{pkg.totalRevenue.toLocaleString()} RWF</td>
    </>
  );

  const paymentTableHeaders = ['#', 'Record Number', 'Car Plate', 'Package', 'Amount (RWF)', 'Date'];
  const renderPaymentRow = (payment, index) => (
    <>
      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
      <td className="px-6 py-4 text-sm font-mono text-blue-600">{payment.recordNumber}</td>
      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{payment.carPlate}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{payment.packageName}</td>
      <td className="px-6 py-4 text-sm font-bold text-green-600">{payment.amount.toLocaleString()} RWF</td>
      <td className="px-6 py-4 text-sm text-gray-900">{payment.paymentDate}</td>
    </>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Reports & Analytics</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6">
          <p className="text-blue-100 text-sm font-medium mb-1">Total Services</p>
          <p className="text-4xl font-bold">{reportData.totalServices}</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6">
          <p className="text-purple-100 text-sm font-medium mb-1">Total Payments</p>
          <p className="text-4xl font-bold">{reportData.totalPayments}</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6">
          <p className="text-green-100 text-sm font-medium mb-1">Total Revenue</p>
          <p className="text-3xl font-bold">{reportData.totalRevenue.toLocaleString()} RWF</p>
        </div>
      </div>
      <div className="mb-8">
        <Card title="Services Per Package Report">
          {reportData.servicesPerPackage.length === 0 ? (
            <div className="text-center py-8 text-gray-500"><p>No service data available yet.</p></div>
          ) : (
            <Table headers={packageTableHeaders} data={reportData.servicesPerPackage} renderRow={renderPackageRow} />
          )}
        </Card>
      </div>
      <div className="mb-8">
        <Card title="Payment Collection Report">
          {payments.length === 0 ? (
            <div className="text-center py-8 text-gray-500"><p>No payment data available yet.</p></div>
          ) : (
            <>
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-700">Grand Total Collected:</span>
                  <span className="text-2xl font-bold text-green-600">{reportData.totalRevenue.toLocaleString()} RWF</span>
                </div>
              </div>
              <Table headers={paymentTableHeaders} data={payments} renderRow={renderPaymentRow} />
            </>
          )}
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Quick Stats">
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Average Service Value</span>
              <span className="font-bold text-blue-600">{reportData.totalServices > 0 ? Math.round(reportData.totalRevenue / reportData.totalServices).toLocaleString() : 0} RWF</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700">Payment Rate</span>
              <span className="font-bold text-purple-600">{reportData.totalServices > 0 ? Math.round((reportData.totalPayments / reportData.totalServices) * 100) : 0}%</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Pending Payments</span>
              <span className="font-bold text-green-600">{reportData.totalServices - reportData.totalPayments}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Reports;
