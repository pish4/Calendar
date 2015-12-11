var express = require('express');
var routes = express.Router();
var config = require('../config');
var jwt = require('jsonwebtoken');
var User = require('./models/user');
var path = require('path');

routes.post('/login', function (req, res) {
    // find the user
    User.findOne({
        phone: req.body.phone
    }, function (err, user) {

        if (err) throw err;

        if (!user) {
            res.status(400).send('Number does not exist');
        } else if (user) {
            // if user is found and password is right
            // create a token
            var token = jwt.sign(user, config.password, {
                expiresIn: 1440 * 60 // expires in 24 hours
            });

            res.cookie('auth', token, {maxAge: 10000000000});
            // return the information including token as JSON
            res.json({
                success: true,
                message: 'You were successfully logged in'
            });
        }
    });
});

routes.use(function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.cookies.auth;

    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, config.password, function (err, decoded) {
            if (err) {
                return res.json({success: false, message: 'Failed to authenticate token.'});
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
            }
        });
    } 
    next();
});

routes.get('/login', function(req, res){
    res.render('login.html')
});


routes.get('/logout', function (req, res) {
    res.clearCookie('auth');
    res.redirect('/login');
});


module.exports = routes;
