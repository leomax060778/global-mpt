/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var business = mapper.getEventPlanningFormLib();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** *************************************** */

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, config.getResourceIdByName(config.level5()), false);
}

function handleGet(params, userSessionID) {
    var method = httpUtil.getUrlParameterByName("METHOD");
    var result;

    switch(method) {
        case 'GET_AFFILIATED_WITH_LARGER_EVENT':
            result = business.getAllAffiliatedWithLargerEvent(userSessionID);
            break;
        case 'GET_REGISTRATION_PROCESS':
            result = business.getAllRegistrationProcess(userSessionID);
            break;
        case 'GET_TARGET_AUDIENCE':
            result = business.getAllTargetAudience(userSessionID);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","","invalid parameter value (should be either GET_AFFILIATED_WITH_LARGER_EVENT, GET_REGISTRATION_PROCESS or GET_TARGET_AUDIENCE)");
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
