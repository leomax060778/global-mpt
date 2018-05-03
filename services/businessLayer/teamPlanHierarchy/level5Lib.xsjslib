/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataL5DER = mapper.getDataLevel5Report();
var dataHl2 = mapper.getDataLevel2();
var dataHl3 = mapper.getDataLevel3();
var dataHl4 = mapper.getDataLevel4();

var dataCampaignType = mapper.getDataCampaignType();
var dataHl5 = mapper.getDataLevel5();
var dataCostCenter = mapper.getDataCostCenter();
var dataExOut = mapper.getDataExpectedOutcome();
var dataPartner = mapper.getDataPartner();
var partnerLib = mapper.getPartner();
var dataCurrency = mapper.getDataCurrency();
var dataCategory = mapper.getDataCategory();
var dataOption = mapper.getDataOption();
var expectedOutcomesLib = mapper.getExpectedOutcomes();
var level5DER = mapper.getLevel5DEReport();
var dataL5Report = mapper.getDataLevel5Report();
var db = mapper.getdbHelper();
var dbUserRole = mapper.getDataUserRole();
var dbUser = mapper.getDataUser();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var userBL = mapper.getUser();
var mail = mapper.getMail();
var businessError = mapper.getLogError();
var pathBL = mapper.getPath();
var config = mapper.getDataConfig();
var dataBudgetYear = mapper.getDataBudgetYear();
var level4Lib = mapper.getLevel4();
var level6Lib = mapper.getLevel6();
var blLevel2 = mapper.getLevel2();
var blRegion = mapper.getRegion();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var dataPath = mapper.getDataPath();
var budgetYear = mapper.getBudgetYear();
var budgetSpendRequest = mapper.getBudgetSpendRequest();
var budgetSpendRequestReportLib = mapper.getBudgetSpendReportLib();
var databudgetSpendRequest = mapper.getDataBudgetSpendRequest();
var dataServiceRequest = mapper.getDataServiceRequest();
var AllocationOptionLib = mapper.getAllocationOptionLib();
var blSegmentation = mapper.getSegmentation();
var expectedOutcomesLevelLib = mapper.getExpectedOutcomesLevelLib();
var allocationCategoryOptionLevelLib = mapper.getAllocationCategoryOptionLevelLib();
var dataRTM = mapper.getDataRouteToMarket();
var dataCST = mapper.getDataCampaignSubType();
var dataCT = mapper.getDataCampaignType();
var dataObj = mapper.getDataObjectives();
var dataMO = mapper.getDataMarketingOrganization();
var uploadLib = mapper.getUploadLib();
var allocationCategory = mapper.getAllocationCategoryLib();
var dataUtil = mapper.getDataUtil();
var dataHierarchyCategoryCountry = mapper.getDataHierarchyCategoryCountry();
/*************************************************/

var levelCampaign = "Marketing Tactic ";
var L5_MSG_INITIATIVE_NOT_FOUND = "The Marketing Tactic ID can not be found.";
var L5_MSG_USER_NOT_FOUND = "The User can not be found.";
var L5_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L5_MSG_CANNOT_DEL_STATUS = "Cannot delete this selected Marketing Tactic, because the status doesn´t allow it.";
var L5_MSG_CANNOT_GET_BY_ID = "Cannot get this selected Marketing Tactic because the status doesn´t allow it.";
var L5_MSG_INITIATIVE_CANT_DEL_CHILD = "The selected Marketing Tactic can not be deleted because has childs.";
var L5_MSG_INITIATIVE_IN_CRM = "Cannot modified CRM ID if already exists in CRM.";
var L5_MSG_INITIATIVE_EXISTS = "Another Marketing Tactic with the same acronym already exists.";
var L5_MSG_INITIATIVE_ACRONYM = "CRM ID must be 7 characters in length, including uppercase letters [A - Z], numbers [0-9] and special character [_].";
var L5_MSG_INITIATIVE_CRM_DESCRIPTION = "The Marketing Tactic CRM description can not be null or empty.";
var L5_MSG_INITIATIVE_DISTRIBUTION_CHANNEL = "The Marketing Tactic Distribution channel can not be null or empty.";
var L5_MSG_INITIATIVE_BUDGET_VALUE = "The Marketing Tactic Budget value must be greater than zero.";
var L5_MSG_INITIATIVE_BUDGET_VALUE_zero = "The Marketing Tactic Budget value must be zero.";
var L5_MSG_INITIATIVE_CURRENCY = "The Marketing Tactic Currency can not be found.";
var L5_MSG_INITIATIVE_BUDGET_SPEND = "The Marketing Tactic Budget spend must be set.";
var L5_MSG_INITIATIVE_BUDGET_SPEND_PERCENT = "The Marketing Tactic Budget Spend must be 100%.";
var L5_MSG_INITIATIVE_MY_BUDGET = " The Marketing Tactic in My Budget can not be found.";
var L5_MSG_INITIATIVE_BUDGET_PERCENT = "The Marketing Tactic in My Budget percentage should be less than or equal to 100%.";
var L5_CAMPAIGN_FORECASTING_KPIS_COMMENT = "Please enter a comment to explain expected outcomes as you didn't select any KPI type.";
var L5_CAMPAIGN_FORECASTING_KPIS_DETAILS = "Campaign Forecasting / KPIS details amount value is not valid.";
var L5_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO = "Campaign Forecasting / KPIS details euro value is not valid.";
var L5_CAMPAIGN_FORECASTING_KPIS_NOT_VALID = "Campaign Forecasting / KPIS is not valid.";
var L5_CAMPAIGN_FORECASTING_KPIS_VOLUME = "Campaign Forecasting / KPIS volume must be equal or lower than available volume.";
var L5_CAMPAIGN_FORECASTING_KPIS_VALUE = "Campaign Forecasting / KPIS value must be equal or lower than available value.";
var L5_PARTNER_TYPE_NOT_VALID = "Partner type is not valid.";
var L5_PARTNER_AMOUNT_NOT_VALID = "Partner amount is not valid.";
var L5_PARTNER_INCOMPLETE_INTEL = "Intel Project ID, Claim ID and Comments must be filled in.";
var L5_PARTNER_INCOMPLETE_EXTERNAL_PARTNER = "Company Name and Company Address must be filled in.";
var L5_CATEGORY_NOT_EMPTY = "Category cannot be empty.";
var L5_CATEGORY_INCORRECT_NUMBER = "Incorrect number of categories.";
var L5_CATEGORY_NOT_VALID = "Category is not valid.";
var L5_CATEGORY_OPTIONS_INCORRECT_NUMBER = "Incorrect number of options.";
var L5_CATEGORY_OPTION_NOT_VALID = "Option is not valid.";
var L5_CATEGORY_TOTAL_PERCENTAGE = "Category total percentage should be less than or equal to 100%.";
var L5_MSG_INITIATIVE_HAS_LEVEL_6 = "The selected 'Marketing Tactic' can not be deleted because has childs.";
var L5_MSG_INITIATIVE_ACTUAL_START_DATE = "The 'Marketing Tactic' actual start date cannot be found.";
var L5_MSG_INITIATIVE_ACTUAL_END_DATE = "The 'Marketing Tactic' actual end date cannot be found.";
var L5_MSG_INITIATIVE_INVALID_DATE_RANGE = "The Actual End Date must be greater than Actual Start Date";
var L5_MSG_COULDNT_CHANGE_STATUS = "Your records was saved as \"In progress\". Please review your record for incomplete fields and/or pending budget approvals.";
var L5_MSG_COULDNT_CHANGE_STATUS_DUE_PENDING_BUDGET_SPEND_REQUEST = "Your records was saved as \"In progress\". Please review your record for incomplete fields and/or pending budget approvals.";
var L5_MSG_COULDNT_CHANGE_STATUS_DUE_OWN_MONEY_BUDGET_SPEND_REQUEST_STATUS = "Your records was saved as \"In progress\". Please review your record for Own Money Budget Request approval.";
var L5_MSG_INITIATIVE_PROPERTIES_CANNOT_UPDATE = "Once Marketing Tactic is already in CRM, the CRM ID cannot be modified.";
var L5_MY_BUDGET_COMPLETE = "My Budget should be 100% complete.";
var L5_COST_CENTER_NOT_VALID = "Cost Center cannot be empty.";
var L5_RESPONSIBLE_NOT_VALID = "Employee Responsible cannot be empty.";
var L5_PRIORITY_NOT_VALID = "Priority cannot be empty.";
var L5_BUSINESS_OWNER_NOT_VALID = "Business Owner cannot be empty.";
var L5_MSG_INITIATIVE_CRM_ACRONYM = "The Acronym has been used. The new Serial Acronym is: ";
var L5_MSG_INITIATIVE_ROUTE_TO_MARKET = "The Marketing Tactic route to market cannot be found.";
var L5_MSG_INITIATIVE_CAMPAIGN_OBJECTIVE = "The Marketing Tactic campaign objective cannot be found.";
var L5_MSG_INITIATIVE_CAMPAIGN_TYPE = "The Marketing Tactic campaign type cannot be found.";
var L5_MSG_INITIATIVE_CAMPAIGN_SUBTYPE = "The Marketing Tactic campaign subtype cannot be found.";
var L5_MSG_INITIATIVE_SALES_ORGANIZATION = "The Marketing Tactic marketing organization cannot be found.";
var L5_MSG_REQUIRE_SPEND_BUDGET_VALIDATION = "You have answered “YES” to the question “Does this tactic/sub-tactic require spend budget?”. \n " +
    "You must enter a value greater than 0 under “MY BUDGET”,  “OTHER BUDGET” or “EXTERNAL FUNDING”.  \n" +
    "If you do not require spend budget for your tactic/sub-tactic, please change your selection to “NO”.";
var L5_MSG_MISSING_DATA = "File is empty.";
var L5_MSG_COULDNT_CHANGE_STATUS_INVALID_CRM_DESCRIPTION = "CRM description must be modified before sending this Marketing Tactic to Processing Report.";

var HL5_STATUS = {
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

var DRAFT_PEFIX = 'DRAFT';

var CATEGORY_TYPE = allocationCategory.getCategoryType();

var LEVEL_STRING = 'HL5';

var L5_COPY_CRM_DESCRIPTION = util.getCopyCrmDescription();

var L5_CREATED_FROM_EVENT_REQUEST_CRM_DESCRIPTION = util.getEventRequestCrmDescription();

var map = {
    "REGION_ID": "ORGANIZATION_ID",
    "HL2_ID": "ORGANIZATION_ID",
    "PERCENTAGE": "PERCENTAGE",
    "HL5_STATUS_DETAIL_ID": "STATUS_DETAIL_ID"
};

function getHl5ByHl4Id(id, userId, includeLegacy) {
    level4Lib.getImplementExecutionLevel(id);
    var isSuperAdmin = util.isSuperAdmin(userId) ? 1 : 0;
    var hl5List = dataHl5.getHl5ByHl4Id(id, Number(!!includeLegacy));
    var hl5TotalBudget = 0;
    var totalAllocated = 0;
    var hl5BudgetRemaining = 0;
    var allHl5 = [];
    if (hl5List.length) {
        hl5List = JSON.parse(JSON.stringify(hl5List));
        hl5List.forEach(function (hl5) {
            var actionPermission = hl5.IS_LEGACY ? {} : getActionPermission(hl5, userId, isSuperAdmin);

            hl5.ENABLE_DELETION = !!actionPermission.ENABLE_DELETION;
            hl5.ENABLE_CHANGE_STATUS = !!actionPermission.ENABLE_CHANGE_STATUS;
            hl5.ENABLE_EDIT = !!actionPermission.ENABLE_EDIT;
            hl5.ENABLE_CLONE = !!actionPermission.ENABLE_CLONE;
        });

        hl5TotalBudget = dataHl4.getHl4ById(id).HL4_FNC_BUDGET_TOTAL_MKT;
        totalAllocated = dataHl5.getHl5TotalBudgetByHl4Id(id);
        hl5BudgetRemaining = hl5TotalBudget - totalAllocated;
    }

    var response = {
        "results": hl5List,
        "total_budget": hl5TotalBudget,
        "remaining_budget": hl5BudgetRemaining,
        "total_allocated": totalAllocated,
        "ENABLE_CREATION": level4Lib.addChildPermission(id)
    };
    response.budget_year = budgetYear.getBudgetYearByLevelParent(5, id, true);
    return response;
}

function getHl5ById(hl5Id, carryOver) {
    if (!hl5Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "hl5Services/handleGet/getHl5ById", L5_MSG_INITIATIVE_NOT_FOUND);

    var hl5 = JSON.parse(JSON.stringify(dataHl5.getHl5ById(hl5Id)));

    if (hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.DELETED_IN_CRM) {
        throw ErrorLib.getErrors().BadRequest("", "", L5_MSG_CANNOT_GET_BY_ID);
    }

    hl5.TARGET_KPIS = !hl5.FORECAST_AT_L5 ? expectedOutcomesLib.getAggregatedKPIByHl5Id(hl5Id) : expectedOutcomesLib.getExpectedOutcomesByHl5Id(hl5Id, hl5.HL4_ID);
    hl5.FORECAST_AT_L5 = !!Number(hl5.FORECAST_AT_L5);
    if (!carryOver) {
        var internalCofunding = getInternalCofunding(hl5Id);
        var externalCofunding = getExternalCofunding(hl5Id);
        hl5.BUDGET_EUROS = (Number(hl5.BUDGET)).toFixed(2);
        hl5.BUDGET_CURRENCY = {
            ID: hl5.EURO_CONVERSION_ID,
            VALUE: Number(hl5.CURRENCY_VALUE).toFixed(2),
            ABBREVIATION: hl5.CURRENCY_ABBREVIATION
        };
        hl5.PARTNERS = externalCofunding.PARTNERS;
        hl5.INTEL_TOTAL_BUDGET = externalCofunding.PARTNER_INTEL_TOTAL;
        hl5.INTEL_TOTAL_BUDGET_EUROS = externalCofunding.PARTNER_INTEL_TOTAL_EUROS;
        hl5.PARTNER_CURRENCY = {
            ID: externalCofunding.PARTNER_CURRENCY_ID,
            VALUE: externalCofunding.PARTNER_CURRENCY_VALUE
        };
        hl5.EXTERNAL_TOTAL_BUDGET = externalCofunding.PARTNER_EXTERNAL_TOTAL;
        hl5.EXTERNAL_TOTAL_BUDGET_EUROS = externalCofunding.PARTNER_EXTERNAL_TOTAL_EUROS;

        hl5.BUDGET_DISTRIBUTION = dataHl5.getHl5MyBudgetByHl5Id(hl5Id);

        hl5.SALES = internalCofunding.SALE;
        hl5.SALE_TOTAL_EUROS = internalCofunding.SALE_TOTAL_EUROS;
        hl5.SALE_TOTAL = internalCofunding.SALE_TOTAL;
        hl5.SALE_CURRENCY = {ID: internalCofunding.SALE_CURRENCY_ID, VALUE: internalCofunding.SALE_CURRENCY_VALUE};
        hl5.SALE_REQUESTS = internalCofunding.SALE_REQUESTS;

        hl5.CATEGORIES = getCategoryOption(hl5Id);
        hl5.SERVICE_REQUEST_CATEGORIES = getServiceRequestCategoryOptionByHl5Id(hl5Id);

        hl5.TOTAL_BUDGET = ((Number(hl5.BUDGET_EUROS) + Number(hl5.INTEL_TOTAL_BUDGET_EUROS)
            + Number(hl5.EXTERNAL_TOTAL_BUDGET_EUROS) + Number(hl5.SALE_TOTAL_EUROS)) * hl5.BUDGET_CURRENCY.VALUE).toFixed(2);

        hl5.TOTAL_BUDGET_EUR = (Number(hl5.BUDGET_EUROS) + Number(hl5.INTEL_TOTAL_BUDGET_EUROS)
            + Number(hl5.EXTERNAL_TOTAL_BUDGET_EUROS) + Number(hl5.SALE_TOTAL_EUROS)).toFixed(2);

        hl5.BUDGET = (Number(hl5.BUDGET) * Number(hl5.CURRENCY_VALUE)).toFixed(2);
        hl5.IS_IN_CRM = !!dataHl5.hl5ExistsInCrm(hl5Id);
    } else {
        hl5.BUDGET = 0;
        hl5.CATEGORIES = level6Lib.getCarryOverHl5CategoryOption(hl5Id, hl5.HL4_ID);
        hl5.HL5_CRM_DESCRIPTION = undefined;
        hl5.ACRONYM = undefined;
        hl5.BUDGET_SPEND_REQUEST_STATUS_ID = undefined;
        hl5.BUDGET_SPEND_REQUEST_STATUS = undefined;
        hl5.CO_FUNDED = 0;
        hl5.ALLOW_BUDGET_ZERO = 0;
        hl5.STATUS = undefined;
    }

    return serverToUiParser(hl5);
}

function getHl5ByUserId(userId, isMarketingTacticView) {
    var HL4_STATUS = level4Lib.getStatusEnum();
    var crm = 'CRM-';
    var hl5List;

    var isAdmin = false;
    var isSuperAdmin = util.isSuperAdmin(userId);
    if (!isSuperAdmin) {
        isAdmin = util.isAdmin(userId);
    }
    if (isMarketingTacticView) {
        if (isAdmin || isSuperAdmin) {
            hl5List = dataHl5.getHl5ByUserIdRoleFilter(userId);
        } else {
            hl5List = dataHl5.getHl5ByUserId(userId, isSuperAdmin ? 1 : 0);
        }
    } else {
        hl5List = dataHl5.getHl5ByUserId(userId, isSuperAdmin ? 1 : 0);
    }

    var result = {};
    var requestResult = {results: []};

    if (hl5List.length) {

        for (var i = 0; i < hl5List.length; i++) {
            if (!result[hl5List[i].HL4_ID]) {
                result[hl5List[i].HL4_ID] = {
                    PARENT_ID: hl5List[i].HL4_ID
                    , PARENT_PATH: hl5List[i].HL4_PATH
                    , ENABLE_CREATION: hl5List[i].PARENT_STATUS_ID != HL4_STATUS.DELETED_IN_CRM
                    , CHILDREN: []
                };
            }
            if (hl5List[i].HL5_ID) {
                var actionPermission = getActionPermission(hl5List[i], userId, isSuperAdmin);

                result[hl5List[i].HL4_ID].CHILDREN.push({
                    HL5_ID: hl5List[i].HL5_ID
                    ,
                    HL5_PATH: hl5List[i].HL4_PATH + "-" + hl5List[i].HL5_ACRONYM
                    ,
                    STATUS_DETAIL: hl5List[i].STATUS_DETAIL
                    ,
                    CREATED_BY: hl5List[i].CREATED_BY
                    ,
                    HL5_BUDGET: hl5List[i].HL5_BUDGET
                    ,
                    TOTAL_HL6: hl5List[i].TOTAL_HL6
                    ,
                    QUANTITY_HL6_OUT_BUDGET: hl5List[i].QUANTITY_HL6_OUT_BUDGET
                    ,
                    ALLOCATED: hl5List[i].ALLOCATED
                    ,
                    REMAINING: hl5List[i].REMAINING
                    ,
                    IMPORTED: hl5List[i].IMPORTED
                    ,
                    CRM_DESCRIPTION: hl5List[i].CRM_DESCRIPTION
                    ,
                    STATUS_ID: hl5List[i].STATUS_ID || hl5List[i].STATUS_DETAIL_ID
                    ,
                    BUDGET_SPEND_REQUEST_STATUS_ID: hl5List[i].BUDGET_SPEND_REQUEST_STATUS_ID
                    ,
                    BUDGET_SPEND_REQUEST_STATUS: hl5List[i].BUDGET_SPEND_REQUEST_STATUS
                    ,
                    ENABLE_DELETION: actionPermission.ENABLE_DELETION
                    ,
                    ENABLE_CHANGE_STATUS: actionPermission.ENABLE_CHANGE_STATUS
                    ,
                    ENABLE_EDIT: actionPermission.ENABLE_EDIT
                    ,
                    ENABLE_CLONE: actionPermission.ENABLE_CLONE
                    ,
                    IN_CRM_CHILD: hl5List[i].IN_CRM_CHILD
                })
            }
        }
        requestResult.results = util.objectToArray(result);
    }
    return requestResult;
}

function getUserById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "", L5_MSG_USER_NOT_FOUND);
    return dbUser.getUserById(id)[0];
}

function getLevel5ForSearch(budgetYearId, regionId, subRegionId, limit, offset, userSessionID) {
    var isSuperAdmin = util.isSuperAdmin(userSessionID) ? 1 : 0;
    var results = dataHl5.getHl5ForSearch(budgetYearId, regionId || 0, subRegionId || 0, limit, offset || 0, userSessionID, isSuperAdmin);
    results = JSON.parse(JSON.stringify(results));
    results.result.forEach(function (elem) {
        elem.ENABLE_EDIT = util.getEnableEdit(elem.HL5_STATUS_DETAIL_ID, HL5_STATUS, userSessionID, isSuperAdmin);
    });
    return results;
}

function insertHl5(data, userId) {
    if (!level4Lib.addChildPermission(data.HL4_ID)) {
        throw ErrorLib.getErrors().CustomError("", "", "Cannot create Marketing Tactic under this Program/Campaign. Program/Campaign is in Deleted In CRM status.");
    }
    level4Lib.getImplementExecutionLevel(data.HL4_ID);
    var hl5_id = 0;
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


    var automaticApproval = blLevel2.getHl2AllowAutomaticBudgetApprovalByHl4Id(data.HL4_ID);
    data.AUTOMATIC_APPROVAL = automaticApproval;
    var conversionValue = dataCurrency.getCurrencyValueId(data.EURO_CONVERSION_ID);
    if (data.ALLOW_BUDGET_ZERO) {
        data.BUDGET = 0;
        data.IN_BUDGET = 1;
    } else {
        data.BUDGET = Number(data.BUDGET) / conversionValue;
        data.IN_BUDGET = checkBudgetStatus(data.HL4_ID, hl5_id, data.BUDGET);
    }

    var validationResult = validateHl5(data, userId);

    data.STATUS_DETAIL_ID = validationResult.statusId;

    if (data.STATUS_DETAIL_ID > 0) {
        // var conversionValue = dataCurrency.getCurrencyValueId(data.EURO_CONVERSION_ID);
        var acronym = data.ACRONYM || getNewSerialAcronym(data.HL4_ID);

        /*if (data.ALLOW_BUDGET_ZERO) {
            data.BUDGET = 0;
            data.IN_BUDGET = 1;
        } else {
            data.BUDGET = Number(data.BUDGET) / conversionValue;
            data.IN_BUDGET = checkBudgetStatus(data.HL4_ID, hl5_id, data.BUDGET);
        }*/

        data.BUDGET_SPEND_Q1 = Number(data.BUDGET_SPEND_Q1);
        data.BUDGET_SPEND_Q2 = Number(data.BUDGET_SPEND_Q2);
        data.BUDGET_SPEND_Q3 = Number(data.BUDGET_SPEND_Q3);
        data.BUDGET_SPEND_Q4 = Number(data.BUDGET_SPEND_Q4);

        data.CREATED_USER_ID = userId;
        hl5_id = insertDataHl5(acronym, data);

        if (hl5_id) {
            data.HL2_ID = dataHl2.getHl2ByHl4Id(data.HL4_ID).HL2_ID;
            // var automaticApproval = blLevel2.getHl2AllowAutomaticBudgetApprovalByHl4Id(data.HL4_ID);
            budgetSpendRequest.insertOwnMoneyBudgetSpendRequest(data.BUDGET, hl5_id, LEVEL_STRING, userId, !!data.ALLOW_BUDGET_ZERO || (automaticApproval && data.IN_BUDGET));
            insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, hl5_id);
            pathBL.insParentPath(LEVEL_STRING.toLowerCase(), hl5_id, data.HL4_ID, userId);
            data.HL5_ID = hl5_id;
            // setStatus(hl5_id, data.STATUS_DETAIL_ID, userId);
            insertExpectedOutcomes(data, userId);
            insertBudgetDistribution(data, userId);
            insertInternalCofunding(data, automaticApproval, userId);
            insertExternalCoFunding(data, automaticApproval, userId);
            insertCategoryOption(data, userId);
            insertHl5RequestCategoryOption(hl5_id, data.SERVICE_REQUEST_CATEGORIES, userId);
        }

        dataL5Report.updateLevel5ReportForDownload(hl5_id); //Update Processing Report Export Data

        if (data.ACRONYM) {
            return hl5_id;
        } else {
            return {CRM_ID: dataPath.getPathByLevelHlId(LEVEL_STRING.toLowerCase(), hl5_id)}
        }
    }


}

function insertDataHl5(acronym, data) {
    return dataHl5.insertHl5(
        data.CRM_DESCRIPTION || 'N/D'
        , acronym
        , data.DISTRIBUTION_CHANNEL_ID || 0
        , data.BUDGET
        , data.HL4_ID
        , data.CAMPAIGN_OBJECTIVE_ID || 0
        , data.CAMPAIGN_TYPE_ID || 0
        , data.CAMPAIGN_SUBTYPE_ID || 0
        , data.MARKETING_PROGRAM_ID || 0
        , data.MARKETING_ACTIVITY_ID || 0
        , data.ACTUAL_START_DATE || null
        , data.ACTUAL_END_DATE || null
        , data.SHOW_ON_DG_CALENDAR || 0
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
        , data.CREATED_USER_ID
        , data.ROUTE_TO_MARKET_ID || 0
        , data.VENUE
        , data.CITY
        , data.COUNTRY_ID || null
        , data.URL
        , data.SALES_ORGANIZATION_ID || 0
        , data.PLANNED_START_DATE || null
        , data.PLANNED_END_DATE || null
        , data.STREET
        , data.POSTAL_CODE
        , data.REGION
        , data.EVENT_OWNER
        , data.NUMBER_OF_PARTICIPANTS
        , data.PRIORITY_ID || 0
        , data.CO_FUNDED
        , Number(data.ALLOW_BUDGET_ZERO)
        , Number(data.IS_POWER_USER)
        , data.EMPLOYEE_RESPONSIBLE_USER
        , data.PERSON_RESPONSIBLE
        , Number(data.IS_COMPLETE)
        , Number(data.FORECAST_AT_L5 || 0)
        , 1 //AUTOCOMMIT
        , data.IMPORTED
        , data.IMPORT_ID
        , data.INHERITED_CREATION || 0
    );
}

function insertHl5RequestCategoryOption(hl5Id, requestCategoryOption, userId) {
    if (requestCategoryOption && requestCategoryOption.length) {
        var request = [];
        requestCategoryOption.forEach(function (option) {
            request.push({
                in_hl5_id: hl5Id
                , in_request_category_option_id: option.SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID
                , in_user_id: userId
            });

            if (option.FORM && option.ASSOCIATED_FORM) {
                option.FORM.HL5_ID = hl5Id;
                // option.FORM.FORM_STATUS_DETAIL_ID = option.FORM_STATUS_DETAIL_ID;
                switch (option.ASSOCIATED_FORM) {
                    case 'SegmentationForm':
                        blSegmentation.processForm(option.FORM, userId);
                        break;
                }
            }
        });
        return dataHl5.insertHl5RequestCategoryOption(request);
    }
}

function updateHl5RequestCategoryOption(hl5Id, requestCategoryOption, userId) {
    var serviceRequestCategoryOptionList = dataServiceRequest.getServiceRequestCategoryOptionByHlId(hl5Id, LEVEL_STRING);
    var optionToDelete = [];

    serviceRequestCategoryOptionList = JSON.parse(JSON.stringify(serviceRequestCategoryOptionList));
    serviceRequestCategoryOptionList.forEach(function (option) {
        if (!requestCategoryOption.filter(function (elem) {
                return elem.SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID == option.SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID
            }).length) {
            option.HL5_ID = hl5Id;
            optionToDelete.push({in_service_request_category_option_level_id: option.SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID});
        }

    });

    blSegmentation.deleteSegmentationFormByHl5IdOptionId(hl5Id, optionToDelete, userId);

    dataHl5.deleteHl5RequestCategoryOption(hl5Id, userId);
    // dataHl5.deleteHardHl5RequestCategoryOption(hl5Id);

    insertHl5RequestCategoryOption(hl5Id, requestCategoryOption, userId);
}

function insertInCrmBinding(crmBindingChangedFields, crmBindingChangedFieldsUpdate, hl5Id) {
    if (hl5Id) {
        for (var i = 0; i < crmBindingChangedFields.length; i++) {
            crmBindingChangedFields[i].in_hl5_id = hl5Id;
        }
        for (var j = 0; j < crmBindingChangedFieldsUpdate.length; j++) {
            crmBindingChangedFieldsUpdate[j].in_hl5_id = hl5Id;
        }
    }

    if (crmBindingChangedFields.length) {
        dataHl5.insertHl5CRMBinding(crmBindingChangedFields);
    }

    if (crmBindingChangedFieldsUpdate.length) {
        dataHl5.updateHl5CRMBinding(crmBindingChangedFieldsUpdate);
    }
}

function insertHl5FromUpload(data, userId) {
    var hl5_id = 0;

    if (validateHl5Upload(data)) {
        var mapCOL = util.getMapCategoryOption(LEVEL_STRING.toLowerCase());//Set Map for Category Option Level
        data.BUDGET = (data.BUDGET == "" || !data.BUDGET) ? 0 : data.BUDGET;
        data.EMPLOYEE_RESPONSIBLE_USER = JSON.parse(JSON.stringify(data.EMPLOYEE_RESPONSIBLE_ID));
        data.EMPLOYEE_RESPONSIBLE_ID = null;
        data.IN_BUDGET = 0;
        data.STATUS_DETAIL_ID = 1;
        data.CO_FUNDED = 0;
        data.ALLOW_BUDGET_ZERO = 0;
        data.PERSON_RESPONSIBLE = null;
        data.IS_COMPLETE = 0;
        data.IMPORTED = 1;

        hl5_id = insertDataHl5(data.ACRONYM, data);


        if (hl5_id > 0) {
            //insert categories
            data.HL5_ID = hl5_id;
            insertCategoryOption(data, userId);
            //
            // var categoryOptionBulk = [];
            // data.categories.forEach(function (hl5Category) {
            //     hl5Category.OPTIONS.forEach(function (hl5CategoryOption) {
            //         hl5CategoryOption.CREATED_USER_ID = userId;
            //         hl5CategoryOption.AMOUNT = Number(hl5CategoryOption.VALUE) || 0;
            //         hl5CategoryOption.UPDATED = Number(hl5CategoryOption.VALUE) ? 1 : 0;
            //         hl5Category.categoryOptionLevelId = mapCOL[hl5Category.CATEGORY][hl5CategoryOption.OPTION_ID];
            //         // hl5Category.categoryOptionLevelId = dataCategoryOptionLevel.getAllocationOptionLevelByCategoryAndLevelId(hl5Category.CATEGORY, LEVEL_STRING.toLowerCase(), hl5CategoryOption.OPTION_ID).ALLOCATION_CATEGORY_OPTION_LEVEL_ID;
            //         // dataCategoryOptionLevel.insertCategoryOption(hl5_id, hl5Category.categoryOptionLevelId, hl5CategoryOption.AMOUNT, userId, hl5CategoryOption.UPDATED, LEVEL_STRING);
            //         categoryOptionBulk.push({
            //             in_hl5_id: hl5_id
            //             , in_category_option_level_id: hl5Category.categoryOptionLevelId
            //             , in_amount: hl5CategoryOption.AMOUNT
            //             , in_user_id: userId
            //             , in_updated: hl5CategoryOption.UPDATED
            //         });
            //     });
            // });
            // dataCategoryOptionLevel.insertCategoryOption(categoryOptionBulk, LEVEL_STRING.toLowerCase());
            //
            // var outcome = {};
            // outcome.CREATED_USER_ID = userId;
            // outcome.HL5_ID = hl5_id;
            // outcome.COMMENTS = data.COMMENTS || "";
            // var hl5_expected_outcomes_id = dataExOut.insertHl5ExpectedOutcomes(outcome.HL5_ID, outcome.COMMENTS, outcome.CREATED_USER_ID);
            //
            // data.expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
            //     expectedOutcomeDetail.CREATED_USER_ID = userId;
            //     expectedOutcomeDetail.HL5_EXPECTED_OUTCOMES_ID = hl5_expected_outcomes_id;
            //     expectedOutcomeDetail.VOLUME_VALUE = Number(expectedOutcomeDetail.VOLUME_VALUE);
            //     expectedOutcomeDetail.EURO_VALUE = Number(expectedOutcomeDetail.EURO_VALUE);
            //     var expectedoutcomelevelid = expectedOutcomeDetail.EXPECTED_OUTCOME_OPTION_ID;//dataExOut.getExpectedOutcomeLevelByLevelAndOptionId(HIERARCHY_LEVEL..HL5,expectedOutcomeDetail.EXPECTED_OUTCOME_OPTION_ID).EXPECTED_OUTCOME_LEVEL_ID;
            //     dataExOut.insertHl5ExpectedOutcomesDetail([{
            //         in_hl5_expected_outcomes_id: expectedOutcomeDetail.HL5_EXPECTED_OUTCOMES_ID
            //         , in_outcomes_id: expectedoutcomelevelid
            //         , in_euro_value: expectedOutcomeDetail.EURO_VALUE
            //         , in_volume_value: expectedOutcomeDetail.VOLUME_VALUE
            //         , in_created_user_id: expectedOutcomeDetail.CREATED_USER_ID
            //     }]);
            // });


            //inserts budget regions
            var regions = blRegion.getAllRegions();
            var centralTeams = blLevel2.getAllCentralTeam(0);

            regions.forEach(function (myBudget) {
                myBudget.HL5_ID = hl5_id;
                dataHl5.insertHl5BudgetSalesUpload(myBudget.HL5_ID, myBudget.REGION_ID, 0, ORGANIZATION_TYPE["REGIONAL"], "", userId, data.EURO_CONVERSION_ID);
            });

            centralTeams.forEach(function (sale) {
                sale.HL5_ID = hl5_id;
                dataHl5.insertHl5BudgetSalesUpload(sale.HL5_ID, sale.HL2_ID, 0, ORGANIZATION_TYPE["CENTRAL"], "", userId, data.EURO_CONVERSION_ID);
            });
            //insert sale other data
            //dataHl5.insertHl5Sale(hl5_id, null, 0, ORGANIZATION_TYPE["OTHER"], "Other", userId);
            dataHl5.insertHl5Sale([{
                in_hl5_id: hl5_id,
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
    return hl5_id;
}

function validateHl5Upload(data) {
    if (!data.ACRONYM)
        throw ErrorLib.getErrors().ImportError("", "", L5_MSG_INITIATIVE_ACRONYM);

    //if (data.hl5.ACRONYM.length !== 4)
    //  throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_ACRONYM_LENGTH);

    if (existsHl5(data))
        throw ErrorLib.getErrors().ImportError("", "", L5_MSG_INITIATIVE_EXISTS);

    //if (util.validateDateEndMayorStart((new Date(data.hl5.ACTUAL_START_DATE)), (new Date(data.hl5.ACTUAL_END_DATE))))
    //    throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L5_MSG_INITIATIVE_INVALID_DATE_RANGE);

    //if (data.hl5.EURO_CONVERSION_ID < 0)
//        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_CURRENCY);

    return true;
}

function hasAdditionalFields(campaignTypeId) {
    return campaignTypeId && dataCampaignType.getCampaignTypeById(campaignTypeId).SHOW_ADDITIONAL_FIELDS
}

function updateHl5(data, userId) {
    var hl5_id;
    if (!data.HL5_ID)
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_NOT_FOUND);

    if (!util.validateIsNumber(data.HL5_ID))
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_NOT_FOUND);

    if (!userId)
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_USER_NOT_FOUND);

    if (!level4Lib.addChildPermission(data.HL4_ID)) {
        throw ErrorLib.getErrors().CustomError("", "", "Cannot update Marketing Tactic under this Program/Campaign. Program/Campaign is in Deleted In CRM status.");
    }

    level4Lib.getImplementExecutionLevel(data.HL4_ID);

    var objHL5 = dataHl5.getHl5ById(data.HL5_ID);
    var hl5StatusId = Number(objHL5.HL5_STATUS_DETAIL_ID);

    if (hl5StatusId === HL5_STATUS.DELETED_IN_CRM) {
        throw ErrorLib.getErrors().CustomError("", "", "Cannot update this selected Marketing Tactic, because the status doesn´t allow it.");
    }

    //TODO: Super admin validation added because of SAP new requirements, refactor this
    if (!util.isSuperAdmin(userId)) {
        if (hl5StatusId === HL5_STATUS.CREATE_IN_CRM || hl5StatusId === HL5_STATUS.UPDATE_IN_CRM) {
            throw ErrorLib.getErrors().CustomError("", "", "Cannot update this selected Initiative/Campaign, because the status doesn´t allow it.");
        }
    }

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

    var automaticApproval = blLevel2.getHl2AllowAutomaticBudgetApprovalByHl4Id(data.HL4_ID);
    data.AUTOMATIC_APPROVAL = automaticApproval;
    var conversionValue = dataCurrency.getCurrencyValueId(data.EURO_CONVERSION_ID);
    if (data.ALLOW_BUDGET_ZERO) {
        data.BUDGET = 0;
        data.IN_BUDGET = 1;
    } else {
        data.BUDGET = Number(data.BUDGET) / conversionValue;
        data.IN_BUDGET = checkBudgetStatus(data.HL4_ID, data.HL5_ID, data.BUDGET);
    }

    var ownMoneyBudgetSpendRequestStatus = budgetSpendRequest.getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(data.HL5_ID, LEVEL_STRING);
    if (!ownMoneyBudgetSpendRequestStatus) {
        budgetSpendRequest.insertOwnMoneyBudgetSpendRequest(data.BUDGET, data.HL5_ID, LEVEL_STRING, userId, !!data.ALLOW_BUDGET_ZERO || (automaticApproval && data.IN_BUDGET));
    } else {
        var budgetSpendRequestStatus = budgetSpendRequest.getBudgetSpendRequestsStatus();

        if ((Number(objHL5.BUDGET).toFixed(2) != Number(data.BUDGET).toFixed(2)) ||
            (ownMoneyBudgetSpendRequestStatus != budgetSpendRequestStatus.APPROVED)) {
            budgetSpendRequest.updateOwnMoneyBudgetSpendRequestByHlIdLevel(data.HL5_ID, LEVEL_STRING, data.BUDGET, !!data.ALLOW_BUDGET_ZERO || (automaticApproval && data.IN_BUDGET), userId);
        }
        level6Lib.checkBudgetStatus(data);
    }


    var validationResult = validateHl5(data, userId);
    data.STATUS_DETAIL_ID = validationResult.statusId;

    var budgetSpendRequestStatus = budgetSpendRequest.getBudgetSpendRequestsStatus();

    if (data.STATUS_DETAIL_ID > 0) {
        hl5_id = data.HL5_ID;
        var acronym = data.ACRONYM || getNewSerialAcronym(data.HL4_ID);
        data.BUDGET_SPEND_Q1 = Number(data.BUDGET_SPEND_Q1);
        data.BUDGET_SPEND_Q2 = Number(data.BUDGET_SPEND_Q2);
        data.BUDGET_SPEND_Q3 = Number(data.BUDGET_SPEND_Q3);
        data.BUDGET_SPEND_Q4 = Number(data.BUDGET_SPEND_Q4);

        data.USER_ID = userId;

        /*if (data.ALLOW_BUDGET_ZERO) {
            data.BUDGET = 0;
            data.IN_BUDGET = 1;
        } else {
            data.BUDGET = Number(data.BUDGET) / conversionValue;
            data.IN_BUDGET = checkBudgetStatus(data.HL4_ID, hl5_id, Number(data.BUDGET) / conversionValue);
        }*/

        dataHl5.updateHl5(
            data.HL5_ID
            , data.CRM_DESCRIPTION || 'N/D'
            , acronym
            , data.DISTRIBUTION_CHANNEL_ID || 0
            , data.BUDGET
            , data.HL4_ID
            , data.CAMPAIGN_OBJECTIVE_ID || 0
            , data.CAMPAIGN_TYPE_ID || 0
            , data.CAMPAIGN_SUBTYPE_ID || 0
            , data.MARKETING_PROGRAM_ID || 0
            , data.MARKETING_ACTIVITY_ID || 0
            , data.ACTUAL_START_DATE || null
            , data.ACTUAL_END_DATE || null
            , data.SHOW_ON_DG_CALENDAR || 0
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
            , data.USER_ID
            , data.ROUTE_TO_MARKET_ID || 0
            , data.VENUE
            , data.CITY
            , data.COUNTRY_ID || null
            , data.URL
            , data.SALES_ORGANIZATION_ID || 0
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
            , Number(data.IS_COMPLETE)
            , Number(data.FORECAST_AT_L5)
            , data.INHERITED_CREATION || 0
        );

        insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, hl5_id);

        if (data.STATUS_DETAIL_ID != objHL5.HL5_STATUS_DETAIL_ID) {
            dataHl5.insertHl5LogStatus(data.HL5_ID, objHL5.HL5_STATUS_DETAIL_ID, userId);
            dataHl5.updateDeletionReason(data.HL5_ID, null, userId);
        }
        data.HL2_ID = dataHl2.getHl2ByHl4Id(data.HL4_ID).HL2_ID;

        //Check if the KPIs were changed and update them
        var originalKPIs = !objHL5.FORECAST_AT_L5 ? expectedOutcomesLib.getAggregatedKPIByHl5Id(data.HL5_ID) : expectedOutcomesLib.getExpectedOutcomesByHl5Id(data.HL5_ID, objHL5.HL4_ID);
        var changedKPIs = validateChangedKPIs(data, originalKPIs, objHL5.FORECAST_AT_L5);
        updateExpectedOutcomes(data, userId);

        updateBudgetDistribution(data, userId);
        updateCategoryOption(data, userId);
        updateHl5RequestCategoryOption(hl5_id, data.SERVICE_REQUEST_CATEGORIES, userId);

        if (Number(data.ALLOW_BUDGET_ZERO)) {
            budgetSpendRequest.setBudgetSpendRequestStatusNoLongerRequested(hl5_id, LEVEL_STRING, userId);
        } else if (!Number(data.CO_FUNDED)) {
            budgetSpendRequest.disableCoFundedBudgetSpendRequests(hl5_id, LEVEL_STRING, userId);
        } else {
            updateInternalCofunding(data, automaticApproval, userId);
            updateExternalCoFunding(data, automaticApproval, userId);
        }

        dataL5Report.updateLevel5ReportForDownload(hl5_id); //Update Processing Report Export Data

        var changedFields = (validationResult.crmBindingChangedFields && validationResult.crmBindingChangedFields.length > 0);
        var changedFieldsUpdate = (validationResult.crmBindingChangedFieldsUpdate && validationResult.crmBindingChangedFieldsUpdate.length > 0);

        if (!validationResult.crmFieldsHasChanged && (validationResult.budgetChanged || changedKPIs) && Number(validationResult.statusId) === Number(HL5_STATUS.IN_CRM)) {
            return {SUCCESS_MESSAGE: "Your Tactic has automatically updated to CRM"};
        } else {
            if (data.ACRONYM) {
                return data;
            } else {
                return {CRM_ID: dataPath.getPathByLevelHlId(LEVEL_STRING.toLowerCase(), hl5_id)}
            }
        }

    }
}

function validateChangedKPIs(hl5Object, oldKPIs, oldForecastAtL5) {
    var changed = false;
    var currentOldKPI;

    if (!!oldForecastAtL5 !== !!hl5Object.FORECAST_AT_L5 ||
        hl5Object.TARGET_KPIS.KPIS.length !== oldKPIs.KPIS.length ||
        hl5Object.TARGET_KPIS.COMMENTS !== oldKPIs.COMMENTS
    ) {
        changed = true;
    } else if (hl5Object && hl5Object.TARGET_KPIS.KPIS.length) {
        hl5Object.TARGET_KPIS.KPIS.forEach(function (kpi) {
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

function deleteHl5ByHl4(hl4Id, userId, isCascadeDeletion) {
    var hl5ToDelete = getHl5ByHl4Id(hl4Id, userId).results;
    var objHL5 = {};
    hl5ToDelete.forEach(function (elem) {
        deleteHl5(elem, userId, null, isCascadeDeletion);
    });
}

function deleteHl5(hl5, userId, rollBack, isCascadeDeletion, fromEventRequestManagement) {
    var hl5Id = hl5.HL5_ID;
    if (!hl5Id && !rollBack) {
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_NOT_FOUND);
    }

    if (!rollBack && !util.validateIsNumber(hl5Id)) {
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_NOT_FOUND);
    }

    var userRoleId = Number(dbUserRole.getUserRoleByUserId(userId)[0].ROLE_ID);
    //FIXME: this needs to be removed with the new implementation for permissions
    /*
    if (!rollBack && userRoleId !== 1 && userRoleId !== 2) {
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_NO_PRIVILEGE);
    }
    */

    var hl5StatusId = !rollBack ? Number(dataHl5.getHl5StatusByHl5Id(hl5Id).HL5_STATUS_DETAIL_ID) : 0;

    if (fromEventRequestManagement && hl5StatusId === HL5_STATUS.IN_CRM) {
        throw ErrorLib.getErrors().CustomError("", "", "The Event Request cannot be rejected because the related Marketing Tactic is in “IN CRM” status");
    }

    if (hl5StatusId !== HL5_STATUS.DELETED_IN_CRM && hl5StatusId !== HL5_STATUS.DELETION_REQUEST) {
        if (!rollBack && isCascadeDeletion && !fromEventRequestManagement && (hl5StatusId === HL5_STATUS.IN_CRM || hl5StatusId === HL5_STATUS.CREATE_IN_CRM || hl5StatusId === HL5_STATUS.UPDATE_IN_CRM)) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_CANNOT_DEL_STATUS);
        }

        if (!rollBack && isCascadeDeletion && dataHl5.getCountHl5ChildrenInCRM(hl5Id) > 0) {
            throw ErrorLib.getErrors().CustomError("", "", "Cannot delete the Marketing Tactic " + hl5.ACRONYM + " because a related child Marketing Sub-tactic is \"IN CRM\" status");
        }

        if (!rollBack && !isCascadeDeletion && hl5StatusId === HL5_STATUS.IN_CRM) {
            if (hl5.DELETEION_REASON && hl5.DELETEION_REASON.trim()) {
                dataHl5.updateDeletionReason(hl5Id, hl5.DELETEION_REASON, userId);
            }
            setStatus(hl5Id, HL5_STATUS.DELETION_REQUEST, userId);
        } else {
            hl5.USER_ID = userId;

            level6Lib.deleteHl6ByHl5(hl5Id, userId, true);

            dataPartner.deleteHl5Partner(hl5Id, userId);
            dataExOut.deleteHl5ExpectedOutcomesDetail(hl5Id, userId);
            dataExOut.deleteHl5ExpectedOutcomes(hl5Id, userId);
            level5DER.deleteL5ChangedFieldsByHl5Id(hl5Id, userId);

            dataCategoryOptionLevel.deleteCategoryOption(hl5Id, userId, LEVEL_STRING);
            dataCategoryOptionLevel.deleteCountryCategoryOption(hl5Id, userId, LEVEL_STRING);

            dataHl5.deleteHl5Budget(hl5Id, userId);

            //delete HL5_SALE_BUDGET_SPEND_REQUEST
            databudgetSpendRequest.delAllHlSaleBudgetSpendRequestByHlId(hl5Id, userId, LEVEL_STRING); //ready
            dataHl5.deleteHl5Sale(hl5Id, userId);
            //BUDGET_SPEND_REQUEST_LOG_STATUS
            databudgetSpendRequest.delAllBudgetSpendRequestLogStatusByHlId(hl5Id, userId, LEVEL_STRING);//ready
            //BUDGET_SPEND_REQUEST_MESSAGE
            databudgetSpendRequest.delAllBudgetSpendRequestMessageByHlId(hl5Id, userId, LEVEL_STRING);
            //DEL_ALL_BUDGET_SPEND_REQUEST_BY_HL5_ID
            databudgetSpendRequest.delAllBudgetSpendRequestByHlId(hl5Id, userId, LEVEL_STRING);//ready
            dataPath.delParentPath(LEVEL_STRING.toLowerCase(), hl5Id);
            dataHl5.deleteHl5RequestCategoryOption(hl5Id, userId);
            blSegmentation.deleteSegmentationForm(hl5Id, userId);
            dataHl5.deleteHl5(hl5Id, userId);

            dataL5Report.updateLevel5ReportForDownload(hl5Id); //Update Processing Report Export Data
        }
    }

    return hl5;
}

function isComplete(data, fromChangeStatusOnDemand) {
    var deReportDisplayName = level5DER.getProcessingReportFields();
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
                isComplete = !data.HL5_ID ? data.CATEGORIES.length === dataCategory.getAllocationCategoryCountByHlId(LEVEL_STRING.toLowerCase()) : isComplete;

                if (isComplete) {
                    for (var j = 0; j < data.CATEGORIES.length; j++) {
                        var hl5Category = data.CATEGORIES[j];
                        var percentagePerOption = 0;
                        var percentagePerOptionKpi = 0;

                        isComplete = isComplete && !!(hl5Category.CATEGORY_ID && Number(hl5Category.CATEGORY_ID));
                        var countOptions = dataOption.getAllocationOptionCountByCategoryIdLevelId(hl5Category.CATEGORY_ID, LEVEL_STRING.toLowerCase());
                        isComplete = isComplete && (!data.HL5_ID ?
                            hl5Category.OPTIONS.length === countOptions
                            : isComplete);

                        hl5Category.OPTIONS.forEach(function (option) {
                            option.AMOUNT = option.AMOUNT || 0;
                            option.AMOUNT_KPI = option.AMOUNT_KPI || 0;
                            isComplete = isComplete && !!(option.OPTION_ID && Number(option.OPTION_ID));
                            isComplete = isComplete && !(Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0);
                            isComplete = isComplete && !(Number(option.AMOUNT_KPI) > 100 || Number(option.AMOUNT_KPI) < 0);

                            percentagePerOption = percentagePerOption + Number(option.AMOUNT);
                            percentagePerOptionKpi = percentagePerOptionKpi + Number(option.AMOUNT_KPI);
                        });

                        isComplete = isComplete &&
                            (percentagePerOption === 100 || (!hl5Category.MAKE_CATEGORY_MANDATORY && percentagePerOption === 0)) &&
                            (percentagePerOptionKpi === 100 || (!hl5Category.MAKE_CATEGORY_MANDATORY && percentagePerOptionKpi === 0));

                        var totalOptionsSelected = hl5Category.OPTIONS.filter(function (option) {
                            return option.AMOUNT && Number(option.AMOUNT) !== 0;
                        }).length;

                        isComplete = isComplete && totalOptionsSelected <= hl5Category.OPTIONS_LIMIT;

                        if (!isComplete) {
                            break;
                        }
                    }
                }

                break;
            case "HL5_CRM_DESCRIPTION":
                isComplete = fromChangeStatusOnDemand ? !!data.HL5_CRM_DESCRIPTION : !!data.CRM_DESCRIPTION;
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

        if (Number(data.FORECAST_AT_L5)) {
            isComplete = isComplete && !!((data.TARGET_KPIS
                && data.TARGET_KPIS.KPIS
                && data.TARGET_KPIS.KPIS.length)
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
                    var ownMoneyBudgetSpendRequestStatus = budgetSpendRequest.getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(data.HL5_ID || 0, LEVEL_STRING);
                    if (!ownMoneyBudgetSpendRequestStatus || (ownMoneyBudgetSpendRequestStatus && ownMoneyBudgetSpendRequestStatus != budgetSpendRequestStatus.APPROVED)) {
                        if (Number(data.CO_FUNDED)) {
                            isComplete = (data.SALE_REQUESTS && data.SALE_REQUESTS.length) || (data.PARTNERS && data.PARTNERS.length);
                        } else {
                            var hasBudgetRequestApproved = !!Number(budgetSpendRequest.countApprovedBudgetRequestByHl5Id(data.HL5_ID || '0'));
                            var hasBudgetRequestPending = !Number(budgetSpendRequest.countPendingBudgetRequestByHl5Id(data.HL5_ID || '0'));
                            isComplete = hasBudgetRequestApproved && hasBudgetRequestPending;
                            //isComplete = false;
                        }
                    } else {
                        isComplete = true;
                    }
                } else {
                    if (Number(data.CO_FUNDED)) {
                        isComplete = (data.SALE_REQUESTS && data.SALE_REQUESTS.length) || (data.PARTNERS && data.PARTNERS.length);
                    } else {
                        //isComplete = false;
                        var hasBudgetRequestApproved = !!Number(budgetSpendRequest.countApprovedBudgetRequestByHl5Id(data.HL5_ID || '0'));
                        var hasBudgetRequestPending = !Number(budgetSpendRequest.countPendingBudgetRequestByHl5Id(data.HL5_ID || '0'));
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
                var hasBudgetRequestApproved = !!Number(budgetSpendRequest.countApprovedBudgetRequestByHl5Id(data.HL5_ID || '0'));
                var hasBudgetRequestPending = !Number(budgetSpendRequest.countPendingBudgetRequestByHl5Id(data.HL5_ID || '0'));
                isComplete = hasBudgetRequestApproved && hasBudgetRequestPending;
            }
        }
        isComplete = isComplete && validateBudgetDistribution(data);
    }
    return isComplete;
}

function validateHl5(data, userId) {
    var existInCrm = 0;
    var statusId = HL5_STATUS.IN_PROGRESS;
    var crmBindingChangedFields = [];
    var crmBindingChangedFieldsUpdate = [];
    var myBudgetComplete = false;
    var categoryOptionComplete = false;
    var categoryHasChanged = false;

    if (!Number(data.ALLOW_BUDGET_ZERO) && Number(data.BUDGET) == 0
        && (!data.CO_FUNDED || data.PARTNERS.length == 0 && data.SALE_REQUESTS.length == 0)) {
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_REQUIRE_SPEND_BUDGET_VALIDATION);
    }

    if (!Number(data.ALLOW_BUDGET_ZERO) && data.CO_FUNDED) {
        if (data.PARTNERS && data.PARTNERS.length) {
            budgetSpendRequest.validateExternalCofunding(data.PARTNERS);
        }
        if (data.SALE_REQUESTS && data.SALE_REQUESTS.length) {
            budgetSpendRequest.validateInternalCofunding(data.SALE_REQUESTS);
        }
    }

    var isHl5Complete = isComplete(data);
    data.IS_COMPLETE = Number(isHl5Complete);

    var hl5 = data.HL5_ID ? dataHl5.getHl5ById(data.HL5_ID) : {};
    if (data.HL5_ID) {
        existInCrm = dataHl5.hl5ExistsInCrm(data.HL5_ID);
        categoryHasChanged = categoryChanged(data, existInCrm, userId);
        if (existInCrm && hl5.ACRONYM != data.ACRONYM)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_PROPERTIES_CANNOT_UPDATE);
    }

    if (isHl5Complete) {
        if (!data) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_NOT_FOUND);
        }

        /*if (!data.hl5.ACRONYM)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_ACRONYM);*/

        if (!(/^[A-Z0-9_]{7}$/.test(data.ACRONYM))) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_ACRONYM);
        }

        if (existsHl5(data)) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_EXISTS);
        }

        if (!data.CRM_DESCRIPTION || !data.CRM_DESCRIPTION.trim() || (data.CRM_DESCRIPTION.trim()).length > 40) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_CRM_DESCRIPTION);
        }

        if (!Number(data.DISTRIBUTION_CHANNEL_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_DISTRIBUTION_CHANNEL);
        }

        /*if (!data.ALLOW_BUDGET_ZERO) {
            if (data.BUDGET <= 0)
                throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_BUDGET_VALUE);
        }*/

        if (!data.COST_CENTER_ID || data.COST_CENTER_ID < 0) {
            throw ErrorLib.getErrors().CustomError("", "", L5_COST_CENTER_NOT_VALID);
        }

        if (!data.EMPLOYEE_RESPONSIBLE_USER || !data.EMPLOYEE_RESPONSIBLE_USER.trim()) {
            throw ErrorLib.getErrors().CustomError("", "", L5_RESPONSIBLE_NOT_VALID);
        }

        if (!data.ROUTE_TO_MARKET_ID || !Number(data.ROUTE_TO_MARKET_ID) || !dataRTM.getRouteToMarketById(data.ROUTE_TO_MARKET_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_ROUTE_TO_MARKET);
        }

        if (!data.CAMPAIGN_OBJECTIVE_ID || !Number(data.CAMPAIGN_OBJECTIVE_ID) || !dataObj.getObjectiveById(data.CAMPAIGN_OBJECTIVE_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_CAMPAIGN_OBJECTIVE);
        }

        if (!data.CAMPAIGN_TYPE_ID || !Number(data.CAMPAIGN_TYPE_ID) || !dataCT.getCampaignTypeById(data.CAMPAIGN_TYPE_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_CAMPAIGN_TYPE);
        }

        if (!data.CAMPAIGN_SUBTYPE_ID || !Number(data.CAMPAIGN_SUBTYPE_ID) || !dataCST.getCampaignSubTypeById(data.CAMPAIGN_SUBTYPE_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_CAMPAIGN_SUBTYPE);
        }

        if (!data.PRIORITY_ID || data.PRIORITY_ID < 0) {
            throw ErrorLib.getErrors().CustomError("", "", L5_PRIORITY_NOT_VALID);
        }

        if (!data.BUSINESS_OWNER_ID || data.BUSINESS_OWNER_ID < 0) {
            throw ErrorLib.getErrors().CustomError("", "", L5_BUSINESS_OWNER_NOT_VALID);
        }

        if (!data.SALES_ORGANIZATION_ID || !Number(data.SALES_ORGANIZATION_ID) || !dataMO.getMarketingOrganizationById(data.SALES_ORGANIZATION_ID))
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_SALES_ORGANIZATION);

        if (!data.ACTUAL_START_DATE) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_ACTUAL_START_DATE);
        }

        if (!data.ACTUAL_END_DATE) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_ACTUAL_END_DATE);
        }

        if (util.validateDateEndMayorStart((new Date(data.ACTUAL_START_DATE)), (new Date(data.ACTUAL_END_DATE)))) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_INVALID_DATE_RANGE);
        }


        if (!Number(data.EURO_CONVERSION_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_CURRENCY);
        }

        if (!data.BUDGET_SPEND_Q1 && !data.BUDGET_SPEND_Q2 && !data.BUDGET_SPEND_Q3 && !data.BUDGET_SPEND_Q4) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_BUDGET_SPEND);
        }

        if (!Number(data.ALLOW_BUDGET_ZERO) && ((Number(data.BUDGET_SPEND_Q1) || 0) +
                (Number(data.BUDGET_SPEND_Q2) || 0) +
                (Number(data.BUDGET_SPEND_Q3) || 0) +
                (Number(data.BUDGET_SPEND_Q4) || 0)) < 100) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_BUDGET_SPEND_PERCENT);
        }

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

        if (data.HL5_ID) {

            /*existInCrm = dataHl5.hl5ExistsInCrm(data.HL5_ID);

            var categoryHasChanged = categoryChanged(data, existInCrm);*/

            //If only the budget were changed and the HL5 is "In CRM" -> the status does not change
            if (!crmFieldsHasChanged && !categoryHasChanged && budgetChanged && Number(data.STATUS_DETAIL_ID) == HL5_STATUS.IN_CRM) {
                statusId = hl5.HL5_STATUS_DETAIL_ID;
            } else if (!crmFieldsHasChanged && !categoryHasChanged && validateBudget(data)) {
                if (data.STATUS_DETAIL_ID == HL5_STATUS.IN_CRM
                    && !data.AUTOMATIC_APPROVAL
                    && ((data.SALE_REQUESTS && data.SALE_REQUESTS.length) || (data.PARTNERS && data.PARTNERS.length))) {
                    statusId = HL5_STATUS.IN_CRM_NEED_NEW_BUDGET_APPROVAL;
                } else {
                    if (!crmFieldsHasChanged && !categoryHasChanged && !budgetChanged
                        && Number(data.STATUS_DETAIL_ID) === HL5_STATUS.UPDATE_IN_CRM) {
                        statusId = HL5_STATUS.IN_CRM;
                    } else {
                        statusId = hl5.HL5_STATUS_DETAIL_ID;
                    }
                }
            } else {
                statusId = HL5_STATUS.IN_PROGRESS;
            }
        }
    }
    return {
        statusId: statusId
        , isComplete: isHl5Complete
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
    var hl5_categoryBD = getCategoryOptionVersioned(data.HL5_ID);

    var optionChange = CompareCategories(data.CATEGORIES, hl5_categoryBD, existInCrm, data.HL5_ID, hl5_categoryBD.length);
    if (optionChange) {
        var field = [{
            "in_hl5_id": data.HL5_ID,
            "in_column_name": "CATEGORY",
            "in_changed": 1,
            "in_user_id": userId,
            "in_display_name": ''
        }];
        insertInCrmBinding(field, [], data.HL5_ID); // Inset in HL6_CRM_BINDING a row for categoryChange
    }
    return optionChange;
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
        if (option.OPTION_ID === OptionId) {
            return option;
        }
    }
    return null;
}

//ListOption2: option for a given category from DB
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

//ListCategories: categories from DB
function CompareCategoryOption(Category1, Category1_id, ListCategories, existInCrm, hasCategoryOptionInCrmVersion) {
    var Category2 = hasCategoryOptionInCrmVersion ? getCategoryFromList(ListCategories, Category1_id) : {OPTIONS: []};
    return CompareListOptions(Category1.OPTIONS, Category2.OPTIONS, existInCrm, hasCategoryOptionInCrmVersion)
}

//ListCategories1: categories from UI
//ListCategories2: categories from DB
function CompareCategories(ListCategories1, ListCategories2, existInCrm, hl5Id, hasCategoryOptionInCrmVersion) {
    var flag = false;
    var actualCategory = util.getCategoryById(LEVEL_STRING.toLowerCase(), hl5Id);

    for (var i = 0; i < ListCategories1.length; i++) {
        var category = ListCategories1[i];

        //Compare Categories
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
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_BUDGET_PERCENT);

    myBudgetTotalPercentage = myBudgetTotalPercentage < 100 ? 0 : myBudgetTotalPercentage;

    myBudgetComplete = !!myBudgetTotalPercentage;
    return myBudgetComplete;
}

function isCategoryOptionComplete(data) {
    var categoryOptionComplete = false;
    for (var i = 0; i < data.CATEGORIES.length; i++) {
        var hl5Category = data.CATEGORIES[i];
        var percentagePerOption = 0;
        var percentagePerOptionKpi = 0;
        if (!hl5Category.CATEGORY_ID || !Number(hl5Category.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "", L5_CATEGORY_NOT_VALID);

        if (!hl5Category.OPTIONS.length) {
            percentagePerOption = 100;
            percentagePerOptionKpi = 100;
        }
        //TODO review. Workaround for empty categories on edit
        //throw ErrorLib.getErrors().CustomError("","hl5Services/handlePost/insertHl5", L5_CATEGORY_OPTIONS_NOT_EMPTY);

        if (!data.HL5_ID && hl5Category.OPTIONS.length !== dataOption.getAllocationOptionCountByCategoryIdLevelId(hl5Category.CATEGORY_ID, LEVEL_STRING.toLowerCase()))
            throw ErrorLib.getErrors().CustomError("", "", L5_CATEGORY_OPTIONS_INCORRECT_NUMBER);

        hl5Category.OPTIONS.forEach(function (option) {
            if (!option.OPTION_ID || !Number(option.OPTION_ID))
                throw ErrorLib.getErrors().CustomError("", "", L5_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.AMOUNT) && !Number(option.AMOUNT)) || Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0)
                throw ErrorLib.getErrors().CustomError("", "", "Option value is not valid (actual value " + option.AMOUNT + ")");
            if ((parseFloat(option.AMOUNT_KPI) && !Number(option.AMOUNT_KPI)) || Number(option.AMOUNT_KPI) > 100 || Number(option.AMOUNT_KPI) < 0)
                throw ErrorLib.getErrors().CustomError("", "", "Option KPI value is not valid (actual value " + option.AMOUNT_KPI + ")");

            percentagePerOption = percentagePerOption + Number(option.AMOUNT);
            percentagePerOptionKpi = percentagePerOptionKpi + Number(option.AMOUNT_KPI);
        });

        if (!Number(hl5Category.MAKE_CATEGORY_MANDATORY) && (percentagePerOption === 0 || percentagePerOption === 100) &&
            (percentagePerOptionKpi === 0 || percentagePerOptionKpi === 100)) {
            categoryOptionComplete = true;
        } else if (percentagePerOption > 100 || percentagePerOptionKpi > 100) {
            throw ErrorLib.getErrors().CustomError("", "", L5_CATEGORY_TOTAL_PERCENTAGE);
        } else if (percentagePerOption < 100 || percentagePerOptionKpi < 100) {
            categoryOptionComplete = false;
            break;
        } else {
            categoryOptionComplete = true;
        }
    }
    return categoryOptionComplete;
}

function getLevel5ByAcronym(acronym, hl4_id) {
    return dataHl5.getHl5ByAcronym(acronym, hl4_id);
}

/**
 * @deprecated
 * @param objHL5
 * @returns {boolean}
 */
function existsHl5(objHL5) {
    /* var hl5 = getLevel5ByAcronym(objHL5.ACRONYM, objHL5.HL4_ID);
     if (hl5 && hl5.HL5_ID && Number(hl5.HL5_ID) !== Number(objHL5.HL5_ID))
         return true;
     else
         return false;*/
    return false;
}

function checkBudgetStatus(objHl4, hl5_id, new_hl5_budget) {
    if (!hl5_id) hl5_id = 0;
    if (Number(objHl4) && (new_hl5_budget || new_hl5_budget == 0)) {
        var objHl = {};
        objHl.HL4_ID = Number(objHl4) ? objHl4 : objHl4.HL4_ID;
        objHl.HL5_ID = hl5_id;
        var hl4 = dataHl4.getHl4ById(objHl.HL4_ID);

        var hl4AllocatedBudget = dataHl4.getHl4AllocatedBudget(objHl.HL4_ID, hl5_id);
        return (Number(hl4.HL4_FNC_BUDGET_TOTAL_MKT) - Number(hl4AllocatedBudget) - Number(new_hl5_budget)) >= 0 ? 1 : 0;
    } else {
        var hl4Id = Number(objHl4) ? objHl4 : objHl4.in_hl4_id;
        var resultHl5 = dataHl5.getHl5ByHl4Id(hl4Id);

        if (resultHl5.length > 0) {
            var total = 0;
            for (var i = 0; i < resultHl5.length; i++) {
                var hl5 = resultHl5[i];
                if (hl5.HL5_STATUS_DETAIL_ID != HL5_STATUS.DELETED_IN_CRM) {
                    if (objHl4.in_HL4_FNC_BUDGET_TOTAL_MKT < total + parseFloat(hl5.HL5_BUDGET)) {
                        dataHl5.updateHl5BudgetStatus(hl5.HL5_ID, 0);
                    } else {
                        dataHl5.updateHl5BudgetStatus(hl5.HL5_ID, 1);
                        total = total + parseFloat(hl5.HL5_BUDGET);
                    }
                }
            }
        }
        return true;
    }
}

function setStatus(hl5_id, status_id, userId) {
    if (hl5_id && status_id && userId) {
        dataHl5.changeStatusHl5(hl5_id, status_id, userId);
        dataHl5.insertHl5LogStatus(hl5_id, status_id, userId);
        if (HL5_STATUS.IN_CRM == status_id) {
            level5DER.deleteL5ChangedFieldsByHl5Id(hl5_id);
            resetHl5CategoryOptionUpdated(hl5_id, userId);
            insertInCrmVersion(hl5_id);
        }
        dataL5Report.updateLevel5ReportForDownload(hl5_id);
    }

    return true;
}

function massSetHl5Status(hl5Ids, userId) {
    var hl5List = [];
    var hl5IdsInCrm = [];
    hl5Ids.forEach(function (hl5) {

        var status_id = (Number(dataHl5.getHl5StatusByHl5Id(hl5.hl5_id).HL5_STATUS_DETAIL_ID) === HL5_STATUS.DELETION_REQUEST)
            ? HL5_STATUS.DELETED_IN_CRM
            : (!!Number(budgetSpendRequest.countPendingBudgetRequestByHl5Id(hl5.hl5_id))
                ? HL5_STATUS.IN_CRM_NEED_NEW_BUDGET_APPROVAL : HL5_STATUS.IN_CRM);
        hl5List.push({
            "in_hl5_id": hl5.hl5_id
            , 'in_status_id': status_id
            , 'in_user_id': userId
        });
        if (status_id == HL5_STATUS.IN_CRM) {
            hl5IdsInCrm.push(hl5);
        }
    });
    dataHl5.massInsertHl5LogStatus(hl5Ids, userId);
    dataHl5.massChangeStatusHl5(hl5List);
    level5DER.massDeleteL5ChangedFieldsByHl5Ids(hl5Ids);
    massResetHl5CategoryOptionUpdated(hl5Ids, userId);

    return hl5IdsInCrm;
}

function massResetHl5CategoryOptionUpdated(hl5Id, userId) {
    dataCategoryOptionLevel.massResetHl5CategoryOptionUpdated(hl5Id, LEVEL_STRING.toLowerCase(), userId);
    dataHierarchyCategoryCountry.massResetCountryCategoryOptionUpdated(hl5Id, LEVEL_STRING.toLowerCase(), userId);
    return true;
}

function resetHl5CategoryOptionUpdated(hl5Id, userId) {
    return dataCategoryOptionLevel.resetHl4CategoryOptionUpdated(hl5Id, LEVEL_STRING.toLowerCase(), userId);
}

function setStatusInCRM(hl5_id, userId) {
    var hl5Ids = [];
    var result;
    if (hl5_id.constructor === Array) {
        hl5Ids = hl5_id.map(function (value) {
            return {hl5_id: value}
        });
    } else {
        hl5Ids.push({hl5_id: hl5_id})
    }

    if (hl5Ids.length) {
        var hl5InCrm = massSetHl5Status(hl5Ids, userId);
        mail.massSendInCRMMail(hl5InCrm, LEVEL_STRING.toLowerCase());
        hl5Ids.forEach(function (value) {
            insertInCrmVersion(value.hl5_id);
            dataL5Report.updateLevel5ReportForDownload(value.hl5_id);
        })
    }
    return 1;
}

function setStatusInCRMByUpload(data, userId) {
    if (!data || !data.DATA || !data.DATA.length) {
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_MISSING_DATA);
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

function changeStatusOnDemand(hl5_id, userId, cancelConfirmation) {
    var hl5 = dataHl5.getHl5ById(hl5_id);
    if (hl5.HL5_CRM_DESCRIPTION == L5_COPY_CRM_DESCRIPTION || hl5.HL5_CRM_DESCRIPTION == L5_CREATED_FROM_EVENT_REQUEST_CRM_DESCRIPTION) {
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_COULDNT_CHANGE_STATUS_INVALID_CRM_DESCRIPTION);
    }

    var existInCrm = dataHl5.hl5ExistsInCrm(hl5_id);
    var statusId = null;
    var isDataComplete = Number(hl5.IS_COMPLETE);
    if (hl5.HL5_STATUS_DETAIL_ID != HL5_STATUS.IN_CRM
        && hl5.HL5_STATUS_DETAIL_ID != HL5_STATUS.UPDATE_IN_CRM
        && hl5.HL5_STATUS_DETAIL_ID != HL5_STATUS.CREATE_IN_CRM) {
        if (!cancelConfirmation) {
            if (hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.VALID_FOR_CRM
                || hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.IN_PROGRESS) {

                if (!existInCrm) {
                    statusId = HL5_STATUS.CREATE_IN_CRM;
                } else {
                    var numChanges = level5DER.countL5ChangedFieldsByHL5Id(hl5_id);
                    statusId = numChanges > 0 ? HL5_STATUS.UPDATE_IN_CRM : HL5_STATUS.IN_CRM;
                }

            } else if (hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.IN_CRM_NEED_NEW_BUDGET_APPROVAL) {
                statusId = HL5_STATUS.IN_CRM;
            } else {
                statusId = hl5.HL5_STATUS_DETAIL_ID;
            }

        } else {
            statusId = HL5_STATUS.VALID_FOR_CRM;
        }

        if (!hl5.ALLOW_BUDGET_ZERO) {
            var budgetSpendRequestStatus = budgetSpendRequest.getBudgetSpendRequestsStatus();

            var ownMoneyBudgetSpendRequestStatus = budgetSpendRequest.getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(hl5_id, LEVEL_STRING);
            // var countApprovedCoFundedBudgetSpendRequestByHlIdLevel = !budgetSpendRequest.countApprovedCoFundedBudgetSpendRequestByHlIdLevel(hl5_id, LEVEL_STRING);
            //
            // throw JSON.stringify({ownMoneyBudgetSpendRequestStatus:ownMoneyBudgetSpendRequestStatus
            //     , countApprovedCoFundedBudgetSpendRequestByHlIdLevel:countApprovedCoFundedBudgetSpendRequestByHlIdLevel});

            if ((!ownMoneyBudgetSpendRequestStatus || (ownMoneyBudgetSpendRequestStatus && ownMoneyBudgetSpendRequestStatus != budgetSpendRequestStatus.APPROVED)
                    && !budgetSpendRequest.countApprovedCoFundedBudgetSpendRequestByHlIdLevel(hl5_id, LEVEL_STRING))) {
                throw ErrorLib.getErrors().CustomError("", "", L5_MSG_COULDNT_CHANGE_STATUS_DUE_OWN_MONEY_BUDGET_SPEND_REQUEST_STATUS);
            }
        }

        var data = JSON.parse(JSON.stringify(hl5));
        if (statusId == HL5_STATUS.VALID_FOR_CRM || statusId == HL5_STATUS.CREATE_IN_CRM || statusId == HL5_STATUS.UPDATE_IN_CRM) {
            var targetKpis = expectedOutcomesLib.getExpectedOutcomesByHl5Id(hl5_id, hl5.HL4_ID);
            var hl5Category = getCategoryOption(hl5_id);
            /*var data = JSON.parse(JSON.stringify(hl5));*/
            data.TARGET_KPIS = targetKpis;
            data.CATEGORIES = hl5Category;
            data.AUTOMATIC_APPROVAL = blLevel2.getHl2AllowAutomaticBudgetApprovalByHl4Id(data.HL4_ID);
            var internalCofunding = getInternalCofunding(hl5_id);
            var externalCofunding = getExternalCofunding(hl5_id);
            data.PARTNERS = externalCofunding.PARTNERS;
            data.SALE_REQUESTS = internalCofunding.SALE_REQUESTS;
            data.BUDGET_DISTRIBUTION = dataHl5.getHl5MyBudgetByHl5Id(hl5_id);
            isDataComplete = isComplete(data, true);
        }

        if (!isDataComplete || !validateBudget(data, true)) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_COULDNT_CHANGE_STATUS);
        }

        if (statusId == HL5_STATUS.CREATE_IN_CRM) {
            level5DER.deleteL5ChangedFieldsByHl5Id(hl5_id);
            data.HL2_ID = dataHl2.getHl2ByHl4Id(data.HL4_ID).HL2_ID;
            updateCategoryOption(data, hl5_id, userId, true);
            var aux = crmFieldsHaveChanged(data, 1, userId, true);
            insertInCrmBinding(aux.crmBindingChangedFields, [], hl5_id);
        }

        return setStatus(hl5_id, statusId, userId);
    }
    return true;
}

function getServiceRequestCategoryOptionByHl5Id(hl5Id) {
    var result = {};
    var serviceRequestCategoryOptionList = dataServiceRequest.getServiceRequestCategoryOptionByHlId(hl5Id, LEVEL_STRING);

    if (serviceRequestCategoryOptionList && serviceRequestCategoryOptionList.length) {
        var segmentationForms = blSegmentation.getSegmentationFormByHl5Id(hl5Id);
        for (var i = 0; i < serviceRequestCategoryOptionList.length; i++) {
            if (!result[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_ID]) {
                result[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_ID] = {
                    CATEGORY_NAME: serviceRequestCategoryOptionList[i].CATEGORY_NAME
                    , OPTIONS: []
                }
            }
            result[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_ID].OPTIONS.push({
                OPTION_NAME: serviceRequestCategoryOptionList[i].OPTION_NAME,
                SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID: serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID,
                IS_CHECKED: !!serviceRequestCategoryOptionList[i].IS_CHECKED,
                ASSOCIATED_FORM: serviceRequestCategoryOptionList[i].OPTION_NAME == 'Segmentation Request' ? 'SegmentationForm' : null,
                FORM: !!serviceRequestCategoryOptionList[i].IS_CHECKED ? segmentationForms[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID] : undefined,
                FORM_STATUS_DETAIL_ID: !!serviceRequestCategoryOptionList[i].IS_CHECKED && segmentationForms[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID] ?
                    segmentationForms[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID].FORM_STATUS_DETAIL_ID
                    : undefined
            });
        }
    }

    return util.objectToArray(result);
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

    var deReportDisplayName = level5DER.getProcessingReportFields();
    var crmBindingFields = {hl5: Object.keys(deReportDisplayName)};

    if (!data.HL5_ID) {
        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var parameters = {
                    "in_hl5_id": data.HL5_ID,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };
                crmBindingChangedFields.push(parameters);
            });
        });
    } else {
        var oldHl5 = dataHl5.getHL5VersionedById(data.HL5_ID); // TODO Change this to HL5Versioned
        oldHl5 = oldHl5 ? oldHl5 : {};
        var existInCrm = dataHl5.hl5ExistsInCrm(data.HL5_ID);
        var l5CrmBindigFields = util.getMapHl5ChangedFieldsByHl5Id(data.HL5_ID);

        // var debug = [];

        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var fieldChanged = false;
                var oldParentPath = '';
                var parentPath = '';
                if (field == "PARENT_PATH") {
                    oldParentPath = dataPath.getCrmParentPathByIdLevelId(LEVEL_STRING.toLowerCase(), data.HL5_ID)[0].PARENT_PATH;
                    parentPath = pathBL.getPathByLevelParentForCrm(LEVEL_STRING.toLowerCase(), data.HL4_ID);
                }
                var parameters = {
                    "in_hl5_id": data.HL5_ID,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };
                if (field.indexOf('_DATE') <= 0) {
                    switch (field) {
                        case "MARKETING_ACTIVITY_ID":
                            fieldChanged = (oldHl5[field] || 0) != (Number(data[field]) || 0);
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
                            fieldChanged = (oldHl5[field] || null) != (data[field] || null);
                            break;
                        case "HL5_CRM_DESCRIPTION":
                            fieldChanged = oldHl5.HL5_CRM_DESCRIPTION != data.CRM_DESCRIPTION;
                            break;
                        case "BUDGET":
                            var oldCurrencyValue = Number(dataCurrency.getCurrencyValueId(oldHl5.EURO_CONVERSION_ID));
                            var newCurrencyValue = Number(dataCurrency.getCurrencyValueId(data.EURO_CONVERSION_ID));

                            //When the HL5 is "In CRM", the budget can not change de status, but we need to validate it later to show the correct message.
                            if (Number(data.STATUS_DETAIL_ID) !== Number(HL5_STATUS.IN_CRM)) {
                                fieldChanged = Number(oldHl5[field]) / oldCurrencyValue != Number(data[field]) / newCurrencyValue;
                            } else {
                                fieldChanged = false;
                                budgetChanged = Number(oldHl5[field]) / oldCurrencyValue != Number(data[field]) / newCurrencyValue;
                            }

                            break;
                        default:
                            fieldChanged = oldHl5[field] != data[field];
                    }
                    /*if (field == 'BUDGET') {
                        var oldCurrencyValue = Number(dataCurrency.getCurrencyValueId(oldHl5.EURO_CONVERSION_ID));
                        var newCurrencyValue = Number(dataCurrency.getCurrencyValueId(data.EURO_CONVERSION_ID));
                        fieldChanged = Number(oldHl5[field]) / oldCurrencyValue != Number(data[field]) / newCurrencyValue;
                    } else {
                        fieldChanged = oldHl5[field] != data[field];
                    }*/
                } else {
                    fieldChanged = new Date(oldHl5[field]).valueOf() !== new Date(data[field]).valueOf();
                }

                if (isNew) {
                    fieldChanged = true;
                }
                // debug.push({field: field, fieldChanged: fieldChanged, oldParentPath: oldParentPath, parentPath: parentPath});
                if (fieldChanged || oldParentPath != parentPath || (field == "BUDGET" && budgetChanged)) {
                    if (field == "PARENT_PATH") {
                        if (oldParentPath) {
                            if (oldParentPath != parentPath) {
                                pathBL.updParentPath(LEVEL_STRING.toLowerCase(), data.HL5_ID, parentPath, userId);
                            }
                        } else {
                            pathBL.insParentPath(LEVEL_STRING.toLowerCase(), data.HL5_ID, data.HL4_ID, userId);
                        }
                    }

                    var in_hl5_crm_binding_id = l5CrmBindigFields[field] ? l5CrmBindigFields[field].HL5_CRM_BINDING_ID : null;

                    if (in_hl5_crm_binding_id) {
                        parameters.in_hl5_crm_binding_id = in_hl5_crm_binding_id;
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
    }

    return {
        crmFieldsHaveChanged: crmFieldsHaveChanged
        , crmBindingChangedFields: crmBindingChangedFields
        , crmBindingChangedFieldsUpdate: crmBindingChangedFieldsUpdate
        , budgetChanged: budgetChanged
        , onlyBudget: budgetChanged && !crmFieldsHaveChanged
    };
}

function getAllMarketingProgram() {
    return dataHl5.getAllMarketingProgram();
}

function getAllBusinessOwner() {
    return dataHl5.getAllBusinessOwner();
}

function getCostCenterByHl4IdMarketingOrganizationId(hl4Id, saleOrganizationId) {
    return dataHl5.getCostCenterByHl4IdMarketingOrganizationId(hl4Id, saleOrganizationId);
}

function getMarketingActivityHl5(hl4Id, currentHl5Id) {
    var budget_year_id = dataBudgetYear.getBudgetYearByHl4Id(hl4Id);
    return dataHl5.getMarketingActivityHl5(budget_year_id, currentHl5Id);
}

function delHl5DataImportByImportId(importId) {
    var hl5List = dataHl5.getHl5ByImportId(importId);
    for (var i = 0; i < hl5List.length; i++) {
        var hl5 = hl5List[i];
        //delete sales
        dataHl5.delHl5SaleHard(hl5.HL5_ID, true);
        //delete budget
        dataHl5.delHl5BudgetHard(hl5.HL5_ID, true);
        //delete hl5 category option
        dataHl5.delHl5CategoryOptionHl5Hard(hl5.HL5_ID, true);

        dataExOut.deleteHl5ExpectedOutcomesDetailHard(hl5.HL5_ID);
        dataExOut.deleteHl5ExpectedOutcomesHard(hl5.HL5_ID);

        //delete hl5
        dataHl5.delHl5Hard(hl5.HL5_ID, true);
    }
    return true;
}

/*function checkPermission(userSessionID, method, hl5Id) {
    if (((method && method == "GET_BY_HL5_ID") || !method) && !util.isSuperAdmin(userSessionID)) {
        var hl5 = dataHl5.getHl5ById(hl5Id);
        var hl4 = dataHl4.getHl4ById(hl5.HL4_ID);
        var l3 = dataHl3.getLevel3ById(hl4.HL3_ID, userSessionID);
        var usersL3 = userBL.getUserByHl3Id(hl4.HL3_ID, l3.HL2_ID).users_in;
        var users = usersL3.find(function (user) {
            return user.USER_ID == userSessionID
        });
        if (!users) {
            throw ErrorLib.getErrors().CustomError("", "", "User hasn´t permission for this resource.");
        }
    }
}*/

function findHLSalesId(Sales, OrganizationId, OrganizationType) {
    var hlSaleId = null;
    for (var i = 0; i < Sales.length; i++) {
        if (Sales[i].ORGANIZATION_ID == OrganizationId && Sales[i].ORGANIZATION_TYPE == OrganizationType) {
            hlSaleId = Sales[i].HL5_SALES_ID || Sales[i].SALES_ID;
            break;
        }
    }

    return hlSaleId;
}

function getNewSerialAcronym(Hl4_id) {
    var newSerial = 1;

    var listOfHl5 = dataHl5.getHl5ByHl4Id(Hl4_id, 0);

    var listSerials = listOfHl5.map(function (hl5) {
        var serial = hl5.ACRONYM.slice(-2);
        if (hl5.ACRONYM.indexOf(DRAFT_PEFIX) === 0 && !isNaN(serial)) {
            return serial//Number(serial)
        } else {
            return 0
        }
    }).sort();

    var serialList = JSON.parse(JSON.stringify(listSerials));
    var aux = listSerials.pop();

    newSerial = aux ? +aux + 1 : 1;

    if (newSerial > 99) {
        for (var i = 1; i < serialList.length; i++) {
            if (serialList[i] - serialList[i - 1] > 1) {
                newSerial = serialList[i - 1] ? +serialList[i - 1] + 1 : 1;
                break;
            }
        }

        if (newSerial > 99) {
            throw ErrorLib.getErrors().CustomError("", "", "It is not possible to create more Marketing Tactics for this Marketing Campaign.");
        }
    }

    return DRAFT_PEFIX + ('0' + newSerial).slice(-2);
}

function insertCategoryOption(data, userId) {
    var categoryOptionBulk = [];
    var countryCategoryOptionBulk = [];
    var mapCOL = util.getMapCategoryOption(LEVEL_STRING.toLowerCase());
    var mapCCOL = util.getMapCountryCategoryOption(LEVEL_STRING.toLowerCase(), data.HL2_ID);
    data.CATEGORIES.forEach(function (category) {
        category.OPTIONS.forEach(function (option) {
            var categoryOptionLevelId = category.CATEGORY_TYPE_ID == CATEGORY_TYPE.COUNTRY
                ? mapCCOL[category.CATEGORY_ID][option.OPTION_ID]
                : mapCOL[category.CATEGORY_ID][option.OPTION_ID];

            var categoryOption = {
                in_hl5_id: data.HL5_ID
                , in_category_option_level_id: categoryOptionLevelId
                , in_amount: Number(option.AMOUNT) || 0
                , in_amount_kpi: Number(option.AMOUNT_KPI) || 0
                , in_user_id: userId
                , in_updated: !!Number(option.AMOUNT) ? 1 : 0
            };

            if (category.CATEGORY_TYPE_ID == CATEGORY_TYPE.COUNTRY) {
                countryCategoryOptionBulk.push(categoryOption);
            } else {
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
                , in_hl5_id: data.HL5_ID
            };

            if (!option.CATEGORY_OPTION_ID) {
                // categoryOption.in_hl5_id = data.HL5_ID;
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

function insertBudgetDistribution(data, userId, cloned) {
    if (data.BUDGET_DISTRIBUTION) {
        var arrHl5Budget = [];
        data.BUDGET_DISTRIBUTION.forEach(function (myBudget) {
            arrHl5Budget.push({
                in_hl5_id: data.HL5_ID
                , in_organization_id: myBudget.ORGANIZATION_ID
                , in_percentage: !cloned ? (myBudget.PERCENTAGE || 0) : 0
                , in_organization_type: ORGANIZATION_TYPE[myBudget.ORGANIZATION_TYPE]
                , in_created_user_id: userId
            });
        });
        if (arrHl5Budget.length > 0)
            dataHl5.insertHl5Budget(arrHl5Budget);
    }
}

function updateBudgetDistribution(data, userId) {
    if (data.BUDGET_DISTRIBUTION) {
        dataHl5.delHl5BudgetHard(data.HL5_ID, userId);
        var arrHl5Budget = [];
        data.BUDGET_DISTRIBUTION.forEach(function (myBudget) {
            arrHl5Budget.push({
                in_hl5_id: data.HL5_ID
                , in_organization_id: myBudget.ORGANIZATION_ID
                , in_percentage: myBudget.PERCENTAGE
                , in_organization_type: ORGANIZATION_TYPE[myBudget.ORGANIZATION_TYPE]
                , in_created_user_id: userId
            });
        });
        if (arrHl5Budget.length > 0) {
            dataHl5.insertHl5Budget(arrHl5Budget);
        }
    }
}

function insertInternalCofunding(data, automaticBudgetApproval, userId) {
    var aux = {};
    if (data.SALES && data.SALES.length) {
        var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.SALE_CURRENCY_ID);
        var arrSaleHl5 = [];
        data.SALES.forEach(function (sale) {
            if (!aux[sale.ORGANIZATION_ID]) {
                arrSaleHl5.push({
                    in_hl5_id: data.HL5_ID
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
        if (arrSaleHl5.length) {
            dataHl5.insertHl5Sale(arrSaleHl5);
        }


        if (data.CO_FUNDED && data.SALE_REQUESTS && data.SALE_REQUESTS.length)
            budgetSpendRequest.insertSalesBudgetSpendRequest(data.SALE_REQUESTS, data.HL5_ID, LEVEL_STRING, internalCoFundingCurrency, automaticBudgetApproval, userId);
    }
}

function updateInternalCofunding(data, automaticBudgetApproval, userId) {

    if (data.SALES && data.SALES.length) {
        var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.SALE_CURRENCY_ID);
        var aux = {};
        var arrSaleHl5 = [];
        data.SALES.forEach(function (sale) {
            if (!aux[sale.ORGANIZATION_ID]) {
                arrSaleHl5.push({
                    in_hl5_sale_id: sale.HL5_SALE_ID || sale.SALES_ID
                    , in_description: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3 ? sale.DESCRIPTION : null
                    , in_currency_id: data.SALE_CURRENCY_ID
                    , in_user_id: userId
                });
                aux[sale.ORGANIZATION_ID] = sale.ORGANIZATION_TYPE;
            }
        });
        if (arrSaleHl5.length)
            dataHl5.updateHl5Sale(arrSaleHl5);

        data.SALE_REQUESTS.forEach(function (sr) {
            sr.HL_SALES_ID = findHLSalesId(data.SALES, sr.ORGANIZATION_ID, sr.ORGANIZATION_TYPE);
        });

        if (data.SALE_REQUESTS && data.SALE_REQUESTS.length) {
            budgetSpendRequest.updateSalesBudgetSpendRequest(data.SALE_REQUESTS, data.HL5_ID, LEVEL_STRING, internalCoFundingCurrency, automaticBudgetApproval, userId);
        }
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
            var budgetSpendRequestId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, data.HL5_ID, LEVEL_STRING, externalCoFundingCurrency, automaticBudgetApproval, userId);
            arrPartner.push({
                in_hl5_id: data.HL5_ID
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
            dataPartner.insertHl5Partner(arrPartner);
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
                var budgetSpendRequestId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, data.HL5_ID, LEVEL_STRING, externalCoFundingCurrency, automaticBudgetApproval, userId);
                arrPartnerToInsert.push({
                    in_hl5_id: data.HL5_ID
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
                    , in_status: partner.STATUS
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
            dataPartner.insertHl5Partner(arrPartnerToInsert);
        }

        if (arrPartnerToUpdate.length) {
            dataPartner.updatePartner(arrPartnerToUpdate, LEVEL_STRING);
        }

        if (budgetSpendRequestToUpdate.length)
            budgetSpendRequest.updatePartnerBudgetSpendRequest(budgetSpendRequestToUpdate, data.HL5_ID, LEVEL_STRING, automaticBudgetApproval, userId);
    }

    if (data.REMOVED_PARTNER_IDS && data.REMOVED_PARTNER_IDS.length) {
        var arrBudgetSpendRequestToDelete = [];
        var arrPartnerToDelete = data.REMOVED_PARTNER_IDS.map(function (id) {
            return {in_partner_id: id, in_user_id: userId};
        });
        var pendingPartner = dataPartner.getPendingPartnerByPartnerId(arrPartnerToDelete, LEVEL_STRING);
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
    if (data.TARGET_KPIS && Number(data.FORECAST_AT_L5)) {
        if (!data.TARGET_KPIS.KPIS.length && !data.TARGET_KPIS.COMMENTS)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CAMPAIGN_FORECASTING_KPIS_COMMENT);

        data.TARGET_KPIS.KPIS.forEach(function (hl5ExpectedOutcomesDetail) {
            if (hl5ExpectedOutcomesDetail.VOLUME_VALUE != 0 && !Number(hl5ExpectedOutcomesDetail.VOLUME_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CAMPAIGN_FORECASTING_KPIS_DETAILS);
            if (!hl5ExpectedOutcomesDetail.EURO_VALUE || !Number(hl5ExpectedOutcomesDetail.EURO_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO);
            if (!hl5ExpectedOutcomesDetail.OUTCOMES_ID || !Number(hl5ExpectedOutcomesDetail.OUTCOMES_ID))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CAMPAIGN_FORECASTING_KPIS_NOT_VALID);
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
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_MY_BUDGET);

    return isMyBudgetComplete(data.BUDGET_DISTRIBUTION);
}

function validateCategoryOption(data) {
    if (!data.CATEGORIES)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CATEGORY_NOT_EMPTY);

    if (!data.HL5_ID && data.CATEGORIES.length !== dataCategory.getAllocationCategoryCountByHlId(LEVEL_STRING.toLowerCase()))
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CATEGORY_INCORRECT_NUMBER);

    return isCategoryOptionComplete(data);
}

function insertExpectedOutcomes(data, userId) {

    var hl5ExpectedOutcomesId = dataExOut.insertHl5ExpectedOutcomes(data.HL5_ID, data.TARGET_KPIS.COMMENTS || '', userId);
    var mapEOL = expectedOutcomesLevelLib.getKpiTypeOptionMapByHlId(HIERARCHY_LEVEL.HL5);
    if (data.TARGET_KPIS.KPIS.length) {
        var hl5ExpectedOutcomesDetail = [];
        data.TARGET_KPIS.KPIS.forEach(function (expectedOutcomeDetail) {
            hl5ExpectedOutcomesDetail.push({
                in_hl5_expected_outcomes_id: hl5ExpectedOutcomesId,
                in_outcomes_id: mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID][expectedOutcomeDetail.OUTCOMES_ID],
                in_euro_value: expectedOutcomeDetail.EURO_VALUE,
                in_volume_value: Number(expectedOutcomeDetail.VOLUME_VALUE),
                in_created_user_id: userId
            });
        });

        dataExOut.insertHl5ExpectedOutcomesDetail(hl5ExpectedOutcomesDetail);
    }
}

function updateExpectedOutcomes(data, userId) {
    dataExOut.deleteHl5ExpectedOutcomesDetail(data.HL5_ID, userId);
    dataExOut.deleteHl5ExpectedOutcomes(data.HL5_ID, userId);
    if (data.FORECAST_AT_L5) {
        insertExpectedOutcomes(data, userId);
        dataExOut.deleteHl6ExpectedOutcomesByHl5Id(data.HL5_ID, userId);
    }
}

function getInternalCofunding(hl5Id) {
    var sale = JSON.parse(JSON.stringify(dataHl5.getHl5SalesByHl5Id(hl5Id)));
    var saleRequests = budgetSpendRequest.getHlSalesByHlId(hl5Id, LEVEL_STRING);
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

function getExternalCofunding(hl5Id) {
    var partner = partnerLib.getPartnerByHl5Id(hl5Id);
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

function getCategoryOption(hl5Id) {
    return allocationCategoryOptionLevelLib.getHlCategoryOptionByLevelHlId(LEVEL_STRING, hl5Id);
}

function getCategoryOptionVersioned(hl5Id) {
    return allocationCategoryOptionLevelLib.getHlCategoryOptionVersionedByLevelHlId(LEVEL_STRING, hl5Id);
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
            aux.SALES_ID = obj.HL5_SALES_ID;
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
    object.CRM_DESCRIPTION = object.HL5_CRM_DESCRIPTION;
    // object.HL5_CRM_DESCRIPTION = undefined;
    object.CO_FUNDED = !!object.CO_FUNDED;
    object.ALLOW_BUDGET_ZERO = !!object.ALLOW_BUDGET_ZERO;
    object.IS_POWER_USER = !!object.IS_POWER_USER;

    return object;
}

function clone(cloneHl5Id, userId) {
    var data = getHl5ById(cloneHl5Id);
    var currencyId = uploadLib.getDefaultCurrencyForBudgetYearByPath(data);
    data = uiToServerParser(data, true);
    data.STATUS_DETAIL_ID = HL5_STATUS.IN_PROGRESS;
    var acronym = getNewSerialAcronym(data.HL4_ID);
    data.CREATED_USER_ID = userId;
    data.CRM_DESCRIPTION = L5_COPY_CRM_DESCRIPTION;
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
    var hl5_id = insertDataHl5(acronym, data);
    pathBL.insParentPath(LEVEL_STRING.toLowerCase(), hl5_id, data.HL4_ID, userId);
    data.HL5_ID = hl5_id;
    data.HL2_ID = dataHl2.getHl2ByHl4Id(data.HL4_ID).HL2_ID;
    insertExpectedOutcomes(data, userId);
    insertBudgetDistribution(data, userId, true);
    insertInternalCofunding(data, null, userId);
    insertCategoryOption(data, userId);
    return {CRM_ID: dataPath.getPathByLevelHlId(LEVEL_STRING.toLowerCase(), hl5_id)};
}

function addChildPermission(id) {
    var result = dataHl5.getHl5StatusByHl5Id(id);
    var statusId = result ? result.HL5_STATUS_DETAIL_ID : 0;
    return statusId != HL5_STATUS.DELETED_IN_CRM;
}

function getStatusEnum() {
    return HL5_STATUS;
}

function getActionPermission(hl5, userId, isSuperAdmin) {
    var HL4_STATUS = level4Lib.getStatusEnum();
    var enableDeletion = Number(hl5.STATUS_ID || hl5.STATUS_DETAIL_ID) !== HL5_STATUS.CREATE_IN_CRM
        && Number(hl5.STATUS_ID || hl5.STATUS_DETAIL_ID) !== HL5_STATUS.UPDATE_IN_CRM
        && Number(hl5.STATUS_ID || hl5.STATUS_DETAIL_ID) !== HL5_STATUS.DELETION_REQUEST
        && Number(hl5.STATUS_ID || hl5.STATUS_DETAIL_ID) !== HL5_STATUS.DELETED_IN_CRM;

    var enableChangeStatus = Number(hl5.STATUS_ID || hl5.STATUS_DETAIL_ID) !== HL5_STATUS.IN_CRM
        && Number(hl5.STATUS_ID || hl5.STATUS_DETAIL_ID) !== HL5_STATUS.CREATE_IN_CRM
        && Number(hl5.STATUS_ID || hl5.STATUS_DETAIL_ID) !== HL5_STATUS.UPDATE_IN_CRM
        && Number(hl5.STATUS_ID || hl5.STATUS_DETAIL_ID) !== HL5_STATUS.DELETION_REQUEST
        && Number(hl5.STATUS_ID || hl5.STATUS_DETAIL_ID) !== HL5_STATUS.DELETED_IN_CRM
        && Number(hl5.PARENT_STATUS_ID) !== HL4_STATUS.DELETED_IN_CRM;

    var enableEdition = util.getEnableEdit(hl5.STATUS_ID || hl5.STATUS_DETAIL_ID, HL5_STATUS, userId, isSuperAdmin, hl5.PARENT_STATUS_ID);

    var enableClone = Number(hl5.STATUS_ID || hl5.STATUS_DETAIL_ID) !== HL5_STATUS.DELETED_IN_CRM
        && Number(hl5.PARENT_STATUS_ID) !== HL4_STATUS.DELETED_IN_CRM;

    var result = {};

    result.ENABLE_DELETION = enableDeletion;
    result.ENABLE_CHANGE_STATUS = enableChangeStatus;
    result.ENABLE_EDIT = enableEdition;
    result.ENABLE_CLONE = enableClone;

    return result
}

function createFromEventRequest(eventRequest) {
    var newHl5 = {};
    var CURRENCY_ID = uploadLib.getDefaultCurrencyForBudgetYearByPath(eventRequest);
    eventRequest = completeCategories(eventRequest);
    newHl5.HL2_ID = dataHl2.getHl2ByHl4Id(eventRequest.HL4_ID).HL2_ID;
    newHl5.HL4_ID = eventRequest.HL4_ID;
    newHl5.ACRONYM = getNewSerialAcronym(eventRequest.HL4_ID);
    newHl5.CURRENCY_ID = CURRENCY_ID;
    newHl5.BUDGET = 0;
    newHl5.ALLOW_BUDGET_ZERO = 0;
    newHl5.CO_FUNDED = 0;
    newHl5.IS_COMPLETE = 0;
    newHl5.IMPORTED = 0;
    newHl5.IMPORT_ID = null;
    newHl5.SALE_REQUESTS = null;
    newHl5.STATUS_DETAIL_ID = HL5_STATUS.IN_PROGRESS;
    newHl5.CRM_DESCRIPTION = L5_CREATED_FROM_EVENT_REQUEST_CRM_DESCRIPTION;
    newHl5.EURO_CONVERSION_ID = CURRENCY_ID;
    newHl5.SALE_CURRENCY_ID = CURRENCY_ID;
    //data from event request
    newHl5.CREATED_USER_ID = eventRequest.CREATED_USER_ID;
    newHl5.ACTUAL_START_DATE = eventRequest.START_DATE;
    newHl5.ACTUAL_END_DATE = eventRequest.END_DATE;
    newHl5.CITY = eventRequest.CITY;
    newHl5.COUNTRY_ID = eventRequest.COUNTRY_ID;
    newHl5.VENUE = eventRequest.VENUE;
    newHl5.EVENT_OWNER = eventRequest.EVENT_OWNER;
    newHl5.NUMBER_OF_PARTICIPANTS = eventRequest.PARTICIPANTS_NUMBER;
    newHl5.CAMPAIGN_OBJECTIVE_ID = eventRequest.OBJECTIVE_ID;
    newHl5.CAMPAIGN_TYPE_ID = eventRequest.CAMPAIGN_TYPE_ID;
    newHl5.CAMPAIGN_SUBTYPE_ID = eventRequest.CAMPAIGN_SUB_TYPE_ID;
    newHl5.CATEGORIES = eventRequest.CATEGORIES;
    newHl5.IN_BUDGET = 0;
    newHl5.INHERITED_CREATION = 1;
    newHl5.FORECAST_AT_L5 = 1;
    newHl5.BUDGET_SPEND_Q1 = 100;
    newHl5.BUDGET_SPEND_Q2 = 0;
    newHl5.BUDGET_SPEND_Q3 = 0;
    newHl5.BUDGET_SPEND_Q4 = 0;
    //create new L5
    var hl5_id = insertDataHl5(newHl5.ACRONYM, newHl5);
    pathBL.insParentPath(LEVEL_STRING.toLowerCase(), hl5_id, newHl5.HL4_ID, newHl5.CREATED_USER_ID);
    newHl5.HL5_ID = hl5_id;
    insertCategoryOption(newHl5, newHl5.CREATED_USER_ID);

    //inserts budget regions
    var regions = blRegion.getAllRegions();
    var centralTeams = blLevel2.getAllCentralTeam(0);

    regions.forEach(function (myBudget) {
        myBudget.HL5_ID = hl5_id;
        dataHl5.insertHl5BudgetSalesUpload(myBudget.HL5_ID, myBudget.REGION_ID, 0, ORGANIZATION_TYPE["REGIONAL"], "", newHl5.CREATED_USER_ID, newHl5.EURO_CONVERSION_ID);
    });

    centralTeams.forEach(function (sale) {
        sale.HL5_ID = hl5_id;
        dataHl5.insertHl5BudgetSalesUpload(sale.HL5_ID, sale.HL2_ID, 0, ORGANIZATION_TYPE["CENTRAL"], "", newHl5.CREATED_USER_ID, newHl5.EURO_CONVERSION_ID);
    });

    //insert sale other data
    dataHl5.insertHl5Sale([{
        in_hl5_id: hl5_id,
        in_organization_id: null,
        in_amount: 0,
        in_organization_type: ORGANIZATION_TYPE["OTHER"],
        in_description: "Other",
        in_currency_id: newHl5.EURO_CONVERSION_ID,
        in_created_user_id: newHl5.CREATED_USER_ID
    }]);

    return hl5_id;
}

function completeCategories(eventRequest) {
    var fullCategory = [];
    var categories = JSON.parse(JSON.stringify(allocationCategory.getCategoryOptionByHierarchyLevelId(2, eventRequest.HL4_ID)));
    categories.forEach(function (category) {
        var alreadyPushed = false;
        eventRequest.CATEGORIES.forEach(function (erCategory) {
            if (category.CATEGORY_ID == erCategory.CATEGORY_ID) {
                erCategory.OPTIONS.forEach(function (option) {
                    option.AMOUNT = option.PERCENTAGE;
                });
                alreadyPushed = true;
                fullCategory.push(erCategory);
            }
        });
        if (!alreadyPushed) {
            fullCategory.push(category);
        }
    });
    eventRequest.CATEGORIES = fullCategory;
    return eventRequest;
}

function insertInCrmVersion(hl5Id) {
    // Save the version of HL6 IN_CRM o UPDATE_IN_CRM to compare later
    var hl5VersionedId = dataHl5.insertHl5VersionInCRM(hl5Id);
    // Save the version of CategoryOptions IN_CRM o UPDATE_IN_CRM to compare later
    dataCategoryOptionLevel.insertCategoryOptionVersioned("HL5", hl5Id, hl5VersionedId);
    // Save the version of Country-CategoryOptions IN_CRM o UPDATE_IN_CRM to compare later
    return dataCategoryOptionLevel.insertCountryCategoryOptionVersioned("HL5", hl5Id, hl5VersionedId);
}