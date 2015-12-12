var express = require('express');
var routes = express.Router();
var config = require('../config');
var Event   = require('./models/events_type');
var path = require('path');

routes.get('/', function (req, res) {
	Event.find({ user_id: req.user.id}, function(err, events) {
		res.render('profile.html', {'events':events});
	});
});

module.exports = routes;