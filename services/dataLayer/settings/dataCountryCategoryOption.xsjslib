/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

var INS_COUNTRY_CATEGORY_OPTION = "INS_COUNTRY_CATEGORY_OPTION";
var GET_COUNTRY_CATEGORY_OPTION = "GET_COUNTRY_CATEGORY_OPTION";
// var GET_COUNTRY_CATEGORY_OPTION_BY_ID = "GET_COUNTRY_CATEGORY_OPTION_BY_ID";
// var GET_COUNTRY_CATEGORY_OPTION_BY_NAME = "GET_COUNTRY_CATEGORY_OPTION_BY_NAME";
var GET_COUNTRY_CATEGORY_OPTION_BY_NAME_AND_CRM_KEY =  "GET_COUNTRY_CATEGORY_OPTION_BY_NAME_AND_CRM_KEY";
// var GET_COUNTRY_CATEGORY_OPTION_IN_USE_BY_OPTION_ID = "GET_COUNTRY_CATEGORY_OPTION_IN_USE_BY_OPTION_ID";
// var GET_COUNTRY_CATEGORY_OPTION_COUNT_BY_CATEGORY_ID_HL_ID = "GET_COUNTRY_CATEGORY_OPTION_COUNT_BY_CATEGORY_ID_HL_ID";
var UPD_COUNTRY_CATEGORY_OPTION = "UPD_COUNTRY_CATEGORY_OPTION";
var DEL_COUNTRY_CATEGORY_OPTION = "DEL_COUNTRY_CATEGORY_OPTION";
var GET_AVAILABLE_COUNTRY_CATEGORY_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID = "GET_AVAILABLE_COUNTRY_CATEGORY_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID";
var GET_ASSIGNED_COUNTRY_CATEGORY_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID = "GET_ASSIGNED_COUNTRY_CATEGORY_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID";
// var GET_COUNTRY_CATEGORY_OPTION_BY_LEVEL_BY_CATEGORY = "GET_COUNTRY_CATEGORY_OPTION_BY_LEVEL_BY_CATEGORY";
var GET_COUNTRY_CATEGORY_OPTION_RELATIONS_BY_OPTION_ID = "GET_COUNTRY_CATEGORY_OPTION_RELATIONS_BY_OPTION_ID";
/******************************************************/

var hierarchyLevel = {
	"hl3": 4,
	"hl4": 1,
	"hl5": 2,
	"hl6": 3
};

/*
TODO: Review this for upload process
function getOptionByLevelByCategory(level, categoryId){
	var rdo = db.executeProcedure(GET_COUNTRY_CATEGORY_OPTION_BY_LEVEL_BY_CATEGORY,
		{'in_allocation_category_id':categoryId, 'in_hierarchy_level_id':level});

	return db.extractArray(rdo.out_result);

}
*/

/*********************************************************************************************************/
function insertCountryCategoryOption(name,crmKey, userId) {
	var params = {
		'in_name': name,
		'in_crm_key':crmKey,
		'in_user_id': userId
	};
	return db.executeScalarManual(INS_COUNTRY_CATEGORY_OPTION, params, 'out_option_id');
}

function getCountryCategoryOption(){
	var result = db.executeProcedureManual(GET_COUNTRY_CATEGORY_OPTION, {});
	return db.extractArray(result.out_result);
}

/*function getAllocationOptionById(optionId){
	var params = {
		'in_option_id' : optionId
	};
	var result = db.executeProcedureManual(GET_COUNTRY_CATEGORY_OPTION_BY_ID, params);
	var list = db.extractArray(result.out_result);
	if(list.length){
		return list[0];
	} else {
		return {};
	}
}*/

/*function getAllocationOptionByName(name){
	var params = {
		'in_name' : name
	};
	var result = db.executeProcedureManual(GET_COUNTRY_CATEGORY_OPTION_BY_NAME, params);
	return db.extractArray(result.out_result)[0];
}*/

function getCountryCategoryOptionByNameAndCrmKey(name, crm_key, allocation_country_category_option_id){
    var params = {
        'in_name' : name,
		'in_crm_key': crm_key
		, 'in_allocation_country_category_option_id': allocation_country_category_option_id ? allocation_country_category_option_id : 0
    };
    var result = db.executeProcedureManual(GET_COUNTRY_CATEGORY_OPTION_BY_NAME_AND_CRM_KEY, params);
    return db.extractArray(result.out_result)[0];
}

/*function getOptionInUseByOptionId(categoryId){
	var params = {
		'in_option_id': categoryId
	};
	var result = db.executeProcedureManual(GET_COUNTRY_CATEGORY_OPTION_IN_USE_BY_OPTION_ID, params);
	return db.extractArray(result.out_result);
}*/

function getAvailableOptionByCategoryIdByLevelId(categoryId, hl2Id, levelId){
	var params = {
		'in_category_id': categoryId,
		'in_level_id': levelId,
		'in_hl2_id': hl2Id
	};
	var result = db.executeProcedureManual(GET_AVAILABLE_COUNTRY_CATEGORY_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID, params);
	return db.extractArray(result.out_result);
}

function getAssignedOptionByCategoryIdByLevelId(categoryId, hl2Id, levelId){
	var params = {
		'in_category_id': categoryId,
		'in_level_id': levelId,
        'in_hl2_id': hl2Id
	};
	var result = db.executeProcedureManual(GET_ASSIGNED_COUNTRY_CATEGORY_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID, params);
	return db.extractArray(result.out_result);
}

/*function getAllocationOptionCountByCategoryIdLevelId(categoryId, level){
	if(categoryId && level){
		var params = {
			'in_hl_id':hierarchyLevel[level],
			'in_category_id': categoryId
		};
		return db.executeScalarManual(GET_COUNTRY_CATEGORY_OPTION_COUNT_BY_CATEGORY_ID_HL_ID, params, "out_result");
	}
	return null;
}*/

function getCountryCategoryOptionRelationsByOptionId(optionId){
	var params = {};
	params.in_option_id = optionId;

	var result = db.executeProcedureManual(GET_COUNTRY_CATEGORY_OPTION_RELATIONS_BY_OPTION_ID, params, "out_result");
	return db.extractArray(result.out_result);
}

function updateCountryCategoryOption(optionId,name,crm_key, userId) {
	var params = {
		'in_option_id': optionId,
		'in_name': name,
		'in_crm_key': crm_key,
		'in_user_id': userId
	};

	return db.executeScalarManual(UPD_COUNTRY_CATEGORY_OPTION, params, 'out_result');
}

function deleteCountryCategoryOption(optionId, userId){
	var params = {
		'in_option_id' : optionId,
		'in_user_id': userId
	};
	return db.executeScalarManual(DEL_COUNTRY_CATEGORY_OPTION,params,'out_result');
}