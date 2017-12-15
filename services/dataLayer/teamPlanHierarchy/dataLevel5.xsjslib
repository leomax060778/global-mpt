/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/

var spGetHl5ByHl4Id = "GET_HL5_BY_HL4_ID";
var spGetHl5ById = "GET_HL5_BY_ID";
var spGetHl5ByAcronym = "GET_HL5_BY_ACRONYM";
var spGetCountHl6ByHl5Id = "GET_COUNT_HL6_BY_HL5_ID";
var spGetCountHl6InCRMByHl5Id = "GET_COUNT_HL6_IN_CRM_BY_HL5_ID";
var spGetHl5StatusByHl5Id = "GET_HL5_STATUS_BY_HL5_ID";
var spGetHl5ForSearch = "GET_HL5_FOR_SEARCH";
var spGetHl5TotalBudgetByHl4Id = "GET_ALL_HL5_TOTAL_BUDGET";
var spGetHl5RemainingBudgetByHl4Id = "GET_ALL_HL5_REMAINING_BUDGET";
var spExistsInCrm = "HL5_EXISTS_IN_CRM";
var spGetHl5MyBudgetByHl5Id = "GET_HL5_BUDGET_BY_ID";
var spGetHl5SalesByHl5Id = "GET_HL5_SALES_BY_ID";
var spGetHl5AllocatedBudget = "GET_HL5_ALLOCATED_BUDGET";
var spGetHl5Category = "GET_HL5_CATEGORY";
var spGetHl5CategoryByHl5CategoryId = "GET_HL5_CATEGORY_BY_HL5_CATEGORY_ID";
var spGET_ALL_MARKETING_PROGRAM = "GET_ALL_MARKETING_PROGRAM";
var spGET_ALL_BUSINESS_OWNER = "GET_ALL_BUSINESS_OWNER";
var spGET_COST_CENTER_BY_HL4_ID_SALE_ORGANIZATION_ID = "GET_COST_CENTER_BY_HL4_ID_SALE_ORGANIZATION_ID";
var spGET_MARKETING_ACTIVITY_HL5 = "GET_MARKETING_ACTIVITY_HL5";
var GET_HL5_BY_USER_ID = 'GET_HL5_BY_USER_ID';
var GET_HL5_BY_USER_ID_ROLE_FILTER = 'GET_HL5_BY_USER_ID_ROLE_FILTER';

/****INSERT*********************/
var spInsHl5Category = "INS_HL5_CATEGORY";
var spInsHl5CrmBinding = "INS_HL5_CRM_BINDING";
var spInsHl5LogStatus = "INS_HL5_LOG_STATUS";
var spInsHl5CategoryOption = "INS_HL5_CATEGORY_OPTION";
var spInsHl5Budget = "INS_HL5_BUDGET";
var spInsHl5BudgetSalesUpload = "INS_HL5_BUDGET_SALES_UPLOAD";
var spInsHl5Sales = "INS_HL5_SALES";
var spInsHl5 = "INS_HL5";
var spInsHl5RequestCategoryOption = 'INS_HL5_REQUEST_CATEGORY_OPTION';

/*****OTHER**********************/
var spHl5ChangeInOutBudget = "HL5_CHANGE_IN_OUT_BUDGET";
var spHl5ChangeStatus = "HL5_CHANGE_STATUS";

/********UPDATE********************/
var spUpdHl5ChangedFields = "UPD_HL5_CHANGED_FIELDS";
var spUpdHl5 = "UPD_HL5";
var spUpdateHl5CategoryOption = "UPD_HL5_CATEGORY_OPTION";
var spUpdateHl5Sale = "UPD_HL5_SALES";

/********DELETE******************/
var spdelHl5Bugdet = "DEL_HL5_BUDGET";
var spdelHl5BugdetHard = "DEL_HL5_BUDGET_HARD";
var spDelHl5ById = "DEL_HL5_BY_ID";
var spDelHl5SalesHard = "DEL_HL5_SALES_HARD";
var spDelHl5RequestCategoryOption = 'DEL_HL5_REQUEST_CATEGORY_OPTION';

var spResetHl5CategoryOptionUpdated = "RESET_HL5_CATEGORY_OPTION_UPDATED";
var GET_HL5_BY_IMPORT_ID = "GET_HL5_BY_IMPORT_ID";
var DEL_HL5_HARD_BY_ID = "DEL_HL5_HARD_BY_ID";
var DEL_HL5_CATEGORY_OPTION_HARD = "DEL_HL5_CATEGORY_OPTION_HARD";
/******************************************************/
var spDelHl5Sales = "DEL_HL5_SALES"
var GET_MULTI_TACTIC_BY_HL5_ID = "GET_MULTI_TACTIC_BY_HL5_ID";

function getMarketingActivityHl5(budgetYearId,currentHl5Id){
	var params = {
			'IN_BUDGET_YEAR_ID': budgetYearId,
			'IN_CURRENT_HL5': currentHl5Id
		};
		var rdo = db.executeProcedureManual(spGET_MARKETING_ACTIVITY_HL5, params);

		return db.extractArray(rdo.out_hl5);
}

function getCostCenterByHl4IdMarketingOrganizationId(hl4Id,saleOrganizationId){
	var params = {
		'in_hl4_id': hl4Id,
		'in_sale_organization_id' : saleOrganizationId
	};
	var rdo = db.executeProcedureManual(spGET_COST_CENTER_BY_HL4_ID_SALE_ORGANIZATION_ID, params);

	return db.extractArray(rdo.out_result);
}

function getAllMarketingProgram(){
	var params = {
	};
	var rdo = db.executeProcedureManual(spGET_ALL_MARKETING_PROGRAM,params);
	return db.extractArray(rdo.output_result);
}

function getAllBusinessOwner(){
	var params = {
	};
	var rdo = db.executeProcedureManual(spGET_ALL_BUSINESS_OWNER,params);
	return db.extractArray(rdo.output_result);
}

function getHl5ByHl4Id(hl4Id){
	var params = {
			'in_hl4_id': hl4Id
		};
	var rdo = db.executeProcedureManual(spGetHl5ByHl4Id,params);
	return db.extractArray(rdo.out_result);
}

function getHl5TotalBudgetByHl4Id(hl4Id) {
	if(hl4Id){
		var rdo = db.executeDecimalManual(spGetHl5TotalBudgetByHl4Id, {'in_hl4_id': hl4Id}, 'out_result');
		return rdo;
	}
	return null;
}

function getHl5MyBudgetByHl5Id(id){
	if(id){
		var rdo = db.executeProcedureManual(spGetHl5MyBudgetByHl5Id,{'in_hl5_id':id});
		return db.extractArray(rdo.out_result);
	}
	return null;
}

function getHl5SalesByHl5Id(id){
	if(id){
		var rdo = db.executeProcedureManual(spGetHl5SalesByHl5Id,{'in_hl5_id':id});
		return db.extractArray(rdo.out_result);
	}
	return null;
}

function getHl5RemainingBudgetByHl4Id(hl4Id, total_budget) {
	var params = { 'in_hl4_id': hl4Id, 'in_total_budget': total_budget };
	
	if(hl4Id){
		var rdo = db.executeDecimalManual(spGetHl5RemainingBudgetByHl4Id, params, 'out_result');
		return rdo;
	}
	return null;
}

function getHl5ById(id){
	if(id != ""){
		var params = {
			'in_hl5_id': id
		};
		var rdo = db.executeProcedureManual(spGetHl5ById,params);
		return db.extractArray(rdo.out_result)[0];
	}
	return null;
}

function getHl5ByAcronym(acronyn, in_hl4_id){
	if(acronyn != ""){
		var params = {
			'in_hl5_acronym': acronyn
			,'in_hl4_id': in_hl4_id
		};
		var rdo = db.executeProcedureManual(spGetHl5ByAcronym,params);
		return db.extractArray(rdo.out_result)[0];
	}
	return null;
}

function getCountHl5Childrens(id){
		var params = {
			'in_hl5_id': id
		};
		return db.executeScalarManual(spGetCountHl6ByHl5Id,params,'out_total_hl6');

}

function getCountHl5ChildrenInCRM(id) {
    var params = {
        'in_hl5_id': id
    };
    return db.executeScalarManual(spGetCountHl6InCRMByHl5Id, params, 'out_total_hl6');
}

function getHl5CategoryByHl5CategoryId(categoryId){
	if(categoryId != ""){
		var params = {
			'in_hl5_category_id': categoryId
		};
		var rdo = db.executeProcedureManual(spGetHl5CategoryByHl5CategoryId,params);
		return db.extractArray(rdo.out_hl5_category)[0];
	}
	return null;
}

function getHl5StatusByHl5Id(id){
	if(id){
		var params = {
			'in_hl5_id': id
		};
		var rdo = db.executeProcedureManual(spGetHl5StatusByHl5Id,params);
		return db.extractArray(rdo.out_result)[0];
	}
	return null;
}

function getHl5ForSearch(budgetYearId, regionId, subRegionId, limit, offset, userSessionID, isSA){
    var parameters = {
        in_budget_year_id: budgetYearId
        , in_region_id: regionId
        , in_subRegion_id: subRegionId
        , in_limit: limit
        , in_offset: offset
        , in_user_id: userSessionID
        , in_isSA: isSA
    };
	var rdo = db.executeProcedureManual(spGetHl5ForSearch,parameters);
	return {result: db.extractArray(rdo.out_result), total_rows: rdo.total_rows};
}

function getAllHl5(){
	throw ErrorLib.getErrors().NotImplemented();
}

function getHl5ByUserId(userId, isSA){
    var params = {'in_user_id': userId, 'in_issa': isSA};
    var rdo = db.executeProcedureManual(GET_HL5_BY_USER_ID,params);
    return db.extractArray(rdo.out_result);
}

function getHl5ByUserIdRoleFilter(userId){
    var params = {'in_user_id': userId};
    var rdo = db.executeProcedureManual(GET_HL5_BY_USER_ID_ROLE_FILTER,params);
    return db.extractArray(rdo.out_result);
}

function insertHl5Category(hl5Id,categoryId,createdUserId,inProcessingReport,autoCommit){
	var params = {
		'in_hl5_id' : hl5Id,
		'in_category_id'  : categoryId,
		'in_created_user_id' : createdUserId,
		'in_in_processing_report' : inProcessingReport
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spInsHl5Category,params,'out_hl5_category_id');
	}else{
		rdo = db.executeScalarManual(spInsHl5Category,params,'out_hl5_category_id');
	}
	return rdo;
}

function insertHl5CRMBinding(data,autoCommit){
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spInsHl5CrmBinding,data,'out_hl5_crm_binding_id');
	}else{
		rdo = db.executeScalarManual(spInsHl5CrmBinding,data,'out_hl5_crm_binding_id');
	}
	return rdo;
}

function insertHl5LogStatus(hl5Id,columnName,userId,autoCommit){
	var params = {
		'in_hl5_id' : hl5Id,
		'in_status_id'  : columnName,
		'in_user_id' : userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spInsHl5LogStatus,params,'out_hl5_log_status_id');
	}else{
		rdo = db.executeScalarManual(spInsHl5LogStatus,params,'out_hl5_log_status_id');
	}
	return rdo;
}

function insertHl5CategoryOption(hl5CategoryId,optionId,amount,createdUserId, updated, autoCommit){
	var params = {
		'in_hl5_category_id' : hl5CategoryId,
		'in_option_id'  : optionId,
		'in_amount' : amount,
		'in_created_user_id' : createdUserId,
		'in_updated': updated
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spInsHl5CategoryOption,params,'out_hl5_category_option_id');
	}else{
		rdo = db.executeScalarManual(spInsHl5CategoryOption,params,'out_hl5_category_option_id');
	}
	return rdo;
}
 
function insertHl5Budget(data,autoCommit){
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spInsHl5Budget,data,'out_hl5_budget_id');
	}else{
		rdo = db.executeScalarManual(spInsHl5Budget,data,'out_hl5_budget_id');
	}
	return rdo;
}

function insertHl5BudgetSalesUpload(hl5Id,organizationId,value,organizationType, description,createdUserId, currencyId,autoCommit){
	var params = {
		'in_hl5_id' : hl5Id,
		'in_organization_id'  : organizationId,
		'in_value' : value,
		'in_organization_type' : organizationType,
		'in_description': description,
		'in_created_user_id': createdUserId,
		'in_currency_id': currencyId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spInsHl5BudgetSalesUpload,params,'out_hl5_budget_sales_id');
	}else{
		rdo = db.executeScalarManual(spInsHl5BudgetSalesUpload,params,'out_hl5_budget_sales_id');
	}
	return rdo;
}

function insertHl5Sale(data,autoCommit){
    var rdo;
    if(autoCommit){
        rdo = db.executeScalar(spInsHl5Sales,data,'out_hl5_sales_id');
    }else{
        rdo = db.executeScalarManual(spInsHl5Sales,data,'out_hl5_sales_id');
    }
    return rdo;
}

function insertHl5RequestCategoryOption(data){
    return db.executeScalarManual(spInsHl5RequestCategoryOption,data,'out_result');
}

function insertHl5(hl5CrmDescription,acronym,distributionChannelId,budget,hl4Id
	,campaignObjectiveId,campaignTypeId,campaignSubTypeId,marketingProgramId,marketingActivityId
	,actualStartDate,actualEndDate,showOnDgCalendar,businessOwnerId,employeeResponsibleId,costCenterId, inBudget
	,budgetSpendQ1,budgetSpendQ2,budgetSpendQ3,budgetSpendQ4,euroConversionId,hl5StatusDetailId,createdUserId,
				   route_to_market,venue	,city	,country,url, marketingOrganization
	,planned_start_date,planned_end_date,street,postal_code
	, region
	, event_owner
	, number_of_participants
	, priority_id,co_funded,allow_budget_zero, is_power_user,emploreeResponsible, person_responsible, is_complete, multiTactic, autoCommit, imported, import_id
	){
	var params = {
		'in_hl5_crm_description' : hl5CrmDescription,
		'in_acronym' : acronym,
		'in_distribution_channel_id' : distributionChannelId,
		'in_budget' : budget,
		'in_hl4_id' : hl4Id,

		'in_campaign_objective_id' : campaignObjectiveId ? campaignObjectiveId:null,
		'in_campaign_type_id' : campaignTypeId?campaignTypeId:null,
		'in_campaign_subtype_id' : campaignSubTypeId?campaignSubTypeId:null,
		'in_marketing_program_id' : marketingProgramId?marketingProgramId:null,
		'in_marketing_activity_id' : marketingActivityId?marketingActivityId:null,

		'in_actual_start_date' : actualStartDate?actualStartDate:null,
		'in_actual_end_date' : actualEndDate?actualEndDate:null,
		'in_show_on_dg_calendar' : showOnDgCalendar?1:0,
		'in_business_owner_id' : businessOwnerId?businessOwnerId:null,
		'in_employee_responsible_id' : employeeResponsibleId?employeeResponsibleId:null,
		'in_cost_center_id' : costCenterId?costCenterId:null,

		'in_in_budget' : inBudget,
		'in_budget_spend_q1' : budgetSpendQ1,
		'in_budget_spend_q2' : budgetSpendQ2,
		'in_budget_spend_q3' : budgetSpendQ3,
		'in_budget_spend_q4' : budgetSpendQ4,
		'in_euro_conversion_id' : euroConversionId,
		'in_hl5_status_detail_id' : hl5StatusDetailId,
		'in_created_user_id' : createdUserId,

		 'in_route_to_market' : route_to_market ? route_to_market : null,
		 'in_venue': venue?venue:"",
		 'in_city': city?city:"",
		 'in_country': country?country:"",
		 'in_url': url?url:"",
		'in_sales_organization' : marketingOrganization?marketingOrganization:null
		,'in_planned_start_date' : planned_start_date
		,'in_planned_end_date' : planned_end_date
		,'in_street' : street ? street : ""
		,'in_postal_code' : postal_code ? postal_code : ""
		, 'in_region': region || ''
		, 'in_event_owner': event_owner || ''
		, 'in_number_of_participants': number_of_participants || ''
		, 'in_priority_id': priority_id
		, 'in_imported': imported ? imported : 0
		, 'IN_IMPORT_ID' : import_id ? import_id : null
		, 'in_co_funded': Number(co_funded) || 0
		, 'in_allow_budget_zero': allow_budget_zero ? allow_budget_zero : 0
		, 'in_is_power_user': is_power_user && Number(is_power_user) ? is_power_user : 1
		, 'in_employee_responsible_user': emploreeResponsible || null
		, 'in_person_responsible' : person_responsible || null
		, 'in_is_complete': is_complete
		, 'in_multi_tactic': multiTactic ? 1:0
	};

	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spInsHl5,params,'out_hl5_id');
	}else{
		rdo = db.executeScalarManual(spInsHl5,params,'out_hl5_id');
	}
	return rdo;
}

//autoCommit = false then executeScalarManual else executeScalar.
function updateHl5BudgetStatus(hl5Id, budgetStatus, autoCommit){
	var params = {
		'in_hl5_id' : hl5Id,
		'in_budget_status'  : budgetStatus
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spHl5ChangeInOutBudget,params,'out_result');
	}else{
		rdo = db.executeScalarManual(spHl5ChangeInOutBudget,params,'out_result');
	}
	return rdo;
}

//autoCommit = false then executeScalarManual else executeScalar.
function changeStatusHl5(hl5Id, statusId,userId, autoCommit){
	var params = {
		'in_hl5_id' : hl5Id,
		'in_status_id'  : statusId,
		'in_user_id': userId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spHl5ChangeStatus,params,'out_result');
	}else{
		rdo = db.executeScalarManual(spHl5ChangeStatus,params,'out_result');
	}
	return rdo;
}

//autoCommit = false then executeScalarManual else executeScalar.
function updHl5ChangedFields(data, autoCommit){
	/*var params = {
		'in_hl5_crm_binding_id' : hl5CrmBindingId,
		'in_hl5_id'  : hl5Id,
		'in_column_name': columnName,
		'in_changed' : changed,
		'in_user_id':userId,
		'in_display_name' : displayName
	};
	*/
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spUpdHl5ChangedFields,data,'out_result');
	}else{
		rdo = db.executeScalarManual(spUpdHl5ChangedFields,data,'out_result');
	}
	return rdo;
}

//autoCommit = false then executeScalarManual else executeScalar.
function updateHl5(hl5Id,hl5CrmDescription,inAcronym,distributionChannelId,budget,hl4Id,
							 campaignObjectiveId,campaignTypeId,campaignSubTypeId,marketingProgramId,marketingActivityId,
							 actualStartDate,actualEndDate,showOnDgCalendar,businessOwnerId,employeeResponsibleId,costCenterId,
							 inBudget,budgetSpendQ1,budgetSpendQ2,budgetSpendQ3,budgetSpendQ4,euroConversionId,
							 hl5StatusDetailId,createdUserId, route_to_market,venue	,city	,country,url, marketingOrganizationId
							,planned_start_date,planned_end_date,street,postal_code
	, region
	, event_owner
	, number_of_participants
	, priority_id,co_funded, allow_budget_zero, is_power_user,employee_responsible_user,person_responsible, is_complete
				   ,multiTactic,autoCommit){
	var params = {
		'in_hl5_id' : hl5Id,
		'in_hl5_crm_description' : hl5CrmDescription,
		'in_acronym' : inAcronym,
		'in_distribution_channel_id' :distributionChannelId,
		'in_hl5_budget' : budget,
		'in_hl4_id' : hl4Id,

		'in_campaign_objective_id' : campaignObjectiveId,
		'in_campaign_type_id' : campaignTypeId,
		'in_campaign_subtype_id' : campaignSubTypeId,
		'in_marketing_program_id' : marketingProgramId ? marketingProgramId : null,
		'in_marketing_activity_id' : marketingActivityId?marketingActivityId:null,
		'in_actual_start_date' : actualStartDate,
		'in_actual_end_date' : actualEndDate,
		'in_show_on_dg_calendar' : showOnDgCalendar?1:0,
		'in_business_owner_id' : businessOwnerId?businessOwnerId:null,
		'in_employee_responsible_id' : employeeResponsibleId?employeeResponsibleId:null,
		'in_cost_center_id' : costCenterId?costCenterId:null,

		'in_in_budget' : inBudget,
		'in_budget_spend_q1' : budgetSpendQ1,
		'in_budget_spend_q2' : budgetSpendQ2,
		'in_budget_spend_q3' : budgetSpendQ3,
		'in_budget_spend_q4' : budgetSpendQ4,
		'in_euro_conversion_id' : euroConversionId,
		'in_hl5_status_detail_id' : hl5StatusDetailId,
		'in_modified_user_id' : createdUserId,
		'in_route_to_market' : route_to_market ,
		'in_venue': venue?venue:"",
		'in_city': city?city:"",
		'in_country': country?country:"",
		'in_url': url?url:"",
		'in_sales_organization_id' : marketingOrganizationId?marketingOrganizationId:null
		,'in_planned_start_date' : planned_start_date
		,'in_planned_end_date' : planned_end_date
		,'in_street' : street ? street : ""
		,'in_postal_code' : postal_code ? postal_code : ""
		, 'in_region': region || ''
		, 'in_event_owner': event_owner || ''
		, 'in_number_of_participants': number_of_participants || ''
		, 'in_priority_id': priority_id
		, 'in_co_funded': co_funded ? co_funded : 0
		, 'in_allow_budget_zero': allow_budget_zero ? allow_budget_zero : 0
		, 'in_is_power_user': is_power_user && Number(is_power_user) ? is_power_user : 1
		 , 'in_employee_responsible_user' : employee_responsible_user
		, 'in_person_responsible' : person_responsible
        , 'in_is_complete': is_complete
		, 'in_multi_tactic': multiTactic ? 1:0

	};

	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spUpdHl5,params,'out_result');
	}else{
		rdo = db.executeScalarManual(spUpdHl5,params,'out_result');
	}
	return rdo;
}

function updateHl5CRMBinding(data){

	/*
	var parameters = {
		"in_hl5_crm_binding_id": hl5CrmBindingId,
		"in_hl5_id": hl5_id,
		"in_column_name": column_name,
		"in_changed": changed,
		"in_user_id": user_id,
		"in_display_name": display_name
	};
	*/

	var rdo = db.executeScalarManual(spUpdHl5ChangedFields, data, 'out_result');
	return rdo;
}

function updateHl5CategoryOption(hl5CategoryId, optionId, amount, userId, updated){
	var parameters = {
		"in_hl5_category_id": hl5CategoryId,
		"in_option_id": optionId,
		"in_amount": amount,
		"in_user_id": userId,
		"in_updated": updated
	};
	var rdo = db.executeScalarManual(spUpdateHl5CategoryOption, parameters, 'out_result');
	return rdo;
}

function updateHl5Sale(hl5Sales){
    var rdo = db.executeScalarManual(spUpdateHl5Sale, hl5Sales, 'out_result');
    return rdo;
}

//autoCommit = false then executeScalarManual else executeScalar.
function delHl5Budget(hl5BudgetId, modifiedUserId, autoCommit){
	var params = {
		'in_hl5_budget_id' : hl5BudgetId,
		'in_modified_user_id'  : modifiedUserId
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spdelHl5Bugdet,params,'out_result');
	}else{
		rdo = db.executeScalarManual(spdelHl5Bugdet,params,'out_result');
	}
	return rdo;
}

function delHl5BudgetHard(hl5Id, autoCommit){
	var params = {
		'in_hl5_id' : hl5Id
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spdelHl5BugdetHard,params,'out_result');
	}else{
		rdo = db.executeScalarManual(spdelHl5BugdetHard,params,'out_result');
	}
	return rdo;
}

function delHl5SaleHard(hl5Id, autoCommit){
	var params = {
		'in_hl5_id' : hl5Id
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(spDelHl5SalesHard,params,'out_result');
	}else{
		rdo = db.executeScalarManual(spDelHl5SalesHard,params,'out_result');
	}
	return rdo;
}

function hl5ExistsInCrm(hl5Id) {
	if(hl5Id){
		return db.executeScalarManual(spExistsInCrm, {'in_hl5_id': hl5Id}, 'out_result');
	}
	return null;
}

function hl5ChangeStatus(){
	throw ErrorLib.getErrors().NotImplemented();
}

function getDistributionChannel(){
	throw ErrorLib.getErrors().NotImplemented();
}

function getDistributionChannelByL5Id(distributionChannelId){
	if(distributionChannelId){
		var params = {
			'in_distribution_channel_id': distributionChannelId
		};
		var rdo = db.executeProcedureManual(spGetDistributionChannelById,params);
		return db.extractArray(rdo.out_result)[0];
	}
	return null;
}

function deleteHl5(hl5Id, userId){
	if(hl5Id){
		return db.executeScalarManual(spDelHl5ById, {'in_hl5_id': hl5Id, 'in_modified_user_id': userId}, 'out_result');
	}
	return null;
}

function deleteHl5Sale(hl5Id, userId){
	if(hl5Id){
		return db.executeScalarManual(spDelHl5Sales, {'in_hl5_id': hl5Id, 'in_modified_user_id': userId}, 'out_result');
	}
	return null;
}

function deleteHl5Budget(hl5Id, userId){
	if(hl5Id){
		return db.executeScalarManual(spdelHl5Bugdet, {'in_hl5_id': hl5Id, 'in_modified_user_id': userId}, 'out_result');
	}
	return null;
}

function deleteHl5RequestCategoryOption(hl5Id, userId){
    var params = {'in_hl5_id': hl5Id, 'in_user_id': userId};
    return db.executeScalar(spDelHl5RequestCategoryOption,params,'out_result');
}

function getHl5AllocatedBudget(hl5Id, hl6Id) {
	if(hl5Id){
		var rdo = db.executeDecimalManual(spGetHl5AllocatedBudget
					, {'in_hl5_id': hl5Id, 'in_hl6_id': hl6Id}, 'out_hl5_allocated_budget');
		return rdo;
	}
	return null;
}

function resetHl5CategoryOptionUpdated(hl5CategoryId, userId){
	if(hl5CategoryId){
		var params = {
			'in_hl5_category_id' : hl5CategoryId,
			'in_user_id'  : userId
		};
		var rdo = db.executeScalarManual(spResetHl5CategoryOptionUpdated,params,'out_result');
		return rdo;
	}
	return null;
}

function getHl5ByImportId(importId){
	var params = {
		'in_import_id': importId
	};
	var rdo = db.executeProcedureManual(GET_HL5_BY_IMPORT_ID,params);
	return db.extractArray(rdo.out_result);
}

function delHl5Hard(hl5Id, autoCommit){
	var params = {
		'in_hl5_id' : hl5Id
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(DEL_HL5_HARD_BY_ID,params,'out_result');
	}else{
		rdo = db.executeScalarManual(DEL_HL5_HARD_BY_ID,params,'out_result');
	}
	return rdo;
}

function delHl5CategoryOptionHl5Hard(hl5Id, autoCommit){
	var params = {
		'in_hl5_id' : hl5Id
	};
	var rdo;
	if(autoCommit){
		rdo = db.executeScalar(DEL_HL5_CATEGORY_OPTION_HARD,params,'out_result');
	}else{
		rdo = db.executeScalarManual(DEL_HL5_CATEGORY_OPTION_HARD,params,'out_result');
	}
	return rdo;
}

function getMultiTacticById(hl5_id){
    var params = {
        'in_hl5_id': hl5_id
    };
    var rdo = db.executeProcedureManual(GET_MULTI_TACTIC_BY_HL5_ID,params);
    return db.extractArray(rdo.out_result);
}