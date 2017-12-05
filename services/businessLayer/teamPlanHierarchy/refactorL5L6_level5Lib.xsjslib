/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataHl3 = mapper.getDataLevel3();
var dataHl4 = mapper.getDataLevel4();
var dataHl5 = mapper.getDataLevel5();
var dataCostCenter = mapper.getDataCostCenter();
var dataExOut = mapper.refactorL5L6_getDataExpectedOutcome();
var dataPartner = mapper.getDataPartner();
var partnerLib = mapper.refactorL5L6_getPartner();
var dataCurrency = mapper.getDataCurrency();
var dataCategory = mapper.getDataCategory();
var dataOption = mapper.getDataOption();
var expectedOutcomesLib = mapper.refactorL5L6_getExpectedOutcomes();
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
var level6Lib = mapper.refactorL5L6_getLevel6();
var blLevel2 = mapper.getLevel2();
var blRegion = mapper.getRegion();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var dataPath = mapper.getDataPath();
var budgetYear = mapper.getBudgetYear();
var budgetSpendRequest = mapper.refactorL5L6_getBudgetSpendRequest();
var budgetSpendRequestReportLib = mapper.getBudgetSpendReportLib();
var databudgetSpendRequest = mapper.getDataBudgetSpendRequest();
var dataServiceRequest = mapper.getDataServiceRequest();
var AllocationOptionLib = mapper.getAllocationOptionLib();
var blSegmentation = mapper.refactorL5L6_getSegmentation();
var expectedOutcomesLevelLib = mapper.getExpectedOutcomesLevelLib();
var allocationCategoryOptionLevelLib = mapper.getAllocationCategoryOptionLevelLib();
/*************************************************/

var levelCampaign = "Marketing Tactic ";
var L5_MSG_INITIATIVE_NOT_FOUND = "The Marketing Tactic can not be found.";
var L5_MSG_USER_NOT_FOUND = "The User can not be found.";
var L5_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L5_MSG_CANNOT_DEL_STATUS = "Cannot delete this selected Marketing Tactic, because the status doesn´t allow it.";
var L5_MSG_INITIATIVE_CANT_DEL_CHILD = "The selected Marketing Tactic can not be deleted because has childs.";
var L5_MSG_INITIATIVE_ACRONYM = "The CRM ID length must be equal to 7 characters and only upper case is valid.";
var L5_MSG_INITIATIVE_IN_CRM = "Cannot modified CRM ID if already exists in CRM.";
var L5_MSG_INITIATIVE_EXISTS = "Another Marketing Tactic with the same acronym already exists.";
// var L5_MSG_INITIATIVE_ACRONYM_LENGTH = "The acronym length of marketing tactic must be greater than or equal to 4, and less than or equal to 10 characters.";
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

var HIERARCHY_LEVEL = util.getHierarchyLevelEnum();

var DRAFT_PEFIX = 'DRAFT';

var map = {
    "REGION_ID": "ORGANIZATION_ID",
    "HL2_ID": "ORGANIZATION_ID",
    "PERCENTAGE": "PERCENTAGE",
    "HL5_STATUS_DETAIL_ID": "STATUS_DETAIL_ID"
};

function getHl5ByHl4Id(id) {
    level4Lib.getImplementExecutionLevel(id);
    var hl5List = dataHl5.getHl5ByHl4Id(id);
    var hl5TotalBudget = 0;
    var totalAllocated = 0;
    var hl5BudgetRemaining = 0;
    var allHl5 = [];
    if (hl5List.length) {
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

function getHl5ById(hl5Id, carryOver) {
    if (!hl5Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "hl5Services/handleGet/getHl5ById", L5_MSG_INITIATIVE_NOT_FOUND);

    var hl5 = JSON.parse(JSON.stringify(dataHl5.getHl5ById(hl5Id)));
    var targetKpi = expectedOutcomesLib.getExpectedOutcomesByHl5Id(hl5Id, hl5.HL4_ID);
    hl5.TARGET_KPIS = carryOver ? expectedOutcomesLib.filterKpiByLevel(targetKpi, 'HL6') : targetKpi;

    if (!carryOver) {
        var internalCofunding = getInternalCofunding(hl5Id);
        var externalCofunding = getExternalCofunding(hl5Id);
        hl5.BUDGET = Number(hl5.BUDGET);
        hl5.PARTNERS = externalCofunding.PARTNERS;
        hl5.INTEL_TOTAL_BUDGET = externalCofunding.PARTNER_INTEL_TOTAL;
        hl5.PARTNER_CURRENCY_ID = externalCofunding.PARTNER_CURRENCY_ID;
        hl5.EXTERNAL_TOTAL_BUDGET = externalCofunding.PARTNER_EXTERNAL_TOTAL;

        hl5.BUDGET_DISTRIBUTION = dataHl5.getHl5MyBudgetByHl5Id(hl5Id);

        hl5.SALES = internalCofunding.SALE;
        hl5.SALE_TOTAL = internalCofunding.SALE_TOTAL;
        hl5.SALE_CURRENCY_ID = internalCofunding.SALE_CURRENCY_ID;
        hl5.SALE_REQUESTS = internalCofunding.SALE_REQUESTS;

        hl5.CATEGORIES = getCategoryOption(hl5Id);
        hl5.SERVICE_REQUEST_CATEGORIES = getServiceRequestCategoryOptionByHl5Id(hl5Id);

        hl5.TOTAL_BUDGET = (hl5.BUDGET +
            externalCofunding.PARTNER_INTEL_TOTAL / externalCofunding.PARTNER_CURRENCY_VALUE +
            hl5.SALE_TOTAL / internalCofunding.SALE_CURRENCY_VALUE +
            externalCofunding.PARTNER_EXTERNAL_TOTAL / externalCofunding.PARTNER_CURRENCY_VALUE).toFixed(2);

        hl5.BUDGET = hl5.BUDGET * Number(hl5.CURRENCY_VALUE);
        hl5.IS_IN_CRM = !!dataHl5.hl5ExistsInCrm(hl5Id);
    } else {
        hl5.BUDGET = 0;
        hl5.CATEGORIES = level6Lib.getCarryOverHl5CategoryOption(hl5Id);
        hl5.HL5_CRM_DESCRIPTION = undefined;
        hl5.ACRONYM = undefined;
        hl5.CO_FUNDED = 0;
        hl5.ALLOW_BUDGET_ZERO = 0;
    }

    return serverToUiParser(hl5);
}

function getHl5ByUserId(userId) {
    var crm = 'CRM-';
    var hl5List = dataHl5.getHl5ByUserId(userId, util.isSuperAdmin(userId) ? 1 : 0);
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
            }
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
                })
            }
        }
        requestResult.results = util.objectToArray(result);
    }

    return requestResult;
}

function getUserById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found", "userServices/handleGet/getUserById", L5_MSG_USER_NOT_FOUND);
    return dbUser.getUserById(id)[0];
}

function getLevel5ForSearch(budgetYearId, regionId, subRegionId, limit, offset, userSessionID) {
    return dataHl5.getHl5ForSearch(budgetYearId, regionId || 0, subRegionId || 0, limit, offset || 0, userSessionID, util.isSuperAdmin(userSessionID) ? 1 : 0);
}

function insertHl5(data, userId) {
    level4Lib.getImplementExecutionLevel(data.HL4_ID);
    var hl5_id = 0;
    var validationResult = validateHl5(data, userId);
    data = uiToServerParser(data);
    data.STATUS_DETAIL_ID = validationResult.statusId;

    if (data.STATUS_DETAIL_ID > 0) {
        var conversionValue = dataCurrency.getCurrencyValueId(data.EURO_CONVERSION_ID);
        var acronym = data.ACRONYM || getNewSerialAcronym(data.HL4_ID);

        if (data.ALLOW_BUDGET_ZERO) {
            data.BUDGET = 0;
            data.IN_BUDGET = 1;
        } else {
            data.BUDGET = Number(data.BUDGET) / conversionValue;
            data.IN_BUDGET = checkBudgetStatus(data.HL4_ID, hl5_id, data.BUDGET);
        }

        data.BUDGET_SPEND_Q1 = Number(data.BUDGET_SPEND_Q1);
        data.BUDGET_SPEND_Q2 = Number(data.BUDGET_SPEND_Q2);
        data.BUDGET_SPEND_Q3 = Number(data.BUDGET_SPEND_Q3);
        data.BUDGET_SPEND_Q4 = Number(data.BUDGET_SPEND_Q4);

        data.CREATED_USER_ID = userId;
        hl5_id = dataHl5.insertHl5(
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
            , data.COUNTRY
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
            , data.ALLOW_BUDGET_ZERO
            , Number(data.IS_POWER_USER)
            , data.EMPLOYEE_RESPONSIBLE_USER
            , data.PERSON_RESPONSIBLE
        );

        if (hl5_id) {
            var approveBudget = blLevel2.getHl2AllowAutomaticBudgetApprovalByHl4Id(data.HL4_ID) && data.IN_BUDGET && !!Number(data.BUDGET);
            budgetSpendRequest.insertOwnMoneyBudgetSpendRequest(data.BUDGET, hl5_id, 'HL5', userId, approveBudget);
            insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, hl5_id);
            pathBL.insParentPath('hl5', hl5_id, data.HL4_ID, userId);
            data.HL5_ID = hl5_id;
            // setHl5Status(hl5_id, data.STATUS_DETAIL_ID, userId);
            insertExpectedOutcomes(data, userId);
            insertBudgetDistribution(data, userId);
            insertInternalCofunding(data, userId);
            insertExternalCoFunding(data, userId);
            insertCategoryOption(data, userId);
            insertHl5RequestCategoryOption(hl5_id, data.SERVICE_REQUEST_CATEGORIES, userId);
        }

        dataL5Report.updateLevel5ReportForDownload(hl5_id); //Update Processing Report Export Data

        if (data.ACRONYM) {
            return hl5_id;
        } else {
            return {CRM_ID: 'CRM-' + pathBL.getCleanPathByLevelParent(5, data.HL4_ID).PATH_TPH + acronym}
        }
    }


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

            if (option.FORM && option.FORM_NAME) {
                option.FORM.HL5_ID = hl5Id;
                // option.FORM.FORM_STATUS_DETAIL_ID = option.FORM_STATUS_DETAIL_ID;
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
                    in_hl5_expected_outcomes_id: expectedOutcomeDetail.HL5_EXPECTED_OUTCOMES_ID
                    , in_outcomes_id: expectedoutcomelevelid
                    , in_euro_value: expectedOutcomeDetail.EURO_VALUE
                    , in_volume_value: expectedOutcomeDetail.VOLUME_VALUE
                    , in_created_user_id: expectedOutcomeDetail.CREATED_USER_ID
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
        throw ErrorLib.getErrors().ImportError("", "hl5Services/handlePost/insertHl5-data.ACRONYM", L5_MSG_INITIATIVE_ACRONYM);

    //if (data.hl5.ACRONYM.length !== 4)
    //  throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_ACRONYM_LENGTH);

    if (existsHl5(data))
        throw ErrorLib.getErrors().ImportError("", "hl5Services/handlePost/insertHl5-existsHl5", L5_MSG_INITIATIVE_EXISTS);

    //if (util.validateDateEndMayorStart((new Date(data.hl5.ACTUAL_START_DATE)), (new Date(data.hl5.ACTUAL_END_DATE))))
    //    throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L5_MSG_INITIATIVE_INVALID_DATE_RANGE);

    //if (data.hl5.EURO_CONVERSION_ID < 0)
//        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_CURRENCY);

    return true;
}

function updateHl5(data, userId) {
    var hl5_id;
    if (!data.HL5_ID)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/updateHl5", L5_MSG_INITIATIVE_NOT_FOUND);

    if (!util.validateIsNumber(data.HL5_ID))
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/updateHl5", L5_MSG_INITIATIVE_NOT_FOUND);

    if (!userId)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/updateHl5", L5_MSG_USER_NOT_FOUND);
    level4Lib.getImplementExecutionLevel(data.HL4_ID);

    data = uiToServerParser(data);
    var validationResult = validateHl5(data, userId);
    data.STATUS_DETAIL_ID = validationResult.statusId;
    var budgetSpendRequestStatus = budgetSpendRequest.getBudgetSpendRequestsStatus();

    if (data.STATUS_DETAIL_ID > 0) {
        hl5_id = data.HL5_ID;
        var conversionValue = dataCurrency.getCurrencyValueId(data.EURO_CONVERSION_ID);
        var acronym = data.ACRONYM || getNewSerialAcronym(data.HL4_ID);
        data.BUDGET_SPEND_Q1 = Number(data.BUDGET_SPEND_Q1);
        data.BUDGET_SPEND_Q2 = Number(data.BUDGET_SPEND_Q2);
        data.BUDGET_SPEND_Q3 = Number(data.BUDGET_SPEND_Q3);
        data.BUDGET_SPEND_Q4 = Number(data.BUDGET_SPEND_Q4);

        data.USER_ID = userId;

        if (data.ALLOW_BUDGET_ZERO) {
            data.BUDGET = 0;
            data.IN_BUDGET = 1;
        } else {
            data.BUDGET = Number(data.BUDGET) / conversionValue;
            data.IN_BUDGET = checkBudgetStatus(data.HL4_ID, hl5_id, Number(data.BUDGET) / conversionValue);
        }
        hl5_id = data.HL5_ID;
        var objHL5 = dataHl5.getHl5ById(data.HL5_ID);
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
            , data.COUNTRY
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
            , data.ALLOW_BUDGET_ZERO
            , Number(data.IS_POWER_USER)
            , data.EMPLOYEE_RESPONSIBLE_USER
            , data.PERSON_RESPONSIBLE
        );

        insertInCrmBinding(validationResult.crmBindingChangedFields, validationResult.crmBindingChangedFieldsUpdate, hl5_id);
        setHl5Status(data.HL5_ID, data.STATUS_DETAIL_ID, userId);
        var ownMoneyBudgetSpendRequestStatus = budgetSpendRequest.getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(hl5_id, 'HL5');
        var automaticBudgetApproval = blLevel2.getHl2AllowAutomaticBudgetApprovalByHl4Id(data.HL4_ID) && data.IN_BUDGET && !!Number(data.BUDGET);
        if (!ownMoneyBudgetSpendRequestStatus || ownMoneyBudgetSpendRequestStatus == budgetSpendRequestStatus.NO_LONGER_REQUESTED) {
            budgetSpendRequest.insertOwnMoneyBudgetSpendRequest(data.BUDGET, hl5_id, 'HL5', userId, automaticBudgetApproval);
        } else {
            if (objHL5.BUDGET != data.BUDGET) {
                if (ownMoneyBudgetSpendRequestStatus && ownMoneyBudgetSpendRequestStatus != budgetSpendRequestStatus.PENDING)
                    throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePut/updateHl5", "Cannot update Tactic Budget because Own money budget spend request is no longer in Pending Status.");

                budgetSpendRequest.updateOwnMoneyBudgetSpendRequestByHlIdLevel(hl5_id, 'HL5', data.BUDGET, automaticBudgetApproval, userId);
                level6Lib.checkBudgetStatus(data);
            }
        }

        updateExpectedOutcomes(data, userId);
        updateBudgetDistribution(data, userId);
        updateCategoryOption(data, userId);
        updateHl5RequestCategoryOption(hl5_id, data.SERVICE_REQUEST_CATEGORIES, userId);

        if (data.ALLOW_BUDGET_ZERO) {
            budgetSpendRequest.setBudgetSpendRequestStatusNoLongerRequested(hl5_id, 'HL5', userId, !!data.ALLOW_BUDGET_ZERO);
        } else if (!data.CO_FUNDED) {
            budgetSpendRequest.disableCoFundedBudgetSpendRequests(hl5_id, 'HL5', userId);
        } else {
            updateInternalCofunding(data, userId);
            updateExternalCoFunding(data, userId);
        }

        dataL5Report.updateLevel5ReportForDownload(hl5_id); //Update Processing Report Export Data
        if (data.ACRONYM) {
            return data;
        } else {
            return {CRM_ID: 'CRM-' + pathBL.getCleanPathByLevelParent(5, data.HL4_ID).PATH_TPH + acronym}
        }
    }
}

function deleteHl5(hl5Id, userId, rollBack) {
    if (!hl5Id && !rollBack)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", L5_MSG_INITIATIVE_NOT_FOUND);

    if (dataHl5.getCountHl5Childrens(hl5Id) > 0)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", L5_MSG_INITIATIVE_HAS_LEVEL_6);

    if (!rollBack && !util.validateIsNumber(hl5Id))
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", L5_MSG_INITIATIVE_NOT_FOUND);

    var userRoleId = Number(dbUserRole.getUserRoleByUserId(userId)[0].ROLE_ID);
    if (!rollBack && userRoleId !== 1 && userRoleId !== 2)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", L5_MSG_NO_PRIVILEGE);

    var hl5StatusId = !rollBack ? Number(dataHl5.getHl5StatusByHl5Id(hl5Id).HL5_STATUS_DETAIL_ID) : 0;
    if (!rollBack && userRoleId !== 1 && (hl5StatusId !== HL5_STATUS.IN_CRM && hl5StatusId !== HL5_STATUS.UPDATE_IN_CRM))
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", L5_MSG_CANNOT_DEL_STATUS);

    if (!rollBack && dataHl5.getCountHl5Childrens(hl5Id) > 0)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/deleteHl5", L5_MSG_INITIATIVE_CANT_DEL_CHILD);

    dataPartner.deleteHl5Partner(hl5Id, userId);
    dataExOut.deleteHl5ExpectedOutcomesDetail(hl5Id, userId);
    dataExOut.deleteHl5ExpectedOutcomes(hl5Id, userId);
    level5DER.deleteL5ChangedFieldsByHl5Id(hl5Id, userId);

    dataCategoryOptionLevel.deleteCategoryOption(hl5Id, userId, 'HL5');

    dataHl5.deleteHl5Budget(hl5Id, userId);

    //delete HL5_SALE_BUDGET_SPEND_REQUEST
    databudgetSpendRequest.delAllHlSaleBudgetSpendRequestByHlId(hl5Id, userId, 'HL5'); //ready
    dataHl5.deleteHl5Sale(hl5Id, userId);
    //BUDGET_SPEND_REQUEST_LOG_STATUS
    databudgetSpendRequest.delAllBudgetSpendRequestLogStatusByHlId(hl5Id, userId, 'HL5');//ready
    //BUDGET_SPEND_REQUEST_MESSAGE
    databudgetSpendRequest.delAllBudgetSpendRequestMessageByHlId(hl5Id, userId, 'HL5');
    //DEL_ALL_BUDGET_SPEND_REQUEST_BY_HL5_ID
    databudgetSpendRequest.delAllBudgetSpendRequestByHlId(hl5Id, userId, 'HL5');//ready
    dataPath.delParentPath('hl5', hl5Id);
    dataHl5.deleteHl5RequestCategoryOption(hl5Id, userId);
    blSegmentation.deleteSegmentationForm(hl5Id, userId);
    dataHl5.deleteHl5(hl5Id, userId);

    dataL5Report.updateLevel5ReportForDownload(hl5Id); //Update Processing Report Export Data
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
                isComplete = !data.HL5_ID ? data.CATEGORIES.length === dataCategory.getAllocationCategoryCountByHlId("hl5") : isComplete;
                if (isComplete) {
                    for (var j = 0; j < data.CATEGORIES.length; j++) {
                        var hl5Category = data.CATEGORIES[j];
                        var percentagePerOption = 0;

                        isComplete = isComplete && !!(hl5Category.CATEGORY_ID && Number(hl5Category.CATEGORY_ID));
                        var countOptions = dataOption.getAllocationOptionCountByCategoryIdLevelId(hl5Category.CATEGORY_ID, 'hl5');
                        isComplete = isComplete && (!data.HL5_ID ?
                            hl5Category.OPTIONS.length === countOptions
                            : isComplete);

                        hl5Category.OPTIONS.forEach(function (option) {
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

function validateHl5(data, userId) {
    var existInCrm = 0;
    var statusId = HL5_STATUS.IN_PROGRESS;
    var crmBindingChangedFields = [];
    var crmBindingChangedFieldsUpdate = [];
    var myBudgetComplete = false;
    var categoryOptionComplete = false;
    var isHl5Complete = isComplete(data);
    if (isHl5Complete) {
        if (!data)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_NOT_FOUND);

        if (data.HL5_ID && dataHl5.hl5ExistsInCrm(data.HL5_ID)) {
            var hl5 = dataHl5.getHl5ById(data.HL5_ID);
            if (hl5.ACRONYM != data.ACRONYM
                || hl5.COST_CENTER_ID != data.COST_CENTER_ID
                || hl5.SALES_ORGANIZATION_ID != data.SALES_ORGANIZATION_ID)
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_PROPERTIES_CANNOT_UPDATE);
        }

        /*if (!data.hl5.ACRONYM)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_ACRONYM);*/

        if (!(/^[A-Z]{7}$/.test(data.ACRONYM)))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_ACRONYM);

        if (existsHl5(data))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_EXISTS);

        if (!data.CRM_DESCRIPTION)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_CRM_DESCRIPTION);

        if (!Number(data.DISTRIBUTION_CHANNEL_ID))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_DISTRIBUTION_CHANNEL);

        if (!data.ALLOW_BUDGET_ZERO) {
            if (data.BUDGET <= 0)
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_BUDGET_VALUE);
        }

        if (!data.COST_CENTER_ID || data.COST_CENTER_ID < 0)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_COST_CENTER_NOT_VALID);

        if (!data.EMPLOYEE_RESPONSIBLE_ID || data.EMPLOYEE_RESPONSIBLE_ID < 0)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_RESPONSIBLE_NOT_VALID);

        if (!data.PRIORITY_ID || data.PRIORITY_ID < 0)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_PRIORITY_NOT_VALID);

        if (!data.ACTUAL_START_DATE /*|| !isNaN((new Date(data.hl6.ACTUAL_START_DATE)).getDate())*/)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L5_MSG_INITIATIVE_ACTUAL_START_DATE);

        if (!data.ACTUAL_END_DATE /*|| !isNaN((new Date(data.hl6.ACTUAL_END_DATE)).getDate())*/)
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L5_MSG_INITIATIVE_ACTUAL_END_DATE);

        if (util.validateDateEndMayorStart((new Date(data.ACTUAL_START_DATE)), (new Date(data.ACTUAL_END_DATE))))
            throw ErrorLib.getErrors().CustomError("", "hl6Services/handlePost/insertHl6", L5_MSG_INITIATIVE_INVALID_DATE_RANGE);


        if (data.EURO_CONVERSION_ID < 0)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_CURRENCY);

        if (!Number(data.EURO_CONVERSION_ID))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_CURRENCY);

        if (!data.BUDGET_SPEND_Q1 && !data.BUDGET_SPEND_Q2 && !data.BUDGET_SPEND_Q3 && !data.BUDGET_SPEND_Q4)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_BUDGET_SPEND);

        if (((Number(data.BUDGET_SPEND_Q1) || 0) +
                (Number(data.BUDGET_SPEND_Q2) || 0) +
                (Number(data.BUDGET_SPEND_Q3) || 0) +
                (Number(data.BUDGET_SPEND_Q4) || 0)) < 100)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_BUDGET_SPEND_PERCENT);

        myBudgetComplete = validateBudgetDistribution(data);
        validateSales(data);
        validateKpi(data);
        validatePartners(data);
        categoryOptionComplete = validateCategoryOption(data);

        var crmFieldsHasChangedResult = crmFieldsHaveChanged(data, data.ALLOW_BUDGET_ZERO || (categoryOptionComplete && myBudgetComplete), userId);
        var crmFieldsHasChanged = crmFieldsHasChangedResult.crmFieldsHaveChanged;
        crmBindingChangedFields = crmFieldsHasChangedResult.crmBindingChangedFields;
        crmBindingChangedFieldsUpdate = crmFieldsHasChangedResult.crmBindingChangedFieldsUpdate;
        if (data.HL5_ID) {
            if (!data.ALLOW_BUDGET_ZERO && data.STATUS_DETAIL_ID != HL5_STATUS.VALID_FOR_CRM && !myBudgetComplete)
                throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/insertHl5", L5_MY_BUDGET_COMPLETE);

            existInCrm = dataHl5.hl5ExistsInCrm(data.HL5_ID);

            var objHL5 = dataHl5.getHl5ById(data.HL5_ID);
            if (existInCrm && data.ACRONYM.toUpperCase() != objHL5.ACRONYM.toUpperCase())
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_IN_CRM);

            var categoryHasChanged = categoryChanged(data, existInCrm);

            if (!crmFieldsHasChanged && !categoryHasChanged && !Number(budgetSpendRequest.countPendingBudgetRequestByHl5Id(data.HL5_ID)))
                statusId = data.STATUS_DETAIL_ID;
            else
                statusId = HL5_STATUS.VALID_FOR_CRM;
        } else {
            statusId = HL5_STATUS.VALID_FOR_CRM;
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
    var hl5_categoryBD = getCategoryOption(data.HL5_ID);

    var optionChange = CompareCategories(data.CATEGORIES, hl5_categoryBD, existInCrm);

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
    var actualCategory = util.getCategoryById('hl5');
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
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", levelCampaign + " in My Budget " + budgetDistribution.ORGANIZATION_ID + " can not be found.");

        myBudgetTotalPercentage += Number(budgetDistribution.PERCENTAGE);
    });

    if (myBudgetTotalPercentage > 100)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_BUDGET_PERCENT);

    myBudgetTotalPercentage = myBudgetTotalPercentage < 100 ? 0 : myBudgetTotalPercentage;

    myBudgetComplete = !!myBudgetTotalPercentage;
    return myBudgetComplete;
}

function isCategoryOptionComplete(data) {
    var categoryOptionComplete = false;
    for (var i = 0; i < data.CATEGORIES.length; i++) {
        var hl5Category = data.CATEGORIES[i];
        var percentagePerOption = 0;
        if (!hl5Category.CATEGORY_ID || !Number(hl5Category.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CATEGORY_NOT_VALID);

        if (!hl5Category.OPTIONS.length)
            percentagePerOption = 100;
        //TODO review. Workaround for empty categories on edit
        //throw ErrorLib.getErrors().CustomError("","hl5Services/handlePost/insertHl5", L5_CATEGORY_OPTIONS_NOT_EMPTY);

        if (!data.HL5_ID && hl5Category.OPTIONS.length !== dataOption.getAllocationOptionCountByCategoryIdLevelId(hl5Category.CATEGORY_ID, 'hl5'))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CATEGORY_OPTIONS_INCORRECT_NUMBER);

        hl5Category.OPTIONS.forEach(function (option) {
            if (!option.OPTION_ID || !Number(option.OPTION_ID))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.AMOUNT) && !Number(option.AMOUNT)) || Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0)
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", "Option value is not valid (actual value " + option.AMOUNT + ")");

            percentagePerOption = percentagePerOption + Number(option.AMOUNT);
        });
        if (percentagePerOption > 100) {
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CATEGORY_TOTAL_PERCENTAGE);
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
        var hl4Id = Number(objHl4) ? objHl4 : objHl4.in_hl4_id;
        var resultHl5 = dataHl5.getHl5ByHl4Id(hl4Id);

        if (resultHl5.length > 0) {
            var total = 0;
            for (var i = 0; i < resultHl5.length; i++) {
                if (objHl4.in_HL4_FNC_BUDGET_TOTAL_MKT < total + parseFloat(resultHl5[i].HL5_BUDGET)) {
                    dataHl5.updateHl5BudgetStatus(resultHl5[i].HL5_ID, 0);
                } else {
                    dataHl5.updateHl5BudgetStatus(resultHl5[i].HL5_ID, 1);
                    total = total + parseFloat(resultHl5[i].HL5_BUDGET);
                }
            }
        }
        return true;
    }
}

function setHl5Status(hl5_id, status_id, userId) {
    if (hl5_id && status_id && userId) {
        dataHl5.changeStatusHl5(hl5_id, status_id, userId);
        dataHl5.insertHl5LogStatus(hl5_id, status_id, userId);
        if (HL5_STATUS.IN_CRM == status_id) {
            level5DER.deleteL5ChangedFieldsByHl5Id(hl5_id);
            resetHl5CategoryOptionUpdated(hl5_id, userId)
        }
        dataL5Report.updateLevel5ReportForDownload(hl5_id);
    }

    return true;
}

function resetHl5CategoryOptionUpdated(hl5Id, userId) {
    return dataCategoryOptionLevel.resetHl4CategoryOptionUpdated(hl5Id, 'hl5', userId);
}

function setHl5StatusInCRM(hl5_id, userId) {
    var hl5Ids = [];
    var result;

    if (hl5_id.constructor === Array) {
        hl5Ids = hl5_id;
    } else {
        hl5Ids.push(hl5_id);
    }

    for (var i = 0; i < hl5Ids.length; i++) {
        result = null;
        result = setHl5Status(hl5Ids[i], HL5_STATUS.IN_CRM, userId);
        if (result) {
            mail.sendInCRMMail(hl5Ids[i], "hl5");
        }
    }

    return 1;
}

function changeHl5StatusOnDemand(hl5_id, userId) {
    var hl5 = dataHl5.getHl5ById(hl5_id);
    var existInCrm = dataHl5.hl5ExistsInCrm(hl5_id);
    var statusId = null;

    if (hl5.HL5_STATUS_DETAIL_ID == HL5_STATUS.IN_PROGRESS) {
        if (!hl5.ALLOW_BUDGET_ZERO) {
            var hl5_category = getCategoryOption(hl5_id);
            var myBudget = dataHl5.getHl5MyBudgetByHl5Id(hl5_id);

            var isComplete = isMyBudgetComplete(myBudget) && isCategoryOptionComplete({
                CATEGORIES: hl5_category,
                HL5_ID: hl5_id
            });

            var hasBudgetRequestPending = budgetSpendRequest.countPendingBudgetRequestByHl5Id(hl5_id) > 0;

            if (!isComplete || !hl5.EMPLOYEE_RESPONSIBLE_USER || !hl5.COST_CENTER_ID)
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePut/changeHl5Status", L5_MSG_COULDNT_CHANGE_STATUS);

            if (hasBudgetRequestPending)
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePut/changeHl5Status", L5_MSG_COULDNT_CHANGE_STATUS_DUE_PENDING_BUDGET_SPEND_REQUEST);

            var ownMoneyBudgetSpendRequestStatus = budgetSpendRequest.getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(hl5_id, 'HL5');
            if (ownMoneyBudgetSpendRequestStatus && ownMoneyBudgetSpendRequestStatus != budgetSpendRequestStatus.APPROVED)
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePut/updateHl5", L5_MSG_COULDNT_CHANGE_STATUS_DUE_OWN_MONEY_BUDGET_SPEND_REQUEST_STATUS);
        }

        statusId = existInCrm ? HL5_STATUS.UPDATE_IN_CRM : HL5_STATUS.CREATE_IN_CRM;
    } else {
        statusId = hl5.HL5_STATUS_DETAIL_ID;
    }

    return setHl5Status(hl5_id, statusId, userId);
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
                    , OPTIONS: []
                }
            }
            result[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_ID].OPTIONS.push({
                OPTION_NAME: serviceRequestCategoryOptionList[i].OPTION_NAME,
                SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID: serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID,
                IS_CHECKED: !!serviceRequestCategoryOptionList[i].IS_CHECKED,
                ASSOCIATED_FORM: serviceRequestCategoryOptionList[i].OPTION_NAME == 'Segmentation Request' ? 'SegmentationForm' : null,
                FORM: segmentationForms[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID],
                FORM_STATUS_DETAIL_ID: segmentationForms[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID] ?
                    segmentationForms[serviceRequestCategoryOptionList[i].SERVICE_REQUEST_CATEGORY_OPTION_LEVEL_ID].FORM_STATUS_DETAIL_ID
                    : undefined
            });
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
        var oldHl5 = dataHl5.getHl5ById(data.HL5_ID);
        var existInCrm = dataHl5.hl5ExistsInCrm(data.HL5_ID);
        var l5CrmBindigFields = util.getMapHl5ChangedFieldsByHl5Id(data.HL5_ID);

        Object.keys(crmBindingFields).forEach(function (object) {
            crmBindingFields[object].forEach(function (field) {
                var oldParentPath = '';
                var parentPath = '';
                if (field == "PARENT_PATH") {
                    oldParentPath = dataPath.getCrmParentPathByIdLevelId('hl5', data.HL5_ID)[0].PARENT_PATH;
                    parentPath = pathBL.getPathByLevelParentForCrm('hl5', data.HL4_ID);
                }
                var parameters = {
                    "in_hl5_id": data.HL5_ID,
                    "in_column_name": field,
                    "in_changed": 1,
                    "in_user_id": userId,
                    "in_display_name": deReportDisplayName[field]
                };

                if (field.indexOf('_DATE') <= 0) {
                    var fieldChanged = field == 'BUDGET' ? Number(oldHl5[field]) != Number(data[field]) : oldHl5[field] != data[field];
                }

                else {
                    fieldChanged = new Date(oldHl5[field]).valueOf() !== new Date(data[field]).valueOf();
                }

                if (fieldChanged || oldParentPath != parentPath) {

                    if (oldParentPath != parentPath)
                        pathBL.updParentPath('hl5', data.HL5_ID, parentPath, userId);

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

function sendProcessingReportEmail(hl5Id) {
    var appUrl = config.getAppUrl();
    var hl5 = dataHl5.getHl5ById(hl5Id);
    //var hl5 = dataHl4.getHl4ById(hl5.HL4_ID);
    var hl5OwnerEmail = getUserById(hl5.CREATED_USER_ID).EMAIL;

    /*TODO: change TO email for a real email account*/
    var body = '<p> Dear Colleague </p>';
    body += '<p>An initiative has been created in CRM.</p><br>';
    body += '<p>' + appUrl + '#/TeamPlanHierarchy/Level4/edit/' + hl5.HL4_ID + '/' + hl5Id + '</p>';

    //body +='http://localhost:63352/sap-fiori/webapp/index.html#/TeamPlanHierarchy/Level4/edit/' + hl5.HL4_ID + '/' + hl5Id;

    var mailObject = mail.getJson([{
        "address": hl5OwnerEmail
    }], "Marketing Planning Tool - Interlock Process", body);

    mail.sendMail(mailObject, true);
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
            throw ErrorLib.getErrors().CustomError("", "level3/handlePermission", "User hasn´t permission for this resource.");
        }
    }
}

function findHLSalesId(Sales, OrganizationId, OrganizationType) {
    var hlSaleId = null;
    for (var i = 0; i < Sales.length; i++) {
        if (Sales[i].ORGANIZATION_ID == OrganizationId && Sales[i].ORGANIZATION_TYPE == OrganizationType) {
            hlSaleId = Sales[i].HL5_SALES_ID;
            break;
        }
    }

    return hlSaleId;
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

function insertCategoryOption(data, userId) {
    var categoryOptionBulk = [];
    var mapCOL = util.getMapCategoryOption('hl5');

    data.CATEGORIES.forEach(function (hl1Category) {
        /*var options = hl1Category.OPTIONS && hl1Category.OPTIONS.length ? hl1Category.OPTIONS
            : AllocationOptionLib.getAssignedOptionByCategoryIdByLevelId(hl5Category.CATEGORY_ID, HIERARCHY_LEVEL.HL5, true);*/

        hl1Category.OPTIONS.forEach(function (hl1CategoryOption) {
            categoryOptionBulk.push({
                in_hl5_id: data.HL5_ID
                , in_category_option_level_id: mapCOL[hl1Category.CATEGORY_ID][hl1CategoryOption.OPTION_ID]
                , in_amount: hl1CategoryOption.AMOUNT || 0
                , in_user_id: userId
                , in_updated: hl1CategoryOption.AMOUNT ? 1 : 0
            });
        });
    });
    dataCategoryOptionLevel.insertCategoryOption(categoryOptionBulk, 'hl5');

    return true;
}

function updateCategoryOption(data, userId) {
    var insertBulk = [];
    var updateBulk = [];
    var mapCOL = util.getMapCategoryOption('hl5');
    data.CATEGORIES.forEach(function (hl5Category) {
        hl5Category.OPTIONS.forEach(function (option) {
            var categoryOption = {
                in_category_option_level_id: mapCOL[hl5Category.CATEGORY_ID][option.OPTION_ID]
                , in_amount: option.AMOUNT || 0
                , in_user_id: userId
                , in_updated: 0
                , in_hl5_id: data.HL5_ID
            };
            if (!option.CATEGORY_OPTION_ID) {
                categoryOption.in_hl5_id = data.HL5_ID;
                insertBulk.push(categoryOption);
            } else {
                updateBulk.push(categoryOption);
            }
        });
    });

    if (updateBulk && updateBulk.length)
        dataCategoryOptionLevel.updateCategoryOption(updateBulk, 'hl5');

    if (insertBulk && insertBulk.length)
        dataCategoryOptionLevel.insertCategoryOption(insertBulk, 'hl5');

    return true;
}

function insertBudgetDistribution(data, userId) {
    if (data.BUDGET_DISTRIBUTION) {
        var arrHl5Budget = [];
        data.BUDGET_DISTRIBUTION.forEach(function (myBudget) {
            arrHl5Budget.push({
                in_hl5_id: data.HL5_ID
                , in_organization_id: myBudget.ORGANIZATION_ID
                , in_percentage: myBudget.PERCENTAGE || 0
                , in_organization_type: ORGANIZATION_TYPE[myBudget.ORGANIZATION_TYPE]
                , in_created_user_id: userId
            });
        });
        if (arrHl5Budget.length > 0)
            dataHl5.insertHl5Budget(arrHl5Budget);
    }
}

function updateBudgetDistribution(data, userId) {
    dataHl5.delHl5BudgetHard(data.HL5_ID, userId);
    if (data.BUDGET_DISTRIBUTION) {
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
        if (arrHl5Budget.length > 0)
            dataHl5.insertHl5Budget(arrHl5Budget);
    }
}

function insertInternalCofunding(data, userId) {
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
            budgetSpendRequest.insertSalesBudgetSpendRequest(data.SALE_REQUESTS, data.HL5_ID, 'HL5', internalCoFundingCurrency, userId);
    }
}

function updateInternalCofunding(data, userId) {
    if (data.SALES && data.SALES.length) {
        var internalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.SALE_CURRENCY_ID);
        var aux = {};
        var arrSaleHl5 = [];
        data.SALES.forEach(function (sale) {
            if (aux[sale.ORGANIZATION_ID]) {
                arrSaleHl5.push({
                    in_hl5_sales_id: sale.HL5_SALE_ID
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

        if (data.SALE_REQUESTS && data.SALE_REQUESTS.length)
            budgetSpendRequest.updateSalesBudgetSpendRequest(data.SALE_REQUESTS, data.HL5_ID, 'HL5', internalCoFundingCurrency, userId);
    }

    if (data.SALE_REQUESTS_REMOVED && data.SALE_REQUESTS_REMOVED.length) {
        var saleBudgetSpendRquestToDelete = data.SALE_REQUESTS_REMOVED.map(function (id) {
            return {in_budget_spend_request_id: id, in_user_id: userId};
        });
        budgetSpendRequest.deleteBudgetSpendRequestBySale(saleBudgetSpendRquestToDelete, 'HL5');
    }
    return true;
}

function insertExternalCoFunding(data, userId) {
    if (data.CO_FUNDED && data.PARTNERS && data.PARTNERS.length) {
        var arrPartner = [];
        var externalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.PARTNER_CURRENCY_ID);
        data.PARTNERS.forEach(function (partner) {
            if (Number(partner.AMOUNT) && partner.MESSAGE) {
                var budgetSpendRequestId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, data.HL5_ID, 'HL5', externalCoFundingCurrency, userId);
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
}

function updateExternalCoFunding(data, userId) {
    if (data.PARTNERS && data.PARTNERS.length) {
        var arrPartnerToInsert = [];
        var arrPartnerToUpdate = [];
        var budgetSpendRequestToUpdate = [];
        var externalCoFundingCurrency = dataCurrency.getCurrencyValueId(data.PARTNER_CURRENCY_ID);
        data.PARTNERS.forEach(function (partner) {
            if (!partner.PARTNER_ID) {
                var budgetSpendRequestId = budgetSpendRequest.insertPartnerBudgetSpendRequest(partner.AMOUNT, partner.MESSAGE, data.HL5_ID, 'HL5', externalCoFundingCurrency, userId);
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
            if (partner.ATTACHMENTS && partner.BUDGET_SPEND_REQUEST_ID) {
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

    if (data.PARTNERS_REQUESTS_REMOVED && data.PARTNERS_REQUESTS_REMOVED.length) {
        var arrBudgetSpendRequestToDelete = [];
        var arrPartnerToDelete = data.PARTNERS_REQUESTS_REMOVED.map(function (id) {
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
            dataPartner.deleteHlPartnerByPartnerId(arrPartnerToDelete, "HL5");
            budgetSpendRequest.deleteBudgetSpendRequest(arrBudgetSpendRequestToDelete);
        }
    }
    return true;
}

function validateKpi(data) {
    if (data.TARGET_KPIS) {
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
                    throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", levelCampaign + " Sales description can not be found.");
            } else {
                if (!sale.ORGANIZATION_ID || !Number(sale.ORGANIZATION_ID))
                    throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", levelCampaign + " Sales " + key + " can not be found.");
            }
        });
    }
}

function validatePartners(data) {
    if (data.PARTNERS && data.PARTNERS.length) {
        data.PARTNERS.forEach(function (partner) {
            if (!partner.PARTNER_TYPE_ID || !Number(partner.PARTNER_TYPE_ID))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_PARTNER_TYPE_NOT_VALID);

            if (!partner.AMOUNT || !Number(partner.AMOUNT))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_PARTNER_AMOUNT_NOT_VALID);

            if (PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID && (!partner.INTEL_PROJECT_ID || !partner.CLAIM_ID || !partner.COMMENTS))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_PARTNER_INCOMPLETE_INTEL);

            if (PARTNER_TYPE.EXTERNAL_PARTNER == partner.PARTNER_TYPE_ID && (!partner.COMPANY_NAME || !partner.COMPANY_ADDRESS))
                throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_PARTNER_INCOMPLETE_EXTERNAL_PARTNER);
        });
    }
}

function validateBudgetDistribution(data) {
    if (!data.BUDGET_DISTRIBUTION)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_MSG_INITIATIVE_MY_BUDGET);

    return isMyBudgetComplete(data.BUDGET_DISTRIBUTION);
}

function validateCategoryOption(data) {
    if (!data.CATEGORIES)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", L5_CATEGORY_NOT_EMPTY);

    if (!data.HL5_ID && data.CATEGORIES.length !== dataCategory.getAllocationCategoryCountByHlId("hl5"))
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
    insertExpectedOutcomes(data, userId);
}

function getInternalCofunding(hl5Id) {
    var sale = JSON.parse(JSON.stringify(dataHl5.getHl5SalesByHl5Id(hl5Id)));
    var saleRequests = budgetSpendRequest.getHlSalesByHlId(hl5Id, 'HL5');

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

function getExternalCofunding(hl5Id) {
    var partner = partnerLib.getPartnerByHl5Id(hl5Id);

    return {
        PARTNERS: partner.partners,
        PARTNER_INTEL_TOTAL: Number(partner.total) || 0,
        PARTNER_CURRENCY_ID: partner.partnerCurrencyId,
        PARTNER_CURRENCY_VALUE: Number(partner.partnerCurrencyValue),
        PARTNER_EXTERNAL_TOTAL: Number(partner.totalExternal)
    };
}

function getCategoryOption(hl5Id) {
    return allocationCategoryOptionLevelLib.getHlCategoryOptionByLevelHlId('HL5', hl5Id);
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
    if(object.BUDGET_DISTRIBUTION) {
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
    if(object.SALES) {
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
    if(object.SALE_REQUESTS){
        object.SALE_REQUESTS.forEach(function (obj) {
            var attribute = obj.ORGANIZATION_TYPE == ORGANIZATION_TYPE.REGIONAL ? 'REGION_ID'
                : obj.ORGANIZATION_TYPE == ORGANIZATION_TYPE.CENTRAL ? 'HL2_ID'
                    : 'ORGANIZATION_ID';
            obj[attribute] = obj.ORGANIZATION_ID;
            obj.ORGANIZATION_ID = undefined;
        });
    }
    if(object.PARTNERS) {
        object.PARTNERS.forEach(function (obj) {
            obj.MESSAGE = obj.DESCRIPTION;
            obj.DESCRIPTION = undefined;
        });
    }
    object.SALES = SALE;
    object.BUDGET_DISTRIBUTION = BUDGET_DISTRIBUTION;
    object.CRM_DESCRIPTION = object.HL5_CRM_DESCRIPTION;
    object.HL5_CRM_DESCRIPTION = undefined;
    object.CO_FUNDED = !!object.CO_FUNDED;
    object.ALLOW_BUDGET_ZERO = !!object.ALLOW_BUDGET_ZERO;
    object.IS_POWER_USER = !!object.IS_POWER_USER;

    return object;
}