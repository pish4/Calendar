var express = require('express');
var routes = express.Router();
var config = require('../config');
var jwt    = require('jsonwebtoken');
var Event   = require('./models/events_type');
var path = require('path');
var auth = require('./auth');

routes.get('/', function (req, res) {

	auth.get_user_from_token(req.cookies.auth, function(user_data) {
	    Event.find({ user_id: user_data._id}, function(err, events) {
	        res.render('profile.html', {'events':events});
	    });
	});

})


module.exports = routes;