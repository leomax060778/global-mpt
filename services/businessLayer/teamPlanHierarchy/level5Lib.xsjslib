/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataL5DER = mapper.getDataLevel5Report();
var dataHl3 = mapper.getDataLevel3();
var dataHl4 = mapper.getDataLevel4();
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
/*************************************************/

var levelCampaign = "Marketing Tactic ";
var L5_MSG_INITIATIVE_NOT_FOUND = "The Marketing Tactic ID can not be found.";
var L5_MSG_USER_NOT_FOUND = "The User can not be found.";
var L5_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L5_MSG_CANNOT_DEL_STATUS = "Cannot delete this selected Marketing Tactic, because the status doesn´t allow it.";
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
var L5_MSG_INITIATIVE_PROPERTIES_CANNOT_UPDATE = "Once Marketing Tactic is already in CRM, properties CRM ID, Cost Center and Markting Organization cannot be modified.";
var L5_MY_BUDGET_COMPLETE = "My Budget should be 100% complete.";
var L5_COST_CENTER_NOT_VALID = "Cost Center cannot be empty.";
var L5_RESPONSIBLE_NOT_VALID = "Employee Responsible cannot be empty.";
var L5_PRIORITY_NOT_VALID = "Priority cannot be empty.";
var L5_MSG_INITIATIVE_CRM_ACRONYM = "The Acronym has been used. The new Serial Acronym is: ";


var HL5_STATUS = {
    IN_PROGRESS: 1,
    CREATE_IN_CRM: 2,
    IN_CRM: 3,
    UPDATE_IN_CRM: 4,
    EXCEED_BUDGET: 5,
    COMPLETE: 6,
    VALID_FOR_CRM: 7
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

var HIERARCHY_LEVEL = {
    HL2: 5,
    HL3: 4,
    HL4: 1,
    HL5: 2,
    HL6: 3
};

var DRAFT_PEFIX = 'DRAFT';

/** ****************END CONSTANTS***************** */

function getHl5ByHl4Id(id) {
    level4Lib.getImplementExecutionLevel(id);
    var hl5List = dataHl5.getHl5ByHl4Id(id);
    var hl5TotalBudget = 0;
    var totalAllocated = 0;
    var hl5BudgetRemaining = 0;
    var allHl5 = [];
    if (hl5List.length) {
        hl5List = JSON.parse(JSON.stringify(hl5List));
        hl5List.forEach(function (hl5) {
            hl5.ENABLE_DELETION = Number(hl5.STATUS_ID) !== HL5_STATUS.IN_CRM && Number(hl5.STATUS_ID) !== HL5_STATUS.UPDATE_IN_CRM && Number(hl5.STATUS_ID) !== HL5_STATUS.CREATE_IN_CRM;
            hl5.ENABLE_CHANGE_STATUS = Number(hl5.STATUS_ID) !== HL5_STATUS.IN_CRM && Number(hl5.STATUS_ID) !== HL5_STATUS.UPDATE_IN_CRM && Number(hl5.STATUS_ID) !== HL5_STATUS.CREATE_IN_CRM;
            hl5.ENABLE_EDIT = Number(hl5.STATUS_ID) !== HL5_STATUS.UPDATE_IN_CRM && Number(hl5.STATUS_ID) !== HL5_STATUS.CREATE_IN_CRM;
        });
        hl5TotalBudget = dataHl4.getHl4ById(id).HL4_FNC_BUDGET_TOTAL_MKT;
        totalAllocated = dataHl5.getHl5TotalBudgetByHl4Id(id);
        hl5BudgetRemaining = hl5TotalBudget - totalAllocated;
    }

    var response = {
        "results": hl5List,
        "total_budget": hl5TotalBudget,
        "remaining_budget": hl5BudgetRemaining,
        "total_allocated": totalAllocated
    };
    response.budget_year = budgetYear.getBudgetYearByLevelParent(5, id, true);
    return response;
}

function getHl5ById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "", L5_MSG_INITIATIVE_NOT_FOUND);

    var hl5 = JSON.parse(JSON.stringify(dataHl5.getHl5ById(id)));

    var currencyValueAux = dataCurrency.getCurrencyValueId(hl5.EURO_CONVERSION_ID);
    currencyValueAux = Number(currencyValueAux);

    var partner = partnerLib.getPartnerByHl5Id(id);
    var myBudget = dataHl5.getHl5MyBudgetByHl5Id(id);
    var sale = dataHl5.getHl5SalesByHl5Id(id);
    var saleRequests = budgetSpendRequest.getHlSalesByHlId(id, 'HL5');
    // var saleRequests = databudgetSpendRequest.getHlSalesByHlId(id, 'HL5');

    var saleRequestsFiltered = saleRequests.filter(function (request) {
        return !!Number(request.AMOUNT);
    });

    var totalAmount = 0;

    sale = JSON.parse(JSON.stringify(sale));

    var saleCurrencyValue = (Number(sale[0].CURRENCY_VALUE)).toFixed(2);
    var saleCurrencyId = sale[0].CURRENCY_ID;

    sale.forEach(function (elem) {
        elem.AMOUNT = Number(elem.AMOUNT).toFixed(2);
        totalAmount = totalAmount + Number(elem.AMOUNT);
    });

    var hl5_category = getHl5CategoryOption(id);
    var hl5_service_request_category_option = getServiceRequestCategoryOptionByHl5Id(id);

    hl5.in_totalbudget = (Number(hl5.BUDGET) + (partner.total ? (partner.total / partner.partnerCurrencyValue) : 0) + Number(totalAmount) + partner.totalExternal / saleCurrencyValue).toFixed(2);
    hl5.IS_IN_CRM = !!dataHl5.hl5ExistsInCrm(id);
    hl5.BUDGET = Number(hl5.BUDGET) * currencyValueAux;

    var result = {
        "hl5": hl5,
        "expectedOutcomes": getExpectedOutcomesByHl5Id(id, hl5.HL4_ID),
        "partner": {
            partnerRequests: partner.partners,
            total: partner.total,
            partnerRequestsCurrencyId: partner.partnerCurrencyId,
            totalExternal: partner.totalExternal
        },
        "myBudget": myBudget,
        "sale": {
            saleRequests: sale,
            total: totalAmount,
            saleRequestsCurrencyId: saleCurrencyId,
            salesRequestLoaded: saleRequestsFiltered
        },
        "hl5_category": hl5_category,
        "hl5_service_request_category_option": hl5_service_request_category_option
    };
    return serverToUiParser(result);
}

function getHl5ByUserId(userId, isMarketingTacticView) {
    var crm = 'CRM-';
    var hl5List;
    if(isMarketingTacticView){
        var isAdmin = util.isAdmin(userId);
        var isSuperAdmin = util.isSuperAdmin(userId);
        if(isAdmin || isSuperAdmin){
            hl5List = dataHl5.getHl5ByUserIdRoleFilter(userId);
        }else{
            hl5List = dataHl5.getHl5ByUserId(userId, util.isSuperAdmin(userId) ? 1 : 0);
        }
    }else{
        hl5List = dataHl5.getHl5ByUserId(userId, util.isSuperAdmin(userId) ? 1 : 0);
    }

    var result = {};
    var requestResult = {results: []};

    if (hl5List.length) {
        for (var i = 0; i < hl5List.length; i++) {
            if (!result[hl5List[i].HL4_ID]) {
                result[hl5List[i].HL4_ID] = {
                    PARENT_ID: hl5List[i].HL4_ID
                    , PARENT_PATH: hl5List[i].HL4_PATH
                    , CHILDREN: []
                };
                if (hl5List[i].HL5_ID) {
                    result[hl5List[i].HL4_ID].CHILDREN.push({
                        HL5_ID: hl5List[i].HL5_ID
                        , HL5_PATH: hl5List[i].HL4_PATH + "-" + hl5List[i].HL5_ACRONYM
                        , STATUS_DETAIL: hl5List[i].STATUS_DETAIL
                        , CREATED_BY: hl5List[i].CREATED_BY
                        , HL5_BUDGET: hl5List[i].HL5_BUDGET
                        , TOTAL_HL6: hl5List[i].TOTAL_HL6
                        , QUANTITY_HL6_OUT_BUDGET: hl5List[i].QUANTITY_HL6_OUT_BUDGET
                        , ALLOCATED: hl5List[i].ALLOCATED
                        , REMAINING: hl5List[i].REMAINING
                        , IMPORTED: hl5List[i].IMPORTED
                        , CRM_DESCRIPTION: hl5List[i].CRM_DESCRIPTION
                        , BUDGET_SPEND_REQUEST_STATUS_ID: hl5List[i].BUDGET_SPEND_REQUEST_STATUS_ID
                        , BUDGET_SPEND_REQUEST_STATUS: hl5List[i].BUDGET_SPEND_REQUEST_STATUS
                        , ENABLE_DELETION: Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.CREATE_IN_CRM && Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.IN_CRM && Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.UPDATE_IN_CRM
                        , ENABLE_CHANGE_STATUS: Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.CREATE_IN_CRM && Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.IN_CRM && Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.UPDATE_IN_CRM
                        , ENABLE_EDIT: Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.CREATE_IN_CRM && Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.UPDATE_IN_CRM
                        , IN_CRM_CHILD: hl5List[i].IN_CRM_CHILD
                    })
                }
            } else if (hl5List[i].HL5_ID) {
                result[hl5List[i].HL4_ID].CHILDREN.push({
                    HL5_ID: hl5List[i].HL5_ID
                    , HL5_PATH: hl5List[i].HL4_PATH + "-" + hl5List[i].HL5_ACRONYM
                    , STATUS_DETAIL: hl5List[i].STATUS_DETAIL
                    , CREATED_BY: hl5List[i].CREATED_BY
                    , HL5_BUDGET: hl5List[i].HL5_BUDGET
                    , TOTAL_HL6: hl5List[i].TOTAL_HL6
                    , QUANTITY_HL6_OUT_BUDGET: hl5List[i].QUANTITY_HL6_OUT_BUDGET
                    , ALLOCATED: hl5List[i].ALLOCATED
                    , REMAINING: hl5List[i].REMAINING
                    , IMPORTED: hl5List[i].IMPORTED
                    , CRM_DESCRIPTION: hl5List[i].CRM_DESCRIPTION
                    , BUDGET_SPEND_REQUEST_STATUS_ID: hl5List[i].BUDGET_SPEND_REQUEST_STATUS_ID
                    , BUDGET_SPEND_REQUEST_STATUS: hl5List[i].BUDGET_SPEND_REQUEST_STATUS
                    , ENABLE_DELETION: Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.CREATE_IN_CRM && Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.IN_CRM && Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.UPDATE_IN_CRM
                    , ENABLE_CHANGE_STATUS: Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.CREATE_IN_CRM && Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.IN_CRM && Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.UPDATE_IN_CRM
                    , ENABLE_EDIT: Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.CREATE_IN_CRM && Number(hl5List[i].STATUS_DETAIL_ID) !== HL5_STATUS.UPDATE_IN_CRM
                    , IN_CRM_CHILD: hl5List[i].IN_CRM_CHILD
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
    var results = dataHl5.getHl5ForSearch(budgetYearId, regionId || 0, subRegionId || 0, limit, offset || 0, userSessionID, util.isSuperAdmin(userSessionID) ? 1 : 0);
    results = JSON.parse(JSON.stringify(results));
    results.result.forEach(function (elem) {
        elem.ENABLE_EDIT = (Number(elem.HL5_STATUS_DETAIL_ID) !== HL5_STATUS.CREATE_IN_CRM) && (Number(elem.HL5_STATUS_DETAIL_ID) !== HL5_STATUS.UPDATE_IN_CRM);
    });
    return results;
}

function insertExpectedOutcomes(userId, hl5_id, data) {
    var outcome = {};
    outcome.CREATED_USER_ID = userId;
    outcome.HL5_ID = hl5_id;
    outcome.COMMENTS = data.hl5_expected_outcomes.COMMENTS || "";
    var hl5_expected_outcomes_id = dataExOut.insertHl5ExpectedOutcomes(outcome.HL5_ID, outcome.COMMENTS, outcome.CREATED_USER_ID);
    var hl5ExpectedOutcomesDetail = [];
    data.hl5_expected_outcomes.hl5_expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
        var hl5Detail = {
            in_hl5_expected_outcomes_id: hl5_expected_outcomes_id,
            in_outcomes_id: dataExOut.getExpectedOutcomeLevelByLevelAndOptionId(HIERARCHY_LEVEL.HL5, expectedOutcomeDetail.OUTCOMES_ID).EXPECTED_OUTCOME_LEVEL_ID,
            in_euro_value: expectedOutcomeDetail.EURO_VALUE,
            in_volume_value: Number(expectedOutcomeDetail.VOLUME_VALUE),
            in_created_user_id: userId
        };
        hl5ExpectedOutcomesDetail.push(hl5Detail);
    });

    if (hl5ExpectedOutcomesDetail.length)
        dataExOut.insertHl5ExpectedOutcomesDetail(hl5ExpectedOutcomesDetail);
}

function updateExpectedOutcomes(userId, hl5_id, data) {
    dataExOut.deleteHl5ExpectedOutcomesDetail(hl5_id, userId);
    dataExOut.deleteHl5ExpectedOutcomes(hl5_id, userId);

    var outcome = {};
    outcome.CREATED_USER_ID = userId;
    outcome.HL5_ID = hl5_id;
    outcome.COMMENTS = data.hl5_expected_outcomes.COMMENTS || "";
    var hl5_expected_outcomes_id = dataExOut.insertHl5ExpectedOutcomes(outcome.HL5_ID, outcome.COMMENTS, outcome.CREATED_USER_ID);
    var hl5ExpectedOutcomesDetail = [];
    data.hl5_expected_outcomes.hl5_expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
        var hl5Detail = {
            in_hl5_expected_outcomes_id: hl5_expected_outcomes_id,
            in_outcomes_id: dataExOut.getExpectedOutcomeLevelByLevelAndOptionId(HIERARCHY_LEVEL.HL5, expectedOutcomeDetail.OUTCOMES_ID).EXPECTED_OUTCOME_LEVEL_ID,
            in_euro_value: expectedOutcomeDetail.EURO_VALUE,
            in_volume_value: Number(expectedOutcomeDetail.VOLUME_VALUE),
            in_created_user_id: userId
        };
        hl5ExpectedOutcomesDetail.push(hl5Detail);
    });
    if (hl5ExpectedOutcomesDetail.length)
        dataExOut.insertHl5ExpectedOutcomesDetail(hl5ExpectedOutcomesDetail);
}

function insertHl5(data, userId) {

    var mapCOL = util.getMapCategoryOption('hl5');//Set Map for Category Option Level

    var hl5_id = 0;
    data = uiToServerParser(data);
    level4Lib.getImplementExecutionLevel(data.hl5.HL4_ID);

    var validationResult = validateHl5(data, userId);


    /* ------deprecated-------
    var OldAcronym = data.hl5.ACRONYM.slice(-2);
    if (OldAcronym != newAcronym) {
        var error = ErrorLib.getErrors().AcronymError("", "", L5_MSG_INITIATIVE_CRM_ACRONYM  + newAcronym);
        error.data = newAcronym;
        error.level = 'HL5';
        throw error;
    }
    */


    data.hl5.HL5_STATUS_DETAIL_ID = validationResult.statusId;


    if (data.hl5.HL5_STATUS_DETAIL_ID > 0) {
        var conversionValue = dataCurrency.getCurrencyValueId(data.hl5.EURO_CONVERSION_ID);
        var acronym = data.hl5.ACRONYM || getNewSerialAcronym(data.hl5.HL4_ID);
        data.hl5.IN_BUDGET = checkBudgetStatus(data.hl5.HL4_ID, hl5_id, Number(data.hl5.BUDGET) / conversionValue);

        data.hl5.BUDGET_SPEND_Q1 = Number(data.hl5.BUDGET_SPEND_Q1);
        data.hl5.BUDGET_SPEND_Q2 = Number(data.hl5.BUDGET_SPEND_Q2);
        data.hl5.BUDGET_SPEND_Q3 = Number(data.hl5.BUDGET_SPEND_Q3);
        data.hl5.BUDGET_SPEND_Q4 = Number(data.hl5.BUDGET_SPEND_Q4);
        data.hl5.BUDGET = Number(data.hl5.BUDGET) / conversionValue;

        data.hl5.CREATED_USER_ID = userId;
        hl5_id = dataHl5.insertHl5(
            data.hl5.HL5_CRM_DESCRIPTION || 'N/D'
            , acronym
            , data.hl5.DISTRIBUTION_CHANNEL_ID || 0
            , data.hl5.BUDGET
            , data.hl5.HL4_ID
            , data.hl5.CAMPAIGN_OBJECTIVE_ID || 0
            , data.hl5.CAMPAIGN_TYPE_ID || 0
            , data.hl5.CAMPAIGN_SUBTYPE_ID || 0
            , data.hl5.MARKETING_PROGRAM || 0
            , data.hl5.MARKETING_ACTIVITY || 0
            , data.hl5.ACTUAL_START_DATE || null
            , data.hl5.ACTUAL_END_DATE || null
            , data.hl5.SHOW_ON_DG_CALENDAR || 0
            , data.hl5.BUSINESS_OWNER_ID || 0
            , data.hl5.EMPLOYEE_RESPONSIBLE_ID || 0
            , data.hl5.COST_CENTER_ID || 0
            , data.hl5.IN_BUDGET
            , data.hl5.BUDGET_SPEND_Q1 || 0
            , data.hl5.BUDGET_SPEND_Q2 || 0
            , data.hl5.BUDGET_SPEND_Q3 || 0
            , data.hl5.BUDGET_SPEND_Q4 || 0
            , data.hl5.EURO_CONVERSION_ID
            , data.hl5.HL5_STATUS_DETAIL_ID
            , data.hl5.CREATED_USER_ID
            , data.hl5.ROUTE_TO_MARKET_ID || 0
            , data.hl5.VENUE
            , data.hl5.CITY
            , data.hl5.COUNTRY
            , data.hl5.URL
            , data.hl5.SALES_ORGANIZATION_ID || 0
            , data.hl5.PLANNED_START_DATE || null
            , data.hl5.PLANNED_END_DATE || null
            , data.hl5.STREET
            , data.hl5.POSTAL_CODE
            , data.hl5.REGION
            , data.hl5.EVENT_OWNER
            , data.hl5.NUMBER_OF_PARTICIPANTS
            , data.hl5.PRIORITY_ID || 0
            , data.hl5.CO_FUNDED
            , data.hl5.ALLOW_BUDGET_ZERO
            , Number(data.hl5.IS_POWER_USER) === 0 ? 0 : 1
            , data.hl5.EMPLOYEE_RESPONSIBLE_USER
            , data.hl5.PERSON_RESPONSIBLE
            , data.hl5.IS_COMPLETE
            , data.MULTI_TACTIC
        );
        if (hl5_id > 0) {
            var automaticBudgetApproval = blLevel2.getHl2AllowAutomaticBudgetApprovalByHl4Id(data.hl5.HL4_ID) && data.hl5.IN_BUDGET && !!Number(data.hl5.BUDGET);// && !Number(data.hl5.ALLOW_BUDGET_ZERO);
            budgetSpendRequest.insertOwnMoneyBudgetSpendRequest(data.hl5.BUDGET, hl5_id, 'HL5', userId, automaticBudgetApproval);

            var mapCOL = util.getMapCategoryOption('hl5');//Set Map for Category Option Level

            insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, hl5_id);

            pathBL.insParentPath('hl5', hl5_id, data.hl5.HL4_ID, userId);

            data.hl5.HL5_ID = hl5_id;

            setHl5Status(hl5_id, data.hl5.HL5_STATUS_DETAIL_ID, userId);

            insertExpectedOutcomes(userId, hl5_id, data);

            if (data.hl5_budget) {
                var arrHl5Budget = [];
                data.hl5_budget.forEach(function (myBudget) {

                    arrHl5Budget.push({
                        in_hl5_id: hl5_id
                        , in_organization_id: myBudget.ORGANIZATION_ID
                        , in_percentage: myBudget.PERCENTAGE
                        , in_organization_type: ORGANIZATION_TYPE[myBudget.ORGANIZATION_TYPE]
                        , in_created_user_id: userId
                    });
                });
                if (arrHl5Budget.length > 0)
                    dataHl5.insertHl5Budget(arrHl5Budget);
            }

            var aux = {};
            if (data.hl5_sale && data.hl5_sale.length) {
                var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.SALE_CURRENCY_ID);
                var arrSaleHl5 = [];
                data.hl5_sale.forEach(function (sale) {
                    if (!aux[sale.ORGANIZATION_ID]) {
                        arrSaleHl5.push({
                            in_hl5_id: hl5_id
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


                if (data.hl5.CO_FUNDED && data.saleRequests && data.saleRequests.length)

                    budgetSpendRequest.insertSalesBudgetSpendRequest(data.saleRequests, hl5_id, 'HL5', internalCoFundingCurrency, userId);
            }

            if (data.hl5.CO_FUNDED && data.partners && data.partners.length) {
                var arrPartner = [];
                var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.PARTNER_CURRENCY_ID);
                data.partners.forEach(function (partner) {
                    if (Number(partner.AMOUNT) && partner.MESSAGE) {
                        var budgetSpendRequestId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, hl5_id, 'HL5', internalCoFundingCurrency, userId);
                        arrPartner.push({
                            in_hl5_id: hl5_id
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
                            in_claim_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.CLAIM_ID : null
                            ,
                            in_comments: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.COMMENTS : null
                            ,
                            in_company_name: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_NAME : null
                            ,
                            in_company_address: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_ADDRESS : null
                            ,
                            in_invoice_number: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.INVOICE_NUMBER ? partner.INVOICE_NUMBER : null
                        });
                    }
                });
                if (arrPartner.length)
                    dataPartner.insertHl5Partner(arrPartner);
            }

            var categoryOptionBulk = [];
            data.hl5_category.forEach(function (hl5Category) {
                if (hl5Category.hl5_category_option && hl5Category.hl5_category_option.length) {
                    hl5Category.hl5_category_option.forEach(function (hl5CategoryOption) {
                        hl5CategoryOption.CREATED_USER_ID = userId;
                        hl5CategoryOption.AMOUNT = hl5CategoryOption.AMOUNT || 0;
                        hl5CategoryOption.UPDATED = hl5CategoryOption.AMOUNT ? 1 : 0;
                        hl5Category.categoryOptionLevelId = mapCOL[hl5Category.CATEGORY_ID][hl5CategoryOption.OPTION_ID];
                        categoryOptionBulk.push({
                            in_hl5_id: hl5_id
                            , in_category_option_level_id: hl5Category.categoryOptionLevelId
                            , in_amount: hl5CategoryOption.AMOUNT
                            , in_user_id: userId
                            , in_updated: hl5CategoryOption.UPDATED
                        });
                    });
                } else {
                    var allocationOptions = AllocationOptionLib.getAssignedOptionByCategoryIdByLevelId(hl5Category.CATEGORY_ID, HIERARCHY_LEVEL.HL5, true);
                    allocationOptions.forEach(function (option) {
                        hl5Category.categoryOptionLevelId = mapCOL[hl5Category.CATEGORY_ID][option.OPTION_ID];
                        categoryOptionBulk.push({
                            in_hl5_id: hl5_id
                            , in_category_option_level_id: hl5Category.categoryOptionLevelId
                            , in_amount: 0
                            , in_user_id: userId
                            , in_updated: 0
                        });
                    });
                }
            });
            dataCategoryOptionLevel.insertCategoryOption(categoryOptionBulk, 'hl5');

            insertHl5RequestCategoryOption(hl5_id, data.hl5_service_request_category_option, userId);
        }
        dataL5Report.updateLevel5ReportForDownload(hl5_id); //Update Processing Report Export Data
        if (data.hl5.ACRONYM) {
            return hl5_id;
        } else {
            return {CRM_ID: 'CRM-' + pathBL.getCleanPathByLevelParent(5, data.hl5.HL4_ID).PATH_TPH + acronym}
        }
    }
}

function insertHl5RequestCategoryOption(hl5Id, requestCategoryOption, userId) {
    if (requestCategoryOption && requestCategoryOption.length) {
        var request = [];
        requestCategoryOption.forEach(function (option) {
            request.push({
                in_hl5_id: hl5Id
                , in_request_category_option_id: option.ID
                , in_user_id: userId
            });

            if (option.FORM && option.FORM_NAME) {
                option.FORM.HL5_ID = hl5Id;
                option.FORM.FORM_STATUS_DETAIL_ID = option.FORM_STATUS_DETAIL_ID;
                switch (option.FORM_NAME) {
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
    var serviceRequestCategoryOptionList = dataServiceRequest.getServiceRequestCategoryOptionByHlId(hl5Id, 'HL5');
    var optionToDelete = [];

    serviceRequestCategoryOptionList = JSON.parse(JSON.stringify(serviceRequestCategoryOptionList));
    serviceRequestCategoryOptionList.forEach(function (option) {
        if (!requestCategoryOption.filter(function (elem) {
                return elem.ID == option.SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID
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
        var mapCOL = util.getMapCategoryOption('hl5');//Set Map for Category Option Level
        hl5_id = dataHl5.insertHl5(
            data.HL5_CRM_DESCRIPTION
            , data.ACRONYM
            , data.DISTRIBUTION_CHANNEL_ID
            , (data.BUDGET == "" || !data.BUDGET) ? 0 : data.BUDGET
            , data.HL4_ID
            , data.CAMPAIGN_OBJECTIVE_ID
            , data.CAMPAIGN_TYPE_ID
            , data.CAMPAIGN_SUBTYPE_ID
            , data.MARKETING_PROGRAM
            , data.MARKETING_ACTIVITY
            , data.ACTUAL_START_DATE
            , data.ACTUAL_END_DATE
            , data.SHOW_ON_DG_CALENDAR
            , data.BUSINESS_OWNER_ID
            , data.EMPLOYEE_RESPONSIBLE_ID
            , data.COST_CENTER_ID
            , data.IN_BUDGET ? data.IN_BUDGET : 0//to view
            , (data.BUDGET_SPEND_Q1 == "" || !data.BUDGET_SPEND_Q1) ? 0 : data.BUDGET_SPEND_Q1
            , (data.BUDGET_SPEND_Q2 == "" || !data.BUDGET_SPEND_Q2) ? 0 : data.BUDGET_SPEND_Q2
            , (data.BUDGET_SPEND_Q3 == "" || !data.BUDGET_SPEND_Q3) ? 0 : data.BUDGET_SPEND_Q3
            , (data.BUDGET_SPEND_Q4 == "" || !data.BUDGET_SPEND_Q4) ? 0 : data.BUDGET_SPEND_Q4
            , data.EURO_CONVERSION_ID
            , 1//data.HL5_STATUS_DETAIL_ID //to view (in proccess)
            , data.CREATED_USER_ID
            , data.ROUTE_TO_MARKET_ID
            , data.VENUE
            , data.CITY
            , data.COUNTRY
            , data.URL
            , data.SALES_ORGANIZATION_ID
            , data.PLANNED_START_DATE
            , data.PLANNED_END_DATE
            , data.STREET
            , data.POSTAL_CODE
            , data.REGION
            , data.EVENT_OWNER
            , data.NUMBER_OF_PARTICIPANTS
            , data.PRIORITY_ID || null
            , 0
            , 0
            , 1
            , null
            , null
            , false
            , 1
            , data.IMPORT_ID
        );

        if (hl5_id > 0) {
            //insert categories
            var categoryOptionBulk = [];
            data.categories.forEach(function (hl5Category) {
                hl5Category.OPTIONS.forEach(function (hl5CategoryOption) {
                    hl5CategoryOption.CREATED_USER_ID = userId;
                    hl5CategoryOption.AMOUNT = Number(hl5CategoryOption.VALUE) || 0;
                    hl5CategoryOption.UPDATED = Number(hl5CategoryOption.VALUE) ? 1 : 0;
                    hl5Category.categoryOptionLevelId = mapCOL[hl5Category.CATEGORY][hl5CategoryOption.OPTION_ID];
                    // hl5Category.categoryOptionLevelId = dataCategoryOptionLevel.getAllocationOptionLevelByCategoryAndLevelId(hl5Category.CATEGORY, 'hl5', hl5CategoryOption.OPTION_ID).ALLOCATION_CATEGORY_OPTION_LEVEL_ID;
                    // dataCategoryOptionLevel.insertCategoryOption(hl5_id, hl5Category.categoryOptionLevelId, hl5CategoryOption.AMOUNT, userId, hl5CategoryOption.UPDATED, 'HL5');
                    categoryOptionBulk.push({
                        in_hl5_id: hl5_id
                        , in_category_option_level_id: hl5Category.categoryOptionLevelId
                        , in_amount: hl5CategoryOption.AMOUNT
                        , in_user_id: userId
                        , in_updated: hl5CategoryOption.UPDATED
                    });
                });
            });
            dataCategoryOptionLevel.insertCategoryOption(categoryOptionBulk, 'hl5');

            var outcome = {};
            outcome.CREATED_USER_ID = userId;
            outcome.HL5_ID = hl5_id;
            outcome.COMMENTS = data.COMMENTS || "";
            var hl5_expected_outcomes_id = dataExOut.insertHl5ExpectedOutcomes(outcome.HL5_ID, outcome.COMMENTS, outcome.CREATED_USER_ID);

            data.expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
                expectedOutcomeDetail.CREATED_USER_ID = userId;
                expectedOutcomeDetail.HL5_EXPECTED_OUTCOMES_ID = hl5_expected_outcomes_id;
                expectedOutcomeDetail.VOLUME_VALUE = Number(expectedOutcomeDetail.VOLUME_VALUE);
                expectedOutcomeDetail.EURO_VALUE = Number(expectedOutcomeDetail.EURO_VALUE);
                var expectedoutcomelevelid = expectedOutcomeDetail.EXPECTED_OUTCOME_OPTION_ID;//dataExOut.getExpectedOutcomeLevelByLevelAndOptionId(HIERARCHY_LEVEL..HL5,expectedOutcomeDetail.EXPECTED_OUTCOME_OPTION_ID).EXPECTED_OUTCOME_LEVEL_ID;
                dataExOut.insertHl5ExpectedOutcomesDetail([{
                    in_hl5_expected_outcomes_id: expectedOutcomeDetail.HL5_EXPECTED_OUTCOMES_ID,
                    in_outcomes_id: expectedoutcomelevelid,
                    in_euro_value: expectedOutcomeDetail.EURO_VALUE,
                    in_volume_value: expectedOutcomeDetail.VOLUME_VALUE,
                    in_created_user_id: expectedOutcomeDetail.CREATED_USER_ID
                }]);
            });


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

function updateHl5(data1, userId) {
    var data = uiToServerParser(data1);
    var budgetSpendRequestStatus = budgetSpendRequest.getBudgetSpendRequestsStatus();
    var mapCOL = util.getMapCategoryOption('hl5');//Set Map for Category Option Level
    data.hl5.MARKETING_PROGRAM_ID = data.hl5.MARKETING_PROGRAM;

    data.hl5.MARKETING_ACTIVITY_ID = data.hl5.MARKETING_ACTIVITY;
    var hl5StatusId = Number(data.hl5.in_hl5_status_detail_id);

    var hl5_id;
    if (!data.hl5.HL5_ID) {
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_NOT_FOUND);
    }

    if (hl5StatusId === HL5_STATUS.CREATE_IN_CRM || hl5StatusId === HL5_STATUS.UPDATE_IN_CRM) {
        throw ErrorLib.getErrors().CustomError("", "", "Cannot update this selected Initiative/Campaign, because the status doesn´t allow it.");
    }

    if (!util.validateIsNumber(data.hl5.HL5_ID)) {
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_NOT_FOUND);
    }

    if (!userId) {
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_USER_NOT_FOUND);
    }

    var validationResult = validateHl5(data, userId);

    //throw validationResult.statusId;
    data.hl5.HL5_STATUS_DETAIL_ID = validationResult.statusId;

    if (data.hl5.HL5_STATUS_DETAIL_ID > 0) {
        hl5_id = data.hl5.HL5_ID;
        var conversionValue = dataCurrency.getCurrencyValueId(data.hl5.EURO_CONVERSION_ID);
        var acronym = data.hl5.ACRONYM || getNewSerialAcronym(data.hl5.HL4_ID);
        data.hl5.IN_BUDGET = checkBudgetStatus(data.hl5.HL4_ID, hl5_id, Number(data.hl5.BUDGET) / conversionValue);
        data.hl5.BUDGET_SPEND_Q1 = Number(data.hl5.BUDGET_SPEND_Q1);
        data.hl5.BUDGET_SPEND_Q2 = Number(data.hl5.BUDGET_SPEND_Q2);
        data.hl5.BUDGET_SPEND_Q3 = Number(data.hl5.BUDGET_SPEND_Q3);
        data.hl5.BUDGET_SPEND_Q4 = Number(data.hl5.BUDGET_SPEND_Q4);
        data.hl5.BUDGET = Number(data.hl5.BUDGET) / conversionValue;
        data.hl5.USER_ID = userId;


        if (data.hl5.ALLOW_BUDGET_ZERO) data.hl5.BUDGET = 0; //SET BUDGET IN ZERO
        hl5_id = data.hl5.HL5_ID;

        var objHL5 = dataHl5.getHl5ById(data.hl5.HL5_ID);

        dataHl5.updateHl5(
            data.hl5.HL5_ID
            , data.hl5.HL5_CRM_DESCRIPTION || 'N/D'
            , acronym
            , data.hl5.DISTRIBUTION_CHANNEL_ID || 0
            , data.hl5.BUDGET
            , data.hl5.HL4_ID
            , data.hl5.CAMPAIGN_OBJECTIVE_ID || 0
            , data.hl5.CAMPAIGN_TYPE_ID || 0
            , data.hl5.CAMPAIGN_SUBTYPE_ID || 0
            , data.hl5.MARKETING_PROGRAM || 0
            , data.hl5.MARKETING_ACTIVITY || 0
            , data.hl5.ACTUAL_START_DATE || null
            , data.hl5.ACTUAL_END_DATE || null
            , data.hl5.SHOW_ON_DG_CALENDAR || 0
            , data.hl5.BUSINESS_OWNER_ID || 0
            , data.hl5.EMPLOYEE_RESPONSIBLE_ID || 0
            , data.hl5.COST_CENTER_ID || 0
            , data.hl5.IN_BUDGET
            , data.hl5.BUDGET_SPEND_Q1 || 0
            , data.hl5.BUDGET_SPEND_Q2 || 0
            , data.hl5.BUDGET_SPEND_Q3 || 0
            , data.hl5.BUDGET_SPEND_Q4 || 0
            , data.hl5.EURO_CONVERSION_ID
            , data.hl5.HL5_STATUS_DETAIL_ID
            , data.hl5.USER_ID
            , data.hl5.ROUTE_TO_MARKET_ID || 0
            , data.hl5.VENUE
            , data.hl5.CITY
            , data.hl5.COUNTRY
            , data.hl5.URL
            , data.hl5.SALES_ORGANIZATION_ID || 0
            , data.hl5.PLANNED_START_DATE || null
            , data.hl5.PLANNED_END_DATE || null
            , data.hl5.STREET
            , data.hl5.POSTAL_CODE
            , data.hl5.REGION
            , data.hl5.EVENT_OWNER
            , data.hl5.NUMBER_OF_PARTICIPANTS
            , data.hl5.PRIORITY_ID || 0
            , data.hl5.CO_FUNDED
            , data.hl5.ALLOW_BUDGET_ZERO
            , Number(data.hl5.IS_POWER_USER) === 0 ? 0 : 1
            , data.hl5.EMPLOYEE_RESPONSIBLE_USER
            , data.hl5.PERSON_RESPONSIBLE
            , data.hl5.IS_COMPLETE
            , data.MULTI_TACTIC
        );

        insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, hl5_id);
        var ownMoneyBudgetSpendRequestStatus = budgetSpendRequest.getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(hl5_id, 'HL5');
        var automaticBudgetApproval = blLevel2.getHl2AllowAutomaticBudgetApprovalByHl4Id(data.hl5.HL4_ID) && data.hl5.IN_BUDGET && !!Number(data.hl5.BUDGET);
        if (!ownMoneyBudgetSpendRequestStatus || ownMoneyBudgetSpendRequestStatus == budgetSpendRequestStatus.NO_LONGER_REQUESTED) {
            budgetSpendRequest.insertOwnMoneyBudgetSpendRequest(data.hl5.BUDGET, hl5_id, 'HL5', userId, automaticBudgetApproval);
        } else {
            if (objHL5.BUDGET != data.hl5.BUDGET) {
                if (objHL5.EURO_CONVERSION_ID == data.hl5.EURO_CONVERSION_ID) {
                    if (ownMoneyBudgetSpendRequestStatus && ownMoneyBudgetSpendRequestStatus == budgetSpendRequestStatus.APPROVED)
                        throw ErrorLib.getErrors().CustomError("", "", "Cannot update Tactic Budget because Own money budget spend request is already Approved.");

                    budgetSpendRequest.updateOwnMoneyBudgetSpendRequestByHlIdLevel(hl5_id, 'HL5', data.hl5.BUDGET, automaticBudgetApproval, userId);
                } else {
                    budgetSpendRequest.setOwnMoneyBudgetSpendRequestNoLongerNeededByHlIdLevel(hl5_id, 'HL5', objHL5.BUDGET, userId);
                    budgetSpendRequest.insertOwnMoneyBudgetSpendRequest(data.hl5.BUDGET, hl5_id, 'HL5', userId, automaticBudgetApproval);
                }
                level6Lib.checkBudgetStatus(data.hl5);
            }
        }

        updateExpectedOutcomes(userId, hl5_id, data);

        dataHl5.delHl5BudgetHard(hl5_id, userId);
        var arrHl5Budget = [];
        if (data.hl5_budget) {
            data.hl5_budget.forEach(function (myBudget) {
                arrHl5Budget.push({
                    in_hl5_id: hl5_id
                    , in_organization_id: myBudget.ORGANIZATION_ID
                    , in_percentage: myBudget.PERCENTAGE
                    , in_organization_type: ORGANIZATION_TYPE[myBudget.ORGANIZATION_TYPE]
                    , in_created_user_id: userId
                });
            });

            if (arrHl5Budget.length > 0)
                dataHl5.insertHl5Budget(arrHl5Budget);
        }

        if (data.hl5.ALLOW_BUDGET_ZERO) {

            budgetSpendRequest.setBudgetSpendRequestStatusNoLongerRequested(hl5_id, 'HL5', userId);
        }
        else if (!data.hl5.CO_FUNDED) {
            budgetSpendRequest.disableCoFundedBudgetSpendRequests(hl5_id, 'HL5', userId);
        }

        if (data.hl5_sale && data.hl5_sale.length) {
            var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.SALE_CURRENCY_ID);
            var aux = {};
            var arrSaleHl5 = [];
            data.hl5_sale.forEach(function (sale) {
                //sale.HL5_SALE_ID = data.hl5.HL5_ID;
                if (!aux[sale.ORGANIZATION_ID]) {
                    arrSaleHl5.push({
                        in_hl5_sale_id: sale.HL_SALES_ID
                        , in_description: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3 ? sale.DESCRIPTION : null
                        , in_currency_id: data.SALE_CURRENCY_ID
                        , in_user_id: userId
                    });
                    aux[sale.ORGANIZATION_ID] = sale.ORGANIZATION_TYPE;
                }
            });
            if (arrSaleHl5.length)
                dataHl5.updateHl5Sale(arrSaleHl5);


            data.saleRequests = JSON.parse(JSON.stringify(data.saleRequests));
            data.saleRequests.forEach(function (sr) {
                var idSaleHl5 = findHLSalesId(data.hl5_sale, sr.ORGANIZATION_ID, sr.ORGANIZATION_TYPE);
                sr.HL_SALES_ID = idSaleHl5;
            });


            if (data.hl5.CO_FUNDED && data.saleRequests && data.saleRequests.length)
                budgetSpendRequest.updateSalesBudgetSpendRequest(data.saleRequests, hl5_id, 'HL5', internalCoFundingCurrency, userId);


        }

        if (data.salesIdsRemoved && data.salesIdsRemoved.length) {
            var saleBudgetSpendRquestToDelete = data.salesIdsRemoved.map(function (id) {
                return {in_budget_spend_request_id: id, in_user_id: userId};
            });
            budgetSpendRequest.deleteBudgetSpendRequestBySale(saleBudgetSpendRquestToDelete, 'HL5');
        }

        if (data.hl5.CO_FUNDED && data.partners && data.partners.length) {
            var arrPartnerToInsert = [];
            var arrAttachmentPartnerToInsert = [];

            var arrPartnerToUpdate = [];

            var budgetSpendRequestToUpdate = [];
            var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.PARTNER_CURRENCY_ID);
            data.partners.forEach(function (partner) {
                if (!partner.PARTNER_ID) {
                    var budgetSpendRequestId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, hl5_id, 'HL5', internalCoFundingCurrency, userId);
                    arrPartnerToInsert.push({
                        in_hl5_id: hl5_id
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
                        in_claim_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.CLAIM_ID : null
                        ,
                        in_comments: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.COMMENTS : null
                        ,
                        in_company_name: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_NAME : null
                        ,
                        in_company_address: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_ADDRESS : null
                        ,
                        in_invoice_number: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.INVOICE_NUMBER ? partner.INVOICE_NUMBER : null
                    });
                    partner.BUDGET_SPEND_REQUEST_ID = budgetSpendRequestId;
                } else {
                    budgetSpendRequestToUpdate.push({
                        in_budget_spend_request_id: partner.BUDGET_SPEND_REQUEST_ID
                        , in_amount: partner.AMOUNT / internalCoFundingCurrency
                        , in_message: partner.MESSAGE ? partner.MESSAGE.trim() : ''
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
                        in_claim_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.CLAIM_ID : null
                        ,
                        in_comments: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.COMMENTS : null
                        ,
                        in_company_name: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_NAME : null
                        ,
                        in_company_address: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_ADDRESS : null
                        ,
                        in_invoice_number: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.INVOICE_NUMBER ? partner.INVOICE_NUMBER : null
                    });
                }
                if (partner.attachments && partner.BUDGET_SPEND_REQUEST_ID) {
                    partner.ATTACHMENTS = partner.attachments;
                    partnerLib.updateAttachmentPartner(partner, 'HL5', userId);
                }
            });

            if (arrPartnerToInsert.length) {
                dataPartner.insertHl5Partner(arrPartnerToInsert);
            }

            if (arrPartnerToUpdate.length) {
                dataPartner.updatePartner(arrPartnerToUpdate, 'HL5');
            }


            if (budgetSpendRequestToUpdate.length)
                budgetSpendRequest.updateBudgetSpendRequest(budgetSpendRequestToUpdate, userId, true);
        }

        if (data.partnersIdsRemoved && data.partnersIdsRemoved.length) {
            var arrPartnerToDelete = data.partnersIdsRemoved.map(function (id) {
                return {in_partner_id: id, in_user_id: userId};
            });

            var pendingPartner = dataPartner.getPendingPartnerByPartnerId(arrPartnerToDelete, "HL5");
            arrPartnerToDelete = pendingPartner.map(function (elem) {
                return {in_partner_id: elem.IN_PARTNER_ID, in_user_id: userId};
            });

            var arrBudgetSpendRequestToDelete = pendingPartner.map(function (elem) {
                return {in_budget_spend_request_id: elem.IN_BUDGET_SPEND_REQUEST_ID, in_user_id: userId};
            });

            dataPartner.deleteHlPartnerByPartnerId(arrPartnerToDelete, "HL5");

            budgetSpendRequest.deleteBudgetSpendRequest(arrBudgetSpendRequestToDelete);
        }

        var categoryOptionBulk = [];
        data.hl5_category.forEach(function (hl5Category) {
            if (hl5Category.hl5_category_option && hl5Category.hl5_category_option.length) {
                hl5Category.hl5_category_option.forEach(function (hl5CategoryOption) {
                    hl5CategoryOption.USER_ID = userId;
                    hl5Category.CATEGORY_OPTION_LEVEL_ID = mapCOL[hl5Category.CATEGORY_ID][hl5CategoryOption.OPTION_ID];
                    categoryOptionBulk.push({
                        in_category_option_level_id: hl5Category.CATEGORY_OPTION_LEVEL_ID
                        , in_amount: hl5CategoryOption.AMOUNT
                        , in_user_id: hl5CategoryOption.USER_ID
                        , in_updated: hl5CategoryOption.UPDATED || 0
                        , in_hl5_id: hl5_id
                    });
                });
            } else {
                var allocationOptions = AllocationOptionLib.getAssignedOptionByCategoryIdByLevelId(hl5Category.CATEGORY_ID, HIERARCHY_LEVEL.HL5, true);
                allocationOptions.forEach(function (option) {
                    hl5Category.categoryOptionLevelId = mapCOL[hl5Category.CATEGORY_ID][option.OPTION_ID];
                    categoryOptionBulk.push({
                        in_hl5_id: hl5_id
                        , in_category_option_level_id: hl5Category.categoryOptionLevelId
                        , in_amount: 0
                        , in_user_id: userId
                        , in_updated: 0
                    });
                });
            }
        });
        dataCategoryOptionLevel.updateCategoryOption(categoryOptionBulk, 'hl5');

        updateHl5RequestCategoryOption(hl5_id, data.hl5_service_request_category_option, userId);
        dataL5Report.updateLevel5ReportForDownload(hl5_id); //Update Processing Report Export Data
        if (data.hl5.ACRONYM) {
            return data;
        } else {
            return {CRM_ID: 'CRM-' + pathBL.getCleanPathByLevelParent(5, data.hl5.HL4_ID).PATH_TPH + acronym}
        }
    }
}

function deleteHl5ByHl4(hl4Id, userId) {
    var hl5ToDelete = getHl5ByHl4Id(hl4Id).results;
    var objHL5 = {};
    hl5ToDelete.forEach(function (elem) {
        objHL5.in_hl5_id = elem.HL5_ID;
        objHL5.ACRONYM = elem.ACRONYM;
        deleteHl5(objHL5, userId);
    });
}

function deleteHl5(hl5, userId, rollBack) {
    hl5.HL5_ID = hl5.in_hl5_id;
    if (!hl5.HL5_ID && !rollBack) {
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_NOT_FOUND);
    }

    if (!rollBack && !util.validateIsNumber(hl5.HL5_ID)) {
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_NOT_FOUND);
    }

    var userRoleId = Number(dbUserRole.getUserRoleByUserId(userId)[0].ROLE_ID);
    if (!rollBack && userRoleId !== 1 && userRoleId !== 2) {
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_NO_PRIVILEGE);
    }

    var hl5StatusId = !rollBack ? Number(dataHl5.getHl5StatusByHl5Id(hl5.HL5_ID).HL5_STATUS_DETAIL_ID) : 0;

    if (!rollBack && (hl5StatusId === HL5_STATUS.IN_CRM || hl5StatusId === HL5_STATUS.CREATE_IN_CRM || hl5StatusId === HL5_STATUS.UPDATE_IN_CRM)) {
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_CANNOT_DEL_STATUS);
    }

    if (!rollBack && dataHl5.getCountHl5ChildrenInCRM(hl5.HL5_ID) > 0) {
        throw ErrorLib.getErrors().CustomError("", "", "Cannot delete the Marketing Tactic " + hl5.ACRONYM + " because a related child Marketing Sub-tactic is \"IN CRM\" status");
    }

    hl5.USER_ID = userId;

    dataPartner.deleteHl5Partner(hl5.HL5_ID, hl5.USER_ID);
    dataExOut.deleteHl5ExpectedOutcomesDetail(hl5.HL5_ID, hl5.USER_ID);
    dataExOut.deleteHl5ExpectedOutcomes(hl5.HL5_ID, hl5.USER_ID);
    level5DER.deleteL5ChangedFieldsByHl5Id(hl5.HL5_ID, hl5.USER_ID);

    dataCategoryOptionLevel.deleteCategoryOption(hl5.HL5_ID, hl5.USER_ID, 'HL5');

    dataHl5.deleteHl5Budget(hl5.HL5_ID, hl5.USER_ID);

    //delete HL5_SALE_BUDGET_SPEND_REQUEST
    databudgetSpendRequest.delAllHlSaleBudgetSpendRequestByHlId(hl5.HL5_ID, hl5.USER_ID, 'HL5'); //ready
    dataHl5.deleteHl5Sale(hl5.HL5_ID, hl5.USER_ID);
    //BUDGET_SPEND_REQUEST_LOG_STATUS
    databudgetSpendRequest.delAllBudgetSpendRequestLogStatusByHlId(hl5.HL5_ID, hl5.USER_ID, 'HL5');//ready
    //BUDGET_SPEND_REQUEST_MESSAGE
    databudgetSpendRequest.delAllBudgetSpendRequestMessageByHlId(hl5.HL5_ID, hl5.USER_ID, 'HL5');
    //DEL_ALL_BUDGET_SPEND_REQUEST_BY_HL5_ID
    databudgetSpendRequest.delAllBudgetSpendRequestByHlId(hl5.HL5_ID, hl5.USER_ID, 'HL5');//ready
    dataPath.delParentPath('hl5', hl5.HL5_ID);
    dataHl5.deleteHl5RequestCategoryOption(hl5.HL5_ID, hl5.USER_ID);
    blSegmentation.deleteSegmentationForm(hl5.HL5_ID, hl5.USER_ID);
    dataHl5.deleteHl5(hl5.HL5_ID, hl5.USER_ID);

    dataL5Report.updateLevel5ReportForDownload(hl5.HL5_ID); //Update Processing Report Export Data
    return hl5;
}

function isComplete(data) {
    var deReportDisplayName = level5DER.getProcessingReportFields();
    var crmBindingFields = Object.keys(deReportDisplayName);
    var isComplete = true;
    var notValidate = ["MARKETING_PROGRAM_DESC"
        , "MARKETING_ACTIVITY_DESC"
        , "PARENT_PATH"
        , "DISTRIBUTION_CHANNEL_DESC"
        , "URL"
        , "VENUE"
        , "STREET"
        , "CITY"
        , "COUNTRY"
        , "POSTAL_CODE"
        , "REGION"
        , "EVENT_OWNER"
        , "NUMBER_OF_PARTICIPANTS"
        , "SHOW_ON_DG_CALENDAR"];
    for (var i = 0; i < crmBindingFields.length; i++) {
        var crmBindingField = crmBindingFields[i];
        switch (crmBindingField) {
            case 'CATEGORY':
                isComplete = !data.hl5.HL5_ID ? data.hl5_category.length === dataCategory.getAllocationCategoryCountByHlId("hl5") : isComplete;
                if (isComplete) {
                    for (var j = 0; j < data.hl5_category.length; j++) {
                        var hl5Category = data.hl5_category[j];
                        var percentagePerOption = 0;

                        isComplete = isComplete && !!(hl5Category.CATEGORY_ID && Number(hl5Category.CATEGORY_ID));
                        var countOptions = dataOption.getAllocationOptionCountByCategoryIdLevelId(hl5Category.CATEGORY_ID, 'hl5');
                        isComplete = isComplete && (!data.hl5.HL5_ID ?
                            hl5Category.hl5_category_option.length === countOptions
                            : isComplete);

                        hl5Category.hl5_category_option.forEach(function (option) {
                            isComplete = isComplete && !!(option.OPTION_ID && Number(option.OPTION_ID));
                            isComplete = isComplete && !(Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0);

                            percentagePerOption = percentagePerOption + Number(option.AMOUNT);
                        });

                        isComplete = isComplete && percentagePerOption === 100 || (!hl5Category.in_make_category_mandatory && percentagePerOption === 0);
                        if (!isComplete)
                            break;
                    }
                }

                break;
            case "BUDGET":
                isComplete = !!Number(data.hl5.ALLOW_BUDGET_ZERO) || !!Number(data.hl5.BUDGET);
                break;
            case "MARKETING_PROGRAM_ID":
                isComplete = !!data.hl5.MARKETING_PROGRAM;
                break;
            case "MARKETING_ACTIVITY_ID":
                isComplete = !!data.hl5.MARKETING_ACTIVITY;
                break;
            default:
                if (notValidate.indexOf(crmBindingField) < 0)
                    isComplete = !!data.hl5[crmBindingField];
                break;
        }
        if (!isComplete) {
            break;
        }

    }
    if (isComplete) {
        isComplete = (Number(data.hl5.BUDGET_SPEND_Q1) || 0)
            + (Number(data.hl5.BUDGET_SPEND_Q2) || 0)
            + (Number(data.hl5.BUDGET_SPEND_Q3) || 0)
            + (Number(data.hl5.BUDGET_SPEND_Q4) || 0) === 100;

        isComplete = isComplete && !!((data.hl5_expected_outcomes.hl5_expected_outcomes_detail
            && data.hl5_expected_outcomes.hl5_expected_outcomes_detail.length)
            || data.hl5_expected_outcomes.COMMENTS.trim());
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

    if (!Number(data.hl5.ALLOW_BUDGET_ZERO) && data.hl5.CO_FUNDED) {
        if (data.partners && data.partners.length) {
            budgetSpendRequest.validateExternalCofunding(data.partners);
        }
        if (data.saleRequests && data.saleRequests.length) {
            budgetSpendRequest.validateInternalCofunding(data.saleRequests);
        }
    }

    var isHl5Complete = isComplete(data);
    data.hl5.IS_COMPLETE = Number(isHl5Complete);

    if (data.hl5.HL5_ID && dataHl5.hl5ExistsInCrm(data.hl5.HL5_ID)) {
        var hl5 = dataHl5.getHl5ById(data.hl5.HL5_ID);
        if (hl5.ACRONYM !== data.hl5.ACRONYM
            || hl5.COST_CENTER_ID != data.hl5.COST_CENTER_ID
            || hl5.SALES_ORGANIZATION_ID != data.hl5.SALES_ORGANIZATION_ID) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_PROPERTIES_CANNOT_UPDATE);
        }
    }

    if (isHl5Complete) {
        if (!data) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_NOT_FOUND);
        }

        /*if (!data.hl5.ACRONYM){
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_ACRONYM);
         }*/

        if (!(/^[A-Z0-9_]{7}$/.test(data.hl5.ACRONYM))) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_ACRONYM);
        }

        if (existsHl5(data.hl5)) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_EXISTS);
        }

        if (!data.hl5.HL5_CRM_DESCRIPTION) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_CRM_DESCRIPTION);
        }

        if (!Number(data.hl5.DISTRIBUTION_CHANNEL_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_DISTRIBUTION_CHANNEL);
        }

        if (!data.hl5.ALLOW_BUDGET_ZERO) {
            if (data.hl5.BUDGET <= 0) {
                throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_BUDGET_VALUE);
            }
        }//else{
        //    if (data.hl5.BUDGET != 0) {
        //        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_BUDGET_VALUE_zero);
        //    }
        //}

        if (!data.hl5.COST_CENTER_ID || data.hl5.COST_CENTER_ID < 0) {
            throw ErrorLib.getErrors().CustomError("", "", L5_COST_CENTER_NOT_VALID);
        }

        if (!data.hl5.EMPLOYEE_RESPONSIBLE_USER || !data.hl5.EMPLOYEE_RESPONSIBLE_USER.trim()) {
            throw ErrorLib.getErrors().CustomError("", "", L5_RESPONSIBLE_NOT_VALID);
        }

        if (!data.hl5.PRIORITY_ID || data.hl5.PRIORITY_ID < 0) {
            throw ErrorLib.getErrors().CustomError("", "", L5_PRIORITY_NOT_VALID);
        }

        if (!data.hl5.ACTUAL_START_DATE) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_ACTUAL_START_DATE);
        }

        if (!data.hl5.ACTUAL_END_DATE) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_ACTUAL_END_DATE);
        }

        if (util.validateDateEndMayorStart((new Date(data.hl5.ACTUAL_START_DATE)), (new Date(data.hl5.ACTUAL_END_DATE)))) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_INVALID_DATE_RANGE);
        }

        if (data.hl5.EURO_CONVERSION_ID < 0) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_CURRENCY);
        }

        if (!Number(data.hl5.EURO_CONVERSION_ID)) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_CURRENCY);
        }

        if (!data.hl5.BUDGET_SPEND_Q1 && !data.hl5.BUDGET_SPEND_Q2 && !data.hl5.BUDGET_SPEND_Q3 && !data.hl5.BUDGET_SPEND_Q4) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_BUDGET_SPEND);
        }

        var q1 = Number(data.hl5.BUDGET_SPEND_Q1) || 0;
        var q2 = Number(data.hl5.BUDGET_SPEND_Q2) || 0;
        var q3 = Number(data.hl5.BUDGET_SPEND_Q3) || 0;
        var q5 = Number(data.hl5.BUDGET_SPEND_Q4) || 0;

        var budgetSpend = q1 + q2 + q3 + q5;

        if (budgetSpend < 100) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_BUDGET_SPEND_PERCENT);
        }

        if (!data.hl5_budget) {
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_MY_BUDGET);
        }

        myBudgetComplete = isMyBudgetComplete(data.hl5_budget);

        if (data.hl5_sale && data.hl5_sale.length) {
            data.hl5_sale.forEach(function (sale) {
                if (ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3) {
                    if (sale.DESCRIPTION != '' && !sale.DESCRIPTION) {
                        throw ErrorLib.getErrors().CustomError("", "", levelCampaign + " Sales description can not be found.");
                    }
                } else {
                    if (!sale.ORGANIZATION_ID || !Number(sale.ORGANIZATION_ID)) {
                        throw ErrorLib.getErrors().CustomError("", "", levelCampaign + " Sales " + key + " can not be found.");
                    }
                }
            });
        }

        if (data.hl5_expected_outcomes) {
            if (!data.hl5_expected_outcomes.hl5_expected_outcomes_detail.length && !data.hl5_expected_outcomes.COMMENTS) {
                throw ErrorLib.getErrors().CustomError("", "", L5_CAMPAIGN_FORECASTING_KPIS_COMMENT);
            }

            data.hl5_expected_outcomes.hl5_expected_outcomes_detail.forEach(function (hl5ExpectedOutcomesDetail) {
                if (hl5ExpectedOutcomesDetail.VOLUME_VALUE != 0 && !Number(hl5ExpectedOutcomesDetail.VOLUME_VALUE)) {
                    throw ErrorLib.getErrors().CustomError("", "", L5_CAMPAIGN_FORECASTING_KPIS_DETAILS);
                }
                if (!hl5ExpectedOutcomesDetail.EURO_VALUE || !Number(hl5ExpectedOutcomesDetail.EURO_VALUE)) {
                    throw ErrorLib.getErrors().CustomError("", "", L5_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO);
                }
                if (!hl5ExpectedOutcomesDetail.OUTCOMES_ID || !Number(hl5ExpectedOutcomesDetail.OUTCOMES_ID)) {
                    throw ErrorLib.getErrors().CustomError("", "", L5_CAMPAIGN_FORECASTING_KPIS_NOT_VALID);
                }
            });
        }

        if (data.partners && data.partners.length) {
            data.partners.forEach(function (partner) {
                if (!partner.PARTNER_TYPE_ID || !Number(partner.PARTNER_TYPE_ID)) {
                    throw ErrorLib.getErrors().CustomError("", "", L5_PARTNER_TYPE_NOT_VALID);
                }

                if (!partner.AMOUNT || !Number(partner.AMOUNT)) {
                    throw ErrorLib.getErrors().CustomError("", "", L5_PARTNER_AMOUNT_NOT_VALID);
                }

                if (PARTNER_TYPE.INTEL === Number(partner.PARTNER_TYPE_ID) && !partner.INTEL_PROJECT_ID) {
                    throw ErrorLib.getErrors().CustomError("", "", L5_PARTNER_INCOMPLETE_INTEL);
                }

                if (PARTNER_TYPE.EXTERNAL_PARTNER === Number(partner.PARTNER_TYPE_ID) && (!partner.COMPANY_NAME || !partner.COMPANY_ADDRESS)) {
                    throw ErrorLib.getErrors().CustomError("", "", L5_PARTNER_INCOMPLETE_EXTERNAL_PARTNER);
                }
            });
        }

        if (!data.hl5_category) {
            throw ErrorLib.getErrors().CustomError("", "", L5_CATEGORY_NOT_EMPTY);
        }

        if (!data.hl5.HL5_ID && data.hl5_category.length !== dataCategory.getAllocationCategoryCountByHlId("hl5")) {
            throw ErrorLib.getErrors().CustomError("", "", L5_CATEGORY_INCORRECT_NUMBER);
        }

        categoryOptionComplete = isCategoryOptionComplete(data);

        var crmFieldsHasChangedResult = crmFieldsHaveChanged(data, data.hl5.ALLOW_BUDGET_ZERO || (categoryOptionComplete && myBudgetComplete), userId);
        var crmFieldsHasChanged = crmFieldsHasChangedResult.crmFieldsHaveChanged;
        crmBindingChangedFields = crmFieldsHasChangedResult.crmBindingChangedFields;
        crmBindingChangedFieldsUpdate = crmFieldsHasChangedResult.crmBindingChangedFieldsUpdate;
        if (data.hl5.HL5_ID) {
            if (!data.hl5.ALLOW_BUDGET_ZERO && data.hl5.in_hl5_status_detail_id != HL5_STATUS.VALID_FOR_CRM && !myBudgetComplete) {
                throw ErrorLib.getErrors().CustomError("", "", L5_MY_BUDGET_COMPLETE);
            }

            existInCrm = dataHl5.hl5ExistsInCrm(data.hl5.HL5_ID);

            var objHL5 = dataHl5.getHl5ById(data.hl5.HL5_ID);
            if (existInCrm && data.hl5.ACRONYM.toUpperCase() != objHL5.ACRONYM.toUpperCase()) {
                throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_IN_CRM);
            }


            var categoryHasChanged = categoryChanged(data, existInCrm);

            if(!crmFieldsHasChanged && !categoryHasChanged
                && !Number(budgetSpendRequest.countPendingBudgetRequestByHl5Id(data.hl5.HL5_ID))){
                if(data.hl5.in_hl5_status_detail_id == HL5_STATUS.IN_PROGRESS){
                    statusId = HL5_STATUS.VALID_FOR_CRM;
                } else {
                    statusId = data.hl5.in_hl5_status_detail_id;
                }
            } else {
                statusId = HL5_STATUS.VALID_FOR_CRM;
            }
            /*statusId = !crmFieldsHasChanged && !categoryHasChanged
            && !Number(budgetSpendRequest.countPendingBudgetRequestByHl5Id(data.hl5.HL5_ID))
                ? data.hl5.in_hl5_status_detail_id == HL5_STATUS.IN_PROGRESS
                    ? HL5_STATUS.VALID_FOR_CRM
                    : data.hl5.in_hl5_status_detail_id
                : HL5_STATUS.VALID_FOR_CRM;*/

        } else {
            statusId = HL5_STATUS.IN_PROGRESS;
        }
    }
    return {
        statusId: statusId
        , isComplete: isHl5Complete
        , crmBindingChangedFields: crmBindingChangedFields
        , crmBindingChangedFieldsUpdate: crmBindingChangedFieldsUpdate
    };
}

function categoryChanged(data, existInCrm) {
    var optionChange = false;
    //obtain the CATEGORY options in bd
    var hl5_categoryBD = getHl5CategoryOption(data.hl5.HL5_ID);

    var optionChange = CompareCategories(data.hl5_category, hl5_categoryBD, existInCrm, data.hl5.HL5_ID);

    return optionChange;
}

/***************************************/
//Verify if mount of option change
//Option1: option from UI
//Option2: option from DB
function CompareOptions(Option1, Option2, existInCrm) {
    var hasChanged = false;
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

function CompareListOptions(ListOption1, ListOption2, existInCrm) {
    var flag = false;
    for (var i = 0; i < ListOption1.length; i++) {
        var option = ListOption1[i];
        flag = CompareOptions(option, getOptionFromList(ListOption2, option.OPTION_ID), existInCrm) || flag;
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

function CompareCategoryOption(Category1, Category1_id, ListCategories, existInCrm) {
    var Category2 = getCategoryFromList(ListCategories, Category1_id);
    return CompareListOptions(Category1.hl5_category_option, Category2.hl5_category_option, existInCrm)
}

function CompareCategories(ListCategories1, ListCategories2, existInCrm, hl5Id) {
    var flag = false;
    var actualCategory = util.getCategoryById('hl5', hl5Id);
    for (var i = 0; i < ListCategories1.length; i++) {
        var category = ListCategories1[i];
        if (actualCategory[category.CATEGORY_ID].IN_PROCESSING_REPORT)
            flag = CompareCategoryOption(category, category.CATEGORY_ID, ListCategories2, existInCrm) || flag;
    }
    return flag;
}

function isMyBudgetComplete(hl5_budget) {
    var myBudgetTotalPercentage = 0;
    var myBudgetComplete = false;

    hl5_budget.forEach(function (hl5_budget) {
        if (!hl5_budget.ORGANIZATION_ID || !Number(hl5_budget.ORGANIZATION_ID))
            throw ErrorLib.getErrors().CustomError("", "", levelCampaign + " in My Budget " + hl5_budget.ORGANIZATION_ID + " can not be found.");

        myBudgetTotalPercentage = myBudgetTotalPercentage + Number(hl5_budget.PERCENTAGE);
    });

    if (myBudgetTotalPercentage > 100)
        throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_BUDGET_PERCENT);
    if (myBudgetTotalPercentage < 100)
        myBudgetTotalPercentage = 0;

    myBudgetComplete = !!myBudgetTotalPercentage;
    return myBudgetComplete;
}

function isCategoryOptionComplete(data) {
    var categoryOptionComplete = false;
    for (var i = 0; i < data.hl5_category.length; i++) {
        var hl5Category = data.hl5_category[i];
        var percentagePerOption = 0;
        if (!hl5Category.CATEGORY_ID || !Number(hl5Category.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "", L5_CATEGORY_NOT_VALID);

        if (!hl5Category.hl5_category_option.length)
            percentagePerOption = 100;
        //TODO review. Workaround for empty categories on edit
        //throw ErrorLib.getErrors().CustomError("","hl5Services/handlePost/insertHl5", L5_CATEGORY_OPTIONS_NOT_EMPTY);

        if (!data.hl5.HL5_ID && hl5Category.hl5_category_option.length !== dataOption.getAllocationOptionCountByCategoryIdLevelId(hl5Category.CATEGORY_ID, 'hl5'))
            throw ErrorLib.getErrors().CustomError("", "", L5_CATEGORY_OPTIONS_INCORRECT_NUMBER);

        hl5Category.hl5_category_option.forEach(function (option) {
            if (!option.OPTION_ID || !Number(option.OPTION_ID))
                throw ErrorLib.getErrors().CustomError("", "", L5_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.AMOUNT) && !Number(option.AMOUNT)) || Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0)
                throw ErrorLib.getErrors().CustomError("", "", "Option value is not valid (actual value " + option.AMOUNT + ")");

            percentagePerOption = percentagePerOption + Number(option.AMOUNT);
        });

        if (!hl5Category.in_make_category_mandatory && percentagePerOption === 0) {
            categoryOptionComplete = true;
            break;
        } else if (percentagePerOption > 100) {
            throw ErrorLib.getErrors().CustomError("", "", L5_CATEGORY_TOTAL_PERCENTAGE);
        } else if (percentagePerOption < 100) {
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
        var result = {};
        result.out_result = 0;
        //lists of hl5 changed to send email to client
        result.emailListInBudget = [];
        result.emailListOutBudget = [];
        var hl4Id = Number(objHl4) ? objHl4 : objHl4.in_hl4_id;
        var resultHl5 = dataHl5.getHl5ByHl4Id(hl4Id);// GET_HL5_BY_HL4_ID

        if (resultHl5.length > 0) {
            var total = 0;
            for (var i = 0; i < resultHl5.length; i++) {
                if (objHl4.in_HL4_FNC_BUDGET_TOTAL_MKT < total + parseFloat(resultHl5[i].HL5_BUDGET)) {
                    dataHl5.updateHl5BudgetStatus(resultHl5[i].HL5_ID, 0);
                    result.emailListOutBudget.push(resultHl5[i]);
                } else {
                    dataHl5.updateHl5BudgetStatus(resultHl5[i].HL5_ID, 1);
                    total = total + parseFloat(resultHl5[i].HL5_BUDGET);
                    result.emailListInBudget.push(resultHl5[i]);
                }
            }
            result.out_result = resultHl5.length;
        }
        return result;
    }
}

/* Function to set HL5 status */
function setHl5Status(hl5_id, status_id, userId) {
    var updateOK = null;
    if (hl5_id && status_id && userId) {
        updateOK = dataHl5.changeStatusHl5(hl5_id, status_id, userId);
        updateOK = dataHl5.insertHl5LogStatus(hl5_id, status_id, userId);
        if (HL5_STATUS.IN_CRM == status_id) {
            level5DER.deleteL5ChangedFieldsByHl5Id(hl5_id);
            resetHl5CategoryOptionUpdated(hl5_id, userId)
        }
        dataL5Report.updateLevel5ReportForDownload(hl5_id);
    }


    return updateOK;
}

function resetHl5CategoryOptionUpdated(hl5Id, userId) {
    dataCategoryOptionLevel.resetHl4CategoryOptionUpdated(hl5Id, 'hl5', userId);
    return true;
}

/* Set HL5 status to In CRM */
function setHl5StatusInCRM(hl5_id, userId, cancelConfirmation) {
    var hl5Ids = [];
    var result;

    if (!(hl5_id.constructor === Array)) {
        hl5Ids.push(hl5_id);
    } else {
        hl5Ids = hl5_id;
    }

    for (var i = 0; i < hl5Ids.length; i++) {
        if (!Number(hl5Ids[i]))
            throw ErrorLib.getErrors().CustomError("", "", L5_MSG_INITIATIVE_NOT_FOUND);

        result = null;
        result = setHl5Status(hl5Ids[i], HL5_STATUS.IN_CRM, userId);
        if (result) {
            mail.sendInCRMMail(hl5Ids[i], "hl5");
        }
    }

    return 1;
}

function changeHl5StatusOnDemand(hl5_id, userId, cancelConfirmation) {
    var hl5 = dataHl5.getHl5ById(hl5_id);
    var existInCrm = dataHl5.hl5ExistsInCrm(hl5_id);
    var statusId = null;
    if(hl5.HL5_STATUS_DETAIL_ID != HL5_STATUS.IN_CRM) {
        if (!cancelConfirmation) {
            if (hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.VALID_FOR_CRM) {
                statusId = existInCrm ? HL5_STATUS.UPDATE_IN_CRM : HL5_STATUS.CREATE_IN_CRM;
            } else if (hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.IN_PROGRESS) {
                statusId = HL5_STATUS.VALID_FOR_CRM;
            } else {
                statusId = hl5.HL5_STATUS_DETAIL_ID;
            }
        } else {
            var changedFields = dataL5DER.getL5ChangedFieldsByHl5Id(hl5_id);
            statusId = Number(hl5.IS_COMPLETE) && changedFields && changedFields.length ? HL5_STATUS.VALID_FOR_CRM : hl5.HL5_STATUS_DETAIL_ID;
        }

        if (!hl5.ALLOW_BUDGET_ZERO) {
            if (!Number(hl5.IS_COMPLETE)) {
                throw ErrorLib.getErrors().CustomError("", "", L5_MSG_COULDNT_CHANGE_STATUS);
            }

            var budgetSpendRequestStatus = budgetSpendRequest.getBudgetSpendRequestsStatus();
            var hasBudgetRequestPending = budgetSpendRequest.countPendingBudgetRequestByHl5Id(hl5_id) > 0;

            if (hasBudgetRequestPending) {
                throw ErrorLib.getErrors().CustomError("", "", L5_MSG_COULDNT_CHANGE_STATUS_DUE_PENDING_BUDGET_SPEND_REQUEST);
            }

            var ownMoneyBudgetSpendRequestStatus = budgetSpendRequest.getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(hl5_id, 'HL5');
            if (ownMoneyBudgetSpendRequestStatus && ownMoneyBudgetSpendRequestStatus != budgetSpendRequestStatus.APPROVED) {
                throw ErrorLib.getErrors().CustomError("", "", L5_MSG_COULDNT_CHANGE_STATUS_DUE_OWN_MONEY_BUDGET_SPEND_REQUEST_STATUS);
            }
        }
        return setHl5Status(hl5_id, statusId, userId);
    }
    return true;
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

function getHl5CategoryOption(hl5_id) {
    var hl5Categories = dataCategoryOptionLevel.getAllocationCategory(hl5_id, 'hl5');
    var result = [];
    var allocationOptions = util.getAllocationOptionByCategoryAndLevelId('hl5', hl5_id);

    hl5Categories.forEach(function (catgory) {
        var aux = util.extractObject(catgory);
        var hl5Category = {};
        aux["hl5_category_option"] = allocationOptions[aux.CATEGORY_ID];//dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(aux.CATEGORY_ID, 'hl5', hl5_id);
        hl5Category.hl5_category_option = [];
        Object.keys(aux).forEach(function (key) {
            if (key === "hl5_category_option") {
                for (var i = 0; i < aux[key].length; i++) {
                    var option = {};
                    Object.keys(aux[key][i]).forEach(function (auxKey) {
                        option[auxKey] = aux[key][i][auxKey];
                    });
                    hl5Category.hl5_category_option.push(option);
                }
            } else {
                hl5Category[key] = aux[key];
            }
        });
        result.push(hl5Category);
    });
    return result;
}

function getServiceRequestCategoryOptionByHl5Id(hl5Id) {
    var result = {};
    var serviceRequestCategoryOptionList = dataServiceRequest.getServiceRequestCategoryOptionByHlId(hl5Id, 'HL5');

    if (serviceRequestCategoryOptionList && serviceRequestCategoryOptionList.length) {
        var segmentationForms = blSegmentation.getSegmentationFormByHl5Id(hl5Id);
        for (var i = 0; i < serviceRequestCategoryOptionList.length; i++) {
            if (!result[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_ID]) {
                result[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_ID] = {
                    CATEGORY_NAME: serviceRequestCategoryOptionList[i].CATEGORY_NAME
                    , OPTIONS: [{
                        OPTION_NAME: serviceRequestCategoryOptionList[i].OPTION_NAME,
                        SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID: serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID,
                        IS_CHECKED: !!serviceRequestCategoryOptionList[i].IS_CHECKED,
                        ASSOCIATED_FORM: serviceRequestCategoryOptionList[i].OPTION_NAME == 'Segmentation Request' ? 'SegmentationForm' : null,
                        FORM: !!serviceRequestCategoryOptionList[i].IS_CHECKED ? segmentationForms[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID] : undefined,
                        FORM_STATUS_DETAIL_ID: !!serviceRequestCategoryOptionList[i].IS_CHECKED && segmentationForms[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID] ?
                            segmentationForms[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID].FORM_STATUS_DETAIL_ID
                            : undefined
                    }]
                }
            } else {
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
    }

    return util.objectToArray(result);
}

function crmFieldsHaveChanged(data, isComplete, userId) {
    var crmFieldsHaveChanged = false;
    var crmBindingChangedFields = [];
    var crmBindingChangedFieldsUpdate = [];
    if (!isComplete)
        return {
            crmFieldsHaveChanged: true,
            crmBindingChangedFields: crmBindingChangedFields,
            crmBindingChangedFieldsUpdate: crmBindingChangedFieldsUpdate
        };

    var deReportDisplayName = level5DER.getProcessingReportFields();
    var crmBindingFields = {hl5: Object.keys(deReportDisplayName)};

    if (!data.hl5.HL5_ID) {
        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var parameters = {
                    "in_hl5_id": data.hl5.HL5_ID,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };
                crmBindingChangedFields.push(parameters);
            });
        });
    } else {
        var oldHl5 = dataHl5.getHl5ById(data.hl5.HL5_ID);
        var existInCrm = dataHl5.hl5ExistsInCrm(data.hl5.HL5_ID);
        var l5CrmBindigFields = util.getMapHl5ChangedFieldsByHl5Id(data.hl5.HL5_ID);

        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var fieldChanged = false;
                var oldParentPath = '';
                var parentPath = '';
                if (field == "PARENT_PATH") {
                    oldParentPath = dataPath.getCrmParentPathByIdLevelId('hl5', data.hl5.HL5_ID)[0].PARENT_PATH;
                    parentPath = pathBL.getPathByLevelParentForCrm('hl5', data.hl5.HL4_ID);
                }
                var parameters = {
                    "in_hl5_id": data.hl5.HL5_ID,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };

                if (field.indexOf('_DATE') <= 0) {
                    if (field == 'BUDGET') {
                        var oldCurrencyValue = Number(dataCurrency.getCurrencyValueId(oldHl5.EURO_CONVERSION_ID));
                        var newCurrencyValue = Number(dataCurrency.getCurrencyValueId(data[object].EURO_CONVERSION_ID));
                        fieldChanged = Number(oldHl5[field]) / oldCurrencyValue != Number(data[object][field]) / newCurrencyValue;
                    } else {
                        fieldChanged = oldHl5[field] != data[object][field];
                    }
                }

                else {
                    fieldChanged = new Date(oldHl5[field]).valueOf() !== new Date(data[object][field]).valueOf();
                }

                if (fieldChanged || oldParentPath != parentPath) {

                    if (oldParentPath != parentPath)
                        pathBL.updParentPath('hl5', data.hl5.HL5_ID, parentPath, userId);

                    var in_hl5_crm_binding_id = l5CrmBindigFields[field] ? l5CrmBindigFields[field].HL5_CRM_BINDING_ID : null;

                    if (in_hl5_crm_binding_id) {
                        parameters.in_hl5_crm_binding_id = in_hl5_crm_binding_id;
                        crmBindingChangedFieldsUpdate.push(parameters);
                    } else {
                        crmBindingChangedFields.push(parameters);
                    }
                    crmFieldsHaveChanged = true;
                }
            });
        });
    }
    return {
        crmFieldsHaveChanged: crmFieldsHaveChanged
        , crmBindingChangedFields: crmBindingChangedFields
        , crmBindingChangedFieldsUpdate: crmBindingChangedFieldsUpdate
    };
}

//event is "Created" or "Updated"
function notifyChangeByEmail(data, userId, event) {

    var Hl3Id = data.hl5.in_hL5_id;
    var HL3 = level3BL.getLevel3ById(Hl3Id);
    var ownerId = HL3.CREATED_USER_ID;
    var Owner = userBL.getUserById(ownerId);
    var user = userBL.getUserById(userId);
    var path = pathBL.getPathByLevelParentToCRM(5, Hl3Id).PATH_TPH;

    var body = ' <p> Dear Colleague </p>  <p>The User : ' + userBL.getUserById(userId).USER_NAME + ' has set the Marketing Tactic ' + path + ' for you.</p>  <p>Click on the ' + config.getAppUrl() + ' to review</p>';
    var mailObject = mail.getJson([{
        "address": Owner[0].EMAIL
    }], "Marketing Planning Tool - Level 5 " + event, body);

    var rdo = mail.sendMail(mailObject, true);


}

/*function sendProcessingReportEmail(hl5Id) {
    var appUrl = config.getAppUrl();
    var hl5 = dataHl5.getHl5ById(hl5Id);
    //var hl5 = dataHl4.getHl4ById(hl5.HL4_ID);
    var hl5OwnerEmail = getUserById(hl5.CREATED_USER_ID).EMAIL;

    /!*TODO: change TO email for a real email account*!/
    var body = '<p> Dear Colleague </p>';
    body += '<p>An initiative has been created in CRM.</p><br>';
    body += '<p>' + appUrl + '#/TeamPlanHierarchy/Level4/edit/' + hl5.HL4_ID + '/' + hl5Id + '</p>';

    //body +='http://localhost:63352/sap-fiori/webapp/index.html#/TeamPlanHierarchy/Level4/edit/' + hl5.HL4_ID + '/' + hl5Id;

    var mailObject = mail.getJson([{
        "address": hl5OwnerEmail
    }], "Marketing Planning Tool - Interlock Process", body);

    mail.sendMail(mailObject, true);
}*/

function insertAllHl5Category(categoryId, createdUserId, inProcessingReport) {
    return dataHl5.insertHl5Category(category.HL5_ID, category.CATEGORY_ID, category.CREATED_USER_ID, category.IN_PROCESSING_REPORT);
}

var map = {
    "in_hl5_id": "HL5_ID",
    "in_acronym": "ACRONYM",
    "in_hl5_crm_description": "HL5_CRM_DESCRIPTION",
    "distribution_channel_id": "DISTRIBUTION_CHANNEL_ID",
    "in_hl4_id": "HL4_ID",
    "in_hl5_fnc_budget_spend_q1": "BUDGET_SPEND_Q1",
    "in_hl5_fnc_budget_spend_q2": "BUDGET_SPEND_Q2",
    "in_hl5_fnc_budget_spend_q3": "BUDGET_SPEND_Q3",
    "in_hl5_fnc_budget_spend_q4": "BUDGET_SPEND_Q4",
    "in_euro_conversion_id": "EURO_CONVERSION_ID",
    "in_hl5_fnc_budget_total_mkt": "BUDGET",
    "in_region_id": "ORGANIZATION_ID",
    "in_route_id": "ORGANIZATION_ID",
    "in_percentage": "PERCENTAGE",
    "in_amount": "AMOUNT",
    "amount": "AMOUNT",
    "intel": "INTEL_PROJECT_ID",
    "claim": "CLAIM_ID",
    "notes": "COMMENTS",
    "companyName": "COMPANY_NAME",
    "companyAddress": "COMPANY_ADDRESS",
    "invoiceNumber": "INVOICE_NUMBER",
    "partner_type_id": "PARTNER_TYPE_ID",
    "in_description": "DESCRIPTION",
    "in_category_id": "CATEGORY_ID",
    "in_in_processing_report": "IN_PROCESSING_REPORT",
    "in_option_id": "OPTION_ID",
    "in_comments": "COMMENTS",
    "in_outcomes_id": "OUTCOMES_ID",
    "in_euro_value": "EURO_VALUE",
    "in_amount_value": "VOLUME_VALUE",
    "in_partner_name": "NAME",
    "in_budget_spend_request_id": "BUDGET_SPEND_REQUEST_ID",
    "in_partner_id": "PARTNER_ID",
    "in_partner_type_id": "PARTNER_TYPE_ID",
    "in_value": "VALUE",
    "in_actual_end_date": "ACTUAL_END_DATE",
    "in_actual_start_date": "ACTUAL_START_DATE",
    "route_to_market": "ROUTE_TO_MARKET_ID",
    "in_campaign_objective_id": "CAMPAIGN_OBJECTIVE_ID",
    "in_campaign_type_id": "CAMPAIGN_TYPE_ID",
    "in_campaign_subtype_id": "CAMPAIGN_SUBTYPE_ID",
    "marketing_organization": "SALES_ORGANIZATION_ID",
    "marketing_activity_id": "MARKETING_ACTIVITY",
    "marketing_program_id": "MARKETING_PROGRAM",
    "business_process_owner_id": "BUSINESS_OWNER_ID",
    "in_employee_responsible_id": "EMPLOYEE_RESPONSIBLE_ID",
    "in_cost_center_id": "COST_CENTER_ID",
    "show_on_dg_calendar": "SHOW_ON_DG_CALENDAR",
    "venue": "VENUE",
    "city": "CITY",
    "country": "COUNTRY",
    "url": "URL",
    "in_planned_start_date": "PLANNED_START_DATE",
    "in_planned_end_date": "PLANNED_END_DATE",
    "street": "STREET",
    "postal_code": "POSTAL_CODE",
    "region": "REGION",
    "event_owner": "EVENT_OWNER",
    "number_of_participants": "NUMBER_OF_PARTICIPANTS",
    "priority_id": "PRIORITY_ID",
    "in_message": "MESSAGE",
    "message": "MESSAGE",
    "in_intel_project_id": "INTEL_PROJECT_ID",
    "in_claim_id": "CLAIM_ID",
    "in_company_name": "COMPANY_NAME",
    "in_company_address": "COMPANY_ADDRESS",
    "in_invoice_number": "INVOICE_NUMBER",
    "in_partner_currency_id": "PARTNER_CURRENCY_ID",
    "in_sale_currency_id": "SALE_CURRENCY_ID",
    "co_funded": "CO_FUNDED",
    "partnerId": "PARTNER_ID",
    "budget_spend_request_id": "BUDGET_SPEND_REQUEST_ID",
    "status": "STATUS",
    "allow_zero": "ALLOW_BUDGET_ZERO",
    "in_is_power_user": "IS_POWER_USER",
    "full_name": "FULL_NAME",
    "email": "EMAIL"
};

function uiToServerParser(object) {
    var data = JSON.stringify(object, function (key, value) {
        if (Array.isArray(value)) {
            return value;
        } else if (value && typeof value === 'object') {
            var replacement = {};
            Object.keys(value).forEach(function (k) {
                replacement[map[k] || k] = value[k];
                if (k === "in_region_id") {
                    if (value.in_partner_name) {
                        replacement.REGION_ID = value[k];
                    } else {
                        replacement.ORGANIZATION_TYPE = "REGIONAL";
                    }
                } else if (k === "in_route_id") {
                    replacement.ORGANIZATION_TYPE = "CENTRAL";
                } else if (k === "in_description") {
                    replacement.ORGANIZATION_TYPE = "OTHER";
                }
            });
            return replacement;
        }
        return value;
    });

    data = JSON.parse(data);

    data.hl5_budget = data.hl5_budget.regions.concat(data.hl5_budget.routes);
    data.hl5_sale = data.hl5_sale.regions.concat(data.hl5_sale.routes.concat(data.hl5_sale.others));
    // data.saleRequests;
    data.hl5.BUDGET_SPEND_Q1 = data.hl5_fnc.BUDGET_SPEND_Q1;
    data.hl5.BUDGET_SPEND_Q2 = data.hl5_fnc.BUDGET_SPEND_Q2;
    data.hl5.BUDGET_SPEND_Q3 = data.hl5_fnc.BUDGET_SPEND_Q3;
    data.hl5.BUDGET_SPEND_Q4 = data.hl5_fnc.BUDGET_SPEND_Q4;
    data.hl5.EURO_CONVERSION_ID = data.hl5_fnc.EURO_CONVERSION_ID;
    data.hl5.BUDGET = data.hl5_fnc.BUDGET ? data.hl5_fnc.BUDGET : 0;
    data.hl5.CO_FUNDED = data.hl5_fnc.CO_FUNDED ? 1 : 0;
    data.hl5.ALLOW_BUDGET_ZERO = data.hl5_fnc.ALLOW_BUDGET_ZERO ? 1 : 0;

    data.hl5_fnc = undefined;

    return data;
}

function serverToUiParser(object) {
    var budgetSpendRequestStatus = budgetSpendRequest.getBudgetSpendRequestsStatus();
    var isNoLongerRequested = object.hl5.BUDGET_SPEND_REQUEST_STATUS_ID == budgetSpendRequestStatus.NO_LONGER_REQUESTED;
    if (isNoLongerRequested) {
        object.hl5.in_totalbudget -= object.hl5.BUDGET;
        object.hl5.BUDGET = 0;
        object.hl5.BUDGET_SPEND_REQUEST_STATUS_ID = null;
        object.hl5.BUDGET_SPEND_REQUEST_STATUS = '';
    }
    var hl5_sale = {
        regions: [],
        globalteams: [],
        others: [],
        total: ""
    };
    var hl5_budget = {
        regions: [],
        globalteams: []
    };
    object.myBudget.forEach(function (obj) {
        var aux = {};
        var percentage = isNoLongerRequested
            ? 0 : obj.PERCENTAGE;
        if (obj.ORGANIZATION_TYPE === 1) {
            aux.REGION_ID = obj.ORGANIZATION_ID;
            aux.PERCENTAGE = percentage;
            aux.REGION_NAME = obj.ORGANIZATION_NAME;
            hl5_budget.regions.push(aux);
        } else {
            aux.ROUTE_ID = obj.ORGANIZATION_ID;
            aux.PERCENTAGE = percentage;
            aux.GLOBAL_TEAM_NAME = obj.ORGANIZATION_NAME;
            hl5_budget.globalteams.push(aux);
        }
    });
    object.sale.saleRequests.forEach(function (obj) {
        var aux = {};

        aux.HL5_SALES_ID = obj.HL5_SALES_ID;
        if (obj.ORGANIZATION_TYPE === 1) {
            aux.REGION_ID = obj.ORGANIZATION_ID;
            aux.AMOUNT = obj.AMOUNT;
            aux.REGION_NAME = obj.ORGANIZATION_NAME;
            hl5_sale.regions.push(aux);
        } else if (obj.ORGANIZATION_TYPE === 2) {
            aux.ROUTE_ID = obj.ORGANIZATION_ID;
            aux.AMOUNT = obj.AMOUNT;
            aux.GLOBAL_TEAM_NAME = obj.ORGANIZATION_NAME;
            hl5_sale.globalteams.push(aux);
        } else {
            aux.DESCRIPTION = obj.DESCRIPTION;
            aux.AMOUNT = obj.AMOUNT;
            hl5_sale.others.push(aux);
        }
        aux.MESSAGE = obj.MESSAGE;
    });

    hl5_sale.total = object.sale.total;
    hl5_sale.saleCurrencyId = object.sale.saleRequestsCurrencyId;
    object.saleRequests = object.sale.salesRequestLoaded;
    object.sale = hl5_sale;
    object.myBudget = hl5_budget;

    return object;
}

function getAllMarketingProgram() {
    return dataHl5.getAllMarketingProgram();
}

function getAllBusinessOwner() {
    return dataHl5.getAllBusinessOwner();
}

function getCostCenterByHl4IdMarketingOrganizationId(hl4Id, saleOrganizationId) {
    var costCenters = JSON.parse(JSON.stringify(dataHl5.getCostCenterByHl4IdMarketingOrganizationId(hl4Id, saleOrganizationId)));
    // costCenters.forEach(function (costCenter) {
    //     costCenter.employeeResponsible = dataCostCenter.getCostCenterEmployeeResponsibleByCostCenterId(costCenter.COST_CENTER_ID);
    // });
    return costCenters;
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

function checkPermission(userSessionID, method, hl5Id) {
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
}

function findHLSalesId(Sales, OrganizationId, OrganizationType) {
    var id = null;
    Sales.forEach(function (sale) {
        if (sale.ORGANIZATION_ID == OrganizationId && sale.ORGANIZATION_TYPE == OrganizationType) {
            id = sale.HL_SALES_ID;
            return;
        }
    });
    return id;
}

function getNewSerialAcronym(Hl4_id) {
    var newSerial = 1;

    var listOfHl5 = dataHl5.getHl5ByHl4Id(Hl4_id);

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

function getExpectedOutcomesByHl5Id(hl5Id, hl4Id) {
    return expectedOutcomesLib.getExpectedOutcomesByHl5Id(hl5Id, hl4Id);
}

function getMultiTacticById(hl5_id){
    return dataHl5.getMultiTacticById(hl5_id);
}