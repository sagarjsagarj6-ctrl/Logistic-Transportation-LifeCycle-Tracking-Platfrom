import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Driver'], default: 'Driver', required: true },
  vehicleNumber: { type: String, trim: true },
  vehicleCapacity: { type: Number, default: 20 },
  totalDistance: { type: Number, default: 0 },
  fuelCost: { type: Number, default: 0 },
  maintenanceCost: { type: Number, default: 0 },
  deliveriesCompleted: { type: Number, default: 0 },
  isOnTrip: { type: Boolean, default: false },
  clockedInAt: { type: Date },
  clockedOutAt: { type: Date },
});

// Hash password before saving to DB
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model('User', userSchema);