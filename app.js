var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    port = 4030,
    // SCHEMA SETUP.
    campgroundSchema = new mongoose.Schema({
        name: String,
        image: String,
        description: String,
    }),
    Campground = mongoose.model("Campground", campgroundSchema);

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true
});

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("Landing");
});

// INDEX - Show all campgrounds.
app.get('/campgrounds', (req, res) => {
    // get all campgrounds from DB.
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds', {
                campgrounds: campgrounds,
            });
        }
    })
});

// CREATE - add new campground to DB.
app.post('/campgrounds', (req, res) => {
    // get data from form and add to campgrounds array.
    var name = req.body.name,
        image = req.body.image,
        newCamp = {
            name: name,
            image: image
        };
    // create new campground and save to DB.
    Campground.create(newCamp, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            console.log("new campground added: ");
            console.log(campground);
            // redirect to campground post.
            res.redirect('/campgrounds');
        }
    });
});

// NEW - show form to create campground.
app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

// SHOW
app.get('/campgrounds/:id', (req, res) => {
    // Find campground with provided ID.
    // Rander show template with the campground.
    res.send("This will be the show page one day!");
});

app.listen(port, () => {
    console.log("YelpCamp server has started.");
});