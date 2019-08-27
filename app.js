var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    port = 4030,
    // SCHEMA SETUP
    campgroundSchema = new mongoose.Schema({
        name: String,
        image: String,
    }),
    Campground = mongoose.model("Campground", campgroundSchema);

mongoose.connect("mongodb://localhost:27017/yelp_camp", {
    useNewUrlParser: true
});

// campground.create({
//     name: "Willow Way Creek",
//     image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg"
// }, (err, campground) => {
//     if(err){
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
    res.render("Landing");
});

app.get('/campgrounds', (req, res) => {
    // get all campgrounds from DB
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

app.post('/campgrounds', (req, res) => {
    // get data from form and add to campgrounds array
    var name = req.body.name,
        image = req.body.image,
        newCamp = {
            name: name,
            image: image
        };
    // create new campground and save to DB
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

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});



app.listen(port, () => {
    console.log("YelpCamp server has started.");
});