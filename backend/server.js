const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const gamesRouter = require('./routes/games');
const reviewsRouter = require('./routes/reviews');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/games', gamesRouter);
app.use('/api/reviews', reviewsRouter);

const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gamelib';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {
  console.log('Connected to MongoDB');
  app.listen(PORT, ()=> console.log('Server running on port', PORT));
})
.catch(err => console.error('MongoDB connection error', err));
