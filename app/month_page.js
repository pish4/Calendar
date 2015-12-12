var express = require('express');
var routes = express.Router();
var Events   = require('./models/events_type');
var auth = require('./auth');

routes.get('/', function (req, res) {
    auth.get_user_from_token(req.cookies.auth, function(user_data) {
        Events.find({ user_id: user_data._id}, function(err, events) {
            res.render('month_page.html', {'events':events});
        });
    });
})


module.exports = routes;