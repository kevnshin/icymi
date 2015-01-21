var express = require('express');
var mongoose = require('mongoose');
var https = require('https');
var app = express();
var passport = require('passport')
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var InstagramStrategy = require('passport-instagram').Strategy;


var config = require('../config.json');


// mongoose.connect(require('../config.json').databaseURL);

require('./middleware')(app);
// require('./routes')(app);


// passport.use(new TwitterStrategy({
//  consumerKey: config.twitter.consumerKey,
//  consumerSecret: config.twitter.consumerSecret,
//  callbackURL: config.twitter.callbackURL
// },
// function(accessToken, refreshToken, profile, done) {
//  process.nextTick(function () {
//    return done(null, profile);
//  });
// }
// ));

var access_token;

passport.use(new InstagramStrategy({
 clientID: config.instagram.clientID,
 clientSecret: config.instagram.clientSecret,
 callbackURL: config.instagram.callbackURL,
},
function(accessToken, refreshToken, profile, done) {
  access_token = accessToken;
  process.nextTick(function () {
   return done(null, profile);
 });
}
));

passport.serializeUser(function(user, done) {
  // console.log("serialize", user);
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // User.findById(user._id, function(err, user) {
    done(null, user);
  // });
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

function encryptPassword (password) {
  var salt = "allwedoiswin";
  var shasum = crypto.createHash('sha512');

  shasum.update ( password + salt );

  return shasum.digest('hex');
};



app.get('/', function(req, res){
res.render('index', { user: req.user });
});

app.get('/auth/instagram',
  passport.authenticate('instagram'),
  function(req, res){
});

app.get('/auth/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/instagram');
  }
);

app.get('/instagram', function (req, res) {

  https.get("https://api.instagram.com/v1/users/self/feed?access_token=" + access_token, function(resp) {
    console.log("statusCode: ", resp.statusCode);
    console.log("headers: ", resp.headers);

    resp.on('data', function(d) {
      process.stdout.write(d);
    });

    res.render('instagram_feed');

  }).on('error', function(e) {
    console.error(e);
  });


})



app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


module.exports.app = app;