var request = require('request');
var auth = require('../controllers/auth.js');

function home_page (req, res) {
  res.render('index');
}


function view_instagram (req, res) {
  var url = "https://api.instagram.com/v1/users/self/feed?access_token=";

  request( url + req.user.token.accesstoken + "&count=30", function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // console.log("body", JSON.parse(body).data.length);
      // console.log("response",response);
      var photos = JSON.parse(body).data;
      // console.log(JSON.parse(body).data[0].likes);
      var photos_data = [];
      for (var i = 0; i < photos.length; i++) {
        var photo_data = {
          likes: photos[i].likes.count,
          url: photos[i].link
        }
        photos_data.push(photo_data);
      };

      console.log(photos_data);
      res.render('instagram_feed');
    } else {
      res.send("Oops, it looks like you BROKE OUR WEBSITE!");
    }
  })
}

module.exports = {
  view_home_page: home_page,
  view_instagram: view_instagram
}