$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataObjective = mapper.getDataObjectives();
var ErrorLib = mapper.getErrors();
var dataCampaignObjective = mapper.getDataCampaignObjective();
/** ***********END INCLUDE LIBRARIES*************** */

var OBJECTIVE_EXISTS = "Already exists an Objective with the name you want to enter.";
var OBJECTIVE_DATA = "No data found.";
var OBJECTIVE_CRM_KEY_EXISTS = "Another Objective has the same CRM key.";
var OBJECTIVE_NAME = "Objective Name is missing.";
var OBJECTIVE_CRM_KEY= "Objective CRM key is missing.";

function getObjectiveAnswerByObjectiveId(objectiveAnswer, objectiveId){
	return objectiveAnswer.OBJECTIVE_ID == objectiveId;
}

function getAllObjectives() {
	var answerObjectives = dataObjective.getAnswerForAllObjectives();
	var objectives =  JSON.parse(JSON.stringify(dataObjective.getAllObjectives()));
	for (var i = 0; i < objectives.length; i++) {
		objectives[i].answers = answerObjectives.filter(function (objectiveAnswer){
			return getObjectiveAnswerByObjectiveId(objectiveAnswer, objectives[i].OBJECTIVE_ID);
		});
	}
	return objectives;
}

function getObjectiveById(objectiveId){
	return dataObjective.getObjectiveById(objectiveId);
}

function checkInUseObjectiveById(objectiveData, userId){
	if (!objectiveData.IN_OBJECTIVE_ID)
		throw ErrorLib.getErrors().CustomError("",
			"objectiveServices/handleDelete/deleteObjective",
			"The OBJECTIVE_ID is not found");

	var countRegisters = dataObjective.checkInUseObjectiveById(objectiveData.IN_OBJECTIVE_ID);
	var retValue = 0;
	if (countRegisters > 0)
		throw ErrorLib.getErrors().ConfirmDelete("",
			"objectiveServices/handleDelete/checkInUseObjectiveById",
			countRegisters);
	else
		retValue = dataObjective.deleteObjective(objectiveData.IN_OBJECTIVE_ID, userId);

	return retValue;
}

function updateObjective(objectiveData, userId){
    validateObjective(objectiveData);
	return dataObjective.updateObjective(objectiveData.IN_OBJECTIVE_ID, objectiveData.IN_NAME, objectiveData.IN_CRM_KEY, userId);
}

function deleteObjective(objectiveData, userId, confirm){
	if (!objectiveData.IN_OBJECTIVE_ID)
		throw ErrorLib.getErrors().CustomError("",
			"objectiveServices/handleDelete/deleteObjective",
			"The OBJECTIVE_ID is not found");

	if(confirm){
		dataCampaignObjective.deleteObjectiveCampaignTypeByObjectiveId(objectiveData.IN_OBJECTIVE_ID);
		return dataObjective.deleteObjective(objectiveData.IN_OBJECTIVE_ID, userId);
	}
	else{
		var countRegisters = dataObjective.checkInUseObjectiveById(objectiveData.IN_OBJECTIVE_ID);
		if (countRegisters)
			throw ErrorLib.getErrors().ConfirmDelete("",
				"objectiveServices/handleDelete/checkInUseObjectiveById",
				countRegisters);
		else{

			dataCampaignObjective.deleteObjectiveCampaignTypeByObjectiveId(objectiveData.IN_OBJECTIVE_ID);
			return dataObjective.deleteObjective(objectiveData.IN_OBJECTIVE_ID, userId);
		}
	}
}

function insertObjective(objectiveData, userId) {
    validateObjective(objectiveData);
	return dataObjective.insertObjective(objectiveData.IN_NAME, objectiveData.IN_CRM_KEY, userId);
}

function validateObjective(data) {
    if(!data)
        throw ErrorLib.getErrors().CustomError("", "objectiveService/handlePost/validateObjective", OBJECTIVE_DATA);

    if(!data.IN_NAME)
        throw ErrorLib.getErrors().CustomError("", "objectiveService/handlePost/validateObjective", OBJECTIVE_NAME);

    if(!data.IN_CRM_KEY)
        throw ErrorLib.getErrors().CustomError("", "objectiveService/handlePost/validateObjective", OBJECTIVE_CRM_KEY);

    var objective = dataObjective.getObjectiveByName(data.IN_NAME);
    if(objective && Number(data.IN_OBJECTIVE_ID) !== Number(objective.OBJECTIVE_ID))
        throw ErrorLib.getErrors().CustomError("", "objectiveService/handlePost/validateObjective", OBJECTIVE_EXISTS);

    objective = dataObjective.getObjectiveByCrmKey(data.IN_CRM_KEY);
    if(objective && Number(data.IN_OBJECTIVE_ID) !== Number(objective.OBJECTIVE_ID))
        throw ErrorLib.getErrors().CustomError("", "objectiveService/handlePost/validateObjective", OBJECTIVE_CRM_KEY_EXISTS);

    return true;
}