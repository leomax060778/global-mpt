/** *************Import Library****************** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataHl6 = mapper.getDataLevel6();
var dataHl5 = mapper.getDataLevel5();
var dataHl4 = mapper.getDataLevel4();
var dataHl3 = mapper.getDataLevel3();
var userBL = mapper.getUser();
var dataExOut = mapper.refactorL5L6_getDataExpectedOutcome();
var dataPartner = mapper.getDataPartner();
var partnerLib = mapper.refactorL5L6_getPartner();
var dataCurrency = mapper.getDataCurrency();
var dataCategory = mapper.getDataCategory();
var dataOption = mapper.getDataOption();
var dataPath = mapper.getDataPath();
var pathBL = mapper.getPath();
var expectedOutcomesLib = mapper.refactorL5L6_getExpectedOutcomes();
var level6DER = mapper.getLevel6DEReport();
var dataL6Report = mapper.getDataLevel6Report();
var db = mapper.getdbHelper();
var dbUserRole = mapper.getDataUserRole();
var dbUser = mapper.getDataUser();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var mail = mapper.getMail();
var businessError = mapper.getLogError();
var config = mapper.getDataConfig();
var dataMO = mapper.getDataMarketingOrganization();
var dataRTM = mapper.getDataRouteToMarket();
var dataCST = mapper.getDataCampaignSubType();
var dataCT = mapper.getDataCampaignType();
var dataObj = mapper.getDataObjectives();
var level5Lib = mapper.refactorL5L6_getLevel5();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var allocationCategory = mapper.getAllocationCategoryLib();
var blLevel2 = mapper.getLevel2();
var blRegion = mapper.getRegion();
var budgetYear = mapper.getBudgetYear();
var budgetSpendRequest = mapper.refactorL5L6_getBudgetSpendRequest();
var databudgetSpendRequest = mapper.getDataBudgetSpendRequest();
var AllocationOptionLib = mapper.getAllocationOptionLib();
var expectedOutcomesLevelLib = mapper.getExpectedOutcomesLevelLib();
var allocationCategoryOptionLevelLib = mapper.getAllocationCategoryOptionLevelLib();
var level4Lib = mapper.getLevel4();
/** ********************************************** */

var levelCampaign = "Marketing Sub Tactic";
var L6_MSG_INITIATIVE_NOT_FOUND = "The Marketing Sub Tactic can not be found.";
var L6_MSG_ROUTE_TO_MARKET_NULL = "The Route to market is mandatory.";
var L6_MSG_INITIATIVE_CRM_ACRONYM = "The Acronym has been used. The new Acronym is: ";
var L6_MSG_INITIATIVE_CRM_ACRONYM_EXISTS = "The Acronym has been used.";
var L6_MSG_USER_NOT_FOUND = "The User can not be found.";
var L6_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L6_MSG_CANNOT_DEL_STATUS = "Cannot delete this selected Marketing Sub Tactic, because the status doesn´t allow it.";
var L6_MSG_INITIATIVE_CRM_DESCRIPTION = "The Marketing Sub Tactic CRM description can not be null or empty.";
var L6_MSG_INITIATIVE_BUDGET_VALUE = "The Marketing Sub Tactic Budget value must be greater than zero.";
var L6_MSG_INITIATIVE_CURRENCY = "The Marketing Sub Tactic Currency can not be found.";
var L6_MSG_INITIATIVE_BUDGET_SPEND = "The Marketing Sub Tactic Budget spend must be set.";
var L6_MSG_INITIATIVE_BUDGET_SPEND_PERCENT = "The Marketing Sub Tactic Budget Spend must be 100%.";
var L6_MSG_INITIATIVE_RESULTS_CAMPAIGN_PERCENT = "The Marketing Sub Tactic Results Campaign must be 100%.";
var L6_MSG_INITIATIVE_MY_BUDGET = " The Marketing Sub Tactic in My Budget can not be found.";
var L6_MSG_INITIATIVE_BUDGET_PERCENT = "The Marketing Sub Tactic in My Budget percentage should be less than or equal to 100%.";
var L6_PARTNER_TYPE_NOT_VALID = "Partner type is not valid.";
var L6_PARTNER_NAME_NOT_FOUND = "Partner name can not be found.";
var L6_PARTNER_REGION_NOT_VALID = "Partner region is not valid.";
var L6_PARTNER_VALUE_NOT_VALID = "Partner value is not valid.";
var L6_PARTNER_AMOUNT_NOT_VALID = "Partner amount is not valid.";
var L6_PARTNER_INCOMPLETE_INTEL = "Intel Project ID, Claim ID and Comments must be filled in.";
var L6_PARTNER_INCOMPLETE_EXTERNAL_PARTNER = "Company Name and Company Address must be filled in.";
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
var L6_CAMPAIGN_FORECASTING_KPIS_VOLUME = "Campaign Forecasting / KPIS volume must be equal or lower than available volume.";
var L6_CAMPAIGN_FORECASTING_KPIS_VALUE = "Campaign Forecasting / KPIS value must be equal or lower than available value.";
var L6_MSG_RESULTS_CAMPAIGN = "The Marketing Sub Tactic, Results/Campaign Forecasting must be set.";
var L6_MSG_RESULTS_CAMPAIGN_PERCENT = "The Marketing Sub Tactic, Results/Campaign Forecasting must be 100%.";
var L6_MSG_COULDNT_CHAGE_STATUS = "Your records was saved as \"In progress\".  Please review your record for incomplete fields and/or pending budget approvals.";
var L6_CAMPAIGN_FORECASTING_KPIS_COMMENT = "Please enter a comment to explain expected outcomes as you didn't select any KPI type.";
var L6_MSG_INITIATIVE_PROPERTIES_CANNOT_UPDATE = "Once Marketing Sub Tactic is already in CRM, properties CRM ID, Cost Center and Markting Organization cannot be modified.";
var L6_MY_BUDGET_COMPLETE = "My Budget should be 100% complete.";
var L6_CATEGORY_NOT_VALID = "Category is not valid.";
var L6_CATEGORY_OPTIONS_INCORRECT_NUMBER = "Incorrect number of options.";
var L6_CATEGORY_OPTION_NOT_VALID = "Option or User is not valid.";
var L6_CATEGORY_TOTAL_PERCENTAGE = "Category total percentage should be less than or equal to 100%.";
var L6_COST_CENTER_NOT_VALID = "Cost Center cannot be empty.";
var L6_RESPONSIBLE_NOT_VALID = "Employee Responsible cannot be empty.";
var L6_RESPONSIBLE_PERSON_NOT_VALID = "Responsible Person cannot be empty.";
var L6_BUDGET_APPROVER_NOT_VALID = "Budget Approver cannot be empty.";
var L6_PRIORITY_NOT_VALID = "Priority cannot be empty.";
var L6_MSG_COULDNT_CHANGE_STATUS_DUE_PENDING_BUDGET_SPEND_REQUEST = "Your records was saved as \"In progress\".  Please review your record for incomplete fields and/or pending budget approvals.";
var L6_MSG_COULDNT_CHANGE_STATUS_DUE_OWN_MONEY_BUDGET_SPEND_REQUEST_STATUS = "Your records was saved as \"In progress\". Please review your record for Own Money Budget Request approval.";

var HL6_STATUS = {
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

var HIERARCHY_LEVEL = util.getHierarchyLevelEnum();

var map = {
    "REGION_ID": "ORGANIZATION_ID",
    "HL2_ID": "ORGANIZATION_ID",
    "PERCENTAGE": "PERCENTAGE"
};

/** ****************END CONSTANTS***************** */

function getHl6ByHl5Id(hl5Id) {
    var hl6List = dataHl6.getHl6ByHl5Id(hl5Id, true);
    var totalBudget = 0;
    var totalAllocated = 0;
    var remainingBudget = 0;
    var allHl6 = [];
    if (hl6List.length) {
        hl6List.forEach(function (hl6) {
            var aux = {};
            Object.keys(hl6).forEach(function (key) {
                if (key != 'HL5_PATH') {
                    //set view link to CRT
                    if (key === 'CRT_RELATED') {
                        aux.TO_CRT = hl6.STATUS_ID == HL6_STATUS.IN_CRM && hl6.CRT_RELATED;
                    } else {
                        aux[key] = hl6[key];
                    }
                } else {
                    //the full path from the query
                    aux.CRM_ID = hl6[key];
                }
            });
            allHl6.push(aux);
        });

        totalBudget = dataHl5.getHl5ById(hl5Id).BUDGET;
        totalAllocated = dataHl6.getHl6TotalBudgetByHl5Id(hl5Id);
        remainingBudget = totalBudget - totalAllocated;
    }

    var response = {
        "results": allHl6,
        "total_budget": totalBudget,
        "remaining_budget": remainingBudget,
        "total_allocated": totalAllocated
    };
    response.budget_year = budgetYear.getBudgetYearByLevelParent(6, hl5Id, true);
    return response;
}

/*function showLinkToCRT(hl6) {
    return hl6.STATUS_ID == HL6_STATUS.IN_CRM && hl6.CRT_RELATED;
}*/

/*function getHl6CategoryOption(hl6_id) {
    var hl6Categories = dataCategoryOptionLevel.getAllocationCategory(hl6_id, 'hl6');
    var result = [];
    var allocationOptions = util.getAllocationOptionByCategoryAndLevelId('hl6', hl6_id);

    hl6Categories.forEach(function (catgory) {
        var aux = util.extractObject(catgory);
        var hl6Category = {};
        aux["hl6_category_option"] = allocationOptions[aux.CATEGORY_ID];// dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevelId(aux.CATEGORY_ID, 'hl6', hl6_id);
        hl6Category.hl6_category_option = [];
        Object.keys(aux).forEach(function (key) {
            if (key === "hl6_category_option") {
                for (var i = 0; i < aux[key].length; i++) {
                    var option = {};
                    Object.keys(aux[key][i]).forEach(function (auxKey) {
                        option[auxKey] = aux[key][i][auxKey];
                    });
                    hl6Category.hl6_category_option.push(option);
                }
            } else {
                hl6Category[key] = aux[key];
            }
        });
        result.push(hl6Category);
    });
    return result;
}*/

function getHl6ById(hl6Id) {
    if (!hl6Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "hl6Services/handleGet/getHl6ById", L6_MSG_INITIATIVE_NOT_FOUND);

    var hl6 = JSON.parse(JSON.stringify(dataHl6.getHl6ById(hl6Id)));
    var internalCofunding = getInternalCofunding(hl6Id);
    var externalCofunding = getExternalCofunding(hl6Id);

    hl6.TARGET_KPIS = expectedOutcomesLib.getExpectedOutcomesByHl6Id(hl6Id, hl6.HL5_ID);
    hl6.BUDGET = Number(hl6.BUDGET);
    hl6.PARTNERS = externalCofunding.PARTNERS;
    hl6.PARTNER_INTEL_TOTAL = externalCofunding.PARTNER_INTEL_TOTAL;
    hl6.PARTNER_CURRENCY_ID = externalCofunding.PARTNER_CURRENCY_ID;
    hl6.PARTNER_EXTERNAL_TOTAL = externalCofunding.PARTNER_EXTERNAL_TOTAL;

    hl6.BUDGET_DISTRIBUTION = dataHl6.getHl6MyBudgetByHl6Id(hl6Id);

    hl6.SALES = internalCofunding.SALE;
    hl6.SALE_TOTAL = internalCofunding.SALE_TOTAL;
    hl6.SALE_CURRENCY_ID = internalCofunding.SALE_CURRENCY_ID;
    hl6.SALE_REQUESTS = internalCofunding.SALE_REQUESTS;

    hl6.CATEGORIES = getCategoryOption(hl6Id);

    hl6.TOTAL_BUDGET = (hl6.BUDGET +
        externalCofunding.PARTNER_INTEL_TOTAL / externalCofunding.PARTNER_CURRENCY_VALUE +
        hl6.SALE_TOTAL / internalCofunding.SALE_CURRENCY_VALUE +
        externalCofunding.PARTNER_EXTERNAL_TOTAL / externalCofunding.PARTNER_CURRENCY_VALUE).toFixed(2);

    hl6.IS_IN_CRM = !!dataHl6.hl6ExistsInCrm(hl6Id);

    hl6.BUDGET = hl6.BUDGET * Number(hl6.CURRENCY_VALUE);

    return serverToUiParser(hl6);
}

function getUserById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserById", L6_MSG_USER_NOT_FOUND);
    return dbUser.getUserById(id);

}

function getLevel6ForSearch(userSessionID, budget_year_id, region_id, subregion_id, limit, offset) {
    return dataHl6.getHl6ForSearch(userSessionID, util.isSuperAdmin(userSessionID) ? 1 : 0, budget_year_id, region_id || 0, subregion_id || 0, limit, offset || 0);
}

function getHl6ByHl5IdUserId(hl5Id, userId) {
    var crm = 'CRM-';
    var hl6List = dataHl6.getHl6ByHl5IdUserId(hl5Id, userId, util.isSuperAdmin(userId) ? 1 : 0);
    var result = {};
    var requestResult = {results: []};

    if (hl6List.length) {
        for (var i = 0; i < hl6List.length; i++) {
            if (!result[hl6List[i].HL5_ID]) {
                result[hl6List[i].HL5_ID] = {
                    PARENT_ID: hl6List[i].HL5_ID
                    , PARENT_PATH: hl6List[i].HL5_PATH
                    , CHILDREN: []
                };
            }
            if (hl6List[i].HL6_ID) {
                result[hl6List[i].HL5_ID].CHILDREN.push({
                    HL6_ID: hl6List[i].HL6_ID
                    , PARENT_ID: hl6List[i].HL5_ID
                    , STATUS_DETAIL: hl6List[i].STATUS_DETAIL
                    , HL6_PATH: hl6List[i].HL6_PATH
                    , CREATED_BY: hl6List[i].CREATED_BY
                    , HL6_BUDGET: hl6List[i].HL6_BUDGET
                    , IMPORTED: hl6List[i].IMPORTED
                    , CRT_RELATED: hl6List[i].CRT_RELATED
                    , CRM_DESCRIPTION: hl6List[i].CRM_DESCRIPTION
                    , BUDGET_SPEND_REQUEST_STATUS_ID: hl6List[i].BUDGET_SPEND_REQUEST_STATUS_ID
                    , BUDGET_SPEND_REQUEST_STATUS: hl6List[i].BUDGET_SPEND_REQUEST_STATUS
                })
            }
        }
        requestResult.results = util.objectToArray(result);
    }

    return requestResult;
}

function insertHl6(data, userId) {
    var hl6_id = 0;
    var pathHl6 = '';
    var validationResult = validateHl6(data, userId);
    data = uiToServerParser(data);
    data.STATUS_DETAIL_ID = validationResult.statusId;

    if (data.STATUS_DETAIL_ID > 0) {
        var conversionValue = dataCurrency.getCurrencyValueId(data.EURO_CONVERSION_ID);
        if(data.ALLOW_BUDGET_ZERO){
            data.BUDGET = 0;
            data.IN_BUDGET = 1;
        } else {
            data.BUDGET = Number(data.BUDGET) / conversionValue;
            data.IN_BUDGET = checkBudgetStatus(data.HL5_ID, hl6_id, data.BUDGET);
        }

        data.CREATED_USER_ID = userId;

        try{
            hl6_id = dataHl6.insertHl6(
                data.CRM_DESCRIPTION || 'N/D'
                , data.ACRONYM
                , data.BUDGET
                , data.HL5_ID
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
                , data.COUNTRY
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
                , data.ALLOW_BUDGET_ZERO
                , Number(data.IS_POWER_USER)
                , data.EMPLOYEE_RESPONSIBLE_USER
                , data.PERSON_RESPONSIBLE
            );
        }catch(e){
            if(e.name == "CRM Constraint Error"){
                var newAcronym = getNewHl6Id(data.HL5_ID);
                var newAcronymFormated = "00".substr(-1 + (newAcronym + "").length) + (newAcronym + "");
                var error = ErrorLib.getErrors().AcronymError("", "", L6_MSG_INITIATIVE_CRM_ACRONYM + (newAcronymFormated) );
                error.data = newAcronym;
                throw error;
            } else {
                throw e
            }
        }


        if (hl6_id > 0) {
            data.HL6_ID = hl6_id;
            var l4Id = dataHl5.getHl5ById(data.HL5_ID).HL4_ID;
            var approveBudget = blLevel2.getHl2AllowAutomaticBudgetApprovalByHl4Id(l4Id) && data.IN_BUDGET && !!Number(data.BUDGET);
            budgetSpendRequest.insertOwnMoneyBudgetSpendRequest(data.BUDGET, hl6_id, 'HL6', userId, approveBudget);
            insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, hl6_id);
            pathBL.insParentPath('hl6', hl6_id, data.HL5_ID, userId);
            insertExpectedOutcomes(data, userId);
            insertBudgetDistribution(data, userId);
            insertInternalCofunding(data, userId);
            insertExternalCoFunding(data, userId);
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

        hl6_id = dataHl6.insertHl6(data.HL6_CRM_DESCRIPTION,
            data.ACRONYM,
            data.BUDGET || 0,
            data.HL5_ID,
            data.ROUTE_TO_MARKET_ID,
            data.CAMPAIGN_OBJECTIVE_ID,
            data.CAMPAIGN_TYPE_ID,
            data.CAMPAIGN_SUBTYPE_ID,
            data.MARKETING_PROGRAM_ID,
            data.MARKETING_ACTIVITY_ID,
            data.ACTUAL_START_DATE,
            data.ACTUAL_END_DATE,
            data.SHOW_ON_DG_CALENDAR,//
            data.BUSINESS_OWNER_ID,//
            data.EMPLOYEE_RESPONSIBLE_ID,//for now just save cost_center_id
            data.COST_CENTER_ID,
            0,
            data.BUDGET_SPEND_Q1 || 0,
            data.BUDGET_SPEND_Q2 || 0,
            data.BUDGET_SPEND_Q3 || 0,
            data.BUDGET_SPEND_Q4 || 0,
            data.EURO_CONVERSION_ID,
            1,//data.HL6_STATUS_DETAIL_ID,
            data.SALES_ORGANIZATION_ID, //MARKETING ORGANIZATION
            data.CREATED_USER_ID,
            data.DISTRIBUTION_CHANNEL_ID,
            data.VENUE,
            data.CITY,
            data.COUNTRY,
            data.URL,
            0//data.RESULTS_CAMPAIGN_Q1,
            , 0//data.RESULTS_CAMPAIGN_Q2,
            , 0//data.RESULTS_CAMPAIGN_Q3,
            , 0//data.RESULTS_CAMPAIGN_Q4,
            , data.PLANNED_START_DATE,
            data.PLANNED_END_DATE,
            data.STREET,
            data.POSTAL_CODE
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


        if (hl6_id) {

            var mapCOL = util.getMapCategoryOption('hl6');

            var categoryOptionBulk = [];
            //insert categories
            data.categories.forEach(function (hl6Category) {
                hl6Category.OPTIONS.forEach(function (hl6CategoryOption) {
                    hl6CategoryOption.CREATED_USER_ID = userId;
                    hl6CategoryOption.AMOUNT = Number(hl6CategoryOption.VALUE) || 0;
                    hl6CategoryOption.UPDATED = Number(hl6CategoryOption.VALUE) ? 1 : 0;
                    hl6Category.categoryOptionLevelId = mapCOL[hl6Category.CATEGORY][hl6CategoryOption.OPTION_ID];
                    categoryOptionBulk.push({
                        in_hl6_id: hl6_id,
                        in_category_option_level_id: hl6Category.categoryOptionLevelId
                        , in_amount: hl6CategoryOption.AMOUNT
                        , in_user_id: userId
                        , in_updated: hl6CategoryOption.UPDATED
                    });
                });
            });
            dataCategoryOptionLevel.updateCategoryOption(categoryOptionBulk, 'hl6');
            var outcome = {};
            outcome.CREATED_USER_ID = userId;
            outcome.HL6_ID = hl6_id;
            outcome.COMMENTS = data.COMMENTS || "";
            var hl6_expected_outcomes_id = dataExOut.insertHl6ExpectedOutcomes(outcome.HL6_ID, outcome.COMMENTS, outcome.CREATED_USER_ID);
            data.expected_outcomes_detail.forEach(function (expectedOutcomeDetail) {
                expectedOutcomeDetail.CREATED_USER_ID = userId;
                expectedOutcomeDetail.HL6_EXPECTED_OUTCOMES_ID = hl6_expected_outcomes_id;
                expectedOutcomeDetail.VOLUME_VALUE = Number(expectedOutcomeDetail.VOLUME_VALUE);
                expectedOutcomeDetail.EURO_VALUE = Number(expectedOutcomeDetail.EURO_VALUE);
                var expectedoutcomelevelid = expectedOutcomeDetail.EXPECTED_OUTCOME_OPTION_ID;//dataExOut.getExpectedOutcomeLevelByLevelAndOptionId(HIERARCHY_LEVEL.HL6, expectedOutcomeDetail.EXPECTED_OUTCOME_OPTION_ID).EXPECTED_OUTCOME_LEVEL_ID;
                dataExOut.insertHl6ExpectedOutcomesDetail([{in_hl6_expected_outcomes_id: expectedOutcomeDetail.HL6_EXPECTED_OUTCOMES_ID, in_outcomes_id: expectedoutcomelevelid, in_euro_value: expectedOutcomeDetail.EURO_VALUE, in_volume_value: expectedOutcomeDetail.VOLUME_VALUE, in_created_user_id: userId}]);
            });

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

/*function insertExpectedOutcomes(userId, data) {
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

function insertBudget(data) {
    if (data.hl6_budget) {
        var data_budget = [];
        data.hl6_budget.forEach(function (myBudget) {
            data_budget.push({
                in_hl6_id: data.hl6.HL6_ID,
                in_organization_id: myBudget.ORGANIZATION_ID,
                in_percentage: myBudget.PERCENTAGE,
                in_organization_type: ORGANIZATION_TYPE[myBudget.ORGANIZATION_TYPE],
                in_created_user_id: data.hl6.CREATED_USER_ID || data.hl6.USER_ID
            });
        });
        dataHl6.insertHl6Budget(data_budget);
    }
}

function insertSales(data, userId) {
    var aux = {};
    if (data.hl6_sale && data.hl6_sale.length) {
        var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.SALE_CURRENCY_ID);
        var arrSaleHl6 = [];

        data.hl6_sale.forEach(function (sale) {
            if (!aux[sale.ORGANIZATION_ID]) {
                arrSaleHl6.push({
                    in_hl6_id: data.hl6.HL6_ID
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

        if (arrSaleHl6.length)
            dataHl6.insertHl6Sale(arrSaleHl6);

        if (!data.hl6.ALLOW_BUDGET_ZERO && data.hl6.CO_FUNDED && data.saleRequests && data.saleRequests.length)
            budgetSpendRequest.insertSalesBudgetSpendRequest(data.saleRequests, data.hl6.HL6_ID, 'HL6', internalCoFundingCurrency, userId);
    }
}

function insertPartners(data, userId) {
    if (!data.hl6.ALLOW_BUDGET_ZERO && data.hl6.CO_FUNDED && data.partners && data.partners.length) {
        var arrPartner = [];
        var externalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.PARTNER_CURRENCY_ID);
        data.partners.forEach(function (partner) {
            if (Number(partner.AMOUNT) && partner.MESSAGE) {
                var budgetSpendRequetId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, data.hl6.HL6_ID, 'HL6', externalCoFundingCurrency, userId);
                arrPartner.push({
                    in_hl6_id: data.hl6.HL6_ID
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
                    in_budget_spend_request: budgetSpendRequetId
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
            dataPartner.insertHl6Partner(arrPartner);
    }
}*/

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

function updateHl6(data, userId) {
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
    var hl4 = dataHl5.getHl5ById(data.HL5_ID);
    level4Lib.getImplementExecutionLevel(hl4.HL4_ID);
    data = uiToServerParser(data);
    var validationResult = validateHl6(data, userId);
    data.STATUS_DETAIL_ID = validationResult.statusId;

    if (data.STATUS_DETAIL_ID > 0) {
        var conversionValue = dataCurrency.getCurrencyValueId(data.EURO_CONVERSION_ID);
        if(data.ALLOW_BUDGET_ZERO){
            data.BUDGET = 0;
            data.IN_BUDGET = 1;
        } else {
            data.BUDGET = Number(data.BUDGET) / conversionValue;
            data.IN_BUDGET = checkBudgetStatus(data.HL5_ID, data.HL6_ID, data.BUDGET);
        }
        /*data.BUDGET_SPEND_Q1 = Number(data.BUDGET_SPEND_Q1);
        data.BUDGET_SPEND_Q2 = Number(data.BUDGET_SPEND_Q2);
        data.BUDGET_SPEND_Q3 = Number(data.BUDGET_SPEND_Q3);
        data.BUDGET_SPEND_Q4 = Number(data.BUDGET_SPEND_Q4);*/
        data.CREATED_USER_ID = userId;

        //TODO: delete verification before set validation
        /*data.RESULTS_CAMPAIGN_Q1 = data.RESULTS_CAMPAIGN_Q1 ? Number(data.RESULTS_CAMPAIGN_Q1) : 0;
        data.RESULTS_CAMPAIGN_Q2 = data.RESULTS_CAMPAIGN_Q2 ? Number(data.RESULTS_CAMPAIGN_Q2) : 0;
        data.RESULTS_CAMPAIGN_Q3 = data.RESULTS_CAMPAIGN_Q3 ? Number(data.RESULTS_CAMPAIGN_Q3) : 0;
        data.RESULTS_CAMPAIGN_Q4 = data.RESULTS_CAMPAIGN_Q4 ? Number(data.RESULTS_CAMPAIGN_Q4) : 0;*/

        // todo: set correct data

        var objHL6 = dataHl6.getHl6ById(data.HL6_ID);
        dataHl6.updateHl6(
            data.HL6_ID,
            data.HL6_CRM_DESCRIPTION || 'N/D',
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
            data.HL6_STATUS_DETAIL_ID,
            data.SALES_ORGANIZATION_ID || null,
            data.CREATED_USER_ID,
            data.DISTRIBUTION_CHANNEL_ID || 0,
            data.VENUE,
            data.CITY,
            data.COUNTRY,
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
            Number(data.IS_POWER_USER) === 0 ? 0 : 1,
            data.EMPLOYEE_RESPONSIBLE_USER,
            data.PERSON_RESPONSIBLE

        );
        insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, data.HL6_ID);

        var budgetSpendRequestStatus = budgetSpendRequest.getBudgetSpendRequestsStatus();
        var ownMoneyBudgetSpendRequestStatus = budgetSpendRequest.getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(data.hl6.HL6_ID, 'HL6');
        var automaticBudgetApproval = blLevel2.getHl2AllowAutomaticBudgetApprovalByHl5Id(data.hl6.HL5_ID) && data.hl6.IN_BUDGET && !!Number(data.BUDGET);
        if(!ownMoneyBudgetSpendRequestStatus || ownMoneyBudgetSpendRequestStatus == budgetSpendRequestStatus.NO_LONGER_REQUESTED){
            budgetSpendRequest.insertOwnMoneyBudgetSpendRequest(data.BUDGET, data.HL6_ID, 'HL6', userId, automaticBudgetApproval);
        } else {
            if (Number(objHL6.BUDGET).toFixed(2) != Number(data.BUDGET).toFixed(2)) {
                if (ownMoneyBudgetSpendRequestStatus && ownMoneyBudgetSpendRequestStatus != budgetSpendRequestStatus.PENDING)
                    throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePut/updateHl5", "Cannot update Marketing Subtactic Budget because Own money budget spend request is no longer in Pending Status.");

                budgetSpendRequest.updateOwnMoneyBudgetSpendRequestByHlIdLevel(data.hl6.HL6_ID, 'HL6', data.hl5.BUDGET, automaticBudgetApproval, userId);
            }
        }

        if(data.STATUS_DETAIL_ID != objHL6.HL6_STATUS_DETAIL_ID)
            setHl6Status(data.HL6_ID, data.HL6_STATUS_DETAIL_ID, userId);

        updateExpectedOutcomes(data, userId);
        updateBudgetDistribution(data, userId);
        updateCategoryOption(data, userId);

        if (data.ALLOW_BUDGET_ZERO) {
            budgetSpendRequest.setBudgetSpendRequestStatusNoLongerRequested(data.HL6_ID, 'HL6', userId);
        }
        else if (!data.CO_FUNDED) {
            budgetSpendRequest.disableCoFundedBudgetSpendRequests(data.HL6_ID, 'HL6', userId);
        } else {
            updateInternalCofunding(data, userId);
            updateExternalCoFunding(data, userId);
        }

        dataL6Report.updateLevel6ReportForDownload(data.HL6_ID); //Update Processing Report Export Data
        return data;
    }
}

/*function updateCategoryOptions(data, userId) {
    var mapCOL = util.getMapCategoryOption('hl6');
    var categoryOptionBulk = [];
    data.hl6_category.forEach(function (hl6Category) {
        if (hl6Category.hl6_category_option && hl6Category.hl6_category_option.length) {
            hl6Category.hl6_category_option.forEach(function (hl6CategoryOption) {
                hl6CategoryOption.AMOUNT = hl6CategoryOption.AMOUNT || 0;
                hl6CategoryOption.UPDATED = hl6CategoryOption.UPDATED || 0;
                hl6Category.CATEGORY_OPTION_LEVEL_ID = mapCOL[hl6Category.CATEGORY_ID][hl6CategoryOption.OPTION_ID];
                categoryOptionBulk.push({
                    in_category_option_level_id: hl6Category.CATEGORY_OPTION_LEVEL_ID
                    , in_amount: hl6CategoryOption.AMOUNT
                    , in_user_id: userId
                    , in_updated: hl6CategoryOption.UPDATED || 0
                    , in_hl6_id: data.hl6.HL6_ID
                });
            });
        } else {
            var allocationOptions = AllocationOptionLib.getAssignedOptionByCategoryIdByLevelId(hl6Category.CATEGORY_ID, HIERARCHY_LEVEL.HL6, true);
            allocationOptions.forEach(function (option) {
                hl6Category.categoryOptionLevelId = mapCOL[hl6Category.CATEGORY_ID][option.OPTION_ID];
                categoryOptionBulk.push({
                    in_category_option_level_id: hl6Category.categoryOptionLevelId
                    , in_amount: 0
                    , in_user_id: userId
                    , in_updated: 0
                    , in_hl6_id: data.hl6.HL6_ID
                });
            });
        }
    });
    dataCategoryOptionLevel.updateCategoryOption(categoryOptionBulk, 'hl6');
}

function updateExpectedOutcomes(data, userId) {
    dataExOut.deleteHl6ExpectedOutcomesDetail(data.HL6_ID, userId);
    dataExOut.deleteHl6ExpectedOutcomes(data.HL6_ID, userId);
    insertExpectedOutcomes(data, userId);
}

function updateBudget(data/!*, conversionValue*!/) {
    dataHl6.delHl6BudgetHard(data.hl6.HL6_ID, data.hl6.USER_ID);
    insertBudget(data/!*, conversionValue*!/);
}

function updateSales(data, userId) {
    if (data.hl6_sale && data.hl6_sale.length) {
        var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.SALE_CURRENCY_ID);
        var aux = {};
        var arrSaleHl6 = [];
        data.hl6_sale.forEach(function (sale) {
            sale.HL6_SALE_ID = data.hl6.HL6_ID;
            if (aux[sale.ORGANIZATION_ID]) {
                arrSaleHl6.push({
                    in_hl6_sale_id: sale.HL6_SALE_ID
                    , in_description: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] === 3 ? sale.DESCRIPTION : null
                    , in_currency_id: data.SALE_CURRENCY_ID
                    , in_user_id: userId
                });
                aux[sale.ORGANIZATION_ID] = sale.ORGANIZATION_TYPE;
            }
        });

        if (arrSaleHl6.length)
            dataHl6.updateHl6Sale(arrSaleHl6);

        /!**!/
        data.saleRequests = JSON.parse(JSON.stringify(data.saleRequests));
        data.saleRequests.forEach(function (sr) {
            var idSaleHl6 = findHLSalesId(data.hl6_sale, sr.ORGANIZATION_ID, sr.ORGANIZATION_TYPE);
            sr.HL_SALES_ID = idSaleHl6;
        });

        if (!data.hl6.ALLOW_BUDGET_ZERO && data.hl6.CO_FUNDED && data.saleRequests && data.saleRequests.length)
            budgetSpendRequest.updateSalesBudgetSpendRequest(data.saleRequests, data.hl6.HL6_ID, 'HL6', internalCoFundingCurrency, userId);
    }

    if (data.salesIdsRemoved && data.salesIdsRemoved.length) {
        var saleBudgetSpendRquestToDelete = data.salesIdsRemoved.map(function (id) {
            return {in_budget_spend_request_id: id, in_user_id: userId};
        });
        budgetSpendRequest.deleteBudgetSpendRequestBySale(saleBudgetSpendRquestToDelete, 'HL6');
    }
}*/

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

/*function updatePartners(data, userId) {
    if (!data.hl6.ALLOW_BUDGET_ZERO && data.hl6.CO_FUNDED && data.partners && data.partners.length) {
        var arrPartnerToInsert = [];
        var arrPartnerToUpdate = [];
        var budgetSpendRequestToUpdate = [];
        var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.PARTNER_CURRENCY_ID);
        data.partners.forEach(function (partner) {
            if (!partner.PARTNER_ID) {
                var budgetSpendRequetId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, data.hl6.HL6_ID, 'HL6', internalCoFundingCurrency, userId);
                arrPartnerToInsert.push({
                    in_hl6_id: data.hl6.HL6_ID
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
                    in_budget_spend_request: budgetSpendRequetId
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
            } else {
                budgetSpendRequestToUpdate.push({
                    in_budget_spend_request_id: partner.BUDGET_SPEND_REQUEST_ID
                    , in_amount: partner.AMOUNT / internalCoFundingCurrency
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
        if (arrPartnerToInsert.length)
            dataPartner.insertHl6Partner(arrPartnerToInsert);

        if (arrPartnerToUpdate.length)
            dataPartner.updatePartner(arrPartnerToUpdate, 'HL6');

        if (budgetSpendRequestToUpdate.length)
            budgetSpendRequest.updateBudgetSpendRequest(budgetSpendRequestToUpdate, userId, true);
    }

    if (data.partnersIdsRemoved && data.partnersIdsRemoved.length) {
        var arrPartnerToDelete = data.partnersIdsRemoved.map(function (id) {
            return {in_partner_id: id, in_user_id: userId};
        });

        var pendingPartner = dataPartner.getPendingPartnerByPartnerId(arrPartnerToDelete, 'HL6');

        arrPartnerToDelete = pendingPartner.map(function (elem) {
            return {in_partner_id: elem.PARTNER_ID, in_user_id: userId};
        });

        var arrBudgetSpendRequestToDelete = pendingPartner.map(function (elem) {
            return {in_budget_spend_request_id: elem.BUDGET_SPEND_REQUEST_ID, in_user_id: userId};
        });

        dataPartner.deleteHlPartnerByPartnerId(arrPartnerToDelete, 'HL6');
        budgetSpendRequest.deleteBudgetSpendRequest(arrBudgetSpendRequestToDelete);
    }
}*/

function deleteHl6(hl6, userId, rollBack) {
    hl6.HL6_ID = hl6.in_hl6_id;
    if (!hl6.HL6_ID && !rollBack)
        throw ErrorLib.getErrors().CustomError("",
            "hl6Services/handlePost/deletehl6",
            L6_MSG_INITIATIVE_NOT_FOUND);

    if (!rollBack && !util.validateIsNumber(hl6.HL6_ID))
        throw ErrorLib.getErrors().CustomError("",
            "hl6Services/handlePost/deletehl6",
            L6_MSG_INITIATIVE_NOT_FOUND);

    var userRoleId = Number(dbUserRole.getUserRoleByUserId(userId)[0].ROLE_ID);
    if (!rollBack && userRoleId !== 1 && userRoleId !== 2)
        throw ErrorLib.getErrors().CustomError("",
            "hl6Services/handlePost/deletehl6", L6_MSG_NO_PRIVILEGE);

    var hl6StatusId = !rollBack ? Number(dataHl6.getHl6StatusByHl6Id(hl6.HL6_ID).HL6_STATUS_DETAIL_ID) : 0;
    if (!rollBack
        && userRoleId !== 1
        && (hl6StatusId !== HL6_STATUS.IN_CRM && hl6StatusId !== HL6_STATUS.UPDATE_IN_CRM))
        throw ErrorLib.getErrors().CustomError("",
            "hl6Services/handlePost/deletehl6",
            L6_MSG_CANNOT_DEL_STATUS);

    hl6.USER_ID = userId;
    dataExOut.deleteHl6ExpectedOutcomesDetail(hl6.HL6_ID, hl6.USER_ID);
    dataExOut.deleteHl6ExpectedOutcomes(hl6.HL6_ID, hl6.USER_ID);
    level6DER.deleteL6ChangedFieldsByHl6Id(hl6.HL6_ID, hl6.USER_ID);
    dataHl6.delHl6Budget(hl6.HL6_ID, hl6.USER_ID);

    //delete HL5_SALE_BUDGET_SPEND_REQUEST
    databudgetSpendRequest.delAllHlSaleBudgetSpendRequestByHlId(hl6.HL6_ID, hl6.USER_ID, 'HL6'); //ready
    dataHl5.deleteHl5Sale(hl6.HL6_ID, hl6.USER_ID);
    //BUDGET_SPEND_REQUEST_LOG_STATUS
    databudgetSpendRequest.delAllBudgetSpendRequestLogStatusByHlId(hl6.HL6_ID, hl6.USER_ID, 'HL6');//ready
    //BUDGET_SPEND_REQUEST_MESSAGE
    databudgetSpendRequest.delAllBudgetSpendRequestMessageByHlId(hl6.HL6_ID, hl6.USER_ID, 'HL6');
    //DEL_ALL_BUDGET_SPEND_REQUEST_BY_HL5_ID
    databudgetSpendRequest.delAllBudgetSpendRequestByHlId(hl6.HL6_ID, hl6.USER_ID, 'HL6');//ready
    dataPath.delParentPath('hl6', hl6.HL6_ID);

    dataPartner.deleteHl6Partner(hl6.HL6_ID, hl6.USER_ID);
    dataHl6.delHl6Sale(hl6.HL6_ID, hl6.USER_ID);
    dataHl6.delHl6(hl6.HL6_ID, hl6.USER_ID);

    dataL6Report.updateLevel6ReportForDownload(hl6.HL6_ID); //Update Processing Report Export Data
    return hl6;
}

function isComplete(data) {
    var deReportDisplayName = level6DER.getProcessingReportFields();
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
                isComplete = !data.HL6_ID ? data.CATEGORIES.length === dataCategory.getAllocationCategoryCountByHlId("hl6") : isComplete;
                if (isComplete) {
                    for (var j = 0; j < data.CATEGORIES.length; j++) {
                        var hl6Category = data.CATEGORIES[j];
                        var percentagePerOption = 0;

                        isComplete = isComplete && !!(hl6Category.CATEGORY_ID && Number(hl6Category.CATEGORY_ID));
                        var countOptions = dataOption.getAllocationOptionCountByCategoryIdLevelId(hl6Category.CATEGORY_ID, 'hl6');
                        isComplete = isComplete && (!data.HL6_ID ?
                            hl6Category.OPTIONS.length === countOptions
                            : isComplete);

                        hl6Category.OPTIONS.forEach(function (option) {
                            isComplete = isComplete && !!(option.OPTION_ID && Number(option.OPTION_ID));
                            isComplete = isComplete && !(Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0);

                            percentagePerOption = percentagePerOption + Number(option.AMOUNT);
                        });

                        isComplete = isComplete && percentagePerOption === 100;
                        if (!isComplete)
                            break;
                    }
                }

                break;
            case "BUDGET":
                isComplete = !!(!data.ALLOW_BUDGET_ZERO && Number(data.BUDGET));
                break;
            case "MARKETING_PROGRAM_ID":
                isComplete = !!data.MARKETING_PROGRAM;
                break;
            case "MARKETING_ACTIVITY_ID":
                isComplete = !!data.MARKETING_ACTIVITY;
                break;
            default:
                if (notValidate.indexOf(crmBindingField) < 0)
                    isComplete = !!data[crmBindingField];
                break;
        }
        if (!isComplete)
            break;
    }
    if (isComplete) {
        isComplete = (Number(data.BUDGET_SPEND_Q1) || 0)
            + (Number(data.BUDGET_SPEND_Q2) || 0)
            + (Number(data.BUDGET_SPEND_Q3) || 0)
            + (Number(data.BUDGET_SPEND_Q4) || 0) === 100;

        isComplete = isComplete && (data.TARGET_KPIS && !data.TARGET_KPIS.KPIS.length && !data.TARGET_KPIS.COMMENTS);
    }
    return isComplete;
}

function validateHl6(data, userId) {
    var existInCrm = 0;
    var statusId = HL6_STATUS.IN_PROGRESS;
    var crmBindingChangedFields = [];
    var crmBindingChangedFieldsUpdate = [];
    var myBudgetComplete = false;
    var categoryOptionComplete = false;
    var isHl6Complete = isComplete(data);
    if (isHl6Complete) {
        if (!data)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_NOT_FOUND);

        if (data.HL6_ID && dataHl6.hl6ExistsInCrm(data.HL6_ID)) {
            var hl6 = dataHl6.getHl6ById(data.HL6_ID);
            if (hl6.ACRONYM != data.ACRONYM
                || hl6.COST_CENTER_ID != data.COST_CENTER_ID
                || hl6.SALES_ORGANIZATION_ID != data.SALES_ORGANIZATION_ID)
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_PROPERTIES_CANNOT_UPDATE);
        }

        if (!data.CRM_DESCRIPTION)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CRM_DESCRIPTION);

        if (!Number(data.DISTRIBUTION_CHANNEL_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_DISTRIBUTION_CHANNEL);

        if (!data.ALLOW_BUDGET_ZERO) {
            if (data.BUDGET <= 0)
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_VALUE);
        }

        if (!data.ROUTE_TO_MARKET_ID || !Number(data.ROUTE_TO_MARKET_ID) || !dataRTM.getRouteToMarketById(data.ROUTE_TO_MARKET_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_ROUTE_TO_MARKET);

        if (!data.CAMPAIGN_OBJECTIVE_ID || !Number(data.CAMPAIGN_OBJECTIVE_ID) || !dataObj.getObjectiveById(data.CAMPAIGN_OBJECTIVE_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CAMPAIGN_OBJECTIVE);

        if (!data.CAMPAIGN_TYPE_ID || !Number(data.CAMPAIGN_TYPE_ID) || !dataCT.getCampaignTypeById(data.CAMPAIGN_TYPE_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CAMPAIGN_TYPE);

        if (!data.CAMPAIGN_SUBTYPE_ID || !Number(data.CAMPAIGN_SUBTYPE_ID) || !dataCST.getCampaignSubTypeById(data.CAMPAIGN_SUBTYPE_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CAMPAIGN_SUBTYPE);

        if (!data.PRIORITY_ID || data.PRIORITY_ID < 0)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PRIORITY_NOT_VALID);

        if (!data.ACTUAL_START_DATE /*|| !isNaN((new Date(data.hl6.ACTUAL_START_DATE)).getDate())*/)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_ACTUAL_START_DATE);

        if (!data.ACTUAL_END_DATE /*|| !isNaN((new Date(data.hl6.ACTUAL_END_DATE)).getDate())*/)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_ACTUAL_END_DATE);

        if (util.validateDateEndMayorStart((new Date(data.ACTUAL_START_DATE)), (new Date(data.ACTUAL_END_DATE))))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_INVALID_DATE_RANGE);

        if (data.EURO_CONVERSION_ID < 0)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CURRENCY);

        if (!Number(data.EURO_CONVERSION_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_CURRENCY);

        if (!data.BUDGET_SPEND_Q1 && !data.BUDGET_SPEND_Q2 && !data.BUDGET_SPEND_Q3 && !data.BUDGET_SPEND_Q4)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_SPEND);

        if (((Number(data.BUDGET_SPEND_Q1) || 0) +
                (Number(data.BUDGET_SPEND_Q2) || 0) +
                (Number(data.BUDGET_SPEND_Q3) || 0) +
                (Number(data.BUDGET_SPEND_Q4) || 0)) < 100)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_SPEND_PERCENT);

        if (((Number(data.RESULTS_CAMPAIGN_Q1) || 0) +
                (Number(data.RESULTS_CAMPAIGN_Q2) || 0) +
                (Number(data.RESULTS_CAMPAIGN_Q3) || 0) +
                (Number(data.RESULTS_CAMPAIGN_Q4) || 0)) < 100)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_RESULTS_CAMPAIGN_PERCENT);

        myBudgetComplete = validateBudgetDistribution(data);
        validateSales(data);
        validateKpi(data);
        validatePartners(data);
        categoryOptionComplete = validateCategoryOption(data);

        var crmFieldsHasChangedResult = crmFieldsHaveChanged(data, data.ALLOW_BUDGET_ZERO || (categoryOptionComplete && myBudgetComplete), userId);
        var crmFieldsHasChanged = crmFieldsHasChangedResult.crmFieldsHaveChanged;
        crmBindingChangedFields = crmFieldsHasChangedResult.crmBindingChangedFields;
        crmBindingChangedFieldsUpdate = crmFieldsHasChangedResult.crmBindingChangedFieldsUpdate;
        if (data.HL6_ID) {
            if (!data.ALLOW_BUDGET_ZERO && data.STATUS_DETAIL_ID != HL6_STATUS.VALID_FOR_CRM && !myBudgetComplete)
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl6", L6_MY_BUDGET_COMPLETE);

            existInCrm = dataHl6.hl6ExistsInCrm(data.HL6_ID);

            var objHL6 = dataHl6.getHl6ById(data.HL6_ID);
            if (existInCrm && data.ACRONYM.toUpperCase() != objHL6.ACRONYM.toUpperCase())
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_IN_CRM);

            var categoryHasChanged = categoryChanged(data, existInCrm);

            if (!crmFieldsHasChanged && !categoryHasChanged && !Number(budgetSpendRequest.countPendingBudgetRequestByHl6Id(data.HL6_ID)))
                statusId = data.STATUS_DETAIL_ID;
            else
                statusId = HL6_STATUS.VALID_FOR_CRM;
        } else {
            statusId = HL6_STATUS.VALID_FOR_CRM;
        }
    }
    return {
        statusId: statusId
        , isComplete: isHl6Complete
        , crmBindingChangedFields: crmBindingChangedFields
        , crmBindingChangedFieldsUpdate: crmBindingChangedFieldsUpdate
    };
}

function categoryChanged(data, existInCrm) {
    var optionChange = false;
    //obtain the CATEGORY options in bd
    var hl6_categoryBD = getCategoryOption(data.HL6_ID);

    var optionChange = CompareCategories(data.CATEGORIES, hl6_categoryBD, existInCrm);

    return optionChange;
}

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
    return CompareListOptions(Category1.OPTIONS, Category2.OPTIONS, existInCrm)
}

function CompareCategories(ListCategories1, ListCategories2, existInCrm) {

    var flag = false;
    var actualCategory = util.getCategoryById('hl6');
    for (var i = 0; i < ListCategories1.length; i++) {
        var category = ListCategories1[i];
        if (actualCategory[category.CATEGORY_ID].IN_PROCESSING_REPORT)
            flag = CompareCategoryOption(category, category.CATEGORY_ID, ListCategories2, existInCrm) || flag;
    }
    return flag;
}

function isMyBudgetComplete(budgetDistribution) {
    var myBudgetTotalPercentage = 0;
    var myBudgetComplete = false;

    budgetDistribution.forEach(function (budgetDistribution) {
        if (!budgetDistribution.ORGANIZATION_ID || !Number(budgetDistribution.ORGANIZATION_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", levelCampaign + " in My Budget " + budgetDistribution.ORGANIZATION_ID + " can not be found.");

        myBudgetTotalPercentage += Number(budgetDistribution.PERCENTAGE);
    });

    if (myBudgetTotalPercentage > 100)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_BUDGET_PERCENT);

    myBudgetTotalPercentage = myBudgetTotalPercentage < 100 ? 0 : myBudgetTotalPercentage;

    myBudgetComplete = !!myBudgetTotalPercentage;
    return myBudgetComplete;
}

function isCategoryOptionComplete(data) {
    var categoryOptionComplete = false;
    for (var i = 0; i < data.CATEGORIES.length; i++) {
        var hl6Category = data.CATEGORIES[i];
        var percentagePerOption = 0;
        if (!hl6Category.CATEGORY_ID || !Number(hl6Category.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_NOT_VALID);

        if (!hl6Category.OPTIONS.length)
            percentagePerOption = 100;
        //TODO review. Workaround for empty categories on edit
        //throw ErrorLib.getErrors().CustomError("","hl6Services/handlePost/insertHl6", L6_CATEGORY_OPTIONS_NOT_EMPTY);

        if (!data.HL6_ID && hl6Category.OPTIONS.length !== dataOption.getAllocationOptionCountByCategoryIdLevelId(hl6Category.CATEGORY_ID, 'hl6'))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_OPTIONS_INCORRECT_NUMBER);

        hl6Category.OPTIONS.forEach(function (option) {
            if (!option.OPTION_ID || !Number(option.OPTION_ID))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.AMOUNT) && !Number(option.AMOUNT)) || Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0)
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", "Option value is not valid (actual value " + option.AMOUNT + ")");

            percentagePerOption = percentagePerOption + Number(option.AMOUNT);
        });
        if (percentagePerOption > 100) {
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_TOTAL_PERCENTAGE);
        } else if (percentagePerOption < 100) {
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

function checkBudgetStatus(objHl5, hl6_id, new_hl6_budget) {
    if (!hl6_id) hl6_id = 0;
    if (Number(objHl5) && (new_hl6_budget || new_hl6_budget == 0)) {
        var objHl = {};
        objHl.HL5_ID = objHl5;
        objHl.HL6_ID = hl6_id;
        var hl5 = dataHl5.getHl5ById(objHl.HL5_ID);
        var hl5AllocatedBudget = dataHl5.getHl5AllocatedBudget(objHl.HL5_ID, hl6_id);
        return (Number(hl5.BUDGET) - Number(hl5AllocatedBudget) - Number(new_hl6_budget)) >= 0 ? 1 : 0;
    } else {
        var result = {};
        result.out_result = 0;
        // lists of hl6 changed to send email to client
        result.emailListInBudget = [];
        result.emailListOutBudget = [];
        var hl5Id = Number(objHl5) ? objHl5 : objHl5.HL5_ID;
        var resultHl6 = dataHl6.getHl6ByHl5Id(hl5Id);

        if (resultHl6.length > 0) {
            var total = 0;

            for (var i = 0; i < resultHl6.length; i++) {
                if (parseFloat(objHl5.BUDGET) < total + parseFloat(resultHl6[i].HL6_BUDGET)) {
                    dataHl6.hl6ChangeInOUTBudget(resultHl6[i].HL6_ID, 0);
                    // store hl6id and users to be send email when register
                    // change to in budget
                    result.emailListOutBudget.push(resultHl6[i]);
                } else {
                    dataHl6.hl6ChangeInOUTBudget(resultHl6[i].HL6_ID, 1);
                    total = total + parseFloat(resultHl6[i].HL6_BUDGET);
                    // store hl6id and users to be send email when register
                    // change to in budget
                    result.emailListInBudget.push(resultHl6[i]);
                }
            }
            result = resultHl6.length;
        }
        return result;
    }
}

/* Function to set HL6 status */
function setHl6Status(hl6_id, status_id, userId) {
    if (hl6_id && status_id && userId) {
        dataHl6.hl6ChangeStatus(hl6_id, status_id, userId);
        dataHl6.insertHl6LogStatus(hl6_id, status_id, userId);
        if (HL6_STATUS.IN_CRM == status_id) {
            level6DER.deleteL6ChangedFieldsByHl6Id(hl6_id);
            resetHl6CategoryOptionUpdated(hl6_id, userId)
        }
        dataL6Report.updateLevel6ReportForDownload(hl6_id);
    }

    return true;
}

function resetHl6CategoryOptionUpdated(hl6Id, userId) {
    return dataCategoryOptionLevel.resetHl4CategoryOptionUpdated(hl6Id, 'hl6', userId);
}

function setHl6StatusInCRM(hl6_id, userId) {
    var hl6Ids = [];
    var result;

    if (hl6_id.constructor === Array) {
        hl6Ids = hl6_id;
    } else {
        hl6Ids.push(hl6_id);
    }

    for (var i = 0; i < hl6Ids; i++) {
        result = null;
        result = setHl6Status(hl6Ids[i], HL6_STATUS.IN_CRM, userId);
        if (result) {
            mail.sendInCRMMail(hl6Ids[i], "hl6");
        }
    }

    return 1;
}

function changeHl6StatusOnDemand(hl6_id, userId) {
    var hl6 = dataHl6.getHl6ById(hl6_id);
    var existInCrm = dataHl6.hl6ExistsInCrm(hl6_id);
    var statusId = null;

    if (hl6.HL6_STATUS_DETAIL_ID == HL6_STATUS.IN_PROGRESS) {
        if (!hl6.ALLOW_BUDGET_ZERO) {
            var hl6_category = getCategoryOption(hl6_id);
            var myBudget = dataHl6.getHl6MyBudgetByHl6Id(hl6_id);

            var isComplete = isMyBudgetComplete(myBudget) && isCategoryOptionComplete({
                CATEGORIES: hl6_category,
                HL6_ID: hl6_id
            });

            var hasBudgetRequestPending = budgetSpendRequest.countPendingBudgetRequestByHl6Id(hl6_id) > 0;
            var budgetSpendRequestStatus = budgetSpendRequest.getBudgetSpendRequestsStatus();
            if (!isComplete || !hl6.EMPLOYEE_RESPONSIBLE_USER || !hl6.COST_CENTER_ID)
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePut/changeHl6Status", L6_MSG_COULDNT_CHANGE_STATUS);

            if (hasBudgetRequestPending)
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePut/changeHl6Status", L6_MSG_COULDNT_CHANGE_STATUS_DUE_PENDING_BUDGET_SPEND_REQUEST);

        var ownMoneyBudgetSpendRequestStatus = budgetSpendRequest.getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(hl6_id, 'HL6');
        if (ownMoneyBudgetSpendRequestStatus && ownMoneyBudgetSpendRequestStatus != budgetSpendRequestStatus.APPROVED)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePut/updateHl5", L6_MSG_COULDNT_CHANGE_STATUS_DUE_OWN_MONEY_BUDGET_SPEND_REQUEST_STATUS);
        }

        statusId = existInCrm ? HL6_STATUS.UPDATE_IN_CRM : HL6_STATUS.CREATE_IN_CRM;
    } else {
        statusId = hl6.HL6_STATUS_DETAIL_ID;
    }

    return setHl6Status(hl6_id, statusId, userId);
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
        var oldHl6 = dataHl6.getHl6ById(data.HL6_ID);
        var existInCrm = dataHl6.hl6ExistsInCrm(data.HL6_ID);
        var l6CrmBindigFields = util.getMapHl6ChangedFieldsByHl6Id(data.HL6_ID);

        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var oldParentPath = '';
                var parentPath = '';
                if (field == "PARENT_PATH") {
                    oldParentPath = dataPath.getCrmParentPathByIdLevelId('hl6', data.HL6_ID)[0].PARENT_PATH;
                    parentPath = pathBL.getPathByLevelParentForCrm('hl6', data.HL4_ID);
                }
                var parameters = {
                    "in_hl6_id": data.HL6_ID,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };

                if (field.indexOf('_DATE') <= 0) {
                    var fieldChanged = field == 'BUDGET' ? Number(oldHl6[field]) != Number(data[field]) : oldHl6[field] != data[field];
                }

                else {
                    fieldChanged = new Date(oldHl6[field]).valueOf() !== new Date(data[field]).valueOf();
                }

                if (fieldChanged || oldParentPath != parentPath) {

                    if (oldParentPath) {
                        if (oldParentPath != parentPath) {
                            pathBL.updParentPath('hl6', data.HL6_ID, parentPath, userId);
                        }
                    } else {
                        pathBL.insParentPath('hl6', data.HL6_ID, data.HL5_ID, userId);
                    }

                    var in_hl6_crm_binding_id = l6CrmBindigFields[field] ? l6CrmBindigFields[field].HL6_CRM_BINDING_ID : null;

                    if (in_hl6_crm_binding_id) {
                        parameters.in_hl6_crm_binding_id = in_hl6_crm_binding_id;
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

function sendProcessingReportEmail(hl6Id) {
    var appUrl = config.getAppUrl();
    var hl6 = dataHl6.getHl6ById(hl6Id);
    //var hl5 = dataHl5.getHl5ById(hl6.HL5_ID);
    var hl6OwnerEmail = getUserById(hl6.CREATED_USER_ID).EMAIL;
    var body = '<p> Dear Colleague </p>';
    body += '<p>An initiative has been created in CRM.</p><br>';
    body += '<p>' + appUrl + '/TeamPlanHierarchy/Level5/edit/' + hl6.HL5_ID
        + '/' + hl6Id + '</p>';

    var mailObject = mail.getJson([{
        "address": hl6OwnerEmail
    }], "Marketing Planning Tool - Interlock Process", body);

    mail.sendMail(mailObject, true);
}

/*var map = {
    "in_acronym": "ACRONYM",
    "in_hl6_id": "HL6_ID",
    "in_sales_organization_id": "SALES_ORGANIZATION_ID",
    "in_objective_id": "OBJECTIVE_ID",
    "in_hl6_crm_description": "HL6_CRM_DESCRIPTION",
    "in_hl5_id": "HL5_ID",
    "in_route_to_market_id": "ROUTE_TO_MARKET_ID",
    "in_campaign_objective_id": "CAMPAIGN_OBJECTIVE_ID",
    "in_campaign_type_id": "CAMPAIGN_TYPE_ID",
    "in_campaign_subtype_id": "CAMPAIGN_SUBTYPE_ID",
    "marketing_program_id": "MARKETING_PROGRAM_ID",
    "marketing_activity_id": "MARKETING_ACTIVITY_ID",
    "in_actual_start_date": "ACTUAL_START_DATE",
    "in_actual_end_date": "ACTUAL_END_DATE",
    "show_on_dg_calendar": "SHOW_ON_DG_CALENDAR",
    "business_process_owner_id": "BUSINESS_OWNER_ID",
    "in_employee_responsible_id": "EMPLOYEE_RESPONSIBLE_ID",
    "in_cost_center_id": "COST_CENTER_ID",
    "in_hl6_fnc_budget_spend_q1": "BUDGET_SPEND_Q1",
    "in_hl6_fnc_budget_spend_q2": "BUDGET_SPEND_Q2",
    "in_hl6_fnc_budget_spend_q3": "BUDGET_SPEND_Q3",
    "in_hl6_fnc_budget_spend_q4": "BUDGET_SPEND_Q4",
    "in_euro_conversion_id": "EURO_CONVERSION_ID",
    "in_hl6_fnc_budget_total_mkt": "BUDGET",
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
    "in_partner_name": "NAME",
    "in_partner_type_id": "PARTNER_TYPE_ID",
    "in_value": "VALUE",
    "in_budget": "BUDGET",
    "distribution_channel_id": "DISTRIBUTION_CHANNEL_ID",
    "in_option_id": "OPTION_ID",
    "in_comments": "COMMENTS",
    "in_outcomes_id": "OUTCOMES_ID",
    "in_euro_value": "EURO_VALUE",
    "in_amount_value": "VOLUME_VALUE",
    "in_results_campaign_q1": "RESULTS_CAMPAIGN_Q1",
    "in_results_campaign_q2": "RESULTS_CAMPAIGN_Q2",
    "in_results_campaign_q3": "RESULTS_CAMPAIGN_Q3",
    "in_results_campaign_q4": "RESULTS_CAMPAIGN_Q4",
    "venue": "VENUE",
    "city": "CITY",
    "country": "COUNTRY",
    "url": "URL",
    "in_planned_start_date": "PLANNED_START_DATE",
    "in_planned_end_date": "PLANNED_END_DATE",
    "street": "STREET",
    "postal_code": "POSTAL_CODE",
    "in_category_id": "CATEGORY_ID",
    "in_in_processing_report": "IN_PROCESSING_REPORT",
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
    "full_name": "FULL_NAME",
    "email": "EMAIL",
    "in_budget_spend_request_id": "BUDGET_SPEND_REQUEST_ID"
};*/

/*function uiToServerParser(object) {
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

    data.hl6_budget = data.hl6_budget.regions.concat(data.hl6_budget.routes);
    data.hl6_sale = data.hl6_sale.regions.concat(data.hl6_sale.routes.concat(data.hl6_sale.others));
    data.hl6.BUDGET_SPEND_Q1 = data.hl6_fnc.BUDGET_SPEND_Q1;
    data.hl6.BUDGET_SPEND_Q2 = data.hl6_fnc.BUDGET_SPEND_Q2;
    data.hl6.BUDGET_SPEND_Q3 = data.hl6_fnc.BUDGET_SPEND_Q3;
    data.hl6.BUDGET_SPEND_Q4 = data.hl6_fnc.BUDGET_SPEND_Q4;
    data.hl6.EURO_CONVERSION_ID = data.hl6_fnc.EURO_CONVERSION_ID;
    data.hl6.BUDGET = data.hl6_fnc.BUDGET ? data.hl6_fnc.BUDGET : 0;
    data.hl6.CO_FUNDED = data.hl6_fnc.CO_FUNDED ? 1 : 0;
    data.hl6.ALLOW_BUDGET_ZERO = data.hl6_fnc.ALLOW_BUDGET_ZERO ? 1 : 0;

    data.hl6_fnc = undefined;

    return data;
}

function serverToUiParser(object) {
    var hl6_sale = {
        regions: [],
        globalteams: [],
        others: [],
        total: ''
    };
    var hl6_budget = {
        regions: [],
        globalteams: []
    };
    object.myBudget.forEach(function (obj) {
        var aux = {};
        if (obj.ORGANIZATION_TYPE === 1) {
            aux.REGION_ID = obj.ORGANIZATION_ID;
            aux.PERCENTAGE = obj.PERCENTAGE;
            aux.REGION_NAME = obj.ORGANIZATION_NAME;
            hl6_budget.regions.push(aux);
        } else {
            aux.ROUTE_ID = obj.ORGANIZATION_ID;
            aux.PERCENTAGE = obj.PERCENTAGE;
            aux.GLOBAL_TEAM_NAME = obj.ORGANIZATION_NAME;
            hl6_budget.globalteams.push(aux);
        }
    });
    object.sale.saleRequests.forEach(function (obj) {
        var aux = {};
        aux.HL6_SALES_ID = obj.HL6_SALES_ID;
        if (obj.ORGANIZATION_TYPE === 1) {
            aux.REGION_ID = obj.ORGANIZATION_ID;
            aux.AMOUNT = obj.AMOUNT;
            aux.REGION_NAME = obj.ORGANIZATION_NAME;
            hl6_sale.regions.push(aux);
        } else if (obj.ORGANIZATION_TYPE === 2) {
            aux.ROUTE_ID = obj.ORGANIZATION_ID;
            aux.AMOUNT = obj.AMOUNT;
            aux.GLOBAL_TEAM_NAME = obj.ORGANIZATION_NAME;
            hl6_sale.globalteams.push(aux);
        } else {
            aux.DESCRIPTION = obj.DESCRIPTION;
            aux.AMOUNT = obj.AMOUNT;
            hl6_sale.others.push(aux);
        }
        aux.MESSAGE = obj.MESSAGE;
    });
    hl6_sale.total = object.sale.total;
    hl6_sale.saleCurrencyId = object.sale.saleRequestsCurrencyId;
    object.saleRequests = object.sale.salesRequestLoaded;
    object.sale = hl6_sale;
    object.myBudget = hl6_budget;

    return object;
}*/

function getNewHl6Id(HL5_ID) {
    return dataHl6.getNewHl6Id(HL5_ID);
}

function getHl6Categories(hl5_id) {
    var hl5_category = level5Lib.getHl5CategoryOption(hl5_id);
    var hl6_category = JSON.parse(JSON.stringify(allocationCategory.getCategoryByHierarchyLevelId(HIERARCHY_LEVEL.HL6).results));
    hl6_category = hl6_category.map(function (category) {
        category.hl6_category_option = JSON.parse(JSON.stringify(dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevel(category.CATEGORY_ID, 'hl6')));
        return category;
    });

    return hl6_category.map(function (category) {

        var hl5Cat = extractElementByList(hl5_category, "CATEGORY_NAME", category.NAME);
        if (hl5Cat) {
            category.CATEGORY_NAME = category.NAME;
            category.hl6_category_option.map(function (option) {
                var hl5option = extractElementByList(hl5Cat.hl5_category_option, "OPTION_NAME", option.OPTION_NAME);
                option.AMOUNT = hl5option ? hl5option.AMOUNT : 0;
                option.NAME = option.OPTION_NAME;
                return option;
            });
        }
        return category;
    });

}

function extractElementByList(list, criterion, value) {
    for (var i = 0; i < list.length; i++) {
        if (list[i][criterion] == value) return list[i];
    }

    return null;
}

/*function getHl6ExpectedOutcomesOptions(hl5_id) {
    var expectedOutcomesL5 = expectedOutcomesLib.getExpectedOutcomesByHl5Id(hl5_id);
    var expectedOutcomesL6 = {};
    var expectedOutcomesDetailL6 = [];

    if (expectedOutcomesL5 && expectedOutcomesL5.detail) {
        for (var i = 0; i < expectedOutcomesL5.detail.length; i++) {
            var reg = expectedOutcomesL5.detail[i];
            var expectedOutcomeLevelId = expectedOutcomesLib.getOutcomesLevelByOptionNameOutcomeIdAndLevelId(reg.OUTCOMES_NAME, reg.OUTCOMES_TYPE_ID, 'HL6');
            if (expectedOutcomeLevelId) {
                expectedOutcomesL5.detail[i] = JSON.parse(JSON.stringify(expectedOutcomesL5.detail[i]));
                expectedOutcomesL5.detail[i].OUTCOMES_ID = expectedOutcomeLevelId.EXPECTED_OUTCOME_OPTION_ID;
                expectedOutcomesDetailL6.push(expectedOutcomesL5.detail[i]);
            }
        }
        expectedOutcomesL6.COMMENTS = expectedOutcomesL5.COMMENTS;
    }
    expectedOutcomesL6.detail = expectedOutcomesDetailL6;
    return expectedOutcomesL6;
}*/

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

function checkPermission(userSessionID, method, hl6Id) {
    if (((method && method == "GET_BY_HL6_ID") || !method) && !util.isSuperAdmin(userSessionID)) {
        var hl6 = dataHl6.getHl6ById(hl6Id);
        var hl5 = dataHl5.getHl5ById(hl6.HL5_ID);
        var hl4 = dataHl4.getHl4ById(hl5.HL4_ID);
        var l3 = dataHl3.getLevel3ById(hl4.HL3_ID, userSessionID);
        var usersL3 = userBL.getUserByHl3Id(hl4.HL3_ID, l3.HL2_ID).users_in;
        var users = usersL3.find(function (user) {
            return user.USER_ID == userSessionID
        });
        if (!users) {
            throw ErrorLib.getErrors().CustomError("", "level3/handlePermission", "User hasn´t permission for this resource.");
        }
    }
}

/*function getExpectedOutcomesByHl6Id(hl6Id, hl5Id) {
    return expectedOutcomesLib.getExpectedOutcomesByHl6Id(hl6Id, hl5Id);
}*/


/*******************************************************************/
function insertCategoryOption(data, userId) {
    var categoryOptionBulk = [];
    var mapCOL = util.getMapCategoryOption('hl6');

    data.CATEGORIES.forEach(function (hl1Category) {
        /*var options = hl1Category.OPTIONS && hl1Category.OPTIONS.length ? hl1Category.OPTIONS
            : AllocationOptionLib.getAssignedOptionByCategoryIdByLevelId(hl6Category.CATEGORY_ID, HIERARCHY_LEVEL.HL6, true);*/

        hl1Category.OPTIONS.forEach(function (hl1CategoryOption) {
            categoryOptionBulk.push({
                in_hl6_id: data.HL6_ID
                , in_category_option_level_id: mapCOL[hl1Category.CATEGORY_ID][hl1CategoryOption.OPTION_ID]
                , in_amount: hl1CategoryOption.AMOUNT || 0
                , in_created_user_id: userId
                , in_updated: hl1CategoryOption.AMOUNT ? 1 : 0
            });
        });
    });
    dataCategoryOptionLevel.insertCategoryOption(categoryOptionBulk, 'hl6');

    return true;
}
function updateCategoryOption(data, userId) {
    var insertBulk = [];
    var updateBulk = [];
    var mapCOL = util.getMapCategoryOption('hl6');
    data.CATEGORIES.forEach(function (hl6Category) {
        hl6Category.OPTIONS.forEach(function (option) {
            var categoryOption = {
                in_category_option_level_id: mapCOL[hl6Category.CATEGORY_ID][option.OPTION_ID]
                , in_amount: option.AMOUNT || 0
                , in_user_id: userId
                , in_updated: 0
                , in_hl6_id: data.HL6_ID
            };
            if (!option.CATEGORY_OPTION_ID) {
                categoryOption.in_hl6_id = data.HL6_ID;
                insertBulk.push(categoryOption);
            } else {
                updateBulk.push(categoryOption);
            }
        });
    });

    if (updateBulk && updateBulk.length)
        dataCategoryOptionLevel.updateCategoryOption(updateBulk, 'hl6');

    if (insertBulk && insertBulk.length)
        dataCategoryOptionLevel.insertCategoryOption(insertBulk, 'hl6');

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
        if (arrHl6Budget.length > 0)
            dataHl6.insertHl6Budget(arrHl6Budget);
    }
}
function updateBudgetDistribution(data, userId) {
    dataHl6.delHl6BudgetHard(data.HL6_ID, userId);
    if (data.BUDGET_DISTRIBUTION) {
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
        if (arrHl6Budget.length > 0)
            dataHl6.insertHl6Budget(arrHl6Budget);
    }
}
function insertInternalCofunding(data, userId) {
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
            budgetSpendRequest.insertSalesBudgetSpendRequest(data.SALE_REQUESTS, data.HL6_ID, 'HL6', internalCoFundingCurrency, userId);
    }
}
function updateInternalCofunding(data, userId) {
    if (data.SALES && data.SALES.length) {
        var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.SALE_CURRENCY_ID);
        var aux = {};
        var arrSaleHl6 = [];
        data.SALES.forEach(function (sale) {
            if (aux[sale.ORGANIZATION_ID]) {
                arrSaleHl6.push({
                    in_hl6_sales_id: sale.HL6_SALE_ID
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
            budgetSpendRequest.updateSalesBudgetSpendRequest(data.SALE_REQUESTS, data.HL6_ID, 'HL6', internalCoFundingCurrency, userId);
    }

    if (data.SALE_REQUESTS_REMOVED && data.SALE_REQUESTS_REMOVED.length) {
        var saleBudgetSpendRquestToDelete = data.SALE_REQUESTS_REMOVED.map(function (id) {
            return {in_budget_spend_request_id: id, in_user_id: userId};
        });
        budgetSpendRequest.deleteBudgetSpendRequestBySale(saleBudgetSpendRquestToDelete, 'HL6');
    }
    return true;
}
function insertExternalCoFunding(data, userId) {
    if (data.CO_FUNDED && data.PARTNERS && data.PARTNERS.length) {
        var arrPartner = [];
        var externalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.PARTNER_CURRENCY_ID);
        data.PARTNERS.forEach(function (partner) {
            if (Number(partner.AMOUNT) && partner.MESSAGE) {
                var budgetSpendRequestId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, data.HL6_ID, 'HL6', externalCoFundingCurrency, userId);
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
            dataPartner.insertHl6Partner(arrPartner);
    }
}
function updateExternalCoFunding(data, userId) {
    if (data.PARTNERS && data.PARTNERS.length) {
        var arrPartnerToInsert = [];
        var arrPartnerToUpdate = [];
        var budgetSpendRequestToUpdate = [];
        var externalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.PARTNER_CURRENCY_ID);
        data.PARTNERS.forEach(function (partner) {
            if (!partner.PARTNER_ID) {
                var budgetSpendRequestId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, hl6_id, 'HL6', externalCoFundingCurrency, userId);
                arrPartnerToInsert.push({
                    in_hl6_id: hl6_id
                    , in_partner_name: null
                    , in_partner_type_id: partner.PARTNER_TYPE_ID
                    , in_region_id: null
                    , in_value: null
                    , in_created_user_id: userId
                    , in_budget_spend_request: budgetSpendRequestId
                    , in_currency_id: data.PARTNER_CURRENCY_ID
                    , in_intel_project_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.INTEL_PROJECT_ID : null
                    , in_claim_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.CLAIM_ID : null
                    , in_comments: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.COMMENTS : null
                    , in_company_name: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_NAME : null
                    , in_company_address: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_ADDRESS : null
                    , in_invoice_number: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.INVOICE_NUMBER ? partner.INVOICE_NUMBER : null
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
                    , in_partner_name: null
                    , in_partner_type_id: partner.PARTNER_TYPE_ID
                    , in_region_id: null
                    , in_value: null
                    , in_currency_id: data.PARTNER_CURRENCY_ID
                    , in_created_user_id: userId
                    , in_intel_project_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.INTEL_PROJECT_ID : null
                    , in_claim_id: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.CLAIM_ID : null
                    , in_comments: PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID ? partner.COMMENTS : null
                    , in_company_name: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_NAME : null
                    , in_company_address: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID ? partner.COMPANY_ADDRESS : null
                    , in_invoice_number: PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && partner.INVOICE_NUMBER ? partner.INVOICE_NUMBER : null
                });
            }
            if (partner.ATTACHMENTS && partner.BUDGET_SPEND_REQUEST_ID) {
                partnerLib.updateAttachmentPartner(partner, 'HL6', userId);
            }
        });

        if (arrPartnerToInsert.length) {
            dataPartner.insertHl6Partner(arrPartnerToInsert);
        }

        if (arrPartnerToUpdate.length) {
            dataPartner.updatePartner(arrPartnerToUpdate, 'HL6');
        }
        if (budgetSpendRequestToUpdate.length)
            budgetSpendRequest.updateBudgetSpendRequest(budgetSpendRequestToUpdate, userId, true);
    }

    if (data.PARTNERS_REQUESTS_REMOVED && data.PARTNERS_REQUESTS_REMOVED.length) {
        var arrBudgetSpendRequestToDelete = [];
        var arrPartnerToDelete = data.PARTNERS_REQUESTS_REMOVED.map(function (id) {
            return {in_partner_id: id, in_user_id: userId};
        });
        arrPartnerToDelete = [];
        var pendingPartner = dataPartner.getPendingPartnerByPartnerId(arrPartnerToDelete, "HL6");
        pendingPartner.forEach(function (elem) {
            arrPartnerToDelete.push({in_partner_id: elem.IN_PARTNER_ID, in_user_id: userId});
            arrBudgetSpendRequestToDelete.push({in_budget_spend_request_id: elem.IN_BUDGET_SPEND_REQUEST_ID, in_user_id: userId});
        });

        dataPartner.deleteHlPartnerByPartnerId(arrPartnerToDelete, "HL6");
        budgetSpendRequest.deleteBudgetSpendRequest(arrBudgetSpendRequestToDelete);
    }
    return true;
}
function validateKpi(data) {
    if (data.TARGET_KPIS) {
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
                    throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", levelCampaign + " Sales description can not be found.");
            } else {
                if (!sale.ORGANIZATION_ID || !Number(sale.ORGANIZATION_ID))
                    throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", levelCampaign + " Sales " + key + " can not be found.");
            }
        });
    }
}
function validatePartners(data) {
    if (data.PARTNERS && data.PARTNERS.length) {
        data.PARTNERS.forEach(function (partner) {
            if (!partner.PARTNER_TYPE_ID || !Number(partner.PARTNER_TYPE_ID))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_TYPE_NOT_VALID);

            if (!partner.AMOUNT || !Number(partner.AMOUNT))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_AMOUNT_NOT_VALID);

            if (PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID && (!partner.INTEL_PROJECT_ID || !partner.CLAIM_ID || !partner.COMMENTS))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_INCOMPLETE_INTEL);

            if (PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && (!partner.COMPANY_NAME || !partner.COMPANY_ADDRESS))
                throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_PARTNER_INCOMPLETE_EXTERNAL_PARTNER);
        });
    }
}
function validateBudgetDistribution(data) {
    if (!data.BUDGET_DISTRIBUTION)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_MSG_INITIATIVE_MY_BUDGET);

    return isMyBudgetComplete(data.BUDGET_DISTRIBUTION);
}
function validateCategoryOption(data) {
    if (!data.CATEGORIES)
        throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L6_CATEGORY_NOT_EMPTY);

    if (!data.HL6_ID && data.CATEGORIES.length !== dataCategory.getAllocationCategoryCountByHlId("hl6"))
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
    insertExpectedOutcomes(data, userId);
}
function getInternalCofunding(hl6Id) {
    var sale = JSON.parse(JSON.stringify(dataHl6.getHl6SalesByHl6Id(hl6Id)));
    var saleRequests = budgetSpendRequest.getHlSalesByHlId(hl6Id, 'HL6');

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
        SALE_TOTAL: Number(totalAmount),
        SALE_CURRENCY_ID: sale[0].CURRENCY_ID,
        SALE_REQUESTS: saleRequestsFiltered,
        SALE_CURRENCY_VALUE: (Number(sale[0].CURRENCY_VALUE)).toFixed(2)
    };
}
function getExternalCofunding(hl6Id) {
    var partner = partnerLib.getPartnerByHl6Id(hl6Id);

    return {
        PARTNERS: partner.partners,
        PARTNER_INTEL_TOTAL: Number(partner.total) || 0,
        PARTNER_CURRENCY_ID: partner.partnerCurrencyId,
        PARTNER_CURRENCY_VALUE: Number(partner.partnerCurrencyValue),
        PARTNER_EXTERNAL_TOTAL: Number(partner.totalExternal)
    };
}
function getCategoryOption(hl6Id) {
    return allocationCategoryOptionLevelLib.getHlCategoryOptionByLevelHlId('HL6', hl6Id);
}
function getCarryOverHl5CategoryOption(hl5_id) {
    var hl5_category = JSON.parse(JSON.stringify(level5Lib.getCategoryOption(hl5_id)));
    var hl6_category = JSON.parse(JSON.stringify(allocationCategory.getCategoryOptionByHierarchyLevelId(HIERARCHY_LEVEL.HL6)));

    return hl6_category.map(function (category) {
        var hl5Cat = extractElementByList(hl5_category, "CATEGORY_ID", category.CATEGORY_ID);
        if (hl5Cat) {
            category.OPTIONS.map(function (option) {
                var hl5option = extractElementByList(hl5Cat.OPTIONS, "OPTION_ID", option.OPTION_ID);
                option.AMOUNT = hl5option ? hl5option.AMOUNT : 0;
                return option;
            });
        }
        return category;
    });
}
function uiToServerParser(object) {
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
            aux.ACRONYM = obj.ORGANIZATION_NAME;
            BUDGET_DISTRIBUTION.CENTRAL_TEAMS.push(aux);
        }
    });
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
            aux.ACRONYM = obj.ORGANIZATION_NAME;
            SALE.CENTRAL_TEAMS.push(aux);
        } else {
            aux.DESCRIPTION = obj.DESCRIPTION;
            aux.AMOUNT = obj.AMOUNT;
            SALE.OTHERS.push(aux);
        }
        aux.MESSAGE = obj.MESSAGE;
    });
    object.PARTNERS.forEach(function (obj) {
        obj.MESSAGE = obj.DESCRIPTION;
        obj.DESCRIPTION = undefined;
    });
    object.SALES = SALE;
    object.BUDGET_DISTRIBUTION = BUDGET_DISTRIBUTION;
    object.CRM_DESCRIPTION = object.HL6_CRM_DESCRIPTION;
    object.HL6_CRM_DESCRIPTION = undefined;
    object.CO_FUNDED = !!object.CO_FUNDED;
    object.ALLOW_BUDGET_ZERO = !!object.ALLOW_BUDGET_ZERO;
    object.IS_POWER_USER = !!object.IS_POWER_USER;

    return object;
}