const bcrypt = require('bcryptjs');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const { User } = require('../models/users');
const router = express.Router();

router.post('/', cors(), async (req,res) => {
    console.log('auth')

    const { error } = validate(req.body);
    console.log('15 --- ', error)
    if(error)
        return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    console.log('19 --- ', user)
    if(!user)
        return res.status(400).send('Invalid email or password.');
    

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    console.log('27 --- ', validPassword)
    if(!validPassword)
        return res.status(400).send('Invalid email or password.')

    const token = jwt.sign({ _id: user._id }, 'jwtPrivateKey');
    console.log(token)

    res.send([token, user._id, user.name, user.surname])
})

function validate(req){
    const schema = {
        email: Joi.string().min(0).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
      };
    
      return Joi.validate(req, schema);
}

module.exports = router;