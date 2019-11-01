require('dotenv').config();
const { NODE_ENV } = require('./config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const validateBearerToken = require('./authorization');
const errorHandler = require('./errorHandler');
const bookmarkRoute = require('./bookmarkRoute');

const app = express();
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use(validateBearerToken);
app.use(bookmarkRoute);

app.use(errorHandler);
module.exports = app;
