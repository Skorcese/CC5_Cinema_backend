const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

/****** SCHEMA and MODEL ******/
const Seat = mongoose.model(
  'Seat',
  new mongoose.Schema({
    Room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    Row: {
      type: Number,
      required: true
    },
    SeatNumber: {
      type: Number,
      required: true
    }
  })
);

/****** JOI validation ******/
function validateSeat(seat) {
  const schema = {
    Room_id: Joi.objectId().required(),
    Row: Joi.number().required(),
    SeatNumber: Joi.number().required()
  };

  return Joi.validate(seat, schema);
}

module.exports.validate = validateSeat;
module.exports.Seat = Seat;
