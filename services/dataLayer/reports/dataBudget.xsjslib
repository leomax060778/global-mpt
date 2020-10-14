$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var userbl = mapper.getUser();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_REP_HL4_BASIC = "GET_REP_HL4_BASIC";
var GET_REP_HL4_COMPLETE = "GET_REP_HL4_COMPLETE";
var GET_HL4_BUDGET_GLOBAL = "GET_HL4_BUDGET_GLOBAL";
var GET_PLAN_BY_USER = "GET_PLAN_BY_USER";

function getHl4ByFilter(arrPlan, arrRegion, arrBudgetYear, isSA, userId) {	
	var parameters = {};

	parameters.in_filter = getBudgetDistributionReportFilter(arrPlan, arrRegion, arrBudgetYear);
	parameters.in_isSA = isSA;
	parameters.in_user_id = userId;

	return db.executeProcedure(GET_REP_HL4_BASIC, parameters);
}

function getBudgetDistributionReport(arrPlan, arrRegion, arrBudgetYear, isSA, userId){
	var params = {};
	params.in_filter = getBudgetDistributionReportCompleteFilter(arrPlan, arrRegion, arrBudgetYear);
	params.in_isSA = isSA;
	params.in_user_id = userId;

	var result = db.executeProcedure(GET_REP_HL4_COMPLETE, params)
	return {
		out_result : db.extractArray(result.out_result),
		out_attributes: db.extractArray(result.out_attributes),
		region_name: db.extractArray(result.out_result_rg_name)
	};
}

function getPlansUser(userId){
	var user = userbl.getUserById(userId);
	var isSuperAdmin = false;
	 
	if(user && user[0]['ROLENAME'] === 'SuperAdmin' ) {
		isSuperAdmin = true;
	}
	
	var arrPlanUser = [];
	if(!isSuperAdmin){
		var predicate = {};
		predicate.in_filter = " USER_ID = " + userId;
		var list = db.executeProcedure(GET_PLAN_BY_USER, predicate);
		var arrObj = db.extractArray(list.out_result);
		arrObj.forEach(function(obj){
			arrPlanUser.push(obj["HL2_ID"])	
		});
	}
	return arrPlanUser;
}

function getBudgetGlobalTeamByHl4(hl4Id) {
	if (hl4Id) {
		var filter = "HL4_ID = " + hl4Id;
		var rdo = db.executeProcedure(GET_HL4_BUDGET_GLOBAL, {
			'in_filter' : filter
		});
		return db.extractArray(rdo.out_result);
	}
	return null;
}

function getBudgetDistributionReportFilter(arrPlan, arrRegion, arrBudgetYear){
	var strPlans = "";
	if (arrPlan.length > 0)
		strPlans = arrPlan.join("','");

	var strRegion = "";
	if (arrRegion.length > 0)
		strRegion = arrRegion.join(",");

	var strBudgetYear = "";
	if (arrBudgetYear.length > 0)
		strBudgetYear = arrBudgetYear.join(",");

	var filter = " 1 = 1 ";

	if (strPlans !== "") {
		filter = filter + " AND PLAN in ('" + strPlans + "') ";
	}

	if (strRegion !== "") {
		filter = filter + " AND REGION_ID in (" + strRegion + ") ";
	}

	if (strBudgetYear !== "") {
		filter = filter + " AND BUDGET_YEAR_ID in (" + strBudgetYear + ") ";
	}

	return filter;
}

function getBudgetDistributionReportCompleteFilter(arrPlan, arrRegion, arrBudgetYear){
	var strPlans = "";
	if (arrPlan.length > 0)
		strPlans = arrPlan.join("','");

	var strRegion = "";
	if (arrRegion.length > 0)
		strRegion = arrRegion.join(",");

	var strBudgetYear = "";
	if (arrBudgetYear.length > 0)
		strBudgetYear = arrBudgetYear.join(",");

	var filter = " 1 = 1 ";

	if (strPlans !== "") {
		filter = filter + " AND HL1_ACRONYM in ('" + strPlans + "') ";
	}

	if (strRegion !== "") {
		filter = filter + " AND REGION_ID in (" + strRegion + ") ";
	}

	if (strBudgetYear !== "") {
		filter = filter + " AND BUDGET_YEAR_ID in (" + strBudgetYear + ") ";
	}

	return filter;
}
