var https = require('https');
var auth = require('../controllers/auth.js');

function home_page (req, res) {
  res.render('index', { user: req.user });
}


function instagram_data (req, res) {

  console.log("In feed:", auth.access_token);
  https.get("https://api.instagram.com/v1/users/self/feed?access_token=" + auth.access_token(), function(resp) {
    console.log("headers: ", resp.headers);

    resp.on('data', function(d) {
      process.stdout.write(d);
    });

    res.render('instagram_feed');

  }).on('error', function(e) {
    console.error(e);
  });

}

module.exports = {
  view_home_page: home_page,
  get_instagram_data: instagram_data
}