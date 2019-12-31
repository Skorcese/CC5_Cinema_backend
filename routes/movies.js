const { Movie, validate } = require('../models/movies');
const express = require('express');
// const auth = require('../middleware/auth');
const router = express.Router();
const cors = require('cors');
const handleError = require('../assistive_functions/handleError');
const handleSuccess = require('../assistive_functions/handleSuccess');

/****** ROUTES HANDLERS ******/
router.post('/', cors(), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const { Title, Year, Genre, Description } = req.body;

  let movie = new Movie({
    Title,
    Year,
    Genre,
    Description
  });

  movie = await movie.save();

  movie.validate(err => {
    if (err) handleError(err, res);
    else handleSuccess(res);
  });
});

module.exports = router;
