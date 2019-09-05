var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    port = 4030,
    Campground = require('./models/campground'),
    seedDB = require('./seeds');

seedDB();
mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true,
});

// Campground.create({
//     name: "Willow Way Creek",
//     image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg",
//     description: "Greatest place on earth!!!!!!"
// }, (err, campground) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("newly created campground: ")
//         console.log(campground);
//     }
// });

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    // res.render("Landing");
    res.redirect('/campgrounds');
});

// INDEX - Show all campgrounds.
app.get('/campgrounds', (req, res) => {
    // get all campgrounds from DB.
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('index', {
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
        desc = req.body.description,
        newCamp = {
            name: name,
            image: image,
            description: desc,
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
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            // Rander show template with the campground.
            res.render('show', {
                campground: campground,
            });
        }
    });
});

app.listen(port, () => {
    console.log("YelpCamp server has started.");
});