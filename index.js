const mongoose = require('mongoose');
const express = require('express');
const config = require('config');
const cors = require('cors');
const app = express();
const users = require('./routes/users');
const movies = require('./routes/movies');
const rooms = require('./routes/rooms');
const seats = require('./routes/seats');
const screening = require('./routes/screening');
const reservation = require('./routes/reservation');
const auth = require('./routes/auth');

//routers

if (!config.get('jwtPrivateKey')) {
  console.log('ERROR - jwtPrivateKey: Klucz prywatny nie został ustawiony');
  process.exit(1);
}

mongoose
  .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-ule6z.mongodb.net/${process.env.MONGO_DEF_DB}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.options('*', cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api/users', users);
app.use('/api/movies', movies);
app.use('/api/rooms', rooms);
app.use('/api/seats', seats);
app.use('/api/screening', screening);
app.use('/api/reservation', reservation);
app.use('/api/auth', auth);

require('./startup/prod')(app);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}...`));
