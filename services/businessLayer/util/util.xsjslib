$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var config = mapper.getDataConfig();
var userbl = mapper.getUser();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var dataL6DER = mapper.getDataLevel6Report();
var dataL5DER = mapper.getDataLevel5Report();
var dataCategory = mapper.getDataCategory();
var blDynamicForm = mapper.getDynamicFormLib();
var allocationCategory = mapper.getAllocationCategoryLib();
/** ***********END INCLUDE LIBRARIES*************** */

var COPY_CRM_DESCRIPTION = "Copy";
var CREATED_FROM_EVENT_REQUEST_CRM_DESCRIPTION = "Created from Event Request";
var MAX_BUDGET = 999999999.00;
var CATEGORY_TYPE = allocationCategory.getCategoryType();
var TEAM_TYPE = getTeamTypeEnum();

function validateIsNumber(value) {
    return !isNaN(value);
}

function validateIsNatural(value) {
    return (validateIsNumber(value) && value >= 0);
}

function validateIsEmail(value) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value);
}

function validateBudget(value) {
    if (!value) return false;
    return value !== 0;
}

function validateMaximValue(value) {
    return Number(value) <= MAX_BUDGET;
}

function numberToLocaleString(budget) {
    var value = '0.00';
    budget = Number(budget);
    if (budget) {
        var prefix = Number(budget < 0) ? '-' : '';
        value = Math.abs(budget).toFixed(2).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
        value = prefix + value;
    }
    return value;
}

/**
 *
 * 5 => 0.05
 * 0.50 => 0.50
 * 5.00 => 5.00
 * 50.001 => 500.01
 *
 *
 * @param {string} number
 * @returns {string} parsedNumber
 */
function parseTwoDecimals(number) {

    var split = ("" + number).split(/[.,]/g);
    //If there are decimals
    if (split.length > 1) {
        if (split[1].length === 3) {
            number = number * 10;
        } else if (split[1].length === 1) {
            number = number / 10;
        }

    } else {
        number = number / 100;
    }

    return Number(number).toFixed(2).length <= 16 ? Number(number).toFixed(2) : 0;
}

function validateIsSapEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@sap.com$/;
    return re.test(email);
}

/********************another options**********************************/
//Minimum 8 characters at least 1 Alphabet, 1 Number and 1 Special Character://
//	"^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$"

//	Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet and 1 Number://
//	"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"

//	Minimum 8 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character:
//  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}"
//
//  Minimum 8 and Maximum 10 characters at least 1 Uppercase Alphabet, 1 Lowercase Alphabet, 1 Number and 1 Special Character:
//	"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,10}"
/**************************************************************************/
function validateIsPassword(value) {
//Minimum 6 characters at least 1 Alphabet and 1 Number:
    var re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    if (!re.test(value)) {
        throw ErrorLib.getErrors()
            .CustomError("", "util/validateIsPassword",
                "The PASSWORD should have minimum 6 characters at least, 1 alphabet and 1 number.");
    }
    ;
    return true;
}

function validateIsDecimal(value) {
    return isNumeric(value);
}

function validateLength(value, max, min, field) {
    if (!field) {
        field = "";
    }
    if (max)
        if (value.length > max) throw ErrorLib.getErrors()
            .CustomError("", "util/validateLength",
                "The " + field + " value should have between " + min + " and " + max + " characters");

    if (min)
        if (value.length < min) throw ErrorLib.getErrors()
            .CustomError("", "util/validateLength",
                "The " + field + " value should have between " + min + " and " + max + " characters");


    return true;
}

function validateIsString(value) {
    return (typeof value == "string");
}

function objectToArray(object) {
    var array = [];
    if (object) {
        Object.keys(object).forEach(function (key) {
            array.push(object[key]);
        });
    }
    return array;
}

function extractObject(object) {
    var aux = {};
    if (object) {
        Object.keys(object).forEach(function (key) {
            aux[key] = object[key];
        });
    }
    return aux;
}

function validateDateEndMayorStart(dateStart, dateEnd) {
    if (dateStart > dateEnd) {
        return true;
    }
    return false;
}

function isAdmin(userId) {
    var isA = userbl.isAdmin(userId);
    return isA;
}

function isSuperAdmin(userId) {
    var isSA = false;
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }
    return isSA;
}

function getMapCategoryOption(level, hl2Id) {
    var mapCategoryOption = {};
    var sp_result = Number(hl2Id)
        ? dataCategoryOptionLevel.getAllocationCountryCategoryOptionLevelByLevelId(level, hl2Id)
        : dataCategoryOptionLevel.getAllocationCategoryOptionLevelByLevelId(level);

    for (var i = 0; i < sp_result.length; i++) {
        var obj = sp_result[i];

        if (!mapCategoryOption[obj.CATEGORY_ID])
            mapCategoryOption[obj.CATEGORY_ID] = {};

        mapCategoryOption[obj.CATEGORY_ID][obj.OPTION_ID] = obj.CATEGORY_OPTION_LEVEL_ID

    }
    return mapCategoryOption;
}

function getMapCountryCategoryOption(level, hl2Id) {
    return getMapCategoryOption(level, hl2Id);
}

function getMapAvailableCategoryOptionByLevel(level) {
    var mapCategoryOption = {};
    var sp_result = dataCategoryOptionLevel.getAllocationCategoryOptionLevelByLevelId(level);

    for (var i = 0; i < sp_result.length; i++) {
        var obj = sp_result[i];
        if (Number(obj.ENABLED) && !Number(obj.DELETED)) {
            if (!mapCategoryOption[obj.CATEGORY_ID])
                mapCategoryOption[obj.CATEGORY_ID] = {};

            mapCategoryOption[obj.CATEGORY_ID][obj.OPTION_ID] = obj.CATEGORY_OPTION_LEVEL_ID
        }
    }
    return mapCategoryOption;
}

function getAllocationOptionByCategoryAndLevelId(level, hlId) {
    var mapCategoryOption = {};
    var sp_result = dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(level, hlId);
    for (var i = 0; i < sp_result.length; i++) {
        var obj = sp_result[i];

        if (!mapCategoryOption[obj.ALLOCATION_CATEGORY_ID])
            mapCategoryOption[obj.ALLOCATION_CATEGORY_ID] = [];

        mapCategoryOption[obj.ALLOCATION_CATEGORY_ID].push(obj);

    }
    return mapCategoryOption;
}

function getAllocationOptionInCrmVersionByCategoryAndLevelId(level, hlId) {
    var mapCategoryOption = {};
    var sp_result = dataCategoryOptionLevel.getAllocationOptionInCrmVersionByCategoryAndLevelId(level, hlId);
    for (var i = 0; i < sp_result.length; i++) {
        var obj = sp_result[i];

        if (!mapCategoryOption[obj.ALLOCATION_CATEGORY_ID])
            mapCategoryOption[obj.ALLOCATION_CATEGORY_ID] = [];

        mapCategoryOption[obj.ALLOCATION_CATEGORY_ID].push(obj);

    }
    return mapCategoryOption;
}

function getMapHl6ChangedFieldsByHl6Id(hl6_id) {
    var mapFields = {};
    var sp_result = dataL6DER.getL6ChangedFieldsByHl6Id(hl6_id);
    for (var i = 0; i < sp_result.length; i++) {
        var obj = sp_result[i];

        if (!mapFields[obj.COLUMN_NAME])
            mapFields[obj.COLUMN_NAME] = {};

        mapFields[obj.COLUMN_NAME] = obj.HL6_CRM_BINDING_ID;
    }
    return mapFields;
}

function getMapHl5ChangedFieldsByHl5Id(hl5_id) {
    var mapFields = {};
    var sp_result = dataL5DER.getL5ChangedFieldsByHl5Id(hl5_id);
    for (var i = 0; i < sp_result.length; i++) {
        var obj = sp_result[i];

        if (!mapFields[obj.COLUMN_NAME])
            mapFields[obj.COLUMN_NAME] = {};

        mapFields[obj.COLUMN_NAME] = obj.HL5_CRM_BINDING_ID;
    }
    return mapFields;
}

function getCategoryById(level, hlId) {
    var mapFields = {};
    var sp_result = !hlId ? dataCategory.getCategoryById(level) : dataCategory.getCategoryByLevelHlId(level, hlId);

    for (var i = 0; i < sp_result.length; i++) {
        var obj = sp_result[i];

        if (!mapFields[obj.CATEGORY_ID])
            mapFields[obj.CATEGORY_ID] = {};

        mapFields[obj.CATEGORY_ID] = obj;
    }
    return mapFields;


}

/*function getHash() {
 return config.getHash();
 }*/

function parseAssignedUsers(assignedUsers) {
    return assignedUsers.map(function (user) {
        return user.USER_ID || user.IN_USER_ID;
    });
}

function getHierarchyLevelEnum() {
    return {
        HL1: 6,
        HL2: 5,
        HL3: 4,
        HL4: 1,
        HL5: 2,
        HL6: 3
    }
}

function getTeamTypeEnum() {
    return {
        REGIONAL: 1,
        GLOBAL: 2
    };
}

/**
 *
 * @param statusId - status id (current level 4 status, level 5 status, level 6 status)
 * @param statusLevel - array with all the status by level
 * @param userId
 * @param {boolean} superAdmin
 * @returns {isSuperAdmin|boolean} - true if the user is super admin or if the status is different from Create in CRM or Update in CRM
 */
function getEnableEdit(statusId, statusLevel, userId, superAdmin, parentStatusId, granParentStatusId) {
    superAdmin = superAdmin == undefined ? isSuperAdmin(userId) : superAdmin;
    //TODO: Super admin validation added because of SAP new requirements, refactor this
    return Number(statusId) !== statusLevel.DELETED_IN_CRM && Number(parentStatusId || 0) !== statusLevel.DELETED_IN_CRM
        && Number(granParentStatusId || 0) !== statusLevel.DELETED_IN_CRM
        && (superAdmin || (Number(statusId) !== statusLevel.CREATE_IN_CRM && Number(statusId) !== statusLevel.UPDATE_IN_CRM));
}

function getCopyCrmDescription() {
    return "Copy";
    // return COPY_CRM_DESCRIPTION;
}

function getEventRequestCrmDescription() {
    return "Created from Event Request";
    // return CREATED_FROM_EVENT_REQUEST_CRM_DESCRIPTION;
}

/**
 *
 * @param headers - list of fields to use as headers for CSV content
 * @param rdo - array of objects to be separated by commas
 * @returns {string} - comma separated values to use as the CSV content
 */
function convertToCSV(headers, rdo) {

    var str = '';
    var j = 0;
    var line = '';

    //iterate object to generate the headers
    if (headers && headers.length) {
        for (j = 0; j < headers.length; j++) {
            if (line != '') line += ','
            line += headers[j];
        }
        str += line + '\r\n';
    }

    //iterate object to generate the lines
    for (j = 0; j < rdo.length; j++) {
        var rs = rdo[j];
        line = '';

        for (var k = 0; k < headers.length; k++) {
            var header = headers[k];
            if (line != '') {
                line += ','
            }
            line += rs[header];
        }
        str += line + '\r\n';
    }

    return str;
}

function getAcronymForHl5Legacy(pathHl5Legacy) {
    var acronym = pathHl5Legacy.split('-');

    if (acronym.length) {
        return acronym[acronym.length - 1];
    }
    else {
        return '';
    }
}

function parseLevelTreeByRegion(data, level) {
    var result = {};
    var TEAM_TYPE = getTeamTypeEnum();
    data.forEach(function (hl1) {
        result[hl1.HL1_TEAM_TYPE_ID] = result[hl1.HL1_TEAM_TYPE_ID] || {
            PATH: hl1.HL1_TEAM_TYPE_NAME,
            TEAM_TYPE_ID: hl1.HL1_TEAM_TYPE_ID,
            CHILDREN: {}
        };
        var item = {
            PATH: hl1.HL1_PATH,
            HL1_ID: hl1.HL1_ID,
            HL1_DESCRIPTION: hl1.HL1_DESCRIPTION,
            L2: {
                USE_DEFAULT: !hl1.DYNAMIC_FORM_L2_UID,
                DYNAMIC_FORM_UID: hl1.DYNAMIC_FORM_L2_UID
            },
            L3: {
                USE_DEFAULT: !hl1.DYNAMIC_FORM_L3_UID,
                DYNAMIC_FORM_UID: hl1.DYNAMIC_FORM_L3_UID
            },
            L4: {
                USE_DEFAULT: !hl1.DYNAMIC_FORM_L4_UID,
                DYNAMIC_FORM_UID: hl1.DYNAMIC_FORM_L4_UID
            },
            L5: {
                USE_DEFAULT: !hl1.DYNAMIC_FORM_L5_UID,
                DYNAMIC_FORM_UID: hl1.DYNAMIC_FORM_L5_UID
            },
            L6: {
                USE_DEFAULT: !hl1.DYNAMIC_FORM_L6_UID,
                DYNAMIC_FORM_UID: hl1.DYNAMIC_FORM_L6_UID
            }
        };
        if (hl1.HL1_TEAM_TYPE_ID == TEAM_TYPE.REGIONAL) {
            if (hl1.HL1_REGION_ID) {
                result[hl1.HL1_TEAM_TYPE_ID].CHILDREN[hl1.HL1_REGION_ID] = result[hl1.HL1_TEAM_TYPE_ID].CHILDREN[hl1.HL1_REGION_ID]
                    || {
                        PATH: hl1.HL1_REGION_NAME,
                        REGION_ID: hl1.HL1_REGION_ID,
                        CHILDREN: []
                    };

                result[hl1.HL1_TEAM_TYPE_ID].CHILDREN[hl1.HL1_REGION_ID].CHILDREN.push(item);
            }
        } else {
            if (hl1.HL1_PLANNING_PURPOSE_ID) {
                result[hl1.HL1_TEAM_TYPE_ID].CHILDREN[hl1.HL1_PLANNING_PURPOSE_ID] = result[hl1.HL1_TEAM_TYPE_ID].CHILDREN[hl1.HL1_PLANNING_PURPOSE_ID]
                    || {
                        PATH: hl1.HL1_PLANNING_PURPOSE_NAME,
                        PLANNING_PURPOSE_ID: hl1.HL1_PLANNING_PURPOSE_ID,
                        CHILDREN: []
                    };

                result[hl1.HL1_TEAM_TYPE_ID].CHILDREN[hl1.HL1_PLANNING_PURPOSE_ID].CHILDREN.push(item);
            }
        }
    });

    var parser = function (object) {
        var data2 = JSON.stringify(object, function (key, value) {
            if (value && typeof(value) === "object") {
                Object.keys(value).forEach(function (k) {
                    if (k === "CHILDREN") {
                        value[k] = objectToArray(value[k]);
                    }
                });
            }
            return value;
        });

        data2 = JSON.parse(data2);

        return objectToArray(data2);
    };
    return parser(result);
}

/**
 * Set the default values of the dynamic form to the data
 * @param {int} parentId - id of the parent level
 * @param {string} level - level name with the format L + number
 * @param {object} dataLevelBody - data to be completed with the default values from de corresponding dynamic form
 * @param {boolean} fromInsertMethod - true if the request was made from the insert level method
 * @param {boolean} isLegacy - true if the registry is legacy
 * @param {boolean} fromCloneMethod - true if the request was made from the clone method
 * @returns {object} - modified data with the default values set
 */
function completeFromDynamicForm(parentId, level, dataLevelBody, fromInsertMethod, isLegacy, fromCloneMethod) {
    var objectData = {};
    dataLevelBody = JSON.parse(JSON.stringify(dataLevelBody));

    // When the registry is been edited, then the dynamic form is selected by the DYNAMIC_FORM_ID.
    // If not, the dynamic form is selected by de UID by getting the HL1 using the parent id
    var dynamicFormId = (!fromInsertMethod && !fromCloneMethod) ? dataLevelBody.DYNAMIC_FORM_ID : null;
    var dynamicFormConfiguration = blDynamicForm.getFormByParentId(parentId, level, dynamicFormId, false, isLegacy);

    var tabKeys = Object.keys(dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.DYNAMIC_FIELDS);

    tabKeys.forEach(function (tabName) {
        var i;
        // Equivalent to Object.values() method because the method is not supported on the current JS version
        if(tabName !== 'BUDGET_DISTRIBUTION'){
        var arrDataTab = Object.keys(dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.DYNAMIC_FIELDS[tabName]).map(function (key) {
            return dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.DYNAMIC_FIELDS[tabName][key];
        });}

        // Replace the data values with the default values
        switch (tabName) {
            case "BUDGET_SPEND_REQUEST":
                for (i = 0; i < arrDataTab.length; i++) {
                    var objBudget = arrDataTab[i];
                    if (objBudget.HIDDEN) {
                        if (objectData.FIELD_NAME === "BUDGET"){
                            dataLevelBody.ALLOW_BUDGET_ZERO = objBudget.HIDDEN;
                        }
                        else {
                            var auxRegion = [];
                            if (dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.DYNAMIC_FIELDS.BUDGET_DISTRIBUTION) {
                                var regions = dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.DYNAMIC_FIELDS.BUDGET_DISTRIBUTION;

                                for (var j = 0; j < regions.length; j++) {
                                    var objRegion = regions[j];
                                    objRegion.ORGANIZATION_ID = objRegion.REGION_ID;
                                    objRegion.ORGANIZATION_TYPE = "REGIONAL";
                                    auxRegion.push(objRegion);
                                }
                            }

                            dataLevelBody.BUDGET_DISTRIBUTION = auxRegion;
                        }
                    }
                }
                break;
            case "TACTICS_DETAILS":
                for (i = 0; i < arrDataTab.length; i++) {
                    objectData = arrDataTab[i];
                    if (objectData.HIDDEN) {
                        if (objectData.FIELD_NAME === "SHOW_ON_DG_CALENDAR") {
                            dataLevelBody[objectData.FIELD_NAME] = !!objectData.DEFAULT_VALUE;
                        } else if (objectData.FIELD_NAME === "END_DATE") {
                            dataLevelBody["ACTUAL_END_DATE_STRING"] = getValidDateString(objectData.DEFAULT_VALUE);
                            dataLevelBody["PLANNED_END_DATE_STRING"] = getValidDateString(objectData.DEFAULT_VALUE);
                            dataLevelBody["ACTUAL_END_DATE"] = getValidDateString(objectData.DEFAULT_VALUE);
                            dataLevelBody["PLANNED_END_DATE"] = getValidDateString(objectData.DEFAULT_VALUE);
                        } else if (objectData.FIELD_NAME === "START_DATE") {
                            dataLevelBody["ACTUAL_START_DATE_STRING"] = getValidDateString(objectData.DEFAULT_VALUE);
                            dataLevelBody["PLANNED_START_DATE_STRING"] = getValidDateString(objectData.DEFAULT_VALUE);
                            dataLevelBody["ACTUAL_START_DATE"] = getValidDateString(objectData.DEFAULT_VALUE);
                            dataLevelBody["PLANNED_START_DATE"] = getValidDateString(objectData.DEFAULT_VALUE);
                        }
                        else {
                            dataLevelBody[objectData.FIELD_NAME] = objectData.DEFAULT_VALUE;
                        }
                    }
                }
                break;
            case "CAMPAIGN_FORECASTING_KPIS":
                for (i = 0; i < arrDataTab.length; i++) {
                    objectData = arrDataTab[i];
                    if (objectData.HIDDEN) {
                        dataLevelBody["TARGET_KPIS"][objectData.FIELD_NAME] = objectData.DEFAULT_VALUE;
                    }
                }
                break;
            case "DYNAMIC_FORMS_ALLOCATION_DETAIL":
                var arrAllocations = [];
                var objCategory = {};
                var allocation = {};
                // The categories behaves different depending on the method calling.
                if (fromInsertMethod) {
                    // When the method was called from the insert method,
                    // the dynamic form categories must be inserted in the payload.
                    arrAllocations = Object.keys(arrDataTab).map(function (key) {
                        return arrDataTab[key];
                    });

                    if (arrAllocations && arrAllocations.length) {
                        for (i = 0; i < arrAllocations.length; i++) {
                            objCategory = {"OPTIONS": []};
                            allocation = arrAllocations[i];
                            if (allocation.HIDDEN && allocation.ALLOCATION_OPTION_ID) {
                                objCategory.CATEGORY_ID = allocation.ALLOCATION_CATEGORY_ID;
                                objCategory.CATEGORY_TYPE_ID = CATEGORY_TYPE.OPTION;
                                objCategory.MAKE_CATEGORY_MANDATORY = allocation.MAKE_CATEGORY_MANDATORY;
                                objCategory.OPTIONS_LIMIT = allocation.OPTIONS_LIMIT;
                                objCategory.HIDDEN = allocation.HIDDEN;
                                objCategory.OPTIONS.push({
                                    "OPTION_ID": allocation.ALLOCATION_OPTION_ID,
                                    "AMOUNT": allocation.BUDGET_DEFAULT_VALUE,
                                    "AMOUNT_KPI": allocation.KPI_DEFAULT_VALUE
                                });
                                dataLevelBody.CATEGORIES.push(objCategory);
                            }
                        }

                    }
                } else if (fromCloneMethod) {
                    // When the method was called from the clone method,
                    // then the dynamic form categories must replace the categories from the data
                    arrAllocations = Object.keys(arrDataTab).map(function (key) {
                        return arrDataTab[key];
                    });
                    if (arrAllocations && arrAllocations.length) {
                        for (i = 0; i < arrAllocations.length; i++) {
                            allocation = arrAllocations[i];
                            if (allocation.HIDDEN) {
                                // Find the category in the data that should be replaced by the dynamic form default value
                                // To found it, the category id is compared with the allocation category id of the dynamic form
                                // When the result is [], it means that there are not default values for the current category in the dynamic form configuration
                                var categoryToReplace = dataLevelBody.CATEGORIES.filter(function (category) {
                                    return Number(category.CATEGORY_ID) === Number(allocation.ALLOCATION_CATEGORY_ID);
                                });
                                // If the category doesn't exist, then the clone method continues with its normal behavior
                                if (categoryToReplace.length > 0) {
                                    // Find the option in the category found that should be replaced by the dynamic form default value
                                    // To found it, the option id is compared with the allocation option id of the dynamic form
                                    // When the result is [], it means that the default values for the current option is null
                                    // because the category is not mandatory, was selected in the dynamic form as hidden and no default value was selected
                                    var optionToReplace = categoryToReplace[0].OPTIONS.filter(function (option) {
                                        return Number(option.OPTION_ID) === Number(allocation.ALLOCATION_OPTION_ID);
                                    });
                                    if (optionToReplace.length > 0) {
                                        // Changed options values to 0 because the default option will have 100% or 0%
                                        categoryToReplace[0].OPTIONS.forEach(function (option) {
                                            option.AMOUNT = 0;
                                            option.AMOUNT_KPI = 0;
                                            option.UPDATED = 0;
                                        });
                                        // If the option was found, then the values are replaced
                                        optionToReplace[0].OPTION_ID = allocation.ALLOCATION_OPTION_ID;
                                        optionToReplace[0].AMOUNT = allocation.BUDGET_DEFAULT_VALUE;
                                        optionToReplace[0].AMOUNT_KPI = allocation.KPI_DEFAULT_VALUE;
                                    } else {
                                        var index = dataLevelBody.CATEGORIES.indexOf(categoryToReplace[0]);
                                        dataLevelBody.CATEGORIES.splice(index, 1);
                                    }
                                }
                            }
                        }

                    }
                }
                break;
        }
    });
    dataLevelBody.DYNAMIC_FORM_ID = dynamicFormConfiguration.DYNAMIC_FORM_ID;
    return dataLevelBody;
}

function completeFromDynamicFormByRole(userId, hierarchyLevelId, payload, budgetYearId) {
    var objectData = {};
    //List of required fields that are hidden and does not have default value.
    var requiredFieldError = [];

    payload = JSON.parse(JSON.stringify(payload));

    var dynamicFormConfiguration = blDynamicForm.getFormByRoleAndBudgetYear(budgetYearId, null, false, userId, hierarchyLevelId, true);

    var tabKeys = Object.keys(dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.DYNAMIC_FIELDS);

    tabKeys.forEach(function (tabName) {
        var i;
        // Equivalent to Object.values() method because the method is not supported on the current JS version
        var arrDataTab = Object.keys(dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.DYNAMIC_FIELDS[tabName]).map(function (key) {
            return dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.DYNAMIC_FIELDS[tabName][key];
        });

        // Replace the data values with the default values
        switch (tabName) {
            case "PLAN":
            case "TEAM":
            case "DESCRIPTION":
            case "PRIORITY_SUB_TEAM":
                for (i = 0; i < arrDataTab.length; i++) {
                    if (arrDataTab[i]) {
                        objectData = arrDataTab[i];
                        if (objectData.HIDDEN) {
                            switch (objectData.FIELD_NAME) {
                                case "IMPLEMENT_EXECUTION_LEVEL":
                                case "CRT_RELATED":
                                    payload[objectData.FIELD_NAME] = !!objectData.DEFAULT_VALUE ? 1 : 0;
                                    break;
                                case "PLANNING_PURPOSE_ID":
                                    if (payload.TEAM_TYPE_ID == TEAM_TYPE.REGIONAL) {
                                        payload.REGION_ID = objectData.DEFAULT_VALUE;
                                        payload.PLANNING_PURPOSE_ID = null;
                                    } else if (payload.TEAM_TYPE_ID == TEAM_TYPE.GLOBAL) {
                                        payload.REGION_ID = null;
                                        payload.PLANNING_PURPOSE_ID = objectData.DEFAULT_VALUE;
                                    }
                                    break;
                                default:
                                    payload[objectData.FIELD_NAME] = objectData.DEFAULT_VALUE;
                                    break;
                            }

                            //iF the hidden field is mandatory and has not default value, then add the field to the error stack
                            if (objectData.MANDATORY && !objectData.DEFAULT_VALUE && !isSpecialCase(objectData)) {
                                requiredFieldError.push(objectData.FIELD_DISPLAY_NAME);
                            }
                        }
                    }
                }
                break;
            case "CAMPAIGN_FORECASTING_KPIS":
                for (i = 0; i < arrDataTab.length; i++) {
                    if (arrDataTab[i]) {
                        objectData = arrDataTab[i];
                        if (objectData.HIDDEN) {
                            payload["TARGET_KPIS"][objectData.FIELD_NAME] = objectData.DEFAULT_VALUE;
                            //If there are no comments and the whole tab is hidden, then it is an error on insertion
                            if (dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.TAB_NAME.CAMPAIGN_FORECASTING_KPIS.HIDDEN &&
                                objectData.FIELD_NAME == "COMMENTS" &&
                                !objectData.DEFAULT_VALUE
                            ) {
                                requiredFieldError.push("Campaign Forecasting KPIs.");
                            }
                        }
                    }
                }
                break;
            case "DYNAMIC_FORMS_ALLOCATION_DETAIL":
                for (i = 0; i < arrDataTab.length; i++) {
                    if (arrDataTab[i]) {
                        objectData = arrDataTab[i];
                        if (objectData.HIDDEN) {
                            if (objectData.FIELD_NAME === "ALLOCATION_CATEGORY_OPTION_LEVEL_ID") {
                                for (var z = 0; z < payload.CATEGORIES[i].OPTIONS.length; z++) {
                                    if (payload.CATEGORIES[i].OPTIONS[z].OPTION_ID == objectData.ALLOCATION_OPTION_ID) {
                                        payload.CATEGORIES[i].OPTIONS[z].AMOUNT = Number(objectData.BUDGET_DEFAULT_VALUE)
                                    }
                                }
                            }

                            //If the hidden field is mandatory and has not default value, then add the field to the error stack
                            if (objectData.MANDATORY && !objectData.OPTION_DEFAULT_NAME) {
                                requiredFieldError.push("Attributes: " + objectData.CATEGORY_DEFAULT_NAME);
                            }
                        }
                    }
                }
                break;
        }
    });

    //Check for hidden tabs without fields available to hide but required in order to Insert
    if (dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.TAB_NAME.DYNAMIC_FORMS_ALLOCATION_DETAIL && dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.TAB_NAME.DYNAMIC_FORMS_ALLOCATION_DETAIL.HIDDEN) {
        requiredFieldError.push("Budget Distribution");
    }
    if (dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.TAB_NAME.USER_ASSOCIATION && dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.TAB_NAME.USER_ASSOCIATION.HIDDEN) {
        requiredFieldError.push("User Association");
    }
    if (dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.TAB_NAME.BUDGET_EVENT_APPROVERS && dynamicFormConfiguration.DYNAMIC_FORM_CONFIG_DATA.TAB_NAME.BUDGET_EVENT_APPROVERS.HIDDEN) {
        requiredFieldError.push("Budget Approvers / Event Approvers");
    }

    if (requiredFieldError.length) {
        throw ErrorLib.getErrors().DynamicFormError("Form Configuration error.", null, requiredFieldError);
    }

    payload.DYNAMIC_FORM_ID = dynamicFormConfiguration.DYNAMIC_FORM_ID;
    return payload;
}

/** Avoid certain field to be added to the error stack of required empty fields**/
function isSpecialCase(fieldData) {
    var isSpecial = false;

    switch (fieldData.FIELD_NAME) {
        case "COMMENTS":
        case "IMPLEMENT_EXECUTION_LEVEL":
        case "CRT_RELATED":
        case "ALLOW_AUTOMATIC_BUDGET_APPROVAL":
            isSpecial = true;
            break;
    }

    return isSpecial;
}

/**
 In this function we obtain the dynamic fields visibility based on the user role
 Also, we have the current information (Hierarchy level data without edition).
 Then, we validate if the field is visible for the user and, based on that, we replace
 the current data with the received in the payload.
 This logic has the gold to edit only the fields visible for the user and avoid everything else.
 **/
function completeDynamicFormEdition(userId, hierarchyLevelId, payload, currentData, budgetYearId) {
    var dynamicForm = JSON.parse(JSON.stringify(blDynamicForm.getFormByRoleAndBudgetYear(budgetYearId, null, true, userId, hierarchyLevelId)));

    //Step on each Tab
    Object.keys(dynamicForm.DYNAMIC_FIELDS).forEach(function (tab) {
        switch (tab) {
            case "USER_ASSOCIATION":
                if (!dynamicForm.DYNAMIC_FIELDS[tab].TAB) {
                    payload.ASSIGNED_USERS = currentData.ASSIGNED_USERS;
                }
                break;
            case "BUDGET_EVENT_APPROVERS":
                if (!dynamicForm.DYNAMIC_FIELDS[tab].TAB) {
                    payload.BUDGET_APPROVERS = currentData.BUDGET_APPROVERS;
                    payload.EVENT_APPROVERS = currentData.EVENT_APPROVERS;
                }
                break;
            case "DYNAMIC_FORMS_ALLOCATION_DETAIL":
                if (!dynamicForm.DYNAMIC_FIELDS[tab].TAB) {
                    payload.CATEGORIES = currentData.CATEGORIES;
                } else {
                    var arrDataTab = Object.keys(dynamicForm.DYNAMIC_FIELDS[tab]).map(function (key) {
                        return dynamicForm.DYNAMIC_FIELDS[tab][key];
                    });

                    for (var i = 0; i < arrDataTab.length; i++) {
                        if (arrDataTab[i]) {
                            var objectData = arrDataTab[i];
                            if (objectData.HIDDEN) {
                                if (objectData.FIELD_NAME === "ALLOCATION_CATEGORY_OPTION_LEVEL_ID") {
                                    if (payload.CATEGORIES[i].CATEGORY_ID === currentData.CATEGORIES[i].CATEGORY_ID) {
                                        payload.CATEGORIES[i].OPTIONS = currentData.CATEGORIES[i].OPTIONS;
                                    }
                                }
                            }
                        }
                    }
                }

                break;
            default:
                //Step in each Field
                Object.keys(dynamicForm.DYNAMIC_FIELDS[tab]).forEach(function (field) {
                    switch (field) {
                        case "COMMENT":
                            if (dynamicForm.DYNAMIC_FIELDS[tab][field] && currentData.TARGET_KPIS[field]) {
                                if (!payload.TARGET_KPIS) {
                                    payload.TARGET_KPIS = {};
                                }
                                payload.TARGET_KPIS[field] = currentData.TARGET_KPIS[field];
                            }
                            break;
                        default:
                            //if the field is hidden, and both current data and the payload have it -> replace the current data field
                            if (!dynamicForm.DYNAMIC_FIELDS[tab][field] && currentData[field] && payload[field]) {
                                payload[field] = currentData[field];
                            }
                            break;
                    }
                });
                break;
        }
    });

    return payload;
}

function getFormattedDate(dateValue) {
    return new Date(getValidDateString(dateValue));
}

function getValidDateString(date) {
    var century = getCentury();
    var data = date.split("/");

    data[0] = data[0].length === 1 ? "0" + data[0] : data[0];
    data[1] = data[1].length === 1 ? "0" + data[1] : data[1];
    data[2] = century + data[2];

    return data[1] + "/" + data[0] + "/" + data[2]
}

function getCentury() {
    var currentDate = new Date();
    var fullYear = currentDate.getFullYear();
    return fullYear.toString().substr(fullYear.toString().length - 4, 2);
}

function planningLevelGridParser(object) {
    var data2 = JSON.stringify(object, function (key, value) {
        if (value) {
            Object.keys(value).forEach(function (k) {
                if (k === "CHILDREN") {
                    value[k] = objectToArray(value[k]);
                }
            });
        }
        return value;
    });

    data2 = JSON.parse(data2);

    return objectToArray(data2);
}