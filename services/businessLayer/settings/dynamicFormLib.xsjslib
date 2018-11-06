$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataDynamicForm = mapper.getDataDynamicForm();
var AllocationCategory = mapper.getAllocationCategoryLib();
var levelLib = mapper.getLevel1();
var util = mapper.getUtil();
var ErrorLib = mapper.getErrors();
var dataHl1 = mapper.getDataLevel1();
var roleLib = mapper.getRole();
var dataUserRole = mapper.getDataUserRole();
var budgetYearLib = mapper.getBudgetYear();

/** ***********END INCLUDE LIBRARIES*************** */

var PRIORITY_NOT_FOUND = "Priority not found";
var LEVEL_NOT_FOUND = "Level not found";
var FORM_FIELDS_NOT_FOUND = "Fields not found for the selected level or form";
var DATA_NOT_FOUND = "Data for Dynamic Form not found";
var DEFAULT_VALUE_REQUIRED = "The default value is required for a mandatory field.";
var DATA_DESCRIPTION_REQUIRED = "The description can not be empty.";
var DYNAMIC_FORM_EXISTS = "A dynamic form with the same name already exists";
var ERROR_DELETE_DEFAULT_DYNAMIC_FORM = "It is not possible to delete a Default Dynamic Form.";
var ERROR_CHANGE_DEFAULT_DYNAMIC_FORM = "Default form attribute must be always true for the Default Dynamic Form.";
var PARENT_IS_MISSING = "Parent was not found.";
var WRONG_LEVEL = "Level not found.";
var ERRROR_NO_ASSOCIATED_DYNAMIC_FORM = "There is no dynamic form associated with the user role.";
var ERROR_BUDGET_DISTRIBUTION = "The My Budget distribution percentage should be equal to 100%.";

var HIERARCHY_LEVEL = util.getHierarchyLevelEnum();

function isPlannificationLevel(levelId) {
    return HIERARCHY_LEVEL["HL1"] === levelId || HIERARCHY_LEVEL["HL2"] === levelId || HIERARCHY_LEVEL["HL3"] === levelId || HIERARCHY_LEVEL["HL4"] === levelId;
}

/************** GET **************/

//This function returns all the Dynamic Forms separated by Hierarchy Level
function getAllDynamicForm(userId) {
    return dataDynamicForm.getAllDynamicForm();
}

function getDefaultDynamicForm() {
    var defaultDynamicForms = {};
    var result = dataDynamicForm.getDefaultDynamicForm();
    result.forEach(function (dynamicForm) {
        defaultDynamicForms[dynamicForm.HIERARCHY_LEVEL_ID] = dynamicForm;
    });
    return defaultDynamicForms;
}

function getDynamicFormFieldsById(levelId, formUid, formId, isNewRecord, fromDynamicForm, forValidationPurpose) {
    var parsedResult = {};
    var form = {};
    // If the request was made from an edition in Team Plan Hierarchy, then the formId will exist
    if (formId) {
        parsedResult = JSON.parse(JSON.stringify(dataDynamicForm.getDynamicFormDetailedById(formId, levelId)));
    } else {
        // If the request was made from a new registry in Team Plan Hierarchy or it was made from an edition in Settings, then the formUid will exist and will be different from '0'
        if (formUid && formUid !== '0') {
            parsedResult = JSON.parse(JSON.stringify(dataDynamicForm.getDynamicFormDetailedByUid(formUid, levelId)));
            if(parsedResult.DYNAMIC_FORM_MY_BUDGET.length){
                for (var i = 0; i < parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL.length; i++) {
                    var formIdElement = parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL[i].FIELD_NAME;
                    if(formIdElement === 'MY_BUDGET'){
                        parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL[i].BUDGET_DISTRIBUTION = parsedResult.DYNAMIC_FORM_MY_BUDGET;
                        break;
                    }
                }
            }
        } else {
            // If formId does not exist and formUid is '0', then it means that tha request was made from Settings and was a New Dynamic Form
            var result = JSON.parse(JSON.stringify(dataDynamicForm.getAllDynamicFormFieldsByLevel(levelId)));
            parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL = result.DYNAMIC_FIELDS;
            parsedResult.TAB_NAME = result.TAB_NAME;
            parsedResult.DYNAMIC_FORMS_ALLOCATION_DETAIL = [];
            parsedResult.DYNAMIC_FORM_MY_BUDGET = [];
        }
    }

    if (parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL.length > 0) {
        //if (Number(levelId) === HIERARCHY_LEVEL.HL4 || Number(levelId) === HIERARCHY_LEVEL.HL5 || Number(levelId) === HIERARCHY_LEVEL.HL6) {
        parsedResult.ALLOCATION_LIST = JSON.parse(JSON.stringify(AllocationCategory.getCategoryOptionByHierarchyLevelId(levelId, 0, 0, fromDynamicForm)));
        //} else {
        //  parsedResult.ALLOCATION_LIST = [];
        //}

        //TABs
        var tabDisplay = {};
        parsedResult.TAB_NAME.forEach(function (tab) {
            tabDisplay[tab.TAB_NAME] = {
                DISPLAY_NAME: tab.TAB_DISPLAY_NAME,
                HIDDEN: !!tab.HIDDEN
            };
        });
        // Creates an object with all the tabs names.
        form.TAB_NAME = tabDisplay;

        if(parsedResult.DYNAMIC_FORM_MY_BUDGET.length){
            for (var i = 0; i < parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL.length; i++) {
                var formIdElement = parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL[i].FIELD_NAME;
                if(formIdElement === 'MY_BUDGET'){
                    parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL[i].BUDGET_DISTRIBUTION = parsedResult.DYNAMIC_FORM_MY_BUDGET;
                    break;
                }
            }
        }
        // Creates the dynamic form field map
        form.DYNAMIC_FIELDS = dynamicFormMapCreator(
            parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL,
            parsedResult.DYNAMIC_FORMS_ALLOCATION_DETAIL,
            parsedResult.ALLOCATION_LIST,
            tabDisplay,
            formUid,
            isNewRecord,
            fromDynamicForm,
            levelId,
            forValidationPurpose
        );

        return form;

    } else {
        throw ErrorLib.getErrors().CustomError("", "", FORM_FIELDS_NOT_FOUND);
    }
}

/** @Deprecated, use getFormByRoleAndBudgetYear instead **/
function getFormByRole(formId, isNewRecord, userId, hierarchyLevelId, forValidationPurpose) {
    var formUid = null;
    var objDynamicForm = null;
    var userRole = dataUserRole.getUserRoleByUserId(userId);

    if (!formId) {
        var dynamicFormRole = roleLib.getDynamicFormAssociatedByRoleId(hierarchyLevelId, userRole[0].ROLE_ID);

        if (!dynamicFormRole) {
            throw ErrorLib.getErrors().CustomError("", "", ERRROR_NO_ASSOCIATED_DYNAMIC_FORM);
        }

        if (dynamicFormRole && dynamicFormRole.DYNAMIC_FORM_UID) {
            formUid = dynamicFormRole.DYNAMIC_FORM_UID;
        }
        objDynamicForm = dataDynamicForm.getDynamicFormByUId(formUid);
    }

    if (isNewRecord) {
        return getDynamicFormFieldsById(hierarchyLevelId, formUid || '0', formId, isNewRecord);
    }
    else {
        return {
            "DYNAMIC_FORM_CONFIG_DATA": getDynamicFormFieldsById(hierarchyLevelId, formUid || '0', formId, isNewRecord, true, forValidationPurpose),
            "DYNAMIC_FORM_ID": (objDynamicForm && objDynamicForm.DYNAMIC_FORM_ID) ? objDynamicForm.DYNAMIC_FORM_ID : formId
        };
    }
}

function getFormByRoleAndBudgetYear(budgetYearId, formId, isNewRecord, userId, hierarchyLevelId, forValidationPurpose) {
    var formUid = null;
    var objDynamicForm = null;
    var userRole = dataUserRole.getUserRoleByUserId(userId);

    if (!formId) {
        var dynamicFormRole = roleLib.getDynamicFormAssociatedByRoleIdBudgetYearId(hierarchyLevelId, userRole[0].ROLE_ID, budgetYearId);

        if (!dynamicFormRole) {
            throw ErrorLib.getErrors().CustomError("", "", ERRROR_NO_ASSOCIATED_DYNAMIC_FORM);
        }

        if (dynamicFormRole && dynamicFormRole.DYNAMIC_FORM_UID) {
            formUid = dynamicFormRole.DYNAMIC_FORM_UID;
        }
        objDynamicForm = dataDynamicForm.getDynamicFormByUId(formUid);
    }

    if (isNewRecord) {
        return getDynamicFormFieldsById(hierarchyLevelId, formUid || '0', formId, isNewRecord);
    }
    else {
        return {
            "DYNAMIC_FORM_CONFIG_DATA": getDynamicFormFieldsById(hierarchyLevelId, formUid || '0', formId, isNewRecord, true, forValidationPurpose),
            "DYNAMIC_FORM_ID": (objDynamicForm && objDynamicForm.DYNAMIC_FORM_ID) ? objDynamicForm.DYNAMIC_FORM_ID : formId
        };
    }
}

function getFormByRoleId(level, formId, isNewRecord, userId) {
    level = level.toUpperCase();
    var LEVEL_STRING = 'H' + level;

    if (!HIERARCHY_LEVEL[LEVEL_STRING]) {
        throw ErrorLib.getErrors().CustomError("", "", WRONG_LEVEL);
    }

    return getFormByRole(formId, isNewRecord, userId, HIERARCHY_LEVEL[LEVEL_STRING]);
}

function getFormByRoleIdBudgetYearId(level, budgetYearId, formId, isNewRecord, userId) {
    level = level.toUpperCase();
    var LEVEL_STRING = 'H' + level;

    if (!HIERARCHY_LEVEL[LEVEL_STRING]) {
        throw ErrorLib.getErrors().CustomError("", "", WRONG_LEVEL);
    }

    var requireDynamicFormObject = JSON.parse(JSON.stringify(budgetYearLib.getRequireDynamicFormByBudgetYearId(budgetYearId)));

    var result = (Number(requireDynamicFormObject.REQUIRE_DYNAMIC_FORM) === 1)?
                        getFormByRoleAndBudgetYear(budgetYearId, formId, isNewRecord, userId, HIERARCHY_LEVEL[LEVEL_STRING])
                        :
                        getCompleteForm(HIERARCHY_LEVEL[LEVEL_STRING]);

    return result;
}

function getCompleteForm(hierarchyLevelId){
    var form = {};
    var parsedResult = {};

    var result = JSON.parse(JSON.stringify(dataDynamicForm.getAllDynamicFormFieldsByLevel(hierarchyLevelId)));
    parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL = result.DYNAMIC_FIELDS;
    parsedResult.TAB_NAME = result.TAB_NAME;
    parsedResult.DYNAMIC_FORMS_ALLOCATION_DETAIL = [];

    if (parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL.length > 0) {
        parsedResult.ALLOCATION_LIST = JSON.parse(JSON.stringify(AllocationCategory.getCategoryOptionByHierarchyLevelId(hierarchyLevelId, 0, 0, false)));

        //TABs
        var tabDisplay = {};
        parsedResult.TAB_NAME.forEach(function (tab) {
            tabDisplay[tab.TAB_NAME] = {
                DISPLAY_NAME: tab.TAB_DISPLAY_NAME,
                HIDDEN: !!tab.HIDDEN
            };
        });

        // Creates an object with all the tabs names.
        form.TAB_NAME = tabDisplay;

        // Creates the dynamic form field map
        form.DYNAMIC_FIELDS = dynamicFormMapCreator(
            parsedResult.DYNAMIC_FORMS_FIELDS_DETAIL,
            parsedResult.DYNAMIC_FORMS_ALLOCATION_DETAIL,
            parsedResult.ALLOCATION_LIST,
            tabDisplay,
            null, //formUid
            true, //isNewRecord
            false, //fromDynamicForm
            hierarchyLevelId
        );

        return form;

    } else {
        throw ErrorLib.getErrors().CustomError("", "", FORM_FIELDS_NOT_FOUND);
    }
}

function getFormByParentId(parentId, level, formId, isNewRecord, isLegacyParent) {
    if (!Number(parentId)) {
        throw ErrorLib.getErrors().CustomError("", "", PARENT_IS_MISSING);
    }

    var formUid = null;
    var objDynamicForm = null;
    level = level.toUpperCase();
    var LEVEL_STRING = 'H' + level;

    if (!HIERARCHY_LEVEL[LEVEL_STRING]) {
        throw ErrorLib.getErrors().CustomError("", "", WRONG_LEVEL);
    }

    if (!formId) {
        var hl1 = dataHl1.getHl1FormAssociatedByLevelHlId(LEVEL_STRING, parentId, Number(isLegacyParent) || 0);
        if (!hl1) {
            var defaultForms = getDefaultDynamicForm();
            formUid = defaultForms[HIERARCHY_LEVEL[LEVEL_STRING]].DYNAMIC_FORM_UID;
        } else {
            formUid = hl1['DYNAMIC_FORM_' + level + '_UID'];
        }
        objDynamicForm = dataDynamicForm.getDynamicFormByUId(formUid);
    }

    if (isNewRecord) {
        return getDynamicFormFieldsById(HIERARCHY_LEVEL[LEVEL_STRING], formUid || '0', formId, isNewRecord);
    }
    else {
        return {
            "DYNAMIC_FORM_CONFIG_DATA": getDynamicFormFieldsById(HIERARCHY_LEVEL[LEVEL_STRING], formUid || '0', formId, isNewRecord),
            "DYNAMIC_FORM_ID": (objDynamicForm && objDynamicForm.DYNAMIC_FORM_ID) ? objDynamicForm.DYNAMIC_FORM_ID : formId
        };
    }

}

//determines whether the dynamic form has hidden budget income
function hiddenBudget(data) {
    var result = false;
    var objFieldList = data.DYNAMIC_FIELDS['BUDGET_SPEND_REQUEST'];

    for (var i = 0; i < objFieldList.length; i++) {
        var objField = objFieldList[i];
        if(objField.FIELD_NAME === 'BUDGET'){
            result = !!objField.HIDDEN;
            break;
        }
    }
    return result;
}

function getNewDynamicFormDefaultValue(data, dynamicFormId) {
    var result = [];
    var keys_tab = Object.keys(data.DYNAMIC_FIELDS);
    keys_tab.forEach(function (tab_name) {
        var tabIsHidden = !!data.TAB_NAME[tab_name] && !!data.TAB_NAME[tab_name].HIDDEN;
        switch (tab_name) {
            case "BUDGET_SPEND_REQUEST":
                Array.prototype.push.apply(result, getNewBudgetSpendRequest(data.DYNAMIC_FIELDS[tab_name], dynamicFormId));
                break;
            case "TACTICS_DETAILS":
            case "PLAN":
            case "TEAM":
            case "PRIORITY_SUB_TEAM":
            case "DESCRIPTION":
                Array.prototype.push.apply(result, getNewTacticsDetails(data.DYNAMIC_FIELDS[tab_name], dynamicFormId, tabIsHidden, data.HIERARCHY_LEVEL_ID));
                break;
            case "CAMPAIGN_FORECASTING_KPIS":
                Array.prototype.push.apply(result, getNewTargetKpi(data.DYNAMIC_FIELDS[tab_name], dynamicFormId, tabIsHidden));
                break;
            default:
                Array.prototype.push.apply(result, []);
        }
    });
    return result;
}

function getNewTargetKpi(arrTargetKpi, dynamicFormId, tabIsHidden) {
    var arrDynamicFormDefaultValue = [];
    if (arrTargetKpi.length) {
        var foreCastAtL5 = true;
        for (var i = 0; i < arrTargetKpi.length; i++) {
            var kpiField = arrTargetKpi[i];

            if (tabIsHidden || kpiField.HIDDEN) {
                var defaultValue = Number(kpiField.DEFAULT_VALUE);
                if (kpiField.FIELD_NAME === "COMMENTS") {
                    defaultValue = defaultValue || kpiField.DEFAULT_VALUE || "";
                }
                var kpi = {};
                kpi.DYNAMIC_FORM_ID = dynamicFormId;
                kpi.DYNAMIC_FORM_FIELD_ID = kpiField.DYNAMIC_FORM_FIELD_ID;
                kpi.DEFAULT_VALUE = defaultValue;
                arrDynamicFormDefaultValue.push(kpi);

            }
        }
    }
    return arrDynamicFormDefaultValue;
}

function getNewBudgetSpendRequest(arrBudgetSpendRequest, dynamicFormId) {
    var arrDynamicFormDefaultValue = [];
    if (arrBudgetSpendRequest.length) {
        for (var i = 0; i < arrBudgetSpendRequest.length; i++) {
            var objBudget = arrBudgetSpendRequest[i];

            if (objBudget.HIDDEN) {
                var dataBudget = {};
                dataBudget.DYNAMIC_FORM_ID = dynamicFormId;
                dataBudget.DYNAMIC_FORM_FIELD_ID = objBudget.DYNAMIC_FORM_FIELD_ID;
                dataBudget.DEFAULT_VALUE = objBudget.DEFAULT_VALUE;
                arrDynamicFormDefaultValue.push(dataBudget);
            }
        }
    }
    return arrDynamicFormDefaultValue;
}

function getNewTacticsDetails(arrTacticsDetail, dynamicFormId, tabIsHidden, hierarchyLevelId) {
    var arrDynamicFormDefaultValue = [];
    if (arrTacticsDetail.length) {
        for (var i = 0; i < arrTacticsDetail.length; i++) {
            var objTacticDetail = arrTacticsDetail[i];

            validateFields(objTacticDetail);

            if (tabIsHidden || objTacticDetail.HIDDEN) {
                var dataBudget = {};
                dataBudget.DYNAMIC_FORM_ID = dynamicFormId;
                dataBudget.DYNAMIC_FORM_FIELD_ID = objTacticDetail.DYNAMIC_FORM_FIELD_ID;
                switch (objTacticDetail.FIELD_NAME) {
                    case 'BUDGET':
                        dataBudget.DEFAULT_VALUE = Number(objTacticDetail.DEFAULT_VALUE) || null;
                        break;
                    default:
                        dataBudget.DEFAULT_VALUE = !objTacticDetail.MANDATORY ? (typeof objTacticDetail.DEFAULT_VALUE === "string" ? objTacticDetail.DEFAULT_VALUE.trim() : objTacticDetail.DEFAULT_VALUE) || null : objTacticDetail.DEFAULT_VALUE.trim();
                }
                arrDynamicFormDefaultValue.push(dataBudget);
            }
        }
    }
    return arrDynamicFormDefaultValue;
}

function getDefaultDynamicFormByLevel(level) {
    var defaultForm = dataDynamicForm.getDefaultDynamicForm();

    if (defaultForm.length) {
        if (defaultForm[0].HIERARCHY_LEVEL_ID === level) {
            return defaultForm[0];
        }
        else {
            return defaultForm[1];
        }
    }

    return null;
}

function getAllDynamicFormAndRols(userId) {

    var result = {};

    result.TEMPLATES = dataDynamicForm.getAllDynamicForm();

    var roles = [];

    roleLib.getAllRole().forEach(function (value) {
        var rol = {};
        rol.DYNAMIC_FORM_IDS = {};
        rol.NAME = value.NAME;
        rol.ROLE_ID = value.ROLE_ID;
        rol.DYNAMIC_FORM_IDS.DYNAMIC_FORM_HL1 = roleLib.getDynamicFormAssociatedByRoleId(6, value.ROLE_ID) || {};
        rol.DYNAMIC_FORM_IDS.DYNAMIC_FORM_HL2 = roleLib.getDynamicFormAssociatedByRoleId(5, value.ROLE_ID) || {};
        rol.DYNAMIC_FORM_IDS.DYNAMIC_FORM_HL3 = roleLib.getDynamicFormAssociatedByRoleId(4, value.ROLE_ID) || {};
        rol.DYNAMIC_FORM_IDS.DYNAMIC_FORM_HL4 = roleLib.getDynamicFormAssociatedByRoleId(1, value.ROLE_ID) || {};
        roles.push(rol)
    });

    result.ROLES = roles;


    return result;
}

function getAllDynamicFormAndRolesByBudgetYearId(budgetYearId) {

    var result = {};

    result.TEMPLATES = dataDynamicForm.getAllDynamicForm();

    var roles = [];

    roleLib.getAllRole().forEach(function (value) {
        var rol = {};
        rol.DYNAMIC_FORM_IDS = {};
        rol.NAME = value.NAME;
        rol.ROLE_ID = value.ROLE_ID;
        rol.DYNAMIC_FORM_IDS.DYNAMIC_FORM_HL1 = roleLib.getDynamicFormAssociatedByRoleIdBudgetYearId(6, value.ROLE_ID, budgetYearId) || {};
        rol.DYNAMIC_FORM_IDS.DYNAMIC_FORM_HL2 = roleLib.getDynamicFormAssociatedByRoleIdBudgetYearId(5, value.ROLE_ID, budgetYearId) || {};
        rol.DYNAMIC_FORM_IDS.DYNAMIC_FORM_HL3 = roleLib.getDynamicFormAssociatedByRoleIdBudgetYearId(4, value.ROLE_ID, budgetYearId) || {};
        rol.DYNAMIC_FORM_IDS.DYNAMIC_FORM_HL4 = roleLib.getDynamicFormAssociatedByRoleIdBudgetYearId(1, value.ROLE_ID, budgetYearId) || {};
        roles.push(rol)
    });

    result.ROLES = roles;


    return result;
}

function getValidationBeforeDelete(formUId, hierarchyLevelId) {
    var result = false;
    if (hierarchyLevelId == HIERARCHY_LEVEL.HL5 || hierarchyLevelId == HIERARCHY_LEVEL.HL6) {
        result = !!dataDynamicForm.countDynamicFormRelatedLevel(formUId, HIERARCHY_LEVEL["HL1"]);
    } else {
        result = !!dataDynamicForm.countDynamicFormRelatedRole(formUId);
    }
    return result;
}

function existDynamicFormByName(data) {
    var dynamicForm = dataDynamicForm.getDynamicFormByName(data.DESCRIPTION, data.HIERARCHY_LEVEL_ID);
    return !!(dynamicForm && dynamicForm.DYNAMIC_FORM_ID != data.DYNAMIC_FORM_ID);
}

function existDynamicFormById(data) {
    var dynamicForm = dataDynamicForm.getDynamicFormById(data.DYNAMIC_FORM_ID);
    return !!(dynamicForm && dynamicForm.DYNAMIC_FORM_ID);
}

/************** INSERT **************/

function insertDynamicForm(data, userId) {

    if (!data) {
        throw ErrorLib.getErrors().CustomError("", "", DATA_NOT_FOUND);
    }

    // parse and create data for dynamic form
    var dynamicFormId = CreateDynamicForm(data, userId);
    // DYNAMIC_TABS
    CreateDynamicFormTab(data, dynamicFormId, userId);
    // DYNAMIC_FIELDS
    CreateDynamicFormFieldsValues(data, dynamicFormId, userId);
    if (data.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL4 || data.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL5 || data.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL6) {
        // Allocation Category
        CreateDynamicFormAllocations(data, dynamicFormId, userId);

        if(data.HIERARCHY_LEVEL_ID !== HIERARCHY_LEVEL.HL4){
            CreateDynamicFormMyBudget(data, dynamicFormId, userId);
        }

    }

    return dynamicFormId;
}

function CreateDynamicForm(objDynamicForm, userId) {
    if (objDynamicForm && objDynamicForm.DESCRIPTION.trim().length <= 0) {
        throw ErrorLib.getErrors().CustomError("", "", DATA_DESCRIPTION_REQUIRED);
    }

    if (existDynamicFormByName(objDynamicForm)) {
        throw ErrorLib.getErrors().CustomError("", "", DYNAMIC_FORM_EXISTS);
    }

    //clean the default form and set the current
    if (objDynamicForm.DEFAULT_FORM) {
        dataDynamicForm.cleanDefaultDynamicForm(objDynamicForm.HIERARCHY_LEVEL_ID, userId);
    }

    if (!objDynamicForm.DYNAMIC_FORM_UID) {
        return dataDynamicForm.insertDynamicForm(objDynamicForm.DEFAULT_FORM, objDynamicForm.DESCRIPTION, objDynamicForm.HIERARCHY_LEVEL_ID, userId);
    }
    else {
        return dataDynamicForm.insertDynamicFormByUid(objDynamicForm.DEFAULT_FORM, objDynamicForm.DESCRIPTION, objDynamicForm.HIERARCHY_LEVEL_ID, objDynamicForm.DYNAMIC_FORM_UID, userId);
    }
}

function CreateDynamicFormTab(data, dynamicFormId, userId) {
    var arrDynamicFormTabState = [];
    Object.keys(data.TAB_NAME).forEach(function (tabName) {
        if (!!data.TAB_NAME[tabName].HIDDEN) {
            arrDynamicFormTabState.push({
                dynamic_form_id: dynamicFormId,
                hierarchy_level_id: data.HIERARCHY_LEVEL_ID,
                tab_name: tabName
            });
        }
    });

    if (arrDynamicFormTabState.length) {
        dataDynamicForm.insertDynamicFormTab(arrDynamicFormTabState, userId);
    }

    return 1;
}

function CreateDynamicFormFieldsValues(data, dynamicFormId, userId) {
    var arrDynamicFormDefaultValue = [];

    arrDynamicFormDefaultValue = getNewDynamicFormDefaultValue(data, dynamicFormId);
    if (arrDynamicFormDefaultValue.length)
        dataDynamicForm.insertDynamicFormDefaultValue(arrDynamicFormDefaultValue, userId);

    return 1;
}

function CreateDynamicFormAllocations(data, dynamicFormId, userId) {
    if (data.DYNAMIC_FIELDS.DYNAMIC_FORMS_ALLOCATION_DETAIL) {
        var arrAllocation = [];

        var arrAllocations = Object.keys(data.DYNAMIC_FIELDS.DYNAMIC_FORMS_ALLOCATION_DETAIL).map(function (key) {
            return data.DYNAMIC_FIELDS.DYNAMIC_FORMS_ALLOCATION_DETAIL[key]
        });

        if (arrAllocations && arrAllocations.length) {
            for (var i = 0; i < arrAllocations.length; i++) {
                var objDinamicFormAllocation = {};
                var allocation = arrAllocations[i];
                if (allocation.HIDDEN) {
                    objDinamicFormAllocation.DYNAMIC_FORM_ID = dynamicFormId;
                    objDinamicFormAllocation.ALLOCATION_CATEGORY_ID = allocation.ALLOCATION_CATEGORY_ID;
                    objDinamicFormAllocation.ALLOCATION_OPTION_ID = Number(allocation.ALLOCATION_OPTION_ID) || null;
                    objDinamicFormAllocation.BUDGET_PERCENTAGE = Number(allocation.BUDGET_DEFAULT_VALUE) || 0;
                    objDinamicFormAllocation.KPI_PERCENTAGE = Number(allocation.KPI_DEFAULT_VALUE) || 0;
                    arrAllocation.push(objDinamicFormAllocation);
                }
            }
        }



        if (arrAllocation.length)
            dataDynamicForm.insertDynamicFormAllocation(arrAllocation, userId);
    }
    return 1;
}

function CreateDynamicFormMyBudget(data, dynamicFormId, userId) {
    if(!hiddenBudget(data)){
        if (data.DYNAMIC_FIELDS.BUDGET_DISTRIBUTION.length) {
            var arrRegion = [];

            var arrRegions = Object.keys(data.DYNAMIC_FIELDS.BUDGET_DISTRIBUTION).map(function (key) {
                return data.DYNAMIC_FIELDS.BUDGET_DISTRIBUTION[key]
            });

            var distributionPercentage = 0;
            if (arrRegions && arrRegions.length) {
                for (var i = 0; i < arrRegions.length; i++) {
                    var objDynamicFormMyBudget = {};
                    var region = arrRegions[i];

                    objDynamicFormMyBudget.DYNAMIC_FORM_ID = dynamicFormId;
                    objDynamicFormMyBudget.REGION_ID = region.REGION_ID;
                    objDynamicFormMyBudget.PERCENTAGE = Number(region.PERCENTAGE) || 0;
                    distributionPercentage = distributionPercentage + objDynamicFormMyBudget.PERCENTAGE;
                    arrRegion.push(objDynamicFormMyBudget);
                }
            }
            if(distributionPercentage!==100) {
                throw ErrorLib.getErrors().CustomError("", "", ERROR_BUDGET_DISTRIBUTION);
            }

            if (arrRegion.length)
                dataDynamicForm.insertDynamicFormMyBudget(arrRegion, userId);
        }
    }
    return 1;
}

/************** UPDATE **************/

function updateDynamicForm(data, userId) {
    if (data.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL5 || data.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL6) {
        if (data.DYNAMIC_FORM_UID) {
            var dynamicFormBD = dataDynamicForm.getDynamicFormByUId(data.DYNAMIC_FORM_UID);
            if (dynamicFormBD && dynamicFormBD.DEFAULT_FORM && !Number(data.DEFAULT_FORM)) {
                throw ErrorLib.getErrors().CustomError("", "", ERROR_CHANGE_DEFAULT_DYNAMIC_FORM);
            }

            performDelete(data.DYNAMIC_FORM_UID, data, userId);

            return insertDynamicForm(data, userId);
        }
        else {
            throw ErrorLib.getErrors().BadRequest("", "", "Wrong parameters");
        }
    } else {
        dataDynamicForm.softDeleteDynamicForm(data.DYNAMIC_FORM_UID, userId, 1);
        // DYNAMIC_TABS
        CreateDynamicFormTab(data, data.DYNAMIC_FORM_ID, userId);
        // DYNAMIC_FIELDS
        CreateDynamicFormFieldsValues(data, data.DYNAMIC_FORM_ID, userId);

        if (data.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL4) {
            // Allocation Category
            CreateDynamicFormAllocations(data, data.DYNAMIC_FORM_ID, userId);
        }

        return dataDynamicForm.updateDynamicForm(data.DYNAMIC_FORM_ID, data.DEFAULT_FORM, data.DESCRIPTION, userId);
    }

}

function updateDynamicFormAssociation(data, userId) {
    return levelLib.updateDynamicFormAssociation(data, userId);
}

function updateDynamicFormAssociationByRegion(data, userId) {
    return levelLib.updateDynamicFormAssociationByRegion(data, userId);
}

function updateDynamicFormAssociationByPlanningPurpose(data, userId) {
    return levelLib.updateDynamicFormAssociationByPlanningPurpose(data, userId);
}

function updateDynamicFormByRole(reqBody, userId) {

    var parameters = {};

    for (var i = 1; i < 5; i++) {
        if (reqBody["DYNAMIC_FORM_ROLE_ID_HL" + i]) {
            parameters.DYNAMIC_FORM_ID = reqBody["DYNAMIC_FORM_L" + i + "_ID"];
            parameters.DYNAMIC_FORM_ROLE_ID = reqBody["DYNAMIC_FORM_ROLE_ID_HL" + i];
            parameters.BUDGET_YEAR_ID = reqBody.BUDGET_YEAR_ID;
            dataDynamicForm.updateDynamicFormByRole(parameters, userId);
        } else {
            parameters.DYNAMIC_FORM_ID = reqBody["DYNAMIC_FORM_L" + i + "_ID"];
            parameters.ROLE_ID = reqBody.ROLE_ID;
            parameters.BUDGET_YEAR_ID = reqBody.BUDGET_YEAR_ID;

            dataDynamicForm.createDynamicFormByRole(parameters, userId);
        }
    }


    return true;
}

function setDefaultDynamicFormByBudgetYearId(budgetYearId, userId){
    var defaultForms = getDefaultDynamicForm();
    var roles = roleLib.getAllRole();

    if(defaultForms && Object.keys(defaultForms).length){
        Object.keys(defaultForms).forEach(function(key){
            //Only for L1 to L4
            if(isPlannificationLevel(Number(key))){
                var payload = {};

                roles.forEach(function(role){
                    payload.DYNAMIC_FORM_ID = defaultForms[key].DYNAMIC_FORM_ID;
                    payload.ROLE_ID = role.ROLE_ID;
                    payload.BUDGET_YEAR_ID = budgetYearId;

                    dataDynamicForm.createDynamicFormByRole(payload, userId);
                });
            }

        });
    }

    return true;
}

function asociateDefaultFormToHL1(oldDynamicFormUid, hierarchy_level_id, userId) {
    //find default dynamic form
    var defaultForm = getDefaultDynamicFormByLevel(hierarchy_level_id);

    //associate the HL1 to the default dynamic form
    dataDynamicForm.asociateDefaultFormToHL1(oldDynamicFormUid, defaultForm.DYNAMIC_FORM_UID, hierarchy_level_id, userId);

    return true;
}

/************** DELETE **************/

function performDelete(dynamicFormUIdToDelete, dynamicForm, userId) {
//there are related L5 or L6 - Soft Delete
    var result;
    var count = 0;

    if (dynamicForm.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL5 || dynamicForm.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL6) {
        count = dataDynamicForm.countDynamicFormRelatedLevel(dynamicFormUIdToDelete, dynamicForm.HIERARCHY_LEVEL_ID);
    } else {
        count = dataDynamicForm.countDynamicFormRelatedRole(dynamicFormUIdToDelete);
    }

    if (!!count) {
        result = dataDynamicForm.softDeleteDynamicForm(dynamicFormUIdToDelete, userId);
    }
    else {
        //hard delete
        result = dataDynamicForm.hardDeleteDynamicForm(dynamicFormUIdToDelete, userId);
    }
    return result;
}

function deleteDynamicForm(dynamicForm, userId) {
    var dynamicFormUIdToDelete = dynamicForm.DYNAMIC_FORM_UID;

    if (dynamicFormUIdToDelete) {
        //get dynamic form to be delete
        var objDynamicFormToDelete = dataDynamicForm.getDynamicFormByUId(dynamicFormUIdToDelete);

        //can not delete if default form
        if (objDynamicFormToDelete && objDynamicFormToDelete.DEFAULT_FORM) {
            throw ErrorLib.getErrors().CustomError("", "", ERROR_DELETE_DEFAULT_DYNAMIC_FORM);
        }

        if (objDynamicFormToDelete.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL5 || objDynamicFormToDelete.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL6) {
            //associate the HL1 to the default dynamic form
            asociateDefaultFormToHL1(dynamicFormUIdToDelete, objDynamicFormToDelete.HIERARCHY_LEVEL_ID, userId);
        }

        return performDelete(dynamicFormUIdToDelete, objDynamicFormToDelete, userId);
    }

    else
        throw ErrorLib.getErrors().BadRequest("", "", "Wrong parameters");
}

function deleteDynamicFormRoleByBudgetYearId(budgetYearId, userId){
    return dataDynamicForm.deleteDynamicFormRoleByBudgetYearId(budgetYearId, userId);
}

/************** MAPPING - PARSERS **************/
/**
 * Method to get the complete list of dynamic form fields with their default values
 * @param {array} fieldList - Array with all the dynamic form field and their default values saved for the current form
 * @param {array} selectedAllocationList - Array with all the categories and their default options saved for the current form
 * @param {array} allocationList - Array with all the categories and their options available for the current level
 * @param {string} formUid - UID of the current dynamic form (if it is a new form, the value is '0')
 * @param {boolean} isNewRecord - true when the request was made from UI getter
 * @returns {object} - Object whose keys are the level tabs and whose values are field maps
 */
function dynamicFormMapCreator(fieldList, selectedAllocationList, allocationList, tabs, formUid, isNewRecord, fromDynamicForm, levelId, forValidationPurpose) {
    var dynamicFormFieldsMap = {};
    var allocationMap = {};
    var objectiveSelected = false;
    var campaignTypeSelected = false;
    var campaignSubTypeSelected = false;
    var showAdditionalFields = false;
    var implementExecutionLevel = false;
    var enableKpiComment = true;
    var disableByParent = false;

    //Create field map
    fieldList.forEach(function (field) {
        // If the dynamic form is new or is an edition of a Team Plan Hierarchy registry, then the UID will not exist
        field.DYNAMIC_FORM_UID = field.DYNAMIC_FORM_UID || "0";
        formUid = formUid !== field.DYNAMIC_FORM_UID ? field.DYNAMIC_FORM_UID : formUid;

        dynamicFormFieldsMap[field.DYNAMIC_FORM_UID] = dynamicFormFieldsMap[field.DYNAMIC_FORM_UID] || {};

        // Generic object to fill with all the field information
        var currentField = {
            "FIELD_NAME": field.FIELD_NAME,
            "DYNAMIC_FORM_FIELD_ID": field.DYNAMIC_FORM_FIELD_ID,
            "FIELD_DISPLAY_NAME": field.FIELD_DISPLAY_NAME,
            "MANDATORY": !forValidationPurpose && isPlannificationLevel(Number(levelId)) ? false : !!field.MANDATORY,
            "DEFAULT_VALUE": field.DEFAULT_VALUE,
            "DEFAULT_DISPLAY_VALUE": field.DEFAULT_DISPLAY_VALUE,
            "HIDDEN": !!field.HIDDEN,
            "SHOW_ADDITIONAL_FIELDS": !!field.SHOW_ADDITIONAL_FIELDS,
            "ORDER_NUMBER": field.ORDER_NUMBER,
            "FIELD_TYPE": field.FIELD_TYPE,
            "ENABLED_SWITCH": true,
            "ENABLED_CHECKBOX": true
        };

        // Special cases
        switch (field.FIELD_NAME) {
            case "CAMPAIGN_OBJECTIVE_ID":
                if (!!field.HIDDEN) {
                    objectiveSelected = true;
                }
                break;
            case "CAMPAIGN_TYPE_ID":
                if (!!field.HIDDEN) {
                    campaignTypeSelected = true;
                    showAdditionalFields = !!field.SHOW_ADDITIONAL_FIELDS;
                }
                if (!objectiveSelected) {
                    currentField.ENABLED_SWITCH = false;
                }
                break;
            case "CAMPAIGN_SUBTYPE_ID":
                if (!!field.HIDDEN) {
                    campaignSubTypeSelected = true;
                }
                if (!campaignTypeSelected) {
                    currentField.ENABLED_SWITCH = false;
                }
                break;
            case "DES_TYPE_ID":
                if (!campaignSubTypeSelected) {
                    currentField.ENABLED_SWITCH = false;
                }
                break;
            case "START_DATE":
            case "END_DATE":
                currentField.ENABLED_SWITCH = campaignSubTypeSelected;
                break;
            case "URL":
            case "VENUE":
            case "NUMBER_OF_PARTICIPANTS":
            case "STREET":
            case "CITY":
            case "COUNTRY_ID":
            case "REGION":
            case "POSTAL_CODE":
            case "EVENT_OWNER":
                if (!showAdditionalFields) {
                    currentField.ENABLED_SWITCH = false;
                }
                break;
            case "IMPLEMENT_EXECUTION_LEVEL":
                implementExecutionLevel = !!Number(field.DEFAULT_VALUE);
                break;
            case "CRT_RELATED":
                currentField.ENABLED_CHECKBOX = implementExecutionLevel;
                break;
            case "FORECAST_AT_L5":
                currentField.DEFAULT_VALUE = field.DEFAULT_VALUE === null || field.DEFAULT_VALUE;
                enableKpiComment = currentField.DEFAULT_VALUE != "0";
                break;
            case "COMMENTS":
                currentField.ENABLED_SWITCH = enableKpiComment;
                break;
            case "TEAM_TYPE_ID":
                disableByParent = !field.DEFAULT_VALUE;
                break;
            case "PLANNING_PURPOSE_ID":
                currentField.DISABLED_BY_PARENT = disableByParent;
                break;
            case "MY_BUDGET":
                dynamicFormFieldsMap[formUid].BUDGET_DISTRIBUTION = field.BUDGET_DISTRIBUTION;
                break;
        }

        if(!!tabs[field.TAB_NAME].HIDDEN) {
            currentField.HIDDEN = true;
            currentField.ENABLED_SWITCH = false;
            currentField.ENABLED_CHECKBOX = false;
        }

        // Create the auxiliary object map to return
        dynamicFormFieldsMap[field.DYNAMIC_FORM_UID][field.TAB_NAME] = dynamicFormFieldsMap[field.DYNAMIC_FORM_UID][field.TAB_NAME] || {};

        // If the request came from a UI getter
        if (isNewRecord) {
            dynamicFormFieldsMap[field.DYNAMIC_FORM_UID][field.TAB_NAME][currentField.FIELD_NAME] = !currentField.HIDDEN;
            if (field.FIELD_NAME === "CAMPAIGN_TYPE_ID") {
                dynamicFormFieldsMap[field.DYNAMIC_FORM_UID][field.TAB_NAME]['SHOW_ADDITIONAL_FIELDS_VALUE'] = showAdditionalFields;
            }
            if (currentField.HIDDEN) {
                dynamicFormFieldsMap[field.DYNAMIC_FORM_UID][field.TAB_NAME][currentField.FIELD_NAME + '_VALUE'] = currentField.DEFAULT_VALUE;
            }
        } else {
            dynamicFormFieldsMap[field.DYNAMIC_FORM_UID][field.TAB_NAME][field.DYNAMIC_FORM_FIELD_ID] = currentField;
        }
    });

    // Create map with all the available categories for the current level
    if (allocationList.length > 0) {
        //Create Allocation field map
        allocationList.forEach(function (category) {
            allocationMap[category.CATEGORY_ID] = allocationMap[category.CATEGORY_ID] || {};
            var optionMap = {};
            category.OPTIONS.forEach(function (option) {
                optionMap[option.OPTION_ID] = optionMap[option.OPTION_ID] || {};
                optionMap[option.OPTION_ID] = {
                    "OPTION_ID": option.OPTION_ID,
                    "OPTION_NAME": option.OPTION_NAME,
                    "CATEGORY_OPTION_LEVEL_ID": option.CATEGORY_OPTION_LEVEL_ID
                };
            });
            // Generic object to fill with all the category information
            allocationMap[category.CATEGORY_ID] = {
                "FIELD_NAME": "ALLOCATION_CATEGORY_OPTION_LEVEL_ID",
                "CATEGORY_DEFAULT_NAME": category.CATEGORY_NAME,
                "ALLOCATION_CATEGORY_ID": category.CATEGORY_ID,
                "OPTION_DEFAULT_NAME": category.OPTION_NAME || null,
                "ALLOCATION_OPTION_ID": category.OPTION_ID || null,
                "MANDATORY": !forValidationPurpose && isPlannificationLevel(Number(levelId)) ? false : !!category.MAKE_CATEGORY_MANDATORY,
                "OPTIONS_LIMIT": category.OPTIONS_LIMIT,
                "KPI_DEFAULT_VALUE": 0,
                "BUDGET_DEFAULT_VALUE": 0,
                "OPTIONS": optionMap,
                "HIDDEN": false,
                "FIELD_TYPE": "select"
            };
        });

        // Set allocationMap to the current auxiliary object map
        dynamicFormFieldsMap[formUid].DYNAMIC_FORMS_ALLOCATION_DETAIL = allocationMap;

        // Set the dynamic form category/option to the allocation map created above
        selectedAllocationList.forEach(function (allocation) {
            dynamicFormFieldsMap[formUid].DYNAMIC_FORMS_ALLOCATION_DETAIL[allocation.ALLOCATION_CATEGORY_ID] = {
                "FIELD_NAME": "ALLOCATION_CATEGORY_OPTION_LEVEL_ID",
                "CATEGORY_DEFAULT_NAME": allocation.CATEGORY_DEFAULT_NAME,
                "ALLOCATION_CATEGORY_ID": allocation.ALLOCATION_CATEGORY_ID,
                "OPTION_DEFAULT_NAME": allocation.OPTION_DEFAULT_NAME,
                "ALLOCATION_OPTION_ID": allocation.ALLOCATION_OPTION_ID,
                "MANDATORY": !forValidationPurpose && isPlannificationLevel(Number(levelId)) ? false : !!allocation.MANDATORY,
                "OPTIONS_LIMIT": allocation.OPTIONS_LIMIT,
                "KPI_DEFAULT_VALUE": allocation.KPI_PERCENTAGE,
                "BUDGET_DEFAULT_VALUE": allocation.BUDGET_PERCENTAGE,
                "OPTIONS": allocationMap[allocation.ALLOCATION_CATEGORY_ID].OPTIONS,
                "HIDDEN": !!allocation.HIDDEN,
                "FIELD_TYPE": "select"
            };
        });
    }

    //Set the dynamic form tab visibility for each generated tab, but for New/Edit forms only
    if (!fromDynamicForm && isPlannificationLevel(levelId)) {
        Object.keys(tabs).forEach(function (key) {

            if (!dynamicFormFieldsMap[formUid][key]) {
                dynamicFormFieldsMap[formUid][key] = {};
            }

            dynamicFormFieldsMap[formUid][key].TAB = !tabs[key].HIDDEN;
        });
    }

    return dynamicFormFieldsMap[formUid];
}

/************ VALIDATIONS *************/

function validateDynamicForm_FieldValue(objectDynamicFormValue) {
    if (objectDynamicFormValue.HIDDEN && objectDynamicFormValue.MANDATORY && (!objectDynamicFormValue.DEFAULT_VALUE)) {
        throw ErrorLib.getErrors().CustomError("", "", objectDynamicFormValue.FIELD_DISPLAY_NAME + ": " + DEFAULT_VALUE_REQUIRED);
    }
    return true;
}

function validateFields(dynamicFormObjectData) {
    if (dynamicFormObjectData.HIDDEN && dynamicFormObjectData.MANDATORY) {
        switch (dynamicFormObjectData.FIELD_TYPE) {
            case "text":
            case "textarea":
                if (dynamicFormObjectData && dynamicFormObjectData.DEFAULT_VALUE.trim().length <= 0)
                    throw ErrorLib.getErrors().CustomError("", "", dynamicFormObjectData.FIELD_DISPLAY_NAME + ": " + DEFAULT_VALUE_REQUIRED);
                break;
            case "select":
                if (dynamicFormObjectData && Number(dynamicFormObjectData.DEFAULT_VALUE) <= 0)
                    throw ErrorLib.getErrors().CustomError("", "", dynamicFormObjectData.FIELD_DISPLAY_NAME + ": " + DEFAULT_VALUE_REQUIRED);
                break;
        }
    }
    return true;
}