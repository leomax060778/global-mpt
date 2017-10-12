$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_OBJECTIVES = "GET_ALL_OBJECTIVES";

var INS_OBJECTIVE = "INS_OBJECTIVE";
var UPD_OBJECTIVE = "UPD_OBJECTIVE";
var GET_OBJECTIVE_BY_ID = "GET_OBJECTIVE_BY_ID";
var DEL_OBJECTIVE = "DEL_OBJECTIVE";
var GET_OBJECTIVE_BY_NAME = "GET_OBJECTIVE_BY_NAME";
var GET_OBJECTIVE_BY_CRM_KEY = "GET_OBJECTIVE_BY_CRM_KEY";
var GET_COUNT_OBJECTIVES_IN_USE_BY_ID = "GET_COUNT_OBJECTIVES_IN_USE_BY_ID";
var GET_ANSWER_FOR_ALL_OBJECTIVES = "GET_ANSWER_FOR_ALL_OBJECTIVES";


function getAllObjectives(){
	var parameters = {};	
	var list = db.executeProcedureManual(GET_ALL_OBJECTIVES, parameters);
	return db.extractArray(list.out_result);
}

function getAnswerForAllObjectives(){
	var parameters = {};
	var list = db.executeProcedureManual(GET_ANSWER_FOR_ALL_OBJECTIVES, parameters);
	return db.extractArray(list.out_result);
}

function getObjectiveById(objectiveId){
	var parameters = {'IN_OBJECTIVE_ID': objectiveId};
	var list = db.executeProcedureManual(GET_OBJECTIVE_BY_ID, parameters);
	var result = db.extractArray(list.out_result);
	if(result.length)
		return result[0];
	return {};
}

function updateObjective(objectiveId, name, crmKey, userId){
	var parameters = {};
	parameters.IN_OBJECTIVE_ID = objectiveId;
	parameters.IN_NAME = name;
    parameters.IN_CRM_KEY = crmKey;
	parameters.IN_MODIFIED_USER_ID = userId;
	return db.executeScalarManual(UPD_OBJECTIVE, parameters, "out_result");
}

function deleteObjective(objectiveId, userId){
	var parameters = {};
	parameters.IN_OBJECTIVE_ID = objectiveId;
	parameters.IN_MODIFIED_USER_ID = userId;
	return db.executeScalarManual(DEL_OBJECTIVE, parameters, "out_result");
}

function insertObjective(name, crmKey, userId){
	var parameters = {};
	parameters.IN_NAME = name;
	parameters.IN_CRM_KEY = crmKey;
	parameters.IN_CREATED_USER_ID = userId;
	return db.executeScalarManual(INS_OBJECTIVE, parameters, "out_result");
}

function getObjectiveByName(name){
	var parameters = {'IN_NAME': name};
	var list = db.executeProcedureManual(GET_OBJECTIVE_BY_NAME, parameters);
	var result = db.extractArray(list.out_result);
	if(result.length)
		return result[0];
	return null;
}

function getObjectiveByCrmKey(crmKey){
    var parameters = {'IN_CRM_KEY': crmKey};
    var list = db.executeProcedureManual(GET_OBJECTIVE_BY_CRM_KEY, parameters);
    var result = db.extractArray(list.out_result);
    if(result.length)
        return result[0];
    return null;
}

function checkInUseObjectiveById(objectiveId){
	var parameters = {'in_objecive_id': objectiveId};
	return db.executeScalarManual(GET_COUNT_OBJECTIVES_IN_USE_BY_ID, parameters, "out_result");
}