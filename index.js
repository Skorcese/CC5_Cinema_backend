const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const cors = require('cors');
const app = express();

//routers


  
mongoose
  .connect('mongodb://localhost:3000/CC5_Cinema', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    server: { ssl: true }
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app routers

// require('./startup/prod')(app);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));