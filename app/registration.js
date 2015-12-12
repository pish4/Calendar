var express = require('express');
var routes = express.Router();
var config = require('../config');
var auth = require('./auth');
var User   = require('./models/user');


routes.get('/', function (req, res) {
    res.render('registration.html');
});

routes.post('/', function(req, res) {
    // find the user
    User.findOne({
        phone: req.body.phoneNumber
    }, function(err, user) {

        if (err) throw err;

        if (!user) {
            var newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                city: req.body.city,
                phone: req.body.phoneNumber
            });
            newUser.save();

            // if user is found and password is right
            // create a token
            auth.authUser(res, newUser);
            res.redirect('/calendar');
        } else {
            res.status(409).send('User with this phone number already exists');
        }

    });
});



module.exports = routes;