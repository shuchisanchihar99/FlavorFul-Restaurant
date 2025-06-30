const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  eventName: { type: String, required: true, trim: true },
  eventType: { type: String, required: true, trim: true },
  eventMode: { type: String, required: true, enum: ['Public', 'Private'] },
  organizerName: { type: String, required: true, trim: true },
  contactNumber: { type: String, required: true },
  peopleCount: { type: Number, required: true, min: 1 },
  date: { type: String, required: true },
  time: { type: String, required: true },
  image: { type: String, default: "" }, // Optional image URL
  status: { type: String, default: 'Pending', enum: ['Pending', 'Approved', 'Rejected'] },
}, { timestamps: true });

module.exports = mongoose.model('Event', EventSchema);
