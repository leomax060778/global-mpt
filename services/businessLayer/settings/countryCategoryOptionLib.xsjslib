/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dbOption = mapper.getDataCountryCategoryOption();
// var dbCategoryOptionLevel = mapper.getDataCountryCategoryOptionLevel();
/*************************************************/
/*var map = {
	COUNTRY_CATEGORY_ID: 'CATEGORY_ID',
	COUNTRY_CATEGORY_OPTION_ID: 'OPTION_ID'
};*/

var levelMap = {
		HL1: "Level 1",
		HL2: "Level 2",
		HL3: "Level 3",
		HL4: "Level 4",
		HL5: "Level 5",
		HL6: "Level 6"
};

function countryCategoryOptionRelations(optionId){
	return dbOption.getCountryCategoryOptionRelationsByOptionId(optionId);
}

function deleteCountryCategoryOption(data, userId){
	if(!data.ALLOCATION_COUNTRY_CATEGORY_OPTION_IDS){
        data.ALLOCATION_COUNTRY_CATEGORY_OPTION_IDS = [data.ALLOCATION_COUNTRY_CATEGORY_OPTION_ID];
	}

    data.ALLOCATION_COUNTRY_CATEGORY_OPTION_IDS.forEach(function (optionId) {
        var optionRelations = countryCategoryOptionRelations(optionId);
        if(optionRelations.length){
            //Error message constructor
            var currentRelationsError = "The Option could not be deleted because is currently assigned to: \n";
            optionRelations.forEach(function(relation){
                currentRelationsError += relation.CRM_ID + ': ' + levelMap[relation.HIERARCHY_LEVEL] + "\n";//": "+relation.CATEGORY_NAME+"\n";
            });
            currentRelationsError += "Remove the option from all categories before delete it.";
            //--
            throw ErrorLib.getErrors().CustomError("", "countryCategoryOptionLevelService/handleDelete/deleteCountryCategoryOption", currentRelationsError);
        }
        dbOption.deleteCountryCategoryOption(optionId, userId);
	});

    return true;
}

function updateCountryCategoryOption(reqbody, userId) {
    var crmKey = reqbody.CRM_KEY ? reqbody.CRM_KEY.trim() : '';
    var objOption = dbOption.getCountryCategoryOptionByNameAndCrmKey(reqbody.IN_NAME, crmKey, reqbody.ALLOCATION_COUNTRY_CATEGORY_OPTION_ID);
    if(objOption && reqbody.ALLOCATION_COUNTRY_CATEGORY_OPTION_ID !== objOption.ALLOCATION_COUNTRY_CATEGORY_OPTION_ID)
        throw ErrorLib.getErrors().CustomError("","", "Cannot update the option beacause exists another with same name and crm key.");

	return dbOption.updateCountryCategoryOption(reqbody.ALLOCATION_COUNTRY_CATEGORY_OPTION_ID,reqbody.IN_NAME,crmKey, userId);
}

function insertCountryCategoryOption(reqBody, userId) {
	var crmKey = reqBody.CRM_KEY ? reqBody.CRM_KEY.trim() : '';
    var objOption = dbOption.getCountryCategoryOptionByNameAndCrmKey(reqBody.IN_NAME, crmKey);
	if(objOption) {
        throw ErrorLib.getErrors().CustomError("", "", "Cannot create the option because exists another with same name or crm key.");
    }

	return dbOption.insertCountryCategoryOption(reqBody.IN_NAME,crmKey, userId);
}

function insertCountryCategoryOptionForUpload(name, crm_key, userId){
	return insertCountryCategoryOption({IN_NAME: name, CRM_KEY: crm_key}, userId);
}

function getCountryCategoryOption(){
	return dbOption.getCountryCategoryOption();
}

/*function getCountryCategoryOptionById(optionId){
	return dbOption.getCountryCategoryOptionById(optionId);
}*/

/*function getOptionInUseByOptionId(categoryId){
	return dbOption.getOptionInUseByOptionId(categoryId);
}*/

function getCountryCategoryCategoryByCategoryIdLevelId(categoryId, hl2Id, levelId){
	// return dbCategoryOptionLevel.getCountryCategoryCategoryByCategoryIdLevelId(categoryId, hl2Id, levelId);
}

function getAvailableOptionByCategoryIdByLevelId(categoryId, hl2Id, levelId){
	if(!categoryId || !levelId)
		throw ErrorLib.getErrors().CustomError("",
				"countryCategoryOptionService/handleget/getAvailableOptionByCategoryIdByLevelId",
				"Either Category or Level wasn´t found.");
	
	return dbOption.getAvailableOptionByCategoryIdByLevelId(categoryId, hl2Id, levelId);
}

function getAssignedOptionByCategoryIdByLevelId(categoryId, hl2Id, levelId){
	if(!categoryId || !levelId)
		throw ErrorLib.getErrors().CustomError("",
				"countryCategoryOptionService/handleget/getAssignedOptionByCategoryIdByLevelId",
				"Either Category or Level wasn´t found.");
	
	return dbOption.getAssignedOptionByCategoryIdByLevelId(categoryId, hl2Id, levelId);
}

/*function uiToServerParser(object) {
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
}*/

function checkCountryCategoryOption(data){
	var countryCategoryOptionList = data.check;
	var countryCategoryOptionToUpdate = 0;
	var countryCategoryOptionToInsert = 0;
	countryCategoryOptionList.forEach(function(option){
        var crmKey = option.in_crm_key ? option.in_crm_key.trim() : '';
		if(dbOption.getCountryCategoryOptionByNameAndCrmKey(option.in_name, crmKey)){
			countryCategoryOptionToUpdate++;
		} else {
			countryCategoryOptionToInsert++;
		}
	});

	return {countryCategoryToCreate: countryCategoryOptionToInsert, countryCategoryOptionToUpdate: countryCategoryOptionToUpdate};
}

function uploadCountryCategoryOption(data, userId) {
	var countryCategoryOptionList = data.batch;
	var countryCategoryOptionUpdated = 0;
	var countryCategoryOptionCreated = 0;
	var optionId;
	countryCategoryOptionList.forEach(function(countryCategoryOption){
        var crmKey = countryCategoryOption.in_crm_key ? countryCategoryOption.in_crm_key.trim() : '';
		var ao = dbOption.getCountryCategoryOptionByNameAndCrmKey(countryCategoryOption.in_name, crmKey);

		if(!ao || !ao.ALLOCATION_COUNTRY_CATEGORY_OPTION_ID){
			optionId = insertCountryCategoryOptionForUpload(countryCategoryOption.in_name, crmKey, userId);
			countryCategoryOptionCreated++;
		} else {
			//find another record with the same name or key and different id
            var objOptionAux = dbOption.getCountryCategoryOptionByNameAndCrmKey(countryCategoryOption.in_name, crmKey, ao.ALLOCATION_COUNTRY_CATEGORY_OPTION_ID);
            if(objOptionAux) {
                throw ErrorLib.getErrors().CustomError("", "", "Cannot update the option because exists another with same name or crm key.");
            }
			dbOption.updateCountryCategoryOption(ao.ALLOCATION_COUNTRY_CATEGORY_OPTION_ID, countryCategoryOption.in_name ,crmKey, userId);
			countryCategoryOptionUpdated++;
		}
	});
	return {countryCategoryOptionCreated: countryCategoryOptionCreated, countryCategoryOptionUpdated: countryCategoryOptionUpdated};
}