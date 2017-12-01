$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// STORE PROCEDURE LIST NAME
var INS_HL3 = "INS_HL3";
// var GET_HL3_BY_USER = "GET_HL3_BY_USER";
var GET_HL3_BY_HL2_ID = "GET_HL3_BY_HL2_ID";
var GET_HL3_PATH_BY_USER_ID = "GET_HL3_PATH_BY_USER_ID";
var GET_HL3_KPI_SUMMARY = "GET_HL3_KPI_SUMMARY";
var spGetHl3AllocatedBudget = "GET_HL3_ALLOCATED_BUDGET";
var spGetHl3ForSerach = "GET_HL3_FOR_SEARCH";
var UPD_HL3 = "UPD_HL3";
var GET_HL3 = "GET_HL3";
var GET_GLOBAL_TEAM = "GET_GLOBAL_TEAM";
var GET_HL3_BY_ACRONYM = "GET_HL3_BY_ACRONYM";
var DEL_HL3 = "DEL_HL3";
var spUpdateHl3BudgetStatus = "UPD_HL3_STATUS_BUDGET";
var GET_ALL_HL3_VERSION_BY_HL3_ID = "GET_ALL_HL3_VERSION_BY_HL3_ID";
var INS_HL3_VERSION = "INS_HL3_VERSION";
var GET_HL3_VERSION_BY_FILTER = "GET_HL3_VERSION_BY_FILTER";
var GET_HL3_VERSION_BY_ID = "GET_HL3_VERSION_BY_ID";
var spGetHl3RemainingBudgetByHl3Id = "GET_HL3_REMAINING_BUDGET_BY_HL3_ID";

// Insert a new hl3
function insertHl3(acronym, hl2Id, shoppingCartApprover, costCenter, description, businessOwnerId, budget, inBudget, importId, imported, userId) {
	var parameters = {};
    parameters.in_acronym = acronym;
    parameters.in_hl2_id = hl2Id;
    parameters.in_shopping_cart_approver = shoppingCartApprover;
    parameters.in_cost_center = costCenter;
    parameters.in_hl3_description = description;
    parameters.in_crm_id = null;
    parameters.in_business_owner_id = businessOwnerId;
    parameters.in_hl3_fnc_budget_total = budget;
    parameters.in_in_budget = inBudget;
    parameters.in_user_id = userId;
    parameters.in_import_id = importId;
    parameters.in_imported = imported;
    return db.executeScalarManual(INS_HL3, parameters, 'out_hl3_id');
}

function insertHl3FromUpload(objHl3, userId){
    return insertHl3(
        objHl3.ACRONYM
        , objHl3.PARENT_ID
        , objHl3.SHOPPING_CART_APPROVER || null
        , objHl3.COST_CENTER || null
        , objHl3.HL3_DESCRIPTION
        , objHl3.BUSINESS_OWNER_ID || 1
        , objHl3.HL3_FNC_BUDGET_TOTAL
        , null
        , objHl3.IMPORT_ID || null
        , 1
        , userId
    );
}

/* Execute query to update an HL3 */
function updateLevel3(hl3_id, acronym, description, business_owner_id, budget, in_budget, shopping_cart_approver, cost_center, version, userId) {
	var parameters = {};
	var result = {};
	parameters.in_hl3_id = hl3_id;
	parameters.in_acronym = acronym;
	parameters.in_hl3_description = description;
	parameters.in_business_owner_id = business_owner_id;
	parameters.in_hl3_fnc_budget_total = budget;
	parameters.in_in_budget = in_budget;
	parameters.in_user_id = userId;
	parameters.in_version = version;
    parameters.in_shopping_cart_approver = shopping_cart_approver;
    parameters.in_cost_center = cost_center;
	var list = db.executeProcedureManual(UPD_HL3, parameters);
	result.out_result_hl3 = list.out_result_hl3;
	result.out_result_hl3_fnc = list.out_result_hl3_fnc;
	result.out_crm_id = list.out_crm_id;
	result.out_budget_flag = list.out_budget_flag;
	return result;
}

//Execute an Sp to retrieve HL3 data from HL2
function getAllLevel3(objHl2, userId, isSA) {
	var parameters = {};
	var result = {};
	parameters.in_hl2_id = Number(objHl2) || objHl2.IN_HL2_ID;
	parameters.in_user_id = userId;
	parameters.in_is_super_Admin = isSA ? 1 : 0;

	var list = db.executeProcedure(GET_HL3_BY_HL2_ID, parameters);
	result.out_result = db.extractArray(list.out_result);
	result.out_total_budget = list.out_total_budget;
	result.out_total_allocated = list.out_total_allocated;
	result.out_remaining_budget = list.out_remaining_budget;
	return result;
}

function getHl3KpiSummary(hl2Id, userId, isSA){

    if(hl2Id){
    	var parameters = {
            in_user_id: userId,
            in_is_super_Admin: isSA ? 1 : 0,
            in_hl2_id: hl2Id
		};
        var result = db.executeProcedureManual(GET_HL3_KPI_SUMMARY, parameters);
        return db.extractArray(result.out_result);
    }
    return null;

}

function getHl3PathByUserId(userId, isSA, budgetYearId, regionId, subRegionId) {
    var parameters = {
        in_user_id: userId,
        in_is_super_Admin: isSA ? 1 : 0,
        in_budget_year_id:  budgetYearId,
        in_region_id:  regionId,
        in_subregion_id:  subRegionId
    };

    var list = db.executeProcedureManual(GET_HL3_PATH_BY_USER_ID, parameters);
    return db.extractArray(list.out_result);
}

//Execute an SP to retrieve an HL3 by id
function getLevel3ById(hl3Id, userId) {
	var parameters = {};
	parameters.in_hl3_id = hl3Id;
	var result = db.executeProcedure(GET_HL3, parameters);
	var list = db.extractArray(result.out_result);
	if(list.length)
		return list[0];
	
	else
		return {};
}

function getLevel3ByAcronym(acronym, hl2Id, userId) {
	var parameters = {};
	parameters.in_acronym = acronym.toUpperCase();
	parameters.in_hl2_id = hl2Id;
	var result = db.executeProcedureManual(GET_HL3_BY_ACRONYM, parameters);
	var list = db.extractArray(result.out_result);
	if(list.length)
		return list[0];
	
	else
		return {};
}

function getGlobalTeams(userId) {
	var parameters = {};
	parameters.in_user_id = userId;
	var result = db.executeProcedure(GET_GLOBAL_TEAM, parameters);
	return db.extractArray(result.out_result);
}

function getHl3AllocatedBudget(hl3Id, hl4Id) {
	if(hl3Id && hl4Id){
		var rdo = db.executeDecimalManual(spGetHl3AllocatedBudget, {'in_hl3_id': hl3Id, 'in_hl4_id': hl4Id}, 'out_hl3_allocated_budget');
		return rdo;
	}
	return null;
}

function getHl3RemainingBudgetByHl3Id(hl3Id) {
    var params = { 'in_hl3_id': hl3Id};

    if(hl3Id){
        var rdo = db.executeDecimalManual(spGetHl3RemainingBudgetByHl3Id, params, 'out_result');
        return rdo;
    }
    return null;
}

function getLevel3ForSearch(userSessionID, isSA, budget_id, region_id, subregion_id, offset, limit){
	var parameters = {
		in_user_id: userSessionID,
		in_isSA: isSA,
		in_budget_year_id: budget_id,
		in_region_id: region_id || 0,
		in_subregion_id:subregion_id || 0,
		in_offset:offset || 0,
		in_limit: limit || -1
	};
	var result = db.executeProcedure(spGetHl3ForSerach,parameters);
	return {result: db.extractArray(result.out_result),
		    total_rows: result.total_row || 0 };

}

/* Execute query to update an HL3 */
function deleteLevel3(hl3Id, userId) {
	var parameters = {};
	parameters.in_hl3_id = hl3Id;
	parameters.in_user_id = userId;	
	return db.executeScalarManual(DEL_HL3, parameters, 'out_result');
}

function updateHl3BudgetStatus(hl3_id, userId, nextStatus){
	var parameters = {"in_hl3_id": hl3_id, "in_status_budget": nextStatus, "in_user_id": userId};
	var rdo = db.executeScalarManual(spUpdateHl3BudgetStatus, parameters, 'out_result');
	return rdo;
}

function getAllHl3VersionByHl3Id(hl3_id){
	var parameters = {'in_hl3_id': hl3_id};
	var result = db.executeProcedureManual(GET_ALL_HL3_VERSION_BY_HL3_ID,parameters);
	return db.extractArray(result.out_result);
}

function insertLevel3Version(hl3Id, version, acronym, description, budget, userId, business_owner_id, origin_plan_id, hl2_id, crm_id, hl3_hierarchy_id, hl3_status_detail_id, in_budget, shopping_cart_approver, cost_center){
	var parameters = {};
	parameters.in_hl3_id = hl3Id;
	parameters.in_version = version;
	parameters.in_acronym = acronym;
	parameters.in_description = description;
	parameters.in_budget = budget;
	parameters.in_created_user_id = userId;
	parameters.in_business_owner_id = business_owner_id;
	parameters.in_origin_plan_id = origin_plan_id;
	parameters.in_hl2_id = hl2_id;
	parameters.in_crm_id = crm_id;
	parameters.in_hl3_hierarchy_id = hl3_hierarchy_id;
	parameters.in_hl3_status_detail_id = hl3_status_detail_id;
	parameters.in_in_budget = in_budget;
	parameters.in_shopping_cart_approver = shopping_cart_approver;
	parameters.in_cost_center = cost_center;

	return db.executeScalarManual(INS_HL3_VERSION,parameters,"out_result");
}

function getLevel3VersionForFilter(hl2Id, userSessionID, isSA){
	var parameters = {
		in_hl2_id: hl2Id,
		in_user_id: userSessionID,
		in_issa: isSA ? 1:0
	};
	var result = db.executeProcedure(GET_HL3_VERSION_BY_FILTER,parameters);
	return {out_result : db.extractArray(result.out_result)};

}

function getLevel3VersionById(hl3Id, version) {
	var parameters = {};
	if(hl3Id && version) {
		parameters.in_hl3_id = hl3Id;
		parameters.in_version = version;
		var result = db.executeProcedure(GET_HL3_VERSION_BY_ID, parameters);
		var list = db.extractArray(result.out_result);
		if (list.length)
			return list[0];

		else
			return {};
	}
	else
		return {};
}