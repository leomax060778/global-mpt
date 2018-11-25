/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
//STORE PROCEDURE LIST NAME
var GET_ALL_DYNAMIC_FORM = "GET_ALL_DYNAMIC_FORM";
var GET_ALL_DYNAMIC_FORM_DETAILED = "GET_ALL_DYNAMIC_FORM_DETAILED";
var GET_DYNAMIC_FORM_BY_ID = "GET_DYNAMIC_FORM_BY_ID";
var GET_DYNAMIC_FORM_BY_UID = "GET_DYNAMIC_FORM_BY_UID";
var GET_DYNAMIC_FORM_DETAILED_BY_ID = "GET_DYNAMIC_FORM_DETAILED_BY_ID";
var GET_DYNAMIC_FORM_DETAILED_BY_UID = "GET_DYNAMIC_FORM_DETAILED_BY_UID";
var GET_DEFAULT_DYNAMIC_FORM = "GET_DEFAULT_DYNAMIC_FORM";
var GET_ALL_DYNAMIC_FORM_FIELDS_BY_LEVEL = "GET_ALL_DYNAMIC_FORM_FIELDS_BY_LEVEL";
var GET_COUNT_HL_BY_DYNAMIC_FORM_ID = "GET_COUNT_HL_BY_DYNAMIC_FORM_ID";
var GET_COUNT_ROLE_BY_DYNAMIC_FORM_ID = "GET_COUNT_ROLE_BY_DYNAMIC_FORM_ID";
var GET_DYNAMIC_FORM_BY_NAME = "GET_DYNAMIC_FORM_BY_NAME";

var INS_DYNAMIC_FORM_DEFAULT_VALUE = "INS_DYNAMIC_FORM_DEFAULT_VALUE";
var INS_DYNAMIC_FORM_TAB = "INS_DYNAMIC_FORM_TAB";
var INS_DYNAMIC_FORM = "INS_DYNAMIC_FORM";
var INS_DYNAMIC_FORM_ROLE = "INS_DYNAMIC_FORM_ROLE";
var INS_DYNAMIC_FORM_ALLOCATIONS = "INS_DYNAMIC_FORM_ALLOCATIONS";
var INS_DYNAMIC_FORM_MY_BUDGET_REGION = "INS_DYNAMIC_FORM_MY_BUDGET_REGION";
var INS_DYNAMIC_FORM_UID = "INS_DYNAMIC_FORM_UID";

var UPD_DEFAULT_DYNAMIC_FORM = "UPD_DEFAULT_DYNAMIC_FORM";
var UPD_DYNAMIC_FORM_ASSOCIATION_HL2 = "UPD_DYNAMIC_FORM_ASSOCIATION_HL1";
var UPD_DYNAMIC_FORM = "UPD_DYNAMIC_FORM";
var UPD_DYNAMIC_FORM_BY_ROLE = "UPD_DYNAMIC_FORM_BY_ROLE";

var DEL_HARD_DYNAMIC_FORM = "DEL_HARD_DYNAMIC_FORM";
var DEL_DYNAMIC_FORM = "DEL_DYNAMIC_FORM";
var DEL_DYNAMIC_FORM_ROLE_BY_BUDGET_YEAR_ID = "DEL_DYNAMIC_FORM_ROLE_BY_BUDGET_YEAR_ID";


/*************** GET ***************/

function getAllDynamicForm() {
    var parsedResult = {};
    var result = db.executeProcedureManual(GET_ALL_DYNAMIC_FORM, {});

    parsedResult.DYNAMIC_FORM_HL1 = db.extractArray(result.dynamic_form_hl1);
    parsedResult.DYNAMIC_FORM_HL2 = db.extractArray(result.dynamic_form_hl2);
    parsedResult.DYNAMIC_FORM_HL3 = db.extractArray(result.dynamic_form_hl3);
    parsedResult.DYNAMIC_FORM_HL4 = db.extractArray(result.dynamic_form_hl4);
    parsedResult.DYNAMIC_FORM_HL5 = db.extractArray(result.dynamic_form_hl5);
    parsedResult.DYNAMIC_FORM_HL6 = db.extractArray(result.dynamic_form_hl6);

    return parsedResult;
}

function getAllDynamicFormDetailed() {
    var parsedResult = {};
    var result = db.executeProcedureManual(GET_ALL_DYNAMIC_FORM_DETAILED, {});
    parsedResult.DYNAMIC_FORMS = db.extractArray(result.dynamic_forms);
    parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL = db.extractArray(result.dynamic_forms_fields_detail);
    parsedResult.DYNAMIC_FORMS_ALLOCATION_DETAIL = db.extractArray(result.dynamic_forms_allocation_detail);
    return parsedResult;
}

function getDefaultDynamicForm() {
    var result = db.executeProcedureManual(GET_DEFAULT_DYNAMIC_FORM, {});
    return db.extractArray(result.OUT_RESULT);
}

function getDynamicFormById(formId) {
    var result = db.executeProcedureManual(GET_DYNAMIC_FORM_BY_ID, {in_dynamic_form_id: formId});
    if (result.length)
        return result[0];
    return null;
}

function getDynamicFormByUId(formId) {
    var result = db.executeProcedureManual(GET_DYNAMIC_FORM_BY_UID, {in_dynamic_form_uid: formId});
    var list = db.extractArray(result.out_result);
    if (list.length)
        return list[0];
    return null;
}

function getDynamicFormDetailedById(formId, levelId) {
    var parsedResult = {};
    var parameters = {};
    parameters.in_dynamic_form_id = formId;
    parameters.in_hierarchy_level_id = levelId;
    var result = db.executeProcedureManual(GET_DYNAMIC_FORM_DETAILED_BY_ID, parameters);
    parsedResult.DYNAMIC_FORMS = db.extractArray(result.dynamic_forms);
    parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL = db.extractArray(result.dynamic_forms_fields_detail);
    parsedResult.DYNAMIC_FORMS_ALLOCATION_DETAIL = db.extractArray(result.dynamic_forms_allocation_detail);
    parsedResult.TAB_NAME = db.extractArray(result.tab_name);
    parsedResult.DYNAMIC_FORM_MY_BUDGET = db.extractArray(result.my_budget_distribution);
    return parsedResult;
}

function getDynamicFormDetailedByUid(formUid, levelId) {
    var parsedResult = {};
    var parameters = {};
    parameters.in_dynamic_form_uid = formUid;
    parameters.in_hierarchy_level_id = levelId;
    var result = db.executeProcedureManual(GET_DYNAMIC_FORM_DETAILED_BY_UID, parameters);
    parsedResult.DYNAMIC_FORMS = db.extractArray(result.dynamic_forms);
    parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL = db.extractArray(result.dynamic_forms_fields_detail);
    parsedResult.DYNAMIC_FORMS_ALLOCATION_DETAIL = db.extractArray(result.dynamic_forms_allocation_detail);
    parsedResult.TAB_NAME = db.extractArray(result.tab_name);
    parsedResult.DYNAMIC_FORM_MY_BUDGET = db.extractArray(result.my_budget_distribution);
    return parsedResult;
}

function getAllDynamicFormFieldsByLevel(level) {
    var parsedResult = {};
    var result = db.executeProcedureManual(GET_ALL_DYNAMIC_FORM_FIELDS_BY_LEVEL, {in_hierarchy_level_id: level});
    parsedResult.DYNAMIC_FIELDS = db.extractArray(result.OUT_FIELDS);
    parsedResult.TAB_NAME = db.extractArray(result.OUT_TABS);
    return parsedResult;
}

function getDynamicFormByName(description, hierarchy_level_id) {
    var parameters = {'in_description': description, 'in_hierarchy_level_id': hierarchy_level_id};
    var list = db.executeProcedureManual(GET_DYNAMIC_FORM_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if (result.length)
        return result[0];
    return null;
}

function countDynamicFormRelatedLevel(dynamic_form_uid, hierarchy_level_id) {
    var parameters = {};
    parameters.in_dynamic_form_uid = dynamic_form_uid;
    parameters.in_hierarchy_level_id = hierarchy_level_id;
    return db.executeScalarManual(GET_COUNT_HL_BY_DYNAMIC_FORM_ID, parameters, "out_result");
}

function countDynamicFormRelatedRole(dynamic_form_uid) {
    var parameters = {};
    parameters.in_dynamic_form_uid = dynamic_form_uid;
    return db.executeScalarManual(GET_COUNT_ROLE_BY_DYNAMIC_FORM_ID, parameters, "out_result");
}

/*************** INSERT ***************/

function insertDynamicFormDefaultValue(dynamicFormDefaultValue, userId, isLegacyParent) {
    var rdo;
    rdo = db.executeScalarManual(INS_DYNAMIC_FORM_DEFAULT_VALUE, {
        dynamic_form_default_value_table: dynamicFormDefaultValue,
        in_user_id: userId
    }, 'dynamic_form_default_value_id');
    return rdo;
}

function insertDynamicFormTab(dynamicFormTab, userId) {
    return db.executeScalarManual(INS_DYNAMIC_FORM_TAB, {
        dynamic_form_tab_table: dynamicFormTab,
        in_user_id: userId
    }, 'out_result');
}

function insertDynamicForm(defaultForm, description, hierarchy_level_id, userId) {
    var dynamicForm = {};
    dynamicForm.in_default_form = Number(defaultForm);
    dynamicForm.in_description = description;
    dynamicForm.in_hierarchy_level_id = hierarchy_level_id;
    dynamicForm.in_created_user_id = userId;

    var rdo;
    rdo = db.executeScalarManual(INS_DYNAMIC_FORM, dynamicForm, 'out_result');
    return rdo;
}

function insertDynamicFormByUid(defaultForm, description, hierarchy_level_id, dynamic_form_uid, userId) {
    var dynamicForm = {};
    dynamicForm.in_default_form = Number(defaultForm);
    dynamicForm.in_description = description;
    dynamicForm.in_hierarchy_level_id = hierarchy_level_id;
    dynamicForm.in_dynamic_form_uid = dynamic_form_uid;
    dynamicForm.in_created_user_id = userId;

    var rdo;
    rdo = db.executeScalarManual(INS_DYNAMIC_FORM_UID, dynamicForm, 'out_result');
    return rdo;
}

function insertDynamicFormAllocation(dynamicFormAllocations, userId) {
    var rdo;
    rdo = db.executeScalarManual(INS_DYNAMIC_FORM_ALLOCATIONS, {
        dynamic_form_allocations_table: dynamicFormAllocations,
        in_user_id: userId
    }, 'out_result');
    return rdo;
}

function insertDynamicFormMyBudget(dynamicFormMyBudget, userId) {
    var rdo;
    rdo = db.executeScalarManual(INS_DYNAMIC_FORM_MY_BUDGET_REGION, {
        dynamic_form_my_budget_table: dynamicFormMyBudget,
        in_user_id: userId
    }, 'out_result');
    return rdo;
}

function createDynamicFormByRole(data, userId) {
    var parameters = {};

    parameters.in_dynamic_form_hl_id = data.DYNAMIC_FORM_ID;
    parameters.in_role_id = data.ROLE_ID;
    parameters.in_budget_year_id = data.BUDGET_YEAR_ID;

    parameters.in_created_user_id = userId;

    return db.executeScalarManual(INS_DYNAMIC_FORM_ROLE, parameters, 'out_result');

}

/*************** UPDATE ***************/

function updateDynamicForm(dynamicFormId, defaultForm, description, userId) {
    var dynamicForm = {};
    dynamicForm.IN_DYNAMIC_FORM_ID = dynamicFormId;
    dynamicForm.in_default_form = Number(defaultForm);
    dynamicForm.in_description = description;
    dynamicForm.in_modified_user_id = userId;
    return db.executeScalarManual(UPD_DYNAMIC_FORM, dynamicForm, 'out_result');
}

function updateDynamicFormByRole(data, userId) {
    var parameters = {};

    parameters.in_dynamic_form_hl_id = data.DYNAMIC_FORM_ID;
    parameters.in_dynamic_form_role_id = data.DYNAMIC_FORM_ROLE_ID;
    parameters.in_budget_year_id = data.BUDGET_YEAR_ID;

    parameters.in_modified_user_id = userId;

    return db.executeScalarManual(UPD_DYNAMIC_FORM_BY_ROLE, parameters, 'out_result');
}

function cleanDefaultDynamicForm(hierarchy_level_id, userId) {
    var param = {};
    param.in_hierarchy_level_id = hierarchy_level_id;
    param.in_modified_user_id = userId;
    return db.executeScalarManual(UPD_DEFAULT_DYNAMIC_FORM, param, 'out_result');
}

function asociateDefaultFormToHL1(old_dynamic_form_uid, new_dynamic_form_uid, hierarchy_level_id, userId) {
    var parameters = {};
    parameters.in_old_dynamic_form_uid = old_dynamic_form_uid;
    parameters.in_new_dynamic_form_uid = new_dynamic_form_uid;
    parameters.in_hierarchy_level_id = hierarchy_level_id;
    parameters.in_modified_user_id = userId;
    return db.executeScalarManual(UPD_DYNAMIC_FORM_ASSOCIATION_HL2, parameters, "out_result");
}

/*************** DELETE ***************/

function softDeleteDynamicForm(formUid, userId, deleteDynamicForm) {
    var param = {};
    param.in_dynamic_form_uid = formUid;
    param.in_modified_user_id = userId;
    param.in_delete_dynamic_form = deleteDynamicForm || 0;
    return db.executeScalarManual(DEL_DYNAMIC_FORM, param, 'out_result');
}

function hardDeleteDynamicForm(formUid, userId) {
    var param = {};
    param.in_dynamic_form_uid = formUid;
    param.in_modified_user_id = userId;
    return db.executeScalarManual(DEL_HARD_DYNAMIC_FORM, param, 'out_result');
}

function deleteDynamicFormRoleByBudgetYearId(budgetYearId, userId){
    var params = {};
    params.in_budget_year_id = budgetYearId;
    params.in_modified_user_id = userId;

    return db.executeScalarManual(DEL_DYNAMIC_FORM_ROLE_BY_BUDGET_YEAR_ID, params, 'out_result');
}