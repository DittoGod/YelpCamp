/* eslint-disable no-unused-vars */
let mongoose = require('mongoose');
let Campground = require('./models/campground');
let Comment = require('./models/comment');

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