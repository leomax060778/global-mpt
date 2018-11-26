/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

var GET_ALL_PLANNING_PURPOSE_OPTION = "GET_ALL_PLANNING_PURPOSE_OPTION";
var GET_PLANNING_PURPOSE_RELATIONSHIP = "GET_PLANNING_PURPOSE_RELATIONSHIP";
var GET_PLANNING_PURPOSE_OPTION_BY_PLANNING_PURPOSE = "GET_PLANNING_PURPOSE_OPTION_BY_PLANNING_PURPOSE";
var INS_PLANNING_PURPOSE_OPTION = "INS_PLANNING_PURPOSE_OPTION";
var UPD_PLANNING_PURPOSE_OPTION = "UPD_PLANNING_PURPOSE_OPTION";
var UPD_PLANNING_PURPOSE_OPTION_RELATIONSHIP = "UPD_PLANNING_PURPOSE_OPTION_RELATIONSHIP";
var DEL_PLANNING_PURPOSE_OPTION = "DEL_PLANNING_PURPOSE_OPTION";
var DEL_PLANNING_PURPOSE_OPTION_RELATIONSHIP = "DEL_PLANNING_PURPOSE_OPTION_RELATIONSHIP";

/****** GET ******/

function getAllPlanningPurposeOption(){
	var result = db.executeProcedureManual(GET_ALL_PLANNING_PURPOSE_OPTION, {});
	
	return db.extractArray(result.out_result);
}

function getPlanningPurposeRelationship(planningPurposeId){
	var result = db.executeProcedureManual(GET_PLANNING_PURPOSE_RELATIONSHIP, {in_planning_purpose_id: planningPurposeId});
	return db.extractArray(result.out_result);
}

function getPlanningPurposeOptionByPlanningPurpose(reqBody){
	var result = db.executeProcedureManual(GET_PLANNING_PURPOSE_OPTION_BY_PLANNING_PURPOSE, {in_planning_purpose_id: reqBody.PLANNING_PURPOSE_ID});

	return db.extractArray(result.out_result);
}

/****** INSERT ******/

function insertPlanningPurposeOption(reqBody, userId){
	var params = {};
	params.in_name = reqBody.PLANNING_PURPOSE_OPTION_NAME;
	params.in_created_user_id = userId;

	return  db.executeScalar(INS_PLANNING_PURPOSE_OPTION, params, 'out_result');
}

/****** UPDATE ******/

function updatePlanningPurposeOption(reqBody, userId){
	var params = {};
    params.in_planning_purpose_option_id = reqBody.PLANNING_PURPOSE_OPTION_ID;
    params.in_name = reqBody.PLANNING_PURPOSE_OPTION_NAME;
	params.in_modified_user_id = userId;

	return  db.executeScalar(UPD_PLANNING_PURPOSE_OPTION, params, 'out_result');
}

function updateRelationship(data){
    return  db.executeScalar(UPD_PLANNING_PURPOSE_OPTION_RELATIONSHIP, data, 'out_result');
}

/****** DELETE ******/

function deletePlanningPurposeOption(planningPurposeOptionId, userId){
	var params = {};
    params.in_planning_purpose_option_id = planningPurposeOptionId;
	params.in_modified_user_id = userId;

	return  db.executeScalar(DEL_PLANNING_PURPOSE_OPTION, params, 'out_result');
}

function deleteRelationship(data){
	return  db.executeScalar(DEL_PLANNING_PURPOSE_OPTION_RELATIONSHIP, data, 'out_result');
}