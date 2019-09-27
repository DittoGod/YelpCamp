// =========
// Imports
// =========
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const flash = require('connect-flash');
// const Float = require('mongoose-float').loadType(mongoose);

const app = express();
const passport = require('passport');
const LocalStratagy = require('passport-local');
const session = require('express-session');
const coockieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const methodOverride = require('method-override');
const moment = require('moment');
const favicon = require('serve-favicon');

// =========
// Models
// =========
const User = require('./models/user');
// let seedDB = require('./seeds');

const port = process.env.PORT || 4030;
const ip = process.env.IP;
const db = process.env.DATABASEURL;

// ==================
// REQUIRING routes
// ==================
const commentRoutes = require('./routes/comments');
const campgroundRoutes = require('./routes/campgrounds');
const indexRoutes = require('./routes/index');

// ==============  "mongodb://localhost:27017/yelp_camp"
// Setup Server
// ==============  "mongodb+srv://yelpman:Parad15e-L0st2001@cluster0-h4ygo.mongodb.net/test?retryWrites=true&w=majority"
const store = new MongoStore({
  url: db,
  collection: 'mySessions',
});
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(express.static(path.join(__dirname, '/public')));
app.use(favicon(path.join(__dirname, '/public/images/favicon.ico')));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));
app.use(coockieParser('secret'));
app.use(flash());
// seedDB();

// =======================
// Passport Configuration
// =======================
app.set('trust proxy', 1);
app.use(require('express-session')({
  secret: 'The World Ends With You.',
  resave: false,
  saveUninitialized: false,
  // cookie: {
    // secure: true,
    // maxAge: 600000,
  // },
  store,
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  if (!req.session) {
    next(new Error('Oh no!!'));
  }
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  app.locals.moment = moment;
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
app.listen(port, ip, (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  } else {
    // eslint-disable-next-line no-console
    console.log(`YelpCamp server has started on port: ${port} and ip: ${ip}`);
  }
});