/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var eventManagementLib = mapper.getEventManagementLib();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** *************************************** */

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, config.getResourceIdByName(config.eventManagement()), false);
}

function handleGet(params, userSessionID) {
    var method = httpUtil.getUrlParameterByName("METHOD");
    var result;

    switch(method) {
        case 'ALL':
            result = eventManagementLib.getAllEventManagement(userSessionID);
            break;
        case 'ALL_APPROVED_DETAILED':
            result = eventManagementLib.getAllEventRequestApproved(userSessionID);
            break;
        case 'FILTERS':
            result = eventManagementLib.getPathHl1Hl2Hl3(httpUtil.getUrlParameterByName("BUDGET_YEAR"), httpUtil.getUrlParameterByName("REGION_ID"));
            break;
        case 'L4_BY_FILTERS':
            result = eventManagementLib.getAllHl4ByFilter(httpUtil.getUrlParameterByName("HL1_ID"),httpUtil.getUrlParameterByName("HL2_ID"),httpUtil.getUrlParameterByName("HL3_ID"));
            break;
        case 'BY_ID':
            result = eventManagementLib.getEventRequestById(httpUtil.getUrlParameterByName("EVENT_REQUEST_ID"));
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","","invalid parameter value (should be either ALL, FILTERS or L4_BY_FILTERS)");
    }
    httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePost(reqBody, userSessionID) {
	var rdo = eventManagementLib.insertEventRequest(reqBody, userSessionID);		    	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userSessionID) {
    var method = httpUtil.getUrlParameterByName("METHOD");
    var result;
    switch(method) {
        case 'APPROVED':
        case 'REJECTED':
            result = eventManagementLib.changeStatus(method, reqBody.EVENT_REQUEST_ID, userSessionID);
            break;
        default:
            result = eventManagementLib.updateEventRequest(reqBody, userSessionID);
    }
	httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userSessionID) {
    httpUtil.notImplementedMethod();
}

processRequest();