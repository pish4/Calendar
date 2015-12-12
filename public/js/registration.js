
function validate() {
    return checkFirstName() && checkLastName() &&
            checkCity() && checkPhone();
}

var FIRST_LAST_NAME_REGEX = /^([A-Z\u0410-\u042f\u0407\u0406\u0404']{1}[a-z\u0430-\u044f\u0456\u0457\u0454']{1,20}\u002d{1}[A-Z\u0410-\u042f\u0407\u0406\u0404']{1}[a-z\u0430-\u044f\u0456\u0457\u0454']{1,20}|[A-Z\u0410-\u042f\u0407\u0406\u0404']{1}[a-z\u0430-\u044f\u0456\u0457\u0454']{1,20})$/;
var CITY_REGEX = /^([a-zA-Z\u0410-\u042f\u0404\u0406\u0407\u0490\u0430-\u044f\u0454\u0456\u0457\u0491]+(?:. |-| |'))*[a-zA-Z\u0410-\u042f\u0404\u0406\u0407\u0490\u0430-\u044f\u0454\u0456\u0457\u0491]*$/;
var PHONE_REGEX = /^0[1-9]\d{8}$/;

var checkFirstName = function checkFirstName() {
    var firstName = $('#firstName').val();
    if (!FIRST_LAST_NAME_REGEX.test(firstName)) {
        alert("There is an error in first name!");
        return false;
    }
    return true;
}

var checkLastName = function () {
    var lastName = $('#lastName').val();
    if (!FIRST_LAST_NAME_REGEX.test(lastName)) {
        alert("There is an error in last name!");
        return false;
    }
    return true;
}

var checkCity = function () {
    var city = $('#city').val();
    if (!CITY_REGEX.test(city)) {
        alert("There is an error in city!");
        return false;
    }
    return true;
}

var checkPhone = function () {
    var phone = $('#phoneNumber').val();
    if (!PHONE_REGEX.test(phone)) {
        alert("There is an error in phone number!");
        return false;
    }
    return true;
}
