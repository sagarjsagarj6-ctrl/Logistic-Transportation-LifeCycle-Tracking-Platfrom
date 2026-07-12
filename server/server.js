import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';

// 1. Initialize environment variables
dotenv.config();

const app = express();

// 2. Middleware
app.use(cors()); // Allows your React frontend to talk to this backend
app.use(express.json()); // Essential for parsing incoming JSON data from your forms

// 3. Routes
// All auth-related requests (login/register) will go to /api/auth/...
app.use('/api/auth', authRoutes);

// 4. Database Connection & Server Startup
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/TransOpsDB";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB successfully");
    // Start the server only after successful DB connection
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
  });


app.listen(3000,()=>{
    console.log("Running successfully")
})