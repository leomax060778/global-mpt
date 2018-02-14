/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var searchLib = mapper.getSearch();
var config = mapper.getDataConfig();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,true, "", true);
}

function handleGet(parameters, userSessionID){
	var hl = httpUtil.getUrlParameterByName("HL");
	var searchString = httpUtil.getUrlParameterByName("SEARCH_STRING");
	var regionId = httpUtil.getUrlParameterByName("REGION_ID");
	var subregionId = httpUtil.getUrlParameterByName("SUBREGION_ID");
	var rdo;
	
	rdo = searchLib.getHLBySearch(hl, searchString, regionId, subregionId);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody,userSessionID) {	
	httpUtil.notImplementedMethod();
};

function handlePut(reqBody,userSessionID){
	httpUtil.notImplementedMethod();
};

function handleDelete(reqBody,userSessionID){
	httpUtil.notImplementedMethod();
};

//Call request processing  
processRequest();