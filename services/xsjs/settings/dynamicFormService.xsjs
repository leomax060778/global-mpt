/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blDynamicForm = mapper.getDynamicFormLib();

/** *************************************** */

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete,
        false, "", true);
}

function handleGet(parameters, userSessionID) {
    var params = httpUtil.getJSONParameters();
    var result;
    var level;
    switch (params.METHOD) {
        case 'GET_ALL_DYNAMIC_FORM':
            result = blDynamicForm.getAllDynamicForm(userSessionID);
            break;
        case 'GET_DYNAMIC_FORM_DETAILED_BY_ID':
            var formUid = params.FORM_UID;
            level = params.LEVEL;
            result = blDynamicForm.getDynamicFormFieldsById(level, formUid, false, false, true);
            break;
        /********** This service is not in use ***********/
        case 'GET_DYNAMIC_FORM_DETAILED_BY_TEAM':
            level = params.LEVEL;
            var parentId = params.PARENT_ID;
            result = blDynamicForm.getFormByParentId(parentId, level, null, true);
            break;
        /*************************************************/
        case 'CHECK_DELETE':
            var formUId = params.FORM_UID;
            level = params.LEVEL;
            result = blDynamicForm.getValidationBeforeDelete(formUId, level);
            break;
        case 'GET_ALL_DYNAMIC_FORMS_AND_ROLES':
            result = blDynamicForm.getAllDynamicFormAndRols();
            break;
        case 'GET_ALL_DYNAMIC_FORMS_AND_ROLES_BY_BUDGET_YEAR_ID':
            var budgetYearId = params.BUDGET_YEAR_ID;
            if(!budgetYearId){
                throw ErrorLib
                    .getErrors()
                    .BadRequest(
                        "",
                        "",
                        "Missing parameter BUDGET_YEAR_ID");
            }
            result = blDynamicForm.getAllDynamicFormAndRolesByBudgetYearId(budgetYearId);
            break;
        default:
            throw ErrorLib
                .getErrors()
                .BadRequest(
                    "",
                    "",
                    "invalid parameter value (should be GET_ALL_DYNAMIC_FORM, GET_DYNAMIC_FORM_FIELDS or GET_DYNAMIC_FORM_DETAILED_BY_ID");
    }

    httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(reqBody, userSessionID) {
    var parameters = httpUtil.getUrlParameters();
    var result = null;
    var method = parameters.get('METHOD');
    switch (method) {
        case 'NEW_DYNAMIC_FORM':
            result = blDynamicForm.insertDynamicForm(reqBody, userSessionID);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("", "", "Wrong parameters");
    }

    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userSessionID) {
    var parameters = httpUtil.getUrlParameters();
    var result = null;
    var method = parameters.get('METHOD');
    switch (method) {
        case 'TEAM_FORM_ASSIGNATION':
            result = blDynamicForm.updateDynamicFormAssociation(reqBody,
                userSessionID);
            break;
        case 'TEAM_FORM_ASSIGNATION_BY_REGION':
            result = blDynamicForm.updateDynamicFormAssociationByRegion(reqBody,
                userSessionID);
            break;
        case 'TEAM_FORM_ASSIGNATION_BY_PLANNING_PURPOSE':
            result = blDynamicForm.updateDynamicFormAssociationByPlanningPurpose(
                reqBody, userSessionID);
            break;
        case 'UPDATE_DYNAMIC_FORM':
            result = blDynamicForm.updateDynamicForm(reqBody, userSessionID);
            break;
        case 'ROLE_FORM_ASSIGNATION':
            result = blDynamicForm.updateDynamicFormByRole(
                reqBody, userSessionID);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("", "", "Wrong parameters");
    }

    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userId) {
    var result = blDynamicForm.deleteDynamicForm(reqBody, userId);
    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

// Call request processing
processRequest();
