import express from 'express';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Vehicle from '../models/Vehicle.js';
import Trip from '../models/Trip.js';

const router = express.Router();
const getJwtSecret = () => {
  if (!process.env.JWT_SECRET) {
    console.warn('Warning: JWT_SECRET not set in environment. Using fallback secret. Set JWT_SECRET in .env for production.');
    return 'transops-default-secret';
  }
  return process.env.JWT_SECRET;
};

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, vehicleNumber, vehicleCapacity } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'Name, email, password and role are required.' });
    }

    if (role === 'Driver' && !vehicleNumber) {
      return res.status(400).json({ error: 'Vehicle number is required for driver registration.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists.' });
    }

    const newUser = new User({
      name,
      email,
      password,
      role,
      vehicleNumber: role === 'Driver' ? vehicleNumber : undefined,
      vehicleCapacity: role === 'Driver' ? vehicleCapacity || 20 : undefined,
    });

    const savedUser = await newUser.save();

    if (role === 'Driver') {
      const newVehicle = new Vehicle({
        number: vehicleNumber,
        capacity: vehicleCapacity || 20,
        driver: savedUser._id,
        status: 'Idle',
        fuelCost: 500,
        maintenanceCost: 120,
        distanceTravelled: 0,
        active: false,
      });
      await newVehicle.save();

      await Trip.create({
        driver: savedUser._id,
        vehicle: newVehicle._id,
        source: 'Base Depot',
        destination: 'Client Location',
        startTime: new Date(),
        status: 'ongoing',
        deliveriesCompleted: 0,
        distance: 0,
      });
    }

    res.status(201).json({ message: 'User registered successfully', user: { id: savedUser._id, name: savedUser.name, email: savedUser.email, role: savedUser.role } });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(400).json({ error: 'Registration failed: ' + err.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, getJwtSecret(), { expiresIn: '1h' });

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        vehicleNumber: user.vehicleNumber,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
