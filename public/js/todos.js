/**
 * Created by Славік on 12.12.2015.
 */

var callback = function (err, data) {
    if (err) {
        return console.error(err);
    }
    else {
        console.log(data);
        setTodos(data);
    }
}

var setTodos = function(notes) {
    var notesDiv = $('#notes');
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
}

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};


$(document).ready(function() {

    var userId;
    var event_type_id = getUrlParameter('event_type_id');
    var date = getUrlParameter('date');

    Note.find({
        user_id: String,
        event_type_id: String,
        date: String }, callback);


});