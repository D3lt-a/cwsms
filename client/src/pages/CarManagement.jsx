import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import Input from '../components/Input';
import Button from '../components/Button';

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [formData, setFormData] = useState({
    plateNumber: '',
    carType: '',
    carSize: '',
    driverName: '',
    phoneNumber: '',
  });

  const carTypes = [
    { value: 'Sedan', label: 'Sedan' },
    { value: 'SUV', label: 'SUV' },
    { value: 'Truck', label: 'Truck' },
    { value: 'Van', label: 'Van' },
    { value: 'Coupe', label: 'Coupe' },
  ];

  const carSizes = [
    { value: 'Small', label: 'Small' },
    { value: 'Medium', label: 'Medium' },
    { value: 'Large', label: 'Large' },
  ];

  useEffect(() => {
    const storedCars = JSON.parse(localStorage.getItem('cars') || '[]');
    setCars(storedCars);
  }, []);

  useEffect(() => {
    localStorage.setItem('cars', JSON.stringify(cars));
  }, [cars]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCar = { id: Date.now(), ...formData, createdAt: new Date().toLocaleString() };
    setCars([...cars, newCar]);
    setFormData({ plateNumber: '', carType: '', carSize: '', driverName: '', phoneNumber: '' });
    alert('Car registered successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setCars(cars.filter((car) => car.id !== id));
    }
  };

  const tableHeaders = ['#', 'Plate Number', 'Car Type', 'Car Size', 'Driver Name', 'Phone Number', 'Actions'];

  const renderRow = (car, index) => (
    <>
      <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>
      <td className="px-6 py-4 text-sm font-semibold text-blue-600">{car.plateNumber}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{car.carType}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{car.carSize}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{car.driverName}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{car.phoneNumber}</td>
      <td className="px-6 py-4 text-sm">
        <button onClick={() => handleDelete(car.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
      </td>
    </>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Car Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Register New Car">
            <form onSubmit={handleSubmit}>
              <Input label="Plate Number" name="plateNumber" value={formData.plateNumber} onChange={handleChange} placeholder="e.g., RAD 123 A" required />
              <Input label="Car Type" type="select" name="carType" value={formData.carType} onChange={handleChange} options={carTypes} required />
              <Input label="Car Size" type="select" name="carSize" value={formData.carSize} onChange={handleChange} options={carSizes} required />
              <Input label="Driver Name" name="driverName" value={formData.driverName} onChange={handleChange} placeholder="Enter driver name" required />
              <Input label="Phone Number" type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="e.g., 0788123456" required />
              <Button type="submit" className="w-full">Register Car</Button>
            </form>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card title={`Registered Cars (${cars.length})`}>
            <Table headers={tableHeaders} data={cars} renderRow={renderRow} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CarManagement;
