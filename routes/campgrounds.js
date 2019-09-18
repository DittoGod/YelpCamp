const express = require('express');

const router = express.Router();
const Campground = require('../models/campground');

// Middleware
// eslint-disable-next-line consistent-return
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

// INDEX - Show all campgrounds.
router.get('/', (req, res) => {
  // get all campgrounds from DB.
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      console.log(err);
    } else {
      res.render('campgrounds/index', {
        campgrounds,
      });
    }
  });
});

// CREATE - add new campground to DB.
router.post('/', isLoggedIn, (req, res) => {
  // get data from form and add to campgrounds array.
  const {
    name,
    image,
  } = req.body;
  const desc = req.body.description;
  const newCamp = {
    name,
    image,
    description: desc,
  };
  // create new campground and save to DB.
  Campground.create(newCamp, (err) => {
    if (err) {
      console.log(err);
    } else {
      // console.log('new campground added: \n', campground);
      // redirect to campground post.
      res.redirect('/campgrounds');
    }
  });
});

// NEW - show form to create campground.
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// SHOW
router.get('/:id', (req, res) => {
  // Find campground with provided ID.
  Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
    if (err) {
      console.log(err);
    } else {
      // console.log('Campgroud requested: \n', campground);
      // Rander show template with the campground.
      res.render('campgrounds/show', {
        campground,
      });
    }
  });
});

module.exports = router;