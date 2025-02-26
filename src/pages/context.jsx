import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);

  // Function to add a new vehicle
  const addVehicle = async (vehicleData) => {
    const token = localStorage.getItem('token');
    await axios.post('/api/users/add', vehicleData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchVehicles(); // Refresh vehicles after adding
  };

  // Function to fetch all vehicles for the logged-in user
  const fetchVehicles = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/vehicles/user-vehicles', {
      headers: { Authorization: `Bearer ${token}` }
    });
    setVehicles(response.data);
  };

  // Fetch vehicles on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) fetchVehicles();
  }, []);

  return (
    <VehicleContext.Provider value={{ vehicles, addVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};
