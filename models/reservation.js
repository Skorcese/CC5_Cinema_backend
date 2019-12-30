const Joi = require('joi');
const mongoose = require('mongoose');

const Reservation = mongoose.model(
    'Reservation',
    new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
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
)