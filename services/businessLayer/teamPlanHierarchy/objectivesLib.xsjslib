$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataObjective = mapper.getDataObjectives();
/** ***********END INCLUDE LIBRARIES*************** */

function getAllObjectives() {
	return dataObjective.getAllObjectives();
}

function getObjectiveById(objectiveId){
	return dataObjective.getObjectiveById(objectiveId);
}

function updateObjective(objectiveData, userId){
	return dataObjective.updateObjective(objectiveData.in_objective_id, objectiveData.in_name, userId);
}

function deleteObjective(objectiveId, userId){
	return dataObjective.deleteObjective(objectiveId, userId);
}

function insertObjective(objectiveData, userId) {
	return dataObjective.insertObjective(objectiveData.in_name, userId);
}


