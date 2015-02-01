var request = require('request');
var auth = require('../controllers/auth.js');

function home_page (req, res) {
  res.render('index');
}


function view_instagram (req, res) {
  var url = "https://api.instagram.com/v1/users/self/feed?access_token=";

  request( url + req.user.token.accesstoken + "&count=200", function (error, response, body) {
    if (!error && response.statusCode == 200) {

      var photos = JSON.parse(body).data;
      var photos_data = [];
      var top_posts = [];
      var likes = [];
      console.log("photos.length",photos.length);
      for (var i = 0; i < photos.length; i++) {
        var photo_data = {
          likes: photos[i].likes.count,
          url: photos[i].link
        }

        likes.push(photos[i].likes.count);

        photos_data.push(photo_data);

        top_posts = photos_data;


      };

      while( likes.length > 5 ) {
        var index = likes.indexOf(getMinOfArray(likes));
        likes.splice(index,1);
        top_posts.splice(index,1);
        console.log("likes",likes);
        console.log("top_posts",top_posts);

      }

      console.log("photos_data", photos_data);
      res.render('instagram_feed');
    } else {
      res.send("Oops, it looks like you BROKE OUR WEBSITE!");
    }
  })
}

function getMinOfArray(numArray) {
    return Math.min.apply(null, numArray);
}

module.exports = {
  view_home_page: home_page,
  view_instagram: view_instagram
}