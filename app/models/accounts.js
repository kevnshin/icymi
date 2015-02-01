var mongoose = require('mongoose');

var accountSchema = mongoose.Schema({
  fullname: String,
  username: String,
  domain: String,
  service_id: String,
  token: Object,
});

var Accounts = mongoose.model('Accounts', accountSchema);

module.exports = Accounts;