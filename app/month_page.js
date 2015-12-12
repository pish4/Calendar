var express = require('express');
var routes = express.Router();
var Events   = require('./models/events_type');
var auth = require('./auth');

routes.get('/', function (req, res) {
        Events.find({ user_id: req.user._id}, function(err, events) {
            res.render('month_page.html', {'events':events, 'user' : req.user});
        });
});


module.exports = routes;