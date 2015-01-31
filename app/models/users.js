var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  fullname: String,
  username: String,
  accesstoken: String,
});

var IG_profile = mongoose.model('User', userSchema);

module.exports = {
  IG_profile: IG_profile
}