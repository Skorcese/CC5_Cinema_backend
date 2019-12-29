const Joi = require('joi');
const mongoose = require('mongoose');

const Screening = mongoose.model(
    'Screening',
    new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
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
)