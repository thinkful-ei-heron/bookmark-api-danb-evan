const express = require('express');
const route = express.Router();
const bookmarkRouter = require('./bookmarkRoute');

route
  .use('/bookmarks', bookmarkRouter)
  .get('/', (req, res) => {
    res.send('Try /bookmarks');
  });



module.exports = route;
