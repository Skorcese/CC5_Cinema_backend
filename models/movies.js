const Joi = require('joi');
const mongoose = require('mongoose');

/****** SCHEMA and MODEL ******/
const Movie = mongoose.model(
  'Movie',
  new mongoose.Schema({
    Title: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 255
    },
    Year: {
      type: Number,
      required: true
    },
    Genre: {
      type: String,
      minlength: 1,
      maxlength: 128
    },
    Description: {
      type: String,
      minlength: 8,
      maxlength: 1024
    },
    ImageUrl: {
      type: String,
      minlength: 1
    }
  })
);

/****** JOI validation ******/
function validateMovie(movie) {
  const schema = {
    Title: Joi.string()
      .min(1)
      .max(255)
      .required(),
    Year: Joi.number().required(),
    Genre: Joi.string()
      .min(1)
      .max(128),
    Description: Joi.string()
      .min(8)
      .max(1024),
    ImageUrl: Joi.string().min(1)
  };

  return Joi.validate(movie, schema);
}

module.exports.validate = validateMovie;
module.exports.Movie = Movie;
