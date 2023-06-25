require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
const dataApiRouter = require('./src/routers');
const userApiRouter = require('./src/routers/users');
const authenticate = require('./src/middlewares/authenticate');

// log each request to console
app.use(morgan('dev'));

// enable CORS from client-side
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users', userApiRouter);

app.use('/api', authenticate, dataApiRouter);

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Nothing to see here' });
});

module.exports = app;
