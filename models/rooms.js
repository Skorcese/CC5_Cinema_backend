const Joi = require('joi');
const mongoose = require('mongoose');

const Room = mongoose.model(
    'Room',
    new mongoose.Schema({
        _id: {
            type: mongoose.Schema.Types.ObjectId
        },
        name: {
            String,
            required: true,
            minlength: 1,
            maxlength: 255
        }
    })
)