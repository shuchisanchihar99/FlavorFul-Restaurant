const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: String,
    required: true,
  },
  peopleCount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  seatingType: {
    type: String, // 'Inside' or 'Outside'
    required: true,
  },
  tablePosition: {
    type: String, // 'Middle', 'Corner', 'View'
    required: true,
  },
  paymentStatus: {
    type: String, // 'Paid', 'Unpaid' (for now we'll keep it simple)
    default: 'Unpaid',
  },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
