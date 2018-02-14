$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataCountry = mapper.getDataCountry();

/** ***********END INCLUDE LIBRARIES*************** */

function getCountries() {
    return dataCountry.getAllCountries();
}

function insertCountry(payload, userId) {
    return dataCountry.insertCountry(payload, userId);
}

function updateCountry(payload, userId) {
    return dataCountry.updateCountry(payload, userId);
}

function deleteCountry(payload, userId) {
    return dataCountry.deleteCountry(payload, userId);
}