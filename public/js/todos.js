/**
 * Created by Славік on 12.12.2015.
 */
var auth = require('./auth');
var Note   = require('./models/note');
$(document).ready(function() {
        auth.get_user_from_token(/*req.cookies.auth*/document.cookie.auth, function(user_data) {
            Note.find({ user_id: user_data._id}, function(err, notes) {
                var notesDiv = $("#notes");
                notesDiv.empty();

                for(key in notes) {
                    var newNote = document.createElement('div');

                    var aElement = document.createElement('a');
                    aElement.setAttribute('class', 'center');
                    aElement.setValue(key.text);

                    var glyphElement = document.createElement('span');
                    glyphElement.setAttribute('class', 'glyphicon glyphicon-remove');
                    glyphElement.setAttribute('aria-hidden', 'true');


                    newNote.appendChild(aElement);
                    newNote.appendChild(glyphElement);

                    notesDiv.appendChild(newNote);
                }
            })
        })
    });