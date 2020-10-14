/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blDetailedReport = mapper.getDetailedReport();
var config = mapper.getDataConfig();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, "", true);
}

function handleGet(reqBody, userSessionID){
	var parameters = httpUtil.getJSONParameters();
	var type = parameters.TYPE;
	var rdo;

	var hl1Id = parameters.HL1_ID || 0;
	var hl2Id = parameters.HL2_ID || 0;
	var hl3Id = parameters.HL3_ID || 0;
	var budgetYearId = parameters.BUDGET_YEAR_ID || 0;
	var regionId = parameters.REGION_ID || 0;

	switch(type) {
		case 'FILTERS':
			rdo = blDetailedReport.getPathHl1Hl2Hl3(budgetYearId, regionId);
			break;
		case 'DETAILED':
			rdo = blDetailedReport.getDetailedReport(hl1Id, hl2Id, hl3Id, budgetYearId, regionId);
			break;
		case 'L4':
			rdo = blDetailedReport.getL4DetailedReport();
			break;
		case 'L5':
			rdo = blDetailedReport.getL5DetailedReport();
			break;
		default:
			throw ErrorLib.getErrors().BadRequest("","reportServices/handleGet","invalid parameter value (should be either L4, L5, FILTERS or DETAILED)");
	}

	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody,userSessionID) {	
	httpUtil.notImplementedMethod();
}

function handlePut(reqBody,userSessionID){
	httpUtil.notImplementedMethod();
};

function handleDelete(reqBody,userSessionID){
	httpUtil.notImplementedMethod();
};

//Call request processing  
processRequest();
