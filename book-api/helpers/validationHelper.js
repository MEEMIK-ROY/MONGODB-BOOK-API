const { getMaxListeners } = require("process");

function CheckNull(param){
    var result = param == undefined || param == null || param == "";
    return result;
}

function validate_email(email){
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var result = re.test(String(email).toLowerCase());
    return result;
}

function validateNumber (number){
    const re = /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/;
    var result = re.test(String(number).toLowerCase());
    return result;
}

function validateGender(gender){
    const gender_array = ["male", "female", "others"];
    var result = gender_array.includes(gender.toLowerCase()) || CheckNull(gender) ;
    return result;
}
module.exports = {
    CheckNull,
    validate_email,
    validateNumber,
    validateGender
}

