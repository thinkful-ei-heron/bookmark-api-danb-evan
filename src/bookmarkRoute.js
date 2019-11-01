const express = require('express');
let STORE = require('./STORE');
const bookmarkRouter = express.Router();
const bodyParser = express.json();
const uuid = require('uuid');
const validateInput = require('./validateInput');

bookmarkRouter
//GET bookmarks
  .route('/bookmarks')
  .get((req, res) => {
    res.json(STORE);
  })
//POST bookmark
  .post(bodyParser, (req, res) => {
    const { url, desc, rating } = req.body;
    const intRating = parseInt(rating);
    validateInput(res, req, url, desc, rating, intRating);
    const newItem = { id: uuid(), url, desc, intRating };
    STORE.push(newItem);
    res.status(201).json(newItem);
  });
bookmarkRouter
  .route('/bookmark/:b_id')
//GET bookmark
  .get((req, res) => {
    const { b_id } = req.params;
    const bookmark = STORE.find(bookmark => bookmark.id === b_id);
    if(!bookmark) return res.status(400).json({error: 'there is no bookmark for that'});
    res.status(200).json(bookmark);
  })
//DELETE bookmark
  .delete((req, res) => {
    const { b_id } = req.params;
    const bookmarkToDelete = STORE.find(bookmark => bookmark.id === b_id);
    if(!bookmarkToDelete) return res.status(400).json({error: 'there is no bookmark for that'});
    const currentBookmarkIndex = STORE.indexOf(bookmarkToDelete);
    STORE.splice(currentBookmarkIndex, 1);
    res.status(200).json({message: `Deleted bookmark with id: ${b_id}`});
  })
//PATCH bookmark
  .patch(bodyParser, (req, res) => {
    const { url, desc, rating } = req.body;
    const intRating = parseInt(rating);
    const { b_id } = req.params;
    const bookmark = STORE.find(bookmark => bookmark.id === b_id);
    validateInput(res, req, url, desc, rating, intRating, bookmark);
    STORE.splice(STORE.indexOf(bookmark), 1);
    const patchedItem = { id: b_id, url, desc, intRating };
    STORE.push(patchedItem);
    res.status(201).json(patchedItem);
  });

module.exports = bookmarkRouter;
