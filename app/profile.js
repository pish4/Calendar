var express = require('express');
var routes = express.Router();
var config = require('../config');
var jwt    = require('jsonwebtoken');
var User   = require('./models/user');
var path = require('path');

routes.get('/:phone_number', function (req, res) {
	var phone_number = req.params.phone_number;
    res.render('profile.html');
})

routes.get('/', function (req, res) {
	//here should be riderect to current user profile
    res.redirect('/login/');
})


module.exports = routes;