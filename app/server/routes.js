function routes (app) {
  var passport = require('passport');


  //MODELS


  //CONTROLLERS
  var auth = require('../controllers/auth.js');
  var feed = require('../controllers/feeds.js');

  //AUTH ROUTES

  app.get('/auth/instagram', passport.authenticate('instagram'));

  app.get('/auth/instagram/callback',
    passport.authenticate('instagram', { failureRedirect: '/' }),
    function(req, res) {
      res.redirect('/instagram');
    }
  );
  app.get('/logout', auth.logout);

  //FEED ROUTES
  app.get('/', feed.view_home_page);
  app.get('/instagram', feed.get_instagram_data);




}

module.exports = routes;