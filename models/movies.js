const Joi = require('joi');
const mongoose = require('mongoose');

/****** SCHEMA and MODEL ******/
const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255
    },
    year: {
      type: Number,
      required: true
    },
    genre: {
      type: String,
      minlength: 1,
      maxlength: 128
    },
    description: {
      type: String,
      minlength: 8
    },
    imageUrl: {
      type: String,
      minlength: 1
    }
  })
);

/****** JOI validation ******/
function validateMovie(movie) {
  const schema = {
    title: Joi.string()
      .min(1)
      .max(255)
      .required(),
    year: Joi.number().required(),
    genre: Joi.string()
      .min(1)
      .max(128),
    description: Joi.string()
      .min(8),
    imageUrl: Joi.string().min(1)
  };

  return Joi.validate(movie, schema);
}

module.exports.validate = validateMovie;
module.exports.Movie = Movie;
