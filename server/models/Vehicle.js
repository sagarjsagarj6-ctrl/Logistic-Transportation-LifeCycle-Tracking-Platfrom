import mongoose from 'mongoose';

const vehicleSchema = new mongoose.Schema({
  number: { type: String, required: true, unique: true },
  capacity: { type: Number, default: 20 },
  status: { type: String, enum: ['Idle', 'In Transit', 'Maintenance'], default: 'Idle' },
  fuelCost: { type: Number, default: 0 },
  maintenanceCost: { type: Number, default: 0 },
  distanceTravelled: { type: Number, default: 0 },
  active: { type: Boolean, default: false },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

export default mongoose.model('Vehicle', vehicleSchema);
