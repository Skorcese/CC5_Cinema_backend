const {User, validate} = require('../models/users'); 
const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const router = express.Router();
const cors = require('cors');

/****** Assistive functions ******/
const handleError = (err, res) => {
    res
      .status(500)
      .send(`<h3>Error 500: Internal server Error</h3><h2>${err.message}</h2>`);
  };
  
  const handleSuccess = res => {
    res.status(200).send(`<h3>Document successfully saved!</h3>`);
  };


router.get('/', async (req, res) => {
    try {
      const users = await User.find().sort('name');
      res
        .status(200)
        .set('Access-Control-Allow-Origin', '*')
        .send(JSON.stringify(users));
    } catch (err) {
      console.log(err.message);
      res.status(404).end();
    }
  
    res.status(200).end('wyświetlono');
});


router.post('/', cors(), async (req, res) => {
    try {
        console.log('add-user')
        const { error } = validate(req.body);
        if ( error ) 
            return res.status(400).send(JSON.stringify({msg:error.details[0].message}));
        
        let user = await User.findOne({email: req.body.email});
        if (user) 
            return res.status(400).send(JSON.stringify({msg: 'Użytkownik już istnieje.'}));
        
        user = new User ({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password
        });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        await user.save();
        const token = user.generateAuthToken();
        res
          .status(200)
          .set('Access-Control-Allow-Origin', '*')
          .header('x-auth-token',token)
          .send(JSON.stringify(user));
      } catch (err) {
        console.log(err.message);
        res.status(404).send(JSON.stringify({msg:error.details[0].message}));
      }
    
      res.status(200).end('dodano');
});

router.delete('/:id', async (req, res) => {
  try {
    const users = await User.findByIdAndRemove(req.params.id);
    if (!users) return res.status(404).send('Nie znaleziono usera o takim id.');
    res
    .status(200)
    .set('Access-Control-Allow-Origin', '*')
    .send(JSON.stringify(users));
  } catch (err) {
      console.log(err.message);
      res.status(404).end();
  }

  res.status(200).end('usunieto');
});

router.get('/:id', async (req, res) => {

    try {
        const users = await User.findById(req.params.id);
        if (!users) return res.status(404).send('The customer with the given ID was not found.');
        res
        .status(200)
        .set('Access-Control-Allow-Origin', '*')
        .send(JSON.stringify(users));
    } catch (err) {
        console.log(err.message);
        res.status(404).end();
    }

    res.status(200).end('wyświetlono');
});

module.exports = router; 