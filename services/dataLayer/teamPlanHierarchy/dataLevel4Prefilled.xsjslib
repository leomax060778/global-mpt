$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

var spGetAllHL4Prefilled = 'GET_ALL_HL4_PREFILLED';
var spGetHL4PrefilledById = 'GET_HL4_PREFILLED_BY_ID';

var spInsertHL4Prefilled = 'INS_HL4_PREFILLED';
var spUpdateHL4Prefilled = 'UPD_HL4_PREFILLED';
var spDeleteHL4Prefilled = 'DEL_HL4_PREFILLED';

function getAllHL4Prefilled(){
	var param = {};
	param.out_result = '?';
	var result = db.executeProcedure(spGetAllHL4Prefilled, param);
	return db.extractArray(result.out_result);
}

function getHL4PrefilledById(hl4PrefilledId){
	
	var param = {};
	param.in_hl4_prefilled_id = hl4PrefilledId;
	param.out_result = '?';
	
	var result = db.executeProcedureManual(spGetHL4PrefilledById, param);
	return db.extractArray(result.out_result);
}

function insertHL4Prefilled(objHL4Prefilled, userId){
	var param = {};
	param.in_acronym = objHL4Prefilled.ACRONYM;
	param.in_crm_description = objHL4Prefilled.CRM_DESCRIPTION;
	param.in_details = objHL4Prefilled.DETAILS;
	param.in_business_details = objHL4Prefilled.BUSINESS_DETAILS;
	param.in_created_user_id = userId;
	param.out_result = '?';
	
	return db.executeScalar(spInsertHL4Prefilled, param, 'out_result');
}

function updateHL4Prefilled(objHL4Prefilled, userId){
	var param = {};
	param.in_hl4_prefilled_id = objHL4Prefilled.HL4_PREFILLED_ID;
	param.in_acronym = objHL4Prefilled.ACRONYM;
	param.in_crm_description = objHL4Prefilled.CRM_DESCRIPTION;
	param.in_details = objHL4Prefilled.DETAILS;
	param.in_business_details = objHL4Prefilled.BUSINESS_DETAILS;
	param.in_modified_user_id = userId;
	param.out_result = '?';
	
	return db.executeScalar(spUpdateHL4Prefilled, param, 'out_result');
}

function deleteHL4Prefilled(hl4PrefilledId, userId){
	var param = {};
	param.in_hl4_prefilled_id = hl4PrefilledId;
	param.in_modified_user_id = userId;
	param.out_result = '?';
	
	return db.executeScalar(spDeleteHL4Prefilled, param, 'out_result');
}