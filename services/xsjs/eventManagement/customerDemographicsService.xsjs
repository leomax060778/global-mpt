/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var customerDemographicsLib = mapper.getCustomerDemographicsLib();
/** *************************************** */

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet(userSessionID) {
    var method = httpUtil.getUrlParameterByName("METHOD");
    var result;

    switch(method) {
        case 'ALL':
            result = customerDemographicsLib.getAllCustomerDemographics(userSessionID);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","","invalid parameter value (should be ALL)");
    }
    httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePost(reqBody, userSessionID) {
	httpUtil.notImplementedMethod();
}

function handlePut(reqBody, userSessionID) {
	httpUtil.notImplementedMethod();
}

function handleDelete(reqBody, userSessionID) {
    httpUtil.notImplementedMethod();
}

processRequest();