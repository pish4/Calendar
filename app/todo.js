var express = require('express');
var routes = express.Router();
var config = require('../config');
var Event   = require('./models/events_type');
var Note   = require('./models/note');
var path = require('path');

routes.get('/', function (req, res) {
	Note.find({
        user_id: req.user._id,
        event_type_id: req.event_type_id,
        date: req.date

    }, function(err, notes) {
		res.render('todos.html', {'notes':notes, 'user' : req.user});
	});
});

routes.post('/', function (req, res) {
    var newNote = new Note({
        user_id: req.body.user_id,
        event_type_id: req.body.event_type_id,
        text: req.body.text,
        date: req.body.date
    });
    newNote.save();

    res.reload(true);
});

module.exports = routes;