const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { User } = require('../models/users');
const router = express.Router();

router.post('/', cors, async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(!user) return res.status(400).send('Invalid email or password.');

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid email or password.')

    const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
    console.log(token)

    res.send(token)
})

function validate(req){
    const schema = {
        email: Joi.string().min(0).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
      };
    
      return Joi.validate(req, schema);
}

module.exports = router;