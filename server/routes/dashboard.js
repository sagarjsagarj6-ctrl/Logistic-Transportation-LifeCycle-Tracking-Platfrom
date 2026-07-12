import express from 'express';
import auth from '../middleware/auth.js';
import Trip from '../models/Trip.js';
import Vehicle from '../models/Vehicle.js';

const router = express.Router();

router.get('/admin', auth, async (req, res) => {
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ error: 'Administrator access required.' });
  }

  const vehicles = await Vehicle.find().populate('driver', 'name vehicleNumber');
  const trips = await Trip.find().populate('driver', 'name').populate('vehicle', 'number');

  const totalVehicles = vehicles.length;
  const activeVehicles = vehicles.filter((vehicle) => vehicle.active).length;
  const restingVehicles = totalVehicles - activeVehicles;
  const totalTrips = trips.length;
  const totalDeliveries = trips.reduce((sum, trip) => sum + trip.deliveriesCompleted, 0);
  const totalDistance = vehicles.reduce((sum, vehicle) => sum + vehicle.distanceTravelled, 0);
  const totalFuelCost = vehicles.reduce((sum, vehicle) => sum + vehicle.fuelCost, 0);
  const totalMaintenanceCost = vehicles.reduce((sum, vehicle) => sum + vehicle.maintenanceCost, 0);

  res.json({
    totals: {
      totalVehicles,
      activeVehicles,
      restingVehicles,
      totalTrips,
      totalDeliveries,
      totalDistance,
      totalFuelCost,
      totalMaintenanceCost,
    },
    vehicles,
    recentTrips: trips.slice(-5).reverse(),
  });
});

router.get('/driver', auth, async (req, res) => {
  if (req.user.role !== 'Driver') {
    return res.status(403).json({ error: 'Driver access required.' });
  }

  const vehicle = await Vehicle.findOne({ driver: req.user._id });
  const trips = await Trip.find({ driver: req.user._id }).sort('-startTime').populate('vehicle', 'number');

  const currentTrip = trips.find((trip) => trip.status === 'ongoing') || null;
  const completedTrips = trips.filter((trip) => trip.status === 'completed');

  const stats = {
    deliveriesCompleted: req.user.deliveriesCompleted || completedTrips.reduce((sum, trip) => sum + trip.deliveriesCompleted, 0),
    totalDistance: vehicle?.distanceTravelled || 0,
    fuelCost: vehicle?.fuelCost || 0,
    maintenanceCost: vehicle?.maintenanceCost || 0,
    activeStatus: vehicle?.active ? 'On Route' : 'Idle',
  };

  res.json({
    driver: {
      name: req.user.name,
      email: req.user.email,
      vehicleNumber: vehicle?.number,
      role: req.user.role,
    },
    vehicle,
    currentTrip,
    completedTrips,
    stats,
  });
});

export default router;
