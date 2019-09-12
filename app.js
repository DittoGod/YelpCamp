var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    port = 4030,
    Campground = require('./models/campground'),
    Comment = require('./models/comment'),
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

app.get('/', (req, res) => {
    res.render('landing');
    // res.rander('/campgrounds');
});

// INDEX - Show all campgrounds.
app.get('/campgrounds', (req, res) => {
    // get all campgrounds from DB.
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render('campgrounds/index', {
                campgrounds: campgrounds,
            });
        }
    });
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
            console.log('new campground added: \n', campground);
            // redirect to campground post.
            res.redirect('/campgrounds');
        }
    });
});

// NEW - show form to create campground.
app.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

// SHOW
app.get('/campgrounds/:id', (req, res) => {
    // Find campground with provided ID.
    Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Campgroud requested: \n', campground);
            // Rander show template with the campground.
            res.render('campgrounds/show', {
                campground: campground,
            });
        }
    });
});

//=====================
// Comments Routes
//=====================
app.get('/campgrounds/:id/comments/new', (req, res) => {
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments/new', {
                campground: campground,
            });
        }
    });
});

app.post('/campgrounds/:id/comments', (req, res) => {
    // lookup campground using ID
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect('/campgrounds');
        } else {
            // create new comment
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to campground show page
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("YelpCamp server has started.");
    }
});