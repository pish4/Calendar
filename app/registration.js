var express = require('express');
var routes = express.Router();
var config = require('../config');
var jwt    = require('jsonwebtoken');
var User   = require('./models/user');
var path = require('path');

routes.get('/', function (req, res) {
    res.sendFile(path.resolve('./public/views/registration.html'));
})

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
            var token = jwt.sign(newUser, config.password, {
                expiresIn: 1440 * 60 // expires in 24 hours
            });

            res.cookie('auth', token, { maxAge: 10000000000 });
            // return the information including token as JSON

            res.redirect('/calendar');
        } else {
            res.status(409).send('User with this phone number already exists');
        }

    });
});



module.exports = routes;