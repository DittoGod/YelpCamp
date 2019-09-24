/* eslint-disable no-unused-vars */
const express = require('express');

const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// route route
router.get('/', (req, res) => {
  res.render('landing');
  // res.rander('/campgrounds');
});

// Will display the Sign Up page
router.get('/register', (req, res) => {
  res.render('register', {
    page: 'register'
  });
});

// ==============================
// Will handle the signup logic.
// ==============================
router.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
  });
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
    page: 'login'
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

// logout route
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success', 'Logged you out!');
  res.redirect('/campgrounds');
});

module.exports = router;