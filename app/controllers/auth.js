var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
var mongoose = require('mongoose');
var flash = require ('connect-flash');

//MODELS
var User = require('../models/users.js');


var config = require('../config.json');

//Passport Area_
var access_token;

passport.use(new InstagramStrategy({
 clientID: config.instagram.clientID,
 clientSecret: config.instagram.clientSecret,
 callbackURL: config.instagram.callbackURL,
},
function(accessToken, refreshToken, profile, done) {

  var new_user = new User.IG_profile ({
    fullname: profile.displayName,
    username: profile.username,
    accesstoken: accessToken,
  })

  console.log(new_user);

  process.nextTick(function () {
  return done(null, profile);
 });
}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  User.IG_profile.findById(user._id, function(err, user) {
    done(null, user);
  });
});

//FUNCTIONS
function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated() ){
    return next();
  }

  //store the url they're coming from
  req.session.redirectUrl = req.url;

  //not authenticated
  req.flash("warn", "You must be logged-in to do that.");
  res.redirect('/login');
};


function logout (req, res) {
  req.logout();
  res.redirect('/');
}

function get_access_token () {
  return access_token;
}


module.exports = {
  access_token: get_access_token,
  ensureAuthenticated: ensureAuthenticated,
  logout: logout,
};