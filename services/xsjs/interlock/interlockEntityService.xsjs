/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var interlockEntityLib = mapper.getInterlockEntity();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();

/** *************************************** */

var getInterlockEntityById = "GET_INTERLOCK_ENTITY_BY_ID";
var getAllInterlockEntity = "GET_ALL_INTERLOCK_ENTITY";

function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userId){
	var rdo = {};
	
	if(parameters.length > 0){
		if(!parameters[0].value){
			throw ErrorLib.getErrors().BadRequest("","interlockEntityService/handleGet","invalid parameter value. Can not be null or empty");
		}
		
		switch(parameters[0].name){
			case getInterlockEntityById:
				rdo = interlockEntityLib.getInterlockEntityById(parameters[0].value, userId);
				break;
			case getAllInterlockEntity:
				rdo = interlockEntityLib.getAllInterlockEntity();
				break;
			default:
				throw ErrorLib.getErrors().BadRequest("","interlockEntityService/handleGet","invalid parameter name (can be: GET_INTERLOCK_ENTITY_BY_ID or GET_ALL_INTERLOCK_ENTITY)");
				break;
		}
	}else{
		throw ErrorLib.getErrors().BadRequest("","interlockEntityService/handleGet","The parameter could not be found (can be: GET_INTERLOCK_ENTITY_BY_ID or GET_ALL_INTERLOCK_ENTITY)");
	}
	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userId){
	var rdo = interlockEntityLib.insertInterlockEntity(reqBody, userId);		    	
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userId){
	var rdo = interlockEntityLib.updateInterlockEntity(reqBody, userId);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userId){
	var rdo = interlockEntityLib.deleteInterlockEntity(reqBody, userId);
	httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

processRequest();