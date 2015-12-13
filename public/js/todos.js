/**
 * Created by Славік on 12.12.2015.
 */

var callback = function (err, data) {
    if (err) {
        return console.error(err);
    }
    else {
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

$('#addTaskButton').click(function()
{
    var value = $('#new_note_item').val();

    var date = getUrlParameter('date');
    var eventId = getUrlParameter('eventId');
    //var url = '/notes?date=' + document.all.selected_date.value+'/'+cur_month + '/' + cur_year + '&eventId=' + selectedValue;
    if (value != "") {
        $.post('/notes', {
            date : date,
            eventId : eventId,
            text : value
        }).then(onSuccess, onError);
    }
});

function onSuccess(msg){
    location.reload(true);
}

function onError(XMLHttpRequest) {
    $('#errorText').text(XMLHttpRequest.responseText);
}

$(function()
{
    $('.removeTask').on('click', function() {
        var li_item = $(this).parent()
        var date = getUrlParameter('date');
        var eventId = getUrlParameter('eventId');
        var value = $(this).prev().text();

        $.post('/notes/remove', {
                date : date,
                eventId : eventId,
                text : value
        })
            .then(function() {
                li_item.remove();
                $("#errorAlert").remove();
            }, onError);
    });
});