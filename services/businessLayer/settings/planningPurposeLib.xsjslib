$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var util = mapper.getUtil();
var ErrorLib = mapper.getErrors();

var dataPlPurpose = mapper.getDataPlanningPurpose();
/** ***********END INCLUDE LIBRARIES*************** */

var RELATED_DATA_NOT_FOUND = "The related data of the Planning Purpose can not be found.";
var USER_NOT_FOUND = "The User can not be found.";
var HL4_NOT_FOUND = "The Program Campaign can not be found";
var OBJECT_NOT_FOUND = "The object Planning Purpose is not found.";
var PLANNING_NOT_FOUND = "The Planning Purpose is not found.";

/****** GET ******/

function getAllPlanningPurpose(userId){
	return dataPlPurpose.getAllPlanningPurpose();
}

function getPlanningPurposeRelatedData(relatedData, userId){
	if(!relatedData){
		throw ErrorLib.getErrors().BadRequest("The Parameter relatedData is not found", "planningPurposeService/handleGet/getPlanningPurposeRelatedData", RELATED_DATA_NOT_FOUND);
	}

	if(!userId){
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "planningPurposeService/handleGet/getPlanningPurposeRelatedData", USER_NOT_FOUND);
	}

	return dataPlPurpose.getPlanningPurposeRelatedData(relatedData);
}

function getAllPlanningPurposeRelation(userId){
	return dataPlPurpose.getAllPlanningPurposeRelation();
}

function getPlanningPurposeIdByHl4Id(hl4Id, userId){
	if(!hl4Id){
		throw ErrorLib.getErrors().BadRequest("The Parameter hl4Id is not found", "planningPurposeService/handleGet/getPlanningPurposeRelatedData", HL4_NOT_FOUND);
	}
	if(!userId){
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "planningPurposeService/handleGet/getPlanningPurposeRelatedData", USER_NOT_FOUND);
	}

	return dataPlPurpose.getPlanningPurposeIdByHl4Id(hl4Id, userId);
}

/****** INSERT ******/

function insertPlanningPurpose(reqBody, userId){
	validatePlanningPurpose(reqBody, userId, "Insert");

	return dataPlPurpose.insertPlanningPurpose(reqBody, userId);
}

/****** UPDATE ******/

function updatePlanningPurpose(reqBody, userId){
	validatePlanningPurpose(reqBody, userId, "Update");

	return dataPlPurpose.updatePlanningPurpose(reqBody, userId);
}

/****** DELETE ******/

function deletePlanningPurpose(reqBody, userId){
	if(!reqBody.PLANNING_PURPOSE_ID){
		throw ErrorLib.getErrors().BadRequest("The Parameter PLANNING_PURPOSE_ID is not found", "planningPurposeService/handleDelete/deletePlanningPurpose", PLANNING_NOT_FOUND);
	}
	if(!userId){
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "planningPurposeService/handleGet/getPlanningPurposeRelatedData", USER_NOT_FOUND);
	}

	return dataPlPurpose.deletePlanningPurpose(reqBody.PLANNING_PURPOSE_ID, userId);
}

/****** VALIDATIONS ******/

function validatePlanningPurpose(reqBody, userId, action){
	var path;
	var keys;

	if(action == "Insert"){
		path = "planningPurposeService/handlePost/insertPlanningPurpose";

		keys = [
			'NAME',
			'TEAM_TYPE_ID'
		];
	}else{
		path = "planningPurposeService/handlePut/updatePlanningPurpose";

		keys = [
			'PLANNING_PURPOSE_ID',
			'NAME',
			'TEAM_TYPE_ID'
		];
	}

	if (!userId) {
		throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", path, USER_NOT_FOUND);
	}

	if (!reqBody) {
		throw ErrorLib.getErrors().CustomError("The Parameter reqBody is not found", path, OBJECT_NOT_FOUND);
	}

	var isValid = false;
	var errors = {};
	var BreakException = {};

	try {
		keys.forEach(function (key) {
			if (reqBody[key] === null || reqBody[key] === undefined) {
				errors[key] = null;
				throw BreakException;
			} else {
				// validate attribute type
				isValid = validateType(key, reqBody[key]);
				if (!isValid) {
					errors[key] = reqBody[key];
					throw BreakException;
				}
			}
		});
		isValid = true;
	} catch (e) {
		if (e !== BreakException) {
			throw ErrorLib.getErrors().CustomError("", "", e.toString());
		}
		else {
			throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
		}
	}

	return isValid;
}

//Check data types
function validateType(key, value) {
	var valid = true;
	switch (key) {
		case 'TEAM_TYPE_ID':
		case 'PLANNING_PURPOSE_ID':
			valid = !isNaN(value) && value > 0;
			break;
		case 'NAME':
			valid = value.length > 0 && value.length <= 255;
			break;
	}
	return valid;
}