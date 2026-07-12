import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
  source: { type: String, required: true },
  destination: { type: String, required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  status: { type: String, enum: ['ongoing', 'completed', 'scheduled'], default: 'scheduled' },
  deliveriesCompleted: { type: Number, default: 0 },
  distance: { type: Number, default: 0 },
  fuelUsed: { type: Number, default: 0 },
});

export default mongoose.model('Trip', tripSchema);
