var passport = require('passport')
var OAuth2Strategy = require('passport-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;
var crypto = require('crypto');
var mongoose = require('mongoose');
var flash = require ('connect-flash');

var User = require('../models/users.js');

var config = require('../config.json');

//Passport Area


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


// passport.serializeUser(function(user, done) {
//   // console.log("serialize", user);
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   User.findById(user._id, function(err, user) {
//     done(null, user);
//   });
// });

// //FUNCTIONS
// function ensureAuthenticated (req, res, next) {
//   if (req.isAuthenticated() ){
//     return next();
//   }

//   //store the url they're coming from
//   req.session.redirectUrl = req.url;

//   //not authenticated
//   req.flash("warn", "You must be logged-in to do that.");
//   res.redirect('/login');
// };

// function encryptPassword (password) {
//   var salt = "allwedoiswin";
//   var shasum = crypto.createHash('sha512');

//   shasum.update ( password + salt );

//   return shasum.digest('hex');
// };
// LOGIN ROUTES

// app.get('https://api.instagram.com/oauth/authorize/?client_id=6ef3fe178e4a46f58ae6f7c4efc4ce8f&redirect_uri=https://icymi.ngrok.com/instagram&response_type=code&scope=likes+comments', passport.authenticate('provider'));

// app.get('/auth/provider/callback', 
//   passport.authenticate('provider', { successRedirect: '/twitter',
//                                       failureRedirect: '/login' }));

// }

// app.get('/', function(req, res){
// res.render('index', { user: req.user });
// });

// app.get('/auth/twitter',
//   passport.authenticate('twitter'),
//   function(req, res){
// });

// app.get('/auth/twitter/callback',
//   passport.authenticate('twitter', { failureRedirect: '/' }),
//   function(req, res) {
//     res.redirect('/twitter_feed');
//   }
// );

// app.get('/logout', function(req, res){
//   req.logout();
//   res.redirect('/');
// });



module.exports = {

};