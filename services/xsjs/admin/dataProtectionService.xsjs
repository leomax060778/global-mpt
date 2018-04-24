/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var dataProtectionLib = mapper.getDataProtection();
var config = mapper.getDataConfig();
/******************************************/

function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,config.getResourceIdByName(config.userAccess()));
}

function handleGet(parameters, userSessionID){
	var method = httpUtil.getUrlParameterByName("METHOD");
	var result;
	
	switch(method) {
	    case 'GET_ALL_USER_DATA_PROTECTION':
	        result = dataProtectionLib.getAllUserDataProtection();
	        break;
	    default:
	        throw ErrorLib.getErrors().BadRequest("","","invalid parameter value (should be GET_ALL_USER_DATA_PROTECTION)");
	}
	
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handlePost(reqBody,userSessionID) {
	return httpUtil.notImplementedMethod();
}

function handlePut(reqBody, userSessionID){
	var result = dataProtectionLib.updateDataProtectionStatus(reqBody, userSessionID);
	
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handleDelete(reqBody,userSessionID){
	return httpUtil.notImplementedMethod();
};

//Call request processing  
processRequest();