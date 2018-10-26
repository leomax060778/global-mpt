$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var INS_HL1 = "INS_HL1";
var UPD_HL1 = "UPD_HL1";
var UPD_HL1_BUDGET = "UPD_HL1_BUDGET";
var DEL_HL1 = "DEL_HL1";
// var GET_ALL_HL1 = "GET_ALL_HL1";
var GET_HL1_BY_ID = "GET_HL1_BY_ID";
var GET_HL1_BY_USER_ID = "GET_HL1_BY_USER_ID";
var GET_HL1_BY_BUDGET_YEAR_ID = "GET_HL1_BY_BUDGET_YEAR_ID";
var GET_HL1_BY_BUDGET_YEAR_REGION = "GET_HL1_BY_BUDGET_YEAR_REGION";
var GET_HL1_BY_BUDGET_YEAR_PLANNING_PURPOSE = "GET_HL1_BY_BUDGET_YEAR_PLANNING_PURPOSE";
var GET_HL1_BY_ACRONYM = "GET_HL1_BY_ACRONYM";
var GET_COUNT_HL2_BY_HL1_ID = "GET_COUNT_HL2_BY_HL1_ID";
var GET_HL1_ALLOCATED_BUDGET = "GET_HL1_ALLOCATED_BUDGET";
var GET_HL1_FOR_SEARCH = "GET_HL1_FOR_SEARCH";
//var GET_ALL_CENTRAL_TEAM = "GET_ALL_CENTRAL_TEAM"; //TODO: review in integration
var GET_HL1_BY_FILTER = "GET_HL1_BY_FILTER";
var GET_HL1_ALLOCATION_SUMMARY = "GET_HL1_ALLOCATION_SUMMARY";
var GET_HL1_KPI_SUMMARY = "GET_HL1_KPI_SUMMARY";
var INS_HL1_VERSION = "INS_HL1_VERSION";
var GET_ALL_HL1_VERSION_BY_HL1_ID = "GET_ALL_HL1_VERSION_BY_HL1_ID";
var GET_HL1_VERSION_BY_FILTER = "GET_HL1_VERSION_BY_FILTER";
var GET_HL1_VERSION_BY_ID = "GET_HL1_VERSION_BY_ID";
var GET_HL1_BY_HL4_ID = "GET_HL1_BY_HL4_ID";
var GET_HL1_ASSOCIATED_FORM_BY_LEVEL_HL_ID = "GET_HL1_ASSOCIATED_FORM_BY_LEVEL_HL_ID";

function insertLevel1(acronym, description, budgetYearId, regionId, userId, budget, planningPurposeId, teamTypeId, implementExecutionLevel, crtRelated, import_id, imported) {
    var parameters = {};
    var result = {};
    parameters.in_acronym = acronym;
    parameters.in_description = description;
    parameters.in_budget_year_id = budgetYearId;
    parameters.in_region_id = regionId;
    parameters.in_user_id = userId;
    parameters.in_budget = budget;
    parameters.in_planning_purpose_id = planningPurposeId;
    parameters.in_team_type_id = teamTypeId;
    parameters.in_implement_execution_level = implementExecutionLevel;
    parameters.in_crt_related = crtRelated;
    parameters.in_import_id = import_id ? import_id : null;
    parameters.in_imported = imported ? imported : 0;
    return db.executeScalarManual(INS_HL1, parameters, "out_hl1_id");
}

function updateLevel1(hl1Id, acronym, description, budgetYearId, regionId, userId, budget, planningPurposeId, teamTypeId, implementExecutionLevel, crtRelated, version) {
    var parameters = {};
    parameters.in_hl1_id = hl1Id;
    parameters.in_acronym = acronym;
    parameters.in_region_id = regionId;
    parameters.in_budget_year_id = budgetYearId;
    parameters.in_description = description;
    parameters.in_modified_user_id = userId;
    parameters.in_budget = budget;
    parameters.in_planning_purpose_id = planningPurposeId;
    parameters.in_team_type_id = teamTypeId;
    parameters.in_implement_execution_level = implementExecutionLevel;
    parameters.in_crt_related = crtRelated;
    parameters.in_version = version;
    return db.executeScalarManual(UPD_HL1, parameters, "out_result");
}

function updateBudget(hl1Id,budget,userId) {
    var parameters = {
        in_hl1_id: hl1Id,
        in_updated_budget: budget,
        in_user_id: userId
    };
    return db.executeScalarManual(UPD_HL1_BUDGET, parameters, "out_result");
}

function deleteHl1(hl1Id, userId) {
    var param = {};
    param.in_hl1_id = hl1Id;
    param.in_modified_user_id = userId;
    return db.executeScalarManual(DEL_HL1, param, "out_result");
}

/*function getAllLevel1() {
    var parameters = {};
    var result = db.executeProcedureManual(GET_ALL_HL1, parameters);
    return db.extractArray(result.out_result);
}*/

function getLevel1ById(hl1Id) {
    if (hl1Id > 0) {
        var parameters = {'in_hl1_id': hl1Id};
        var result = db.executeProcedureManual(GET_HL1_BY_ID, parameters);
        var list = db.extractArray(result.out_result);
        if (list.length)
            return list[0];
        else
            return {};
    }
    return {};
}

function getHl1ByBudgetYearRegion(data){
	var result = db.executeProcedureManual(GET_HL1_BY_BUDGET_YEAR_REGION, data);
	return  db.extractArray(result.out_result);
}

function getHl1ByBudgetYearPlanningPurpose(data){
	var result = db.executeProcedureManual(GET_HL1_BY_BUDGET_YEAR_PLANNING_PURPOSE, data);
	return  db.extractArray(result.out_result);
}

function getLevel1ByUser(isSuperAdmin, userId) {
    var result = {};
    var parameters = {
        'in_user_id': userId,
        'in_is_super_Admin': isSuperAdmin ? 1 : 0
    };
    var list = db.executeProcedureManual(GET_HL1_BY_USER_ID, parameters);
    result.out_result = db.extractArray(list.out_result);
    result.out_total_budget = list.out_total_budget;
    return result;
}

function getHl1ByBudgetYear(budgetYearid){
    var list = db.executeProcedureManual(GET_HL1_BY_BUDGET_YEAR_ID, {in_budget_year_id: budgetYearid});
    return db.extractArray(list.out_result);
}

function getLevel1ByAcronymByBudgetYearId(acronym, budgetYearId) {
    if (acronym !== "") {
        var parameters = {'in_acronym': acronym, 'in_budget_year_id': budgetYearId};
        var result = db.executeProcedureManual(GET_HL1_BY_ACRONYM, parameters);
        var list = db.extractArray(result.out_result);
        if (list.length)
            return list[0];
        else
            return null;
    }
    return null;
}

function countRelatedObjects(hl1Id) {
    var parameters = {};
    parameters.in_hl1_id = hl1Id;
    return db.executeScalarManual(GET_COUNT_HL2_BY_HL1_ID, parameters, "out_result");
}

function getHl1AllocatedBudget(hl1Id, hl2Id) {
    if (hl1Id) {
        var rdo = db.executeDecimalManual(GET_HL1_ALLOCATED_BUDGET, {
            'in_hl1_id': hl1Id,
            'in_hl2_id': hl2Id
        }, 'out_hl1_allocated_budget');
        return rdo;
    }
    return null;
}

function getLevel1ForSearch(budgetYearId, regionId, limit, offset, userSessionID, isSA) {
    var parameters = {
        in_budget_year_id: budgetYearId
        , in_region_id: regionId
        , in_limit: limit
        , in_offset: offset
        , in_user_id: userSessionID
        , in_isSA: isSA
    };
    var result = db.executeProcedureManual(GET_HL1_FOR_SEARCH, parameters);
    return {result: db.extractArray(result.out_result), total_rows: result.total_rows};
}

/*function getAllCentralTeam(centralTeamId) {
    var parameters = {'in_hl1_id': centralTeamId};
    var result = db.executeProcedureManual(GET_ALL_CENTRAL_TEAM, parameters);
    return db.extractArray(result.out_result);

}*/

function getLevel1ByFilters(budgetYearId, regionId, subRegionId, userId, isSuperAdmin) {
    var parameters = {};
    var result = {};
    parameters.in_budget_year_id = budgetYearId;
    parameters.in_region_id = regionId;
    parameters.in_subregion_id = subRegionId;
    parameters.in_user_id = userId;
    parameters.in_is_super_Admin = isSuperAdmin ? 1 : 0;

    var list = db.executeProcedureManual(GET_HL1_BY_FILTER, parameters);
    result.out_result = db.extractArray(list.out_result);
    result.out_total_budget = list.out_total_budget;
    return result;
}

function getLevel1LobAllocationSummary(budgetYearId, regionId, subRegionId, userId, isSuperAdmin) {
    var parameters = {};
    var result = {};
    parameters.in_budget_year_id = budgetYearId;
    parameters.in_region_id = regionId;
    parameters.in_subregion_id = subRegionId;
    parameters.in_user_id = userId;
    parameters.in_is_super_Admin = isSuperAdmin ? 1 : 0;

    var list = db.executeProcedureManual(GET_HL1_ALLOCATION_SUMMARY, parameters);
    return db.extractArray(list.out_result);
}

function getHl1KpiSummary(budgetYearId, regionId, userId, isSuperAdmin) {
    var parameters = {
        in_budget_year_id: budgetYearId,
        in_region_id: regionId,
        in_user_id: userId,
        in_is_super_Admin: isSuperAdmin ? 1 : 0
    };

    var list = db.executeProcedureManual(GET_HL1_KPI_SUMMARY, parameters);
    return db.extractArray(list.out_result);
}

function getHl1FormAssociatedByLevelHlId(level, parentId,isLegacyParent){
    var parameters = {
        in_level: level,
        in_parent_id: parentId,
        in_is_legacy_parent: isLegacyParent
    };

    var list = db.executeProcedureManual(GET_HL1_ASSOCIATED_FORM_BY_LEVEL_HL_ID, parameters, isLegacyParent);
    return db.extractArray(list.out_result)[0];
}

function insertLevel1Version(hl1_id, version, acronym, description, budgetYearId, regionId, userId, budget, planningPurposeId, teamTypeId, implementExecutionLevel, crtRelated) {
    var parameters = {};
    var result = {};
    parameters.in_hl1_id = hl1_id;
    parameters.in_version = version;
    parameters.in_acronym = acronym;
    parameters.in_description = description;
    parameters.in_budget = budget;
    parameters.in_budget_year_id = budgetYearId;
    parameters.in_region_id = regionId;
    parameters.in_created_user_id = userId;
    parameters.in_implement_execution_level = implementExecutionLevel;
    parameters.in_crt_related = crtRelated;
    parameters.in_planning_purpose_id = planningPurposeId;
    parameters.in_team_type_id = teamTypeId;
    return db.executeScalarManual(INS_HL1_VERSION, parameters, "out_result");
}

function getAllHl1VersionByHl1Id(hl1_id) {
    var parameters = {'in_hl1_id': hl1_id};
    var result = db.executeProcedureManual(GET_ALL_HL1_VERSION_BY_HL1_ID, parameters);
    return db.extractArray(result.out_result);
}

function getLevel1VersionForFilter(budgetYearId, userSessionID, isSA) {
    var parameters = {
        in_budget_year_id: budgetYearId
        , in_user_id: userSessionID
        , in_is_super_admin: isSA ? 1 : 0
    };
    var result = db.executeProcedureManual(GET_HL1_VERSION_BY_FILTER, parameters);
    return {out_result: db.extractArray(result.out_result)};
}

function getLevel1VersionById(hl1Id, version) {
    if (hl1Id && version) {
        var parameters = {
            'in_hl1_id': hl1Id
            , 'in_version': version
        };
        var result = db.executeProcedureManual(GET_HL1_VERSION_BY_ID, parameters);
        var list = db.extractArray(result.out_result);
        if (list.length)
            return list[0];
        else
            return {};
    }
    return {};
}

function getHl1ByHl4Id(hl4Id) {
    var result = db.executeProcedureManual(GET_HL1_BY_HL4_ID, {'in_hl4_id': hl4Id});
    return db.extractArray(result.out_result)[0];
}

function updateDynamicFormAssociation(data, level) {
    var sp = 'UPD_HL1_DYNAMIC_FORM_' + level.toUpperCase() + '_ASSOCIATION';
    return db.executeScalarManual(sp, data, "out_result");
}