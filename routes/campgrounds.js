var express = require('express'),
    router = express.Router();

// INDEX - Show all campgrounds.
router.get('/campgrounds', (req, res) => {
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
router.post('/campgrounds', (req, res) => {
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
            // console.log('new campground added: \n', campground);
            // redirect to campground post.
            res.redirect('/campgrounds');
        }
    });
});

// NEW - show form to create campground.
router.get('/campgrounds/new', (req, res) => {
    res.render('campgrounds/new');
});

// SHOW
router.get('/campgrounds/:id', (req, res) => {
    // Find campground with provided ID.
    Campground.findById(req.params.id).populate('comments').exec((err, campground) => {
        if (err) {
            console.log(err);
        } else {
            // console.log('Campgroud requested: \n', campground);
            // Rander show template with the campground.
            res.render('campgrounds/show', {
                campground: campground,
            });
        }
    });
});

module.exports = router;