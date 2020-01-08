const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

/****** SCHEMA and MODEL ******/
const Seat = mongoose.model(
  'Seat',
  new mongoose.Schema({
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    row: {
      type: Number,
      required: true
    },
    seatNumber: {
      type: Number,
      required: true
    }
  })
);

/****** JOI validation ******/
function validateSeat(seat) {
  const schema = {
    room_id: Joi.objectId().required(),
    row: Joi.number().required(),
    seatNumber: Joi.number().required()
  };

  return Joi.validate(seat, schema);
}

module.exports.validate = validateSeat;
module.exports.Seat = Seat;
