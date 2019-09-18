/* eslint-disable no-unused-vars */
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');

function seedDB() {
  // Remove all campgrounds
  Campground.deleteMany({}, (err) => {
    if (err) {
      console.log(err);
    }
    console.log('removed campgrounds!');
  });
  // add a few comments
}

module.exports = seedDB;
