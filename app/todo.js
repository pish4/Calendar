var express = require('express');
var routes = express.Router();
var config = require('../config');
var Event   = require('./models/events_type');
var path = require('path');

routes.get('/', function (req, res) {
	Event.find({ user_id: req.user._id}, function(err, events) {
		res.render('todos.html', {'events':events, 'user' : req.user});
	});
});

module.exports = routes;