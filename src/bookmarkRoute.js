const express = require('express');
let STORE = require('./STORE');
const bookmarkRouter = express.Router();
const bodyParser = express.json();
const uuid = require('uuid');


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
    if(!url || !desc || !rating) return res.status(400).json({error: 'You must specify a \'url\', \'desc\' and \'rating\''});
    if(url.length > 256) return res.status(400).json({error: 'url cannot be larget then 256 char'});
    if(desc.length > 512) return res.status(400).json({error: 'description cannot be larger then 512 char'});
    if(Number.isNaN(intRating)) return res.status(400).json({error: 'rating must be a number'});
    if(intRating < 1 || intRating > 5) return res.status(400).json({error: 'rating must be between 1 and 5'});
    const newItem = { id: uuid(), url, desc, intRating };
    STORE.push(newItem);
    res.status(201).json(newItem);
  });
bookmarkRouter
  .route('/bookmark/:id')
//GET bookmark
  .get((req, res) => {
    const { id } = req.params;
    const bookmark = STORE.find(bookmark => bookmark.id === id);
    if(!bookmark) return res.status(400).json({error: 'there is no bookmark for that'});
    res.status(200).json(bookmark);
  })
//DELETE bookmark
  .delete((req, res) => {
    const { id } = req.params;
    const bookmarkToDelete = STORE.find(bookmark => bookmark.id === id);
    if(!bookmarkToDelete) return res.status(400).json({error: 'there is no bookmark for that'});
    const currentBookmarkIndex = STORE.indexOf(bookmarkToDelete);
    STORE.splice(currentBookmarkIndex, 1);
    res.status(200).json({message: `Deleted bookmark with id: ${id}`});
  });

module.exports = bookmarkRouter;
