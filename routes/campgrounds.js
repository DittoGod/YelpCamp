/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const Campground = require('../models/campground');
const middleware = require('../middleware');

// ==============================
// INDEX - Show all campgrounds.
// ==============================
router.get('/', (req, res) => {
  // get all campgrounds from DB.
  Campground.find({}, (err, campgrounds) => {
    if (err) {
      req.flash('error', 'Cannot connect to database.');
      res.redirect('back');
    } else {
      res.render('campgrounds/index', {
        campgrounds,
        page: 'campgrounds',
      });
    }
  });
});

// ===================================
// CREATE - add new campground to DB.
// ===================================
router.post('/', middleware.isLoggedIn, (req, res) => {
  // get data from form and add to campgrounds array.
  const {
    name,
    image,
    cost,
    description,
  } = req.body;
  const author = {
    id: req.user._id,
    username: req.user.username,
  };
  const newCamp = {
    name,
    image,
    cost,
    description,
    author,
  };
  // create new campground and save to DB.
  Campground.create(newCamp, (err, camp) => {
    if (err) {
      req.flash('error', '[Post Error], you cannot do that');
      res.redirect('back');
    } else {
      req.flash('success', `new campground added:  ${camp.name}`);
      // redirect to campground post.
      res.redirect('/campgrounds');
    }
  });
});
// =========================================
// NEW - show form to create campground.
// =========================================
router.get('/new', middleware.isLoggedIn, (req, res) => {
  res.render('campgrounds/new');
});

// =======
// SHOW
// =======
router.get('/:id', (req, res) => {
  // Find campground with provided ID.
  Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
    if (err || !campground) {
      req.flash('error', 'Cannot find campground.');
      res.redirect('/campgrounds');
    } else {
      // Rander show template with the campground.
      res.render('campgrounds/show', {
        campground,
      });
    }
  });
});

// =======================
// EDIT Campground Route
// =======================
router.get('/:id/edit', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findById(req.params.id, (err, foundCampground) => {
    res.render('campgrounds/edit', {
      campground: foundCampground,
    });
  });
});

// =========================
// Update Campground Route
// =========================
router.put('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, (err, foundCamp) => {
    if (err) {
      req.flash('error', 'You need to be loggedin to update a campgrond.');
      res.redirect('/campgrounds');
    } else {
      req.flash('success', `${foundCamp.name} has been successfully upated.`);
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

// =======================
// Destroy Campgroud Route
// =======================
router.delete('/:id', middleware.checkCampgroundOwnership, (req, res) => {
  Campground.findByIdAndRemove(req.params.id, (err, foundCamp) => {
    if (err) {
      req.flash('error', 'You need to be own the campgrond inorder to delete.');
      res.redirect(`/${req.params.id}`);
    } else {
      req.flash('success', `${foundCamp.name} has been successfully deleted.`);
      res.redirect('/campgrounds');
    }
  });
});

module.exports = router;
