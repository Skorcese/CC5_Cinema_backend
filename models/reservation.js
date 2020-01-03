const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

/****** SCHEMA and MODEL ******/
const Reservation = mongoose.model(
  'Reservation',
  new mongoose.Schema({
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    seat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seat',
      required: true
    },
    screening_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Screening',
      required: true
    }
  })
);

/****** JOI validation ******/
function validateReservation(reservation) {
  const schema = {
    user_id: Joi.objectId().required(),
    seat_id: Joi.objectId().required(),
    screening_id: Joi.objectId().required()
  };

  return Joi.validate(reservation, schema);
}

module.exports.validate = validateReservation;
module.exports.Reservation = Reservation;
