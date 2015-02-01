var passport = require('passport');
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;
var mongoose = require('mongoose');
var flash = require ('connect-flash');

//MODELS
var Account = require('../models/accounts.js');

var config = require('../config.json');

//Passport Area_

passport.use(new InstagramStrategy({
  clientID: config.instagram.clientID,
  clientSecret: config.instagram.clientSecret,
  callbackURL: config.instagram.callbackURL,
  passReqToCallback: true
},
function(req, accessToken, refreshToken, profile, done) {
  var raw_data = JSON.parse(profile._raw).data;

  Account.findOne({domain: 'instagram.com', uid: raw_data.id}, function(err, account) {
    if (err) { return done(err); }
    if (account) { return done(null, account); }

    var account = new Account();
    account.fullname = raw_data.full_name;
    account.username = raw_data.username;
    account.domain = 'instagram.com';
    account.service_id = raw_data.id;
    account.token = { kind: 'oauth', accesstoken: accessToken };

    account.save(function (err, user) {
      if (err) {
        throw err;
      }
      req.logIn(user, function(err){
        if (err) { return next(err); }
      });
    });

    return done(null, account);
  });

}
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  Account.findById(user._id, function(err, user) {
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


module.exports = {
  ensureAuthenticated: ensureAuthenticated,
  logout: logout,
};