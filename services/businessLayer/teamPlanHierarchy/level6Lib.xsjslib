/** *************Import Library****************** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataL6DER = mapper.getDataLevel6Report();
var dataCampaignType = mapper.getDataCampaignType();
var dataHl2 = mapper.getDataLevel2();
var dataHl6 = mapper.getDataLevel6();
var dataHl5 = mapper.getDataLevel5();
var dataExOut = mapper.getDataExpectedOutcome();
var dataPartner = mapper.getDataPartner();
var partnerLib = mapper.getPartner();
var dataCurrency = mapper.getDataCurrency();
var dataCategory = mapper.getDataCategory();
var dataOption = mapper.getDataOption();
var dataPath = mapper.getDataPath();
var pathBL = mapper.getPath();
var expectedOutcomesLib = mapper.getExpectedOutcomes();
var level6DER = mapper.getLevel6DEReport();
var dataL6Report = mapper.getDataLevel6Report();
var db = mapper.getdbHelper();
var dbUserRole = mapper.getDataUserRole();
var dbUser = mapper.getDataUser();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var mail = mapper.getMail();
var config = mapper.getDataConfig();
var dataMO = mapper.getDataMarketingOrganization();
var dataRTM = mapper.getDataRouteToMarket();
var dataCST = mapper.getDataCampaignSubType();
var dataCT = mapper.getDataCampaignType();
var dataObj = mapper.getDataObjectives();
var level5Lib = mapper.getLevel5();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var allocationCategory = mapper.getAllocationCategoryLib();
var blLevel2 = mapper.getLevel2();
var blRegion = mapper.getRegion();
var budgetYear = mapper.getBudgetYear();
var budgetSpendRequest = mapper.getBudgetSpendRequest();
var databudgetSpendRequest = mapper.getDataBudgetSpendRequest();
var expectedOutcomesLevelLib = mapper.getExpectedOutcomesLevelLib();
var allocationCategoryOptionLevelLib = mapper.getAllocationCategoryOptionLevelLib();
var level4Lib = mapper.getLevel4();
var uploadLib = mapper.getUploadLib();
var dataUtil = mapper.getDataUtil();
var dataHierarchyCategoryCountry = mapper.getDataHierarchyCategoryCountry();
/** ********************************************** */

var levelCampaign = "Marketing Sub Tactic";
var L6_MSG_INITIATIVE_NOT_FOUND = "The Marketing Sub Tactic ID can not be found.";
var L6_MSG_ROUTE_TO_MARKET_NULL = "The Route to market is mandatory.";
var L6_MSG_INITIATIVE_CRM_ACRONYM = "The Acronym has been used, please choose another one.";
var L6_MSG_INITIATIVE_CRM_ACRONYM_EXISTS = "The Acronym has been used.";
var L6_MSG_USER_NOT_FOUND = "The User can not be found.";
var L6_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L6_MSG_CANNOT_DEL_STATUS = "Cannot delete this selected Marketing Sub Tactic, because the status doesn´t allow it.";
var L6_MSG_CANNOT_GET_BY_ID = "Cannot get this selected Marketing Sub Tactic because the status doesn´t allow it.";
var L6_MSG_INITIATIVE_CRM_DESCRIPTION = "The Marketing Sub Tactic CRM description can not be null or empty.";
var L6_MSG_INITIATIVE_CURRENCY = "The Marketing Sub Tactic Currency can not be found.";
var L6_MSG_INITIATIVE_BUDGET_SPEND = "The Marketing Sub Tactic Budget spend must be set.";
var L6_MSG_INITIATIVE_BUDGET_SPEND_PERCENT = "The Marketing Sub Tactic Budget Spend must be 100%.";
var L6_MSG_INITIATIVE_MY_BUDGET = " The Marketing Sub Tactic in My Budget can not be found.";
var L6_MSG_INITIATIVE_BUDGET_PERCENT = "The Marketing Sub Tactic in My Budget percentage should be less than or equal to 100%.";
var L6_MSG_INITIATIVE_ROUTE_TO_MARKET = "The Marketing Sub Tactic route to market cannot be found.";
var L6_MSG_INITIATIVE_CAMPAIGN_OBJECTIVE = "The Marketing Sub Tactic campaign objective cannot be found.";
var L6_MSG_INITIATIVE_CAMPAIGN_TYPE = "The Marketing Sub Tactic campaign type cannot be found.";
var L6_MSG_INITIATIVE_CAMPAIGN_SUBTYPE = "The Marketing Sub Tactic campaign subtype cannot be found.";
var L6_MSG_INITIATIVE_ACTUAL_START_DATE = "The Marketing Sub Tactic actual start date cannot be found.";
var L6_MSG_INITIATIVE_ACTUAL_END_DATE = "The Marketing Sub Tactic actual end date cannot be found.";
var L6_MSG_INITIATIVE_SALES_ORGANIZATION = "The Marketing Sub Tactic sales organization cannot be found.";
var L6_MSG_INITIATIVE_INVALID_DATE_RANGE = "The Actual End Date must be greater than Actual Start Date";
var L6_CAMPAIGN_FORECASTING_KPIS_DETAILS = "Campaign Forecasting / KPIS details amount value is not valid.";
var L6_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO = "Campaign Forecasting / KPIS details euro value is not valid.";
var L6_CAMPAIGN_FORECASTING_KPIS_NOT_VALID = "Campaign Forecasting / KPIS is not valid.";
var L6_CAMPAIGN_FORECASTING_KPIS_COMMENT = "Please enter a comment to explain expected outcomes as you didn't select any KPI type.";
var L6_MSG_INITIATIVE_PROPERTIES_CANNOT_UPDATE = "Once Marketing Sub Tactic is already in CRM, the CRM ID cannot be modified.";
var L6_MY_BUDGET_COMPLETE = "My Budget should be 100% complete.";
var L6_CATEGORY_NOT_VALID = "Category is not valid.";
var L6_CATEGORY_OPTIONS_INCORRECT_NUMBER = "Incorrect number of options.";
var L6_CATEGORY_OPTION_NOT_VALID = "Option or User is not valid.";
var L6_CATEGORY_TOTAL_PERCENTAGE = "Category total percentage should be less than or equal to 100%.";
var L6_COST_CENTER_NOT_VALID = "Cost Center cannot be empty.";
var L6_RESPONSIBLE_NOT_VALID = "Employee Responsible cannot be empty.";
var L6_MSG_COULDNT_CHANGE_STATUS_DUE_PENDING_BUDGET_SPEND_REQUEST = "Your records was saved as \"In progress\".  Please review your record for incomplete fields and/or pending budget approvals.";
var L6_MSG_COULDNT_CHANGE_STATUS_DUE_OWN_MONEY_BUDGET_SPEND_REQUEST_STATUS = "Your records was saved as \"In progress\". Please review your record for Own Money Budget Request approval.";
var L6_MSG_COULDNT_CHANGE_STATUS = "Your record was saved as \"In progress\". Please review your record for incomplete fields and/or pending budget approvals.";
var L6_MSG_INITIATIVE_ACTUAL_START_END_DATE_PARENT_RANGE = "The Marketing Sub Tactic actual start date and actual end date cannot be outside of the parent L5 date range.";
var L6_MSG_INITIATIVE_PLANNED_START_END_DATE_PARENT_RANGE = "The Marketing Sub Tactic planned start date and planned end date cannot be outside of the parent L5 date range.";
var L6_PRIORITY_NOT_VALID = "Priority cannot be empty.";
var L6_BUSINESS_OWNER_NOT_VALID = "Business Owner cannot be empty.";
var L6_MSG_REQUIRE_SPEND_BUDGET_VALIDATION = "You have answered “YES” to the question “Does this tactic/sub-tactic require spend budget?”. \n " +
    "You must enter a value greater than 0 under “MY BUDGET”,  “OTHER BUDGET” or “EXTERNAL FUNDING”.  \n" +
    "If you do not require spend budget for your tactic/sub-tactic, please change your selection to “NO”.";
var L6_MSG_MISSING_DATA = "File is empty.";
var L6_MSG_COULDNT_CHANGE_STATUS_INVALID_CRM_DESCRIPTION = "CRM description must be modified before sending this Marketing Sub-Tactic to Processing Report.";

var HL6_STATUS = {
    IN_PROGRESS: 1,
    CREATE_IN_CRM: 2,
    IN_CRM: 3,
    UPDATE_IN_CRM: 4,
    EXCEED_BUDGET: 5,
    COMPLETE: 6,
    VALID_FOR_CRM: 7,
    IN_CRM_NEED_NEW_BUDGET_APPROVAL: 8,
    DELETION_REQUEST: 9,
    DELETED_IN_CRM: 10
};

var ORGANIZATION_TYPE = {
    REGIONAL: 1,
    CENTRAL: 2,
    OTHER: 3
};

var PARTNER_TYPE = {
    EXTERNAL_PARTNER: 1,
    MDF: 2,
    INTEL: 3
};

var HIERARCHY_LEVEL = util.getHierarchyLevelEnum();

var CATEGORY_TYPE = allocationCategory.getCategoryType();

var LEVEL_STRING = 'HL6';

var L6_COPY_CRM_DESCRIPTION = util.getCopyCrmDescription();
var CREATED_FROM_EVENT_REQUEST_CRM_DESCRIPTION = util.getEventRequestCrmDescription();

var map = {
    "REGION_ID": "ORGANIZATION_ID",
    "HL2_ID": "ORGANIZATION_ID",
    "PERCENTAGE": "PERCENTAGE",
    "HL6_STATUS_DETAIL_ID": "STATUS_DETAIL_ID"
};

function getHl6ByHl5Id(hl5Id, userId, includeLegacy, isLegacy) {
    var hl6List = [];
    var enableCration = true;
    var allHl6 = [];

    isLegacy = !!isLegacy && isLegacy.toLowerCase() == "true";

    var hl5 = isLegacy ? dataHl5.getHl5LegacyById(hl5Id) : dataHl5.getHl5ById(hl5Id);
    var l4Id = hl5.HL4_ID;

    var totalBudget = hl5 ? hl5.BUDGET : 0;
    var totalAllocated = dataHl6.getHl6TotalBudgetByHl5Id(hl5Id, Number(isLegacy));
    var remainingBudget = totalBudget - totalAllocated;
    var isSuperAdmin = util.isSuperAdmin(userId);

    if (isLegacy) {
        hl6List = dataHl6.getHl6LegacyByHl5Id(hl5Id, 1);
    } else {
        hl6List = dataHl6.getHl6ByHl5Id(hl5Id, 1);
        enableCration = level5Lib.addChildPermission(hl5Id) && level4Lib.addChildPermission(l4Id);
    }

    if (hl6List.length) {
        hl6List.forEach(function (hl6) {
            var aux = {};
            var actionPermission = getActionPermission(hl6, userId, isSuperAdmin);
            Object.keys(hl6).forEach(function (key) {
                if (key !== 'HL5_PATH') {
                    //set view link to CRT
                    if (key === 'CRT_RELATED') {
                        aux.TO_CRT = false;
                    } else {
                        aux[key] = hl6[key];
                    }
                } else {
                    //the full path from the query
                    aux.CRM_ID = hl6[key];
                }
            });
            aux.ENABLE_DELETION = !!actionPermission.ENABLE_DELETION && !!hl6.HL6_ID;
            aux.ENABLE_CHANGE_STATUS = !!actionPermission.ENABLE_CHANGE_STATUS && !!hl6.HL6_ID;
            aux.ENABLE_EDIT = !!actionPermission.ENABLE_EDIT && !!hl6.HL6_ID;
            aux.ENABLE_CLONE = !!actionPermission.ENABLE_CLONE && !!hl6.HL6_ID;
            allHl6.push(aux);
        });
    }

    var response = {
        "results": allHl6,
        "total_budget": totalBudget,
        "remaining_budget": remainingBudget,
        "total_allocated": totalAllocated,
        "ENABLE_CREATION": enableCration
    };
    response.budget_year = budgetYear.getBudgetYearByLevelParent(6, hl5Id, true, isLegacy ? 1 : 0);
    return response;
}

function getHl6ById(hl6Id) {
    if (!hl6Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "hl6Services/handleGet/getHl6ById", L6_MSG_INITIATIVE_NOT_FOUND);

    var hl6 = JSON.parse(JSON.stringify(dataHl6.getHl6ById(hl6Id)));

    var defaultKpi = {
        COMMENTS: '',
        KPIS: []
    };

    if (hl6.HL6_STATUS_DETAIL_ID == HL6_STATUS.DELETED_IN_CRM) {
        throw ErrorLib.getErrors().BadRequest("", "", L6_MSG_CANNOT_GET_BY_ID);
    }

    var internalCofunding = getInternalCofunding(hl6Id);
    var externalCofunding = getExternalCofunding(hl6Id);
    hl6.FORECAST_AT_L5 = !!Number(hl6.FORECAST_AT_L5);
    hl6.TARGET_KPIS = !hl6.FORECAST_AT_L5 ? expectedOutcomesLib.getExpectedOutcomesByHl6Id(hl6Id, hl6.HL5_ID) : defaultKpi;
    hl6.BUDGET_EUROS = (Number(hl6.BUDGET)).toFixed(2);
    hl6.BUDGET_CURRENCY = {
        ID: hl6.EURO_CONVERSION_ID,
        VALUE: Number(hl6.CURRENCY_VALUE).toFixed(2),
        ABBREVIATION: hl6.CURRENCY_ABBREVIATION
    };
    hl6.PARTNERS = externalCofunding.PARTNERS;
    hl6.INTEL_TOTAL_BUDGET = externalCofunding.PARTNER_INTEL_TOTAL;
    hl6.INTEL_TOTAL_BUDGET_EUROS = externalCofunding.PARTNER_INTEL_TOTAL_EUROS;
    hl6.PARTNER_CURRENCY = {ID: externalCofunding.PARTNER_CURRENCY_ID, VALUE: externalCofunding.PARTNER_CURRENCY_VALUE};
    hl6.EXTERNAL_TOTAL_BUDGET = externalCofunding.PARTNER_EXTERNAL_TOTAL;
    hl6.EXTERNAL_TOTAL_BUDGET_EUROS = externalCofunding.PARTNER_EXTERNAL_TOTAL_EUROS;

    hl6.BUDGET_DISTRIBUTION = dataHl6.getHl6MyBudgetByHl6Id(hl6Id);

    hl6.SALES = internalCofunding.SALE;
    hl6.SALE_TOTAL_EUROS = internalCofunding.SALE_TOTAL_EUROS;
    hl6.SALE_TOTAL = internalCofunding.SALE_TOTAL;
    hl6.SALE_CURRENCY = {ID: internalCofunding.SALE_CURRENCY_ID, VALUE: internalCofunding.SALE_CURRENCY_VALUE};
    hl6.SALE_REQUESTS = internalCofunding.SALE_REQUESTS;

    hl6.CATEGORIES = getCategoryOption(hl6Id);

    hl6.TOTAL_BUDGET = ((Number(hl6.BUDGET_EUROS) + Number(hl6.INTEL_TOTAL_BUDGET_EUROS)
        + Number(hl6.EXTERNAL_TOTAL_BUDGET_EUROS) + Number(hl6.SALE_TOTAL_EUROS)) * hl6.BUDGET_CURRENCY.VALUE).toFixed(2);

    hl6.TOTAL_BUDGET_EUR = (Number(hl6.BUDGET_EUROS) + Number(hl6.INTEL_TOTAL_BUDGET_EUROS)
        + Number(hl6.EXTERNAL_TOTAL_BUDGET_EUROS) + Number(hl6.SALE_TOTAL_EUROS)).toFixed(2);


    hl6.IS_IN_CRM = !!dataHl6.hl6ExistsInCrm(hl6Id);
    hl6.BUDGET = (Number(hl6.BUDGET) * Number(hl6.CURRENCY_VALUE)).toFixed(2);
    return serverToUiParser(hl6);
}

function getUserById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserById", L6_MSG_USER_NOT_FOUND);
    return dbUser.getUserById(id);

}

function getLevel6ForSearch(userSessionID, budget_year_id, region_id, subregion_id, limit, offset) {
    var isSuperAdmin = util.isSuperAdmin(userSessionID);
    var list = dataHl6.getHl6ForSearch(userSessionID, isSuperAdmin ? 1 : 0, budget_year_id, region_id || 0, subregion_id || 0, limit, offset || 0);
    list = JSON.parse(JSON.stringify(list));
    list.result.forEach(function (elem) {
        elem.ENABLE_EDIT = util.getEnableEdit(elem.HL6_STATUS_DETAIL_ID, HL6_STATUS, userSessionID, isSuperAdmin);
    });
    return list;
}

function getHl6ByHl5IdUserId(hl5Id, userId) {
    var HL4_STATUS = level4Lib.getStatusEnum();
    var HL5_STATUS = level5Lib.getStatusEnum();
    var crm = 'CRM-';
    var isSuperAdmin = util.isSuperAdmin(userId);
    var hl6List = dataHl6.getHl6ByHl5IdUserId(hl5Id, userId, isSuperAdmin ? 1 : 0);
    var result = {};
    var requestResult = {results: []};

    if (hl6List.length) {
        for (var i = 0; i < hl6List.length; i++) {
            if (!result[hl6List[i].HL5_ID]) {
                result[hl6List[i].HL5_ID] = {
                    PARENT_ID: hl6List[i].HL5_ID
                    , PARENT_PATH: hl6List[i].HL5_PATH
                    , ENABLE_CREATION: hl6List[i].PARENT_STATUS_ID != HL5_STATUS.DELETED_IN_CRM
                    && hl6List[i].GRAN_PARENT_STATUS_ID != HL4_STATUS.DELETED_IN_CRM
                    , CHILDREN: []
                };
            }
            if (hl6List[i].HL6_ID) {
                var actionPermission = getActionPermission(hl6List[i], userId, isSuperAdmin);
                result[hl6List[i].HL5_ID].CHILDREN.push({
                    HL6_ID: hl6List[i].HL6_ID
                    ,
                    PARENT_ID: hl6List[i].HL5_ID
                    ,
                    STATUS_DETAIL: hl6List[i].STATUS_DETAIL
                    ,
                    HL6_PATH: hl6List[i].HL6_PATH
                    ,
                    CREATED_BY: hl6List[i].CREATED_BY
                    ,
                    HL6_BUDGET: hl6List[i].HL6_BUDGET
                    ,
                    IMPORTED: hl6List[i].IMPORTED
                    ,
                    CRT_RELATED: hl6List[i].CRT_RELATED
                    ,
                    CRM_DESCRIPTION: hl6List[i].CRM_DESCRIPTION
                    ,
                    STATUS_ID: hl6List[i].STATUS_ID
                    ,
                    BUDGET_SPEND_REQUEST_STATUS_ID: hl6List[i].BUDGET_SPEND_REQUEST_STATUS_ID
                    ,
                    BUDGET_SPEND_REQUEST_STATUS: hl6List[i].BUDGET_SPEND_REQUEST_STATUS
                    ,
                    ENABLE_DELETION: actionPermission.ENABLE_DELETION
                    ,
                    ENABLE_EDIT: actionPermission.ENABLE_EDIT
                    ,
                    ENABLE_CLONE: actionPermission.ENABLE_CLONE
                    ,
                    ENABLE_CHANGE_STATUS: actionPermission.ENABLE_CHANGE_STATUS
                })
            }
        }
        requestResult.results = util.objectToArray(result);
    }

    return requestResult;
}

function insertHl6(data, userId, isLegacy) {
    var hl5;

    if (isLegacy) {
        hl5 = dataHl5.getHl5LegacyById(data.HL5_LEGACY_ID);
        data.PARENT_PATH = hl5.PATH;
    } else {
        hl5 = dataHl5.getHl5ById(data.HL5_ID);
    }


    var hl5Id = data.HL5_ID || data.HL5_LEGACY_ID;
    var l4Id = data.HL4_ID || hl5.HL4_ID;

    if (!level4Lib.addChildPermission(l4Id)) {
        throw ErrorLib.getErrors().CustomError("", "", "Cannot create Marketing Sub Tactic under this Program/Campaign. Program/Campaign is in Deleted In CRM status.");
    }

    if (!isLegacy && !level5Lib.addChildPermission(data.HL5_ID)) {
        throw ErrorLib.getErrors().CustomError("", "", "Cannot create Marketing Sub Tactic under this Marketing Tactic. Marketing Tactic is in Deleted In CRM status.");
    }

    var hl6_id = 0;
    data = uiToServerParser(data);
    if (!hasAdditionalFields(data.CAMPAIGN_TYPE_ID)) {
        data.VENUE = null;
        data.CITY = null;
        data.COUNTRY_ID = null;
        data.URL = null;
        data.STREET = null;
        data.POSTAL_CODE = null;
        data.REGION = null;
        data.EVENT_OWNER = null;
        data.NUMBER_OF_PARTICIPANTS = null;
    }

    var automaticApproval = blLevel2.getHl2AllowAutomaticBudgetApprovalByHl4Id(l4Id);
    data.AUTOMATIC_APPROVAL = automaticApproval;
    var conversionValue = dataCurrency.getCurrencyValueId(data.EURO_CONVERSION_ID);
    if (data.ALLOW_BUDGET_ZERO) {
        data.BUDGET = 0;
        data.IN_BUDGET = 1;
    } else {
        data.BUDGET = Number(data.BUDGET) / conversionValue;
        data.IN_BUDGET = checkBudgetStatus(hl5Id, hl6_id, data.BUDGET, hl5, isLegacy);
    }

    var validationResult = validateHl6(data, userId, hl5, isLegacy);
    data.STATUS_DETAIL_ID = validationResult.statusId;

    if (data.STATUS_DETAIL_ID > 0) {
        data.CREATED_USER_ID = userId;

        var validAcronym = !data.ACRONYM ? getNewHl6Id(hl5Id, isLegacy) : data.ACRONYM;

        try {
            hl6_id = insertData(data, validAcronym);
            if (isLegacy) {
                dataHl6.insertHl6Legacy(hl6_id, hl5Id);
            }
        } catch (e) {
            if (e.name == "CRM Constraint Error") {
                var error = ErrorLib.getErrors().AcronymError("", "", L6_MSG_INITIATIVE_CRM_ACRONYM);
                throw error;
            } else {
                throw e
            }
        }

        if (hl6_id > 0) {
            data.HL6_ID = hl6_id;
            data.HL2_ID = dataHl2.getHl2ByHl4Id(l4Id).HL2_ID;
            budgetSpendRequest.insertOwnMoneyBudgetSpendRequest(data.BUDGET, hl6_id, LEVEL_STRING, userId, !!data.ALLOW_BUDGET_ZERO || (automaticApproval && data.IN_BUDGET));
            insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, hl6_id);
            pathBL.insParentPath(LEVEL_STRING.toLowerCase(), hl6_id, hl5Id, userId, hl5.PATH);
            insertExpectedOutcomes(data, userId);
            insertBudgetDistribution(data, userId);
            insertInternalCofunding(data, automaticApproval, userId);
            insertExternalCoFunding(data, automaticApproval, userId);
            insertCategoryOption(data, userId);
        }
        dataL6Report.updateLevel6ReportForDownload(hl6_id); //Update Processing Report Export Data
        return hl6_id;
    }
}

function valuesToArray(obj) {
    return Object.keys(obj).map(function (key) {
        return obj[key];
    });
}

function validateHl6Upload(data) {


    if (!data.ACRONYM) {
        var error = ErrorLib.getErrors().ImportError("", "level6Lib/validateHl6Upload-data.ACRONYM", L6_MSG_INITIATIVE_NOT_FOUND);
        error.row = valuesToArray(data);
        //error.details = L6_MSG_INITIATIVE_NOT_FOUND;
        throw error;
    }

    if (!data.ROUTE_TO_MARKET_ID) {
        var error = ErrorLib.getErrors().ImportError("", "level6Lib/validateHl6Upload-data.ROUTE_TO_MARKET_ID", L6_MSG_ROUTE_TO_MARKET_NULL);
        error.row = valuesToArray(data);
        //error.details = L6_MSG_INITIATIVE_NOT_FOUND;
        throw error;
    }
    //if (data.hl5.ACRONYM.length !== 4)
    //  throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_ACRONYM_LENGTH);

    if (existsHl6(data)) {
        var error = ErrorLib.getErrors().ImportError("", "level6Lib/validateHl6Upload-existsHl6", L6_MSG_INITIATIVE_CRM_ACRONYM_EXISTS);
        error.row = valuesToArray(data);
        // error.details = L6_MSG_INITIATIVE_CRM_ACRONYM_EXISTS;
        throw error;
    }
    //if (util.validateDateEndMayorStart((new Date(data.hl5.ACTUAL_START_DATE)), (new Date(data.hl5.ACTUAL_END_DATE))))
    //    throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L5_MSG_INITIATIVE_INVALID_DATE_RANGE);

    //if (data.hl5.EURO_CONVERSION_ID < 0)
//        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_CURRENCY);

    return true;
}

function insertHl6FromUpload(data, userId) {
    var hl6_id = 0;
    if (validateHl6Upload(data)) {

        /**
         * Fix some fields to insert a Hl6 imported
         */
        data.EMPLOYEE_RESPONSIBLE_USER = JSON.parse(JSON.stringify(data.EMPLOYEE_RESPONSIBLE_ID));
        data.EMPLOYEE_RESPONSIBLE_ID = null;
        data.BUDGET = 0;
        data.IN_BUDGET = 0;
        data.STATUS_DETAIL_ID = 1;
        data.RESULTS_CAMPAIGN_Q1 = 0;
        data.RESULTS_CAMPAIGN_Q2 = 0;
        data.RESULTS_CAMPAIGN_Q3 = 0;
        data.RESULTS_CAMPAIGN_Q4 = 0;
        data.CO_FUNDED = 0;
        data.ALLOW_BUDGET_ZERO = 0;
        data.IS_POWER_USER = 1;
        data.PERSON_RESPONSIBLE = null;
        data.IS_COMPLETE = 0;
        data.IMPORTED = 1;
        hl6_id = insertData(data, data.ACRONYM);

        if (hl6_id) {
            data.HL6_ID = hl6_id;
            insertCategoryOption(data, userId);

            // var outcome = {};
            // outcome.CREATED_USER_ID = userId;
            // outcome.HL6_ID = hl6_id;
            // outcome.COMMENTS = data.COMMENTS || "";
            // var hl6_expected_outcomes_id = dataExOut.insertHl6ExpectedOutcomes(outcome.HL6_ID, outcome.COMMENTS, outcome.CREATED_USER_ID);
            // data.expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
            //     expectedOutcomeDetail.CREATED_USER_ID = userId;
            //     expectedOutcomeDetail.HL6_EXPECTED_OUTCOMES_ID = hl6_expected_outcomes_id;
            //     expectedOutcomeDetail.VOLUME_VALUE = Number(expectedOutcomeDetail.VOLUME_VALUE);
            //     expectedOutcomeDetail.EURO_VALUE = Number(expectedOutcomeDetail.EURO_VALUE);
            //     var expectedoutcomelevelid = expectedOutcomeDetail.EXPECTED_OUTCOME_OPTION_ID;//dataExOut.getExpectedOutcomeLevelByLevelAndOptionId(HIERARCHY_LEVEL.HL6, expectedOutcomeDetail.EXPECTED_OUTCOME_OPTION_ID).EXPECTED_OUTCOME_LEVEL_ID;
            //     dataExOut.insertHl6ExpectedOutcomesDetail([{
            //         in_hl6_expected_outcomes_id: expectedOutcomeDetail.HL6_EXPECTED_OUTCOMES_ID,
            //         in_outcomes_id: expectedoutcomelevelid,
            //         in_euro_value: expectedOutcomeDetail.EURO_VALUE,
            //         in_volume_value: expectedOutcomeDetail.VOLUME_VALUE,
            //         in_created_user_id: userId
            //     }]);
            // });

            //inserts budget regions
            var regions = blRegion.getAllRegions();
            var centralTeams = blLevel2.getAllCentralTeam(0);

            regions.forEach(function (myBudget) {
                myBudget.HL6_ID = hl6_id;
                dataHl6.insertHl6BudgetSalesUpload(myBudget.HL6_ID, myBudget.REGION_ID, 0, ORGANIZATION_TYPE["REGIONAL"], "", userId, data.EURO_CONVERSION_ID);
            });

            centralTeams.forEach(function (sale) {
                sale.HL6_ID = hl6_id;
                dataHl6.insertHl6BudgetSalesUpload(sale.HL6_ID, sale.HL2_ID, 0, ORGANIZATION_TYPE["CENTRAL"], "", userId, data.EURO_CONVERSION_ID);
            });
            //insert sale other data

            dataHl6.insertHl6Sale([{
                in_hl6_id: hl6_id,
                in_organization_id: null,
                in_amount: 0,
                in_organization_type: ORGANIZATION_TYPE["OTHER"],
                in_description: "Other",
                in_currency_id: data.EURO_CONVERSION_ID,
                in_created_user_id: userId
            }]);
            /***********************************/

        }
    }
    return hl6_id;
}

function insertInCrmBinding(crmBindingChangedFields, crmBindingChangedFieldsUpdate, hl6Id) {
    if (hl6Id) {
        for (var i = 0; i < crmBindingChangedFields.length; i++) {
            crmBindingChangedFields[i].in_hl6_id = hl6Id;
        }
        for (var j = 0; j < crmBindingChangedFieldsUpdate.length; j++) {
            crmBindingChangedFieldsUpdate[j].in_hl6_id = hl6Id;
        }
    }

    if (crmBindingChangedFields.length)
        dataHl6.insertHl6CRMBinding(crmBindingChangedFields);

    if (crmBindingChangedFieldsUpdate.length)
        dataHl6.updateHl6CRMBinding(crmBindingChangedFieldsUpdate);
}

function updateHl6(data, userId, isLegacy) {
    if (!data.HL6_ID)
        throw ErrorLib.getErrors().CustomError("",
            "hl6Services/handlePost/updatehl6",
            L6_MSG_INITIATIVE_NOT_FOUND);

    if (!util.validateIsNumber(data.HL6_ID))
        throw ErrorLib.getErrors().CustomError("",
            "hl6Services/handlePost/updatehl6",
            L6_MSG_INITIATIVE_NOT_FOUND);

    if (!userId)
        throw ErrorLib.getErrors().CustomError("",
            "hl6Services/handlePost/updatehl6", L6_MSG_USER_NOT_FOUND);
    var objHL6 = dataHl6.getHl6ById(data.HL6_ID);

    var hl5 = isLegacy ? dataHl5.getHl5LegacyById(data.HL5_LEGACY_ID) : dataHl5.getHl5ById(data.HL5_ID);
    var hl5Id = data.HL5_ID || data.HL5_LEGACY_ID;
    var l4Id = data.HL4_ID || hl5.HL4_ID;

    if (!level4Lib.addChildPermission(l4Id)) {
        throw ErrorLib.getErrors().CustomError("", "", "Cannot update this selected Marketing Sub Tactic under this Program/Campaign. Program/Campaign is in Deleted In CRM status.");
    }

    if (!isLegacy && !level5Lib.addChildPermission(data.HL5_ID)) {
        throw ErrorLib.getErrors().CustomError("", "", "Cannot update this selected Marketing Sub Tactic under this Marketing Tactic. Marketing Tactic is in Deleted In CRM status.");
    }

    var hl6StatusId = Number(objHL6.HL6_STATUS_DETAIL_ID);

    if (hl6StatusId === HL6_STATUS.DELETED_IN_CRM) {
        throw ErrorLib.getErrors().CustomError("", "", "Cannot update this selected Marketing Sub-Tactic, because the status doesn´t allow it.");
    }

    //TODO: Super admin validation added because of SAP new requirements, refactor this
    if (!util.isSuperAdmin(userId)) {
        if (hl6StatusId === HL6_STATUS.CREATE_IN_CRM || hl6StatusId === HL6_STATUS.UPDATE_IN_CRM) {
            throw ErrorLib.getErrors().CustomError("", "", "Cannot update this selected Initiative/Campaign, because the status doesn´t allow it.");
        }
    }

    level4Lib.getImplementExecutionLevel(l4Id);
    data = uiToServerParser(data);
    if (!hasAdditionalFields(data.CAMPAIGN_TYPE_ID)) {
        data.VENUE = null;
        data.CITY = null;
        data.COUNTRY_ID = null;
        data.URL = null;
        data.STREET = null;
        data.POSTAL_CODE = null;
        data.REGION = null;
        data.EVENT_OWNER = null;
        data.NUMBER_OF_PARTICIPANTS = null;
    }
    var automaticApproval = blLevel2.getHl2AllowAutomaticBudgetApprovalByHl4Id(l4Id);
    data.AUTOMATIC_APPROVAL = automaticApproval;
    var conversionValue = dataCurrency.getCurrencyValueId(data.EURO_CONVERSION_ID);
    if (data.ALLOW_BUDGET_ZERO) {
        data.BUDGET = 0;
        data.IN_BUDGET = 1;
    } else {
        data.BUDGET = Number(data.BUDGET) / conversionValue;
        data.IN_BUDGET = checkBudgetStatus(hl5Id, data.HL6_ID, data.BUDGET, hl5, isLegacy);
    }

    var ownMoneyBudgetSpendRequestStatus = budgetSpendRequest.getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(data.HL6_ID, LEVEL_STRING);
    if (!ownMoneyBudgetSpendRequestStatus) {
        budgetSpendRequest.insertOwnMoneyBudgetSpendRequest(data.BUDGET, data.HL6_ID, LEVEL_STRING, userId, !!data.ALLOW_BUDGET_ZERO || (automaticApproval && data.IN_BUDGET));
    } else {
        var budgetSpendRequestStatus = budgetSpendRequest.getBudgetSpendRequestsStatus();

        if ((Number(objHL6.BUDGET).toFixed(2) !== Number(data.BUDGET).toFixed(2)) ||
            (ownMoneyBudgetSpendRequestStatus != budgetSpendRequestStatus.APPROVED)) {

            budgetSpendRequest.updateOwnMoneyBudgetSpendRequestByHlIdLevel(data.HL6_ID, LEVEL_STRING, data.BUDGET, !!data.ALLOW_BUDGET_ZERO || (automaticApproval && data.IN_BUDGET), userId);
        }
    }

    var validationResult = validateHl6(data, userId, hl5, isLegacy);
    data.STATUS_DETAIL_ID = validationResult.statusId;
    if (data.STATUS_DETAIL_ID > 0) {
        data.CREATED_USER_ID = userId;

        var validAcronym = !data.ACRONYM ? getNewHl6Id(hl5Id, isLegacy) : data.ACRONYM;

        try {
            dataHl6.updateHl6(
                data.HL6_ID,
                validAcronym,
                data.CRM_DESCRIPTION || 'N/D',
                data.BUDGET,
                data.ROUTE_TO_MARKET_ID || null,
                data.CAMPAIGN_OBJECTIVE_ID || 0,
                data.CAMPAIGN_TYPE_ID || 0,
                data.CAMPAIGN_SUBTYPE_ID || 0,
                data.MARKETING_PROGRAM_ID || 0,
                data.MARKETING_ACTIVITY_ID || 0,
                data.ACTUAL_START_DATE || null,
                data.ACTUAL_END_DATE || null,
                data.SHOW_ON_DG_CALENDAR ? 1 : 0,
                data.BUSINESS_OWNER_ID || 0,
                data.EMPLOYEE_RESPONSIBLE_ID || 0,
                data.COST_CENTER_ID || 0,
                data.IN_BUDGET,
                data.BUDGET_SPEND_Q1 || 0,
                data.BUDGET_SPEND_Q2 || 0,
                data.BUDGET_SPEND_Q3 || 0,
                data.BUDGET_SPEND_Q4 || 0,
                data.EURO_CONVERSION_ID,
                data.STATUS_DETAIL_ID,
                data.SALES_ORGANIZATION_ID || null,
                data.CREATED_USER_ID,
                data.DISTRIBUTION_CHANNEL_ID || 0,
                data.VENUE,
                data.CITY,
                data.COUNTRY_ID || null,
                data.URL,
                data.RESULTS_CAMPAIGN_Q1 || 0,
                data.RESULTS_CAMPAIGN_Q2 || 0,
                data.RESULTS_CAMPAIGN_Q3 || 0,
                data.RESULTS_CAMPAIGN_Q4 || 0,
                data.PLANNED_START_DATE || null,
                data.PLANNED_END_DATE || null,
                data.STREET,
                data.POSTAL_CODE,
                data.REGION,
                data.EVENT_OWNER,
                data.NUMBER_OF_PARTICIPANTS,
                data.PRIORITY_ID,
                Number(data.CO_FUNDED),
                Number(data.ALLOW_BUDGET_ZERO),
                Number(data.IS_POWER_USER || 0),
                data.EMPLOYEE_RESPONSIBLE_USER,
                data.PERSON_RESPONSIBLE,
                Number(data.IS_COMPLETE),
                data.INHERITED_CREATION || 0
            );
        } catch (e) {
            if (e.name == "CRM Constraint Error") {
                var error = ErrorLib.getErrors().AcronymError("", "", L6_MSG_INITIATIVE_CRM_ACRONYM);
                throw error;
            } else {
                throw e
            }
        }
        insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, data.HL6_ID);

        if (data.STATUS_DETAIL_ID != objHL6.HL6_STATUS_DETAIL_ID) {
            dataHl6.insertHl6LogStatus(data.HL6_ID, objHL6.HL6_STATUS_DETAIL_ID, userId);
            dataHl6.updateDeletionReason(data.HL6_ID, null, userId);
        }
        data.HL2_ID = dataHl2.getHl2ByHl4Id(l4Id).HL2_ID;

        //Check if the KPIs were changed and update them
        var originalKPIs = expectedOutcomesLib.getExpectedOutcomesByHl6Id(data.HL6_ID, hl5Id);
        var changedKPIs = validateChangedKPIs(data, originalKPIs, objHL6.FORECAST_AT_L5);
        updateExpectedOutcomes(data, userId);

        updateBudgetDistribution(data, userId);
        updateCategoryOption(data, userId);

        if (data.ALLOW_BUDGET_ZERO) {
            budgetSpendRequest.setBudgetSpendRequestStatusNoLongerRequested(data.HL6_ID, LEVEL_STRING, userId);
        }
        else if (!data.CO_FUNDED) {
            budgetSpendRequest.disableCoFundedBudgetSpendRequests(data.HL6_ID, LEVEL_STRING, userId);
        } else {
            updateInternalCofunding(data, automaticApproval, userId);
            updateExternalCoFunding(data, automaticApproval, userId);
        }

        dataL6Report.updateLevel6ReportForDownload(data.HL6_ID); //Update Processing Report Export Data

        var changedFields = (validationResult.crmBindingChangedFields && validationResult.crmBindingChangedFields.length > 0);
        var changedFieldsUpdate = (validationResult.crmBindingChangedFieldsUpdate && validationResult.crmBindingChangedFieldsUpdate.length > 0);

        // throw JSON.stringify({changedFields: changedFields, changedFieldsUpdate: changedFieldsUpdate, budgetChanged: validationResult.budgetChanged, changedKPIs: changedKPIs, status: validationResult.statusId});
        if (!validationResult.crmFieldsHasChanged && (validationResult.budgetChanged || changedKPIs) && Number(validationResult.statusId) === Number(HL6_STATUS.IN_CRM)) {
            return {SUCCESS_MESSAGE: "Your Sub-tactics has automatically updated to CRM"};
        } else {
            if (!data.ACRONYM) {
                data.newAcronym = validAcronym;
            }
        }

        return data;
    }
    else {
        throw ErrorLib.getErrors().CustomError("", "", "Unexpected error, please try again.");
    }
}

function validateChangedKPIs(hl6Object, oldKPIs, oldForecastAtL5) {
    var changed = false;
    var currentOldKPI;

    if (!!oldForecastAtL5 !== !!hl6Object.FORECAST_AT_L5 ||
        hl6Object.TARGET_KPIS.KPIS.length !== oldKPIs.KPIS.length ||
        hl6Object.TARGET_KPIS.COMMENTS !== oldKPIs.COMMENTS
    ) {
        changed = true;
    } else if (hl6Object && hl6Object.TARGET_KPIS.KPIS.length) {
        hl6Object.TARGET_KPIS.KPIS.forEach(function (kpi) {
            currentOldKPI = oldKPIs.KPIS.find(function (oldKpi) {
                return Number(oldKpi.OUTCOMES_ID) === Number(kpi.OUTCOMES_ID);
            });

            if (!currentOldKPI) {
                changed = true;
            } else {
                changed = (
                    (kpi.OUTCOMES_TYPE_NAME !== currentOldKPI.OUTCOMES_TYPE_NAME) ||
                    (kpi.OUTCOMES_NAME !== currentOldKPI.OUTCOMES_NAME) ||
                    (Number(kpi.OUTCOMES_TYPE_ID) !== Number(currentOldKPI.OUTCOMES_TYPE_ID)) ||
                    (Number(kpi.EURO_VALUE) !== Number(currentOldKPI.EURO_VALUE)) ||
                    (Number(kpi.VOLUME_VALUE) !== Number(currentOldKPI.VOLUME_VALUE))
                );
            }
        });
    }

    return changed;
}

function hasAdditionalFields(campaignTypeId) {
    return campaignTypeId && dataCampaignType.getCampaignTypeById(campaignTypeId).SHOW_ADDITIONAL_FIELDS
}

function findHLSalesId(Sales, OrganizationId, OrganizationType) {
    var hlSaleId = null;
    for (var i = 0; i < Sales.length; i++) {
        if (Sales[i].ORGANIZATION_ID == OrganizationId && Sales[i].ORGANIZATION_TYPE == OrganizationType) {
            hlSaleId = Sales[i].HL_SALES_ID || Sales[i].SALES_ID;
            break;
        }
    }

    return hlSaleId;
}

function deleteHl6ByHl5(hl5Id, userId, isCascadeDeletion) {
    var hl6ToDelete = getHl6ByHl5Id(hl5Id, userId).results;
    var objHL6 = {};
    hl6ToDelete.forEach(function (elem) {
        objHL6.HL6_ID = elem.HL6_ID;
        deleteHl6(objHL6, userId, null, isCascadeDeletion);
    });
}

function deleteHl6(hl6, userId, rollBack, isCascadeDeletion) {
    var hl6Id = hl6.HL6_ID;
    if (!hl6Id && !rollBack) {
        throw ErrorLib.getErrors().CustomError("", "", L6_MSG_INITIATIVE_NOT_FOUND);
    }

    if (!rollBack && !util.validateIsNumber(hl6Id)) {
        throw ErrorLib.getErrors().CustomError("", "", L6_MSG_INITIATIVE_NOT_FOUND);
    }

    var userRoleId = Number(dbUserRole.getUserRoleByUserId(userId)[0].ROLE_ID);
    //FIXME: this needs to be removed with the new implementation for permissions
    /*
    if (!rollBack && userRoleId !== 1 && userRoleId !== 2) {
        throw ErrorLib.getErrors().CustomError("", "", L6_MSG_NO_PRIVILEGE);
    }
    */

    var hl6StatusId = !rollBack ? Number(dataHl6.getHl6StatusByHl6Id(hl6Id).HL6_STATUS_DETAIL_ID) : 0;

    if (hl6StatusId !== HL6_STATUS.DELETED_IN_CRM && hl6StatusId !== HL6_STATUS.DELETION_REQUEST) {
        if (!rollBack && isCascadeDeletion && (hl6StatusId === HL6_STATUS.IN_CRM || hl6StatusId === HL6_STATUS.CREATE_IN_CRM || hl6StatusId === HL6_STATUS.UPDATE_IN_CRM)) {
            throw ErrorLib.getErrors().CustomError("", "", L6_MSG_CANNOT_DEL_STATUS);
        }

        if (!rollBack && !isCascadeDeletion && hl6StatusId === HL6_STATUS.IN_CRM) {
            if (hl6.DELETEION_REASON && hl6.DELETEION_REASON.trim()) {
                dataHl6.updateDeletionReason(hl6Id, hl6.DELETEION_REASON, userId);
            }
            setStatus(hl6Id, HL6_STATUS.DELETION_REQUEST, userId);
        } else {
            hl6.USER_ID = userId;

            dataPartner.deleteHl6Partner(hl6Id, userId);
            dataExOut.deleteHl6ExpectedOutcomesDetail(hl6Id, userId);
            dataExOut.deleteHl6ExpectedOutcomes(hl6Id, userId);
            level6DER.deleteL6ChangedFieldsByHl6Id(hl6Id, userId);

            dataCategoryOptionLevel.deleteCategoryOption(hl6Id, userId, LEVEL_STRING);
            dataCategoryOptionLevel.deleteCountryCategoryOption(hl6Id, userId, LEVEL_STRING);

            dataHl6.delHl6Budget(hl6Id, userId);

            //delete HL6_SALE_BUDGET_SPEND_REQUEST
            databudgetSpendRequest.delAllHlSaleBudgetSpendRequestByHlId(hl6Id, userId, LEVEL_STRING); //ready
            dataHl6.delHl6Sale(hl6Id, userId);
            //BUDGET_SPEND_REQUEST_LOG_STATUS
            databudgetSpendRequest.delAllBudgetSpendRequestLogStatusByHlId(hl6Id, userId, LEVEL_STRING);//ready
            //BUDGET_SPEND_REQUEST_MESSAGE
            databudgetSpendRequest.delAllBudgetSpendRequestMessageByHlId(hl6Id, userId, LEVEL_STRING);
            //DEL_ALL_BUDGET_SPEND_REQUEST_BY_HL6_ID
            databudgetSpendRequest.delAllBudgetSpendRequestByHlId(hl6Id, userId, LEVEL_STRING);//ready
            dataPath.delParentPath(LEVEL_STRING.toLowerCase(), hl6Id);
            dataHl6.delHl6(hl6Id, userId);

            if(hl6.IS_LEGACY){
                dataHl6.deleteHl6LegacyByHl6Id(hl6Id, userId);
            }

            dataL6Report.updateLevel6ReportForDownload(hl6Id); //Update Processing Report Export Data
        }
    }
    return hl6;
}

function isComplete(data, fromChangeStatusOnDemand) {
    var deReportDisplayName = level6DER.getProcessingReportFields();
    var crmBindingFields = Object.keys(deReportDisplayName);
    var isComplete = true;
    var notValidate = ["MARKETING_PROGRAM_DESC"
        , "MARKETING_ACTIVITY_ID"
        , "MARKETING_ACTIVITY_DESC"
        , "PARENT_PATH"
        , "DISTRIBUTION_CHANNEL_DESC"
        , "URL"
        , "VENUE"
        , "STREET"
        , "CITY"
        , "COUNTRY_ID"
        , "POSTAL_CODE"
        , "REGION"
        , "EVENT_OWNER"
        , "NUMBER_OF_PARTICIPANTS"
        , "SHOW_ON_DG_CALENDAR"
        , "BUDGET"];
    for (var i = 0; i < crmBindingFields.length; i++) {
        var crmBindingField = crmBindingFields[i];
        switch (crmBindingField) {
            case 'CATEGORY':
                isComplete = !data.HL6_ID ? data.CATEGORIES.length === dataCategory.getAllocationCategoryCountByHlId(LEVEL_STRING.toLowerCase()) : isComplete;
                if (isComplete) {
                    for (var j = 0; j < data.CATEGORIES.length; j++) {
                        var hl6Category = data.CATEGORIES[j];
                        var percentagePerOption = 0;
                        var percentagePerOptionKpi = 0;

                        isComplete = isComplete && !!(hl6Category.CATEGORY_ID && Number(hl6Category.CATEGORY_ID));
                        var countOptions = dataOption.getAllocationOptionCountByCategoryIdLevelId(hl6Category.CATEGORY_ID, LEVEL_STRING.toLowerCase());
                        isComplete = isComplete && (!data.HL6_ID ?
                            hl6Category.OPTIONS.length === countOptions
                            : isComplete);

                        hl6Category.OPTIONS.forEach(function (option) {
                            option.AMOUNT = option.AMOUNT || 0;
                            option.AMOUNT_KPI = option.AMOUNT_KPI || 0;
                            isComplete = isComplete && !!(option.OPTION_ID && Number(option.OPTION_ID));
                            isComplete = isComplete && !(Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0); // Budget%
                            isComplete = isComplete && !(Number(option.AMOUNT_KPI) > 100 || Number(option.AMOUNT_KPI) < 0); // KPI%

                            percentagePerOption = percentagePerOption + Number(option.AMOUNT); // Budget%
                            percentagePerOptionKpi = percentagePerOptionKpi + Number(option.AMOUNT_KPI); // KPI%
                        });

                        isComplete = isComplete && percentagePerOption === 100 || (!hl6Category.MAKE_CATEGORY_MANDATORY && percentagePerOption === 0); // Budget%
                        isComplete = isComplete && percentagePerOptionKpi === 100 || (!hl6Category.MAKE_CATEGORY_MANDATORY && percentagePerOptionKpi === 0); // KPI%

                        var totalOptionsSelected = hl6Category.OPTIONS.filter(function (option) {
                            return (option.AMOUNT && Number(option.AMOUNT) !== 0 || option.AMOUNT_KPI && Number(option.AMOUNT_KPI) !== 0);
                        }).length;

                        isComplete = isComplete && totalOptionsSelected <= hl6Category.OPTIONS_LIMIT;
                        if (!isComplete) {
                            break;
                        }
                    }
                }

                break;
            case "HL6_CRM_DESCRIPTION":
                isComplete = fromChangeStatusOnDemand ? !!data.HL6_CRM_DESCRIPTION : !!data.CRM_DESCRIPTION;
                break;
            case "PRIORITY_ID":
                isComplete = Number(data[crmBindingField]);
                break;
            default:
                if (notValidate.indexOf(crmBindingField) < 0) {
                    isComplete = !!data[crmBindingField];
                }
                break;
        }
        if (!isComplete) {
            break;
        }
    }

    if (isComplete) {
        isComplete = Number(data.ALLOW_BUDGET_ZERO) || ((Number(data.BUDGET_SPEND_Q1) || 0)
            + (Number(data.BUDGET_SPEND_Q2) || 0)
            + (Number(data.BUDGET_SPEND_Q3) || 0)
            + (Number(data.BUDGET_SPEND_Q4) || 0) === 100);

        if (!Number(data.FORECAST_AT_L5)) {
            isComplete = isComplete && !!((data.TARGET_KPIS
                && data.TARGET_KPIS.KPIS && data.TARGET_KPIS.KPIS.length)
                || data.TARGET_KPIS.COMMENTS.trim());
        }
    }
    return isComplete;
}

function validateBudget(data, fromChangeStatusOnDemand) {
    var isComplete = false;
    if (Number(data.ALLOW_BUDGET_ZERO)) {
        isComplete = true;
    } else {
        if (data.AUTOMATIC_APPROVAL) {
            if (!!Number(data.BUDGET)) {
                if (!!Number(data.IN_BUDGET) || fromChangeStatusOnDemand) {
                    var budgetSpendRequestStatus = budgetSpendRequest.getBudgetSpendRequestsStatus();
                    var ownMoneyBudgetSpendRequestStatus = budgetSpendRequest.getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(data.HL6_ID || 0, LEVEL_STRING);
                    if (!ownMoneyBudgetSpendRequestStatus || (ownMoneyBudgetSpendRequestStatus && ownMoneyBudgetSpendRequestStatus != budgetSpendRequestStatus.APPROVED)) {
                        if (Number(data.CO_FUNDED)) {
                            isComplete = (data.SALE_REQUESTS && data.SALE_REQUESTS.length) || (data.PARTNERS && data.PARTNERS.length);
                        } else {
                            //isComplete = false;
                            var hasBudgetRequestApproved = !!Number(budgetSpendRequest.countApprovedBudgetRequestByHl6Id(data.HL6_ID || '0'));
                            var hasBudgetRequestPending = !Number(budgetSpendRequest.countPendingBudgetRequestByHl6Id(data.HL6_ID || '0'));
                            isComplete = hasBudgetRequestApproved && hasBudgetRequestPending;
                        }
                    } else {
                        isComplete = true;
                    }
                } else {
                    if (Number(data.CO_FUNDED)) {
                        isComplete = (data.SALE_REQUESTS && data.SALE_REQUESTS.length) || (data.PARTNERS && data.PARTNERS.length);
                    } else {
                        //isComplete = false;
                        var hasBudgetRequestApproved = !!Number(budgetSpendRequest.countApprovedBudgetRequestByHl6Id(data.HL6_ID || '0'));
                        var hasBudgetRequestPending = !Number(budgetSpendRequest.countPendingBudgetRequestByHl6Id(data.HL6_ID || '0'));
                        isComplete = hasBudgetRequestApproved && hasBudgetRequestPending;
                    }
                }
            } else {
                if (Number(data.CO_FUNDED)) {
                    isComplete = (data.SALE_REQUESTS && data.SALE_REQUESTS.length) || (data.PARTNERS && data.PARTNERS.length);
                } else {
                    isComplete = false;
                }
            }
        } else {
            if (!!Number(data.BUDGET)) {
                isComplete = true;
            } else {
                var hasBudgetRequestApproved = !!Number(budgetSpendRequest.countApprovedBudgetRequestByHl6Id(data.HL6_ID || '0'));
                var hasBudgetRequestPending = !Number(budgetSpendRequest.countPendingBudgetRequestByHl6Id(data.HL6_ID || '0'));
                isComplete = hasBudgetRequestApproved && hasBudgetRequestPending;
            }
        }
        isComplete = isComplete && validateBudgetDistribution(data);
    }
    return isComplete;
}

//The Marketing Sub Tactic actual start date and actual end date cannot be outside of the parent L5 date range.
function validateDateRange(data, hl5) {
    // var hl5 = dataHl5.getHl5ById(data.HL5_ID);
    if (hl5.ACTUAL_START_DATE && hl5.ACTUAL_END_DATE) {
        if (!data.ACTUAL_START_DATE)
            throw ErrorLib.getErrors().CustomError("", "", L6_MSG_INITIATIVE_ACTUAL_START_DATE);

        if (!data.ACTUAL_END_DATE)
            throw ErrorLib.getErrors().CustomError("", "", L6_MSG_INITIATIVE_ACTUAL_END_DATE);

        if (new Date(hl5.ACTUAL_START_DATE) > new Date(data.ACTUAL_START_DATE) || new Date(data.ACTUAL_END_DATE) > new Date(hl5.ACTUAL_END_DATE))
            throw ErrorLib.getErrors().CustomError("", "", L6_MSG_INITIATIVE_ACTUAL_START_END_DATE_PARENT_RANGE);

        if (!!hl5.PLANNED_START_DATE && !!hl5.PLANNED_END_DATE &&
            (new Date(hl5.PLANNED_START_DATE) > new Date(data.PLANNED_START_DATE) ||
                new Date(data.PLANNED_END_DATE) > new Date(hl5.PLANNED_END_DATE))
        )
            throw ErrorLib.getErrors().CustomError("", "", L6_MSG_INITIATIVE_PLANNED_START_END_DATE_PARENT_RANGE);
    }
    return true;
}

function validateHl6(data, userId, hl5) {
    var existInCrm = 0;
    var statusId = HL6_STATUS.IN_PROGRESS;
    var crmBindingChangedFields = [];
    var crmBindingChangedFieldsUpdate = [];
    var myBudgetComplete = false;
    var categoryOptionComplete = false;
    var categoryHasChanged = false;

    if (!Number(data.ALLOW_BUDGET_ZERO) && Number(data.BUDGET) == 0
        && (!data.CO_FUNDED || data.PARTNERS.length == 0 && data.SALE_REQUESTS.length == 0)) {
        throw ErrorLib.getErrors().CustomError("", "", L6_MSG_REQUIRE_SPEND_BUDGET_VALIDATION);
    }

    if (!Number(data.ALLOW_BUDGET_ZERO) && data.CO_FUNDED) {
        if (data.PARTNERS && data.PARTNERS.length) {
            budgetSpendRequest.validateExternalCofunding(data.PARTNERS);
        }
        if (data.SALE_REQUESTS && data.SALE_REQUESTS.length) {
            budgetSpendRequest.validateInternalCofunding(data.SALE_REQUESTS);
        }
    }

    var isHl6Complete = isComplete(data);
    data.IS_COMPLETE = Number(isHl6Complete);
    var hl6 = data.HL6_ID ? dataHl6.getHl6ById(data.HL6_ID) : {};
    if (data.HL6_ID) {
        existInCrm = dataHl6.hl6ExistsInCrm(data.HL6_ID);
        categoryHasChanged = categoryChanged(data, existInCrm, userId);
        if (existInCrm && hl6.ACRONYM != data.ACRONYM)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_PROPERTIES_CANNOT_UPDATE);
    }

    validateDateRange(data, hl5);

    if (isHl6Complete) {
        if (!data)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_NOT_FOUND);

        if (!data.CRM_DESCRIPTION || !data.CRM_DESCRIPTION.trim() || (data.CRM_DESCRIPTION.trim()).length > 40) {
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CRM_DESCRIPTION)
        }

        if (!Number(data.DISTRIBUTION_CHANNEL_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_DISTRIBUTION_CHANNEL);

        if (!data.COST_CENTER_ID || data.COST_CENTER_ID < 0)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_COST_CENTER_NOT_VALID);

        if (!data.EMPLOYEE_RESPONSIBLE_USER || !data.EMPLOYEE_RESPONSIBLE_USER.trim())
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_RESPONSIBLE_NOT_VALID);

        if (!data.ROUTE_TO_MARKET_ID || !Number(data.ROUTE_TO_MARKET_ID) || !dataRTM.getRouteToMarketById(data.ROUTE_TO_MARKET_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_ROUTE_TO_MARKET);

        if (!data.CAMPAIGN_OBJECTIVE_ID || !Number(data.CAMPAIGN_OBJECTIVE_ID) || !dataObj.getObjectiveById(data.CAMPAIGN_OBJECTIVE_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CAMPAIGN_OBJECTIVE);

        if (!data.CAMPAIGN_TYPE_ID || !Number(data.CAMPAIGN_TYPE_ID) || !dataCT.getCampaignTypeById(data.CAMPAIGN_TYPE_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CAMPAIGN_TYPE);

        if (!data.CAMPAIGN_SUBTYPE_ID || !Number(data.CAMPAIGN_SUBTYPE_ID) || !dataCST.getCampaignSubTypeById(data.CAMPAIGN_SUBTYPE_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CAMPAIGN_SUBTYPE);

        if (!data.PRIORITY_ID || data.PRIORITY_ID < 0) {
            throw ErrorLib.getErrors().CustomError("", "", L6_PRIORITY_NOT_VALID);
        }

        if (!data.BUSINESS_OWNER_ID || data.BUSINESS_OWNER_ID < 0) {
            throw ErrorLib.getErrors().CustomError("", "", L6_BUSINESS_OWNER_NOT_VALID);
        }

        if (!data.SALES_ORGANIZATION_ID || !Number(data.SALES_ORGANIZATION_ID) || !dataMO.getMarketingOrganizationById(data.SALES_ORGANIZATION_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_SALES_ORGANIZATION);

        if (!data.ACTUAL_START_DATE)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_ACTUAL_START_DATE);

        if (!data.ACTUAL_END_DATE)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_ACTUAL_END_DATE);

        if (util.validateDateEndMayorStart((new Date(data.ACTUAL_START_DATE)), (new Date(data.ACTUAL_END_DATE))))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_INVALID_DATE_RANGE);

        if (!Number(data.EURO_CONVERSION_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CURRENCY);

        if (!data.BUDGET_SPEND_Q1 && !data.BUDGET_SPEND_Q2 && !data.BUDGET_SPEND_Q3 && !data.BUDGET_SPEND_Q4)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_SPEND);

        if (!Number(data.ALLOW_BUDGET_ZERO) && ((Number(data.BUDGET_SPEND_Q1) || 0) +
                (Number(data.BUDGET_SPEND_Q2) || 0) +
                (Number(data.BUDGET_SPEND_Q3) || 0) +
                (Number(data.BUDGET_SPEND_Q4) || 0)) < 100)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_SPEND_PERCENT);

        myBudgetComplete = validateBudgetDistribution(data);
        validateSales(data);
        validateKpi(data);
        categoryOptionComplete = validateCategoryOption(data);

        var crmFieldsHasChangedResult = crmFieldsHaveChanged(data, data.ALLOW_BUDGET_ZERO || (categoryOptionComplete && myBudgetComplete), userId);
        var crmFieldsHasChanged = crmFieldsHasChangedResult.crmFieldsHaveChanged;
        crmBindingChangedFields = crmFieldsHasChangedResult.crmBindingChangedFields;
        crmBindingChangedFieldsUpdate = crmFieldsHasChangedResult.crmBindingChangedFieldsUpdate;

        var budgetChanged = crmFieldsHasChangedResult.budgetChanged;
        var onlyBudget = crmFieldsHasChangedResult.onlyBudget;

        if (data.HL6_ID) {
            if (categoryHasChanged) {
                var field = [{
                    "in_hl6_id": data.HL6_ID,
                    "in_column_name": "CATEGORY",
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": ''
                }];
                insertInCrmBinding(field, [], data.HL6_ID); // Inset in HL6_CRM_BINDING a row for categoryChange
            }
            if (!crmFieldsHasChanged && !categoryHasChanged && !budgetChanged && existInCrm) {
                statusId = HL6_STATUS.IN_CRM;
            } else if (!crmFieldsHasChanged && !categoryHasChanged && budgetChanged && Number(hl6.HL6_STATUS_DETAIL_ID) == HL6_STATUS.IN_CRM) {
                statusId = hl6.HL6_STATUS_DETAIL_ID;
            } else if (!crmFieldsHasChanged && !categoryHasChanged && validateBudget(data)) {
                if (Number(hl6.HL6_STATUS_DETAIL_ID) == HL6_STATUS.IN_CRM
                    && !data.AUTOMATIC_APPROVAL
                    && ((data.SALE_REQUESTS && data.SALE_REQUESTS.length)
                        || (data.PARTNERS && data.PARTNERS.length))) {
                    statusId = HL6_STATUS.IN_CRM_NEED_NEW_BUDGET_APPROVAL;
                } else {
                    statusId = hl6.HL6_STATUS_DETAIL_ID;
                }
            } else {
                statusId = HL6_STATUS.IN_PROGRESS;
            }
        }
    }
    return {
        statusId: statusId
        , isComplete: isHl6Complete
        , crmBindingChangedFields: crmBindingChangedFields
        , crmBindingChangedFieldsUpdate: crmBindingChangedFieldsUpdate
        , budgetChanged: budgetChanged
        , onlyBudget: onlyBudget
        , crmFieldsHasChanged: crmFieldsHasChanged || categoryHasChanged
    };
}

function categoryChanged(data, existInCrm, userId) {
    var optionChange = false;
    //obtain the CATEGORY options in bd
    var hl6_categoryBD = getCategoryOptionVersioned(data.HL6_ID);
    optionChange = CompareCategories(data.CATEGORIES, hl6_categoryBD, existInCrm, data.HL6_ID, hl6_categoryBD.length);

    return optionChange;
}

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
        if (option.OPTION_ID === OptionId) {
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
    for (var i = 0; i < listCategory.length; i++) {
        var category = listCategory[i];
        if (category.CATEGORY_ID === categoryId) {
            return category;
        }
    }
    return null;
}

function CompareCategoryOption(Category1, Category1_id, ListCategories, existInCrm, hasCategoryOptionInCrmVersion) {
    var Category2 = hasCategoryOptionInCrmVersion ? getCategoryFromList(ListCategories, Category1_id) : {OPTIONS: []};
    return CompareListOptions(Category1.OPTIONS, Category2.OPTIONS, existInCrm, hasCategoryOptionInCrmVersion)
}

function CompareCategories(ListCategories1, ListCategories2, existInCrm, hl6Id, hasCategoryOptionInCrmVersion) {

    var flag = false;
    var actualCategory = util.getCategoryById(LEVEL_STRING.toLowerCase(), hl6Id);
    for (var i = 0; i < ListCategories1.length; i++) {
        var category = ListCategories1[i];

        //Compare
        if (actualCategory[category.CATEGORY_ID].IN_PROCESSING_REPORT) {
            flag = CompareCategoryOption(category, category.CATEGORY_ID, ListCategories2, existInCrm, hasCategoryOptionInCrmVersion) || flag;
        }

    }
    return flag;
}

function isMyBudgetComplete(budgetDistribution) {
    var myBudgetTotalPercentage = 0;
    var myBudgetComplete = false;
    budgetDistribution.forEach(function (budgetDistribution) {
        if (!budgetDistribution.ORGANIZATION_ID || !Number(budgetDistribution.ORGANIZATION_ID))
            throw ErrorLib.getErrors().CustomError("", "", levelCampaign + " in My Budget " + budgetDistribution.ORGANIZATION_ID + " can not be found.");

        myBudgetTotalPercentage += Number(budgetDistribution.PERCENTAGE);
    });

    if (myBudgetTotalPercentage > 100)
        throw ErrorLib.getErrors().CustomError("", "", L6_MSG_INITIATIVE_BUDGET_PERCENT);

    myBudgetTotalPercentage = myBudgetTotalPercentage < 100 ? 0 : myBudgetTotalPercentage;

    myBudgetComplete = !!myBudgetTotalPercentage;
    return myBudgetComplete;
}

function isCategoryOptionComplete(data) {
    var categoryOptionComplete = false;
    for (var i = 0; i < data.CATEGORIES.length; i++) {
        var hl6Category = data.CATEGORIES[i];
        var percentagePerOption = 0;
        var percentagePerOptionKpi = 0;
        if (!hl6Category.CATEGORY_ID || !Number(hl6Category.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_NOT_VALID);

        if (!hl6Category.OPTIONS.length) {
            percentagePerOption = 100;
            percentagePerOptionKpi = 100;
        }
        //TODO review. Workaround for empty categories on edit
        //throw ErrorLib.getErrors().CustomError("","hl6Services/handlePost/insertHl6", L6_CATEGORY_OPTIONS_NOT_EMPTY);

        if (!data.HL6_ID && hl6Category.OPTIONS.length !== dataOption.getAllocationOptionCountByCategoryIdLevelId(hl6Category.CATEGORY_ID, LEVEL_STRING.toLowerCase()))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_OPTIONS_INCORRECT_NUMBER);

        hl6Category.OPTIONS.forEach(function (option) {
            if (!option.OPTION_ID || !Number(option.OPTION_ID))
                throw ErrorLib.getErrors().CustomError("", "", L6_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.AMOUNT) && !Number(option.AMOUNT)) || Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0)
                throw ErrorLib.getErrors().CustomError("", "", "Option value is not valid (actual value " + option.AMOUNT + ")");
            if ((parseFloat(option.AMOUNT_KPI) && !Number(option.AMOUNT_KPI)) || Number(option.AMOUNT_KPI) > 100 || Number(option.AMOUNT_KPI) < 0)
                throw ErrorLib.getErrors().CustomError("", "", "Option KPI value is not valid (actual value " + option.AMOUNT_KPI + ")");

            percentagePerOption = percentagePerOption + Number(option.AMOUNT);
            percentagePerOptionKpi = percentagePerOptionKpi + Number(option.AMOUNT_KPI);
        });
        if (percentagePerOption > 100) {
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_TOTAL_PERCENTAGE);
        }

        if (!Number(hl6Category.MAKE_CATEGORY_MANDATORY)
            && (percentagePerOption === 0 || percentagePerOption === 100)
            && (percentagePerOptionKpi === 0 || percentagePerOptionKpi === 100)) {
            categoryOptionComplete = true;
            /*break;*/
        } else if (percentagePerOption > 100 || percentagePerOptionKpi > 100) {
            throw ErrorLib.getErrors().CustomError("", "", L6_CATEGORY_TOTAL_PERCENTAGE);
        } else if (percentagePerOption < 100 || percentagePerOptionKpi < 100) {
            categoryOptionComplete = false;
            break;
        } else {
            categoryOptionComplete = true;
        }
    }
    return categoryOptionComplete;
}

function getLevel6ByAcronym(acronym, hl5_id) {
    return dataHl6.getHl6ByAcronym(acronym, hl5_id);
}

function existsHl6(objHl6) {
    var hl6 = getLevel6ByAcronym(objHl6.ACRONYM, objHl6.HL5_ID);
    return !!(hl6 && hl6.HL6_ID && Number(hl6.HL6_ID) !== Number(objHl6.HL6_ID));
}

function checkBudgetStatus(objHl5, hl6_id, new_hl6_budget, hl5, isLegacy) {
    if (!hl6_id) hl6_id = 0;
    if (Number(objHl5) && (new_hl6_budget || new_hl6_budget == 0)) {
        var objHl = {};
        objHl.HL5_ID = objHl5;
        objHl.HL6_ID = hl6_id;
        //var hl5 = dataHl5.getHl5ById(objHl.HL5_ID);
        var hl5AllocatedBudget = isLegacy ? dataHl5.getHl5LegacyAllocatedBudget(objHl.HL5_ID, hl6_id) : dataHl5.getHl5AllocatedBudget(objHl.HL5_ID, hl6_id);
        return (Number(hl5.BUDGET) - Number(hl5AllocatedBudget) - Number(new_hl6_budget)) >= 0 ? 1 : 0;
    } else {
        var hl5Id = Number(objHl5) ? objHl5 : objHl5.HL5_ID;
        var resultHl6 = dataHl6.getHl6ByHl5Id(hl5Id);

        if (resultHl6.length > 0) {
            var total = 0;
            for (var i = 0; i < resultHl6.length; i++) {
                var hl6 = resultHl6[i];
                if (hl6.HL6_STATUS_DETAIL_ID != HL6_STATUS.DELETED_IN_CRM) {
                    if (parseFloat(objHl5.BUDGET) < total + parseFloat(hl6.HL6_BUDGET)) {
                        dataHl6.hl6ChangeInOUTBudget(hl6.HL6_ID, 0);
                    } else {
                        dataHl6.hl6ChangeInOUTBudget(hl6.HL6_ID, 1);
                        total = total + parseFloat(hl6.HL6_BUDGET);
                    }
                }
            }
        }
        return true;
    }
}

function setStatus(hl6_id, status_id, userId) {
    if (hl6_id && status_id && userId) {
        dataHl6.hl6ChangeStatus(hl6_id, status_id, userId);
        dataHl6.insertHl6LogStatus(hl6_id, status_id, userId);
        if (HL6_STATUS.IN_CRM == status_id) {
            level6DER.deleteL6ChangedFieldsByHl6Id(hl6_id);
            resetHl6CategoryOptionUpdated(hl6_id, userId);
            insertInCrmVersion(hl6_id);
        }
        dataL6Report.updateLevel6ReportForDownload(hl6_id);
    }

    return true;
}

function massSetHl6Status(hl6Ids, userId) {
    var hl6List = [];
    var hl6IdsInCrm = [];
    hl6Ids.forEach(function (hl6) {
        var status_id = (Number(dataHl6.getHl6StatusByHl6Id(hl6.hl6_id).HL6_STATUS_DETAIL_ID) === HL6_STATUS.DELETION_REQUEST)
            ? HL6_STATUS.DELETED_IN_CRM
            : !!Number(budgetSpendRequest.countPendingBudgetRequestByHl6Id(hl6.hl6_id))
                ? HL6_STATUS.IN_CRM_NEED_NEW_BUDGET_APPROVAL : HL6_STATUS.IN_CRM;
        hl6List.push({
            "in_hl6_id": hl6.hl6_id
            , 'in_status_id': status_id
            , 'in_user_id': userId
        });
        if (status_id == HL6_STATUS.IN_CRM) {
            hl6IdsInCrm.push(hl6);
        }
    });
    dataHl6.massInsertHl6LogStatus(hl6Ids, userId);
    dataHl6.massChangeStatusHl6(hl6List);
    level6DER.massDeleteL6ChangedFieldsByHl6Ids(hl6Ids);
    massResetHl6CategoryOptionUpdated(hl6Ids, userId);

    return hl6IdsInCrm;
}

function massResetHl6CategoryOptionUpdated(hl6Id, userId) {
    dataCategoryOptionLevel.massResetHl6CategoryOptionUpdated(hl6Id, LEVEL_STRING.toLowerCase(), userId);
    dataHierarchyCategoryCountry.massResetCountryCategoryOptionUpdated(hl6Id, LEVEL_STRING.toLowerCase(), userId);
    return true;
}

function resetHl6CategoryOptionUpdated(hl6Id, userId) {
    return dataCategoryOptionLevel.resetHl4CategoryOptionUpdated(hl6Id, LEVEL_STRING.toLowerCase(), userId);
}

function setStatusInCRM(hl6_id, userId) {
    var hl6Ids = [];
    var result;
    if (hl6_id.constructor === Array) {
        hl6Ids = hl6_id.map(function (value) {
            return {hl6_id: value}
        });
    } else {
        hl6Ids.push({hl6_id: hl6_id})
    }

    if (hl6Ids.length) {
        var hl6InCrm = massSetHl6Status(hl6Ids, userId);
        mail.massSendInCRMMail(hl6InCrm, LEVEL_STRING.toLowerCase());
        hl6Ids.forEach(function (value) {
            insertInCrmVersion(value.hl6_id);
            dataL6Report.updateLevel6ReportForDownload(value.hl6_id);
        })
    }
    return 1;
}

function setStatusInCRMByUpload(data, userId) {
    if (!data || !data.DATA || !data.DATA.length) {
        throw ErrorLib.getErrors().CustomError("", "", L6_MSG_MISSING_DATA);
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
        setStatusInCRM(ids, userId);
    }

    result.UPDATED = ids.length;
    result.NOT_FOUND = result.NOT_FOUND_PATH.length;

    return result;
}

function changeStatusOnDemand(hl6_id, userId, cancelConfirmation, isLegacy) {
    var hl6 = dataHl6.getHl6ById(hl6_id);
    if (hl6.hl6_crm_description == L6_COPY_CRM_DESCRIPTION || hl6.hl6_crm_description == CREATED_FROM_EVENT_REQUEST_CRM_DESCRIPTION) {
        throw ErrorLib.getErrors().CustomError("", "", L6_MSG_COULDNT_CHANGE_STATUS_INVALID_CRM_DESCRIPTION);
    }

    var existInCrm = dataHl6.hl6ExistsInCrm(hl6_id);
    var statusId = null;
    var isDataComplete = Number(hl6.IS_COMPLETE);
    var numChanges = level6DER.countL6ChangedFieldsByHL6Id(hl6_id);
    
    if (hl6.HL6_STATUS_DETAIL_ID != HL6_STATUS.IN_CRM
        && hl6.HL6_STATUS_DETAIL_ID != HL6_STATUS.UPDATE_IN_CRM
        && hl6.HL6_STATUS_DETAIL_ID != HL6_STATUS.CREATE_IN_CRM) {
        if (!cancelConfirmation) {
            if (hl6.HL6_STATUS_DETAIL_ID == HL6_STATUS.VALID_FOR_CRM
                || hl6.HL6_STATUS_DETAIL_ID == HL6_STATUS.IN_PROGRESS) {
                if (!existInCrm) {
                    // If not exist in CRM - set status: CREATE_IN_CRM
                    statusId = HL6_STATUS.CREATE_IN_CRM;
                } else {
                    statusId = numChanges > 0 ? HL6_STATUS.UPDATE_IN_CRM : HL6_STATUS.IN_CRM;
                    // If exist in CRM and have changes in CRM fields - set status: UPDATE_IN_CRM
                    // If exist in CRM and not have changes in CRM fields - set status: IN_CRM
                }
            } else if (hl6.HL6_STATUS_DETAIL_ID == HL6_STATUS.IN_CRM_NEED_NEW_BUDGET_APPROVAL) {
                statusId = HL6_STATUS.IN_CRM;
            } else {
                statusId = hl6.HL6_STATUS_DETAIL_ID;
            }

        } else {
            statusId = numChanges > 0 ? HL6_STATUS.VALID_FOR_CRM : HL6_STATUS.IN_CRM;
        }

        if (!hl6.ALLOW_BUDGET_ZERO) {
            var budgetSpendRequestStatus = budgetSpendRequest.getBudgetSpendRequestsStatus();

            var ownMoneyBudgetSpendRequestStatus = budgetSpendRequest.getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(hl6_id, LEVEL_STRING);
            if ((!ownMoneyBudgetSpendRequestStatus || (ownMoneyBudgetSpendRequestStatus && ownMoneyBudgetSpendRequestStatus != budgetSpendRequestStatus.APPROVED)
                    && !budgetSpendRequest.countApprovedCoFundedBudgetSpendRequestByHlIdLevel(hl6_id, LEVEL_STRING))) {
                throw ErrorLib.getErrors().CustomError("", "", L6_MSG_COULDNT_CHANGE_STATUS_DUE_OWN_MONEY_BUDGET_SPEND_REQUEST_STATUS);
            }
        }
        var data = JSON.parse(JSON.stringify(hl6));
        var hl5 = !Number(data.HL5_ID) ? dataHl5.getHl5LegacyById(data.HL5_LEGACY_ID) : dataHl5.getHl5ById(data.HL5_ID);
        var hl5Id = data.HL5_ID || data.HL5_LEGACY_ID;
        var l4Id = data.HL4_ID || hl5.HL4_ID;
        if (statusId == HL6_STATUS.VALID_FOR_CRM
            || statusId == HL6_STATUS.CREATE_IN_CRM
            || statusId == HL6_STATUS.UPDATE_IN_CRM) {
            var targetKpis = expectedOutcomesLib.getExpectedOutcomesByHl6Id(hl6_id, hl5Id);
            var hl6Category = getCategoryOption(hl6_id);
            /*var data = JSON.parse(JSON.stringify(hl6));*/
            data.TARGET_KPIS = targetKpis;
            data.CATEGORIES = hl6Category;
            // var l4Id = dataHl5.getHl5ById(data.HL5_ID).HL4_ID;
            data.AUTOMATIC_APPROVAL = blLevel2.getHl2AllowAutomaticBudgetApprovalByHl4Id(l4Id);
            var internalCofunding = getInternalCofunding(hl6_id);
            var externalCofunding = getExternalCofunding(hl6_id);
            data.PARTNERS = externalCofunding.PARTNERS;
            data.SALE_REQUESTS = internalCofunding.SALE_REQUESTS;
            data.BUDGET_DISTRIBUTION = dataHl6.getHl6MyBudgetByHl6Id(hl6_id);
            isDataComplete = isComplete(data, true);
        }

        if (!isDataComplete || !validateBudget(data, true)) {
            throw ErrorLib.getErrors().CustomError("", "", L6_MSG_COULDNT_CHANGE_STATUS);
        }

        if (statusId == HL6_STATUS.CREATE_IN_CRM) {
            level6DER.deleteL6ChangedFieldsByHl6Id(hl6_id);
            // var hl5 = dataHl5.getHl5ById(data.HL5_ID);
            data.HL2_ID = dataHl2.getHl2ByHl4Id(l4Id).HL2_ID;
            updateCategoryOption(data, hl6_id, userId, true);
            var aux = crmFieldsHaveChanged(data, 1, userId, true);
            insertInCrmBinding(aux.crmBindingChangedFields, [], hl6_id);
        }

        return setStatus(hl6_id, statusId, userId);
    }
    return true;
}

function crmFieldsHaveChanged(data, isComplete, userId, isNew) {
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

    var deReportDisplayName = level6DER.getProcessingReportFields();
    var crmBindingFields = {hl6: Object.keys(deReportDisplayName)};

    if (!data.HL6_ID) {
        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var parameters = {
                    "in_hl6_id": data.HL6_ID,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };
                crmBindingChangedFields.push(parameters);
            });
        });
    } else {
        level6DER.deleteL6ChangedFieldsByHl6Id(data.HL6_ID);
        var oldHl6 = dataHl6.getHL6VersionedById(data.HL6_ID); // TODO Change this to HL6Versioned
        oldHl6 = oldHl6 ? oldHl6 : {};
        var existInCrm = dataHl6.hl6ExistsInCrm(data.HL6_ID);
        var l6CrmBindigFields = util.getMapHl6ChangedFieldsByHl6Id(data.HL6_ID);

        // var debug = [];

        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var fieldChanged = false;
                var oldParentPath = '';
                var parentPath = '';
                if (Number(oldHl6.HL5_ID) && field == "PARENT_PATH") {
                    oldParentPath = dataPath.getCrmParentPathByIdLevelId(LEVEL_STRING.toLowerCase(), data.HL6_ID)[0].PARENT_PATH;
                    parentPath = pathBL.getPathByLevelParentForCrm(LEVEL_STRING.toLowerCase(), data.HL5_ID);
                }

                var parameters = {
                    "in_hl6_id": data.HL6_ID,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };

                if (field.indexOf('_DATE') <= 0) {
                    switch (field) {
                        case "MARKETING_ACTIVITY_ID":
                            fieldChanged = (oldHl6[field] || 0) != (Number(data[field]) || 0);
                            break;
                        case "URL":
                        case "VENUE":
                        case "STREET":
                        case "CITY":
                        case "COUNTRY_ID":
                        case "POSTAL_CODE":
                        case "REGION":
                        case "EVENT_OWNER":
                        case "NUMBER_OF_PARTICIPANTS":
                            fieldChanged = (oldHl6[field] || null) != (data[field] || null);
                            break;
                        case "HL6_CRM_DESCRIPTION":
                            fieldChanged = oldHl6.HL6_CRM_DESCRIPTION != data.CRM_DESCRIPTION;
                            break;
                        case "BUDGET":
                            var oldCurrencyValue = Number(dataCurrency.getCurrencyValueId(oldHl6.EURO_CONVERSION_ID));
                            var newCurrencyValue = Number(dataCurrency.getCurrencyValueId(data.EURO_CONVERSION_ID));

                            //When the HL5 is "In CRM", the budget can not change de status, but we need to validate it later to show the correct message.
                            if (Number(oldHl6.HL6_STATUS_DETAIL_ID) !== Number(HL6_STATUS.IN_CRM)) {
                                fieldChanged = Number(oldHl6[field]) / oldCurrencyValue != Number(data[field]) / newCurrencyValue;
                            } else {
                                fieldChanged = false;
                                budgetChanged = Number(oldHl6[field]) / oldCurrencyValue != Number(data[field]) / newCurrencyValue;
                            }

                            break;
                        case "PARENT_PATH":
                            // If have HL5_ID undefined is HL6_LEGACY and Path dont change
                            fieldChanged =  !!data.HL5_ID && oldHl6[field] != data[field];
                            break;
                        default:
                            fieldChanged = oldHl6[field] != data[field];
                            break;
                    }
                    /*if (field == 'BUDGET') {
                        var oldCurrencyValue = Number(dataCurrency.getCurrencyValueId(oldHl6.EURO_CONVERSION_ID));
                        var newCurrencyValue = Number(dataCurrency.getCurrencyValueId(data.EURO_CONVERSION_ID));
                        fieldChanged = Number(oldHl6[field]) / oldCurrencyValue != Number(data[field]) / newCurrencyValue;
                    } else {
                        fieldChanged = oldHl6[field] != data[field];
                    }*/
                }

                else {
                    fieldChanged = new Date(oldHl6[field]).valueOf() !== new Date(data[field]).valueOf();
                }

                if (isNew) {
                    fieldChanged = true;
                }

                // debug.push({field: field, fieldChanged: fieldChanged, oldParentPath: oldParentPath, parentPath: parentPath});

                if (fieldChanged || oldParentPath != parentPath || (field == "BUDGET" && budgetChanged)) {
                    if (Number(oldHl6.HL5_ID) && field == "PARENT_PATH") {
                        if (oldParentPath) {
                            if (oldParentPath != parentPath) {
                                pathBL.updParentPath(LEVEL_STRING.toLowerCase(), data.HL6_ID, parentPath, userId);
                            }
                        } else {
                            pathBL.insParentPath(LEVEL_STRING.toLowerCase(), data.HL6_ID, data.HL5_ID, userId);
                        }
                    }

                    var in_hl6_crm_binding_id = l6CrmBindigFields[field] ? l6CrmBindigFields[field].HL6_CRM_BINDING_ID : null;

                    if (in_hl6_crm_binding_id) {
                        parameters.in_hl6_crm_binding_id = in_hl6_crm_binding_id;
                        crmBindingChangedFieldsUpdate.push(parameters);
                    } else {
                        crmBindingChangedFields.push(parameters);
                    }
                    if (field !== "BUDGET" || fieldChanged || oldParentPath != parentPath) {
                        crmFieldsHaveChanged = true;
                    }
                }
            });
        });

        // throw JSON.stringify(debug);
    }
    return {
        crmFieldsHaveChanged: crmFieldsHaveChanged
        , crmBindingChangedFields: crmBindingChangedFields
        , crmBindingChangedFieldsUpdate: crmBindingChangedFieldsUpdate
        , budgetChanged: budgetChanged
        , onlyBudget: budgetChanged && !crmFieldsHaveChanged
    };
}

function getNewHl6Id(HL5_ID, isLegacy) {
    return dataHl6.getNewHl6Id(HL5_ID, isLegacy);
}

function extractElementByList(list, criterion, value) {
    for (var i = 0; i < list.length; i++) {
        if (list[i][criterion] == value) return list[i];
    }

    return null;
}

function delHl6DataImportByImportId(importId) {
    var hl6List = dataHl6.getHl6ByImportId(importId);
    for (var i = 0; i < hl6List.length; i++) {
        var hl6 = hl6List[i];
        //delete sales
        dataHl6.delHl6SaleHard(hl6.HL6_ID, true);
        //delete budget
        dataHl6.delHl6BudgetHard(hl6.HL6_ID, true);
        //delete hl6 category option
        dataHl6.delHl6CategoryOptionHard(hl6.HL6_ID, true);

        dataExOut.deleteHl6ExpectedOutcomesDetailHard(hl6.HL6_ID);
        dataExOut.deleteHl6ExpectedOutcomesHard(hl6.HL6_ID);

        //delete hl6
        dataHl6.delHl6Hard(hl6.HL6_ID, true);
    }
    return true;
}

function insertCategoryOption(data, userId) {
    var categoryOptionBulk = [];
    var countryCategoryOptionBulk = [];
    var mapCOL = util.getMapCategoryOption(LEVEL_STRING.toLowerCase());
    var mapCCOL = util.getMapCountryCategoryOption(LEVEL_STRING.toLowerCase(), data.HL2_ID);

    data.CATEGORIES.forEach(function (category) {
        category.OPTIONS.forEach(function (option) {
            var categoryOptionLevelId = Number(category.CATEGORY_TYPE_ID) == CATEGORY_TYPE.COUNTRY
                ? mapCCOL[category.CATEGORY_ID][option.OPTION_ID]
                : mapCOL[category.CATEGORY_ID][option.OPTION_ID];

            var categoryOption = {
                in_hl6_id: data.HL6_ID
                , in_category_option_level_id: categoryOptionLevelId
                , in_amount: Number(option.AMOUNT) || 0
                , in_amount_kpi: Number(option.AMOUNT_KPI) || 0
                , in_updated: !!Number(option.AMOUNT) ? 1 : 0
            };

            if (category.CATEGORY_TYPE_ID == CATEGORY_TYPE.COUNTRY) {
                categoryOption.in_user_id = userId;
                countryCategoryOptionBulk.push(categoryOption);
            } else {
                categoryOption.in_created_user_id = userId;
                categoryOptionBulk.push(categoryOption);
            }
        });
    });

    if (categoryOptionBulk.length) {
        dataCategoryOptionLevel.insertCategoryOption(categoryOptionBulk, LEVEL_STRING.toLowerCase());
    }
    if (countryCategoryOptionBulk.length) {
        dataCategoryOptionLevel.insertCountryCategoryOption(countryCategoryOptionBulk, LEVEL_STRING.toLowerCase());
    }

    return true;
}

function updateCategoryOption(data, userId, fromChangeStatusOnDemand) {
    var insertBulk = [];
    var insertCountryCategoryBulk = [];
    var updateBulk = [];
    var updateCountryCategoryBulk = [];
    var mapCOL = util.getMapCategoryOption(LEVEL_STRING.toLowerCase());
    var mapCCOL = util.getMapCountryCategoryOption(LEVEL_STRING.toLowerCase(), data.HL2_ID);
    data.CATEGORIES.forEach(function (category) {
        category.OPTIONS.forEach(function (option) {
            var categoryOptionLevelId = category.CATEGORY_TYPE_ID == CATEGORY_TYPE.COUNTRY
                ? mapCCOL[category.CATEGORY_ID][option.OPTION_ID]
                : mapCOL[category.CATEGORY_ID][option.OPTION_ID];

            var categoryOption = {
                in_category_option_level_id: categoryOptionLevelId
                , in_amount: Number(option.AMOUNT) || 0
                , in_amount_kpi: Number(option.AMOUNT_KPI) || 0
                , in_user_id: userId
                , in_updated: fromChangeStatusOnDemand && !!Number(option.AMOUNT) ? 1 : (option.UPDATED || 0)
                , in_hl6_id: data.HL6_ID
            };

            if (!option.CATEGORY_OPTION_ID) {
                // categoryOption.in_hl6_id = data.HL6_ID;
                // insertBulk.push(categoryOption);
                if (category.CATEGORY_TYPE_ID == CATEGORY_TYPE.COUNTRY) {
                    insertCountryCategoryBulk.push(categoryOption);
                } else {
                    insertBulk.push(categoryOption);
                }
            } else {
                // updateBulk.push(categoryOption);
                if (category.CATEGORY_TYPE_ID == CATEGORY_TYPE.COUNTRY) {
                    updateCountryCategoryBulk.push(categoryOption);
                } else {
                    updateBulk.push(categoryOption);
                }
            }
        });
    });

    if (updateBulk.length) {
        dataCategoryOptionLevel.updateCategoryOption(updateBulk, LEVEL_STRING.toLowerCase());
    }

    if (insertBulk.length) {
        dataCategoryOptionLevel.insertCategoryOption(insertBulk, LEVEL_STRING.toLowerCase());
    }

    if (updateCountryCategoryBulk.length) {
        dataCategoryOptionLevel.updateCountryCategoryOption(updateCountryCategoryBulk, LEVEL_STRING.toLowerCase());
    }

    if (insertCountryCategoryBulk.length) {
        dataCategoryOptionLevel.insertCountryCategoryOption(insertCountryCategoryBulk, LEVEL_STRING.toLowerCase());
    }

    return true;
}

function insertBudgetDistribution(data, userId) {
    if (data.BUDGET_DISTRIBUTION) {
        var arrHl6Budget = [];
        data.BUDGET_DISTRIBUTION.forEach(function (myBudget) {
            arrHl6Budget.push({
                in_hl6_id: data.HL6_ID
                , in_organization_id: myBudget.ORGANIZATION_ID
                , in_percentage: myBudget.PERCENTAGE || 0
                , in_organization_type: ORGANIZATION_TYPE[myBudget.ORGANIZATION_TYPE]
                , in_created_user_id: userId
            });
        });
        if (arrHl6Budget.length) {
            dataHl6.insertHl6Budget(arrHl6Budget);
        }
    }
}

function updateBudgetDistribution(data, userId) {
    if (data.BUDGET_DISTRIBUTION) {
        dataHl6.delHl6BudgetHard(data.HL6_ID, userId);
        var arrHl6Budget = [];
        data.BUDGET_DISTRIBUTION.forEach(function (myBudget) {
            arrHl6Budget.push({
                in_hl6_id: data.HL6_ID
                , in_organization_id: myBudget.ORGANIZATION_ID
                , in_percentage: myBudget.PERCENTAGE
                , in_organization_type: ORGANIZATION_TYPE[myBudget.ORGANIZATION_TYPE]
                , in_created_user_id: userId
            });
        });
        if (arrHl6Budget.length > 0) {
            dataHl6.insertHl6Budget(arrHl6Budget);
        }
    }
}

function insertInternalCofunding(data, automaticBudgetApproval, userId) {
    var aux = {};
    if (data.SALES && data.SALES.length) {
        var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.SALE_CURRENCY_ID);
        var arrSaleHl6 = [];
        data.SALES.forEach(function (sale) {
            if (!aux[sale.ORGANIZATION_ID]) {
                arrSaleHl6.push({
                    in_hl6_id: data.HL6_ID
                    ,
                    in_organization_id: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] !== 3 ? sale.ORGANIZATION_ID : null
                    ,
                    in_amount: null
                    ,
                    in_organization_type: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE]
                    ,
                    in_description: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3 ? sale.DESCRIPTION == '' ? sale.DESCRIPTION : 'OTHER' : null
                    ,
                    in_currency_id: data.SALE_CURRENCY_ID
                    ,
                    in_created_user_id: userId
                });
                aux[sale.ORGANIZATION_ID] = sale.ORGANIZATION_TYPE;
            }
        });
        if (arrSaleHl6.length) {
            dataHl6.insertHl6Sale(arrSaleHl6);
        }


        if (data.CO_FUNDED && data.SALE_REQUESTS && data.SALE_REQUESTS.length)
            budgetSpendRequest.insertSalesBudgetSpendRequest(data.SALE_REQUESTS, data.HL6_ID, LEVEL_STRING, internalCoFundingCurrency, automaticBudgetApproval, userId);
    }
}

function updateInternalCofunding(data, automaticBudgetApproval, userId) {
    if (data.SALES && data.SALES.length) {
        var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.SALE_CURRENCY_ID);
        var aux = {};
        var arrSaleHl6 = [];
        data.SALES.forEach(function (sale) {
            if (aux[sale.ORGANIZATION_ID]) {
                arrSaleHl6.push({
                    in_hl6_sale_id: sale.HL6_SALE_ID || sale.SALES_ID
                    , in_description: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3 ? sale.DESCRIPTION : null
                    , in_currency_id: data.SALE_CURRENCY_ID
                    , in_user_id: userId
                });
                aux[sale.ORGANIZATION_ID] = sale.ORGANIZATION_TYPE;
            }
        });
        if (arrSaleHl6.length)
            dataHl6.updateHl6Sale(arrSaleHl6);

        data.SALE_REQUESTS.forEach(function (sr) {
            sr.HL_SALES_ID = findHLSalesId(data.SALES, sr.ORGANIZATION_ID, sr.ORGANIZATION_TYPE);
        });

        if (data.SALE_REQUESTS && data.SALE_REQUESTS.length)
            budgetSpendRequest.updateSalesBudgetSpendRequest(data.SALE_REQUESTS, data.HL6_ID, LEVEL_STRING, internalCoFundingCurrency, automaticBudgetApproval, userId);
    }

    if (data.REMOVED_SALES_IDS && data.REMOVED_SALES_IDS.length) {
        var saleBudgetSpendRquestToDelete = data.REMOVED_SALES_IDS.map(function (id) {
            return {in_budget_spend_request_id: id, in_user_id: userId};
        });
        budgetSpendRequest.deleteBudgetSpendRequestBySale(saleBudgetSpendRquestToDelete, LEVEL_STRING);
    }
    return true;
}

function insertExternalCoFunding(data, automaticBudgetApproval, userId) {
    if (data.CO_FUNDED && data.PARTNERS && data.PARTNERS.length) {
        var arrPartner = [];
        var externalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.PARTNER_CURRENCY_ID);
        data.PARTNERS.forEach(function (partner) {
            var budgetSpendRequestId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, data.HL6_ID, LEVEL_STRING, externalCoFundingCurrency, automaticBudgetApproval, userId);
            arrPartner.push({
                in_hl6_id: data.HL6_ID
                ,
                in_partner_name: null
                ,
                in_partner_type_id: partner.PARTNER_TYPE_ID
                ,
                in_region_id: null
                ,
                in_value: null
                ,
                in_created_user_id: userId
                ,
                in_budget_spend_request: budgetSpendRequestId
                ,
                in_currency_id: data.PARTNER_CURRENCY_ID
                ,
                in_intel_project_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.INTEL_PROJECT_ID : null
                ,
                in_claim_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID && partner.CLAIM_ID ? partner.CLAIM_ID : null
                ,
                in_comments: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID && partner.COMMENTS ? partner.COMMENTS : null
                ,
                in_company_name: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.COMPANY_NAME ? partner.COMPANY_NAME : null
                ,
                in_company_address: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.COMPANY_ADDRESS ? partner.COMPANY_ADDRESS : null
                ,
                in_invoice_number: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.INVOICE_NUMBER ? partner.INVOICE_NUMBER : null
            });
        });
        if (arrPartner.length)
            dataPartner.insertHl6Partner(arrPartner);
    }
}

function updateExternalCoFunding(data, automaticBudgetApproval, userId) {
    if (data.PARTNERS && data.PARTNERS.length) {
        var arrPartnerToInsert = [];
        var arrPartnerToUpdate = [];
        var budgetSpendRequestToUpdate = [];
        var externalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.PARTNER_CURRENCY_ID);
        data.PARTNERS.forEach(function (partner) {
            if (!partner.PARTNER_ID) {
                var budgetSpendRequestId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, data.HL6_ID, LEVEL_STRING, externalCoFundingCurrency, automaticBudgetApproval, userId);
                arrPartnerToInsert.push({
                    in_hl6_id: data.HL6_ID
                    ,
                    in_partner_name: null
                    ,
                    in_partner_type_id: partner.PARTNER_TYPE_ID
                    ,
                    in_region_id: null
                    ,
                    in_value: null
                    ,
                    in_created_user_id: userId
                    ,
                    in_budget_spend_request: budgetSpendRequestId
                    ,
                    in_currency_id: data.PARTNER_CURRENCY_ID
                    ,
                    in_intel_project_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.INTEL_PROJECT_ID : null
                    ,
                    in_claim_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID && partner.CLAIM_ID ? partner.CLAIM_ID : null
                    ,
                    in_comments: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID && partner.COMMENTS ? partner.COMMENTS : null
                    ,
                    in_company_name: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.COMPANY_NAME ? partner.COMPANY_NAME : null
                    ,
                    in_company_address: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.COMPANY_ADDRESS ? partner.COMPANY_ADDRESS : null
                    ,
                    in_invoice_number: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.INVOICE_NUMBER ? partner.INVOICE_NUMBER : null
                });
                partner.BUDGET_SPEND_REQUEST_ID = budgetSpendRequestId;
            } else {
                budgetSpendRequestToUpdate.push({
                    in_budget_spend_request_id: partner.BUDGET_SPEND_REQUEST_ID
                    , in_amount: partner.AMOUNT / externalCoFundingCurrency
                    , in_message: partner.MESSAGE
                    , in_user_id: userId
                });

                arrPartnerToUpdate.push({
                    in_partner_id: partner.PARTNER_ID
                    ,
                    in_partner_name: null
                    ,
                    in_partner_type_id: partner.PARTNER_TYPE_ID
                    ,
                    in_region_id: null
                    ,
                    in_value: null
                    ,
                    in_currency_id: data.PARTNER_CURRENCY_ID
                    ,
                    in_created_user_id: userId
                    ,
                    in_intel_project_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.INTEL_PROJECT_ID : null
                    ,
                    in_claim_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID && partner.CLAIM_ID ? partner.CLAIM_ID : null
                    ,
                    in_comments: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID && partner.COMMENTS ? partner.COMMENTS : null
                    ,
                    in_company_name: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.COMPANY_NAME ? partner.COMPANY_NAME : null
                    ,
                    in_company_address: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.COMPANY_ADDRESS ? partner.COMPANY_ADDRESS : null
                    ,
                    in_invoice_number: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.INVOICE_NUMBER ? partner.INVOICE_NUMBER : null
                });
            }
            if (partner.ATTACHMENTS && partner.BUDGET_SPEND_REQUEST_ID) {
                partner.ATTACHMENTS = partner.attachments || partner.ATTACHMENTS;
                partnerLib.updateAttachmentPartner(partner, LEVEL_STRING, userId);
            }
        });

        if (arrPartnerToInsert.length) {
            dataPartner.insertHl6Partner(arrPartnerToInsert);
        }

        if (arrPartnerToUpdate.length) {
            dataPartner.updatePartner(arrPartnerToUpdate, LEVEL_STRING);
        }
        if (budgetSpendRequestToUpdate.length)
            budgetSpendRequest.updatePartnerBudgetSpendRequest(budgetSpendRequestToUpdate, data.HL6_ID, LEVEL_STRING, automaticBudgetApproval, userId);
    }

    if (data.REMOVED_PARTNER_IDS && data.REMOVED_PARTNER_IDS.length) {
        var arrBudgetSpendRequestToDelete = [];
        var arrPartnerToDelete = data.REMOVED_PARTNER_IDS.map(function (id) {
            return {in_partner_id: id, in_user_id: userId};
        });


        var pendingPartner = dataPartner.getPendingPartnerByPartnerId(arrPartnerToDelete, "HL5");
        arrPartnerToDelete = [];
        pendingPartner.forEach(function (elem) {
            arrPartnerToDelete.push({in_partner_id: elem.IN_PARTNER_ID, in_user_id: userId});
            arrBudgetSpendRequestToDelete.push({
                in_budget_spend_request_id: elem.IN_BUDGET_SPEND_REQUEST_ID,
                in_user_id: userId
            });
        });
        if (arrPartnerToDelete && arrPartnerToDelete.length) {
            dataPartner.deleteHlPartnerByPartnerId(arrPartnerToDelete, LEVEL_STRING);
            budgetSpendRequest.deleteBudgetSpendRequest(arrBudgetSpendRequestToDelete);
        }
    }
    return true;
}

function validateKpi(data) {
    if (data.TARGET_KPIS && !Number(data.FORECAST_AT_L5)) {
        if (!data.TARGET_KPIS.KPIS.length && !data.TARGET_KPIS.COMMENTS)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CAMPAIGN_FORECASTING_KPIS_COMMENT);

        data.TARGET_KPIS.KPIS.forEach(function (hl6ExpectedOutcomesDetail) {
            if (hl6ExpectedOutcomesDetail.VOLUME_VALUE != 0 && !Number(hl6ExpectedOutcomesDetail.VOLUME_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CAMPAIGN_FORECASTING_KPIS_DETAILS);
            if (!hl6ExpectedOutcomesDetail.EURO_VALUE || !Number(hl6ExpectedOutcomesDetail.EURO_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO);
            if (!hl6ExpectedOutcomesDetail.OUTCOMES_ID || !Number(hl6ExpectedOutcomesDetail.OUTCOMES_ID))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CAMPAIGN_FORECASTING_KPIS_NOT_VALID);
        });
    }
    return true;
}

function validateSales(data) {
    if (data.SALES && data.SALES.length) {
        data.SALES.forEach(function (sale) {
            if (ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3) {
                if (sale.DESCRIPTION != '' && !sale.DESCRIPTION)
                    throw ErrorLib.getErrors().CustomError("", "", levelCampaign + " Sales description can not be found.");
            } else {
                if (!sale.ORGANIZATION_ID || !Number(sale.ORGANIZATION_ID))
                    throw ErrorLib.getErrors().CustomError("", "", levelCampaign + " Sales " + key + " can not be found.");
            }
        });
    }
}

function validateBudgetDistribution(data) {
    if (!data.BUDGET_DISTRIBUTION)
        throw ErrorLib.getErrors().CustomError("", "", L6_MSG_INITIATIVE_MY_BUDGET);

    return isMyBudgetComplete(data.BUDGET_DISTRIBUTION);
}

function validateCategoryOption(data) {
    if (!data.CATEGORIES)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_NOT_EMPTY);

    if (!data.HL6_ID && data.CATEGORIES.length !== dataCategory.getAllocationCategoryCountByHlId(LEVEL_STRING.toLowerCase()))
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_INCORRECT_NUMBER);

    return isCategoryOptionComplete(data);
}

function insertExpectedOutcomes(data, userId) {
    var hl6ExpectedOutcomesId = dataExOut.insertHl6ExpectedOutcomes(data.HL6_ID, data.TARGET_KPIS.COMMENTS || '', userId);
    var mapEOL = expectedOutcomesLevelLib.getKpiTypeOptionMapByHlId(HIERARCHY_LEVEL.HL6);
    if (data.TARGET_KPIS.KPIS.length) {
        var hl6ExpectedOutcomesDetail = [];
        data.TARGET_KPIS.KPIS.forEach(function (expectedOutcomeDetail) {
            hl6ExpectedOutcomesDetail.push({
                in_hl6_expected_outcomes_id: hl6ExpectedOutcomesId,
                in_outcomes_id: mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID][expectedOutcomeDetail.OUTCOMES_ID],
                in_euro_value: expectedOutcomeDetail.EURO_VALUE,
                in_volume_value: Number(expectedOutcomeDetail.VOLUME_VALUE),
                in_created_user_id: userId
            });
        });

        dataExOut.insertHl6ExpectedOutcomesDetail(hl6ExpectedOutcomesDetail);
    }
}

function updateExpectedOutcomes(data, userId) {
    dataExOut.deleteHl6ExpectedOutcomesDetail(data.HL6_ID, userId);
    dataExOut.deleteHl6ExpectedOutcomes(data.HL6_ID, userId);
    if (!data.FORECAST_AT_L5) {
        insertExpectedOutcomes(data, userId);
    }
}

function getInternalCofunding(hl6Id) {
    var sale = JSON.parse(JSON.stringify(dataHl6.getHl6SalesByHl6Id(hl6Id)));
    var saleRequests = budgetSpendRequest.getHlSalesByHlId(hl6Id, LEVEL_STRING);
    var saleCurrencyValue = (Number(sale[0].CURRENCY_VALUE || 1)).toFixed(2);

    var saleRequestsFiltered = saleRequests.filter(function (request) {
        return !!Number(request.AMOUNT);
    });

    var totalAmount = 0;
    sale.forEach(function (elem) {
        var amount = (Number(elem.AMOUNT)).toFixed(2);
        elem.AMOUNT = amount;
        totalAmount += Number(amount);
    });
    return {
        SALE: sale,
        SALE_TOTAL: (Number(totalAmount)).toFixed(2),
        SALE_TOTAL_EUROS: (Number(totalAmount) / saleCurrencyValue).toFixed(2),
        SALE_CURRENCY_ID: Number(sale[0].CURRENCY_ID) || 0,
        SALE_REQUESTS: saleRequestsFiltered,
        SALE_CURRENCY_VALUE: saleCurrencyValue
    };
}

function getExternalCofunding(hl6Id) {
    var partner = partnerLib.getPartnerByHl6Id(hl6Id);
    var partnerCurrencyValue = (Number(partner.partnerCurrencyValue || 1)).toFixed(2);
    return {
        PARTNERS: partner.partners,
        PARTNER_INTEL_TOTAL: (Number(partner.total) || 0).toFixed(2),
        PARTNER_INTEL_TOTAL_EUROS: ((Number(partner.total) || 0) / partnerCurrencyValue).toFixed(2),
        PARTNER_CURRENCY_ID: partner.partnerCurrencyId,
        PARTNER_CURRENCY_VALUE: partnerCurrencyValue,
        PARTNER_EXTERNAL_TOTAL: (Number(partner.totalExternal)).toFixed(2),
        PARTNER_EXTERNAL_TOTAL_EUROS: (Number(partner.totalExternal) / partnerCurrencyValue).toFixed(2)
    };
}

function getCategoryOption(hl6Id) {
    return allocationCategoryOptionLevelLib.getHlCategoryOptionByLevelHlId(LEVEL_STRING, hl6Id);
}

function getCategoryOptionVersioned(hl6Id) {
    return allocationCategoryOptionLevelLib.getHlCategoryOptionVersionedByLevelHlId(LEVEL_STRING, hl6Id);
}

function getCarryOverHl5CategoryOption(hl5_id, hl4_id) {
    var hl5_category = JSON.parse(JSON.stringify(level5Lib.getCategoryOption(hl5_id)));
    var hl6_category = JSON.parse(JSON.stringify(allocationCategory.getCategoryOptionByHierarchyLevelId(HIERARCHY_LEVEL.HL6, hl4_id)));

    return hl6_category.map(function (category) {
        var hl5Cat = extractElementByList(hl5_category, "CATEGORY_ID", category.CATEGORY_ID);
        if (hl5Cat) {
            category.OPTIONS.map(function (option) {
                var hl5option = extractElementByList(hl5Cat.OPTIONS, "OPTION_ID", option.OPTION_ID);
                option.AMOUNT = hl5option ? hl5option.AMOUNT : 0;
                option.AMOUNT_KPI = hl5option ? hl5option.AMOUNT_KPI : 0;
                return option;
            });
        }
        return category;
    });
}

function uiToServerParser(object, isClone) {
    var data = JSON.stringify(object, function (key, value) {
        if (Array.isArray(value)) {
            return value;
        } else if (value && typeof value === 'object') {
            var replacement = {};
            Object.keys(value).forEach(function (k) {
                replacement[map[k] || k] = value[k];
                if (k === "REGION_ID") {
                    if (value.in_partner_name) {
                        replacement.REGION_ID = value[k];
                    } else {
                        replacement.ORGANIZATION_TYPE = "REGIONAL";
                    }
                } else if (k === "HL2_ID") {
                    replacement.ORGANIZATION_TYPE = "CENTRAL";
                } else if (k === "DESCRIPTION") {
                    replacement.ORGANIZATION_TYPE = "OTHER";
                }
            });
            return replacement;
        }
        return value;
    });

    data = JSON.parse(data);

    data.BUDGET_DISTRIBUTION = data.BUDGET_DISTRIBUTION.REGIONS.concat(data.BUDGET_DISTRIBUTION.CENTRAL_TEAMS);
    data.SALES = data.SALES.REGIONS.concat(data.SALES.CENTRAL_TEAMS.concat(data.SALES.OTHERS));

    if (!isClone) {
        data.ACTUAL_START_DATE = data.ACTUAL_START_DATE_STRING;
        data.ACTUAL_END_DATE = data.ACTUAL_END_DATE_STRING;
        data.PLANNED_START_DATE = data.PLANNED_START_DATE_STRING;
        data.PLANNED_END_DATE = data.PLANNED_END_DATE_STRING;
    }

    return data;
}

function serverToUiParser(object) {
    var SALE = {
        REGIONS: [],
        CENTRAL_TEAMS: [],
        OTHERS: []
    };
    var BUDGET_DISTRIBUTION = {
        REGIONS: [],
        CENTRAL_TEAMS: []
    };
    if (object.BUDGET_DISTRIBUTION) {
        object.BUDGET_DISTRIBUTION.forEach(function (obj) {
            var aux = {};
            if (obj.ORGANIZATION_TYPE === 1) {
                aux.REGION_ID = obj.ORGANIZATION_ID;
                aux.PERCENTAGE = obj.PERCENTAGE;
                aux.REGION_NAME = obj.ORGANIZATION_NAME;
                BUDGET_DISTRIBUTION.REGIONS.push(aux);
            } else {
                aux.HL2_ID = obj.ORGANIZATION_ID;
                aux.PERCENTAGE = obj.PERCENTAGE;
                aux.ORGANIZATION_ACRONYM = obj.ORGANIZATION_NAME;
                BUDGET_DISTRIBUTION.CENTRAL_TEAMS.push(aux);
            }
        });
    }
    if (object.SALES) {
        object.SALES.forEach(function (obj) {
            var aux = {};
            aux.SALES_ID = obj.HL6_SALES_ID;
            if (obj.ORGANIZATION_TYPE === 1) {
                aux.REGION_ID = obj.ORGANIZATION_ID;
                aux.AMOUNT = obj.AMOUNT;
                aux.REGION_NAME = obj.ORGANIZATION_NAME;
                SALE.REGIONS.push(aux);
            } else if (obj.ORGANIZATION_TYPE === 2) {
                aux.HL2_ID = obj.ORGANIZATION_ID;
                aux.AMOUNT = obj.AMOUNT;
                aux.ORGANIZATION_ACRONYM = obj.ORGANIZATION_NAME;
                SALE.CENTRAL_TEAMS.push(aux);
            } else {
                aux.DESCRIPTION = obj.DESCRIPTION;
                aux.AMOUNT = obj.AMOUNT;
                SALE.OTHERS.push(aux);
            }
            aux.MESSAGE = obj.MESSAGE;
        });
    }
    if (object.SALE_REQUESTS) {
        object.SALE_REQUESTS.forEach(function (obj) {
            var attribute = obj.ORGANIZATION_TYPE == ORGANIZATION_TYPE.REGIONAL ? 'REGION_ID'
                : obj.ORGANIZATION_TYPE == ORGANIZATION_TYPE.CENTRAL ? 'HL2_ID'
                    : 'ORGANIZATION_ID';
            if (attribute != 'ORGANIZATION_ID') {
                obj[attribute] = obj.ORGANIZATION_ID;
            }
            // obj.ORGANIZATION_ID = undefined;
        });
    }
    if (object.PARTNERS) {
        object.PARTNERS.forEach(function (obj) {
            obj.MESSAGE = obj.DESCRIPTION;
            obj.DESCRIPTION = undefined;
        });
    }
    object.SALES = SALE;
    object.BUDGET_DISTRIBUTION = BUDGET_DISTRIBUTION;
    object.CRM_DESCRIPTION = object.HL6_CRM_DESCRIPTION;
    //object.HL6_CRM_DESCRIPTION = undefined;
    object.CO_FUNDED = !!object.CO_FUNDED;
    object.ALLOW_BUDGET_ZERO = !!object.ALLOW_BUDGET_ZERO;
    object.IS_POWER_USER = !!object.IS_POWER_USER;

    return object;
}

function clone(cloneHl6Id, userId) {
    var data = getHl6ById(cloneHl6Id);
    var isLegacy = !Number(data.HL5_ID);

    var hl5 = isLegacy ? dataHl5.getHl5LegacyById(data.HL5_LEGACY_ID) : dataHl5.getHl5ById(data.HL5_ID);
    var hl5Id = data.HL5_ID || data.HL5_LEGACY_ID;
    var l4Id = data.HL4_ID || hl5.HL4_ID;

    var currencyId = uploadLib.getDefaultCurrencyForBudgetYearByPath(data);
    data = uiToServerParser(data, true);
    data.STATUS_DETAIL_ID = HL6_STATUS.IN_PROGRESS;
    var acronym = getNewHl6Id(hl5Id, isLegacy);
    data.CREATED_USER_ID = userId;
    data.CRM_DESCRIPTION = L6_COPY_CRM_DESCRIPTION;
    data.BUDGET = 0;
    data.ALLOW_BUDGET_ZERO = 0;
    data.CO_FUNDED = 0;
    data.IS_COMPLETE = 0;
    data.IMPORTED = 0;
    data.IMPORT_ID = null;
    data.SALE_REQUESTS = null;
    data.EURO_CONVERSION_ID = currencyId;
    data.SALE_CURRENCY_ID = currencyId;
    data.INHERITED_CREATION = 1;
    var hl6_id = insertData(data, acronym);
    if (isLegacy) {
        dataHl6.insertHl6Legacy(hl6_id, hl5Id);
    }
    pathBL.insParentPath(LEVEL_STRING.toLowerCase(), hl6_id, hl5Id, userId, hl5.PATH);
    data.HL6_ID = hl6_id;
    data.HL2_ID = dataHl2.getHl2ByHl4Id(l4Id).HL2_ID;
    insertExpectedOutcomes(data, userId);
    insertBudgetDistribution(data, userId, true);
    insertInternalCofunding(data, null, userId);
    insertCategoryOption(data, userId);
    var CRM_ID = isLegacy ? hl5.PATH + ('' + acronym).toUpperCase() : dataPath.getPathByLevelHlId(LEVEL_STRING.toLowerCase(), hl6_id);
    return {CRM_ID: CRM_ID};
}

function insertData(data, validAcronym) {
    return dataHl6.insertHl6(
        data.CRM_DESCRIPTION || 'N/D'
        , validAcronym
        , data.BUDGET
        , data.HL5_ID || null
        , data.ROUTE_TO_MARKET_ID || null
        , data.CAMPAIGN_OBJECTIVE_ID || 0
        , data.CAMPAIGN_TYPE_ID || 0
        , data.CAMPAIGN_SUBTYPE_ID || 0
        , data.MARKETING_PROGRAM_ID || 0
        , data.MARKETING_ACTIVITY_ID || 0
        , data.ACTUAL_START_DATE || null
        , data.ACTUAL_END_DATE || null
        , data.SHOW_ON_DG_CALENDAR ? 1 : 0
        , data.BUSINESS_OWNER_ID || 0
        , data.EMPLOYEE_RESPONSIBLE_ID || 0
        , data.COST_CENTER_ID || 0
        , data.IN_BUDGET
        , data.BUDGET_SPEND_Q1 || 0
        , data.BUDGET_SPEND_Q2 || 0
        , data.BUDGET_SPEND_Q3 || 0
        , data.BUDGET_SPEND_Q4 || 0
        , data.EURO_CONVERSION_ID
        , data.STATUS_DETAIL_ID
        , data.SALES_ORGANIZATION_ID || null
        , data.CREATED_USER_ID
        , data.DISTRIBUTION_CHANNEL_ID || 0
        , data.VENUE
        , data.CITY
        , data.COUNTRY_ID || null
        , data.URL
        , data.RESULTS_CAMPAIGN_Q1 || 0
        , data.RESULTS_CAMPAIGN_Q2 || 0
        , data.RESULTS_CAMPAIGN_Q3 || 0
        , data.RESULTS_CAMPAIGN_Q4 || 0
        , data.PLANNED_START_DATE || null
        , data.PLANNED_END_DATE || null
        , data.STREET
        , data.POSTAL_CODE
        , data.REGION
        , data.EVENT_OWNER
        , data.NUMBER_OF_PARTICIPANTS
        , data.PRIORITY_ID || 0
        , Number(data.CO_FUNDED)
        , Number(data.ALLOW_BUDGET_ZERO)
        , Number(data.IS_POWER_USER)
        , data.EMPLOYEE_RESPONSIBLE_USER
        , data.PERSON_RESPONSIBLE
        , data.IS_COMPLETE
        , 1 //AUTOCOMMIT
        , data.IMPORTED
        , data.IMPORT_ID
        , data.INHERITED_CREATION || 0
        , data.PARENT_PATH
    );
}

function getActionPermission(hl6, userId, isSuperAdmin) {
    var HL4_STATUS = level4Lib.getStatusEnum();
    var HL5_STATUS = level5Lib.getStatusEnum();

    var enableDeletion = Number(hl6.STATUS_ID || hl6.STATUS_DETAIL_ID) !== HL6_STATUS.CREATE_IN_CRM
        && Number(hl6.STATUS_ID || hl6.STATUS_DETAIL_ID) !== HL6_STATUS.UPDATE_IN_CRM
        && Number(hl6.STATUS_ID || hl6.STATUS_DETAIL_ID) !== HL6_STATUS.DELETION_REQUEST
        && Number(hl6.STATUS_ID || hl6.STATUS_DETAIL_ID) !== HL6_STATUS.DELETED_IN_CRM;

    var enableChangeStatus = Number(hl6.STATUS_ID || hl6.STATUS_DETAIL_ID) !== HL6_STATUS.IN_CRM
        && Number(hl6.STATUS_ID || hl6.STATUS_DETAIL_ID) !== HL6_STATUS.CREATE_IN_CRM
        && Number(hl6.STATUS_ID || hl6.STATUS_DETAIL_ID) !== HL6_STATUS.UPDATE_IN_CRM
        && Number(hl6.STATUS_ID || hl6.STATUS_DETAIL_ID) !== HL6_STATUS.DELETION_REQUEST
        && Number(hl6.STATUS_ID || hl6.STATUS_DETAIL_ID) !== HL6_STATUS.DELETED_IN_CRM
        && Number(hl6.PARENT_STATUS_ID) !== HL5_STATUS.DELETED_IN_CRM
        && Number(hl6.GRAN_PARENT_STATUS_ID) !== HL4_STATUS.DELETED_IN_CRM;

    var enableEdition = util.getEnableEdit(hl6.STATUS_ID || hl6.STATUS_DETAIL_ID, HL6_STATUS, userId, isSuperAdmin, hl6.PARENT_STATUS_ID, hl6.GRAN_PARENT_STATUS_ID);

    var enableClone = Number(hl6.STATUS_ID || hl6.STATUS_DETAIL_ID) !== HL6_STATUS.DELETED_IN_CRM
        && Number(hl6.PARENT_STATUS_ID) !== HL5_STATUS.DELETED_IN_CRM
        && Number(hl6.GRAN_PARENT_STATUS_ID) !== HL4_STATUS.DELETED_IN_CRM;

    var result = {};

    result.ENABLE_DELETION = enableDeletion;
    result.ENABLE_CHANGE_STATUS = enableChangeStatus;
    result.ENABLE_EDIT = enableEdition;
    result.ENABLE_CLONE = enableClone;

    return result
}

function insertInCrmVersion(hl6Id) {
    // Save the version of HL6 IN_CRM o UPDATE_IN_CRM to compare later
    var hl6VersionedId = dataHl6.insertHl6VersionInCRM(hl6Id);
    // Save the version of CategoryOptions IN_CRM o UPDATE_IN_CRM to compare later
    dataCategoryOptionLevel.insertCategoryOptionVersioned("HL6", hl6Id, hl6VersionedId);
    // Save the version of Country-CategoryOptions IN_CRM o UPDATE_IN_CRM to compare later
    return dataCategoryOptionLevel.insertCountryCategoryOptionVersioned("HL6", hl6Id, hl6VersionedId);
}