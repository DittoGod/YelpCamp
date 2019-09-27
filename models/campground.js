const mongoose = require('mongoose');

// SCHEMA SETUP.
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  location: String,
  lat: Number,
  lng: Number,
  cost: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    username: String,
  },
  comments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
  }],
});

// Getter for the price. Devides the number by 100.
campgroundSchema.path('cost').get((num) => (num / 100).toFixed(2));
// Setter for the price. Multiplies the number by 100.
campgroundSchema.path('cost').set((num) => (num * 100).toFixed(2));

module.exports = mongoose.model('Campground', campgroundSchema);
