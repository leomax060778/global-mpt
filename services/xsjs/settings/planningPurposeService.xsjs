/****** libs ************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var plPurposeLib = mapper.getPlanningPurposeLib();

/******************************************/

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet(parameters, userSessionID) {
	var params = httpUtil.getJSONParameters();
	var result;
    
    switch(params.METHOD) {
        case 'GET_ALL_PLANNING_PURPOSE':
            result = plPurposeLib.getAllPlanningPurpose(userSessionID);
            break;
        case 'GET_PLANNING_PURPOSE_RELATED_DATA':
            result = plPurposeLib.getPlanningPurposeRelatedData(params.RELATED_DATA, userSessionID);
            break;
        case 'GET_ALL_PLANNING_PURPOSE_RELATION':
            result = [];//plPurposeLib.getAllPlanningPurposeRelation(userSessionID);
            break;
        case 'GET_PLANNING_PURPOSE_ID_BY_HL4_ID':
            result = plPurposeLib.getPlanningPurposeIdByHl4Id(params.HL4_ID, userSessionID);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","","invalid parameter value (should be GET_ALL_PLANNING_PURPOSE, GET_ALL_PLANNING_PURPOSE_RELATION or GET_PLANNING_PURPOSE_RELATED_DATA");
    }
    
    httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePost(reqBody, userSessionID) {
    var result = plPurposeLib.insertPlanningPurpose(reqBody, userSessionID);
    
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePut(reqBody, userSessionID) {
	 var result = plPurposeLib.updatePlanningPurpose(reqBody, userSessionID);
	    
	 return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handleDelete(reqBody, userSessionID) {
    var result = plPurposeLib.deletePlanningPurpose(reqBody, userSessionID);

    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}
//Call request processing
processRequest();