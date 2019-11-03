const express = require('express');
const validUrl = require('valid-url');

function validateInput(res, req, url, desc, rating, bookmark) {
  if(!bookmark) return res.status(400).json({error: 'there is no bookmark for that'});
  if(!url || !desc || !rating) return res.status(400).json({error: '\'url\', \'desc\' and \'rating\''});
  if(!validUrl.isUri(url)) return res.status(400).json({error: 'URL is invalid'});
  if(url.length > 256) return res.status(400).json({error: 'url cannot be larget then 256 char'});
  if(desc.length > 512) return res.status(400).json({error: 'description cannot be larger then 512 char'});
  if(Number.isNaN(parseInt(rating))) return res.status(400).json({error: 'rating must be a number'});
  if(rating < 1 || rating > 5) return res.status(400).json({error: 'rating must be between 1 and 5'});
}

module.exports = validateInput;
