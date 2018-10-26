$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataHl1 = mapper.getDataLevel1();
var dataHl2 = mapper.getDataLevel2();
var dataHl1User = mapper.getDataLevel1User();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
// var db = mapper.getdbHelper();
// var blPath = mapper.getPath();
var userbl = mapper.getUser();
var userRoleLib = mapper.getUserRole();
var config = mapper.getDataConfig();
var businessError = mapper.getLogError();
var businessBudget = mapper.getBudgetYear();
var dataHl2User = mapper.getDataLevel2User();
var level2 = mapper.getLevel2();
var level4 = mapper.getLevel4();
var expectedOutcomesLib = mapper.getExpectedOutcomes();
var dataExOut = mapper.getDataExpectedOutcome();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var dataCategory = mapper.getDataCategory();
var expectedOutcomesLevelLib = mapper.getExpectedOutcomesLevelLib();
var allocationCategoryOptionLevelLib = mapper.getAllocationCategoryOptionLevelLib();
var dynamicFormLib = mapper.getDynamicFormLib();
var planningPurposeOptionLib = mapper.getPlanningPurposeOptionLib();

var L1_MSG_LEVEL_1_EXISTS = "Another Plan with the same acronym and budget year already exists";
var L1_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L1_MSG_PLAN_NOT_FOUND = "The Plan can not be found.";
var L1_MSG_PLAN_CANT_DELETE = "The selected Plan can not be deleted because has childs.";
var L1_MSG_USER_NOT_FOUND = "The User can not be found.";
var L1_MSG_TYPE_VALUE_ERROR = "Some values are not valid.";
var L1_MSG_MARKET_UNIT_ERROR = "Market Unit is not valid for the selected Region.";
var L1_MSG_NOT_USERS_ASSOCIATED = "Must enter some users associated for this Plan.";
var L1_CAMPAIGN_FORECASTING_KPIS_COMMENT = "Please enter a comment to explain expected outcomes as you didn't select any Campaign type.";
var L1_CAMPAIGN_FORECASTING_KPIS_DETAILS = "Campaign Forecasting / KPIS details amount value is not valid.";
var L1_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO = "Campaign Forecasting / KPIS details euro value is not valid.";
var L1_CAMPAIGN_FORECASTING_KPIS_NOT_VALID = "Campaign Forecasting / KPIS is not valid.";
var BUDGET_YEAR_NOT_FOUND = "The Budget Year can not be found.";
var REGION_NOT_FOUND = "The Region can not be found.";
var USER_NOT_FOUND = "The User can not be found.";
var NO_L1_EXIST_IN_SELECTED_REGION = "No Team exist under the selected region.";
var NO_L1_EXIST_IN_SELECTED_PLANNING_PURPOSE = "No Team exist under the selected planning purpose.";
var L1_CATEGORY_NOT_EMPTY = "Category cannot be empty.";
var L1_CATEGORY_INCORRECT_NUMBER = "Incorrect number of categories.";
var L1_CATEGORY_NOT_VALID = "Category is not valid.";
// var L1_CATEGORY_OPTIONS_INCORRECT_NUMBER = "Incorrect number of options.";
var L1_CATEGORY_OPTION_NOT_VALID = "Option is not valid.";
var L1_CATEGORY_TOTAL_PERCENTAGE = "Budget Distribution should be equal to 100%.";
var L1_BUDGET_ZERO_CATEGORY_TOTAL_PERCENTAGE_ZERO = "When Plan budget is zero then Category total percentage should be equal to 0%.";
var L1_CATEGORY_OPTIONS_NOT_EMPTY = "Option percentage should be less than or equal to 100%.";
var L1_BUDGET_EXCEEDED = "The maximum number for Budget was exceeded.";
var NOT_SUPERADMIN_USER = "Only SuperAdmin users have permission to this service.";

var TEAM_TYPE = util.getTeamTypeEnum();
var HIERARCHY_LEVEL = util.getHierarchyLevelEnum();

function getLevel1ById(hl1Id, carryOver) {
    if (!hl1Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter hl1Id is not found", "level1Services/handleGet/getLevel1ById", L1_MSG_PLAN_NOT_FOUND);

    var hl1Result = JSON.parse(JSON.stringify(dataHl1.getLevel1ById(hl1Id)));
    var hl1BudgetAllocated = dataHl1.getHl1AllocatedBudget(hl1Result.HL1_ID, 0);
    var hl1Users = userbl.getUserByHl1Id(hl1Id);
    var hl1TargetKpi = expectedOutcomesLib.getExpectedOutcomesByHL1Id(hl1Id);
    hl1Result.TARGET_KPIS = carryOver ? expectedOutcomesLib.filterKpiByLevel(hl1TargetKpi, 'HL2') : parseKpiForEdition(hl1TargetKpi);
    hl1Result.ASSIGNED_USERS = hl1Users.users_in;
    hl1Result.AVAILABLE_USERS = hl1Users.users_out;
    hl1Result.CATEGORIES = carryOver ? level2.getCarryOverHl1CategoryOption(hl1Id) : getCategoryOption(hl1Id);
    hl1Result.BUDGET_REMAINING = Number(hl1Result.BUDGET) - Number(hl1BudgetAllocated);

    if (carryOver && hl1Result.PLANNING_PURPOSE_ID) {
        var planningPurpose = planningPurposeOptionLib.getPlanningPurposeRelationship(hl1Result.PLANNING_PURPOSE_ID);
        hl1Result.PLANNING_PURPOSE_OPTIONS = planningPurpose.ASSIGNED_PLANNING_PURPOSE_OPTIONS;
    }

    return hl1Result;
}

function getHl1ByBudgetYearRegion(budgetYearId, regionId, userId) {
    if (!budgetYearId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter budgetYearId is not found", "level1Services/handleGet/getHl1ByBudgetYearRegion", BUDGET_YEAR_NOT_FOUND);
    }
    if (!regionId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter regionId is not found", "level1Services/handleGet/getHl1ByBudgetYearRegion", REGION_NOT_FOUND);
    }
    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "level1Services/handleGet/getHl1ByBudgetYearRegion", USER_NOT_FOUND);
    }

    return dataHl1.getHl1ByBudgetYearRegion(budgetYearId, regionId);
}

function getLevel1ByUser(userId) {
    if (!userId)
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "level1Services/handleGet/getLevel1ByUser", L1_MSG_USER_NOT_FOUND);

    var isSA = util.isSuperAdmin(userId);
    return dataHl1.getLevel1ByUser(isSA, userId);
}

function getLevel1ByFilters(budgetYearId, regionId, subRegionId, userId) {
    var isSA = false;
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }
    var result = JSON.parse(JSON.stringify(dataHl1.getLevel1ByFilters(budgetYearId, regionId, subRegionId, userId, isSA)));
    var list = JSON.parse(JSON.stringify(result.out_result));
    var rdo = {};
    list.forEach(function (item) {
        rdo[item.L1_LEVEL + item.L1_ACRONYM] = rdo[item.L1_LEVEL + item.L1_ACRONYM] || {
            HL_ID: item.L1_ID,
            BUDGET: item.L1_BUDGET,
            BUDGET_PERCENTAGE: item.L1_BUDGET_PERCENTAGE,
            BUDGET_REMAINING: item.L1_BUDGET_REMAINING,
            CHILDREN_TOTAL_COUNT: item.L2_TOTAL_COUNT,
            ACRONYM: item.L1_ACRONYM,
            BUDGET_YEAR: item.BUDGET_YEAR,
            CRM_ID: item.L1_CRM_ID,
            IS_LOCKED: item.L1_IS_LOCKED,
            BUDGET_ALLOCATED: item.L1_BUDGET_ALLOCATED,
            DESCRIPTION: item.L1_DESCRIPTION,
            VERSION: item.L1_VERSION,
            HIERARCHY_LEVEL_ID: HIERARCHY_LEVEL[item.L1_LEVEL],
            CHILDREN: {}
        };
        if(item.L2_ACRONYM) {
            if (!rdo[item.L1_LEVEL + item.L1_ACRONYM].CHILDREN[item.L2_LEVEL + item.L2_ACRONYM]) {
                rdo[item.L1_LEVEL + item.L1_ACRONYM].CHILDREN[item.L2_LEVEL + item.L2_ACRONYM] = {
                    HL_ID: item.L2_ID,
                    PARENT_ID: item.L1_ID,
                    BUDGET: item.L2_BUDGET,
                    BUDGET_PERCENTAGE: item.L2_BUDGET_PERCENTAGE,
                    BUDGET_REMAINING: item.L2_BUDGET_REMAINING,
                    CHILDREN_TOTAL_COUNT: item.L3_TOTAL_COUNT,
                    ACRONYM: item.L2_ACRONYM,
                    CRM_ID: item.L2_CRM_ID,
                    IS_LOCKED: item.L2_IS_LOCKED,
                    BUDGET_ALLOCATED: item.L2_BUDGET_ALLOCATED,
                    DESCRIPTION: item.L2_DESCRIPTION,
                    VERSION: item.L2_VERSION,
                    HIERARCHY_LEVEL_ID: HIERARCHY_LEVEL[item.L2_LEVEL],
                    CHILDREN: {}
                };
            }

            if (item.L3_ACRONYM && !rdo[item.L1_LEVEL + item.L1_ACRONYM].CHILDREN[item.L2_LEVEL + item.L2_ACRONYM].CHILDREN[item.L3_LEVEL + item.L3_ACRONYM]) {
                rdo[item.L1_LEVEL + item.L1_ACRONYM].CHILDREN[item.L2_LEVEL + item.L2_ACRONYM].CHILDREN[item.L3_LEVEL + item.L3_ACRONYM] = {
                    HL_ID: item.L3_ID,
                    PARENT_ID: item.L2_ID,
                    BUDGET: item.L3_BUDGET,
                    BUDGET_PERCENTAGE: item.L3_BUDGET_PERCENTAGE,
                    BUDGET_REMAINING: item.L3_BUDGET_REMAINING,
                    CHILDREN_TOTAL_COUNT: item.L4_TOTAL_COUNT,
                    ACRONYM: item.L3_ACRONYM,
                    CRM_ID: item.L3_CRM_ID,
                    IS_LOCKED: item.L3_IS_LOCKED,
                    BUDGET_ALLOCATED: item.L3_BUDGET_ALLOCATED,
                    DESCRIPTION: item.L3_DESCRIPTION,
                    VERSION: item.L3_VERSION,
                    HIERARCHY_LEVEL_ID: HIERARCHY_LEVEL[item.L3_LEVEL],
                    CHILDREN: {}
                };
            }

            if (item.L4_ACRONYM && !rdo[item.L1_LEVEL + item.L1_ACRONYM].CHILDREN[item.L2_LEVEL + item.L2_ACRONYM].CHILDREN[item.L3_LEVEL + item.L3_ACRONYM].CHILDREN[item.L4_ACRONYM]) {
                var child = {
                    HL_ID: item.L4_ID,
                    PARENT_ID: item.L3_ID,
                    BUDGET: item.L4_BUDGET,
                    BUDGET_PERCENTAGE: item.L4_BUDGET_PERCENTAGE,
                    BUDGET_REMAINING: item.L4_BUDGET_REMAINING,
                    CHILDREN_TOTAL_COUNT: item.L5_TOTAL_COUNT,
                    ACRONYM: item.L4_ACRONYM,
                    CRM_ID: item.L4_CRM_ID,
                    BUDGET_ALLOCATED: item.L4_BUDGET_ALLOCATED,
                    DESCRIPTION: item.L4_DESCRIPTION,
                    STATUS_DETAIL: item.L4_STATUS_DETAIL,
                    STATUS_ID: item.L4_STATUS_ID,
                    IMPLEMENT_EXECUTION_LEVEL: item.L4_IMPLEMENT_EXECUTION_LEVEL,
                    IN_CRM_CHILD_HL5: item.L4_IN_CRM_CHILD_HL5,
                    IN_CRM_CHILD_HL6: item.L4_IN_CRM_CHILD_HL6,
                    ENABLE_CRM_CREATION: item.L4_ENABLE_CRM_CREATION,
                    HIERARCHY_LEVEL_ID: HIERARCHY_LEVEL[item.L4_LEVEL]
                };
                var enableAction = level4.getEnableAction(child, userId, isSA);
                child.ENABLE_DELETION = enableAction.ENABLE_DELETION;
                child.ENABLE_CHANGE_STATUS = enableAction.ENABLE_CHANGE_STATUS;
                child.ENABLE_EDIT = enableAction.ENABLE_EDIT;
                rdo[item.L1_LEVEL + item.L1_ACRONYM].CHILDREN[item.L2_LEVEL + item.L2_ACRONYM].CHILDREN[item.L3_LEVEL + item.L3_ACRONYM].CHILDREN[item.L4_ACRONYM] = child;
            }
        }
    });
    result.out_result = util.planningLevelGridParser(rdo);
    result.out_lob_allocation_view = getLobAllocationSummary(budgetYearId, regionId, subRegionId, userId, isSA);
    return result;
}

function getLobAllocationSummary(budgetYearId, regionId, subRegionId, userId, isSA) {
    var result = {out_result: {}};


        /*var isSA = false;
        var result = {};
        if (config.getApplySuperAdminToAllInitiatives()) {
            isSA = userbl.isSuperAdmin(userId);
        }*/

    var list = JSON.parse(JSON.stringify(dataHl1.getLevel1LobAllocationSummary(budgetYearId, regionId, subRegionId, userId, isSA)));
        // result.out_result = {};
    list.forEach(function (row) {
        result.out_result[row.ACRONYM] = result.out_result[row.ACRONYM] || {
            ACRONYM: row.ACRONYM,
            BUDGET_YEAR: row.BUDGET_YEAR,
            CRM_ID: row.CRM_ID,
            HL1_DESCRIPTION: row.HL1_DESCRIPTION,
            HL1_ID: row.HL1_ID,
            HL2_TOTAL_COUNT: row.HL2_TOTAL_COUNT,
            IS_LOCKED: row.IS_LOCKED,
            HIERARCHY_LEVEL_ID: HIERARCHY_LEVEL.HL1,
            CHILDREN: []
        };
        if (row.BUDGET_DISTRIBUTION_AMOUNT) {
            result.out_result[row.ACRONYM].CHILDREN.push({
                CATEGORY_NAME: row.CATEGORY_NAME,
                OPTION_NAME: row.OPTION_NAME,
                BUDGET_DISTRIBUTION_PERCENTAGE: row.BUDGET_DISTRIBUTION_PERCENTAGE,
                BUDGET_DISTRIBUTION_AMOUNT: row.BUDGET_DISTRIBUTION_AMOUNT,
                SUB_AMOUNT: row.SUB_AMOUNT
            });
        }
    });
    // v Object.values(result.out_result) v //
    result = Object.keys(result.out_result).map(function (k) {
        return result.out_result[k];
    });

    return result;
}

function getLevel1Kpi(budgetYearId, regionId, userId) {
    var isSA = false;
    var result = {};
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }

    var listFromData = dataHl1.getHl1KpiSummary(budgetYearId, regionId, userId, isSA);

    var mapKpi = {};

    listFromData.forEach(function (hl) {
        mapKpi[hl.L1_ACRONYM] = mapKpi[hl.L1_ACRONYM] || {
            HL1_ID: hl.HL1_ID,
            CRM_ID: hl.CRM_ID,
            HL1_DESCRIPTION: hl.HL1_DESCRIPTION,
            ACRONYM: hl.L1_ACRONYM,
            BUDGET_YEAR: hl.BUDGET_YEAR,
            REGION_NAME: hl.REGION_NAME,
            IS_LOCKED: hl.IS_LOCKED,
            HIERARCHY_LEVEL_ID: HIERARCHY_LEVEL.HL1
        };
        var auxKpi = mapKpi[hl.L1_ACRONYM].kpi || [];
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
        mapKpi[hl.L1_ACRONYM].kpi = auxKpi;
    });

    var result = {};
    result.out_result = Object.keys(mapKpi).map(function (e) {
        return mapKpi[e]
    });
    return result;
}

function getLevel1ForSearch(budgetYearId, regionId, limit, offset, userSessionID) {
    var result = dataHl1.getLevel1ForSearch(budgetYearId || 1, regionId || 0, limit, offset || 0, userSessionID, util.isSuperAdmin(userSessionID) ? 1 : 0);
    return result;
}

function getHistory(HL1_ID) {
    return dataHl1.getAllHl1VersionByHl1Id(HL1_ID);
}

function getHistoryDetail(HL_ID, VERSION) {
    return dataHl1.getLevel1VersionById(HL_ID, VERSION);
}

function getHistoryAllFirstVersion(budgetYearId, userSessionID) {
    return dataHl1.getLevel1VersionForFilter(budgetYearId, userSessionID, userbl.isSuperAdmin(userSessionID));
}

function getCategoryOption(hl1_id) {
    return allocationCategoryOptionLevelLib.getHlCategoryOptionByLevelHlId('HL1', hl1_id);
}

function getHl1GroupByRegion(budgetYearId, userId) {
    if (!userId) {
        throw ErrorLib.getErrors().CustomError("", "", L1_MSG_USER_NOT_FOUND);
    }

    var isSA = userId ? util.isSuperAdmin(userId) : 1;

    if (!isSA) {
        throw ErrorLib.getErrors().CustomError("", "", NOT_SUPERADMIN_USER);
    }

    var hl1List = dataHl1.getHl1ByBudgetYear(budgetYearId);
    return util.parseLevelTreeByRegion(hl1List, HIERARCHY_LEVEL.HL1);
}

function insertHl1(data, userId) {
    data.ASSIGNED_USERS = util.parseAssignedUsers(data.ASSIGNED_USERS);

    var requiredDFObject = JSON.parse(JSON.stringify(businessBudget.getRequireDynamicFormByBudgetYearId(data.BUDGET_YEAR_ID)));

    //Complete data with dynamic form (if the Budget Year requires it).
    data = (Number(requiredDFObject.REQUIRE_DYNAMIC_FORM) === 1)? util.completeFromDynamicFormByRole(userId, HIERARCHY_LEVEL["HL1"], data, true): data;

    validateHl1(data);
    validateHl1User(data.ASSIGNED_USERS);

    var hl1_id = dataHl1.insertLevel1(
        data.ACRONYM,
        data.DESCRIPTION,
        data.BUDGET_YEAR_ID,
        data.REGION_ID,
        userId,
        data.BUDGET,
        data.PLANNING_PURPOSE_ID,
        data.TEAM_TYPE_ID,
        data.IMPLEMENT_EXECUTION_LEVEL,
        data.CRT_RELATED);

    data.HL1_ID = hl1_id;
    var assignedUsersIds = completeUsers(data.ASSIGNED_USERS);

    var assignedUsersIdsCollection = assignedUsersIds.map(function (assignedUserId) {
        return {
            in_hl1_id: hl1_id
            , in_user_id: assignedUserId
            , in_created_user_id: userId
        }
    });

    dataHl1User.delAllLevel1User(data.HL1_ID);
    dataHl1User.insertLevel1User(assignedUsersIdsCollection);

    insertExpectedOutcomes(data, userId);
    insertCategoryOption(data, userId);

    return hl1_id;
}

function insertCategoryOption(data, userId) {
    var categoryOptionBulk = [];
    var mapCOL = util.getMapCategoryOption('hl1');

    data.CATEGORIES.forEach(function (hl1Category) {
        hl1Category.OPTIONS.forEach(function (hl1CategoryOption) {
            categoryOptionBulk.push({
                in_hl1_id: data.HL1_ID
                , in_category_option_level_id: mapCOL[hl1Category.CATEGORY_ID][hl1CategoryOption.OPTION_ID]
                , in_amount: hl1CategoryOption.AMOUNT || 0
                , in_amount_value: hl1CategoryOption.AMOUNT_VALUE || 0
                , in_user_id: userId
                , in_updated: 0
            });
        });
    });
    dataCategoryOptionLevel.insertCategoryOption(categoryOptionBulk, 'hl1');

    return true;
}

function insertExpectedOutcomes(data, userId) {
    var hl1ExpectedOutcomesId = dataExOut.insertHL1ExpectedOutcomes(data.HL1_ID, data.TARGET_KPIS.COMMENTS || '', userId);
    var mapEOL = expectedOutcomesLevelLib.getKpiTypeOptionMapByHlId(HIERARCHY_LEVEL.HL1);
    if (data.TARGET_KPIS.KPIS.length) {
        var hl1ExpectedOutcomesDetail = [];
        data.TARGET_KPIS.KPIS.forEach(function (expectedOutcomeDetail) {
            var expectedOutcomeLevelId = mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID]
            && mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID][expectedOutcomeDetail.OUTCOMES_ID]
                ? mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID][expectedOutcomeDetail.OUTCOMES_ID]
                : expectedOutcomeDetail.EXPECTED_OUTCOME_LEVEL_ID;
            hl1ExpectedOutcomesDetail.push({
                in_hl1_expected_outcomes_id: hl1ExpectedOutcomesId,
                in_expected_outcome_level_id: expectedOutcomeLevelId,
                in_euro_value: expectedOutcomeDetail.EURO_VALUE,
                in_volume_value: Number(expectedOutcomeDetail.VOLUME_VALUE),
                in_created_user_id: userId
            });
        });

        dataExOut.insertHL1ExpectedOutcomesDetail(hl1ExpectedOutcomesDetail);
    }
}

function insertHl1FromUpload(data, userId) {
    //data = uiToServerParser(data);

    validateHl1ForUpload(data);

    //INSERT USERS RELATED TO HL2
    var listObjHl1User = util.parseAssignedUsers(data.USERS);
    /******************/
    listObjHl1User = completeUsers(listObjHl1User); //add SA users
    /******************/
    if (!listObjHl1User || listObjHl1User.length == 0) {
        throw ErrorLib.getErrors().ImportError(
            "", "", L1_MSG_NOT_USERS_ASSOCIATED);
    }

    var hl1_id = dataHl1.insertLevel1(data.ACRONYM, data.DESCRIPTION, data.BUDGET_YEAR_ID, data.REGION_ID
        , userId, data.BUDGET, data.PLANNING_PURPOSE_ID, data.IMPLEMENT_EXECUTION_LEVEL, data.CRT_RELATED, data.IMPORT_ID, 1);

    data.HL1_ID = hl1_id;

    if (listObjHl1User) {
        if (validateHl1User(listObjHl1User)) {
            var arrHl1User = [];
            for (var i = 0; i < listObjHl1User.length; i++) {
                arrHl1User.push({
                    in_hl1_id: hl1_id
                    , in_user_id: listObjHl1User[i]
                    , in_created_user_id: userId
                });
            }

            if (arrHl1User.length > 0) {
                dataHl1User.delAllLevel1User(data.HL1_ID);
                dataHl1User.insertLevel1User(arrHl1User);
            }
        }
    }
    return hl1_id;
}

//Insert new HL1 version based on the current HL1.
function insertLevel1Version(currentHL1, userId) {
    //Insert the new version
    return dataHl1.insertLevel1Version(
        currentHL1.HL1_ID,
        currentHL1.VERSION,
        currentHL1.ACRONYM,
        currentHL1.DESCRIPTION,
        currentHL1.BUDGET_YEAR_ID,
        currentHL1.REGION_ID,
        userId,
        currentHL1.BUDGET,
        currentHL1.PLANNING_PURPOSE_ID,
        currentHL1.TEAM_TYPE_ID,
        currentHL1.IMPLEMENT_EXECUTION_LEVEL,
        currentHL1.CRT_RELATED
    );
}

function updateHl1(data, userId) {
    if(data.ASSIGNED_USERS && data.ASSIGNED_USERS.length){
        data.ASSIGNED_USERS = util.parseAssignedUsers(data.ASSIGNED_USERS);
    }

    var currentHL1 = JSON.parse(JSON.stringify(dataHl1.getLevel1ById(data.HL1_ID)));

    var requiredDFObject = JSON.parse(JSON.stringify(businessBudget.getRequireDynamicFormByBudgetYearId(data.BUDGET_YEAR_ID)));

    //Execute dynamic form logic only if the Budget Year requires it
    if(Number(requiredDFObject.REQUIRE_DYNAMIC_FORM) === 1){
        currentHL1.TARGET_KPIS = JSON.parse(JSON.stringify(expectedOutcomesLib.getExpectedOutcomesByHL1Id(data.HL1_ID)));
        currentHL1.ASSIGNED_USERS = util.parseAssignedUsers(JSON.parse(JSON.stringify(userbl.getUserByHl1Id(data.HL1_ID))).users_in);

        //Complete data with current HL1 using the dynamic form "hidden" as reference to update
        data = util.completeDynamicFormEdition(userId, HIERARCHY_LEVEL["HL1"], data, currentHL1);
    }

    validateHl1(data);
    validateHl1User(data.ASSIGNED_USERS);


    var hl1Id = data.HL1_ID;
    var currentHL1 = dataHl1.getLevel1ById(data.HL1_ID);
    currentHL1 = JSON.parse(JSON.stringify(currentHL1));

    var budgetChanged = Number(currentHL1.BUDGET) != Number(data.BUDGET);

    //Insert new HL1 version, if the date is into the valid range
    if (businessBudget.getLockFlagByHlIdLevel(hl1Id, 'HL1') && validateChanges(currentHL1, data)) {
        insertLevel1Version(currentHL1, userId);
        currentHL1.VERSION += 1;
    }
    var updated = dataHl1.updateLevel1(
        data.HL1_ID
        , data.ACRONYM
        , data.DESCRIPTION
        , data.BUDGET_YEAR_ID
        , data.REGION_ID
        , userId
        , data.BUDGET
        , data.PLANNING_PURPOSE_ID
        , data.TEAM_TYPE_ID
        , data.IMPLEMENT_EXECUTION_LEVEL
        , data.CRT_RELATED
        , currentHL1.VERSION
    );

    if (budgetChanged) {
        level2.checkBudgetStatus(data.HL1_ID, userId);
    }

    var hl2List = dataHl2.getAllLevel2(data.HL1_ID, userId);
    var hl1Users = dataHl1User.getAllHl1User(data.HL1_ID);
    var arrHl1User = [];
    var arrHl2User = [];
    var arrDelHl2User = [];

    dataHl1User.delAllLevel1User(data.HL1_ID);

    for (var i = 0; i < data.ASSIGNED_USERS.length; i++) {
        arrHl1User.push({
            in_hl1_id: data.HL1_ID
            , in_user_id: data.ASSIGNED_USERS[i]
            , in_created_user_id: userId
        });

        if (notExistHl1UserInList(hl1Users, data.ASSIGNED_USERS[i])) {
            arrHl2User = hl2List.map(function (hl2) {
                return {
                    in_hl2_id: hl2.HL2_ID
                    , in_user_id: data.ASSIGNED_USERS[i]
                    , in_created_user_id: userId
                };
            });
        }
    }
    if (arrHl1User.length > 0) {
        dataHl1User.insertLevel1User(arrHl1User);
    }
    if (arrHl2User.length > 0) {
        dataHl2User.insertLevel2User(arrHl2User);
    }

    for (var j = 0; j < hl1Users.length; j++) {
        if (notExistHl1UserInList(data.ASSIGNED_USERS, hl1Users[j].USER_ID)) {
            arrDelHl2User = hl2List.map(function (hl2) {
                return {
                    in_hl2_id: hl2.HL2_ID
                    , in_user_id: hl1Users[j].USER_ID
                };
            });
        }
    }
    if (arrDelHl2User.length > 0) {
        level2.deleteLevel2User(arrDelHl2User);
    }
    var isSA = userbl.isSuperAdmin(userId);

    if (isSA) {
        updateExpectedOutcomes(data, userId);
    }
    updateCategoryoption(data, userId);
    return updated;
}

function updateBudget(hl1Id,budget,userId) {
    return dataHl1.updateBudget(hl1Id,budget,userId);
}

function updateExpectedOutcomes(data, userId) {
    dataExOut.deleteHl1ExpectedOutcomesDetail(data.HL1_ID, userId);
    dataExOut.deleteHl1ExpectedOutcomes(data.HL1_ID, userId);
    insertExpectedOutcomes(data, userId);
}

function updateCategoryoption(data, userId) {
    var insertBulk = [];
    var updateBulk = [];
    var mapCOL = util.getMapCategoryOption('hl1');
    data.CATEGORIES.forEach(function (hl1Category) {
        hl1Category.OPTIONS.forEach(function (option) {
            var categoryOption = {
                in_category_option_level_id: mapCOL[hl1Category.CATEGORY_ID][option.OPTION_ID]
                , in_amount: option.AMOUNT || 0
                , in_amount_value: option.AMOUNT_VALUE || 0
                , in_user_id: userId
                , in_updated: 0
                , in_hl1_id: data.HL1_ID
            };
            if (!option.CATEGORY_OPTION_ID) {
                categoryOption.in_hl1_id = data.HL1_ID;
                insertBulk.push(categoryOption);
            } else {
                updateBulk.push(categoryOption);
            }
        });
    });

    if (updateBulk && updateBulk.length)
        dataCategoryOptionLevel.updateCategoryOption(updateBulk, 'hl1');

    if (insertBulk && insertBulk.length)
        dataCategoryOptionLevel.insertCategoryOption(insertBulk, 'hl1');

    return true;
}

function updateDynamicFormAssociation(data, userId) {
    var dynamicForm = {
        L2: [],
        L3: [],
        L4: [],
        L5: [],
        L6: []
    };

    Object.keys(data).forEach(function (level) {
        var levelString = 'H' + level;
        switch (level) {
            case "L2":
            case "L3":
            case "L4":
            case "L5":
            case "L6":
                if (data[level] && (data[level].USE_DEFAULT || (data[level].DYNAMIC_FORM_UID && data[level].DYNAMIC_FORM_UID.trim()))) {
                    var dynamicFormUId = data[level].USE_DEFAULT ? null : data[level].DYNAMIC_FORM_UID.trim();
                    if (data.HL1_IDS.constructor === Array) {
                        dynamicForm[level] = data.HL1_IDS.map(function (value) {
                            return {
                                hl1Id: value,
                                dynamicFormUId: dynamicFormUId,
                                userId: userId
                            }
                        });
                    } else {
                        dynamicForm[level].push({
                            hl1Id: data.HL1_IDS,
                            dynamicFormUId: dynamicFormUId,
                            userId: userId
                        })
                    }
                }

                if (dynamicForm[level].length) {
                    dataHl1.updateDynamicFormAssociation(dynamicForm[level], levelString);
                }
                break;
        }
    });

    return true;
}

function massUpdateDynamicFormAssociation(data, hl1List, userId, errorMessage) {
    if (!hl1List.length) {
        throw ErrorLib.getErrors().CustomError("", "", errorMessage);
    }

    var updateObject = {
        L2: data.L2,
        L3: data.L3,
        L4: data.L4,
        L5: data.L5,
        L6: data.L6,
        HL1_IDS: []
    };

    updateObject.HL1_IDS = hl1List.map(function (hl1) {
        return hl1.HL1_ID;
    });

    return updateDynamicFormAssociation(updateObject, userId);
}

function updateDynamicFormAssociationByRegion(data, userId) {
    var regionData = data.REGION_IDS.map(function (regionId) {
        return {
            in_region_id: regionId,
            in_budget_year_id: data.BUDGET_YEAR_ID
        }
    });

    var hl1List = dataHl1.getHl1ByBudgetYearRegion(regionData);

    return massUpdateDynamicFormAssociation(data, hl1List, userId, NO_L1_EXIST_IN_SELECTED_REGION);
}

function updateDynamicFormAssociationByPlanningPurpose(data, userId) {
    var planningPurposeData = data.PLANNING_PURPOSE_IDS.map(function (planningPurposeId) {
        return {
            in_planning_purpose_id: planningPurposeId,
            in_budget_year_id: data.BUDGET_YEAR_ID
        }
    });

    var hl1List = dataHl1.getHl1ByBudgetYearPlanningPurpose(planningPurposeData);

    return massUpdateDynamicFormAssociation(data, hl1List, userId, NO_L1_EXIST_IN_SELECTED_PLANNING_PURPOSE);
}

function deleteHl1(hl1Id, userId) {
    //verify if userId is SUPERADMIN, then can delete
    var rol = userRoleLib.getUserRoleByUserId(userId);
    var userRoleId = 0;
    if (rol) {
        userRoleId = Number(rol[0]['ROLE_ID']);
    }
    if (userRoleId !== 1 && userRoleId !== 2)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_NO_PRIVILEGE);

    if (!hl1Id)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_NOT_FOUND);
    if (!util.validateIsNumber(hl1Id))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_NOT_FOUND);

    if (dataHl1.countRelatedObjects(hl1Id))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_CANT_DELETE);

    dataExOut.deleteHl1ExpectedOutcomesDetail(hl1Id, userId);
    dataExOut.deleteHl1ExpectedOutcomes(hl1Id, userId);
    dataCategoryOptionLevel.deleteCategoryOption(hl1Id, userId, 'HL1');
    return dataHl1.deleteHl1(hl1Id, userId);
}

function completeUsers(assignedUsers) {
    var id = config.getRoleEnum().SuperAdmin;
    /*var listUsers = [];
    for (var j = 0; j < users.length; j++) {
        listUsers.push(users[j].USER_ID);
    }*/
    var saUsers = userbl.getUserByRoleId(id);

    for (var i = 0; i < saUsers.length; i++) {
        if (!contains(assignedUsers, saUsers[i].USER_ID)) {
            assignedUsers.push(saUsers[i].USER_ID);
        }
    }

    return assignedUsers;
}

function contains(assignedUsers, superAdminId) {
    var i = assignedUsers.length;
    while (i--) {
        if (assignedUsers[i] === superAdminId) {
            return true;
        }
    }
    return false;
}

function notExistHl1UserInList(baseUsersIdsList, assignedUserId) {
    var notExist = true;
    for (var i = 0; i < baseUsersIdsList.length; i++) {
        var id = baseUsersIdsList[i].USER_ID || baseUsersIdsList[i];
        if (id == assignedUserId) {
            notExist = !notExist;
            break;
        }
    }
    /*baseUsersIdsList.forEach(function (hl2User) {
        if (hl2User.USER_ID == hl2UserId) {
            ++notExist;
        }
    });*/

    return notExist;
}

function getLevel1ByUser(userId) {
    if (!userId)
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "level1Services/handleGet/getLevel1ByUser", L1_MSG_USER_NOT_FOUND);

    var isSA = util.isSuperAdmin(userId);
    return dataHl1.getLevel1ByUser(isSA, userId);
}

function getLevel1ByFilters(budgetYearId, regionId, subRegionId, userId) {
    var isSA = false;
    var result = {};
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }

    var list = JSON.parse(JSON.stringify(dataHl1.getLevel1ByFilters(budgetYearId, regionId, subRegionId, userId, isSA)));
    result.out_result = {};
    list.out_result.forEach(function (row) {
        result.out_result[row.ACRONYM] = result.out_result[row.ACRONYM] || row;
        result.out_result[row.ACRONYM].BUDGET = row.L1_BUDGET;
        result.out_result[row.ACRONYM].L1_BUDGET_PERCENTAGE = row.L1_BUDGET_PERCENTAGE;
        result.out_result[row.ACRONYM].L1_BUDGET_REMAINING = row.L1_BUDGET_REMAINING;
        result.out_result[row.ACRONYM].L1_BUDGET_ALLOCATED = row.L1_BUDGET_ALLOCATED;
        result.out_result[row.ACRONYM].CHILDREN = result.out_result[row.ACRONYM].CHILDREN || [];
        if (row.BUDGET_DISTRIBUTION_AMOUNT) {
            result.out_result[row.ACRONYM].CHILDREN.push({
                CATEGORY_NAME: row.CATEGORY_NAME,
                OPTION_NAME: row.OPTION_NAME,
                BUDGET_DISTRIBUTION_PERCENTAGE: row.BUDGET_DISTRIBUTION_PERCENTAGE,
                BUDGET_DISTRIBUTION_AMOUNT: row.BUDGET_DISTRIBUTION_AMOUNT,
                SUB_AMOUNT: row.SUB_AMOUNT
            });
        }
    });
    // v Object.values(result.out_result) v //
    result.out_result = Object.keys(result.out_result).map(function (k) {
        return result.out_result[k];
    });

    result.out_total_budget = list.out_total_budget;
    return result;
}

function getLevel1Kpi(budgetYearId, regionId, userId) {
    var isSA = false;
    var result = {};
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }

    var listFromData = dataHl1.getHl1KpiSummary(budgetYearId, regionId, userId, isSA);

    var mapKpi = {};

    listFromData.forEach(function (hl) {
        mapKpi[hl.L1_ACRONYM] = mapKpi[hl.L1_ACRONYM] || {
            HL1_ID: hl.HL1_ID,
            CRM_ID: hl.CRM_ID,
            HL1_DESCRIPTION: hl.HL1_DESCRIPTION,
            ACRONYM: hl.L1_ACRONYM,
            BUDGET_YEAR: hl.BUDGET_YEAR,
            REGION_NAME: hl.REGION_NAME
        };
        var auxKpi = mapKpi[hl.L1_ACRONYM].kpi || [];
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
        mapKpi[hl.L1_ACRONYM].kpi = auxKpi;
    });

    var result = {};
    result.out_result = Object.keys(mapKpi).map(function (e) {
        return mapKpi[e]
    });
    return result;
}

function getLevel1ForSearch(budgetYearId, regionId, limit, offset, userSessionID) {
    var result = dataHl1.getLevel1ForSearch(budgetYearId || 1, regionId || 0, limit, offset || 0, userSessionID, util.isSuperAdmin(userSessionID) ? 1 : 0);
    return result;
}

function validateHl1(data) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'ACRONYM',
        'DESCRIPTION',
        'BUDGET_YEAR_ID',
        'BUDGET',
        'PLANNING_PURPOSE_ID',
        'IMPLEMENT_EXECUTION_LEVEL',
        'CRT_RELATED'
    ];

    var keysTeamType = [
        'REGION_ID'
    ];

    if (!data)
        throw ErrorLib.getErrors().CustomError("", "", L1_MSG_PLAN_NOT_FOUND);

    try {
        keys.forEach(function (key) {
            if (data[key] === null || data[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, data[key]);
                //the organization type is Central team
                if (key === 'PLANNING_PURPOSE_ID' && data.PLANNING_PURPOSE_RELATED_DATA == "REGIONAL") {
                    keysTeamType.forEach(function (k) {
                        if (k == 'REGION_ID' && (data[k] === null || data[k] === undefined)) {
                            errors[k] = null;
                            throw BreakException;
                        } else {
                            if (k == 'REGION_ID')
                                isValid = validateType(k, data[k]);

                            if (!isValid) {
                                errors[k] = data[k];
                                throw BreakException;
                            }
                        }
                    });
                }
                if (!isValid) {
                    errors[key] = data[key];
                    throw BreakException;
                }
            }
        });

        var oldHl1 = dataHl1.getLevel1ByAcronymByBudgetYearId(data.ACRONYM, data.BUDGET_YEAR_ID);
        if (oldHl1 && oldHl1.HL1_ID != data.HL1_ID)
            throw ErrorLib.getErrors().CustomError("", "", L1_MSG_LEVEL_1_EXISTS);

        validateKpi(data);
        validateCategoryOption(data);

        isValid = true;
    } catch (e) {
        if (e.code == 450)
            throw e.details;
        else if (e !== BreakException)
            throw ErrorLib.getErrors().CustomError("", "", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("", "", JSON.stringify(errors));
    }
    return isValid;
}

function validateHl1ForUpload(data) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'ACRONYM',
        'DESCRIPTION',
        'BUDGET_YEAR_ID',
        'PLANNING_PURPOSE_ID',
        'IMPLEMENT_EXECUTION_LEVEL',
        'CRT_RELATED'
    ];

    var keysTeamType = [
        'REGION_ID'
    ];

    if (!data) {
        var error = ErrorLib.getErrors().ImportError("", "hl1Services/handlePost/validateHl1ForUpload", L1_MSG_PLAN_NOT_FOUND);
        error.row = valuesToArray(data);
        throw error;
    }

    //validate data types
    var currentKey = "";
    try {
        keys.forEach(function (key) {
            currentKey = key;
            if (data[key] === null || data[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, data[key]);
                //the organization type is Central team
                if (key === 'PLANNING_PURPOSE_ID' && data.PLANNING_PURPOSE_RELATED_DATA == "REGIONAL") {
                    keysTeamType.forEach(function (k) {
                        if (k == 'REGION_ID' && (data[k] === null || data[k] === undefined)) {
                            errors[k] = null;
                            throw BreakException;
                        } else {

                            if (k == 'REGION_ID')
                                isValid = validateType(k, data[k]);

                            if (!isValid) {
                                errors[k] = data[k];
                                throw BreakException;
                            }
                        }
                    });
                }
                if (!isValid) {
                    errors[key] = data[key];
                    throw BreakException;
                }
            }
        });
        //validate Assume that the maximum value to enter is **999,999,999.00**.
        if (!util.validateMaximValue(data.BUDGET)) {
            throw ErrorLib.getErrors().ImportError("", "uploadService/handlePost/validateHl1ForUpload", L1_BUDGET_EXCEEDED);
        }
    } catch (e) {
        if (e == BreakException) {
            var error = ErrorLib.getErrors().ImportError("", "hl1Services/handlePost/validateHl1ForUpload: (" + currentKey + ")", L1_MSG_TYPE_VALUE_ERROR);
            error.row = valuesToArray(errors);
            throw error;
        }
        else {
            throw e;
        }
    }

    //validate if the plan exists
    var oldHl1 = dataHl1.getLevel1ByAcronymByBudgetYearId(data.ACRONYM, data.BUDGET_YEAR_ID);
    if (oldHl1 && oldHl1.HL1_ID) {
        var error = ErrorLib.getErrors().ImportError("", "hl1Services/handlePost/validateHl1ForUpload", L1_MSG_LEVEL_1_EXISTS);
        error.row = valuesToArray(data);
        throw error;
    }

    //validate regional plan
    if (data.REGIONAL_TEAM == TEAM_TYPE.REGIONAL) {
        //case not region = ALL, Market Unit = NONE
        if (data.REGION_ID) {
            if (data.SUBREGION_ID) {
                valid = dataRegion.validateRegionAndMarketUnit(data.REGION_ID, data.SUBREGION_ID);
                if (!valid) {
                    var error = ErrorLib.getErrors().ImportError("", "hl1Services/handlePost/validateHl1ForUpload", L1_MSG_MARKET_UNIT_ERROR);
                    error.row = valuesToArray(data);
                    throw error;
                }
            }
        }
    }
    return true;
}

function valuesToArray(obj) {
    return Object.keys(obj).map(function (key) {
        return obj[key];
    });
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'ACRONYM':
            valid = value.length > 0 && value.length <= 2;
            break;
        case 'DESCRIPTION':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'BUDGET_YEAR_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'USER_ID':
        case 'HL2_ID':
        case 'PLANNING_PURPOSE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'BUDGET':
            valid = Number(value) >= 0;
            break;
    }
    return valid;
}

function validateHl1User(assignedUsersId) {
    if (!assignedUsersId || !assignedUsersId.length)
        throw ErrorLib.getErrors().CustomError("", "hl1Services/handlePost/validateHl1User", "Assigned user list is empty.");

    for (var i = 0; i < assignedUsersId.length; i++) {
        if (!Number(assignedUsersId[i]))
            throw ErrorLib.getErrors().CustomError("", "hl1Services/handlePost/validateHl1User", "Assigned user is invalid.");
    }
    return true;
}

function checkPermission(userSessionID, method, hl1Id) {
    if (((method && method == "HL1_ID") || !method) && !util.isSuperAdmin(userSessionID)) {
        var usersL1 = userbl.getUserByHl1Id(hl1Id).users_in;
        var users = usersL1.find(function (user) {
            return user.USER_ID == userSessionID
        });
        if (!users) {
            throw ErrorLib.getErrors().CustomError("", "level1/handlePermission", "User hasn´t permission for this resource.");
        }
    }
}

function validateChanges(originalHL1, newHL1) {
    var validation = false;

    Object.keys(newHL1).forEach(function (key) {
        switch (key) {
            case 'BUDGET_YEAR_ID':
                if (Number(originalHL1.BUDGET_YEAR_ID) !== Number(newHL1.BUDGET_YEAR_ID)) {
                    validation = true;
                }
                break;
            case 'ACRONYM':
                if (originalHL1.ACRONYM !== newHL1.ACRONYM) {
                    validation = true;
                }
                break;
            case 'DESCRIPTION':
                if (originalHL1.DESCRIPTION !== newHL1.DESCRIPTION) {
                    validation = true;
                }
                break;
            case 'BUDGET':
                if (Number(originalHL1.BUDGET) !== Number(newHL1.BUDGET)) {
                    validation = true;
                }
                break;
            case 'IMPLEMENT_EXECUTION_LEVEL':
                if (originalHL1.IMPLEMENT_EXECUTION_LEVEL !== newHL1.IMPLEMENT_EXECUTION_LEVEL) {
                    validation = true;
                }
                break;
            case 'CRT_RELATED':
                if (originalHL1.CRT_RELATED !== newHL1.CRT_RELATED) {
                    validation = true;
                }
                break;
            case 'REGION_ID':
                if (originalHL1.REGION_ID !== newHL1.REGION_ID) {
                    validation = true;
                }
                break;
            case 'PLANNING_PURPOSE_ID':
                if (Number(originalHL1.PLANNING_PURPOSE_ID) !== Number(newHL1.PLANNING_PURPOSE_ID)) {
                    validation = true;
                }
                break;
        }
    });

    return validation;
}

function getHistory(HL1_ID) {
    return dataHl1.getAllHl1VersionByHl1Id(HL1_ID);
}

function getHistoryDetail(HL_ID, VERSION) {
    return dataHl1.getLevel1VersionById(HL_ID, VERSION);
}

function getHistoryAllFirstVersion(budgetYearId, userSessionID) {
    return dataHl1.getLevel1VersionForFilter(budgetYearId, userSessionID, userbl.isSuperAdmin(userSessionID));
}

function insertExpectedOutcomes(data, userId) {
    var hl1ExpectedOutcomesId = dataExOut.insertHL1ExpectedOutcomes(data.HL1_ID, data.TARGET_KPIS.COMMENTS || '', userId);
    var mapEOL = expectedOutcomesLevelLib.getKpiTypeOptionMapByHlId(HIERARCHY_LEVEL.HL1);
    if (data.TARGET_KPIS.KPIS.length) {
        var hl1ExpectedOutcomesDetail = [];
        data.TARGET_KPIS.KPIS.forEach(function (expectedOutcomeDetail) {
            var expectedOutcomeLevelId = mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID]
            && mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID][expectedOutcomeDetail.OUTCOMES_ID]
                ? mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID][expectedOutcomeDetail.OUTCOMES_ID]
                : expectedOutcomeDetail.EXPECTED_OUTCOME_LEVEL_ID;
            hl1ExpectedOutcomesDetail.push({
                in_hl1_expected_outcomes_id: hl1ExpectedOutcomesId,
                in_expected_outcome_level_id: expectedOutcomeLevelId,
                in_euro_value: expectedOutcomeDetail.EURO_VALUE,
                in_volume_value: Number(expectedOutcomeDetail.VOLUME_VALUE),
                in_created_user_id: userId
            });
        });

        dataExOut.insertHL1ExpectedOutcomesDetail(hl1ExpectedOutcomesDetail);
    }
}

function updateExpectedOutcomes(data, userId) {
    dataExOut.deleteHl1ExpectedOutcomesDetail(data.HL1_ID, userId);
    dataExOut.deleteHl1ExpectedOutcomes(data.HL1_ID, userId);
    insertExpectedOutcomes(data, userId);
}

function validateKpi(data) {
    if (data.TARGET_KPIS) {
        if ((!data.TARGET_KPIS.KPIS || !data.TARGET_KPIS.KPIS.length)
            && !data.TARGET_KPIS.COMMENTS)
            throw ErrorLib.getErrors().CustomError("", "", L1_CAMPAIGN_FORECASTING_KPIS_COMMENT);

        data.TARGET_KPIS.KPIS.forEach(function (kpiDetail) {
            if (Number(kpiDetail.VOLUME_VALUE) != 0 && !Number(kpiDetail.VOLUME_VALUE))
                throw ErrorLib.getErrors().CustomError("", "", L1_CAMPAIGN_FORECASTING_KPIS_DETAILS);
            if (!kpiDetail.EURO_VALUE || !Number(kpiDetail.EURO_VALUE))
                throw ErrorLib.getErrors().CustomError("", "", L1_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO);
            if (!kpiDetail.OUTCOMES_ID || !Number(kpiDetail.OUTCOMES_ID))
                throw ErrorLib.getErrors().CustomError("", "", L1_CAMPAIGN_FORECASTING_KPIS_NOT_VALID);
        });
    }
    return true;
}

function validateCategoryOption(data) {
    if (!data.CATEGORIES || !data.CATEGORIES.length)
        throw ErrorLib.getErrors().CustomError("", "", L1_CATEGORY_NOT_EMPTY);

    if (!data.HL1_ID && data.CATEGORIES.length !== dataCategory.getAllocationCategoryCountByHlId("hl1"))
        throw ErrorLib.getErrors().CustomError("", "", L1_CATEGORY_INCORRECT_NUMBER);
    var percentagePerOption = 0;
    var thereIsMandatoryCategory = false;
    for (var i = 0; i < data.CATEGORIES.length; i++) {
        var percentagePerCategory = 0;
        var hl1Category = data.CATEGORIES[i];
        thereIsMandatoryCategory = thereIsMandatoryCategory || !!hl1Category.MAKE_CATEGORY_MANDATORY;
        if (!hl1Category.CATEGORY_ID || !Number(hl1Category.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "", L1_CATEGORY_NOT_VALID);

        if (!hl1Category.OPTIONS || !hl1Category.OPTIONS.length)
            throw ErrorLib.getErrors().CustomError("", "", L1_CATEGORY_OPTIONS_NOT_EMPTY);

        hl1Category.OPTIONS.forEach(function (option) {
            if (!option.OPTION_ID || !Number(option.OPTION_ID))
                throw ErrorLib.getErrors().CustomError("", "", L1_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.AMOUNT_VALUE) && !Number(option.AMOUNT_VALUE))
                || Number(option.AMOUNT_VALUE) > Number(data.BUDGET)
                || Number(option.AMOUNT_VALUE) < 0)
                throw ErrorLib.getErrors().CustomError("", "", "Option value is not valid (actual value " + option.AMOUNT_VALUE + ")");

            percentagePerOption = percentagePerOption + Number(option.AMOUNT_VALUE || 0);
            percentagePerCategory += Number(option.AMOUNT_VALUE || 0);
        });

        if ((Number(data.BUDGET) > 0) && hl1Category.MAKE_CATEGORY_MANDATORY && percentagePerCategory <= 0) {
            throw ErrorLib.getErrors().CustomError("", "", L1_BUDGET_ZERO_CATEGORY_TOTAL_PERCENTAGE_ZERO);
        }
    }
    if (thereIsMandatoryCategory) {
        if ((Number(data.BUDGET) == 0) && percentagePerOption != 0) {
            throw ErrorLib.getErrors().CustomError("", "", L1_BUDGET_ZERO_CATEGORY_TOTAL_PERCENTAGE_ZERO);
        }

        if ((Number(data.BUDGET) > 0) && percentagePerOption != 100) {
            throw ErrorLib.getErrors().CustomError("", "hl1Services/handlePost/validateCategoryOption", L1_CATEGORY_TOTAL_PERCENTAGE);
        }
    }

    return true;
}

function getCategoryOption(hl1_id) {
    return allocationCategoryOptionLevelLib.getHlCategoryOptionByLevelHlId('HL1', hl1_id);
}

        if ((Number(data.BUDGET) > 0) && percentagePerOption != Number(data.BUDGET)) {
            throw ErrorLib.getErrors().CustomError("", "", L1_CATEGORY_TOTAL_PERCENTAGE);
        }
    }

    return true;
}

function parseKpiForEdition(targetKpis) {
    targetKpis.KPIS.forEach(function (kpi) {
        kpi.VALUE_AVAILABLE_TO_ALLOCATE = undefined;
        kpi.VOLUME_AVAILABLE_TO_ALLOCATE = undefined;
    });

    return targetKpis;
}