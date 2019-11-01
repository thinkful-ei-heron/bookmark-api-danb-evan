const { NODE_ENV } = require('./config');
const logger = require('./logging')

function errorHandler(error, req, res, next) { //eslint-disable-line no-unused-vars
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    response = { message: error.message, error };
    logger.error(error.message);
  }
  res.status(500).json(response);
}

module.exports = errorHandler;
