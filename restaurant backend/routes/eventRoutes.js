const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// 🔹 POST - Host a New Event Request
router.post('/', async (req, res) => {
  try {
    const { eventName, eventType, eventMode, organizerName, contactNumber, peopleCount, date, time, image } = req.body;

    // ✅ Basic Input Validation
    if (!eventName || !eventType || !eventMode || !organizerName || !contactNumber || !peopleCount || !date || !time) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newEvent = new Event({
      eventName,
      eventType,
      eventMode,
      organizerName,
      contactNumber,
      peopleCount,
      date,
      time,
      image: image || "",  // Optional
      status: 'Pending'
    });

    await newEvent.save();
    res.status(201).json({ message: '✅ Event request submitted successfully' });

  } catch (err) {
    console.error('❌ Error submitting event:', err.message);
    res.status(500).json({ error: 'Failed to submit event' });
  }
});

// 🔹 GET - Fetch Only Approved Public Events
router.get('/approved', async (req, res) => {
  try {
    const approvedEvents = await Event.find({ status: 'Approved', eventMode: 'Public' });
    res.json(approvedEvents);
  } catch (err) {
    console.error('❌ Error fetching approved events:', err.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

// 🔹 PUT - Approve Event by ID (Admin Action)
router.put('/approve/:id', async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      { status: 'Approved' },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found' });
    }

    res.json({ message: '✅ Event approved successfully', updatedEvent });

  } catch (err) {
    console.error('❌ Error approving event:', err.message);
    res.status(500).json({ error: 'Failed to approve event' });
  }
});

// 🔹 (Optional) GET - Admin: Fetch All Events (Pending + Approved + Rejected)
router.get('/all', async (req, res) => {
  try {
    const allEvents = await Event.find().sort({ date: 1 });
    res.json(allEvents);
  } catch (err) {
    console.error('❌ Error fetching all events:', err.message);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

module.exports = router;
