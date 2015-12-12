var express = require('express');
var routes = express.Router();
var config = require('../config');
var Event   = require('./models/events_type');
var path = require('path');

routes.get('/', function (req, res) {
	Event.find({ user_id: req.user._id}, function(err, events) {
		res.render('profile.html', {'events':events, 'user' : req.user});
	});
});

routes.post('/', function(req, res) {
    // find the user
    var envent_name = req.body.event_name;
    var user_id = req.user._id;
    Event.findOne({
        event_name: envent_name,
        user_id: user_id
    }, function(err, event_type) {
    	
        if (err) throw err;

        if (!event_type) {
            var newEvent = new Event({
                event_name: envent_name,
				user_id: user_id,
            });
            newEvent.save();

            res.json({
                success: true,
                message: 'You were successfully logged in'
            });
        } else {
            res.status(400).send('Event already exist exist');
        }

    });
});




module.exports = routes;