require('dotenv').config();
let atlas = require('./atlas');

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.render('../src/index.js', {});
});

app.use(cors());
app.use(express.json());
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// const uri = process.env.ATLAS_URI;
mongoose.connect(atlas);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
