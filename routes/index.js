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
  res.render('register');
});
// will handle the signup logic.
router.post('/register', (req, res) => {
  const newUser = new User({
    username: req.body.username,
  });
  // eslint-disable-next-line consistent-return
  User.register(newUser, req.body.password, (err) => {
    if (err) {
      console.log(err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, () => {
      res.redirect('/campgrounds');
    });
  });
});

// Will display the login page
router.get('/login', (req, res) => {
  res.render('login');
});

// Will handle login logic.
router.post('/login', passport.authenticate('local', {
  successRedirect: '/campgrounds',
  failureRedirect: '/login',
}), () => {});

// logout route
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/campgrounds');
});

// Middleware
// eslint-disable-next-line consistent-return
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;
