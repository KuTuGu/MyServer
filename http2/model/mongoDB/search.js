const mongoose = require('mongoose');

const searchSchema = new mongoose.Schema({
  query: String,
  res: [{
    content: String,
    link: String
  }]
});

module.exports = mongoose.model('search', searchSchema);