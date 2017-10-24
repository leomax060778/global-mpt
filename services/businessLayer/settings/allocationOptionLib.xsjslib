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


function deleteAllocationOption(optionId, userId){
	return dbOption.deleteAllocationOption(optionId, userId);
}

function updateAllocationOption(reqbody, userId) {
	return dbOption.updateAllocationOption(reqbody.ALLOCATION_OPTION_ID,reqbody.IN_NAME,reqbody.CRM_KEY, userId);
}

function insertAllocationOption(reqBody, userId) {

	var objOption = dbOption.getAllocationOptionByName(reqBody.IN_NAME);
	if(objOption)
		throw ErrorLib.getErrors().CustomError("","AllocationOptionService", "Cannot create the option beacause exists another with same name");

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
		if(dbOption.getAllocationOptionByName(option.in_name)){
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
		var ao = dbOption.getAllocationOptionByName(allocationOption.in_name);

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