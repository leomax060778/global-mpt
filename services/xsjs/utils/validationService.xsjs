/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var validationLib = mapper.getValidationLib();
var config = mapper.getDataConfig();
/******************************************/
var MIN_MAX_DATE = "MIN_MAX_DATE";
/********************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, "",true);
}

//Implementation of GET call -- GET HL1
function handleGet(){
    var method = httpUtil.getUrlParameters().get("method").toUpperCase();
    var HL_ID = httpUtil.getUrlParameterByName("HL_ID").toUpperCase();
    var LEVEL = httpUtil.getUrlParameterByName("LEVEL").toUpperCase();
    switch (method){
        case MIN_MAX_DATE:
            var rdo = validationLib.getMinMaxDateByIdAndLevel(HL_ID, LEVEL);
            httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","validationServices/handleGet","Invalid parameter name");
    }


}

function handlePost(reqBody) {

	var method = httpUtil.getUrlParameters().get("method");
	// var method = reqBody.METHOD;
    switch (method){
        case 'ACTUAL_DATES_RANGE':
            var rdo = validationLib.validateActualDatesRange(reqBody.CAMPAIGN_TYPE_ID, reqBody.CAMPAIGN_SUBTYPE_ID, reqBody.ACTUAL_START_DATE, reqBody.ACTUAL_END_DATE);
            httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","validationServices/handlePost","Invalid parameter name");
    }
}

function handlePut(){
    throw ErrorLib.getErrors().NotImplemented();
}

function handleDelete(){
    throw ErrorLib.getErrors().NotImplemented();
}

processRequest();