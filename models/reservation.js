const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

/****** SCHEMA and MODEL ******/
const Reservation = mongoose.model(
  'Reservation',
  new mongoose.Schema({
    User_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    Seat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Seat',
      required: true
    },
    Screening_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Screening',
      required: true
    }
  })
);

/****** JOI validation ******/
function validateReservation(reservation) {
  const schema = {
    User_id: Joi.objectId().required(),
    Seat_id: Joi.objectId().required(),
    Screening_id: Joi.objectId().required()
  };

  return Joi.validate(reservation, schema);
}

module.exports.validate = validateReservation;
module.exports.Reservation = Reservation;
