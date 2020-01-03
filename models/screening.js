const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

/****** SCHEMA and MODEL ******/
const Screening = mongoose.model(
  'Screening',
  new mongoose.Schema({
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
    },
    room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    time: {
      type: Date,
      required: true
    }
  })
);

/****** JOI validation ******/
function validateScreening(screening) {
  const schema = {
    movie_id: Joi.objectId().required(),
    room_id: Joi.objectId().required(),
    time: Joi.date().required()
  };

  return Joi.validate(screening, schema);
}

module.exports.validate = validateScreening;
module.exports.Screening = Screening;
