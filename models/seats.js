const Joi = require('joi');
const mongoose = require('mongoose');

const Seat = mongoose.model(
    'Seat',
    new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
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
)