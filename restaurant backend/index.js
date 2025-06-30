require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const reservationRoutes = require('./routes/ReservationRoutes');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS for dev & production
app.use(cors({
  origin: [ 'http://localhost:3000', process.env.FRONTEND_URL ],
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/reservations', reservationRoutes);
app.use('/api/events', eventRoutes);

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Failed:', err.message);
    process.exit(1);
  }
};

connectDB();

// Health Check
app.get('/', (req, res) => {
  res.send('🚀 Restaurant Backend is Running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
