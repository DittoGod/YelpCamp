/* eslint-disable no-underscore-dangle */
const Comment = require('../models/comment');
const Campground = require('../models/campground');

const middlewareObj = {};

middlewareObj.checkCommentOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
      if (err || !foundComment) {
        req.flash('error', 'Comment not found.');
        res.redirect('back');
        // Does user own comment?
      } else if (foundComment.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash('error', 'You dont have the permision to delete this comment.');
        res.redirect('back');
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to delete a comment.');
    res.redirect('back');
  }
};

middlewareObj.checkCampgroundOwnership = (req, res, next) => {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, (err, foundCampground) => {
      if (err || !foundCampground) {
        req.flash('error', 'Unable to find campground.');
        res.redirect('back');
      } else if (foundCampground.author.id.equals(req.user._id)) {
        next();
      } else {
        req.flash('error', 'You don\'t have permission for this campground.');
        res.redirect('back');
      }
    });
  } else {
    req.flash('error', 'You need to be logged in to delete a campground.');
    res.redirect('back');
  }
};

// eslint-disable-next-line consistent-return
middlewareObj.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error', 'You need to be logged in to do that.');
  res.redirect('/login');
};

module.exports = middlewareObj;
