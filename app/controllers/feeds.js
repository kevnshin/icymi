var https = require('https');
var auth = require('../controllers/auth.js');

function home_page (req, res) {
  res.render('index');
}


function view_instagram (req, res) {

  console.log("req.user", req.user);

  https.get("https://api.instagram.com/v1/users/self/feed?access_token=" + req.user.token.accesstoken, function(resp) {
    // console.log("headers: ", resp.headers);

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
  view_instagram: view_instagram
}