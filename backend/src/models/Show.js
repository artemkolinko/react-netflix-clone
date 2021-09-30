const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  id: Number,
  name: String,
  image: {
    medium: String,
    original: String,
  },
  url: String,
  summary: String,
  rating: {average: Number},
  genres: [String],
  likes: {type: Number, default: 0},
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
