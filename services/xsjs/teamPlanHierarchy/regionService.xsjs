/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var blRegion = mapper.getRegion();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/******************************************/

var regionId = "REGION_ID";
var fromExecutionLevel = "EXECUTION_LEVEL";
var forFilters = "FILTER";

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters){
    var method = httpUtil.getUrlParameters().get("METHOD");
	var rdo;

	if (parameters.length > 0 && method === forFilters) {
		rdo = blRegion.getAllRegionsForFilters();
	} else if(parameters.length > 0 && method !== fromExecutionLevel && !httpUtil.getUrlParameterByName("PARTIAL") ){
		if(parameters[0].name === regionId){
			rdo = blRegion.getRegionById(parameters[0].value);
		}
		else{
			throw ErrorLib.getErrors().BadRequest("","regionServices/handleGet","invalid parameter name (can be: REGION_ID)");
		}
	} else {
			rdo = blRegion.getAllRegions(method === fromExecutionLevel, httpUtil.getUrlParameterByName("PARTIAL"));
	}

	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userSessionID){
	var rdo = blRegion.insertRegion(reqBody, userSessionID);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};
function handlePut(reqBody, userSessionID){
	var rdo = blRegion.updateRegion(reqBody, userSessionID);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};
function handleDelete(reqBody, userSessionID){
	var rdo = blRegion.deleteRegion(reqBody, userSessionID);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

processRequest();
