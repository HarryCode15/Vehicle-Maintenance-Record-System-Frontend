// src/pages/VehicleInfoForm.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { VehicleContext } from '../pages/context.jsx';
import Header from '../components/Header.jsx';
import VehicleInformation from '../components/VehicleInformation';
import ServiceInformation from '../components/ServiceInformation';

function VehicleInfoForm() {
  const navigate = useNavigate();
  const { addVehicle } = useContext(VehicleContext); // Use the context

  const [vehicleData, setVehicleData] = useState({
    make: '',
    model: '',
    registration: '',
    vin: '',
    lastServiceDate: '',
    nextServiceDate: '',
  });

  const [serviceData, setServiceData] = useState({
    serviceType: '',
    serviceCenter: '',
    cost: '',
  });

  const handleVehicleChange = (e) => {
    setVehicleData({ ...vehicleData, [e.target.name]: e.target.value });
  };

  const handleServiceChange = (e) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const combinedData = { ...vehicleData, ...serviceData };
    addVehicle(combinedData); // Add vehicle to context
    navigate('/vehicle-info-display'); // Navigate to display page
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-start p-6 bg-gray-100 min-h-screen">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Vehicle and Service Information Form</h2>
          <VehicleInformation vehicleData={vehicleData} handleChange={handleVehicleChange} />
          <ServiceInformation serviceData={serviceData} handleChange={handleServiceChange} />
          <div className="mt-6">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full">
              Submit Information
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VehicleInfoForm;
