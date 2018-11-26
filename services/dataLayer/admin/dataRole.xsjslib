$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ***********END INCLUDE LIBRARIES*************** */

// STORE PROCEDURE LIST NAME
var GET_ALL_ROLE = "GET_ALL_ROLE";
var GET_ROLE_BY_ID = "GET_ROLE_BY_ROLE_ID";
var GET_ASSOCIATED_FORM_BY_ROLE_ID_LEVEL = "GET_ASSOCIATED_FORM_BY_ROLE_ID_LEVEL";
var GET_ASSOCIATED_FORM_BY_ROLE_ID_BUDGET_YEAR_ID_LEVEL = "GET_ASSOCIATED_FORM_BY_ROLE_ID_BUDGET_YEAR_ID_LEVEL";

function getAllRole() {

	var parameters = {};
	var result = db.executeProcedure(GET_ALL_ROLE, {});
	return db.extractArray(result.out_result);
}

function getRoleById(roleId) {
	var param = {};
	param.in_role_id = roleId;

	var rdo = db.executeProcedure(GET_ROLE_BY_ID, param);
	return db.extractArray(rdo.out_result);
}

function getDynamicFormAssociatedByRoleId(levelString, userRole){
	var parameters = {
		in_level: levelString,
		in_role_id: userRole
	};

	var list = db.executeProcedureManual(GET_ASSOCIATED_FORM_BY_ROLE_ID_LEVEL, parameters);
	return db.extractArray(list.out_result)[0];
}

function getDynamicFormAssociatedByRoleIdBudgetYearId(levelString, userRole, budgetYearId){
	var parameters = {
		in_level: levelString,
		in_role_id: userRole,
		in_budget_year_id: budgetYearId
	};

	var list = db.executeProcedureManual(GET_ASSOCIATED_FORM_BY_ROLE_ID_BUDGET_YEAR_ID_LEVEL, parameters);
	return db.extractArray(list.out_result)[0];
}
