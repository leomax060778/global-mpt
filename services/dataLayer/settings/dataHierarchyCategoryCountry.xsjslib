/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/*************************************************/
var spGetAllHl1 = "GET_ALL_HL1_HL2_FOR_COUNTRIES";
var spGetCountryByHl2IdLevel = "GET_HIERARCHY_COUNTRY_BY_HL2_ID_LEVEL";
var spUpdHierarchyCategoryCountry = "UPD_HIERARCHY_CATEGORY_COUNTRY";
var spGET_ALLOCATION_COUNTRY_CATEGORY_OPTION_BY_ID = "GET_ALLOCATION_COUNTRY_CATEGORY_OPTION_BY_ID";
var spGET_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_TO_DELETE = "GET_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_TO_DELETE";
var spDEL_ALLOCATION_COUNTRY_RELATIONSHIP = "DEL_ALLOCATION_COUNTRY_RELATIONSHIP";
var spGET_ALLOCATION_COUNTRY_OPTION_LEVEL = "GET_ALLOCATION_COUNTRY_OPTION_LEVEL";
var spUPD_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL = "UPD_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL";
var spINS_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL = "INS_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL";
var spINS_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_HL2 = "INS_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_HL2";
var spUPD_ALLOCATION_COUNTRY_OPTION_FLAGS = "UPD_ALLOCATION_COUNTRY_OPTION_FLAGS";
var spDEL_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_HL2 = "DEL_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_HL2";
var spDEL_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL = "DEL_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL";
var spGET_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_COUNT_BY_CATEGORY = "GET_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_COUNT_BY_CATEGORY";
/******************************************************/

function getAllHl1(budgetYearId){
    var result = db.executeProcedureManual(spGetAllHl1, {in_budget_year_id: budgetYearId});
    
    return db.extractArray(result.out_result);
}

function getCountryByHl2IdLevel(hl2Id, level){
    var params = {};
    params.IN_HL2_ID = hl2Id;
    params.IN_HIERARCHY_LEVEL_ID = level;

    var result = db.executeProcedureManual(spGetCountryByHl2IdLevel, params);

    var object = {};
    object.AVAILABLES = db.extractArray(result.out_result_available);
    object.ASSIGNED = db.extractArray(result.out_result_assigned);
    object.RESULT = db.extractArray(result.out_result);

    return object;
}


function uploadHierarchyCategoryCountry(reqBody, userId){
	//return db.executeScalarManual(spUpdHierarchyCategoryCountry, reqBody, 'out_result');
	return 0;
}

function getAllocationCountryCategoryOptionById(optionId){
    var params = {
        'in_option_id' : optionId
    };
    var result = db.executeProcedureManual(spGET_ALLOCATION_COUNTRY_CATEGORY_OPTION_BY_ID, params);
    var list = db.extractArray(result.out_result);
    if(list.length){
        return list[0];
    } else {
        return {};
    }
}

function getAllocationCountryCategoryOptionLevelToDelete(hl2Id, levelId, optionList) {
    var parameters = {
        in_level_id: levelId,
        in_l2_id: hl2Id,
        optionList: optionList
    };
    var rdo = db.executeProcedureManual(spGET_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_TO_DELETE,parameters);
    return db.extractArray(rdo.out_result);
}

function deleteAllocationCountryCategoryOptionLevel(hl2Id, levelId, allocationOptions, userId){
    var params = {
        'in_level_id': levelId,
        'in_l2_id': hl2Id,
        'in_user_id' : userId,
        'optionList': allocationOptions
    };
    var rdo;
    rdo = db.executeScalarManual(spDEL_ALLOCATION_COUNTRY_RELATIONSHIP,params,'out_result');
    return rdo;
}

function getAllocationCountryOptionLevelByHl2AndLevelId(hl2Id, hierarchy_level_id, optionId) {
    var rdo = db.executeProcedureManual(spGET_ALLOCATION_COUNTRY_OPTION_LEVEL,{'in_hl2_id':hl2Id, 'in_hierarchy_level_id': hierarchy_level_id, 'in_option_id':optionId});
    return db.extractArray(rdo.out_result)[0];
    return null;
}

function updateAllocationCountryCategoryOptionLevel(categoryId, levelId, optionId, processingReport, userId, make_category_mandatory){
    var params = {
        'in_category_id': categoryId,
        'in_level_id': levelId,
        'in_option_id':optionId,
        'in_user_id' : userId,
        'in_in_processing_report':processingReport,
        'in_make_category_mandatory':make_category_mandatory
    };

    return db.executeScalarManual(spUPD_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL,params,'out_result');
}

function insertAllocationCountryCategoryOptionLevel(categoryId, optionId, levelId, inProcessingReport, userId, make_category_mandatory) {
    var params = {
        'in_category_id': categoryId,
        'in_level_id': levelId,
        'in_option_id':optionId,
        'in_user_id' : userId,
        'in_in_processing_report':inProcessingReport,
        'in_make_category_mandatory':make_category_mandatory
    };
    return db.executeScalarManual(spINS_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL, params, 'out_result');
}

function insertAllocationCountryCategoryOptionLevelHl2(listAllocationCountryCategoryOptionLevelHl2) {
    return db.executeScalarManual(spINS_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_HL2, listAllocationCountryCategoryOptionLevelHl2, 'out_result');
}

function updateAllocationCountryOptionFlags(reqBody){
    var params = {};
    params.in_category_id = reqBody.CATEGORY_ID;
    params.in_hierarchy_level_id = reqBody.HIERARCHY_LEVEL_ID;
    params.in_make_category_mandatory = reqBody.MAKE_CATEGORY_MANDATORY;
    params.in_in_processing_report = reqBody.IN_PROCESSING_REPORT;

    return db.executeScalarManual(spUPD_ALLOCATION_COUNTRY_OPTION_FLAGS, params, 'out_result');
}

function deleteCountryCategoryOptionLevel(hl2Id, userId) {
    var params={};
    if(hl2Id){
        params = {
            'in_hl2_id': hl2Id,
            'in_user_id' : userId
        };
        return db.executeScalarManual(spDEL_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_HL2,params,'out_result');
    }
    else{
        params = {
            'in_user_id' : userId
        };
        return db.executeScalarManual(spDEL_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL,params,'out_result');
    }

}

function checkInUseAllocationCountryCategoryById(categoryId) {
    if(categoryId){
        var rdo = db.executeScalarManual(spGET_ALLOCATION_COUNTRY_CATEGORY_OPTION_LEVEL_COUNT_BY_CATEGORY,{'in_category_id': categoryId}, 'out_result');
        return rdo;
    }
    return null;
}