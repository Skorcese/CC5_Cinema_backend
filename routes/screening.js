const { Screening, validate } = require('../models/screening');
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
