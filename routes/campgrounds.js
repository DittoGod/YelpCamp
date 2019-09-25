/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
const NodeGeocoder = require('node-geocoder');
const Campground = require('../models/campground');
const middleware = require('../middleware');

const options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null,
};
const geocoder = NodeGeocoder(options);

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
  geocoder.geocode(req.body.location, (err, data) => {
    if (err || !data.length) {
      req.flash('err', 'Invalid address.');
      res.redirect('back');
    }
    const lat = data[0].latitude;
    const lng = data[0].longitude;
    const location = data[0].formattedAddress;
    const newCamp = {
      name,
      image,
      cost,
      description,
      author,
      lat,
      lng,
      location,
    };
    // create new campground and save to DB.
    Campground.create(newCamp, (_err, camp) => {
      if (_err) {
        req.flash('error', '[Post Error], you cannot do that');
        res.redirect('back');
      } else {
        req.flash('success', `${camp.name} has been added.`);
        // redirect to campground post.
        res.redirect('/campgrounds');
      }
    });
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
  geocoder.geocode(req.body.campground.location, (err, data) => {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      res.redirect('back');
    }
    // console.log(req.body.campground);
    req.body.campground.lat = data[0].latitude;
    req.body.campground.lng = data[0].longitude;
    req.body.campground.location = data[0].formattedAddress;
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, (_err, foundCamp) => {
      if (_err) {
        req.flash('error', _err.message);
        res.redirect('/campgrounds');
      } else {
        req.flash('success', `${foundCamp.name} has been successfully upated.`);
        res.redirect(`/campgrounds/${foundCamp._id}`);
      }
    });
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
