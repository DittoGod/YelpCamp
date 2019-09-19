// =========
// Imports
// =========
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const passport = require('passport');
const LocalStratagy = require('passport-local');
const session = require('express-session');
const path = require('path');
const methodOverride = require('method-override');

// =========
// Models
// =========
const User = require('./models/user');
// let seedDB = require('./seeds');

const port = 4030;
// ==================
// REQUIRING routes
// ==================
const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

// ==============
// Setup Server
// ==============
mongoose.connect('mongodb://localhost:27017/yelp_camp', {
  useNewUrlParser: true,
});
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
// seedDB();

// =======================
// Passport Configuration
// =======================
app.use(session({
  secret: 'The world ends with you.',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// ==============
// Use Routes
// ==============
app.use('/', indexRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);

// ==============
// Start Server
// ==============
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log('YelpCamp server has started.');
  }
});
