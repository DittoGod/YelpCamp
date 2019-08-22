var express = require('express'),
    app = express(),
    port = 4030;

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.send("Landing Page");
});

app.listen(port, () => {
    console.log("YelpCamp server has started.");
});