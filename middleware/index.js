/* eslint-disable no-underscore-dangle */
const Comment = require('../models/comment');
const Campground = require('../models/campground');

const middlewareObj = {};

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err) {
        res.redirect('back');
        // Does user own comment?
      } else if (foundComment.author.id.equals(req.user._id)) {
        next();
      } else {
        res.redirect('back');
      }
    });
  } else {
    res.redirect('back');
  }
};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err) {
        res.redirect('back');
      } else if (foundCampground.author.id.equals(req.user._id)) {
        next();
      } else {
        res.redirect('back');
      }
    });
  } else {
    res.redirect('back');
  }
};

// eslint-disable-next-line consistent-return
middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = middlewareObj;
