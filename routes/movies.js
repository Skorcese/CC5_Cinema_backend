const { Movie, validate } = require('../models/movies');
const express = require('express');
// const auth = require('./auth');
const router = express.Router();
const cors = require('cors');
const handleError = require('../assistive_functions/handleError');
const handleSuccess = require('../assistive_functions/handleSuccess');

/****** ROUTES HANDLERS ******/
router.get('/', cors(), async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).send(JSON.stringify(movies));
  } catch (err) {
    console.log(err.message);
    res.status(404).end();
  }
});

router.get('/:id', cors(), async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id);
    res.status(200).send(JSON.stringify(movie));
  } catch (err) {
    console.log(err.message);
    res.status(404).end();
  }
});

router.post('/', cors(), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const { title, year, genre, description, imageUrl } = req.body;

  let movie = new Movie({
    title,
    year,
    genre,
    description,
    imageUrl
  });

  movie = await movie.save();

  movie.validate(err => {
    if (err) handleError(err, res);
    else handleSuccess(res);
  });
});

module.exports = router;
