/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const Campground = require('../models/campground');

// route route
router.get('/', (req, res) => {
  res.render('landing');
  // res.rander('/campgrounds');
});

// Will display the Sign Up page
router.get('/register', (req, res) => {
  res.render('register', {
    page: 'register',
  });
});

// ==============================
// Will handle the signup logic.
// ==============================
router.post('/register', (req, res) => {
  const {
    username,
    firstName,
    lastName,
    avatar,
    email,
  } = req.body;
  const newUser = new User({
    username,
    firstName,
    lastName,
    email,
    avatar,
  });
  if (req.body.adminCode === 'secretcode123') {
    newUser.isAdmin = true;
  }
  // eslint-disable-next-line consistent-return
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      req.flash('error', err.message);
      return res.redirect('/register');
    }
    passport.authenticate('local')(req, res, () => {
      req.flash('success', `Successfully registered ${req.body.username}`);
      res.redirect('/campgrounds');
    });
  });
});

// =============================
// Will display the login page
// =============================
router.get('/login', (req, res) => {
  res.render('login', {
    page: 'login',
  });
});

// =========================
// Will handle login logic.
// =========================
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  successFlash: 'Successfully logged in.',
  failureFlash: 'Username or Password incorrect.',
  failureRedirect: '/login',
}), () => {});

// ===============
// Logout Route
// ===============
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success', 'Logged you out!');
  req.session.destroy();
  res.redirect('/campgrounds');
});

// ===============================
// Will send to the profile page.
// ===============================
router.get('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err || !user) {
      req.flash('error', 'Unable to find user.');
      res.redirect('back');
    } else {
      Campground.find().where('author.id').equals(user.id).exec((_err, campgrounds) => {
        if (_err) {
          req.flash('error', err.message());
        }
        res.render('users/show', {
          user,
          campgrounds,
        });
      });
    }
  });
});

module.exports = router;
