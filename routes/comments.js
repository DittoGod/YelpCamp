/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router({
  mergeParams: true,
});
const Campground = require('../models/campground');
const Comment = require('../models/comment');
const middleware = require('../middleware');

// TODO: add authentication to camment update and delete.

// ====================
// Create new comment
// ====================
router.get('/new', middleware.isLoggedIn, (req, res) => {
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/new', {
        campground,
      });
    }
  });
});

// ===============
// Post comment
// ===============
router.post('/', middleware.isLoggedIn, (req, res) => {
  // lookup campground using ID
  Campground.findById(req.params.id, (err, campground) => {
    if (err) {
      console.log(err);
      res.redirect('/campgrounds');
    } else {
      // create new comment
      // eslint-disable-next-line no-shadow
      Comment.create(req.body.comment, (err, comment) => {
        if (err) {
          console.log(err);
        } else {
          const com = comment;
          // add username and ID to comment
          com.author.id = req.user._id;
          com.author.username = req.user.username;
          // save comment
          com.save();
          // connect new comment to campground
          campground.comments.push(com);
          campground.save();
          // redirect to campground show page
          // eslint-disable-next-line no-underscore-dangle
          res.redirect(`/campgrounds/${campground._id}`);
        }
      });
    }
  });
});

// ===================
// Edit Comment Route
// ===================
router.get('/:comment_id/edit', middleware.checkCommentOwnership, (req, res) => {
  Comment.findById(req.params.comment_id, (err, foundComment) => {
    if (err) {
      res.redirect('back');
    } else {
      res.render('comments/edit', {
        comment: foundComment,
        campground_id: req.params.id,
      });
    }
  });
});

// =====================
// Update Comment Route
// =====================
router.put('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

// =====================
// Destroy Comment Route
// =====================
router.delete('/:comment_id', middleware.checkCommentOwnership, (req, res) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err) => {
    if (err) {
      res.redirect('back');
    } else {
      res.redirect(`/campgrounds/${req.params.id}`);
    }
  });
});

module.exports = router;
