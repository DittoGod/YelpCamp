app.get('/', (req, res) => {
    res.render('landing');
    // res.rander('/campgrounds');
});

// ==================
// Auth routes
// ==================

// Will display the Sign Up page
app.get('/register', (req, res) => {
    res.render('register');
});
// will handle the signup logic.
app.post('/register', (req, res) => {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/campgrounds');
        });
    });
});
// Will display the login page
app.get('/login', (req, res) => {
    res.render('login');
});
// Will handle login logic.
app.post('/login', passport.authenticate('local', {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), (req, res) => {});
// logout route
app.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/campgrounds');
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}