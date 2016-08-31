'use strict';

var Mongoose = require('mongoose');
var Config = require('./config');

Mongoose.connect('mongodb://' + Config.mongo.url + '/' + Config.mongo.database);
var db = Mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
	console.log('Database started: ' + Config.mongo.url + "/" + Config.mongo.database);
});

exports.Mongoose = Mongoose;
exports.db = db;
