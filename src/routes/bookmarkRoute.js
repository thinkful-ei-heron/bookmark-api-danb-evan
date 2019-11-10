const express = require('express');
const bookmarkRouter = express.Router();
const bodyParser = express.json();
const uuid = require('uuid');
const BookmarkService = require('../BookmarkService');
const knex = require('knex');

bookmarkRouter
  //GET bookmarks
  .route('/')
  .get((req, res, next) => {
    BookmarkService.getAllBookmarks(req.app.get('db'))
      .then(bookmarks => res.json(bookmarks))
      .catch(next);
  })

  //POST bookmark
  .post(bodyParser, (req, res, next) => {
    const {title, url, description, rating} = req.body;
    const newItem = {title, url, description, rating};
    BookmarkService.postBookmark(req.app.get('db'), newItem)
      .then(bookmark => res.status(201).json(bookmark))
      .catch(next);
  });
bookmarkRouter
  .route('/:b_id')
  //GET bookmark
  .get((req, res, next) => {
    const {b_id} = req.params;
    BookmarkService.getById(req.app.get('db'), b_id).then(bookmark => {
      if (!bookmark)
        return res.status(400).json({error: 'there is no bookmark for that'});
      res.json(bookmark);
    });
  })
  //DELETE bookmark
  .delete((req, res) => {
    const {b_id} = req.params;
    BookmarkService.deleteById(req.app.get('db'), b_id).then(() =>
      res.status(200).json({message: `Deleted bookmark with id: ${b_id}`}),
    );
  })
  //PATCH bookmark
  .patch(bodyParser, (req, res) => {
    const {url, desc, rating} = req.body;
    const {b_id} = req.params;
    const bookmark = STORE.find(bookmark => bookmark.id === b_id);
    STORE.splice(STORE.indexOf(bookmark), 1);
    const patchedItem = {id: b_id, url, desc, rating};
    STORE.push(patchedItem);
    res.status(201).json(patchedItem);
  });

module.exports = bookmarkRouter;
