
$(function() {
    var errorAlert = '<div id="errorAlert" class="alert alert-danger fade in">' +
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a>' +
         '<strong>Error: </strong> <span id="errorText">Number not found </span>' +
    '</div>';
    var PHONE_REGEX = /^0\d{9}$/;
    $('#signIn').click(function () {
        var phone = $('#phone').val();
        if(!PHONE_REGEX.test(phone)) {
            onError();
            $('#errorText').html('wrong number pattern');
        }
        else {
            $.post('/login', {phone : phone})
                .then(onSuccess, onError);
        }
    });

    function onSuccess(){
        location.href ='/calendar';
    }

    function onError() {
        if($('#errorAlert').length == 0 ) {
            $('.card').append(errorAlert);
        }
        else {
            $('#errorText').text('Number not found');
        }
        $('.form-signin').addClass('has-error');
    }

});