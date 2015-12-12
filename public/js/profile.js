$(function() {
    var errorAlert = '<div id="errorAlert" class="alert alert-danger fade in">' +
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
         '<strong>Error: </strong> <span id="errorText"></span>' +
    '</div>';

    $('#btnAddEvent').click(function () {
        var event_name = $('#textBox').val();
        console.log(event_name  )
        
        $.post('/profile', {event_name : event_name})
                .then(onSuccess, onError);
    });

    function onSuccess(msg){
        console.log(msg)
        $("#events_list").append('<li class="list-group-item">'+ $('#textBox').val() +'</li>');
        $('#textBox').val("");
        $("#errorAlert").remove();
    }

    function onError(XMLHttpRequest) {
        $('#events_block').append(errorAlert);
        $('#errorText').text(XMLHttpRequest.responseText)
    }
});