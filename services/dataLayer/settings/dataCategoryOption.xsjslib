/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

var INS_ALLOCATION_OPTION = "INS_ALLOCATION_OPTION";
var GET_ALLOCATION_OPTION = "GET_ALLOCATION_OPTION";
var GET_ALLOCATION_OPTION_BY_ID = "GET_ALLOCATION_OPTION_BY_ID";
var GET_ALLOCATION_OPTION_BY_NAME = "GET_ALLOCATION_OPTION_BY_NAME";
var GET_ALLOCATION_OPTION_IN_USE_BY_OPTION_ID = "GET_ALLOCATION_OPTION_IN_USE_BY_OPTION_ID";
var GET_ALLOCATION_OPTION_COUNT_BY_CATEGORY_ID_HL_ID = "GET_ALLOCATION_OPTION_COUNT_BY_CATEGORY_ID_HL_ID";
var UPD_ALLOCATION_OPTION = "UPD_ALLOCATION_OPTION";
var DEL_ALLOCATION_OPTION = "DEL_ALLOCATION_OPTION";
var GET_AVAILABLE_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID = "GET_AVAILABLE_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID";
var GET_ASSIGNED_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID = "GET_ASSIGNED_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID";
var GET_ALLOCATION_OPTION_BY_LEVEL_BY_CATEGORY = "GET_ALLOCATION_OPTION_BY_LEVEL_BY_CATEGORY";
/******************************************************/

var hierarchyLevel = {
	"hl3": 4,
	"hl4": 1,
	"hl5": 2,
	"hl6": 3
};

function getOptionByLevelByCategory(level, categoryId){
	var rdo = db.executeProcedure(GET_ALLOCATION_OPTION_BY_LEVEL_BY_CATEGORY,
		{'in_allocation_category_id':categoryId, 'in_hierarchy_level_id':level});

	return db.extractArray(rdo.out_result);

}

/*********************************************************************************************************/
function insertAllocationOption(name,crmId, userId, autoCommit) {
	var params = {
		'in_name': name,
		'in_crm_id':crmId,
		'in_user_id': userId
	};
	var rdo;
	if (autoCommit) {
		rdo = db.executeScalar(INS_ALLOCATION_OPTION, params, 'out_option_id');
	} else {
		rdo = db.executeScalarManual(INS_ALLOCATION_OPTION, params, 'out_option_id');
	}
	return rdo;
}
function getAllocationOption(){
	var result = db.executeProcedureManual(GET_ALLOCATION_OPTION, {});
	return db.extractArray(result.out_result);
}

function getAllocationOptionById(optionId){
	var params = {
		'in_option_id' : optionId
	};
	var result = db.executeProcedureManual(GET_ALLOCATION_OPTION_BY_ID, params);
	var list = db.extractArray(result.out_result);
	if(list.length){
		return list[0];
	} else {
		return {};
	}
}

function getAllocationOptionByName(name){
	var params = {
		'in_name' : name
	};
	var result = db.executeProcedureManual(GET_ALLOCATION_OPTION_BY_NAME, params);
	return db.extractArray(result.out_result)[0];
}

function getOptionInUseByOptionId(categoryId){
	var params = {
		'in_option_id': categoryId
	};
	var result = db.executeProcedureManual(GET_ALLOCATION_OPTION_IN_USE_BY_OPTION_ID, params);
	return db.extractArray(result.out_result);
}

function getAvailableOptionByCategoryIdByLevelId(categoryId, levelId){
	var params = {
		'in_category_id': categoryId,
		'in_level_id': levelId
	};
	var result = db.executeProcedureManual(GET_AVAILABLE_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID, params);
	return db.extractArray(result.out_result);
}

function getAssignedOptionByCategoryIdByLevelId(categoryId, levelId){
	var params = {
		'in_category_id': categoryId,
		'in_level_id': levelId
	};
	var result = db.executeProcedureManual(GET_ASSIGNED_OPTION_BY_CATEGORY_ID_BY_LEVEL_ID, params);
	return db.extractArray(result.out_result);
}

function getAllocationOptionCountByCategoryIdLevelId(categoryId, level){
	if(categoryId && level){
		var params = {
			'in_hl_id':hierarchyLevel[level],
			'in_category_id': categoryId
		};
		return db.executeScalarManual(GET_ALLOCATION_OPTION_COUNT_BY_CATEGORY_ID_HL_ID, params, "out_result");
	}
	return null;
}

function updateAllocationOption(optionId,name,crm_key, userId, autoCommit) {
	var params = {
		'in_option_id': optionId,
		'in_name': name,
		'in_crm_key': crm_key,
		'in_user_id': userId
	};
	
	var rdo;
	if (autoCommit) {
		rdo = db.executeScalar(UPD_ALLOCATION_OPTION, params, 'out_result');
	} else {
		rdo = db.executeScalarManual(UPD_ALLOCATION_OPTION, params, 'out_result');
	}
	return rdo;
}

function deleteAllocationOption(optionId, userId, autoCommit){
	var params = {
		'in_option_id' : optionId,
		'in_user_id': userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(DEL_ALLOCATION_OPTION,params,'out_result');
	}else{
		rdo = db.executeScalarManual(DEL_ALLOCATION_OPTION,params,'out_result');
	}
	return rdo;
}