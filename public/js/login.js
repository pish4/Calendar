/**
 * Created by Славік Олена on 05.12.2015.
 */
$(function() {
    $('#signIn').click(function () {
        $.post('/login', {phone : $('#phone').val()})
            .then(function(){
                alert("logged in succesfully");
            },
            function() {
                alert("wrong number");
            });
    });
});