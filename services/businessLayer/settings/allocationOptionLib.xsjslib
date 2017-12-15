/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbOption = mapper.getDataOption();
var dbCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
/*************************************************/
var map = {
	ALLOCATION_CATEGORY_ID: 'CATEGORY_ID',
	ALLOCATION_OPTION_ID: 'OPTION_ID'
};

var levelMap = {
		HL1: "Level 1",
		HL2: "Level 2",
		HL3: "Level 3",
		HL4: "Level 4",
		HL5: "Level 5",
		HL6: "Level 6"
}

function allocationOptionRelations(optionId){
	return dbOption.getAllocationOptionRelationsByOptionId(optionId);
}

function deleteAllocationOption(optionId, userId){
	var optionRelations = allocationOptionRelations(optionId);
	
	if(optionRelations.length){
		//Error message constructor
		var currentRelationsError = "The Option could not be deleted because is currently assigned to: \n";
		optionRelations.forEach(function(relation){
			currentRelationsError += levelMap[relation.HIERARCHY_LEVEL] + ": "+relation.CATEGORY_NAME+"\n";
		});
		currentRelationsError += "Remove the option from all categories before delete it."
		//--
		throw ErrorLib.getErrors().CustomError("", "allocationCategoryOptionLevelService/handleDelete/deleteAllocationOption", currentRelationsError);
	}
	return dbOption.deleteAllocationOption(optionId, userId);
}

function updateAllocationOption(reqbody, userId) {
    var objOption = dbOption.getAllocationOptionByNameAndCrmKey(reqbody.IN_NAME, reqbody.CRM_KEY);
    if(objOption && reqbody.ALLOCATION_OPTION_ID !== objOption.ALLOCATION_OPTION_ID)
        throw ErrorLib.getErrors().CustomError("","", "Cannot update the option beacause exists another with same name and crm key.");

	return dbOption.updateAllocationOption(reqbody.ALLOCATION_OPTION_ID,reqbody.IN_NAME,reqbody.CRM_KEY, userId);
}

function insertAllocationOption(reqBody, userId) {

    var objOption = dbOption.getAllocationOptionByNameAndCrmKey(reqBody.IN_NAME, reqBody.CRM_KEY);
	if(objOption)
		throw ErrorLib.getErrors().CustomError("","", "Cannot create the option beacause exists another with same name and crm key.");

	return dbOption.insertAllocationOption(reqBody.IN_NAME,reqBody.CRM_KEY, userId);
}

function insertAllocationOptionForUpload(name, crm_key, userId){
	return insertAllocationOption({IN_NAME: name, CRM_KEY: crm_key}, userId);
}

function getAllocationOption(){
	return dbOption.getAllocationOption();
}

function getAllocationOptionById(optionId){
	return dbOption.getAllocationOptionById(optionId);
}

function getOptionInUseByOptionId(categoryId){
	return dbOption.getOptionInUseByOptionId(categoryId);
}

function getAllocationCategoryByCategoryIdLevelId(categoryId, levelId){
	return dbCategoryOptionLevel.getAllocationCategoryByCategoryIdLevelId(categoryId, levelId);
}

function getAvailableOptionByCategoryIdByLevelId(categoryId, levelId){
	if(!categoryId || !levelId)
		throw ErrorLib.getErrors().CustomError("",
				"allocationOptionService/handleget/getAvailableOptionByCategoryIdByLevelId",
				"Either Category or Level wasn´t found.");
	
	return dbOption.getAvailableOptionByCategoryIdByLevelId(categoryId, levelId);
}

function getAssignedOptionByCategoryIdByLevelId(categoryId, levelId, fromTph){
	if(!categoryId || !levelId)
		throw ErrorLib.getErrors().CustomError("",
				"allocationOptionService/handleget/getAssignedOptionByCategoryIdByLevelId",
				"Either Category or Level wasn´t found.");
	
	if(fromTph)
		return uiToServerParser(dbOption.getAssignedOptionByCategoryIdByLevelId(categoryId, levelId));

	return dbOption.getAssignedOptionByCategoryIdByLevelId(categoryId, levelId);
}

function uiToServerParser(object) {
	var data = JSON.stringify(object, function (key, value) {
		if (Array.isArray(value)) {
			return value;
		} else if (value && typeof value === 'object') {
			var replacement = {};
			Object.keys(value).forEach(function (k) {
				replacement[map[k] || k] = value[k];
			});
			return replacement;
		}
		return value;
	});

	data = JSON.parse(data);

	return data;
}

function checkAllocationOption(data){
	var allocationOptionList = data.check;
	var allocationOptionToUpdate = 0;
	var allocationOptionToInsert = 0;
	allocationOptionList.forEach(function(option){
		if(dbOption.getAllocationOptionByNameAndCrmKey(option.in_name, option.in_crm_key)){
			allocationOptionToUpdate++;
		} else {
			allocationOptionToInsert++;
		}
	});

	return {allocationCategoryToCreate: allocationOptionToInsert, allocationOptionToUpdate: allocationOptionToUpdate};
}

function uploadAllocationOption(data, userId) {
	var allocationOptionList = data.batch;
	var allocationOptionUpdated = 0;
	var allocationOptionCreated = 0;
	var optionId;
	allocationOptionList.forEach(function(allocationOption){
		var ao = dbOption.getAllocationOptionByNameAndCrmKey(allocationOption.in_name, allocationOption.in_crm_key);

		if(!ao || !ao.ALLOCATION_OPTION_ID){
			optionId = insertAllocationOptionForUpload(allocationOption.in_name, allocationOption.in_crm_key, userId);
			allocationOptionCreated++;
		} else {
			dbOption.updateAllocationOption(ao.ALLOCATION_OPTION_ID, allocationOption.in_name ,allocationOption.in_crm_key, userId);
			allocationOptionUpdated++;
		}
	});
	return {allocationOptionCreated: allocationOptionCreated, allocationOptionUpdated: allocationOptionUpdated};
}