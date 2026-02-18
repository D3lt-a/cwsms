import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import Input from '../components/Input';
import Button from '../components/Button';

const PackageManagement = () => {
  const defaultPackages = [
    { id: 1, name: 'Basic Wash', description: 'Exterior wash only', price: 5000 },
    { id: 2, name: 'Classic Wash', description: 'Exterior wash + Interior vacuum', price: 10000 },
    { id: 3, name: 'Premium Wash', description: 'Full service: Exterior wash + Interior cleaning + Waxing', price: 20000 },
  ];

  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '', price: '' });

  useEffect(() => {
    const storedPackages = localStorage.getItem('packages');
    if (storedPackages) {
      setPackages(JSON.parse(storedPackages));
    } else {
      setPackages(defaultPackages);
      localStorage.setItem('packages', JSON.stringify(defaultPackages));
    }
  }, []);

  useEffect(() => {
    if (packages.length > 0) {
      localStorage.setItem('packages', JSON.stringify(packages));
    }
  }, [packages]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPackage = { id: Date.now(), ...formData, price: Number(formData.price) };
    setPackages([...packages, newPackage]);
    setFormData({ name: '', description: '', price: '' });
    alert('Package added successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter((pkg) => pkg.id !== id));
    }
  };

  const tableHeaders = ['#', 'Package Name', 'Description', 'Price (RWF)', 'Actions'];

  const renderRow = (pkg, index) => (
    <>
      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
      <td className="px-6 py-4 text-sm font-semibold text-blue-600">{pkg.name}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{pkg.description}</td>
      <td className="px-6 py-4 text-sm font-semibold text-green-600">{pkg.price.toLocaleString()} RWF</td>
      <td className="px-6 py-4 text-sm">
        <button onClick={() => handleDelete(pkg.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
      </td>
    </>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Package Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Add New Package">
            <form onSubmit={handleSubmit}>
              <Input label="Package Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g., Deluxe Wash" required />
              <Input label="Package Description" type="textarea" name="description" value={formData.description} onChange={handleChange} placeholder="Describe what's included..." required />
              <Input label="Package Price (RWF)" type="number" name="price" value={formData.price} onChange={handleChange} placeholder="e.g., 15000" required />
              <Button type="submit" className="w-full">Add Package</Button>
            </form>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card title={`Available Packages (${packages.length})`}>
            <Table headers={tableHeaders} data={packages} renderRow={renderRow} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PackageManagement;
