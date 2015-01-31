var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  name: String,
  accesstoken: String,
  instagram_id: String,
});

var User = mongoose.model('User', userSchema);

module.exports = User;