/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var eventManagementLib = mapper.getEventManagementLib();
var businessEventPlanningForm = mapper.getEventPlanningFormLib();
var ErrorLib = mapper.getErrors();
/** *************************************** */

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet(params, userId) {
    var parameters = httpUtil.getJSONParameters();
    var result;
    
    switch(parameters.METHOD) {
        case 'ALL_DETAILED':
        	var hl1 = parameters.HL1_ID || 0;
        	var hl2 = parameters.HL2_ID || 0;
        	var hl3 = parameters.HL3_ID || 0;
        	var budgetYearId = parameters.BUDGET_YEAR_ID || 0;
            var regionId = parameters.REGION_ID || 0;
        	
            result = businessEventPlanningForm.getAllEventPlanningFormReport(hl1, hl2, hl3, budgetYearId, regionId, userId);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","","invalid parameter value (should be ALL_DETAILED");
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
