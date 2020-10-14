/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blBudgetReport = mapper.getBudgetReport();
var config = mapper.getDataConfig();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, "", true);
}

function handleGet(parameters, userSessionID){
	httpUtil.notImplementedMethod();
};

function handlePost(reqBody,userSessionID) {
	var parameters = httpUtil.getJSONParameters();
	var rdo = null;

	switch(parameters.METHOD) {
		case "DOWNLOAD":
			rdo = blBudgetReport.getBudgetDistributionReport(reqBody, userSessionID)
			break;
		default:
			rdo = blBudgetReport.getHl4ByFilter(reqBody, userSessionID);
			break;
	}

	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody,userSessionID){
	httpUtil.notImplementedMethod();
};

function handleDelete(reqBody,userSessionID){
	httpUtil.notImplementedMethod();
};

//Call request processing  
processRequest();
