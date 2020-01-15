const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  passwd: String,
  authority: Number,
});

module.exports = mongoose.model('user', userSchema);