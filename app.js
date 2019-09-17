// Imports
var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    passport = require('passport'),
    LocalStratagy = require('passport-local'),
    session = require('express-session'),
    port = 4030,
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
    User = require('./models/user'),
    seedDB = require('./seeds');

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
});
app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');
//seedDB();

// Passport Configuration
app.use(session({
    secret: "The world ends with you.",
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStratagy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("YelpCamp server has started.");
    }
});