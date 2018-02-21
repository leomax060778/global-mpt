/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataSearch = mapper.getDataSearch();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
/*************************************************/

var PARAMETERS_NOT_FOUND = "The parameters can not be found.";
var HL_NOT_FOUND = "The current level can not be found";
var BUDGET_YEAR_ID_NOT_FOUND = "The Budget Year can not be found";

var HL_STATUS = {
	L4:  {
		IN_PROGRESS: 1,
		CREATE_IN_CRM: 2,
		IN_CRM: 3,
		UPDATE_IN_CRM: 4,
		EXCEED_BUDGET: 5,
		COMPLETE: 6,
		VALID_FOR_CRM: 7,
		DELETION_REQUEST: 9,
		DELETED_IN_CRM: 10
	},
	L5:{
		IN_PROGRESS: 1,
		CREATE_IN_CRM: 2,
		IN_CRM: 3,
		UPDATE_IN_CRM: 4,
		EXCEED_BUDGET: 5,
		COMPLETE: 6,
		VALID_FOR_CRM: 7,
		IN_CRM_NEED_NEW_BUDGET_APPROVAL: 8,
		DELETION_REQUEST: 9,
		DELETED_IN_CRM: 10
	},
	L6: {
		IN_PROGRESS: 1,
		CREATE_IN_CRM: 2,
		IN_CRM: 3,
		UPDATE_IN_CRM: 4,
		EXCEED_BUDGET: 5,
		COMPLETE: 6,
		VALID_FOR_CRM: 7,
		IN_CRM_NEED_NEW_BUDGET_APPROVAL: 8,
		DELETION_REQUEST: 9,
		DELETED_IN_CRM: 10
	}

};

function parseParameters(params){
	var result = {};
	
	Object.keys(params).forEach(function(position){
		result[params[position].name] = params[position].value;
	});
	
	return result;
}

function validateParams(params){	
	//Check for the required parameters
	if(!params.HL){
		throw ErrorLib.getErrors().BadRequest("Parameter HL not found", "", HL_NOT_FOUND);
	}
	
	if(!params.BUDGET_YEAR_ID){
		throw ErrorLib.getErrors().BadRequest("Parameter BUDGET_YEAR_ID not found", "", BUDGET_YEAR_ID_NOT_FOUND);
	}
	
	//If optional params not exist, set the default values
	if(!params.LIMIT){
		params.LIMIT = 15;
	}
	
	if(!params.OFFSET){
		params.OFFSET = 0;
	}
	
	if(!params.REGION_ID){
		params.REGION_ID = 0;
	}
	
	if(!params.SUBREGION_ID){
		params.SUBREGION_ID = 0;
	}
	
}

function getHLBySearch(params, userSessionID){
	var localParams = {};

	//Ask for the parameters
	if(params && params.length){
		localParams = parseParameters(params);
	}else{
		throw ErrorLib.getErrors().BadRequest("Parameters not found", "", PARAMETERS_NOT_FOUND);
	}

	//Required Parameters validation
	validateParams(localParams);
	
	//Obtain information
	var searchResult = dataSearch.getHLBySearch(localParams);

	//Enable or Disable edition based on the Status
	if(HL_STATUS[localParams.HL]){
		searchResult = JSON.parse(JSON.stringify(searchResult));
		var isSuperAdmin = util.isSuperAdmin(userSessionID) ? 1 : 0;
		searchResult.result.forEach(function (elem) {
			elem.ENABLE_EDIT = util.getEnableEdit(elem.STATUS_ID, HL_STATUS[localParams.HL], userSessionID, isSuperAdmin);
		});
	}

	return searchResult;
}