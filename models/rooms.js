const Joi = require('joi');
const mongoose = require('mongoose');

/****** SCHEMA and MODEL ******/
const Room = mongoose.model(
  'Room',
  new mongoose.Schema({
    Name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255
    }
  })
);

/****** JOI validation ******/
function validateRoom(room) {
  const schema = {
    Name: Joi.string()
      .min(1)
      .max(255)
      .required()
  };

  return Joi.validate(room, schema);
}

module.exports.validate = validateRoom;
module.exports.Room = Room;
