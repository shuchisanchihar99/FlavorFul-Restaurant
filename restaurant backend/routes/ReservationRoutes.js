const express = require('express');
const router = express.Router();
const Reservation = require('../models/Reservation');

// POST /api/reservations
router.post('/', async (req, res) => {
  try {
    const newReservation = new Reservation({
      fullName: req.body.fullName,
      contactNumber: req.body.contactNumber,
      peopleCount: req.body.peopleCount,
      date: req.body.date,
      time: req.body.time,
      seatingType: req.body.seatingType,
      tablePosition: req.body.tablePosition,
      paymentStatus: req.body.paymentStatus || 'Unpaid',
    });

    await newReservation.save();
    res.status(201).json({ message: 'Reservation successful', reservation: newReservation });
  } catch (error) {
    console.error('Error saving reservation:', error);
    res.status(500).json({ message: 'Reservation failed', error });
  }
});

module.exports = router;
