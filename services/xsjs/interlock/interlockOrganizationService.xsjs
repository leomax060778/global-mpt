/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var interlockLib = mapper.getInterlockOrganization();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();

/** *************************************** */

var getInterlockById = "GET_INTERLOCK_ORGANIZATION_BY_ID";
var getAllInterlockOrganization = "GET_ALL_INTERLOCK_ORGANIZATION";

function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userId){
	var rdo = {};
	
	if(parameters.length > 0){
		if(!parameters[0].value){
			throw ErrorLib.getErrors().BadRequest("","interLockOrganizationService/handleGet","invalid parameter value. Can not be null or empty");
		}
		
		switch(parameters[0].name){
			case getInterlockById:
				rdo = interlockLib.getInterlockOrganizationById(parameters[0].value, userId);
				break;
			case getAllInterlockOrganization:
				rdo = interlockLib.getAllInterlockOrganization();
				break;
			default:
				throw ErrorLib.getErrors().BadRequest("","interLockOrganizationService/handleGet","invalid parameter name (can be: GET_INTERLOCK_ORGANIZATION_BY_ID or GET_ALL_INTERLOCK_ORGANIZATION)");
				break;
		}
	}else{
		throw ErrorLib.getErrors().BadRequest("","interLockOrganizationService/handleGet","The parameter could not be found (can be: GET_INTERLOCK_ORGANIZATION_BY_ID or GET_ALL_INTERLOCK_ORGANIZATION)");
	}
	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userId){
	var rdo = interlockLib.insertInterlockOrganization(reqBody, userId);		    	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId){
	var rdo = interlockLib.updateInterlockOrganization(reqBody, userId);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userId){
	var rdo = interlockLib.deleteInterlockOrganization(reqBody, userId);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

processRequest();