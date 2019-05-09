/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var searchLib = mapper.getSearch();
var config = mapper.getDataConfig();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, "", true);
}

function handleGet(parameters, userSessionID){
	var params = httpUtil.getUrlParameters();
	var jsonParams = httpUtil.getJSONParameters();
	var rdo;

	if(jsonParams.METHOD){
		switch(jsonParams.METHOD){
			case 'SEARCH_COST_CENTER':
				rdo = searchLib.getCostCenterBySearch(jsonParams, userSessionID);
				break;
		}
	}else{
		rdo = searchLib.getHLBySearch(params, userSessionID);
	}

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