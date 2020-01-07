const { Screening, validate } = require('../models/screening');
const express = require('express');
// const auth = require('./auth');
const router = express.Router();
const cors = require('cors');
const handleError = require('../assistive_functions/handleError');
const handleSuccess = require('../assistive_functions/handleSuccess');

/****** ROUTES HANDLERS ******/
router.get('/:movie_id/:screening_id', cors(), async (req, res) => {
  try {
    const movie_id = req.params.movie_id;
    const screening_id = req.params.screening_id;
    console.log(movie_id);
    console.log(screening_id);
    let screening;
    if (movie_id !== 'default') {
      screening = await Screening.find({ movie_id: movie_id }).populate({
        path: 'room_id'
      });
    } else {
      screening = await Screening.findById(screening_id).populate({
        path: 'room_id'
      });
    }

    res.status(200).send(JSON.stringify(screening));
  } catch (err) {
    console.log(err.message);
    res.status(404).end();
  }
});

router.post('/', cors(), async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error);

  const { movie_id, room_id, time } = req.body;

  let screening = new Screening({
    movie_id,
    room_id,
    time
  });

  screening = await screening.save();

  screening.validate(err => {
    if (err) handleError(err, res);
    else handleSuccess(res);
  });
});

module.exports = router;
