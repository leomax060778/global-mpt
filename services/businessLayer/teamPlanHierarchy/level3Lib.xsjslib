$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var data = mapper.getDataLevel3();
var ErrorLib = mapper.getErrors();
var blLevel2 = mapper.getLevel2();
var db = mapper.getdbHelper();
var dataHl4 = mapper.getDataLevel4();
var dataHl2 = mapper.getDataLevel2();
var blPath = mapper.getPath();
var hl4 = mapper.getLevel4();
var dbUser = mapper.getDataUser();
var dataHl3User = mapper.getDataLevel3User();
var mail = mapper.getMail();
var businessError = mapper.getLogError();
var userRoleLib = mapper.getUserRole();
var config = mapper.getDataConfig();
var userbl = mapper.getUser();
var util = mapper.getUtil();
var budgetYear = mapper.getBudgetYear();
var dataExOut = mapper.getDataExpectedOutcome();
var expectedOutcomesLib = mapper.getExpectedOutcomes();
var dataUpload = mapper.getDataUpload();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var allocationCategory = mapper.getAllocationCategoryLib();
var dataCategory = mapper.getDataCategory();
var expectedOutcomesLevelLib = mapper.getExpectedOutcomesLevelLib();
var allocationCategoryOptionLevelLib = mapper.getAllocationCategoryOptionLevelLib();
var budgetSpendRequestLib = mapper.getBudgetSpendRequest();
var eventManagementLib = mapper.getEventManagementLib();
/** ***********END INCLUDE LIBRARIES*************** */
var LEVEL3 = 3;
var L2_MSG_TEAM_NOT_FOUND = "The Priority/Sub-Team can not be found.";
var L2_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L2_MSG_TEAM_CANT_DELETE = "The selected Priority/Sub-Team can not be deleted because has childs.";
var L2_MSG_PLAN_NOT_FOUND = "The Plan to new Priority/Sub-Team can not be found.";
var L2_MSG_TEAM_EXISTS = "Another Priority/Sub-Team with the same acronym already exists.";
var L2_MSG_OVER_BUDGET = "Sub-Team budget should be less than or equal to parent remaining budget.";

var L2_CAMPAIGN_FORECASTING_KPIS_COMMENT = "Please enter a comment to explain expected outcomes as you didn't select any Campaign type.";
var L2_CAMPAIGN_FORECASTING_KPIS_DETAILS = "Campaign Forecasting / KPIS details amount value is not valid.";
var L2_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO = "Campaign Forecasting / KPIS details euro value is not valid.";
var L2_CAMPAIGN_FORECASTING_KPIS_NOT_VALID = "Campaign Forecasting / KPIS is not valid.";
var L2_CAMPAIGN_FORECASTING_KPIS_VOLUME = "Campaign Forecasting / KPIS volume must be equal or lower than available volume.";
var L2_CAMPAIGN_FORECASTING_KPIS_VALUE = "Campaign Forecasting / KPIS value must be equal or lower than available value.";

var L3_CATEGORY_NOT_EMPTY = "Category cannot be empty.";
var L3_CATEGORY_INCORRECT_NUMBER = "Incorrect number of categories.";
var L3_CATEGORY_NOT_VALID = "Category is not valid.";
var L3_CATEGORY_OPTIONS_INCORRECT_NUMBER = "Incorrect number of options.";
var L3_CATEGORY_OPTION_NOT_VALID = "Option is not valid.";
var L3_CATEGORY_TOTAL_PERCENTAGE = "Budget Distribution should be equal to 100%.";
var L3_CATEGORY_OPTIONS_NOT_EMPTY = "Option percentage should be less than or equal to 100%.";
var L3_BUDGET_ZERO_CATEGORY_TOTAL_PERCENTAGE_ZERO = "When Sub-Team budget is zero then Category total percentage should be equal to 0%.";
var L3_APPROVERS_NOT_FOUND = "Approvers data was not found.";

var HIERARCHY_LEVEL = {
    HL1: 6,
    HL2: 5,
    HL3: 4,
    HL4: 1,
    HL5: 2,
    HL6: 3
};

// Get all Level 3 data by level 2 id
function getAllLevel3(hl2Id, userId) {
    var objHl2 = {};
    objHl2.IN_HL2_ID = hl2Id;

    var isSA = false;
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }
    var result = {};
    result = data.getAllLevel3(objHl2, userId, isSA);
    result.budget_year = budgetYear.getBudgetYearByLevelParent(3, hl2Id, true);

    var list = JSON.parse(JSON.stringify(result.out_result));
    result.out_result = {};
    list.forEach(function (row) {
        result.out_result[row.ACRONYM] = result.out_result[row.ACRONYM] || row;
        result.out_result[row.ACRONYM].BUDGET = row.HL3_BUDGET_TOTAL;
        result.out_result[row.ACRONYM].L3_BUDGET_PERCENTAGE = row.L3_BUDGET_PERCENTAGE;
        result.out_result[row.ACRONYM].HL3_BUDGET_REMAINING = row.HL3_BUDGET_REMAINING;
        result.out_result[row.ACRONYM].HL3_BUDGET_ALLOCATED = row.HL3_BUDGET_ALLOCATED;
        result.out_result[row.ACRONYM].CHILDREN = result.out_result[row.ACRONYM].CHILDREN || [];
        if (row.BUDGET_DISTRIBUTION_AMOUNT) {
            result.out_result[row.ACRONYM].CHILDREN.push({
                CATEGORY_NAME: row.CATEGORY_NAME,
                OPTION_NAME: row.OPTION_NAME,
                BUDGET_DISTRIBUTION_PERCENTAGE: row.BUDGET_DISTRIBUTION_PERCENTAGE,
                BUDGET_DISTRIBUTION_AMOUNT: row.BUDGET_DISTRIBUTION_AMOUNT
            });
        }
    });
    // v Object.values(result.out_result) v //
    result.out_result = Object.keys(result.out_result).map(function (k) {
        return result.out_result[k];
    });

    //MPT Global - add a new view to see the KPIs summary
    /*for (var i = 0; i < result.out_result.length; i++) {
        result.out_result[i].kpi = getExpectedOutcomeByL3Id(result.out_result[i].HL3_ID, hl2Id);
    }*/

    return result;
}

/*function getExpectedOutcomeByL3Id(hl3Id, hl2Id) {
    var listEO = expectedOutcomesLib.getExpectedOutcomesByHl3Id(hl3Id, hl2Id, true);
    var result = {};
    result.out_result = listEO.detail;
    return result;
}*/

function getAllHl3GroupByHl1(budgetYearId, regionId, subRegionId){
    return getHl3ByUserGroupByHl1(null, budgetYearId, regionId, subRegionId);
}

function getHl3ByUserGroupByHl1(userId, budgetYearId, regionId, subRegionId) {
    var isSA = userId ? util.isSuperAdmin(userId) : 1;
    var hl3 = data.getHl3PathByUserId(userId || 0, isSA, budgetYearId || 0, regionId || 0, subRegionId || 0);
    var collection = {};
    hl3.forEach(function (item) {
        if (!collection[item.HL1_ID]) {
            collection[item.HL1_ID] = {
                HL1_ID: item.HL1_ID
                , PATH: item.HL1_PATH
                , HL1_DESCRIPTION: item.HL1_DESCRIPTION
                , CHILDREN: {}
            };
        }
    });
    hl3.forEach(function (item) {
        if (!collection[item.HL1_ID].CHILDREN[item.HL2_ID]) {
            collection[item.HL1_ID].CHILDREN[item.HL2_ID] = {
                HL2_ID: item.HL2_ID
                , PATH: item.HL2_PATH
                , HL2_DESCRIPTION: item.HL2_DESCRIPTION
                , CHILDREN: []
            };
        }
    });
    hl3.forEach(function (item) {
        collection[item.HL1_ID].CHILDREN[item.HL2_ID].CHILDREN.push({
            HL3_ID: item.HL3_ID,
            PATH: item.HL3_PATH,
            HL3_DESCRIPTION: item.HL3_DESCRIPTION
        });
    });
    return collection;
}

function getLevel3CarryOverById(hl3Id, userId) {
    return data.getLevel3CarryOverById(hl3Id, userId);
}

// Get an Level 3 data by id
function getLevel3ById(hl3Id, userId) {
    var hl3 = JSON.parse(JSON.stringify(data.getLevel3ById(hl3Id, userId)));
    var hl3Users = userbl.getUserByHl3Id(hl3Id, hl3.HL2_ID);
    var hl2BudgetAllocated = dataHl2.getHl2AllocatedBudget(hl3.HL2_ID, 0);
    var eventApprover = eventManagementLib.getEventApproverByHlId('HL3',hl3Id, hl3.HL2_ID);
    hl3.TARGET_KPIS = expectedOutcomesLib.getExpectedOutcomesByHl3Id(hl3Id, hl3.HL2_ID);
    hl3.CATEGORIES = getCategoryOption(hl3Id);
    hl3.BUDGET = hl3.HL3_FNC_BUDGET_TOTAL;
    hl3.DESCRIPTION = hl3.HL3_DESCRIPTION;
    hl3.HL2_BUDGET_REMAINING = Number(hl3.HL2_BUDGET) - Number(hl2BudgetAllocated || 0);
    hl3.ASSIGNED_USERS = hl3Users.users_in;
    hl3.BUDGET_APPROVERS = budgetSpendRequestLib.getL3BudgetApproverByL3Id(hl3Id).assigned;
    hl3.BUDGET_APPROVERS_AVAILABLE = budgetSpendRequestLib.getL3BudgetApproverByL3Id(hl3Id).available;
    hl3.EVENT_APPROVERS = eventApprover.assigned;
    hl3.EVENT_APPROVERS_AVAILABLE = eventApprover.available;

    hl3.AVAILABLE_USERS = hl3Users.users_out;
    return hl3;
}

function getLevel3ForSearch(userSessionID, budget_year_id, region_id, subregion_id, offset, limit) {
    var defaultBudgetYear = budgetYear.getDefaultBudgetYear();
    var query = data.getLevel3ForSearch(
        userSessionID,
        util.isSuperAdmin(userSessionID) ? 1 : 0,
        budget_year_id || defaultBudgetYear.BUDGET_YEAR_ID,
        region_id,
        subregion_id,
        offset,
        limit);
    return query;
}

function getLevel3ByAcronym(acronym, hl2Id, userId) {
    return data.getLevel3ByAcronym(acronym, hl2Id, userId);
}

function existsHl3(objHl3, userId) {
    var hl2 = dataHl2.getLevel2ById(objHl3.HL2_ID);
    var hl3 = getLevel3ByAcronym(objHl3.ACRONYM, hl2.HL2_ID, userId);
    if (hl3.HL3_ID && Number(hl3.HL3_ID) !== (Number(objHl3.HL3_ID) || 0))
        return true;
    else
        return false;
}

// determine if hl3 has childs
function hl3HasChilds(objHl3) {
    var result = hl4.getHl4(objHl3.HL3_ID);
    if (result.results.length)
        return true;
    else
        return false;
}

function getGlobalTeams(userId) {
    return data.getGlobalTeams(userId);
}

//delete an hl3 is user is admin and not has childs
function deleteHl3(objHl3, userId) {

    if (!objHl3.HL3_ID)
        throw ErrorLib.getErrors().CustomError("", "hl4Services/handlePost/deleteHl3", L2_MSG_TEAM_NOT_FOUND);

    //verify if exist entity
    var hl3 = data.getLevel3ById(objHl3.HL3_ID, userId);

    if (!hl3)
        throw ErrorLib.getErrors().CustomError("",
            "hl3Services/handlePost/deleteHl3",
            L2_MSG_TEAM_NOT_FOUND);

    //TODO:
    //verify if userId is USPERADMIN, then can delete
    var rol = userRoleLib.getUserRoleByUserId(userId);
    var userRoleId = 0;
    if (rol) {
        userRoleId = Number(rol[0]['ROLE_ID']);
    }

    if (userRoleId !== 1 && userRoleId !== 2)
        throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/deleteHl3", L2_MSG_NO_PRIVILEGE);

    var result = 0;
    if (!hl3HasChilds(objHl3, userId)) {

        dataExOut.deleteHl3ExpectedOutcomesDetail(objHl3.HL3_ID, userId);
        dataExOut.deleteHl3ExpectedOutcomes(objHl3.HL3_ID, userId);
        dataCategoryOptionLevel.deleteCategoryOption(objHl3.HL3_ID, userId, 'HL3');
        eventManagementLib.deleteEventApprover('HL3', objHl3.HL3_ID);
        result = result + data.deleteLevel3(objHl3.HL3_ID, userId);
    }
    else
        throw ErrorLib.getErrors().CustomError("",
            "hl3Services/handlePost/deleteHl3",
            L2_MSG_TEAM_CANT_DELETE);
    return result;
}

// Create a new object of HL3
function insertHl3(objHl3, userId) {
    validateFormHl3(objHl3);
    validateKpi(objHl3);
    validateCategoryOption(objHl3);

    // validate HL2 exist by id
    var hl2 = dataHl2.getLevel2ById(objHl3.HL2_ID);
    if (!hl2 || !hl2.HL2_ID)
        throw ErrorLib.getErrors().CustomError("",
            "hl3Services/handlePost/insertHl3",
            L2_MSG_PLAN_NOT_FOUND);

    objHl3.HL3_ID = 0;

    /**
     * IN_BUDGET will always be 1 until the father's budget is less than the sum of the L2 children's budget
     */
    objHl3.IN_BUDGET = 1;

    var hl3Id = data.insertHl3(
        objHl3.ACRONYM
        , objHl3.HL2_ID
        , objHl3.SHOPPING_CART_APPROVER || null
        , objHl3.COST_CENTER || null
        , objHl3.DESCRIPTION
        , objHl3.BUSINESS_OWNER_ID || 1
        , objHl3.BUDGET
        , objHl3.IN_BUDGET
        , objHl3.IMPORT_ID || null
        , objHl3.IMPORTED || 0
        , userId
    );

    //INSERT USERS RELATED TO HL3
    objHl3.HL3_ID = hl3Id;
    var listObjHl3User = setUsersHl3(objHl3, userId);
    setBudgetApproversHl3(objHl3, listObjHl3User, userId);
    setEventApproversHl3(objHl3, listObjHl3User, userId, true);
    insertExpectedOutcomes(objHl3, userId);
    insertCategoryOption(objHl3, userId);

    return hl3Id;
}

//Insert new HL3 version based on the current HL1.
function insertLevel3Version(currentHL3, userId) {
    //Insert the new version
    if (validateLevel3Version(currentHL3)) {
        return data.insertLevel3Version(
            currentHL3.HL3_ID,
            currentHL3.VERSION,
            currentHL3.ACRONYM,
            currentHL3.HL3_DESCRIPTION,
            currentHL3.HL3_FNC_BUDGET_TOTAL,
            userId,
            currentHL3.BUSINESS_OWNER_ID,
            null, //currentHL3.ORIGIN_PLAN_ID,
            currentHL3.HL2_ID,
            null, //currentHL3.CRM_ID,
            null, //currentHL3.HL3_HIERARCHY_ID,
            currentHL3.HL3_STATUS_DETAIL_ID,
            currentHL3.IN_BUDGET,
            currentHL3.SHOPPING_CART_APPROVER || null,
            currentHL3.COST_CENTER || null
        );
    }
}

// Update an object of HL3
//return an object {"out_result_hl3": {},"out_result_hl3_fnc": null,"out_crm_id": "0","out_budget_flag": 0}
//"out_crm_id": "0". More than zero if some acronym or description or business owner changed
//"out_budget_flag": 0. More than zero if budget change
function updateHl3(objHl3, userId) {
    validateUpdateHl3(objHl3);
    validateKpi(objHl3);
    validateCategoryOption(objHl3);
    var result = {};

    if (existsHl3(objHl3, userId))
        throw ErrorLib.getErrors().CustomError("",
            "",
            L2_MSG_TEAM_EXISTS);

    var hl2 = dataHl2.getLevel2ById(objHl3.HL2_ID);
    //Obtain current HL3
    var currentHL3 = data.getLevel3ById(objHl3.HL3_ID, userId);
    currentHL3 = JSON.parse(JSON.stringify(currentHL3));
    objHl3.VERSION = currentHL3.VERSION;

    //Insert new HL3 version, if the date is into the valid range
    if (budgetYear.getLockFlagByHlIdLevel(currentHL3.HL3_ID, 'HL3') && validateChanges(currentHL3, objHl3)) {
        insertLevel3Version(currentHL3, userId);
        //Update HL3 version
        objHl3.VERSION = currentHL3.VERSION + 1;
    }

    /**
     * IN_BUDGET will always be 1 until the father's budget is less than the sum of the L2 children's budget
     */
    objHl3.IN_BUDGET = 1;

    if (Number(objHl3.BUDGET) !== Number(currentHL3.HL3_FNC_BUDGET_TOTAL)) {
        hl4.checkBudgetStatus(objHl3.HL3_ID);
    }

    result = data.updateLevel3(
        objHl3.HL3_ID,
        objHl3.ACRONYM,
        objHl3.DESCRIPTION,
        objHl3.BUSINESS_OWNER_ID,
        objHl3.BUDGET,
        objHl3.IN_BUDGET,
        objHl3.SHOPPING_CART_APPROVER,
        objHl3.COST_CENTER,
        objHl3.VERSION,
        userId
    );

    var listObjHl3User = setUsersHl3(objHl3, userId);
    setBudgetApproversHl3(objHl3, listObjHl3User, userId);
    setEventApproversHl3(objHl3, listObjHl3User, userId);
    updateExpectedOutcomes(objHl3, userId);
    updateCategoryoption(objHl3, userId);

    return result;
}

function setBudgetApproversHl3(objHl3, listObjHl3User, userId){
    if (validateApprovers(listObjHl3User, objHl3.BUDGET_APPROVERS)) {
        budgetSpendRequestLib.deleteL3BudgetApprover(objHl3.HL3_ID, objHl3.BUDGET_APPROVERS);
        budgetSpendRequestLib.insertL3BudgetApprover(objHl3.HL3_ID, objHl3.BUDGET_APPROVERS, userId)
    } else {
        throw ErrorLib.getErrors().CustomError("", "", "The Approvers do not match the Assigned Users.")
    }

}

function setEventApproversHl3(objHl3, listObjHl3User, userId, isNew){
    if (!validateApprovers(listObjHl3User, objHl3.EVENT_APPROVERS)) {
        throw ErrorLib.getErrors().CustomError("", "", "The Event Approvers do not match the Assigned Users.")
    }

    if(isNew) {
        eventManagementLib.insertEventApprover('HL3', objHl3.HL3_ID, objHl3.EVENT_APPROVERS, userId);
    } else {
        eventManagementLib.updateEventApprover('HL3',objHl3.HL3_ID, objHl3.EVENT_APPROVERS, userId);
    }

    return true;
}

function validateApprovers(listObjHl3User, listObjHl3Approvers) {
    if(!listObjHl3Approvers || !listObjHl3Approvers.length){
        throw ErrorLib.getErrors().CustomError("", "", L3_APPROVERS_NOT_FOUND);
    }
    return arrayContainsArray(listObjHl3User, listObjHl3Approvers);
}

function arrayContainsArray(superset, subset) {
    if (subset) subset.forEach(function (approver) {
        if (!existUser(superset, approver)) return false;
    });
    return true;
}

function existUser(userArray, user) {
    userArray.forEach(function (u) {
        if (u == user.USER_ID) return true;
    });
    return false;
}

function setUsersHl3(objHl3, userId) {
    var users = objHl3.ASSIGNED_USERS || objHl3.USERS;
    var hl3Id = objHl3.HL3_ID || objHl3.IN_HL3_ID;
    validateHl3User(users);
    users = util.parseAssignedUsers(users);
    var listObjHl3User = completeUsers(users);
    var hl3User = [];
    dataHl3User.delAllLevel3User(hl3Id);
    for (var i = 0; i < listObjHl3User.length; i++) {
        hl3User.push({
            in_hl3_id: hl3Id
            , in_user_id: listObjHl3User[i]
            , in_created_user_id: userId
        });
    }

    dataHl3User.insertLevel3User(hl3User);
    return listObjHl3User;
}

// Local method to validate input request
function validateFormHl3(objHl3) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = [
        'ACRONYM'
        , 'HL2_ID'
        , 'DESCRIPTION'
        , 'BUSINESS_OWNER_ID'
        , 'BUDGET'
    ];

    if (!objHl3)
        throw ErrorLib.getErrors().CustomError("",
            "hl3Services/handlePost/insertHl3",
            "The object HL3 is not found");

    if (objHl3.SHOPPING_CART_APPROVER && objHl3.SHOPPING_CART_APPROVER.trim() && !/[id]\d{6}/gi.test(objHl3.SHOPPING_CART_APPROVER)) {
        throw ErrorLib.getErrors().CustomError("Shopping cart approver is invalid", "", "");
    }

    if (objHl3.COST_CENTER && objHl3.COST_CENTER.trim() && !/\d+/gi.test(objHl3.COST_CENTER)) {
        throw ErrorLib.getErrors().CustomError("Cost Center approver is invalid", "", "");
    }

    try {
        keys.forEach(function (key) {
            if (objHl3[key] === null || objHl3[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objHl3[key]);
                if (!isValid) {
                    errors[key] = objHl3[key];// 'INVALID';
                    throw BreakException;
                }
            }
        });
        isValid = true;

        if (existsHl3(objHl3))
            throw ErrorLib.getErrors().CustomError("",
                "",
                L2_MSG_TEAM_EXISTS);
    } catch (e) {
        if (e !== BreakException)
            throw e;
        else
            throw ErrorLib.getErrors().CustomError("",
                "", JSON.stringify(errors));
    }
    return isValid;
}

function validateUpdateHl3(objHl3) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['ACRONYM', 'DESCRIPTION', 'BUSINESS_OWNER_ID',
        'BUDGET'];

    if (!objHl3)
        throw ErrorLib.getErrors().CustomError("",
            "",
            "The object HL3 is not found");

    if (objHl3.SHOPPING_CART_APPROVER && objHl3.SHOPPING_CART_APPROVER.trim() && !/[id]\d{6}/gi.test(objHl3.SHOPPING_CART_APPROVER)) {
        throw ErrorLib.getErrors().CustomError("Shopping cart approver is invalid", "", "");
    }

    if (objHl3.COST_CENTER && objHl3.COST_CENTER.trim() && !/\d+/gi.test(objHl3.COST_CENTER)) {
        throw ErrorLib.getErrors().CustomError("Cost Center approver is invalid", "", "");
    }

    try {
        keys.forEach(function (key) {
            if (objHl3[key] === null || objHl3[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objHl3[key]);
                if (!isValid) {
                    errors[key] = objHl3[key];// 'INVALID';
                    throw BreakException;
                }
            }
        });
        isValid = true;
    } catch (e) {
        if (e !== BreakException)
            throw ErrorLib.getErrors().CustomError("",
                "", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("",
                "", JSON.stringify(errors));
    }
    return isValid;
}

// Local method to check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'ACRONYM':
            valid = value.replace(/\s/g, "").length === 3;
            break;
        case 'HL2_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'DESCRIPTION':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'BUSINESS_OWNER_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'BUDGET':
            valid = Number(value) >= 0;
            break;
    }
    return valid;
}

/*VALIDATE IF EXITS DE PAIR HL3_USER IN DATABASE*/
/*function validateHl3UserPair(objHl3User, objLevel3) {
    return dataHl3User.existsHl3UserPair(objHl3User, objLevel3);
}*/

/*VALIDATE TYPES VALUES OF RELATED OBJECT TO HL3_USER*/
function validateHl3User(listObjHl3User) {
    if (!listObjHl3User || !listObjHl3User.length)
        throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/validateHl3User", "Assigned user list is empty.");

    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = listObjHl3User[0].IN_USER_ID ? ['IN_USER_ID'] : ['USER_ID'];

    if (!listObjHl3User)
        return true;

    try {

        for (var i = 0; i < listObjHl3User.length; i++) {
            keys.forEach(function (key) {
                if (listObjHl3User[i][key] === null || listObjHl3User[i][key] === undefined) {
                    errors[key] = null;
                    throw BreakException;
                } else {
                    // validate attribute type
                    isValid = validateType(key, listObjHl3User[i][key]);
                    if (!isValid) {
                        errors[key] = listObjHl3User[i][key];
                        throw BreakException;
                    }
                }
            });
        }
        isValid = true;
    } catch (e) {
        throw JSON.stringify(listObjHl3User);
        if (e !== BreakException)
            throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/validateHl3User", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/validateHl3User"
                , JSON.stringify(errors));
    }
    return isValid;
}

/*check if can update object because is not same another in db*/
function canUpdateL3(objLevel3) {
    var objHl3ToUpdate = getLevel3ById(objLevel3);
    var objHlOther = getLevel3ByAcronym(objLevel3);
    if (!objHl3Other) return true;
    //check the same object
    if (objHl3ToUpdate.HL3_ID !== objHl3Other.HL3_ID && objHl3ToUpdate.ACRONYM === objHl3Other.ACRONYM)
        return false;
    else
        return true;
}

function checkBudgetStatus(hl2Id, userId, hl3Id, newHl3Budget) {
    if (hl2Id && newHl3Budget) {
        var objHl = {};
        objHl.IN_HL2_ID = hl2Id;
        var hl2 = dataHl2.getLevel2ById(objHl.IN_HL2_ID);
        var hl2AllocatedBudget = dataHl2.getHl2AllocatedBudget(hl2Id, hl3Id);
        return (Number(hl2.HL2_BUDGET_TOTAL) - Number(hl2AllocatedBudget) - Number(newHl3Budget)) >= 0 ? 1 : 0;
    } else {
        var resultHl3 = getAllLevel3(hl2Id, userId);
        if (resultHl3.out_result.length) {
            var hl2 = dataHl2.getLevel2ById(hl2Id);
            var hl2Budget = Number(hl2.HL2_BUDGET_TOTAL);
            var total = 0;
            for (var i = 0; i < resultHl3.out_result.length; i++) {
                if (hl2Budget < total + parseFloat(resultHl3.out_result[i].BUDGET)) {
                    data.updateHl3BudgetStatus(resultHl3.out_result[i].HL3_ID, userId, 0);
                } else {
                    data.updateHl3BudgetStatus(resultHl3.out_result[i].HL3_ID, userId, 1);
                    total = total + parseFloat(resultHl3.out_result[i].BUDGET);
                }
            }
        }
        return true;
    }
}

function checkPermission(userSessionID, method, hl3Id) {
    if (((method && method == "GET_BY_HL3_ID")) && !util.isSuperAdmin(userSessionID)) {
        var l3 = data.getLevel3ById(hl3Id, userSessionID);
        if(!l3)
            throw ErrorLib.getErrors().CustomError("", "level3/getLevel3ById", "HL3 does not existn.");

        var usersL3 = userbl.getUserByHl3Id(hl3Id, l3.HL2_ID).users_in;
        var users = usersL3.find(function (user) {
            return user.USER_ID == userSessionID
        });
        if (!users) {
            throw ErrorLib.getErrors().CustomError("", "level3/handlePermission", "User hasn´t permission for this resource.");
        }
    }
}

function getHistory(HL3_ID) {
    return data.getAllHl3VersionByHl3Id(HL3_ID);
}

//Check data types for version insert
function validateVersionType(key, value) {
    var valid = true;
    switch (key) {
        case 'HL3_ID':
        case 'HL2_ID':
        case 'HL3_STATUS_DETAIL_ID':
        case 'BUSINESS_OWNER_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'VERSION':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ACRONYM':
            valid = value.length > 0 && value.length <= 25;
            break;
        case 'HL3_DESCRIPTION':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'IN_BUDGET':
            valid = !isNaN(value) && (value === 0 || value === 1);
            break;
        /*case 'ORIGIN_PLAN_ID':
        case 'CRM_ID':
        case 'HL3_HIERARCHY_ID':
            valid = !value || (!isNaN(value) && value > 0);
            break;*/
        case 'HL3_FNC_BUDGET_TOTAL':
            valid = valid = Number(value) >= 0;//!value || !isNaN(value);
            break;
    }
    return valid;
}

function validateLevel3Version(data) {
    var isValid = false;
    var errors = {};
    var BreakException = {};

    var keys = [
        'HL3_ID',
        'VERSION',
        'ACRONYM',
        'HL3_DESCRIPTION',
        'HL3_STATUS_DETAIL_ID',
        'BUSINESS_OWNER_ID',
        'HL2_ID',
        'IN_BUDGET'
    ];

    /*var optionalKeys = [
        'ORIGIN_PLAN_ID',
        'CRM_ID',
        'HL3_HIERARCHY_ID',
        'HL3_FNC_BUDGET_TOTAL'
    ];*/

    try {

        keys.forEach(function (key) {
            if (data[key] === null || data[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateVersionType(key, data[key]);
                if (!isValid) {
                    errors[key] = data[key];
                    throw BreakException;
                }
            }
        });

        /*optionalKeys.forEach(function (key) {
            // validate attribute type
            isValid = validateVersionType(key, data[key]);
            if (!isValid) {
                errors[key] = data[key];
                throw BreakException;
            }

        });*/

        isValid = true;

    } catch (e) {
        if (e !== BreakException)
            throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePut/validateLevel3Version", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePut/validateLevel3Version"
                , JSON.stringify(errors));
    }
    return isValid;
}

function validateChanges(originalHL3, newHL3) {
    var validation = false;

    Object.keys(newHL3).forEach(function (key) {
        switch (key) {
            case 'ACRONYM':
                if (originalHL3.ACRONYM !== newHL3.ACRONYM) {
                    validation = true;
                }
                break;
            case 'DESCRIPTION':
                if (originalHL3.HL3_DESCRIPTION !== newHL3.DESCRIPTION) {
                    validation = true;
                }
                break;
            case 'BUSINESS_OWNER_ID':
                if (Number(originalHL3.BUSINESS_OWNER_ID) !== Number(newHL3.BUSINESS_OWNER_ID)) {
                    validation = true;
                }
                break;
            case 'BUDGET':
                if (Number(originalHL3.HL3_FNC_BUDGET_TOTAL) !== Number(newHL3.BUDGET)) {
                    validation = true;
                }
                break;
            case 'SHOPPING_CART_APPROVER':
                if (Number(originalHL3.SHOPPING_CART_APPROVER) !== Number(newHL3.SHOPPING_CART_APPROVER)) {
                    validation = true;
                }
                break;
            case 'COST_CENTER':
                if (Number(originalHL3.COST_CENTER) !== Number(newHL3.COST_CENTER)) {
                    validation = true;
                }
                break;

        }
    });

    return validation;
}

function getHistoryDetail(HL_ID, VERSION) {
    return data.getLevel3VersionById(HL_ID, VERSION);
}

function getHistoryAllFirstVersion(hl_id, userSessionID) {
    return data.getLevel3VersionForFilter(hl_id, userSessionID, userbl.isSuperAdmin(userSessionID));
}

function insertExpectedOutcomes(data, userId) {
    var hl3ExpectedOutcomesId = dataExOut.insertHl3ExpectedOutcomes(data.HL3_ID, data.TARGET_KPIS.COMMENTS || '', userId);
    var mapEOL = expectedOutcomesLevelLib.getKpiTypeOptionMapByHlId(HIERARCHY_LEVEL.HL3);
    if (data.TARGET_KPIS.KPIS.length) {
        var hl3ExpectedOutcomesDetail = [];
        data.TARGET_KPIS.KPIS.forEach(function (expectedOutcomeDetail) {
            var expectedOutcomeLevelId = mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID]
                && mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID][expectedOutcomeDetail.OUTCOMES_ID]
                ? mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID][expectedOutcomeDetail.OUTCOMES_ID]
                : expectedOutcomeDetail.EXPECTED_OUTCOME_LEVEL_ID;
            hl3ExpectedOutcomesDetail.push({
                in_hl3_expected_outcomes_id: hl3ExpectedOutcomesId,
                in_expected_outcome_level_id: expectedOutcomeLevelId,
                in_euro_value: expectedOutcomeDetail.EURO_VALUE,
                in_volume_value: Number(expectedOutcomeDetail.VOLUME_VALUE),
                in_created_user_id: userId
            });
        });
        dataExOut.insertHl3ExpectedOutcomesDetail(hl3ExpectedOutcomesDetail);
    }
}

function updateExpectedOutcomes(data, userId) {
    dataExOut.deleteHl3ExpectedOutcomesDetail(data.HL3_ID || data.IN_HL3_ID, userId);
    dataExOut.deleteHl3ExpectedOutcomes(data.HL3_ID || data.IN_HL3_ID, userId);

    insertExpectedOutcomes(data, userId);
}

// Create a new object of HL3
function insertHl3FromUpload(objHl3, userId) {
    var result = 0;
    // validate HL2 exist by id
    var hl2_ID = dataHl2.getLevel2ById(objHl3.PARENT_ID);
    if (!hl2_ID)
        throw ErrorLib.getErrors().ImportError("", "", L2_MSG_PLAN_NOT_FOUND);
    objHl3.IN_HL3_ID = 0;
    objHl3.IN_ACRONYM = objHl3.ACRONYM;
    objHl3.imported = 1;
    if (dataUpload.getParentIdByPath(objHl3.PATH) && dataUpload.getParentIdByPath(objHl3.PATH).HL_ID)
        throw ErrorLib.getErrors().ImportError("", "", L2_MSG_TEAM_EXISTS);
    // validate exist CRM
    var objPath = blPath.getPathByLevelParentToCRM(LEVEL3, objHl3.PARENT_ID);
    var path = objPath.PATH_TPH + "-" + objHl3.IN_ACRONYM;

    // SET CRM ID
    objHl3.IN_IN_BUDGET = checkBudgetStatus(objHl3.PARENT_ID, userId, 0, objHl3.HL3_FNC_BUDGET_TOTAL);
    // CREATE NEW HL3
    result = data.insertHl3FromUpload(objHl3, userId);

    //INSERT USERS RELATED TO HL3
    objHl3.IN_HL3_ID = result;
    setUsersHl3(objHl3, userId);
    //insertExpectedOutcomes(objHl3, userId);

    return result;
}

/*function getExpectedOutcomesByHl3Id(hl3Id, hl2Id) {
    return expectedOutcomesLib.getExpectedOutcomesByHl3Id(hl3Id, hl2Id);
}*/

function validateKpi(data) {
    if (data.TARGET_KPIS) {
        var totalAvailable = expectedOutcomesLib.getExpectedOutcomeTotalAvailableByHlIdLevelId(data.HL2_ID, 'HL3', data.HL3_ID);

        if ((!data.TARGET_KPIS.KPIS || !data.TARGET_KPIS.KPIS.length) && !data.TARGET_KPIS.COMMENTS)
            throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/insertHl3", L2_CAMPAIGN_FORECASTING_KPIS_COMMENT);

        data.TARGET_KPIS.KPIS.forEach(function (kpiDetail) {
            if (!kpiDetail.OUTCOMES_ID || !Number(kpiDetail.OUTCOMES_ID))
                throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/insertHl3", L2_CAMPAIGN_FORECASTING_KPIS_NOT_VALID);
            if (!kpiDetail.OUTCOMES_TYPE_ID || !Number(kpiDetail.OUTCOMES_TYPE_ID))
                throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/insertHl3", L2_CAMPAIGN_FORECASTING_KPIS_NOT_VALID);

            if (Number(kpiDetail.VOLUME_VALUE) != 0 && !Number(kpiDetail.VOLUME_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/insertHl3", L2_CAMPAIGN_FORECASTING_KPIS_DETAILS);
            if (!kpiDetail.EURO_VALUE || !Number(kpiDetail.EURO_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/insertHl3", L2_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO);

            if (totalAvailable && totalAvailable[kpiDetail.OUTCOMES_TYPE_ID] && totalAvailable[kpiDetail.OUTCOMES_TYPE_ID][kpiDetail.OUTCOMES_ID]) {
                if (Number(kpiDetail.VOLUME_VALUE) > totalAvailable[kpiDetail.OUTCOMES_TYPE_ID][kpiDetail.OUTCOMES_ID].VOLUME_AVAILABLE_TO_ALLOCATE)
                    throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/insertHl3", L2_CAMPAIGN_FORECASTING_KPIS_VOLUME);

                if (Number(kpiDetail.EURO_VALUE) > totalAvailable[kpiDetail.OUTCOMES_TYPE_ID][kpiDetail.OUTCOMES_ID].VALUE_AVAILABLE_TO_ALLOCATE)
                    throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/insertHl3", L2_CAMPAIGN_FORECASTING_KPIS_VALUE);
            }
        });
    } else {
        throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/insertHl3", L2_CAMPAIGN_FORECASTING_KPIS_COMMENT);
    }
    return true;

}

function getLevel3Kpi(hl2Id, userId) {
    var isSA = false;
    var result = {};
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }

    var listFromData = data.getHl3KpiSummary(hl2Id, userId, isSA);

    var mapKpi = {};

    listFromData.forEach(function (hl) {
        mapKpi[hl.L3_ACRONYM] = mapKpi[hl.L3_ACRONYM] || {
            HL2_ID: hl.HL2_ID,
            CRM_ID: hl.CRM_ID,
            HL3_ID: hl.HL3_ID,
            ACRONYM: hl.L3_ACRONYM,
            IS_LOCKED: hl.IS_LOCKED,
            HL3_DESCRIPTION: hl.HL3_DESCRIPTION
        };
        var auxKpi = mapKpi[hl.L3_ACRONYM].kpi || [];
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
        mapKpi[hl.L3_ACRONYM].kpi = auxKpi;
    });
    var result = {};
    result.out_result = Object.keys(mapKpi).map(function (e) {
        return mapKpi[e]
    });
    return result;
}

function extractElementByList(list, criterion, value) {
    for (var i = 0; i < list.length; i++) {
        if (list[i][criterion] == value)
            return list[i];
    }
    return null;
}

function getCategoryOption(hl3_id) {
    return allocationCategoryOptionLevelLib.getHlCategoryOptionByLevelHlId('HL3', hl3_id);
}

function insertCategoryOption(data, userId) {
    var categoryOptionBulk = [];
    var mapCOL = util.getMapCategoryOption('hl3');

    data.CATEGORIES.forEach(function (hl3Category) {
        hl3Category.OPTIONS.forEach(function (hl3CategoryOption) {
            categoryOptionBulk.push({
                in_hl3_id: data.HL3_ID
                , in_category_option_level_id: mapCOL[hl3Category.CATEGORY_ID][hl3CategoryOption.OPTION_ID]
                , in_amount: hl3CategoryOption.AMOUNT || 0
                , in_user_id: userId
                , in_updated: 0
            });
        });
    });
    dataCategoryOptionLevel.insertCategoryOption(categoryOptionBulk, 'hl3');

    return true;
}

function validateCategoryOption(data) {
    if (!data.CATEGORIES || !data.CATEGORIES.length)
        throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/validateCategoryOption", L3_CATEGORY_NOT_EMPTY);

    if (!data.HL3_ID && data.CATEGORIES.length !== dataCategory.getAllocationCategoryCountByHlId("hl3"))
        throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/validateCategoryOption", L3_CATEGORY_INCORRECT_NUMBER);
    var percentagePerOption = 0;
    var thereIsMandatoryCategory = false;
    for (var i = 0; i < data.CATEGORIES.length; i++) {
        var percentagePerCategory = 0;
        var hl2Category = data.CATEGORIES[i];
        thereIsMandatoryCategory = thereIsMandatoryCategory || !!hl2Category.MAKE_CATEGORY_MANDATORY;
        if (!hl2Category.CATEGORY_ID || !Number(hl2Category.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/validateCategoryOption", L3_CATEGORY_NOT_VALID);

        if (!hl2Category.OPTIONS || !hl2Category.OPTIONS.length)
            throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/validateCategoryOption", L3_CATEGORY_OPTIONS_NOT_EMPTY);

        hl2Category.OPTIONS.forEach(function (option) {
            if (!option.OPTION_ID || !Number(option.OPTION_ID))
                throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/validateCategoryOption", L3_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.AMOUNT) && !Number(option.AMOUNT)) || Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0)
                throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/validateCategoryOption", "Option value is not valid (actual value " + option.AMOUNT + ")");

            percentagePerOption = percentagePerOption + Number(option.AMOUNT || 0);
            percentagePerCategory += Number(option.AMOUNT || 0);
        });
        if((Number(data.BUDGET) > 0) && hl2Category.MAKE_CATEGORY_MANDATORY && percentagePerCategory <= 0){
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L3_BUDGET_ZERO_CATEGORY_TOTAL_PERCENTAGE_ZERO);
        }
    }
    if(thereIsMandatoryCategory) {
        if ((Number(data.BUDGET) == 0) && percentagePerOption != 0) {
            throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/validateCategoryOption", L3_BUDGET_ZERO_CATEGORY_TOTAL_PERCENTAGE_ZERO);
        }

        if ((Number(data.BUDGET) > 0) && percentagePerOption != 100) {
            throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/validateCategoryOption", L3_CATEGORY_TOTAL_PERCENTAGE);
        }
    }

    return true;
}

function updateCategoryoption(data, userId) {
    var insertBulk = [];
    var updateBulk = [];
    var mapCOL = util.getMapCategoryOption('hl3');
    data.CATEGORIES.forEach(function (hl3Category) {
        hl3Category.OPTIONS.forEach(function (option) {
            var categoryOption = {
                in_category_option_level_id: mapCOL[hl3Category.CATEGORY_ID][option.OPTION_ID]
                , in_amount: option.AMOUNT || 0
                , in_user_id: userId
                , in_updated: 0
                , in_hl3_id: data.HL3_ID
            };
            if (!option.CATEGORY_OPTION_ID) {
                categoryOption.in_hl3_id = data.HL3_ID;
                insertBulk.push(categoryOption);
            } else {
                updateBulk.push(categoryOption);
            }
        });
    });

    if (updateBulk && updateBulk.length)
        dataCategoryOptionLevel.updateCategoryOption(updateBulk, 'hl3');

    if (insertBulk && insertBulk.length)
        dataCategoryOptionLevel.insertCategoryOption(insertBulk, 'hl3');

    return true;
}

function checkOverBudget(hl2Id, hl2Budget, hl3Budget, hl3Id) {
    var hl2BudgetAllocated = dataHl2.getHl2AllocatedBudget(hl2Id, hl3Id || 0);

    if (!!Number(hl3Budget) && (Number(hl3Budget) > (Number(hl2Budget) - Number(hl2BudgetAllocated)).toFixed(2)))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/checkOverBudget", L2_MSG_OVER_BUDGET);

    return true;
}

function completeUsers(users) {
    var id = config.getRoleEnum().SuperAdmin;

    var saUsers = userbl.getUserByRoleId(id);

    for (var i = 0; i < saUsers.length; i++) {
        if (!contains(users, saUsers[i].USER_ID)) {
            users.push(saUsers[i].USER_ID);
        }
    }

    return users;
}

function contains(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

function getCarryOverHl2CategoryOption(hl2_id) {
    var hl2_category = JSON.parse(JSON.stringify(blLevel2.getCategoryOption(hl2_id)));
    var hl3_category = JSON.parse(JSON.stringify(allocationCategory.getCategoryOptionByHierarchyLevelId(HIERARCHY_LEVEL.HL3)));

    return hl3_category.map(function (category) {
        var hl2Cat = extractElementByList(hl2_category, "CATEGORY_ID", category.CATEGORY_ID);
        if (hl2Cat) {
            category.OPTIONS.map(function (option) {
                var hl2option = extractElementByList(hl2Cat.OPTIONS, "OPTION_ID", option.OPTION_ID);
                option.AMOUNT = hl2option ? hl2option.AMOUNT : 0;
                return option;
            });
        }
        return category;
    });
}

function deleteLevel3User(arrDelHl3User) {
    eventManagementLib.deleteEventApproverByHlIdUserId('HL3',arrDelHl3User);
    return dataHl3User.deleteLevel3User(arrDelHl3User);
}