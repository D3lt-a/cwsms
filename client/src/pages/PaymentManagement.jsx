import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import Input from '../components/Input';
import Button from '../components/Button';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    serviceId: '',
    amount: '',
    paymentDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const storedPayments = JSON.parse(localStorage.getItem('payments') || '[]');
    const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
    setPayments(storedPayments);
    setServices(storedServices);
  }, []);

  useEffect(() => {
    localStorage.setItem('payments', JSON.stringify(payments));
  }, [payments]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'serviceId') {
      const selectedService = services.find(service => service.id === Number(value));
      setFormData({ ...formData, serviceId: value, amount: selectedService ? selectedService.packagePrice : '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedService = services.find(service => service.id === Number(formData.serviceId));
    if (!selectedService) { alert('Please select a valid service record'); return; }
    const existingPayment = payments.find(payment => payment.serviceId === selectedService.id);
    if (existingPayment) { alert('Payment already recorded for this service!'); return; }
    
    const newPayment = {
      id: Date.now(),
      serviceId: selectedService.id,
      recordNumber: selectedService.recordNumber,
      carPlate: selectedService.carPlate,
      packageName: selectedService.packageName,
      amount: Number(formData.amount),
      paymentDate: formData.paymentDate,
      createdAt: new Date().toLocaleString(),
    };
    setPayments([...payments, newPayment]);
    setFormData({ serviceId: '', amount: '', paymentDate: new Date().toISOString().split('T')[0] });
    alert('Payment recorded successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) setPayments(payments.filter((payment) => payment.id !== id));
  };

  const paidServiceIds = payments.map(payment => payment.serviceId);
  const unpaidServices = services.filter(service => !paidServiceIds.includes(service.id));
  const serviceOptions = unpaidServices.map(service => ({ value: service.id, label: `${service.recordNumber} - ${service.carPlate} - ${service.packagePrice.toLocaleString()} RWF` }));

  const tableHeaders = ['#', 'Record Number', 'Car Plate', 'Package', 'Amount Paid (RWF)', 'Payment Date', 'Actions'];

  const renderRow = (payment, index) => (
    <>
      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
      <td className="px-6 py-4 text-sm font-mono text-blue-600">{payment.recordNumber}</td>
      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{payment.carPlate}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{payment.packageName}</td>
      <td className="px-6 py-4 text-sm font-bold text-green-600">{payment.amount.toLocaleString()} RWF</td>
      <td className="px-6 py-4 text-sm text-gray-900">{payment.paymentDate}</td>
      <td className="px-6 py-4 text-sm"><button onClick={() => handleDelete(payment.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button></td>
    </>
  );

  const totalPayments = payments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Payment Management</h1>
      {services.length === 0 && <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"><p className="font-semibold">No service records available!</p></div>}
      {unpaidServices.length === 0 && services.length > 0 && <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4"><p className="font-semibold">All services have been paid!</p></div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Record Payment">
            <form onSubmit={handleSubmit}>
              <Input label="Service Record" type="select" name="serviceId" value={formData.serviceId} onChange={handleChange} options={serviceOptions} required />
              <Input label="Amount Paid (RWF)" type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="Amount will auto-fill" required />
              <Input label="Payment Date" type="date" name="paymentDate" value={formData.paymentDate} onChange={handleChange} required />
              <Button type="submit" className="w-full">Record Payment</Button>
            </form>
            <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-gray-600">Total Payments</p>
              <p className="text-2xl font-bold text-green-600">{totalPayments.toLocaleString()} RWF</p>
            </div>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card title={`Payment Records (${payments.length})`}>
            <Table headers={tableHeaders} data={payments} renderRow={renderRow} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentManagement;
