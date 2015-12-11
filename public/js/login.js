/**
 * Created by Славік Олена on 05.12.2015.
 */
$(function() {
    $('#signIn').click(function () {
    	var phone_number = $('#phone').val()
        $.post('/login', {phone : phone_number})
            .then(function(){
            	window.location.replace("/profile/" + phone_number);
            },
            function() {	
                alert("wrong number");
            });
    });
});