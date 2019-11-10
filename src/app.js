require('dotenv').config();
const { NODE_ENV, DB_URL } = require('./config');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
//const validateBearerToken = require('./authorization');
const errorHandler = require('./errorHandler');
const route = require('./routes');
const knex = require('knex');

const app = express();
const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

const knexInstance = knex({
  client: 'pg',
  connection: DB_URL,
});

app.set('db', knexInstance);
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());
app.use('/', route);
//app.use(validateBearerToken);

app.use(errorHandler);
module.exports = app;
