/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

var GET_ALL_PLANNING_PURPOSE = "GET_ALL_PLANNING_PURPOSE";
var GET_ALL_PLANNING_PURPOSE_RELATION = "GET_ALL_PLANNING_PURPOSE_RELATION";
var GET_PLANNING_PURPOSE_RELATED_DATA = "GET_PLANNING_PURPOSE_RELATED_DATA";
var GET_PLANNING_PURPOSE_ID_BY_HL4_ID = "GET_PLANNING_PURPOSE_ID_BY_HL4_ID";
var GET_PLANNING_PURPOSE_ID_BY_HL5_ID = "GET_PLANNING_PURPOSE_ID_BY_HL5_ID";
var INS_PLANNING_PURPOSE = "INS_PLANNING_PURPOSE";
var UPD_PLANNING_PURPOSE = "UPD_PLANNING_PURPOSE";
var DEL_PLANNING_PURPOSE = "DEL_PLANNING_PURPOSE";

/****** GET ******/

function getAllPlanningPurpose(){
	var result = db.executeProcedureManual(GET_ALL_PLANNING_PURPOSE, {});
	
	return db.extractArray(result.out_result);
}

function getPlanningPurposeRelatedData(relatedData){
	var params = {};
	params.in_related_data = relatedData;

	var result = db.executeProcedureManual(GET_PLANNING_PURPOSE_RELATED_DATA, params);

	return db.extractArray(result.out_result);
}

function getAllPlanningPurposeRelation(userId){
	var result = db.executeProcedureManual(GET_ALL_PLANNING_PURPOSE_RELATION, {});

	return db.extractArray(result.out_result);
}

function getPlanningPurposeIdByHl4Id(hl4Id, userId){
	var params = {};
	params.in_hl4_id = hl4Id;
	
	var result = db.executeProcedureManual(GET_PLANNING_PURPOSE_ID_BY_HL4_ID, params);
	var list = db.extractArray(result.out_result);
	
	return list.length? list[0] : {};	
}

function getPlanningPurposeIdByHl5Id(hlId, isLegacy, userId){
	var params = {};
	params.in_hl_id = hlId;
	params.in_is_legacy = isLegacy;

	var result = db.executeProcedureManual(GET_PLANNING_PURPOSE_ID_BY_HL5_ID, params);
	var list = db.extractArray(result.out_result);

	return list.length? list[0] : {};
}

/****** INSERT ******/

function insertPlanningPurpose(reqBody, userId){
	var params = {};
	params.in_name = reqBody.NAME;
	params.in_team_type_id = reqBody.TEAM_TYPE_ID;
	params.in_created_user_id = userId;

	return  db.executeScalar(INS_PLANNING_PURPOSE, params, 'out_result');
}

/****** UPDATE ******/

function updatePlanningPurpose(reqBody, userId){
	var params = {};
	params.in_planning_purpose_id = reqBody.PLANNING_PURPOSE_ID;
	params.in_name = reqBody.NAME;
	params.in_team_type_id = reqBody.TEAM_TYPE_ID;
	params.in_modified_user_id = userId;

	return  db.executeScalar(UPD_PLANNING_PURPOSE, params, 'out_result');
}

/****** DELETE ******/

function deletePlanningPurpose(planningPurposeId, userId){
	var params = {};
	params.in_planning_purpose_id = planningPurposeId;
	params.in_modified_user_id = userId;

	return  db.executeScalar(DEL_PLANNING_PURPOSE, params, 'out_result');
}
