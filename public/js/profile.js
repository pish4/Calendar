$(function() {
    var errorAlert = '<div id="errorAlert" class="alert alert-danger fade in">' +
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
         '<strong>Error: </strong> <span id="errorText"></span>' +
    '</div>';
    var event_list_item = 

    $('#btnAddEvent').click(function () {
        var event_name = $.trim($('#textBox').val());
        if (event_name != "") {
            $.post('/profile', {event_name : event_name})
                    .then(onSuccess, onError);
        }   
    });

    $('.glyphicon').on('click',function() {
        var li_item = $(this).parent()
        var event_type = $.trim(li_item[0].outerText)
        if (event_type !== "") {
        $.post('/profile/remove', {event_name : event_type})
                .then(function() {  
                    li_item.remove();
                    $("#errorAlert").remove();
                }, onError);
        }   
    });


    function onSuccess(msg){
        var event_text = $("#textBox").val()

        $("#events_list").append('<li class="list-group-item"><span>' + event_text +
            '</span><span class="glyphicon glyphicon-remove"></span></li>');
        $('#textBox').val("");
        $("#errorAlert").remove();
    }

    function qwerty() {
        console.log("qwert")
    }

    function onError(XMLHttpRequest) {
        $('#events_block').append(errorAlert);
        $('#errorText').text(XMLHttpRequest.responseText)
    }
});
