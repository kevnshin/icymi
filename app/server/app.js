var express = require('express');
var mongoose = require('mongoose');
var app = express();

mongoose.connect(require('../config.json').databaseURL);

require('./middleware')(app);
require('./routes')(app);

module.exports.app = app;