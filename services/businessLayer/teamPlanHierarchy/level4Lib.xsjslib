/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;

/********** General Libs ***********/
//Basic
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var dataUtil = mapper.getDataUtil();
var config = mapper.getDataConfig();
var mail = mapper.getMail();

//Hl4 Related
var dataCurrency = mapper.getDataCurrency();
var budgetYear = mapper.getBudgetYear();
var pathBL = mapper.getPath();
var dataPath = mapper.getDataPath();

/********** User Libs ***********/
var userLib = mapper.getUser();
var userDataRole = mapper.getDataUserRole();
var userData = mapper.getDataUser();

/********** Category Libs ***********/
var dataCategory = mapper.getDataCategory();
var dataOption = mapper.getDataOption();
var allocationCategoryOptionLevelLib = mapper.getAllocationCategoryOptionLevelLib();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var AllocationCategory = mapper.getAllocationCategoryLib();

/********** Partner Libs ***********/
var partnerLib = mapper.getPartner();
var dataPartner = mapper.getDataPartner();

/********** KPI Libs ***********/
var expectedOutcomesLib = mapper.getExpectedOutcomes();
var dataExOut = mapper.getDataExpectedOutcome();

/********** Level 3 Libs ***********/
var level3BL = mapper.getLevel3();
var dataHl3 = mapper.getDataLevel3();

/********** Level 4 Libs ***********/
var dataHl4 = mapper.getDataLevel4();
var level4DER = mapper.getLevel4DEReport();
var dataL4Report = mapper.getDataLevel4Report();

/********** Level 5 Libs ***********/
var level5Lib = mapper.getLevel5();

/********** Dynamic Form Lib ***********/
var blDynamicForm = mapper.getDynamicFormLib();

/*********************** MESSAGES ***********************/

var levelCampaign = "Initiative/Campaign";

var L3_MSG_INITIATIVE_NOT_FOUND = "The Initiative/Campaign can not be found.";
var L3_MSG_USER_NOT_FOUND = "The User can not be found.";
var L3_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L3_MSG_CANNOT_DEL_STATUS = "Cannot delete this selected Initiative/Campaign, because the status doesn´t allow it.";
var L3_MSG_INITIATIVE_DETAIL = "The Initiative/Campaign details can not be null or empty.";
var L3_MSG_INITIATIVE_BUSINESS = "The Initiative/Campaign business value can not be null or empty.";
var L3_MSG_INITIATIVE_ACRONYM = "The Initiative/Campaign acronym can not be null or empty.";
var L3_MSG_INITIATIVE_IN_CRM = "Cannot modified CRM ID if already exists in CRM.";
var L3_MSG_INITIATIVE_EXISTS = "Another Initiative/Campaign with the same acronym already exists on this plan.";
var L4_MSG_INITIATIVE_CREATED = "Another Initiative/Campaign with the same acronym already exists.";
var L4_MSG_CRM_PATH_CREATED = "Another Initiative/Campaign or Priority/Sub-Team with the same CRM ID already exists.";
var L4_MSG_INITIATIVE_EXISTS_IN_L3 = "Another Priority/Sub-team with the same acronym already exists.";
var L3_MSG_INITIATIVE_ACRONYM_LENGTH = "The Initiative/Campaign Acronym length must be 3 characters.";
var L3_MSG_INITIATIVE_CRM_DESCRIPTION = "The Initiative/Campaign CRM description can not be null or empty.";
var L3_MSG_INITIATIVE_BUDGET_VALUE = "The Initiative/Campaign Budget value must be greater than zero.";
var L3_MSG_INITIATIVE_BUDGET_PERCENT = "The Initiative/Campaign in My Budget percentage should be less than or equal to 100%.";
var L3_MSG_INITIATIVE_SALES_OTHER = "The Initiative/Campaign in Sales Other has not attributes.";
var L3_CAMPAIGN_FORECASTING_KPIS_NOT_VALID = "Campaign Forecasting / KPIS is not valid.";
var L3_CAMPAIGN_FORECASTING_KPIS_VOLUME = "Campaign Forecasting / KPIS volume must be equal or lower than available volume.";
var L3_CAMPAIGN_FORECASTING_KPIS_VALUE = "Campaign Forecasting / KPIS value must be equal or lower than available value.";
var L3_CATEGORY_NOT_EMPTY = "Category cannot be empty.";
var L3_CATEGORY_INCORRECT_NUMBER = "Incorrect number of categories.";
var L3_CATEGORY_OPTIONS_INCORRECT_NUMBER = "Incorrect number of options.";
var L3_CATEGORY_NOT_VALID = "Category is not valid.";
var L3_CATEGORY_TOTAL_PERCENTAGE = "Category total percentage should be less than or equal to 100%.";
var L3_CATEGORY_OPTION_NOT_VALID = "Option or User is not valid.";
var L3_MSG_INITIATIVE_COULDNT_CHAGE_STATUS = "Your record was saved as \"In progress\".  Please review your record for incomplete fields.";
var L3_MSG_MISSING_DATA = "File is empty.";
var L3_CAMPAIGN_FORECASTING_KPIS_COMMENT = "Please enter a comment to explain expected outcomes as you didn't select any Campaign type.";
var L3_NOT_IMPLEMENT_EXECUTION_LEVEL = "This PROGRAMS/CAMPAIGNS does not implement execution level.";
var L4_ID_NOT_FOUND = "The HL4 ID could not be found.";
var MSG_ENABLE_CRM_CREATION = "Please note this is a code for a future year. It has been successfully saved with a status “VALID FOR CRM” but cannot be created in CRM at this time. Please contact your local BMO if you have any questions.";

/*********************** CONSTANTS ***********************/

var HL4_STATUS = {
    IN_PROGRESS: 1,
    CREATE_IN_CRM: 2,
    IN_CRM: 3,
    UPDATE_IN_CRM: 4,
    EXCEED_BUDGET: 5,
    COMPLETE: 6,
    VALID_FOR_CRM: 7,
    DELETION_REQUEST: 9,
    DELETED_IN_CRM: 10
};

var HIERARCHY_LEVEL = {
    HL1: 6,
    HL2: 5,
    HL3: 4,
    HL4: 1,
    HL5: 2,
    HL6: 3
};

var USER_ROLE = {
    SUPER_ADMIN: 1,
    ADMIN: 2,
    DATA_ENTRY: 3,
    CAMPAIGN_MANAGER: 4
};

var GENERAL_FILTER_MAP = {
    REGIONAL_MARKETING: 1,
    PRODUCT_MARKETING: 2,
    FUNCTIONAL_TEAMS: 3,
    COMMUNICATIONS: 4,
    BUSINESS_STRATEGY_CULTURE: 5,
    OTHER_MARKETING: 6,
    INDUSTRY_MARKETING: 7
};

var LEVEL_STRING = 'HL4';

/*********************** END CONSTANTS ***********************/


/** GET **/

function getHl4(id, userId, forTeamPlanHierarchy) {
    var spResult = dataHl4.getHl4(id);
    var result = [];
    var isSA = util.isSuperAdmin(userId);
    spResult.out_result.forEach(function (hl4) {
        var l4 = {};
        var enableAction = getEnableAction(hl4, userId, isSA);
        if (forTeamPlanHierarchy) {
            l4 = {
                HL_ID: hl4.HL4_ID,
                PARENT_ID: id,
                BUDGET: hl4.HL4_BUDGET,
                BUDGET_PERCENTAGE: hl4.L4_BUDGET_PERCENTAGE,
                BUDGET_REMAINING: hl4.REMAINING,
                CHILDREN_TOTAL_COUNT: hl4.TOTAL_HL5,
                ACRONYM: hl4.HL4_ACRONYM,
                CRM_ID: hl4.CRM_ID,
                BUDGET_ALLOCATED: hl4.ALLOCATED,
                DESCRIPTION: hl4.HL4_CRM_DESCRIPTION,
                STATUS_DETAIL: hl4.STATUS_DETAIL,
                STATUS_ID: hl4.STATUS_ID,
                IMPLEMENT_EXECUTION_LEVEL: hl4.IMPLEMENT_EXECUTION_LEVEL,
                IN_CRM_CHILD_HL5: hl4.IN_CRM_CHILD_HL5,
                IN_CRM_CHILD_HL6: hl4.IN_CRM_CHILD_HL6,
                ENABLE_CRM_CREATION: hl4.ENABLE_CRM_CREATION,
                HIERARCHY_LEVEL_ID: HIERARCHY_LEVEL.HL4,
                ENABLE_DELETION: enableAction.ENABLE_DELETION,
                ENABLE_CHANGE_STATUS: enableAction.ENABLE_CHANGE_STATUS,
                ENABLE_EDIT: enableAction.ENABLE_EDIT
            }
        } else {
            l4 = util.extractObject(hl4);
            l4.CRM_ID = hl4.CRM_ID;
            l4.PATH = hl4.CRM_ID;
            l4.HL4_TOTAL = hl4.HL4_BUDGET;
            l4.TOTAL_HL5 = hl4.TOTAL_HL5;
            l4.QUANTITY_HL5_OUT_BUDGET = hl4.QUANTITY_HL5_OUT_BUDGET;
            l4.ALLOCATED = hl4.ALLOCATED;
            l4.REMAINING = hl4.REMAINING;
            l4.ENABLE_DELETION = enableAction.ENABLE_DELETION;
            l4.ENABLE_CHANGE_STATUS = enableAction.ENABLE_CHANGE_STATUS;
            l4.ENABLE_EDIT = enableAction.ENABLE_EDIT;
        }
        result.push(l4);
    });

    var responseObj = {
        "results": result,
        "total_budget": spResult.out_total_budget,
        "remaining_budget": spResult.out_remaining_budget,
        "out_total_allocated": spResult.out_total_allocated
    };

    responseObj.budget_year = budgetYear.getBudgetYearByLevelParent(4, id, true);
    return responseObj;
}

function getHL4CarryOverById(hl4Id, userId) {
    if (!hl4Id) {
        throw ErrorLib.getErrors().BadRequest("The HL4 ID could not be found.", "", L4_ID_NOT_FOUND);
    }
    var budgetYearId = budgetYear.getBudgetYearByLevelParent(5, hl4Id);
    var requiredDFObject = JSON.parse(JSON.stringify(budgetYear.getRequireDynamicFormByBudgetYearId(budgetYearId)));

    var result = {};
    result.HL4 = dataHl4.getHL4CarryOverById(hl4Id);
    result.DYNAMIC_FORM = (Number(requiredDFObject.REQUIRE_DYNAMIC_FORM) === 1) ? blDynamicForm.getFormByParentId(hl4Id, 'L5', null, true, false) : blDynamicForm.getCompleteForm(HIERARCHY_LEVEL.HL5);

    return result;
}

function getParentRemainingBudgetByParentId(hl3Id) {
    return dataHl3.getHl3RemainingBudgetByHl3Id(hl3Id)
}

function getImplementExecutionLevel(hl4Id) {
    if (!dataHl4.getImplementExecutionLevel(hl4Id))
        throw ErrorLib.getErrors().BadRequest("PROGRAMS/CAMPAIGNS does not implement execution level.", "", L3_NOT_IMPLEMENT_EXECUTION_LEVEL);

    return 1;
}

function getHl4ById(hl4Id) {
    if (!hl4Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "", L3_MSG_INITIATIVE_NOT_FOUND);

    var objHl4 = JSON.parse(JSON.stringify(dataHl4.getHl4ById(hl4Id)));

    objHl4.TARGET_KPIS = expectedOutcomesLib.getExpectedOutcomesByHl4IdRefactor(hl4Id, objHl4.HL3_ID);
    objHl4.CATEGORIES = getHl4CategoryOption(hl4Id);
    objHl4.BUDGET = Number(objHl4.BUDGET).toFixed(2);

    return objHl4;
}

function getUserById(id) {
    if (!id) {
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "", L3_MSG_USER_NOT_FOUND);
    }
    return userData.getUserById(id);

}

function getLevel4ForSearch(budgetYearId, regionId, subRegionId, limit, offset, userSessionID) {
    var defaultBudgetYear = budgetYear.getDefaultBudgetYear();
    var results = dataHl4.getLevel4ForSearch(budgetYearId || defaultBudgetYear.BUDGET_YEAR_ID, regionId || 0, subRegionId || 0, limit || -1, offset || 0, userSessionID, util.isSuperAdmin(userSessionID) ? 1 : 0);
    results = JSON.parse(JSON.stringify(results));
    var isSuperAdmin = util.isSuperAdmin(userSessionID);
    results.result.forEach(function (elem) {
        elem.ENABLE_EDIT = util.getEnableEdit(elem.HL4_STATUS_DETAIL_ID, HL4_STATUS, userSessionID, isSuperAdmin);
    });
    return results;
}

function getHl4ByBudgetYear(hl4Id) {
    return dataHl4.getHl4ByBudgetYear(hl4Id || null);
}

function getSYSUUID() {
    var conn = $.hdb.getConnection();

    try {

        // Delete any existing token for this user
        var spUserToken = conn.loadProcedure('MKTG_PLANNING_TOOL', 'mktgplanningtool.db.procedures::GET_SYSUUID');
        var result = spUserToken();
        conn.close();

        var spResult = result['out_result'];
        if (spResult != null && spResult.length > 0) {
            var rowResult = spResult[0];
            return rowResult['SYS_UNIQUE_NUMBER'];
        }

        return null;

    } catch (e) {
        conn.close();
        throw e;
    }
}

function getHl4CategoryOption(hl4Id) {
    return allocationCategoryOptionLevelLib.getHlCategoryOptionByLevelHlId(LEVEL_STRING, hl4Id);
}

function getCategoryOptionVersioned(data) {
    return allocationCategoryOptionLevelLib.getHlCategoryOptionVersionedByLevelHlId(LEVEL_STRING, data.HL4_ID);
}

function getLevel4Kpi(hl3Id, userId) {
    var result = {};
    var mapKpi = {};
    var listFromData = dataHl4.getHl4KpiSummary(hl3Id);
    var isSA = util.isSuperAdmin(userId);
    listFromData.forEach(function (hl) {
        var enableAction = getEnableAction(hl, userId, isSA);
        mapKpi[hl.L4_ACRONYM] = mapKpi[hl.L4_ACRONYM] || {
            HL4_ID: hl.HL4_ID,
            CRM_ID: hl.CRM_ID,
            HL3_ID: hl.HL3_ID,
            ACRONYM: hl.L4_ACRONYM,
            HL4_DESCRIPTION: hl.HL4_DESCRIPTION,
            HIERARCHY_LEVEL_ID: HIERARCHY_LEVEL.HL4,
            IN_CRM_CHILD_HL5: hl.IN_CRM_CHILD_HL5,
            IN_CRM_CHILD_HL6: hl.IN_CRM_CHILD_HL6,
            STATUS_ID: hl.STATUS_ID,
            CHILDREN_TOTAL_COUNT: hl.CHILDREN_TOTAL_COUNT,
            STATUS_DETAIL: hl.STATUS_DETAIL,
            ENABLE_DELETION: enableAction.ENABLE_DELETION,
            ENABLE_CHANGE_STATUS: enableAction.ENABLE_CHANGE_STATUS,
            ENABLE_EDIT: enableAction.ENABLE_EDIT
        };
        var auxKpi = mapKpi[hl.L4_ACRONYM].kpi || [];
        if (hl.KPI_TYPE_NAME) {
            auxKpi.push({
                ALLOCATED_VALUE: hl.TOTAL_VALUE_ALLOCATED
                , ALLOCATED_VOLUME: hl.TOTAL_VOLUME_ALLOCATED
                , OUTCOMES_NAME: hl.KPI_TYPE_NAME
                , OUTCOMES_TYPE_NAME: hl.KPI_OPTION_NAME
                , TOTAL_VALUE: hl.TOTAL_VALUE
                , TOTAL_VOLUME: hl.TOTAL_VOLUME
            });
        }
        mapKpi[hl.L4_ACRONYM].kpi = auxKpi;
    });
    result.out_result = Object.keys(mapKpi).map(function (e) {
        return mapKpi[e]
    });
    return result;
}

function getMarketingTacticsTree(budgetYearId, regionId, subRegionId, generalFilter){
    return getHl4ByUserGroupByHl1(null, budgetYearId, regionId, subRegionId, generalFilter);
}

function getHl4ByUserGroupByHl1(userId, budgetYearId, regionId, subRegionId, generalFilter) {
    var currentRegion = regionId ? regionId : 0;
    var superRegion = [];
    var isSA = userId ? util.isSuperAdmin(userId) : 1;
    var hl3 = dataHl4.getHl4PathByUserId(userId || 0, isSA, budgetYearId || 0, regionId || 0, subRegionId || 0);
    var collection = {};

    var parser = function (object) {
        var data2 = JSON.stringify(object, function (key, value) {
            if (value) {
                Object.keys(value).forEach(function (k) {
                    if (k === "CHILDREN") {
                        value[k] = util.objectToArray(value[k]);
                    }
                });
            }
            return value;
        });

        data2 = JSON.parse(data2);

        return util.objectToArray(data2);
    };

    if (!generalFilter || generalFilter === "REGIONAL_MARKETING") {

        hl3.forEach(function (item) {
            if (Number(item.HL1_REGION_ID) !== 0) { //The 'zero' part is only for broken records in Dev/Testing
                if (!collection[item.HL1_REGION_ID]) {
                    collection[item.HL1_REGION_ID] = {
                        PATH: item.HL1_REGION_NAME,
                        REGION_ID: item.HL1_REGION_ID,
                        CHILDREN: {}
                    }
                }

                if (!collection[item.HL1_REGION_ID].CHILDREN[item.HL1_ID]) {
                    collection[item.HL1_REGION_ID].CHILDREN[item.HL1_ID] = {
                        HL1_ID: item.HL1_ID
                        , PATH: item.HL1_PATH
                        , HL1_DESCRIPTION: item.HL1_DESCRIPTION
                        , CHILDREN: {}
                    };
                }

                if (!collection[item.HL1_REGION_ID].CHILDREN[item.HL1_ID].CHILDREN[item.HL2_ID]) {
                    collection[item.HL1_REGION_ID].CHILDREN[item.HL1_ID].CHILDREN[item.HL2_ID] = {
                        HL2_ID: item.HL2_ID
                        , PATH: item.HL2_PATH
                        , HL2_DESCRIPTION: item.HL2_DESCRIPTION
                        , CHILDREN: []
                    };
                }

                if (!collection[item.HL1_REGION_ID].CHILDREN[item.HL1_ID].CHILDREN[item.HL2_ID].CHILDREN[item.HL3_ID]) {
                    collection[item.HL1_REGION_ID].CHILDREN[item.HL1_ID].CHILDREN[item.HL2_ID].CHILDREN[item.HL3_ID] = {
                        HL3_ID: item.HL3_ID,
                        PATH: item.HL3_PATH,
                        HL3_DESCRIPTION: item.HL3_DESCRIPTION,
                        CHILDREN: []
                    };
                }

                collection[item.HL1_REGION_ID].CHILDREN[item.HL1_ID].CHILDREN[item.HL2_ID].CHILDREN[item.HL3_ID].CHILDREN.push({
                    HL4_ID: item.HL4_ID,
                    PATH: item.HL4_PATH,
                    HL4_DESCRIPTION: item.HL4_DESCRIPTION
                });
            }
        });

        var regions = {PATH: "Regions", CHILDREN: parser(collection)};
        superRegion.push(regions);

    }

    if (!generalFilter || generalFilter !== "REGIONAL_MARKETING") {

        if (!Number(currentRegion)) {
            var globalCollection = getHl4ByPlanningPurpose(userId || 0, isSA, budgetYearId || 0, generalFilter);
            if (globalCollection && Object.keys(globalCollection).length) {
                var global = {PATH: "Hierarchy", CHILDREN: parser(globalCollection)};
                superRegion.push(global);
            }

        }
    }

    return superRegion;
}

function getHl4ByPlanningPurpose(userId, isSA, budgetYearId, generalFilter) {
    var hl3 = dataHl4.getHl4ByPlanningPurpose(userId, isSA, budgetYearId);

    var collection = {};
    var includeIndustry = !!(generalFilter && generalFilter === "PRODUCT_MARKETING");

    if (hl3 && hl3.length) {
        hl3.forEach(function (item) {
            if(!generalFilter || (GENERAL_FILTER_MAP[generalFilter] === Number(item.PLANNING_PURPOSE_ID)) || (includeIndustry && GENERAL_FILTER_MAP.INDUSTRY_MARKETING === Number(item.PLANNING_PURPOSE_ID))){
                if (!collection[item.PLANNING_PURPOSE_ID]) {
                    collection[item.PLANNING_PURPOSE_ID] = {
                        PATH: item.PLANNING_PURPOSE_NAME,
                        PLANNING_PURPOSE_ID: item.PLANNING_PURPOSE_ID,
                        CHILDREN: {}
                    }
                }

                if (!collection[item.PLANNING_PURPOSE_ID].CHILDREN[item.HL1_ID]) {
                    collection[item.PLANNING_PURPOSE_ID].CHILDREN[item.HL1_ID] = {
                        HL1_ID: item.HL1_ID
                        , PATH: item.HL1_PATH
                        , HL1_DESCRIPTION: item.HL1_DESCRIPTION
                        , CHILDREN: {}
                    };
                }

                if (!collection[item.PLANNING_PURPOSE_ID].CHILDREN[item.HL1_ID].CHILDREN[item.HL2_ID] && !!item.HL2_ID) {
                    collection[item.PLANNING_PURPOSE_ID].CHILDREN[item.HL1_ID].CHILDREN[item.HL2_ID] = {
                        HL2_ID: item.HL2_ID
                        , PATH: item.HL2_PATH
                        , HL2_DESCRIPTION: item.HL2_DESCRIPTION
                        , CHILDREN: []
                    };
                }

                if (!collection[item.PLANNING_PURPOSE_ID].CHILDREN[item.HL1_ID].CHILDREN[item.HL2_ID].CHILDREN[item.HL3_ID] && !!item.HL3_ID) {
                    collection[item.PLANNING_PURPOSE_ID].CHILDREN[item.HL1_ID].CHILDREN[item.HL2_ID].CHILDREN[item.HL3_ID] = {
                        HL3_ID: item.HL3_ID
                        , PATH: item.HL3_PATH
                        , HL3_DESCRIPTION: item.HL3_DESCRIPTION
                        , CHILDREN: []
                    };
                }

                if(!!item.HL4_ID){
                    collection[item.PLANNING_PURPOSE_ID].CHILDREN[item.HL1_ID].CHILDREN[item.HL2_ID].CHILDREN[item.HL3_ID].CHILDREN.push({
                        HL4_ID: item.HL4_ID,
                        PATH: item.HL4_PATH,
                        HL4_DESCRIPTION: item.HL4_DESCRIPTION
                    });
                }

            }
        });
    }

    return collection;
}


/** INSERT **/
function insertHl4(data, userId) {
    var budgetYearId = budgetYear.getBudgetYearByLevelParent(4, data.HL3_ID);

    var requiredDFObject = JSON.parse(JSON.stringify(budgetYear.getRequireDynamicFormByBudgetYearId(budgetYearId)));

    //Complete data with dynamic form (if the Budget Year requires it).
    data = (Number(requiredDFObject.REQUIRE_DYNAMIC_FORM) === 1) ? util.completeNewLevelFromDynamicFormByRole(userId, HIERARCHY_LEVEL["HL4"], data, budgetYearId, data.HL3_ID) : data;

    data.HL3_INFORMATION = getHl3ForHl4Validation(data.HL3_ID, 0);
    data.HL4_INFORMATION = data.HL4_ID ? getHl4ForHl4Validation(0) : {};
    data.HL4_INFORMATION.CATEGORY_INFORMATION = getCategoryOptionForHl4Validation(0);

    var validationResult = validateHl4(data, userId);
    data.HL4_STATUS_DETAIL_ID = validationResult.statusId;

    //Calculate if it is In Budget
    data.BUDGET = Number(data.BUDGET);
    data.IN_BUDGET = checkBudgetStatus(data, 0, Number(data.BUDGET));

    //If everything is OK
    if (data.HL4_STATUS_DETAIL_ID > 0) {
        var budgetYearLevel = dataValidation.getBudgetYearByIdLevel(data.HL3_ID, 'HL3')[0];
        data.ENABLE_CRM_CREATION = budgetYearLevel ? Number(budgetYearLevel.ENABLE_CRM_CREATION) : 0;
        //INSERT HL4
        var hl4Id = dataHl4.insertHl4(data, userId);

        if (hl4Id && hl4Id > 0) {
            //throw JSON.stringify({crmBindingChangedFields: validationResult.crmBindingChangedFields, crmBindingChangedFieldsUpdate: validationResult.crmBindingChangedFieldsUpdate});
            //Insert IN CRM Binding
            insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, hl4Id);

            //Insert Parent Path
            insertParentPath(data, userId, hl4Id);

            //Insert HL4 Status
            setHl4Status(hl4Id, data.HL4_STATUS_DETAIL_ID, userId);

            //Insert KPI
            insertTargetKPI(data, userId, hl4Id);

            //Insert Category Option
            insertCategoryOption(data, userId, hl4Id);

        }

        //Update Processing Report Export Data
        dataL4Report.updateLevel4ReportForDownload(hl4Id);
        if (data.ENABLE_CRM_CREATION) {
            return hl4Id;
        } else {
            return {SUCCESS_MESSAGE: MSG_ENABLE_CRM_CREATION, EXECUTE_CANCEL_CONFIRMATION: 1, HL4_ID: hl4Id};
        }
    }

}

function insertParentPath(data, userId, hl4Id) {
    return pathBL.insParentPath('hl4', hl4Id, data.HL3_ID, userId);
}

function insertTargetKPI(data, userId, hl4Id) {
    //Insert HL4 Expected Outcomes
    var hl4_expected_outcomes_id = dataExOut.insertHl4ExpectedOutcomes(hl4Id, data.TARGET_KPIS.COMMENTS || "", userId);

    if (!!hl4_expected_outcomes_id) {
        var arrL4Kpi = [];
        var objL4Kpi;

        //Add each KPI to array for massive Insert
        data.TARGET_KPIS.KPIS.forEach(function (kpi) {
            objL4Kpi = {};

            objL4Kpi.in_created_user_id = userId;
            objL4Kpi.in_hl4_expected_outcomes_id = hl4_expected_outcomes_id;
            objL4Kpi.in_amount_value = Number(kpi.VOLUME_VALUE);
            objL4Kpi.in_euro_value = Number(kpi.EURO_VALUE);
            objL4Kpi.in_outcomes_id = dataExOut.getExpectedOutcomeLevelByLevelAndOptionId(HIERARCHY_LEVEL.HL4, kpi.OUTCOMES_ID).EXPECTED_OUTCOME_LEVEL_ID;
            arrL4Kpi.push(objL4Kpi);

        });

        if (arrL4Kpi.length) {
            return dataExOut.insertHl4ExpectedOutcomesDetail(arrL4Kpi);
        }
    }

    return 0;
}

function insertCategoryOption(data, userId, hl4Id) {
    var categoryOptionBulk = [];

    //Go through each category
    data.CATEGORIES.forEach(function (category) {
        if (category) {
            //Go through each option
            category.OPTIONS.forEach(function (categoryOption) {
                //Build the HL4 Category Option to insert
                categoryOptionBulk.push({
                    in_id: hl4Id,
                    in_category_option_level_id: categoryOption.CATEGORY_OPTION_LEVEL_ID,
                    in_amount: categoryOption.AMOUNT || 0,
                    in_created_user_id: userId,
                    in_updated: categoryOption.AMOUNT ? 1 : 0
                });
            });
        }
    });

    //Perform massive insert
    return dataCategoryOptionLevel.insertCategoryOption(categoryOptionBulk, 'hl4');
}

function insertInCrmBinding(crmBindingChangedFields, crmBindingChangedFieldsUpdate, hl4Id) {
    //if exist the HL4 ID
    if (hl4Id) {
        //To each changed CRM field, push the corresponding HL4 ID
        for (var i = 0; i < crmBindingChangedFields.length; i++) {
            crmBindingChangedFields[i].in_hl4_id = hl4Id;
        }

        //To each updated CRM field, push the corresponding HL4 ID
        for (var j = 0; j < crmBindingChangedFieldsUpdate.length; j++) {
            crmBindingChangedFieldsUpdate[j].in_hl4_id = hl4Id;
        }
    }

    //Insert HL4 CRM Binding
    if (crmBindingChangedFields.length) {
        dataHl4.insertHl4CRMBinding(crmBindingChangedFields);
    }

    //Update HL4 CRM Binding
    if (crmBindingChangedFieldsUpdate.length) {
        dataHl4.updateHl4CRMBinding(crmBindingChangedFieldsUpdate);
    }
}

function getHl3ForHl4Validation(hl3Id, hl4Id) {
    return dataHl4.getHl3ForHl4Validation(hl3Id, hl4Id || 0);
}

function getHl4ForHl4Validation(hl4Id) {
    var result = JSON.parse(JSON.stringify(dataHl4.getHl4ForHl4Validation(hl4Id)));

    //Mapping the CRM Changed Fields
    var mapL4CrmBindignFields = {};
    if (result.HL4_CRM_BINDING_CHANGED_FIELDS && result.HL4_CRM_BINDING_CHANGED_FIELDS.length > 0) {
        for (var i = 0; i < result.HL4_CRM_BINDING_CHANGED_FIELDS.length; i++) {
            var obj = result.HL4_CRM_BINDING_CHANGED_FIELDS[i];
            mapL4CrmBindignFields[obj.COLUMN_NAME] = {};
            mapL4CrmBindignFields[obj.COLUMN_NAME].HL4_CRM_BINDING_ID = obj.ID
        }
        result.HL4_CRM_BINDING_CHANGED_FIELDS = mapL4CrmBindignFields;
    }

    return result;
}

function parseOriginalOptionLevel(options) {
    var mapCategoryOption = {};

    for (var i = 0; i < options.length; i++) {
        var obj = options[i];

        if (!mapCategoryOption[obj.ALLOCATION_CATEGORY_ID])
            mapCategoryOption[obj.ALLOCATION_CATEGORY_ID] = [];

        mapCategoryOption[obj.ALLOCATION_CATEGORY_ID].push(obj);

    }
    return mapCategoryOption;
}

function parseOriginalCategories(categories) {
    var mapFields = {};
    for (var i = 0; i < categories.length; i++) {
        var obj = categories[i];

        if (!mapFields[obj.CATEGORY_ID])
            mapFields[obj.CATEGORY_ID] = {};

        mapFields[obj.CATEGORY_ID] = obj;
    }
    return mapFields;
}

function getCategoryOptionForHl4Validation(hl4Id) {
    var result = JSON.parse(JSON.stringify(dataHl4.getCategoryOptionForHl4Validation(hl4Id)));

    if (result.HL4_CATEGORY_OPTION_VERSIONED) {
        result.HL4_CATEGORY_OPTION_VERSIONED = parseVersionedCategories(result.HL4_CATEGORY_OPTION_VERSIONED);
    }

    //Parsing Original HL4 Categories or Hierarchy Level Categories depending if we have the first one
    result.HL4_CATEGORIES = result.HL4_ORIGINAL_CATEGORIES ? result.HL4_ORIGINAL_CATEGORIES : result.HL4_ORIGINAL_HIERARCHY_LEVEL_CATEGORIES;
    result.HL4_CATEGORIES = parseOriginalCategories(result.HL4_CATEGORIES);

    return result;
}

function parseVersionedCategories(categoryOptionList) {
    var result = {};

    categoryOptionList.forEach(function (categoryOption) {
        if (!result[categoryOption.CATEGORY_ID]) {
            result[categoryOption.CATEGORY_ID] = {
                CATEGORY_ID: categoryOption.CATEGORY_ID,
                CATEGORY_NAME: categoryOption.CATEGORY_NAME,
                MAKE_CATEGORY_MANDATORY: categoryOption.MAKE_CATEGORY_MANDATORY || 0,
                SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY || 0,
                CATEGORY_TYPE_ID: categoryOption.CATEGORY_TYPE_ID,
                OPTIONS_LIMIT: categoryOption.OPTIONS_LIMIT || OPTIONS_LIMIT_DEFAULT,
                IN_PROCESSING_REPORT_ORIGINAL: categoryOption.IN_PROCESSING_REPORT_ORIGINAL,
                IN_PROCESSING_REPORT_HIERARCHY_LEVEL: categoryOption.IN_PROCESSING_REPORT_HIERARCHY_LEVEL,
                OPTIONS: {}
            };
        }

        if (!result[categoryOption.CATEGORY_ID].OPTIONS[categoryOption.OPTION_ID]) {
            result[categoryOption.CATEGORY_ID].OPTIONS[categoryOption.OPTION_ID] = {};
        }

        result[categoryOption.CATEGORY_ID].OPTIONS[categoryOption.OPTION_ID] = {
            OPTION_ID: categoryOption.OPTION_ID,
            OPTION_NAME: categoryOption.OPTION_NAME,
            CATEGORY_ID: categoryOption.CATEGORY_ID,
            SINGLE_OPTION_ONLY: categoryOption.SINGLE_OPTION_ONLY || 0,
            CATEGORY_OPTION_LEVEL_ID: categoryOption.CATEGORY_OPTION_LEVEL_ID,
            AMOUNT: categoryOption.AMOUNT,
            AMOUNT_KPI: categoryOption.AMOUNT_KPI,
            CATEGORY_OPTION_ID: categoryOption.CATEGORY_OPTION_ID,
            UPDATED: categoryOption.UPDATED
        };
    });
    return result;
}

/** UPDATE **/

function updateHl4(data, userId) {

    var currentHL4 = getHl4ById(data.HL4_ID);
    var budgetYearId = budgetYear.getBudgetYearByLevelParent(4, data.HL3_ID);

    var requiredDFObject = JSON.parse(JSON.stringify(budgetYear.getRequireDynamicFormByBudgetYearId(budgetYearId)));

    if (Number(requiredDFObject.REQUIRE_DYNAMIC_FORM) === 1) {
        data = util.completeDynamicFormEdition(userId, HIERARCHY_LEVEL["HL4"], data, currentHL4, budgetYearId);
    }

    data.HL3_INFORMATION = getHl3ForHl4Validation(data.HL3_ID, data.HL4_ID);

    data.HL4_INFORMATION = data.HL4_ID ? getHl4ForHl4Validation(data.HL4_ID) : {};

    data.HL4_INFORMATION.CATEGORY_INFORMATION = getCategoryOptionForHl4Validation(data.HL4_ID);

    validateUpdateRequiredFields(data, userId);

    var hl4_id = null;

    var validationResult = validateHl4(data, userId);

    data.HL4_STATUS_DETAIL_ID = validationResult.statusId;

    if (data.HL4_STATUS_DETAIL_ID > 0) {
        //Check if the Budget is In Budget
        data.IN_BUDGET = checkBudgetStatus(data, data.HL4_ID, Number(data.BUDGET));

        hl4_id = data.HL4_ID;

        var deleteParameters = {"in_hl4_id": hl4_id, "in_user_id": userId};

        var objHL4 = dataHl4.getHl4ById(data.HL4_ID);

        if (objHL4.HL4_STATUS_DETAIL_ID != data.HL4_STATUS_DETAIL_ID) {
            dataHl4.insertHl4LogStatus(hl4_id, objHL4.HL4_STATUS_DETAIL_ID, userId);
            dataHl4.updateDeletionReason(hl4_id, null, userId);
        }
        var budgetYearLevel = dataValidation.getBudgetYearByIdLevel(data.HL4_ID, 'HL4')[0];

        var changedFields = crmFieldsHaveChanged(data, validationResult.isComplete, userId, objHL4);
        if (!changedFields.crmFieldsHaveChanged || changedFields.onlyBudget) {
            data.ENABLE_CRM_CREATION = 1;
        } else {
            data.ENABLE_CRM_CREATION = data.HL4_STATUS_DETAIL_ID == HL4_STATUS.VALID_FOR_CRM ? Number(budgetYearLevel.ENABLE_CRM_CREATION) : 1;
        }

        //UPDATE HL4
        var result = dataHl4.updateHl4(data, userId);

        if (result > 0) {
            //Insert In CRM Binding
            insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate);

            //If old Budget is different than new Budget
            if (Number(objHL4.BUDGET) !== Number(data.BUDGET)) {
                level5Lib.checkBudgetStatusRefactor(data);
            }

            //Delete Target KPIs and Comments
            dataExOut.deleteHl4ExpectedOutcomesDetail(deleteParameters);
            dataExOut.deleteHl4ExpectedOutcomes(deleteParameters);
            //-----------------

            //Insert all the KPIs again
            insertTargetKPI(data, userId, hl4_id);

            //Update Category Option
            updateCategoryOption(data, hl4_id, userId);

        }

        //Update Processing Report Export Data
        dataL4Report.updateLevel4ReportForDownload(hl4_id);


        if (data.ENABLE_CRM_CREATION) {
            if (!validationResult.crmFieldsHaveChanged && (validationResult.budgetChanged) && Number(validationResult.statusId) === Number(HL4_STATUS.IN_CRM)) {
                return {SUCCESS_MESSAGE: "Your Program/Campaign has automatically updated to CRM"};
            }
            return result;
        } else {
            return {SUCCESS_MESSAGE: MSG_ENABLE_CRM_CREATION, EXECUTE_CANCEL_CONFIRMATION: 1, HL4_ID: hl4_id};
        }
    }
}

function updateBudget(hl4Id, budget, userId) {
    var changedFields = level4DER.getL4CrmBindingFieldsByHl4Id(hl4Id);
    var budgetField = changedFields.BUDGET || null;

    if (!budgetField) {
        var parameters = [{
            "in_hl4_id": hl4Id,
            "in_column_name": 'BUDGET',
            "in_changed": 1,
            "in_user_id": userId,
            "in_display_name": 'Budget'
        }];
        insertInCrmBinding(parameters, []);
    }
    return dataHl4.updateBudget(hl4Id, budget, userId);
}

function updateCategoryOption(data, hl4_id, userId, fromChangeHl4StatusOnDemand) {
    var categories = util.getCategoryById('hl4', hl4_id);

    if (!Object.keys(categories).length) {
        var insertBulk = [];

        data.CATEGORIES.forEach(function (category) {
            category.OPTIONS.forEach(function (option) {
                insertBulk.push({
                    in_category_option_level_id: option.CATEGORY_OPTION_LEVEL_ID,
                    in_amount: Number(option.AMOUNT) || 0,
                    in_created_user_id: userId,
                    in_updated: fromChangeHl4StatusOnDemand && !!Number(option.AMOUNT) ? 1 : (option.UPDATED || 0),
                    in_id: hl4_id
                });
            });
        });

        dataCategoryOptionLevel.insertCategoryOption(insertBulk, 'hl4');
    } else {
        var updateBulk = [];

        data.CATEGORIES.forEach(function (category) {
            category.OPTIONS.forEach(function (option) {
                updateBulk.push({
                    in_category_option_level_id: option.CATEGORY_OPTION_LEVEL_ID,
                    in_amount: Number(option.AMOUNT) || 0,
                    in_user_id: userId,
                    in_updated: fromChangeHl4StatusOnDemand && !!Number(option.AMOUNT) ? 1 : (option.UPDATED || 0),
                    in_hl4_id: hl4_id
                });
            });
        });

        dataCategoryOptionLevel.updateCategoryOption(updateBulk, 'hl4');
    }
}

/** DELETE **/
function deleteHl4(hl4, userId) {
    if (!hl4.HL4_ID) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_NOT_FOUND);
    }

    if (!util.validateIsNumber(hl4.HL4_ID)) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_NOT_FOUND);
    }

    var userRoleId = Number(userDataRole.getUserRoleByUserId(userId)[0].ROLE_ID);
    if (userRoleId !== 1 && userRoleId !== 2) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_NO_PRIVILEGE);
    }

    var hl4StatusId = Number(dataHl4.getHl4StatusByHl4Id(hl4.HL4_ID).HL4_STATUS_DETAIL_ID);

    if (hl4StatusId !== HL4_STATUS.DELETED_IN_CRM && hl4StatusId !== HL4_STATUS.DELETION_REQUEST) {
        if ((hl4StatusId === HL4_STATUS.CREATE_IN_CRM || hl4StatusId === HL4_STATUS.UPDATE_IN_CRM)) {
            throw ErrorLib.getErrors().CustomError("", "", L3_MSG_CANNOT_DEL_STATUS);
        }

        if (hl4StatusId !== HL4_STATUS.IN_CRM) {
            var childrenInCRM = dataHl4.getCountHl4ChildrenInCRM(hl4.HL4_ID);
            if (Number(childrenInCRM.HL5_IN_CRM) > 0 || Number(childrenInCRM.HL6_IN_CRM) > 0 || Number(childrenInCRM.HL5_LEGACY_IN_CRM) > 0 || Number(childrenInCRM.HL6_LEGACY_IN_CRM) > 0) {
                throw ErrorLib.getErrors().CustomError("", "", "Cannot delete the Marketing Program/Campaign " + hl4.ACRONYM + " because a related child is \"IN CRM\" status");
            }
        }

        if (hl4StatusId === HL4_STATUS.IN_CRM) {
            if (hl4.DELETION_REASON && hl4.DELETION_REASON.trim()) {
                dataHl4.updateDeletionReason(hl4.HL4_ID, hl4.DELETION_REASON, userId);
            }
            setHl4Status(hl4.HL4_ID, HL4_STATUS.DELETION_REQUEST, userId);
            dataL4Report.updateLevel4ReportForDownload(hl4.HL4_ID);
        } else {
            /*******The last parameters is to know if the L5 is deleted in cascade mode******/
            level5Lib.deleteHl5ByHl4(hl4.HL4_ID, userId, true);
            deleteRelatedData(hl4, userId);
        }

    }
    return hl4;
}

function deleteRelatedData(hl4, userId) {
    var hl4ToDelete = {in_hl4_id: hl4.HL4_ID, in_user_id: userId};

    dataExOut.deleteHl4ExpectedOutcomesDetail(hl4ToDelete);
    dataExOut.deleteHl4ExpectedOutcomes(hl4ToDelete);

    level4DER.deleteL4ChangedFieldsByHl4Id(hl4.HL4_ID);

    dataCategoryOptionLevel.deleteCategoryOption(hl4.HL4_ID, userId, 'HL4');
    dataHl4.deleteHl4(hl4ToDelete);
    dataPath.delParentPath('hl4', hl4.HL4_ID);
    dataL4Report.updateLevel4ReportForDownload(hl4.HL4_ID); //Update Processing Report Export Data
}

/** VALIDATIONS **/

function validateRequiredFields(data, userId) {
    var userRoleId = Number(userDataRole.getUserRoleByUserId(userId)[0].ROLE_ID);

    //Validate payload
    if (!data) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_NOT_FOUND);
    }
    //Validate HL4_DETAILS
    if (!data.HL4_DETAILS) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_DETAIL);
    }
    //Validate HL4_BUSINESS_DETAILS
    if (!data.HL4_BUSINESS_DETAILS) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_BUSINESS);
    }
    //Validate ACRONYM
    if (!data.ACRONYM) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_ACRONYM);
    } else if (data.ACRONYM.length !== 3) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_ACRONYM_LENGTH);
    }

    // Validate whether Acronym already exists or not between L4 in the same Priority/Sub-Team
    // if (existsHl4inPlan(data)) {
    //     throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_EXISTS);
    // }

    // Validate whether Acronym already exists
    if (existsHl4CRMPath(data)) {
        throw ErrorLib.getErrors().CustomError("", "", L4_MSG_CRM_PATH_CREATED);
    }

    // Validate if the Acronym is being used by any L3
    // if (!util.validateDuplicatedAcronym(data.ACRONYM, "HL4")) {
    //     throw ErrorLib.getErrors().CustomError("", "", L4_MSG_INITIATIVE_EXISTS_IN_L3);
    // }

    //Validate HL4_CRM_DESCRIPTION
    if (!data.HL4_CRM_DESCRIPTION) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_CRM_DESCRIPTION);
    }

    //validate BUDGET
    if (data.BUDGET < 0) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_BUDGET_VALUE);
    }

    //validate SHOPPING_CART_APPROVER
    if (userRoleId === USER_ROLE.DATA_ENTRY) {
        //Special validation for Data Entry users, they can create an L4 without Shopping Cart Approver
        if (data.SHOPPING_CART_APPROVER && !!data.SHOPPING_CART_APPROVER.trim() && !/[id]\d{6}/gi.test(data.SHOPPING_CART_APPROVER)) {
            throw ErrorLib.getErrors().CustomError("", "", "Shopping cart approver is invalid");
        }
    } else {
        if (!data.SHOPPING_CART_APPROVER || !data.SHOPPING_CART_APPROVER.trim() || (data.SHOPPING_CART_APPROVER && !/[id]\d{6}/gi.test(data.SHOPPING_CART_APPROVER))) {
            throw ErrorLib.getErrors().CustomError("", "", "Shopping cart approver is invalid");
        }

        //validate COST_CENTER
        if (!data.COST_CENTER || !data.COST_CENTER.trim() || (data.COST_CENTER && !/\d+/gi.test(data.COST_CENTER))) {
            throw ErrorLib.getErrors().CustomError("", "", "Cost Center approver is invalid");
        }
    }

    //validate MKT_ORG_ID
    if (data.MKT_ORG_ID && data.MKT_ORG_ID <= 0) {
        throw ErrorLib.getErrors().CustomError("", "", "Sale Organization is invalid");
    }
    //validate DIS_CHANNEL_ID
    if (data.DIS_CHANNEL_ID && data.DIS_CHANNEL_ID <= 0) {
        throw ErrorLib.getErrors().CustomError("", "", "Distribution Channel is invalid");
    }

    //Validate all TARGET_KPIS
    if (data.TARGET_KPIS) {
        var totalAvailable = data.HL3_INFORMATION.HL3_AVAILABLE_VOLUME_VALUE;

        if (!data.TARGET_KPIS.KPIS.length && !data.TARGET_KPIS.COMMENTS)
            throw ErrorLib.getErrors().CustomError("", "", L3_CAMPAIGN_FORECASTING_KPIS_COMMENT);

        data.TARGET_KPIS.KPIS.forEach(function (kpi) {
            if (!kpi.OUTCOMES_ID || !Number(kpi.OUTCOMES_ID))
                throw ErrorLib.getErrors().CustomError("", "", L3_CAMPAIGN_FORECASTING_KPIS_NOT_VALID);
        });
    }

    //Validate if we have Categories
    if (!data.CATEGORIES) {
        throw ErrorLib.getErrors().CustomError("", "", L3_CATEGORY_NOT_EMPTY);
    }

    //Validate if we have the same amount of categories
    if (!data.HL4_ID && data.CATEGORIES.length !== data.HL4_INFORMATION.CATEGORY_INFORMATION.HL4_ALLOCATION_CATEGORY_COUNT) {
        throw ErrorLib.getErrors().CustomError("", "", L3_CATEGORY_INCORRECT_NUMBER);
    }
}

function validateUpdateRequiredFields(data, userId) {
    if (!data.HL4_ID) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_NOT_FOUND);
    }

    if (!util.validateIsNumber(data.HL4_ID)) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_NOT_FOUND);
    }

    //TODO: Super admin validation added because of SAP new requirements, refactor this
    if (!util.isSuperAdmin(userId)) {
        if (Number(data.HL4_STATUS_DETAIL_ID) === HL4_STATUS.CREATE_IN_CRM || Number(data.HL4_STATUS_DETAIL_ID) === HL4_STATUS.UPDATE_IN_CRM) {
            throw ErrorLib.getErrors().CustomError("", "", "Cannot update this selected Initiative/Campaign, because the status doesn´t allow it.");
        }
    }

    if (Number(data.HL4_STATUS_DETAIL_ID) === HL4_STATUS.DELETED_IN_CRM) {
        throw ErrorLib.getErrors().CustomError("", "", "Cannot update this selected Initiative/Campaign, because the status doesn´t allow it.");
    }

    if (!userId) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_USER_NOT_FOUND);
    }
}

function validateStatus(crmFieldsHaveChanged, budgetChanged, data) {
    var existInCrm = 0;
    var statusId = null;

    if (data.HL4_ID) {
        var objHL4 = data.HL4_INFORMATION ? data.HL4_INFORMATION.HL4 : {};
        existInCrm = objHL4.EXIST_IN_CRM || Number(objHL4.HL4_STATUS_DETAIL_ID) == HL4_STATUS.IN_CRM;

        if (existInCrm && data.ACRONYM.toUpperCase() != objHL4.ACRONYM.toUpperCase()) {
            throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_IN_CRM);

        }

        //Check if the categories have changed
        var categoryHasChanged = categoryChanged(data, existInCrm);

        if (!crmFieldsHaveChanged && !categoryHasChanged && budgetChanged && Number(data.HL4_STATUS_DETAIL_ID) == HL4_STATUS.IN_CRM) {
            statusId = objHL4.HL4_STATUS_DETAIL_ID;
        } else if (!crmFieldsHaveChanged && !categoryHasChanged && existInCrm) {
            statusId = HL4_STATUS.IN_CRM;
        } else if (!crmFieldsHaveChanged && !categoryHasChanged) {
            statusId = objHL4.HL4_STATUS_DETAIL_ID;
        } else {
            statusId = HL4_STATUS.VALID_FOR_CRM;
        }
    } else {
        statusId = HL4_STATUS.VALID_FOR_CRM;
    }

    return statusId;
}

function validateHl4(data, userId) {
    var result = {
        statusId: null,
        isComplete: false,
        crmBindingChangedFields: false,
        crmBindingChangedFieldsUpdate: false,
        budgetChanged: false,
        onlyBudget: false
    };

    //Validate empty objects, fields and regex
    validateRequiredFields(data, userId);

    //Validate completed Categories
    result.isComplete = isCategoryOptionComplete(data);

    //Validate CRM Fields changes
    var crmFieldsHasChangedResult = crmFieldsHaveChanged(data, result.isComplete, userId);

    //Complete result binding based on CRM Fields changes
    result.crmBindingChangedFields = crmFieldsHasChangedResult.crmBindingChangedFields;
    result.crmBindingChangedFieldsUpdate = crmFieldsHasChangedResult.crmBindingChangedFieldsUpdate;
    result.statusId = validateStatus(crmFieldsHasChangedResult.crmFieldsHaveChanged, crmFieldsHasChangedResult.budgetChanged, data);
    result.budgetChanged = crmFieldsHasChangedResult.budgetChanged;
    result.onlyBudget = crmFieldsHasChangedResult.onlyBudget;
    result.crmFieldsHaveChanged = crmFieldsHasChangedResult.crmFieldsHaveChanged;

    return result;
}

function categoryChanged(data, existInCrm) {
    //obtain the CATEGORY options in bd
    var hl4_categoryBD = data.HL4_INFORMATION.CATEGORY_INFORMATION.HL4_CATEGORY_OPTION_VERSIONED;

    return CompareCategories(data.CATEGORIES, hl4_categoryBD, existInCrm, data.HL4_INFORMATION.CATEGORY_INFORMATION, Object.keys(hl4_categoryBD).length);
}


/***************************************/
//Verify if mount of option change
//Option1: option from UI
//Option2: option from DB
function CompareOptions(Option1, Option2, existInCrm, hasCategoryOptionInCrmVersion) {

    var hasChanged = false;
    if (!hasCategoryOptionInCrmVersion) {
        Option1.UPDATED = Number(Option1.AMOUNT) ? 1 : 0;
        hasChanged = !!Option1.UPDATED;
    } else {
        if (Number(Option1.AMOUNT) === Number(Option2.AMOUNT)) {
            hasChanged = false;
            Option1.UPDATED = Option2.UPDATED;
        } else {
            Option1.UPDATED = 1;
            hasChanged = true;

            if (Number(Option1.AMOUNT) && Option2.UPDATED) {
                return hasChanged;
            }

            if ((!Number(Option1.AMOUNT) && !Number(Option2.AMOUNT)) ||
                (!Number(Option1.AMOUNT) && Number(Option2.AMOUNT) && !existInCrm)
            ) {
                Option1.UPDATED = 0;
                hasChanged = false;
            }
        }
    }
    return hasChanged;
}

function getOptionFromList(listOptions, OptionId) {
    for (var i = 0; i < listOptions.length; i++) {
        var option = listOptions[i];

        if (Number(option.OPTION_ID) === Number(OptionId)) {
            return option;
        }
    }
    return null;
}

function CompareListOptions(ListOption1, ListOption2, existInCrm, hasCategoryOptionInCrmVersion) {
    var flag = false;

    for (var i = 0; i < ListOption1.length; i++) {
        var option = ListOption1[i];
        flag = CompareOptions(option, getOptionFromList(ListOption2, option.OPTION_ID), existInCrm, hasCategoryOptionInCrmVersion) || flag;
    }
    return flag;
}

function getCategoryFromList(listCategory, categoryId) {
    var category = listCategory.filter(function (cat) {
        return cat.CATEGORY_ID === categoryId
    });

    return category.length ? category[0] : null;
}

function CompareCategoryOption(Category1, Category1_id, ListCategories, existInCrm, hasCategoryOptionInCrmVersion) {
    var Category2 = hasCategoryOptionInCrmVersion ? getCategoryFromList(ListCategories, Category1_id) : {OPTIONS: []};
    return CompareListOptions(Category1.OPTIONS, Category2.OPTIONS, existInCrm, hasCategoryOptionInCrmVersion)
}

function CompareCategories(ListCategories1, ListCategories2, existInCrm, categoryInformation, hasCategoryOptionInCrmVersion) {
    //List 1 is like [{ CATEGORY_ID: 1, OPTIONS: [{OPTION_ID: 62, OPTION_NAME: "Something", ...}] }]
    //List 2 is like { 1: { OPTIONS: { 62: optionDetail } } }
    var flag = false;

    var actualCategory = categoryInformation.HL4_CATEGORIES;
    if (ListCategories2 && hasCategoryOptionInCrmVersion) {
        ListCategories1.forEach(function (category1) {
            category1.OPTIONS.forEach(function (option1) {
                if (actualCategory[category1.CATEGORY_ID].IN_PROCESSING_REPORT) {
                    flag = CompareOptions(option1, ListCategories2[category1.CATEGORY_ID].OPTIONS[option1.OPTION_ID], existInCrm, hasCategoryOptionInCrmVersion) || flag;
                }
            });
        });
    }

    return flag;
}


function isMyBudgetComplete(hl4_budget) {
    var hl4MyBudgetKeys = Object.keys(hl4_budget);
    var myBudgetTotalPercentage = 0;
    var myBudgetComplete = false;
    var percentage = 0;
    hl4MyBudgetKeys.forEach(function (hl4MyBudgetKey) {
        if (hl4_budget[hl4MyBudgetKey] && hl4_budget[hl4MyBudgetKey].length) {
            hl4_budget[hl4MyBudgetKey].forEach(function (myBudget) {
                if (hl4MyBudgetKey == "regions") {
                    if (!myBudget.in_region_id || !Number(myBudget.in_region_id))
                        throw ErrorLib.getErrors().CustomError("", "", levelCampaign + " in My Budget " + hl4MyBudgetKey + " can not be found.");
                } else if (hl4MyBudgetKey == "routes") {
                    if (!myBudget.in_route_id || !Number(myBudget.in_route_id))
                        throw ErrorLib.getErrors().CustomError("", "", levelCampaign + " in My Budget " + hl4MyBudgetKey + " can not be found.");
                }
                if (!myBudget.PERCENTAGE && !Number(myBudget.in_percentage) && myBudget.in_percentage != 0)
                    throw ErrorLib.getErrors().CustomError("", "", levelCampaign + " in My Budget " + hl4MyBudgetKey + " can not be found.");
                percentage = myBudget.in_percentage;

                if (myBudget.PERCENTAGE)
                    percentage = myBudget.PERCENTAGE;

                myBudgetTotalPercentage = myBudgetTotalPercentage + Number(percentage);
            });
        }
    });


    if (myBudgetTotalPercentage > 100)
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_BUDGET_PERCENT);
    if (myBudgetTotalPercentage < 100)
        myBudgetTotalPercentage = 0;

    myBudgetComplete = !!myBudgetTotalPercentage;

    return myBudgetComplete;
}

function isCategoryOptionComplete(data) {
    var categoryOptionComplete = false;
    var categoryOption = AllocationCategory.getCategoryOptionByHierarchyLevelId(HIERARCHY_LEVEL.HL4);
    for (var i = 0; i < data.CATEGORIES.length; i++) {
        var hl4Category = data.CATEGORIES[i];
        var percentagePerOption = 0;
        if (!hl4Category.CATEGORY_ID || !Number(hl4Category.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "", L3_CATEGORY_NOT_VALID);

        //TODO: Probablemente no entre nunca
        if (!data.HL4_ID && (!hl4Category.OPTIONS || !hl4Category.OPTIONS.length))
            hl4Category.OPTIONS = getOptionByCategoryId(categoryOption, hl4Category.CATEGORY_ID);


        if (!data.HL4_ID && hl4Category.OPTIONS.length !== dataOption.getAllocationOptionCountByCategoryIdLevelId(hl4Category.CATEGORY_ID, 'hl4'))
            throw ErrorLib.getErrors().CustomError("", "", L3_CATEGORY_OPTIONS_INCORRECT_NUMBER);

        hl4Category.OPTIONS.forEach(function (option) {
            if (!option.OPTION_ID || !Number(option.OPTION_ID))
                throw ErrorLib.getErrors().CustomError("", "", L3_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.AMOUNT) && !Number(option.AMOUNT)) || Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0)
                throw ErrorLib.getErrors().CustomError("", "", "Option value is not valid (actual value " + option.AMOUNT + ")");

            percentagePerOption = percentagePerOption + Number(option.AMOUNT);
        });

        if (percentagePerOption > 100)
            throw ErrorLib.getErrors().CustomError("", "", L3_CATEGORY_TOTAL_PERCENTAGE);

        if (!Number(hl4Category.MAKE_CATEGORY_MANDATORY) && (percentagePerOption === 0 || percentagePerOption === 100)) {
            categoryOptionComplete = true;
        } else if (percentagePerOption < 100) {
            categoryOptionComplete = false;
            break;
        } else {
            categoryOptionComplete = true;
        }
    }

    return categoryOptionComplete;
}

function getOptionByCategoryId(categories, categoryId) {
    var options = [];
    for (var i = 0; i < categories.length; i++) {
        if (categories[i].CATEGORY_ID == categoryId && categories[i].OPTIONS && categories[i].OPTIONS.length) {
            options = categories[i].OPTIONS.map(function (option) {
                return {
                    in_option_id: option.OPTION_ID
                    , in_amount: 0
                }
            });
        }
    }
    return options;
}

function validateSaleOthers(others) {
    var keys = ['in_description', 'in_amount'];
    var valid = true;
    if (others) {
        others.forEach(function (obj) {
            keys.forEach(function (key) {
                if (obj[key] === null || obj[key] === undefined) {
                    throw ErrorLib.getErrors().CustomError("", ""
                        , L3_MSG_INITIATIVE_SALES_OTHER);
                } else {
                    // validate attribute type
                    if (key === "in_description")
                        valid = obj[key].length > 0;
                    else if (key === "in_amount") {
                        if (Number(obj[key]) !== 0)
                            valid = Number(obj[key]);
                    }

                    if (!valid)
                        throw ErrorLib.getErrors().CustomError("", ""
                            , "The " + levelCampaign + " in Sales Other " + obj.in_description + " amount (" + obj.in_amount + ") is invalid ");
                }
            });
        });
    }
    return valid;
}


function getLevel4ByAcronym(acronym, hl2_id) {
    return dataHl4.getHl4ByAcronym(acronym, hl2_id);
}
/**
 *
 * @param acronym: the acronym to be found
 * @param hl4Id (Optional): the L4 to avoid
 * @returns [*]
 */
function getAllHl4ByAcronym(acronym, hl4Id){
    return dataHl4.getAllHl4ByAcronym(acronym, hl4Id);
}

function getDuplicatedHl4CRMPath(hl4Id, hl3Id, hl4Acronym){
    return dataHl4.getDuplicatedHl4CRMPath(hl4Id, hl3Id, hl4Acronym);
}

function existsHl4CRMPath(objHL4) {
    if ((!objHL4) || (objHL4 && !objHL4.ACRONYM)){
        throw ErrorLib.getErrors().CustomError("", "", "Acronym not found");
    }

    return getDuplicatedHl4CRMPath(objHL4.HL4_ID, objHL4.HL3_ID, objHL4.ACRONYM).length !== 0;
}

function existsHl4inPlan(objHL4) {
    //Search the same acronym in all HL4 Childrens of the HL3
    var hl4 = objHL4.HL3_INFORMATION.HL4_CHILDRENS.filter(function (hl4) {
        return objHL4.ACRONYM === hl4.ACRONYM;
    });

    return hl4.length > 0;
}

function existsInCrm(objHL4, data) {
    var existInCrm = dataHl4.existsInCrm(objHL4.in_hl4_id);
    // TODO: data.hl4.in_acronym != hl4.ACRONYM
    if (existInCrm && data.hl4.in_acronym != objHL4.ACRONYM)
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_INITIATIVE_IN_CRM);

}

function checkBudgetStatus(data, hl4_id, new_hl4_budget) {
    var hl3 = data.HL3_INFORMATION.HL3;
    var hl3Id = hl3.HL3_ID;
    //Si no existe Hl4_id, le pone 0, osea es para chequear si estás por insertar o no
    if (!hl4_id) hl4_id = 0;
    //Si existe el objeto HL3, y tenemos new budget o es 0.
    if (Number(hl3Id) && (new_hl4_budget || new_hl4_budget == 0)) {
        var hl3AllocatedBudget = data.HL3_INFORMATION.HL3.ALLOCATED_BUDGET;

        //Retorna 1 o 0 dependiendo de si te pasaste de budget o no
        return (Number(hl3.HL3_FNC_BUDGET_TOTAL) - Number(hl3AllocatedBudget) - Number(new_hl4_budget)) >= 0 ? 1 : 0;
    } else {
        //Sino... hacemos esto otro TODO: creo que nunca va a entrar acá
        var result = {};
        result.out_result = 0;
        //TODO: Este envio de mails está deprecado?
        //lists of hl4 changed to send email to client
        result.emailListInBudget = [];
        result.emailListOutBudget = [];

        var resultHl4 = data.HL3_INFORMATION.HL4_CHILDRENS;

        //Si tiene HL4
        if (resultHl4) {
            var total = 0;
            for (var i = 0; i < resultHl4.length; i++) {
                var hl4 = resultHl4[i];
                if (hl4.HL4_STATUS_DETAIL_ID != HL4_STATUS.DELETED_IN_CRM) {
                    if (hl3.HL3_FNC_BUDGET_TOTAL < total + parseFloat(hl4.BUDGET)) {
                        dataHl4.updateHl4BudgetStatus(hl4.HL4_ID, 0);
                        //store hl4id and users to be send email when register change to in budget
                        result.emailListOutBudget.push(hl4);
                    } else {
                        dataHl4.updateHl4BudgetStatus(hl4.HL4_ID, 1);
                        total = total + parseFloat(hl4.HL4_BUDGET);
                        //store hl4id and users to be send email when register change to in budget
                        result.emailListInBudget.push(hl4);
                    }
                }
            }
            result.out_result = resultHl4.length;
        }
        return result;
    }
}

/* Function to set HL4 status */
function setHl4Status(hl4Id, statusId, userId) {
    if (hl4Id && statusId && userId) {
        //Change HL4 Status
        var result = dataHl4.changeStatusHl4(hl4Id, statusId, userId).out_result;

        //Insert Log Status
        dataHl4.insertHl4LogStatus(hl4Id, statusId, userId);

        //If already In CRM, reset changed fields
        if (HL4_STATUS.IN_CRM == statusId) {
            if (level4DER.deleteL4ChangedFieldsByHl4Id(hl4Id) !== null) {
                resetHl4CategoryOptionUpdated(hl4Id, userId);
            }
        }
    }

    return result;
}

function massSetHl4Status(hl4Ids, userId) {
    // var updateOK;
    var hl4List = [];
    var hl4IdsInCrm = [];
    hl4Ids.forEach(function (hl4) {
        var newStatusId = (Number(dataHl4.getHl4StatusByHl4Id(hl4.hl4_id).HL4_STATUS_DETAIL_ID) === HL4_STATUS.DELETION_REQUEST)
            ? HL4_STATUS.DELETED_IN_CRM
            : HL4_STATUS.IN_CRM;
        hl4List.push({
            "in_hl4_id": hl4.hl4_id
            , 'in_status_id': newStatusId
            , 'in_user_id': userId
        });
        if (newStatusId == HL4_STATUS.IN_CRM) {
            hl4IdsInCrm.push(hl4);
        }
    });
    dataHl4.massInsertHl4LogStatus(hl4Ids, userId);
    dataHl4.massChangeStatusHl4(hl4List);
    level4DER.massDeleteL4ChangedFieldsByHl4Ids(hl4Ids);
    massResetHl4CategoryOptionUpdated(hl4Ids, userId);

    return hl4IdsInCrm;
}

function resetHl4CategoryOptionUpdated(hl4Id, userId) {
    dataCategoryOptionLevel.resetHl4CategoryOptionUpdated(hl4Id, 'hl4', userId);

    /*var hl4Categories = dataHl4.getHl4Category(hl4Id);
     hl4Categories.forEach(function(hl4Category){
     dataHl4.resetHl4CategoryOptionUpdated(hl4Id, userId);
     });*/
    return true;
}

function massResetHl4CategoryOptionUpdated(hl4Id, userId) {
    dataCategoryOptionLevel.massResetHl4CategoryOptionUpdated(hl4Id, 'hl4', userId);

    /*var hl4Categories = dataHl4.getHl4Category(hl4Id);
     hl4Categories.forEach(function(hl4Category){
     dataHl4.resetHl4CategoryOptionUpdated(hl4Id, userId);
     });*/
    return true;
}

/* Set HL4 status to In CRM */
function setHl4StatusInCRM(hl4_id, userId) {
    var hl4Ids = [];
    var result;
    if (hl4_id.constructor === Array) {
        hl4Ids = hl4_id.map(function (value) {
            return {hl4_id: value}
        });
    } else {
        hl4Ids.push({hl4_id: hl4_id})
    }

    if (hl4Ids.length) {
        var hl4InCrm = massSetHl4Status(hl4Ids, userId);

        hl4Ids.forEach(function (value) {
            insertInCrmVersion(value.hl4_id);
            dataL4Report.updateLevel4ReportForDownload(value.hl4_id);
        });

        mail.massSendInCRMMail(hl4InCrm, "hl4");
    }
    return 1;
}

function setStatusInCRMByUpload(data, userId) {
    if (!data || !data.DATA || !data.DATA.length) {
        throw ErrorLib.getErrors().CustomError("", "", L3_MSG_MISSING_DATA);
    }

    var result = {
        TOTAL_PROCESSED: data.DATA.length,
        UPDATED: 0,
        NOT_FOUND: 0,
        NOT_FOUND_PATH: []
    };

    var spResult = dataUtil.getIdByPath(data.DATA, LEVEL_STRING);
    var ids = [];

    for (var i = 0; i < spResult.length; i++) {
        var elem = spResult[i];
        if (Number(elem.ID)) {
            ids.push(Number(elem.ID));
        } else {
            result.NOT_FOUND_PATH.push(elem);
        }
    }

    if (!data.CHECK && ids.length) {
        setHl4StatusInCRM(ids, userId);
    }

    result.UPDATED = ids.length;
    result.NOT_FOUND = result.NOT_FOUND_PATH.length;

    return result;
}

function changeHl4StatusOnDemand(hl4_id, userId) {
    var validationData = {};

    validationData.HL4_INFORMATION = getHl4ForHl4Validation(hl4_id);

    var hl4 = validationData.HL4_INFORMATION.HL4;

    if (hl4.HL4_STATUS_DETAIL_ID != HL4_STATUS.IN_CRM
        && hl4.HL4_STATUS_DETAIL_ID != HL4_STATUS.UPDATE_IN_CRM
        && hl4.HL4_STATUS_DETAIL_ID != HL4_STATUS.CREATE_IN_CRM) {

        var hl4_category = getHl4CategoryOption(hl4_id);

        var isComplete = isCategoryOptionComplete({
            CATEGORIES: hl4_category,
            HL4_ID: hl4_id
        });

        if (!isComplete)
            throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePut/changeHl4Status", L3_MSG_INITIATIVE_COULDNT_CHAGE_STATUS);

        var existInCrm = validationData.HL4_INFORMATION.HL4.EXIST_IN_CRM;

        var statusId = existInCrm ? HL4_STATUS.UPDATE_IN_CRM
            : HL4_STATUS.CREATE_IN_CRM;

        if (statusId == HL4_STATUS.CREATE_IN_CRM) {
            var data = validationData.HL4_INFORMATION.HL4;
            data.CATEGORIES = hl4_category;
            data.HL4_INFORMATION = validationData.HL4_INFORMATION;

            updateCategoryOption(data, hl4_id, userId, true);

            var aux = crmFieldsHaveChanged(data, 1, userId, true);
            //throw JSON.stringify({aux: aux});
            insertInCrmBinding(aux.crmBindingChangedFields, [], hl4_id);
        }

        var result = setHl4Status(hl4_id, statusId, userId);

        dataL4Report.updateLevel4ReportForDownload(hl4_id);

        return result;
    }

    return true;
}

/**
 * @deprecated
 * @param parameters
 @returns {}
 */
function getHl4MyBudgetByHl4Id(id) {
    var aux = {};
    /*var myBudgets = dataHl4.getHl4MyBudgetByHl4Id(id);
     var hl4MyBudgetKeys = Object.keys(myBudgets);
     var myBudgetTotalPercentage = 0;
     hl4MyBudgetKeys.forEach(function (hl4MyBudgetKey) {
     aux["in_" + hl4MyBudgetKey.toLowerCase()] = myBudgets[hl4MyBudgetKey];
     myBudgets[hl4MyBudgetKey].forEach(function (myBudget) {
     myBudgetTotalPercentage = myBudgetTotalPercentage + Number(myBudget.PERCENTAGE);
     });
     });
     aux.total = myBudgetTotalPercentage;*/
    return aux;
}

/**
 * @deprecated
 * @param parameters
 @returns {}
 */
function getHl4SalesByHl4Id(id, currencyValue) {
    var aux = {};
    /*var sales = dataHl4.getHl4SalesByHl4Id(id);
     var hl4SalesKeys = Object.keys(sales);
     var totalAmount = 0;
     hl4SalesKeys.forEach(function (hl4SalesKey) {
     sales[hl4SalesKey] = JSON.parse(JSON.stringify(sales[hl4SalesKey]));
     aux["in_" + hl4SalesKey.toLowerCase()] = sales[hl4SalesKey];
     sales[hl4SalesKey].forEach(function (sale) {
     sale.AMOUNT = (Number(sale.AMOUNT) * Number(currencyValue)).toFixed(2);
     totalAmount = totalAmount + Number(sale.AMOUNT);
     });
     });
     aux.total = totalAmount;*/
    return aux;
}

function crmFieldsHaveChanged(data, isComplete, userId, hl4) {
    var crmFieldsHaveChanged = false;
    var crmBindingChangedFields = [];
    var crmBindingChangedFieldsUpdate = [];
    var budgetChanged = false;

    if (!isComplete)
        return {
            crmFieldsHaveChanged: true,
            crmBindingChangedFields: crmBindingChangedFields,
            crmBindingChangedFieldsUpdate: crmBindingChangedFieldsUpdate
        };
    var l4ReportFields = level4DER.getProcessingReportFields();
    var deReportDisplayName = l4ReportFields.deReportDisplayName;
    var crmBindingFields = l4ReportFields.crmBindingFields;

    if (!data.HL4_ID) {
        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var parameters = {
                    "in_hl4_id": data.HL4_ID,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };
                crmBindingChangedFields.push(parameters);
            });
        });
    } else {
        if (!hl4) {
            level4DER.deleteL4ChangedFieldsByHl4Id(data.HL4_ID);
        }

        var oldHl4 = {};
        if (hl4) {
            oldHl4 = hl4;
        } else {
            oldHl4 = data.HL4_INFORMATION ? data.HL4_INFORMATION.HL4_IN_CRM_VERSION : {};
        }

        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var oldParentPath = '';
                var parentPath = '';
                if (field == "PARENT_PATH") {
                    oldParentPath = data.HL4_INFORMATION.HL4.PARENT_PATH || null;
                    /** TODO: sacarlo tambien **/
                    parentPath = pathBL.getPathByLevelParentForCrm('hl4', data.HL3_ID);
                }
                var parameters = {
                    "in_hl4_id": data.HL4_ID,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };

                var fieldChanged = false;

                switch (field) {
                    case "BUDGET":
                        //When the HL4 is "In CRM", the budget can not change de status, but we need to validate it later to show the correct message.
                        if (Number(data.HL4_STATUS_DETAIL_ID) !== Number(HL4_STATUS.IN_CRM)) {
                            fieldChanged = Number(oldHl4[field]).toFixed(2) != Number(data[field]).toFixed(2)
                        } else {
                            fieldChanged = false;
                            budgetChanged = Number(oldHl4[field]).toFixed(2) != Number(data[field]).toFixed(2);
                        }

                        break;
                    case "SHOPPING_CART_APPROVER":
                    case "COST_CENTER":
                        fieldChanged = oldHl4[field] != data[field];
                        break;
                    default:
                        fieldChanged = oldHl4[field] != data[field];
                        break;
                }

                if (fieldChanged || oldParentPath != parentPath || (field == "BUDGET" && budgetChanged)) {
                    if (field == "PARENT_PATH") {
                        if (oldParentPath) {
                            if (oldParentPath != parentPath) {
                                pathBL.updParentPath('hl4', data.HL4_ID, parentPath, userId);
                            }
                        } else {
                            pathBL.insParentPath('hl4', data.HL4_ID, data.HL3_ID, userId);
                        }
                    }

                    crmBindingChangedFields.push(parameters);

                    if (field !== "BUDGET" || fieldChanged || oldParentPath != parentPath) {
                        crmFieldsHaveChanged = true;
                    }

                }
            });
        });
    }

    return {
        crmFieldsHaveChanged: crmFieldsHaveChanged, //en true
        crmBindingChangedFields: crmBindingChangedFields, //todos los campos
        crmBindingChangedFieldsUpdate: crmBindingChangedFieldsUpdate, //una coleccion vacia
        budgetChanged: budgetChanged,
        onlyBudget: budgetChanged && !crmFieldsHaveChanged
    };
}

//event is "Created" or "Updated"
function notifyChangeByEmail(data, userId, event) {

    var Hl3Id = data.HL3_ID;
    var HL3 = level3BL.getLevel3ById(Hl3Id);
    var ownerId = HL3.CREATED_USER_ID;
    var Owner = userLib.getUserById(ownerId);
    var user = userLib.getUserById(userId);
    var path = pathBL.getPathByLevelParentToCRM('hl4', Hl3Id);

    var body = ' <p> Dear Colleague </p>  <p>The User : ' + userLib.getUserById(userId).USER_NAME + ' has set the Initiative/Campaign ' + path + ' for you.</p>  <p>Click on the ' + config.getAppUrl() + ' to review</p>';
    var mailObject = mail.getJson([{
        "address": Owner[0].EMAIL
    }], "Marketing Planning Tool - Level 4 " + event, body);

    var rdo = mail.sendMail(mailObject, true);


}

/*function sendProcessingReportEmail(hl4Id) {
 var objHl3 = {};
 var appUrl = config.getLoginUrl();

 var hl4 = dataHl4.getHl4ById(hl4Id);
 var hl3 = dataHl3.getLevel3ById(hl4.HL3_ID);

 var hl3OwnerEmail = getUserById(hl3.CREATED_USER_ID)[0].EMAIL;

 var body = '<p> Dear Colleague </p>';
 body += '<p>An initiative has been created in CRM.</p><br>';
 body += '<p>' + appUrl + '#/TeamPlanHierarchy/Level4/edit/' + hl4.HL3_ID + '/' + hl4Id + '</p>';


 var mailObject = mail.getJson([{
 "address": hl3OwnerEmail
 }], "Marketing Planning Tool - Interlock Process", body);

 mail.sendMail(mailObject, true);
 }*/

function checkPermission(userSessionID, method, hl4Id) {
    if (((method && method == "GET_BY_HL3_ID") || !method) && !util.isSuperAdmin(userSessionID)) {
        var hl4 = dataHl4.getHl4ById(hl4Id);
        var l3 = dataHl3.getLevel3ById(hl4.HL3_ID, userSessionID);
        var usersL3 = userLib.getUserByHl3Id(hl4.HL3_ID, l3.HL2_ID).users_in;
        var users = usersL3.find(function (user) {
            return user.USER_ID == userSessionID
        });
        if (!users) {
            throw ErrorLib.getErrors().CustomError("", "", "User hasn´t permission for this resource.");
        }
    }
}

function getExpectedOutcomesByHl4Id(hl4Id, hl3Id) {
    return expectedOutcomesLib.getExpectedOutcomesByHl4Id(hl4Id, hl3Id);
}

function addChildPermission(id) {
    var result = dataHl4.getHl4StatusByHl4Id(id);
    var statusId = result ? result.HL4_STATUS_DETAIL_ID : 0;
    return statusId != HL4_STATUS.DELETED_IN_CRM;
}

function getStatusEnum() {
    return HL4_STATUS;
}

function insertInCrmVersion(hl4Id) {
    // Save the version of HL6 IN_CRM o UPDATE_IN_CRM to compare later
    var hl4VersionedId = dataHl4.insertHl4VersionInCRM(hl4Id);
    // Save the version of CategoryOptions IN_CRM o UPDATE_IN_CRM to compare later
    return dataCategoryOptionLevel.insertCategoryOptionVersioned("HL4", hl4Id, hl4VersionedId);
}

function updEnableCrmCreation(hl4Id, flag) {
    return dataHl4.updEnableCrmCreation(hl4Id, flag);
}

function getEnableAction(hl4, userId, superAdmin) {
    // var isSuperAdmin = util.isSuperAdmin(userId);
    superAdmin = superAdmin == undefined ? util.isSuperAdmin(userId) : superAdmin;
    return {
        ENABLE_DELETION: Number(hl4.STATUS_ID) !== HL4_STATUS.CREATE_IN_CRM
            && Number(hl4.STATUS_ID) !== HL4_STATUS.UPDATE_IN_CRM
            && Number(hl4.STATUS_ID) !== HL4_STATUS.DELETION_REQUEST
            && Number(hl4.STATUS_ID) !== HL4_STATUS.DELETED_IN_CRM,

        ENABLE_CHANGE_STATUS: Number(hl4.STATUS_ID) !== HL4_STATUS.IN_CRM
            && Number(hl4.STATUS_ID) !== HL4_STATUS.CREATE_IN_CRM
            && Number(hl4.STATUS_ID) !== HL4_STATUS.UPDATE_IN_CRM
            && Number(hl4.STATUS_ID) !== HL4_STATUS.DELETION_REQUEST
            && Number(hl4.STATUS_ID) !== HL4_STATUS.DELETED_IN_CRM,

        ENABLE_EDIT: util.getEnableEdit(hl4.STATUS_ID, HL4_STATUS, userId, superAdmin)
    }
}