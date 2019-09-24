// =========
// Imports
// =========
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');

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

const port = process.env.PORT;
const ip = process.env.IP;

// ==================
// REQUIRING routes
// ==================
const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

// ==============
// Setup Server
// ==============

// "mongodb://localhost:27017/yelp_camp"
// "mongodb+srv://yelpman:Parad15e-L0st2001@cluster0-h4ygo.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(flash());
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
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
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
    // eslint-disable-next-line no-console
    console.log(err);
  } else {
    // eslint-disable-next-line no-console
    console.log(`YelpCamp server has started on port ${process.env.PORT}`);
  }
});
