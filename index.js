// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const badgeRouter = require('./routes/badgeRouter');
const studentRouter = require('./routes/studentRouter');
const authRouter = require('./routes/authRouter');
const storyRouter = require('./routes/storyRouter');

const app = express();

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/flutter', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

// Use the badge router
app.use('/badges', badgeRouter);
app.use('/students', studentRouter);
app.use('/auth', authRouter);
app.use('/stories', storyRouter);

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});