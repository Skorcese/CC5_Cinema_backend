const { Reservation, validate } = require('../models/reservation');
const express = require('express');
// const auth = require('../middleware/auth');
const router = express.Router();
const cors = require('cors');
const handleError = require('../assistive_functions/handleError');
const handleSuccess = require('../assistive_functions/handleSuccess');

/****** ROUTES HANDLERS ******/
router.get('/:User_id', cors(), async (req, res) => {
  try {
    const User_id = req.params.User_id;
    const reservations = await Reservation.find({ User_id })
      .populate({
        path: 'Seat_id',
        populate: { path: 'Room_id' }
      })
      .populate({
        path: 'Screening_id',
        populate: { path: 'Movie_id' }
      })
      .populate({
        path: 'Screening_id',
        populate: { path: 'Room_id' }
      });

    res.status(200).send(JSON.stringify(reservations));
  } catch (err) {
    console.log('Brak rezerwacji');
    res.status(404).send('Brak rezerwacji');
  }
});

router.post('/', cors(), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const { User_id, Seat_id, Screening_id } = req.body;

  let reservation = new Reservation({
    User_id,
    Seat_id,
    Screening_id
  });

  reservation = await reservation.save();

  reservation.validate(err => {
    if (err) handleError(err, res);
    else handleSuccess(res);
  });
});

module.exports = router;
