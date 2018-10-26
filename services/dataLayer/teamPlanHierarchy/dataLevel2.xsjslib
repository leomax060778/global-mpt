$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_HL2_BY_USER_ID = "GET_HL2_BY_USER_ID";
var GET_ALL_HL2 = "GET_ALL_HL2";
var GET_HL2_KPI_SUMMARY = "GET_HL2_KPI_SUMMARY";
var GET_HL2_BY_ID = "GET_HL2_BY_ID";
var GET_HL2_BY_HL1_ID = "GET_HL2_BY_HL1_ID";
var GET_HL2_ALLOCATION_SUMMARY = "GET_HL2_ALLOCATION_SUMMARY";
var spGetHl2ForSerach = "GET_HL2_FOR_SEARCH";
var GET_HL2_ALLOW_AUTOMATIC_BUDGET_APPROVAL_BY_HL4_ID = "GET_HL2_ALLOW_AUTOMATIC_BUDGET_APPROVAL_BY_HL4_ID";
var GET_HL2_ALLOW_AUTOMATIC_BUDGET_APPROVAL_BY_HL5_ID = "GET_HL2_ALLOW_AUTOMATIC_BUDGET_APPROVAL_BY_HL5_ID";
var INS_HL2 = "INS_HL2";
var UPD_HL2 = "UPD_HL2";
var UPD_HL2_BUDGET = "UPD_HL2_BUDGET";
var COUNT_HL3_BY_HL2_ID = "COUNT_HL3_BY_HL2_ID";
var DEL_HL2 = "DEL_HL2";
var GET_HL2_BY_ACRONYM_AND_ORGANIZATION_ACRONYM = "GET_HL2_BY_ACRONYM_AND_ORGANIZATION_ACRONYM";
var GET_ALL_CENTRAL_TEAM = "GET_ALL_CENTRAL_TEAM";
var spGetHl2AllocatedBudget = "GET_HL2_ALLOCATED_BUDGET";
var spUpdateHl2BudgetStatus = "UPD_HL2_STATUS_BUDGET";
var GET_ALL_HL2_VERSION_BY_HL2_ID = "GET_ALL_HL2_VERSION_BY_HL2_ID";
var INS_HL2_VERSION = "INS_HL2_VERSION";
var GET_HL2_VERSION_BY_FILTER = "GET_HL2_VERSION_BY_FILTER";
var GET_HL2_VERSION_BY_ID = "GET_HL2_VERSION_BY_ID";
var GET_HL2_BY_HL4_ID = "GET_HL2_BY_HL4_ID";

function getLevel2ByUser(userId){
	
	
	var result = {};
	var parameters = {'IN_USER_ID': userId};	
	var list = db.executeProcedure(GET_HL2_BY_USER_ID, parameters);	
	result.out_result = db.extractArray(list.out_result);
	result.out_total_budget = list.out_total_budget;
	return result;
}

function getLevel2ById(hl2Id){
	if(hl2Id)
	{
		var parameters = {'in_hl2_id': hl2Id};
		var result = db.executeProcedureManual(GET_HL2_BY_ID, parameters);
		var list = db.extractArray(result.out_result);
		if(list.length)
			return list[0];
		else
			return {};
	}
	return {};
}

function getAllCentralTeam(centralTeamId, budgetYearId){
	var parameters = {'in_budget_year_id': budgetYearId || 0};
	var result = db.executeProcedureManual(GET_ALL_CENTRAL_TEAM,parameters);
	return db.extractArray(result.out_result);

}

function getLevelByAcronymAndOrganizationAcronym(acronym, budgeth_year_id, org_acronym){
	var parameters = {'in_acronym': acronym, 'IN_BUDGET_YEAR_ID':budgeth_year_id , 'in_org_acronym' : org_acronym};	
	var result = db.executeProcedureManual(GET_HL2_BY_ACRONYM_AND_ORGANIZATION_ACRONYM, parameters);	
	var list = db.extractArray(result.out_result);
	if(list.length)
		return list[0];
	else
		return null;
}

function getAllLevel2(hl1Id){

	if(hl1Id){
		var parameters = {in_hl1_id: hl1Id};
		var result = db.executeProcedureManual(GET_ALL_HL2, parameters);
		return db.extractArray(result.out_result);
	}
	return null;

}

function getHl2KpiSummary(hl1Id, userId, isSA){

    if(hl1Id){
        var parameters = {
            in_user_id: userId,
            in_is_super_Admin: isSA ? 1 : 0,
            in_hl1_id: hl1Id
        };
        var result = db.executeProcedureManual(GET_HL2_KPI_SUMMARY, parameters);
        return db.extractArray(result.out_result);
    }
    return null;

}

function getHl2AllocatedBudget(hl2Id, hl3Id) {
	if(hl2Id){
		var rdo = db.executeDecimalManual(spGetHl2AllocatedBudget, {'in_hl2_id': hl2Id, 'in_hl3_id': hl3Id}, 'out_hl2_allocated_budget');
		return rdo;
	}
	return null;
}

function getLevel2ForSearch(userSessionID, isSA, budget_year_id, region_id, subregion_id, limit, offset){
	var parameters = {
		in_user_id: userSessionID
		, in_isSA: isSA
		, in_budget_year_id: budget_year_id
		, in_region_id: region_id
		, in_subregion_id: subregion_id
		, in_limit: limit
		, in_offset: offset
	};
	var list = db.executeProcedure(spGetHl2ForSerach,parameters);

	var result = {};
	result.result = db.extractArray(list.out_result);
	result.total_rows = list.totalRows;
	return result;
}

function getHl2AllowAutomaticBudgetApprovalByHl4Id(l4Id){
    var parameters = {in_hl4_id: l4Id};
    return db.executeScalarManual(GET_HL2_ALLOW_AUTOMATIC_BUDGET_APPROVAL_BY_HL4_ID,parameters,"out_result");
}

function getHl2AllowAutomaticBudgetApprovalByHl5Id(l5Id){
	var parameters = {in_hl5_id: l5Id};
	return db.executeScalarManual(GET_HL2_ALLOW_AUTOMATIC_BUDGET_APPROVAL_BY_HL5_ID,parameters,"out_result");
}

function getHl2ByHl4Id(hl4Id){
    var result = db.executeProcedureManual(GET_HL2_BY_HL4_ID, {'in_hl4_id': hl4Id});
    return db.extractArray(result.out_result)[0];
}

function insertLevel2(budget, acronym, organizationName, implementExecutionLevel, crtRelated, hl1Id, inBudget, allowAutomaticBudgetApproval, userId, subregionId, planningPurposeOptionId, importId, imported){
	var parameters = {};
    parameters.in_user_id = userId;
    parameters.in_hl2_budget_total = budget;
    parameters.in_organization_acronym = acronym;
    parameters.in_organization_name = organizationName;
    parameters.in_implement_execution_level = implementExecutionLevel;
    parameters.in_crt_related = crtRelated || 0;
    parameters.in_hl1_id = hl1Id;
    parameters.in_in_budget = inBudget;
    parameters.in_allow_automatic_budget_approval = allowAutomaticBudgetApproval || 0;
    parameters.in_import_id = importId || null;
    parameters.in_imported = imported || 0;
    parameters.in_subRegion_id = subregionId;
    parameters.in_planning_purpose_option_id = planningPurposeOptionId;

	return db.executeScalarManual(INS_HL2,parameters,"out_hl2_id");
}

function updateLevel2(hl2Id, hl2BudgetTotal, organizationAcronym, organizationName, implementExecutionLevel, crtRelated, inBudget, allowAutomaticBudgetApproval, version, subregionId, planningPurposeOptionId, userId){
	var parameters = {};
	parameters.in_hl2_id = hl2Id;
	parameters.in_modified_user_id = userId;
	parameters.in_hl2_budget_total = hl2BudgetTotal;
	parameters.in_organization_acronym = organizationAcronym;
	parameters.in_organization_name = organizationName;
	parameters.in_implement_execution_level = implementExecutionLevel;
	parameters.in_crt_related = crtRelated || 0;
	parameters.in_in_budget = inBudget;
	parameters.in_allow_automatic_budget_approval = allowAutomaticBudgetApproval || 0;
	parameters.in_version = version;
    parameters.in_subRegion_id = subregionId;
    parameters.in_planning_purpose_option_id = planningPurposeOptionId;
	return db.executeScalarManual(UPD_HL2,parameters,"out_result");
}

function updateBudget(hl2Id,budget,userId) {
    var parameters = {
        in_hl2_id: hl2Id,
        in_updated_budget: budget,
        in_user_id: userId
    };
    return db.executeScalarManual(UPD_HL2_BUDGET, parameters, "out_result");
}

function deleteHl2(hl2Id,modUser){
	var param = {};
	param.in_hl2_id = hl2Id;
	param.in_modified_user_id = modUser;
	return db.executeScalar(DEL_HL2,param,"out_result");
}

//COUNT NUMBER OF HL3 RELATED TO HL2
function countRelatedObjects(hl2Id){
	var parameters = {};
	parameters.in_hl2_id = hl2Id;
	return db.executeScalarManual(COUNT_HL3_BY_HL2_ID,parameters,"out_result");
}

function getHl2ByHl1Id(hl1Id, userId, isSuperAdmin) {
	var parameters = {};
	var result = {};
	parameters.in_hl1_id = hl1Id;
	parameters.in_user_id = userId;
	parameters.in_is_super_Admin = isSuperAdmin ? 1 : 0;
	var list = db.executeProcedureManual(GET_HL2_BY_HL1_ID, parameters);
	result.out_result = db.extractArray(list.out_result);
	result.out_total_budget = list.out_total_budget;
	result.out_remaining_budget = list.out_remaining_budget;
	result.out_total_allocated= list.out_total_allocated;
	return result;
}

function getLobAllocationSummary(hl1Id, userId, isSuperAdmin) {
	var parameters = {};
	var result = {};
	parameters.in_hl1_id = hl1Id;
	parameters.in_user_id = userId;
	parameters.in_is_super_Admin = isSuperAdmin ? 1 : 0;
	var list = db.executeProcedureManual(GET_HL2_ALLOCATION_SUMMARY, parameters);
	return db.extractArray(list.out_result);
}

function updateHl2BudgetStatus(hl2_id, userId, nextStatus){
	var parameters = {"in_hl2_id": hl2_id, "in_status_budget": nextStatus, "in_user_id": userId};
	var rdo = db.executeScalarManual(spUpdateHl2BudgetStatus, parameters, 'out_result');
	return rdo;
}

function getAllHl2VersionByHl2Id(hl2_id){
	var parameters = {'in_hl2_id': hl2_id};
	var result = db.executeProcedureManual(GET_ALL_HL2_VERSION_BY_HL2_ID,parameters);
	return db.extractArray(result.out_result);
}

function insertLevel2Version(hl2Id, version, acronym, description, budget, budgetYearId, crt_related, implement_execution_level, team_type_id, regionId, subregionId ,userId, organization_acronym, organization_name, in_budget,allow_automatic_budget_approval, inPlanningPurposeOptionId, hl1_id){
	var parameters = {};
	parameters.in_hl2_id = hl2Id;
	parameters.in_version = version;
	parameters.in_acronym = acronym;
	parameters.in_description = description;
	parameters.in_budget = budget;
	parameters.in_budget_year_id = budgetYearId;
	parameters.in_region_id = regionId;
	parameters.in_subregion_id = subregionId;
	parameters.in_crt_related = crt_related;
	parameters.in_implement_execution_level = implement_execution_level;
	parameters.in_team_type_id = team_type_id;
	parameters.in_created_user_id = userId;
	parameters.in_organization_acronym = organization_acronym;
	parameters.in_organization_name = organization_name;
	parameters.in_in_budget = in_budget;
	parameters.in_allow_automatic_budget_approval = allow_automatic_budget_approval;
    parameters.in_planning_purpose_option_id = inPlanningPurposeOptionId;
	parameters.in_hl1_id = hl1_id;
	return db.executeScalarManual(INS_HL2_VERSION,parameters,"out_result");
}

function getLevel2VersionForFilter(hl1Id, userSessionID, isSA){
	var parameters = {
		in_hl1_id: hl1Id
		,in_user_id: userSessionID
		, in_is_super_admin: isSA ? 1: 0
	};
	var list = db.executeProcedure(GET_HL2_VERSION_BY_FILTER,parameters);
	return {out_result : db.extractArray(list.out_result)};
}

function getLevel2VersionById(hl2Id, version){
	if(hl2Id && version)
	{
		var parameters = {
			'in_hl2_id': hl2Id
			, 'in_version': version
		};
		var result = db.executeProcedureManual(GET_HL2_VERSION_BY_ID, parameters);
		var list = db.extractArray(result.out_result);
		if(list.length)
			return list[0];
		else
			return {};
	}
	return {};
}
