/****** libs ************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var permissions = mapper.getPermission();
var countryLib = mapper.getCountry();

/******************************************/

function processRequest() {
    return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

//get function
function handleGet() {
    var rdo = countryLib.getCountries();
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userId) {
    var rdo = countryLib.insertCountry(reqBody, userId);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId) {
    var rdo = countryLib.updateCountry(reqBody, userId);

    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userId) {
    var rdo = countryLib.deleteCountry(reqBody, userId);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

//main function
processRequest();