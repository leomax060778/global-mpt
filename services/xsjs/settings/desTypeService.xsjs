/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var desTypeLib = mapper.getDesTypeLib();
/** *************************************** */


function processRequest() {
    return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet() {
    var rdo = desTypeLib.getDesType();
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userSessionID) {
    var rdo = desTypeLib.insertDesType(reqBody, userSessionID);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userSessionID) {
    var rdo = desTypeLib.updateDesType(reqBody, userSessionID);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userSessionID) {
    var rdo = desTypeLib.deleteDesType(reqBody.DES_TYPE_ID, userSessionID);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

processRequest();