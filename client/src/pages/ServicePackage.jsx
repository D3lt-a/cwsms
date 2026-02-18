import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import Table from '../components/Table';
import Input from '../components/Input';
import Button from '../components/Button';

const ServicePackage = () => {
  const [services, setServices] = useState([]);
  const [cars, setCars] = useState([]);
  const [packages, setPackages] = useState([]);
  const [formData, setFormData] = useState({
    carId: '',
    packageId: '',
    serviceDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
    const storedCars = JSON.parse(localStorage.getItem('cars') || '[]');
    const storedPackages = JSON.parse(localStorage.getItem('packages') || '[]');
    setServices(storedServices);
    setCars(storedCars);
    setPackages(storedPackages);
  }, []);

  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCar = cars.find(car => car.id === Number(formData.carId));
    const selectedPackage = packages.find(pkg => pkg.id === Number(formData.packageId));
    if (!selectedCar || !selectedPackage) { alert('Please select a valid car and package'); return; }
    
    const newService = {
      id: Date.now(),
      recordNumber: `SRV-${Date.now()}`,
      carId: selectedCar.id,
      carPlate: selectedCar.plateNumber,
      packageId: selectedPackage.id,
      packageName: selectedPackage.name,
      packagePrice: selectedPackage.price,
      serviceDate: formData.serviceDate,
      createdAt: new Date().toLocaleString(),
    };
    setServices([...services, newService]);
    setFormData({ carId: '', packageId: '', serviceDate: new Date().toISOString().split('T')[0] });
    alert('Service recorded successfully!');
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) setServices(services.filter((service) => service.id !== id));
  };

  const carOptions = cars.map(car => ({ value: car.id, label: `${car.plateNumber} - ${car.carType}` }));
  const packageOptions = packages.map(pkg => ({ value: pkg.id, label: `${pkg.name} - ${pkg.price.toLocaleString()} RWF` }));

  const tableHeaders = ['Record Number', 'Car Plate', 'Package Name', 'Price (RWF)', 'Service Date', 'Actions'];

  const renderRow = (service) => (
    <>
      <td className="px-6 py-4 text-sm font-mono text-gray-900">{service.recordNumber}</td>
      <td className="px-6 py-4 text-sm font-semibold text-blue-600">{service.carPlate}</td>
      <td className="px-6 py-4 text-sm text-gray-900">{service.packageName}</td>
      <td className="px-6 py-4 text-sm font-semibold text-green-600">{service.packagePrice.toLocaleString()} RWF</td>
      <td className="px-6 py-4 text-sm text-gray-900">{service.serviceDate}</td>
      <td className="px-6 py-4 text-sm"><button onClick={() => handleDelete(service.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button></td>
    </>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Service Package (Car Wash Records)</h1>
      {cars.length === 0 && <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"><p className="font-semibold">No cars registered yet!</p><p className="text-sm">Please register cars first.</p></div>}
      {packages.length === 0 && <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4"><p className="font-semibold">No packages available!</p><p className="text-sm">Please add packages first.</p></div>}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card title="Record New Service">
            <form onSubmit={handleSubmit}>
              <Input label="Select Car" type="select" name="carId" value={formData.carId} onChange={handleChange} options={carOptions} required />
              <Input label="Select Package" type="select" name="packageId" value={formData.packageId} onChange={handleChange} options={packageOptions} required />
              <Input label="Service Date" type="date" name="serviceDate" value={formData.serviceDate} onChange={handleChange} required />
              <Button type="submit" className="w-full">Record Service</Button>
            </form>
          </Card>
        </div>
        <div className="lg:col-span-2">
          <Card title={`Service Records (${services.length})`}>
            <Table headers={tableHeaders} data={services} renderRow={renderRow} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ServicePackage;
