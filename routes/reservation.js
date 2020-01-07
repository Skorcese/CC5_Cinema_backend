const { Reservation, validate } = require('../models/reservation');
const express = require('express');
const auth = require('./auth');
const router = express.Router();
const cors = require('cors');
const handleError = require('../assistive_functions/handleError');
const handleSuccess = require('../assistive_functions/handleSuccess');

/****** ROUTES HANDLERS ******/
router.get('/:user_id/:screening_id', cors(), auth, async (req, res) => {
  try {
    const { user_id, screening_id } = req.params;
    let reservations;

    if (user_id !== 'default') {
      reservations = await Reservation.find({ user_id })
        .populate({
          path: 'seat_id',
          populate: { path: 'room_id' }
        })
        .populate({
          path: 'screening_id',
          populate: { path: 'movie_id' }
        })
        .populate({
          path: 'screening_id',
          populate: { path: 'room_id' }
        });
    } else {
      reservations = await Reservation.find({ screening_id })
        .populate({
          path: 'seat_id',
          populate: { path: 'room_id' }
        })
        .populate({
          path: 'screening_id',
          populate: { path: 'movie_id' }
        })
        .populate({
          path: 'screening_id',
          populate: { path: 'room_id' }
        });
    }

    res.status(200).send(JSON.stringify(reservations));
  } catch (err) {
    console.log('Brak rezerwacji');
    res.status(404).send('Brak rezerwacji');
  }
});

router.post('/', cors(), auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const { user_id, seat_id, screening_id } = req.body;

  let reservation = new Reservation({
    user_id,
    seat_id,
    screening_id
  });

  reservation = await reservation.save();

  reservation.validate(err => {
    if (err) handleError(err, res);
    else handleSuccess(res);
  });
});

module.exports = router;
