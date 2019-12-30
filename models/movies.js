const Joi = require('joi');
const mongoose = require('mpngoose');

const Movie = mongoose.model(
    'Movie',
    new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
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
        }
    })
)