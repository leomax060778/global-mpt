/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
var spGetHl4Byhl3Id = "GET_HL4_BY_HL3_ID";
var spGetHl4ById = "GET_HL4_BY_ID";
var spGetHl4CarryOverById = "GET_HL4_CARRY_OVER_BY_ID";
var spGetHl4ByAcronym = "GET_HL4_BY_ACRONYM";
var spGetCountHl5ByHl4Id = "GET_COUNT_HL5_BY_HL4_ID";
var spGetHl4StatusByHl4Id = "GET_HL4_STATUS_BY_HL4_ID";
var spGetHl4ForSerach = "GET_HL4_FOR_SEARCH";
var spGetAllHl4 = "GET_ALL_HL4";
var spGET_COUNT_HL5_BY_HL4_ID = "GET_COUNT_HL5_BY_HL4_ID";
var spGET_COUNT_HL5_HL6_IN_CRM_BY_HL4_ID = "GET_COUNT_HL5_HL6_IN_CRM_BY_HL4_ID";
var GET_IMPLEMENT_EXECUTION_LEVEL_BY_HL4_ID = "GET_IMPLEMENT_EXECUTION_LEVEL_BY_HL4_ID";
var GET_HL4_BY_BUDGET_YEAR = "GET_HL4_BY_BUDGET_YEAR";

var spInsertHl4 = "INS_HL4";
var spInsertHl4CategoryOption = "INS_HL4_CATEGORY_OPTION";
var spInsertHl4LogStatus = "INS_HL4_LOG_STATUS";
var spMassInsertHl4LogStatus = "INS_MASS_HL4_LOG_STATUS";
var spInsertHl4CRMBinding = "INS_HL4_CRM_BINDING";

var spSetHl4InBudget = "HL4_CHANGE_IN_BUDGET";
var spSetHl4OutBudget = "HL4_CHANGE_OUT_BUDGET";

var spUpdateHl4 = "UPD_HL4";
var spUpdateHl4CategoryOption = "UPD_HL4_CATEGORY_OPTION";
var spUpdateHl4CRMBinding = "UPD_HL4_CHANGED_FIELDS";

var spDeleteHl4 = "DEL_HL4";
var spDeleteHl4CRMBinding = "DEL_HL4_CRM_BINDING";

var HL4_EXISTS_IN_CRM = "HL4_EXISTS_IN_CRM";
var HL4_CHANGE_STATUS = "HL4_CHANGE_STATUS";
var HL4_MASS_CHANGE_STATUS = "HL4_MASS_CHANGE_STATUS";

var spGetHl4AllocatedBudget = "GET_HL4_ALLOCATED_BUDGET";
var spGetHl3ForHl4Validation = "GET_HL3_FOR_HL4_VALIDATION";
var spGetHl4ForHl4Validation = "GET_HL4_FOR_HL4_VALIDATION";
var spGetCategoryForHl4Validation = "GET_CATEGORY_OPTION_FOR_HL4_VALIDATION";
var spResetHl4CategoryOptionUpdated = "RESET_HL4_CATEGORY_OPTION_UPDATED";
var GET_HL4_FOR_EMAIL = "GET_HL4_FOR_EMAIL";

var UPD_DELETION_REASON = "UPD_HL4_DELETION_REASON";
var INS_HL4_IN_CRM_VERSION = "INS_HL4_IN_CRM_VERSION";
var GET_HL4_IN_CRM_VERSION_BY_ID = "GET_HL4_IN_CRM_VERSION_BY_ID";

/******************************************************/

function getAllHl4() {
    var rdo = db.executeProcedure(spGetAllHl4, {});
    return db.extractArray(rdo.out_hl4);
}

function getHl4(id) {
    var result = {};
    var list = db.executeProcedureManual(spGetHl4Byhl3Id, {"in_hl3_id": id});
    result.out_result = db.extractArray(list.out_result);
    result.out_total_budget = list.out_total_budget;
    result.out_total_allocated = list.out_total_allocated;
    result.out_remaining_budget = list.out_remaining_budget;
    return result;
}

function getHl4ById(id) {
    if (id != "") {
        var rdo = db.executeProcedureManual(spGetHl4ById, {'in_hl4_id': id});
        return db.extractArray(rdo.out_hl4)[0];
    }
    return null;
}

function getHl4ForEmail(ids) {
    var rdo = db.executeProcedureManual(GET_HL4_FOR_EMAIL, {
        'in_hl4_ids': ids.map(function (value) {
            return {id: value.hl4_id}
        })
    });
    return db.extractArray(rdo.out_result);
}

function getHL4CarryOverById(hl4Id) {
    var params = {};
    params.in_hl4_id = hl4Id;

    var rdo = db.executeProcedureManual(spGetHl4CarryOverById, params);
    var list = db.extractArray(rdo.out_result);

    if (list.length)
        return list[0];
    else
        return {};
}

function getHl4ByAcronym(acronym, hl2_id) {
    var parameters = {};
    parameters.in_acronym = acronym.toUpperCase();
    parameters.in_hl2_id = hl2_id;
    var result = db.executeProcedure(spGetHl4ByAcronym, parameters);
    var list = db.extractArray(result.out_result);
    if (list.length)
        return list[0];
    else
        return {};
}

function getHl4StatusByHl4Id(hl4_id) {
    if (hl4_id != "") {
        var rdo = db.executeProcedureManual(spGetHl4StatusByHl4Id, {'in_hl4_id': hl4_id});
        return db.extractArray(rdo.out_result)[0];
    }
    return null;
}

function getCountHl4Childrens(hl4_id) {
    return db.executeScalarManual(spGET_COUNT_HL5_BY_HL4_ID, {'in_hl4_id': hl4_id}, 'out_total_hl5');
}

function getCountHl4ChildrenInCRM(hl4_id) {
    var result = db.executeProcedure(spGET_COUNT_HL5_HL6_IN_CRM_BY_HL4_ID, {'in_hl4_id': hl4_id});
    var list = db.extractArray(result.out_result);
    if (list.length) {
        return list[0];
    } else {
        return {};
    }
}

function getLevel4ForSearch(budgetYearId, regionId, subRegionId, limit, offset, userSessionID, isSA) {
    var parameters = {
        in_budget_year_id: budgetYearId
        , in_region_id: regionId
        , in_subRegion_id: subRegionId
        , in_limit: limit
        , in_offset: offset
        , in_user_id: userSessionID
        , in_isSA: isSA
    };
    var result = db.executeProcedure(spGetHl4ForSerach, parameters);
    return {result: db.extractArray(result.out_result), total_rows: result.total_rows};
}

function getImplementExecutionLevel(hl4Id) {
    var parameters = {
        in_hl4_id: hl4Id
    };
    var rdo = db.executeScalarManual(GET_IMPLEMENT_EXECUTION_LEVEL_BY_HL4_ID, parameters, 'out_result');
    return rdo;
}

function getHl4ByBudgetYear(hl4Id) {
    var rdo = db.executeProcedureManual(GET_HL4_BY_BUDGET_YEAR, {'in_hl4_id': hl4Id});
    return db.extractArray(rdo.out_result);
}

function insertHl4(reqBody, userId) {
    var params = {};

    params.in_acronym = reqBody.ACRONYM;
    params.in_hl4_crm_description = reqBody.HL4_CRM_DESCRIPTION;
    params.in_hl4_details = reqBody.HL4_DETAILS;
    params.in_hl4_business_details = reqBody.HL4_BUSINESS_DETAILS;
    params.in_hl3_id = reqBody.HL3_ID;
    params.in_created_user_id = userId;
    params.in_budget_column = reqBody.IN_BUDGET; //The in_budget_column name is because Hana confuse both IN_BUDGET and BUDGET columns
    params.budget_column = reqBody.BUDGET; //The budget_column name is because Hana confuse both IN_BUDGET and BUDGET columns
    params.in_hl4_status_detail_id = reqBody.HL4_STATUS_DETAIL_ID;
    params.in_shopping_cart_approver = reqBody.SHOPPING_CART_APPROVER.trim();
    params.in_cost_center = reqBody.COST_CENTER.trim();
    params.in_mkt_org_id = reqBody.MKT_ORG_ID;
    params.in_dis_channel_id = reqBody.DIS_CHANNEL_ID;

    var rdo = db.executeScalarManual(spInsertHl4, params, 'out_result');
    return rdo;
}

function insertHl4CategoryOption(parameters) {
    var rdo = db.executeScalarManual(spInsertHl4CategoryOption, parameters, 'out_hl4_category_option_id');
    return rdo;
}

function insertHl4SaleSubRegion(parameters) {
    var rdo = db.executeScalarManual(spInsertHl4SaleSubregion, parameters, 'out_hl4_sale_subregion_id');
    return rdo;
}

function insertHl4CRMBinding(parameters) {
    var rdo = db.executeScalarManual(spInsertHl4CRMBinding, parameters, 'out_hl4_crm_binding_id');
    return rdo;
}

function insertHl4LogStatus(hl4_id, status, userId) {
    var parameters = {"in_hl4_id": hl4_id, 'in_status_id': status, 'in_user_id': userId};
    var rdo = db.executeScalarManual(spInsertHl4LogStatus, parameters, 'out_hl4_log_status_id');
    return rdo;
}

function massInsertHl4LogStatus(hl4_ids, userId) {
    var parameters = {"in_hl4_ids": hl4_ids, 'in_user_id': userId};
    var rdo = db.executeScalarManual(spMassInsertHl4LogStatus, parameters, 'out_hl4_log_status_id');
    return rdo;
}

function updateHl4(reqBody, userId) {
    var params = {};

    params.in_hl4_id = reqBody.HL4_ID;
    params.in_acronym = reqBody.ACRONYM;
    params.in_hl4_crm_description = reqBody.HL4_CRM_DESCRIPTION;
    params.in_hl4_details = reqBody.HL4_DETAILS;
    params.in_hl4_business_details = reqBody.HL4_BUSINESS_DETAILS;
    params.in_hl4_status_detail_id = reqBody.HL4_STATUS_DETAIL_ID;
    params.in_is_annual_plan = reqBody.IS_ANNUAL_PLAN;
    params.in_shopping_cart_approver = reqBody.SHOPPING_CART_APPROVER.trim();
    params.in_cost_center = reqBody.COST_CENTER.trim();
    params.in_mkt_org_id = reqBody.MKT_ORG_ID;
    params.in_dis_channel_id = reqBody.DIS_CHANNEL_ID;
    params.in_modified_user_id = userId;
    params.budget_column = reqBody.BUDGET; //The budget_column name is because Hana confuse both IN_BUDGET and BUDGET columns

    var rdo = db.executeScalarManual(spUpdateHl4, params, 'out_result');
    return rdo;
}

function updateHl4CategoryOption(parameters) {
    var rdo = db.executeScalarManual(spUpdateHl4CategoryOption, parameters, 'out_result');
    return rdo;
}

function updateHl4BudgetStatus(hl4_id, nextStatus) {
    var sp = nextStatus === 1 ? spSetHl4InBudget : spSetHl4OutBudget;
    var parameters = {"in_hl4_id": hl4_id};
    var rdo = db.executeScalarManual(sp, parameters, 'out_result');
    return rdo;
}

function updateHl4CRMBinding(parameters) {
    var rdo = db.executeScalarManual(spUpdateHl4CRMBinding, parameters, 'out_result');
    return rdo;
}

function deleteHl4(parameters) {
    var rdo = db.executeScalarManual(spDeleteHl4, parameters, 'out_result');
    return rdo;
}

/**
 * @deprecated
 * @param parameters
 @returns {}
 */
function deleteHl4BudgetRegion(parameters) {
    /*var rdo = db.executeScalarManual(spDeleteHl4BudgetRegion, parameters, 'out_result');
     return rdo;*/
}

/**
 * @deprecated
 * @param parameters
 * @returns {*}
 */
function deleteHl4BudgetSubRegion(parameters) {
    /*var rdo = db.executeScalarManual(spDeleteHl4BudgetSubregion, parameters, 'out_result');
     return rdo;*/
}

/**
 * @deprecated
 * @param parameters
 * @returns {*}
 */
function deleteHl4BudgetRoute(parameters) {
    /*var rdo = db.executeScalarManual(spDeleteHl4BudgetRoute, parameters, 'out_result');
     return rdo;*/
}

/**
 * @deprecated
 * @param parameters
 * @returns {*}
 */
function deleteHl4SaleRegion(parameters) {
    /*var rdo = db.executeScalarManual(spDeleteHl4SaleRegion, parameters, 'out_result');
     return rdo;*/
}

/**
 * @deprecated
 * @param parameters
 * @returns {*}
 */
function deleteHl4SaleRoute(parameters) {
    /*var rdo = db.executeScalarManual(spDeleteHl4SaleRoute, parameters, 'out_result');
     return rdo;*/
}

function deleteHl4CRMBinding(parameters) {
    var rdo = db.executeScalarManual(spDeleteHl4CRMBinding, parameters, 'out_result');
    return rdo;
}

function existsInCrm(hl4Id) {
    if (hl4Id) {
        return db.executeScalarManual(HL4_EXISTS_IN_CRM, {'in_hl4_id': hl4Id}, 'out_result');
    }
    return null;
}

function changeStatusHl4(hl4_id, status, userId) {
    var result = {};
    var parameters = {"in_hl4_id": hl4_id, 'in_status_id': status, 'in_user_id': userId};

    return db.executeProcedureManual(HL4_CHANGE_STATUS, parameters);
}

//function massChangeStatusHl4(hl4Ids, status, userId) {
function massChangeStatusHl4(data) {
    return db.executeScalarManual(HL4_MASS_CHANGE_STATUS, data, 'out_result');
    /*  var result = {};
     var parameters = {"in_hl4_ids": hl4Ids, 'in_status_id': status, 'in_user_id': userId};
     var list = db.executeProcedureManual(HL4_MASS_CHANGE_STATUS, parameters);
     result.out_result_hl4 = list.out_result;
     return result;*/
}

function getHl4Childrens(hl4_id) {
    var parameters = {"in_hl4_id": hl4_id};
    var totalHl5 = db.executeScalarManual(spGetCountHl5ByHl4Id, parameters, 'out_total_hl5');
    return totalHl5;
}


function getHl4AllocatedBudget(hl4Id, hl5Id) {
    if (hl4Id) {
        var rdo = db.executeDecimalManual(spGetHl4AllocatedBudget
            , {'in_hl4_id': hl4Id, 'in_hl5_id': hl5Id}, 'out_hl4_allocated_budget');
        return rdo;
    }
    return null;
}

function getHl3ForHl4Validation(hl3Id, hl4Id){
    var params = {};
    params.in_hl3_id = hl3Id;
    params.in_hl4_id = hl4Id;

    var result = db.executeProcedureManual(spGetHl3ForHl4Validation, params);
    var objResult = {};

    objResult.HL3 = db.extractArray(result.out_result_hl3)[0];
    objResult.HL3_KPIS = db.extractArray(result.out_result_hl3_kpis);
    objResult.HL4_CHILDRENS = db.extractArray(result.out_result_hl4_children);
    objResult.HL4_CHILDRENS_KPIS = db.extractArray(result.out_result_hl4_children_kpis);
    objResult.HL3_AVAILABLE_VOLUME_VALUE = db.extractArray(result.out_result_hl3_available_volume_value)[0];

    return objResult;
}

function getHl4ForHl4Validation(hl4Id){
    var params = {};
    params.in_hl4_id = hl4Id;

    var result = db.executeProcedureManual(spGetHl4ForHl4Validation, params);
    var objResult = {};

    objResult.HL4 = db.extractArray(result.out_result_hl4)[0];
    objResult.HL4_IN_CRM_VERSION = db.extractArray(result.out_result_hl4_in_crm_version)[0] || {};
    objResult.HL4_CRM_BINDING_CHANGED_FIELDS = db.extractArray(result.out_result_crm_binding_changed_fields);
    objResult.HL5_CHILDREN = db.extractArray(result.out_result_hl5_children);

    return objResult;
}

function getCategoryOptionForHl4Validation(hl4Id){
    var params = {};
    params.in_hl4_id = hl4Id;

    var result = db.executeProcedureManual(spGetCategoryForHl4Validation, params);
    var objResult = {};

    objResult.HL4_ORIGINAL_CATEGORIES = db.extractArray(result.out_result_categories);
    objResult.HL4_ORIGINAL_HIERARCHY_LEVEL_CATEGORIES = db.extractArray(result.out_result_hierarchy_level_categories);
    objResult.HL4_ALLOCATION_CATEGORY_COUNT = db.extractArray(result.out_result_allocation_category_count)[0].ALLOCATION_CATEGORY_COUNT;
    objResult.HL4_CATEGORY_OPTION_LEVEL = db.extractArray(result.out_result_category_option_level);
    objResult.HL4_CATEGORY_OPTION = db.extractArray(result.out_result_allocation_option);
    objResult.HL4_CATEGORY_OPTION_VERSIONED = db.extractArray(result.out_result_allocation_option_versioned);

    return objResult;
}

function resetHl4CategoryOptionUpdated(hl4CategoryId, userId) {
    if (hl4CategoryId) {
        var params = {
            'in_hl4_category_id': hl4CategoryId,
            'in_user_id': userId
        };
        var rdo = db.executeScalarManual(spResetHl4CategoryOptionUpdated, params, 'out_result');
        return rdo;
    }
    return null;
}

function updateDeletionReason(hl4Id, deleteionReason, userId) {
    var parameters = {
        in_hl4_id: hl4Id
        , in_deletion_reason: deleteionReason
        , in_user_id: userId
    };
    var rdo = db.executeScalarManual(UPD_DELETION_REASON, parameters, 'out_result');
    return rdo;
}

function insertHl4VersionInCRM(hl4_id) {
    var parameters = {
        in_hl4_id: hl4_id
    };
    return db.executeScalarManual(INS_HL4_IN_CRM_VERSION, parameters, 'out_result');
}

function getHl4InCrmVersionById(hl4_id) {
    var rdo = db.executeProcedureManual(GET_HL4_IN_CRM_VERSION_BY_ID, {'in_hl4_id': hl4_id});
    return db.extractArray(rdo.out_result)[0];
}