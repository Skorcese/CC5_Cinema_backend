const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

/****** SCHEMA and MODEL ******/
const Screening = mongoose.model(
  'Screening',
  new mongoose.Schema({
    Movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
      required: true
    },
    Room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Room',
      required: true
    },
    Time: {
      type: Date,
      required: true
    }
  })
);

/****** JOI validation ******/
function validateScreening(screening) {
  const schema = {
    Movie_id: Joi.objectId().required(),
    Room_id: Joi.objectId().required(),
    Time: Joi.date().required()
  };

  return Joi.validate(screening, schema);
}

module.exports.validate = validateScreening;
module.exports.Screening = Screening;
