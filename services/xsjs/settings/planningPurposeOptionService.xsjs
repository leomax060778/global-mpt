/****** libs ************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var planningPurposeOptionLib = mapper.getPlanningPurposeOptionLib();

/******************************************/

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet(parameters, userSessionID) {
	var params = httpUtil.getJSONParameters();
	var result;
    
    switch(params.METHOD) {
        case 'GET_ALL_PLANNING_PURPOSE_OPTION':
            result = planningPurposeOptionLib.getAllPlanningPurposeOption();
            break;
        case 'GET_PLANNING_PURPOSE_OPTION_BY_PLANNING_PURPOSE':
            result = planningPurposeOptionLib.getPlanningPurposeOptionByPlanningPurposeId(params.PLANNING_PURPOSE_ID);
            break;
        case 'GET_PLANNING_PURPOSE_RELATIONSHIP':
            result = planningPurposeOptionLib.getPlanningPurposeRelationship();
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","","Invalid parameter value.");
    }
    
    httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePost(reqBody, userSessionID) {
    var result = planningPurposeOptionLib.insertPlanningPurposeOption(reqBody, userSessionID);
    
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePut(reqBody, userSessionID) {
    var params = httpUtil.getJSONParameters();
    var result;

    switch(params.METHOD) {
        case 'UPDATE_RELATIONSHIP':
            result = planningPurposeOptionLib.updateRelationship(reqBody,userSessionID);
            break;
        case 'UPDATE_PLANNING_PURPOSE_OPTION':
            result = planningPurposeOptionLib.updatePlanningPurposeOption(reqBody, userSessionID);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","","Invalid parameter value.");
    }
	    
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handleDelete(reqBody, userSessionID) {
    var result = planningPurposeOptionLib.deletePlanningPurposeOption(reqBody.PLANNING_PURPOSE_OPTION_ID, userSessionID);
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}
//Call request processing
processRequest();