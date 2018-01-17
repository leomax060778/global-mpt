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

function handleGet(parameters, userSessionID){
	var type = httpUtil.getUrlParameterByName("TYPE");    
	var rdo;
	/*if(!type){
		rdo = blDetailedReport.getL4DetailedReport();
	} else {*/
		switch(type) {
			case 'FILTERS':
				rdo = blDetailedReport.getPathHl1Hl2Hl3(httpUtil.getUrlParameterByName("BUDGET_YEAR"), httpUtil.getUrlParameterByName("REGION_ID"));
				break;
            case 'DETAILED':
                rdo = blDetailedReport.getDetailedReport(httpUtil.getUrlParameterByName("HL1_ID"),httpUtil.getUrlParameterByName("HL2_ID"),httpUtil.getUrlParameterByName("HL3_ID"));
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
	//}
	
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