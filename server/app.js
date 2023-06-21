require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const apiRouter = require('./routers/api');

// log each request to console
app.use(morgan('dev'));

// enable CORS from client-side
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Nothing to see here' });
});

module.exports = app;
