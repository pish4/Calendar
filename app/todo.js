var express = require('express');
var routes = express.Router();
var config = require('../config');
var Event   = require('./models/events_type');
var Note   = require('./models/note');
var path = require('path');

routes.get('/', function (req, res) {
    Event.findById(req.query.eventId, function (err, profile) {
        if(err) throw err;
        Note.find({
            user_id: req.user._id,
            event_type_id: req.query.eventId,
            date:  req.query.date
        }, function(err, notes) {

            if (err) throw err;

            res.render('todos.html', {
                'notes': notes,
                'user' : req.user,
                'date' : req.query.date,
                'event_name' : profile.event_name
            });
        });
    });
});

routes.post('/', function (req, res) {
    var newNote = new Note({
        user_id : req.user._id,
        event_type_id : req.body.eventId,
        text : req.body.text,
        date : req.body.date
    });
    newNote.save();

    res.json({
        success: true,
        message: 'You were successfully removed profile'
    });
});

routes.post('/remove', function (req, res) {
    Note.remove({
        user_id : req.user._id,
        event_type_id : req.body.eventId,
        text : req.body.text,
        date : req.body.date
    }, function(err, removed) {
        if (err) {
            console.log("fail")
            res.status(400).send('Can`t remove. Please refresh page');
        } else {
            res.json({
                success: true,
                message: 'You successfully removed item'
            });
        }
    });
});

module.exports = routes;