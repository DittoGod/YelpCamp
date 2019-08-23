var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    port = 4030,
    campgrounds = [{
            name: "Salmon Creek",
            image: "https://photosforclass.com/download/pixabay-691424?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F50e9d4474856b108f5d084609620367d1c3ed9e04e50744f732b72d0904ac1_960.jpg&user=Free-Photos"
        },
        {
            name: "Granite Falls",
            image: "https://photosforclass.com/download/pixabay-1851092?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=Pexels"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
        {
            name: "Willow Down Falls",
            image: "https://photosforclass.com/download/pixabay-4303359?webUrl=https%3A%2F%2Fpixabay.com%2Fget%2F52e3d5404957a514f6da8c7dda793f7f1636dfe2564c704c73297fdd934ac25c_960.jpg&user=chanwity"
        },
    ];

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render("Landing");
});

app.get('/campgrounds', (req, res) => {
    res.render('campgrounds', {
        campgrounds: campgrounds,
    });
});

app.post('/campgrounds', (req, res) => {
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var newCamp = {name: name, image: image};
    campgrounds.push(newCamp);
    // redirect to campground post.
    res.redirect('/campgrounds');
});

app.get('/campgrounds/new', (req, res) => {
    res.render('new');
});

app.listen(port, () => {
    console.log("YelpCamp server has started.");
});