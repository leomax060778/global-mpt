$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataHl1 = mapper.getDataLevel1();
var dataHl2 = mapper.getDataLevel2();
var dataHl2User = mapper.getDataLevel2User();
var hl3 = mapper.getLevel3();
var dataHl3 = mapper.getDataLevel3();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var db = mapper.getdbHelper();
var blPath = mapper.getPath();
var userbl = mapper.getUser();
var userRoleLib = mapper.getUserRole();
var config = mapper.getDataConfig();
var contactDataLib = mapper.getContactData();
var businessError = mapper.getLogError();
var dataHl3User = mapper.getDataLevel3User();
var budgetYear = mapper.getBudgetYear();
var budgetApprovers = mapper.getBudgetSpendRequest();
var dataExOut = mapper.getDataExpectedOutcome();
var expectedOutcomesLib = mapper.getExpectedOutcomes();
var dataCategoryOptionLevel = mapper.getDataCategoryOptionLevel();
var dataCategory = mapper.getDataCategory();
var allocationCategoryOptionLevelLib = mapper.getAllocationCategoryOptionLevelLib();
var allocationCategory = mapper.getAllocationCategoryLib();
var expectedOutcomesLevelLib = mapper.getExpectedOutcomesLevelLib();
var blLevel1 = mapper.getLevel1();
var dataSubRegion = mapper.getDataSubRegion();
var hierarchyCategoryCountryLib = mapper.getHierarchyCategoryCountry();
var eventManagementLib = mapper.getEventManagementLib();
/** ***********END INCLUDE LIBRARIES*************** */


var LEVEL3 = 3;
var TEAM_TYPE_CENTRAL = "2";

var HIERARCHY_LEVEL = {
    HL1: 6,
    HL2: 5,
    HL3: 4,
    HL4: 1,
    HL5: 2,
    HL6: 3
};

// var L1_MSG_CENTRAL_TEAM_EXISTS = "Another Central Team with the same acronym already exists.";
var L1_MSG_PLAN_EXISTS = "Another Plan with the same acronym already exists";
var L1_MSG_LEVEL_1_EXISTS = "Another Team with the same organization acronym already exists";
var L2_MSG_LEVEL_2_SUB_REGION = "The Market Unit is mandatory for this Plan.";
var L1_MSG_PLAN_NO_CREATED = "The Plan could not be created.";
var L1_MSG_NO_PRIVILEGE = "Not enough privilege to do this action.";
var L1_MSG_PLAN_NOT_FOUND = "The Plan can not be found.";
var L1_MSG_PLAN_CANT_DELETE = "The selected Plan can not be deleted because has childs.";
var L1_MSG_USER_NOT_FOUND = "The User can not be found.";
var L1_MSG_OVER_BUDGET = "Team budget should be less than or equal to parent remaining budget.";

var L1_CAMPAIGN_FORECASTING_KPIS_COMMENT = "Please enter a comment to explain expected outcomes as you didn't select any Campaign type.";
var L1_CAMPAIGN_FORECASTING_KPIS_DETAILS = "Campaign Forecasting / KPIS details amount value is not valid.";
var L1_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO = "Campaign Forecasting / KPIS details euro value is not valid.";
var L1_CAMPAIGN_FORECASTING_KPIS_TYPE_NOT_VALID = "Campaign Forecasting / KPIS Type is not valid.";
var L1_CAMPAIGN_FORECASTING_KPIS_NAME_NOT_VALID = "Campaign Forecasting / KPIS Name is not valid.";
var L1_CAMPAIGN_FORECASTING_KPIS_VOLUME = "Campaign Forecasting / KPIS volume must be equal or lower than available volume.";
var L1_CAMPAIGN_FORECASTING_KPIS_VALUE = "Campaign Forecasting / KPIS value must be equal or lower than available value.";

var L1_CATEGORY_NOT_EMPTY = "Category cannot be empty.";
var L1_CATEGORY_INCORRECT_NUMBER = "Incorrect number of categories.";
var L1_CATEGORY_NOT_VALID = "Category is not valid.";
// var L1_CATEGORY_OPTIONS_INCORRECT_NUMBER = "Incorrect number of options.";
var L1_CATEGORY_OPTION_NOT_VALID = "Option is not valid.";
var L1_CATEGORY_TOTAL_PERCENTAGE = "Budget Distribution should be equal to 100%.";
var L1_BUDGET_ZERO_CATEGORY_TOTAL_PERCENTAGE_ZERO = "When Team budget is zero then Category total percentage should be equal to 0%.";
var L1_CATEGORY_OPTIONS_NOT_EMPTY = "Option percentage should be less than or equal to 100%.";
var L1_APPROVERS_NOT_FOUND = "Approvers data was not found.";

function getHl2ByHl1Id(hl1Id, userId) {
    var isSA = false;
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }
    var result = {};
    result = dataHl2.getHl2ByHl1Id(hl1Id, userId, isSA);
    result.budget_year = budgetYear.getBudgetYearByLevelParent(2, hl1Id, true);

    var list = JSON.parse(JSON.stringify(result.out_result));
    result.out_result = {};
    list.forEach(function (row) {
        result.out_result[row.ORGANIZATION_ACRONYM] = result.out_result[row.ORGANIZATION_ACRONYM] || row;
        result.out_result[row.ORGANIZATION_ACRONYM].BUDGET = row.HL2_BUDGET_TOTAL;
        result.out_result[row.ORGANIZATION_ACRONYM].SUBREGION_NAME = row.SUBREGION_NAME;
        result.out_result[row.ORGANIZATION_ACRONYM].L2_BUDGET_PERCENTAGE = row.L2_BUDGET_PERCENTAGE;
        result.out_result[row.ORGANIZATION_ACRONYM].HL2_BUDGET_REMAINING = row.HL2_BUDGET_REMAINING;
        result.out_result[row.ORGANIZATION_ACRONYM].HL2_BUDGET_ALLOCATED = row.HL2_BUDGET_ALLOCATED;
        result.out_result[row.ORGANIZATION_ACRONYM].CHILDREN = result.out_result[row.ORGANIZATION_ACRONYM].CHILDREN || [];
        if (row.BUDGET_DISTRIBUTION_AMOUNT) {
            result.out_result[row.ORGANIZATION_ACRONYM].CHILDREN.push({
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

    //MPT Global - add a new view to see the KPIs summary
    /*for (var i = 0; i < result.out_result.length; i++) {
        result.out_result[i].kpi = getExpectedOutcomeByL2Id(result.out_result[i].HL2_ID, hl1Id);
    }*/
    return result;
}

function getExpectedOutcomeByL2Id(hl2Id, hl1Id) {
    var listEO = expectedOutcomesLib.getExpectedOutcomesByHl2Id(hl2Id, hl1Id, true);
    return listEO.detail;
}

function getHl2AllowAutomaticBudgetApprovalByHl4Id(l4Id) {
    return dataHl2.getHl2AllowAutomaticBudgetApprovalByHl4Id(l4Id);
}

function getHl2AllowAutomaticBudgetApprovalByHl5Id(l5Id) {
    return dataHl2.getHl2AllowAutomaticBudgetApprovalByHl5Id(l5Id);
}

/*INSERT A NEW HL2 WITH CREO O MORE USERS ASICIATIONS*/
function insertHl2(objLevel2, userId) {
    validateInsertHl2(objLevel2);
    validateKpi(objLevel2);
    validateCategoryOption(objLevel2);
    validateHl2User(objLevel2.ASSIGNED_USERS);
    objLevel2.ASSIGNED_USERS = util.parseAssignedUsers(objLevel2.ASSIGNED_USERS);
    objLevel2.USER_ID = userId;

    var hl1 = dataHl1.getLevel1ById(objLevel2.HL1_ID);

    if (dataHl2.getLevelByAcronymAndOrganizationAcronym(hl1.ACRONYM, hl1.BUDGET_YEAR_ID, objLevel2.ACRONYM)) {
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_LEVEL_1_EXISTS);
    }

    /**
     * IN_BUDGET will always be 1 until the father's budget is less than the sum of the L2 children's budget
     */

    objLevel2.IN_BUDGET = 1;
    var hl2Id = dataHl2.insertLevel2(
        objLevel2.BUDGET
        , objLevel2.ACRONYM
        , objLevel2.ORGANIZATION_NAME
        , objLevel2.IMPLEMENT_EXECUTION_LEVEL
        , objLevel2.CRT_RELATED
        , objLevel2.HL1_ID
        , objLevel2.IN_BUDGET
        , objLevel2.ALLOW_AUTOMATIC_BUDGET_APPROVAL
        , objLevel2.USER_ID
        , objLevel2.SUBREGION_ID || null
        , objLevel2.IMPORT_ID
        , objLevel2.IMPORTED
    );

    if (hl2Id) {
        if (hl1.TEAM_TYPE_ID == TEAM_TYPE_CENTRAL && objLevel2.CONTACT_DATA && objLevel2.CONTACT_DATA.length) {
            var contactData = objLevel2.CONTACT_DATA.map(function (contact) {
                contact.CONTACTTYPE = 'CENTRAL';
                return contact;
            });

            contactDataLib.insertContactData(contactData, userId, hl2Id);
        }

        //INSERT USERS RELATED TO HL2
        objLevel2.HL2_ID = hl2Id;
        // var listObjHl2User = objLevel2.ASSIGNED_USERS;
        var listObjHl2Approvers = objLevel2.BUDGET_APPROVERS;

        /******************/
        var listObjHl2User = completeUsers(objLevel2.ASSIGNED_USERS); //add SA users
        /******************/
        var arrHl2User = [];

        for (var i = 0; i < listObjHl2User.length; i++) {
            arrHl2User.push({
                in_hl2_id: objLevel2.HL2_ID
                , in_user_id: listObjHl2User[i]
                , in_created_user_id: userId
            });
        }

        dataHl2User.insertLevel2User(arrHl2User);

        //validate Approvers
        if (validateApprovers(listObjHl2User, listObjHl2Approvers)) {
            budgetApprovers.insertL2BudgetApprover(objLevel2.HL2_ID, listObjHl2Approvers, userId)
        } else {
            throw ErrorLib.getErrors().CustomError("", "", "The Budget Approvers do not match the Assigned Users.")
        }

        if (!validateApprovers(listObjHl2User, objLevel2.EVENT_APPROVERS)) {
            throw ErrorLib.getErrors().CustomError("", "", "The Event Approvers do not match the Assigned Users.")
        }

        objLevel2.EVENT_APPROVERS = completeEventApprover(objLevel2.EVENT_APPROVERS);
        eventManagementLib.insertEventApprover('HL2',objLevel2.HL2_ID, objLevel2.EVENT_APPROVERS, userId);

        insertExpectedOutcomes(objLevel2, userId);
        insertCategoryOption(objLevel2, userId);

        return objLevel2.HL2_ID;
    }
    else
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NO_CREATED);
}

function validateApprovers(listObjHl2User, listObjHl2Approvers) {
    if(!listObjHl2Approvers || !listObjHl2Approvers.length){
        throw ErrorLib.getErrors().CustomError("", "", L1_APPROVERS_NOT_FOUND);
    }
    return arrayContainsArray(listObjHl2User, listObjHl2Approvers);
}

function arrayContainsArray(superset, subset) {
    if (subset){
    	subset.forEach(function (approver) {
    		if (!existUser(superset, approver)) {
    			return false;
    		}
    	});
    }
    return true;
}

function existUser(userArray, user) {
    userArray.forEach(function (u) {
        if (u == user.USER_ID){
        	return true;
        }
    });
    return false;
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

function completeEventApprover(eventApprover) {
    var id = config.getRoleEnum().SuperAdmin;
    var saUsers = userbl.getUserByRoleId(id);

    for (var i = 0; i < saUsers.length; i++) {
        if (!containsEventApprover(eventApprover, saUsers[i].USER_ID)) {
            eventApprover.push({USER_ID: saUsers[i].USER_ID});
        }
    }

    return eventApprover;
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

function containsEventApprover(a, obj) {
    var i = a.length;
    while (i--) {
        if (a[i].USER_ID === obj) {
            return true;
        }
    }
    return false;
}

//Insert new HL2 version based on the current HL1.
function insertLevel2Version(currentHL2, userId) {
    //Insert the new version
    if (validateLevel2Version(currentHL2)) {
        return dataHl2.insertLevel2Version(
            currentHL2.HL2_ID,
            currentHL2.VERSION,
            currentHL2.ACRONYM,
            null,
            currentHL2.HL2_BUDGET_TOTAL,
            currentHL2.BUDGET_YEAR_ID,
            currentHL2.CRT_RELATED,
            currentHL2.IMPLEMENT_EXECUTION_LEVEL,
            currentHL2.TEAM_TYPE_ID,
            null,
            currentHL2.SUBREGION_ID,
            userId,
            currentHL2.ORGANIZATION_ACRONYM,
            currentHL2.ORGANIZATION_NAME,
            currentHL2.IN_BUDGET,
            currentHL2.ALLOW_AUTOMATIC_BUDGET_APPROVAL,
            currentHL2.HL1_ID
        );
    }

}

function updateHl2(objLevel2, userId) {
    validateUpdateHl2(objLevel2);
    validateKpi(objLevel2);
    validateCategoryOption(objLevel2);
    validateHl2User(objLevel2.ASSIGNED_USERS);
    objLevel2.ASSIGNED_USERS = util.parseAssignedUsers(objLevel2.ASSIGNED_USERS);
    objLevel2.USER_ID = userId;

    /**
     * IN_BUDGET will always be 1 until the father's budget is less than the sum of the L2 children's budget
     */
    objLevel2.IN_BUDGET = 1;

    var updated = 0;

    var currentHL2 = JSON.parse(JSON.stringify(dataHl2.getLevel2ById(objLevel2.HL2_ID)));

    //Insert new HL2 version, if the date is into the valid range
    if (budgetYear.getLockFlagByHlIdLevel(currentHL2.HL2_ID, 'HL2') && validateChanges(currentHL2, objLevel2)) {
        currentHL2.ACRONYM = currentHL2.ORGANIZATION_ACRONYM;
        insertLevel2Version(currentHL2, userId);
        currentHL2.VERSION += 1;
    }

    if (currentHL2.HL2_BUDGET_TOTAL != objLevel2.BUDGET) {
        hl3.checkBudgetStatus(objLevel2.HL2_ID, userId);
    }

    dataHl2.updateLevel2(
        objLevel2.HL2_ID
        , objLevel2.BUDGET
        , objLevel2.ACRONYM
        , objLevel2.ORGANIZATION_NAME
        , objLevel2.IMPLEMENT_EXECUTION_LEVEL
        , objLevel2.CRT_RELATED
        , objLevel2.IN_BUDGET
        , objLevel2.ALLOW_AUTOMATIC_BUDGET_APPROVAL
        , currentHL2.VERSION
        , objLevel2.SUBREGION_ID || null
        , userId
    );

    contactDataLib.deleteContactDataByContactTypeId("hard", "CENTRAL", objLevel2.HL2_ID);
    if (objLevel2.TEAM_TYPE_ID == TEAM_TYPE_CENTRAL && objLevel2.CONTACT_DATA && objLevel2.CONTACT_DATA.length) {
        var contactData = objLevel2.CONTACT_DATA.map(function (contact) {
            contact.CONTACTTYPE = 'CENTRAL';
            return contact;
        });
        contactDataLib.insertContactData(contactData, userId, objLevel2.HL2_ID);
    }

    var hl3List = dataHl3.getAllLevel3(objLevel2.HL2_ID, userId).out_result;
    var hl2Users = dataHl2User.getAllHl2User(objLevel2.HL2_ID);
    var arrHl2User = [];
    var arrHl3User = [];
    var arrDelHl3User = [];
    dataHl2User.delAllLevel2User(objLevel2);
    for (var i = 0; i < objLevel2.ASSIGNED_USERS.length; i++) {
        arrHl2User.push({
            in_hl2_id: objLevel2.HL2_ID
            , in_user_id: objLevel2.ASSIGNED_USERS[i]
            , in_created_user_id: userId
        });

        if (notExistHl2UserInList(hl2Users, objLevel2.ASSIGNED_USERS[i])) {
            arrHl3User = hl3List.map(function (hl3) {
                return {
                    in_hl3_id: hl3.HL3_ID
                    , in_user_id: objLevel2.ASSIGNED_USERS[i]
                    , in_created_user_id: userId
                };
            });
        }
    }

    if (arrHl2User.length > 0) {
        dataHl2User.insertLevel2User(arrHl2User);
    }
    if (arrHl3User.length > 0) {
        dataHl3User.insertLevel3User(arrHl3User);
    }

    for (var j = 0; j < hl2Users.length; j++) {
        if (notExistHl2UserInList(objLevel2.ASSIGNED_USERS, hl2Users[j].USER_ID)) {
            arrDelHl3User = hl3List.map(function (hl3) {
                return {
                    in_hl3_id: hl3.HL3_ID
                    , in_user_id: hl2Users[j].USER_ID
                };
            });
        }
    }
   
    if (arrDelHl3User.length > 0) {
        hl3.deleteLevel3User(arrDelHl3User);
    }

    //validate Approvers
    if (validateApprovers(objLevel2.ASSIGNED_USERS, objLevel2.BUDGET_APPROVERS)) {
        budgetApprovers.deleteL2BudgetApprover(objLevel2.HL2_ID, objLevel2.BUDGET_APPROVERS);
        budgetApprovers.insertL2BudgetApprover(objLevel2.HL2_ID, objLevel2.BUDGET_APPROVERS, userId)
    } else {
        throw ErrorLib.getErrors().CustomError("", "", "The Approvers do not match the Assigned Users.")
    }
    
    if (!validateApprovers(objLevel2.ASSIGNED_USERS, objLevel2.EVENT_APPROVERS)) {
        throw ErrorLib.getErrors().CustomError("", "", "The Event Approvers do not match the Assigned Users.")
    }

    eventManagementLib.updateEventApprover('HL2',objLevel2.HL2_ID, objLevel2.EVENT_APPROVERS, userId);

    updateExpectedOutcomes(objLevel2, userId);
    updateCategoryoption(objLevel2, userId);

    return updated;
}

function notExistHl2UserInList(baseUsersIdsList, assignedUserId) {
    var notExist = true;
    for (var i = 0; i < baseUsersIdsList.length; i++) {
        var id = baseUsersIdsList[i].USER_ID || baseUsersIdsList[i];
        if (id == assignedUserId) {
            notExist = !notExist;
            break;
        }
    }

    return notExist;
}

function deleteHl2(objLevel2, userId) {
    //verify if userId is SUPERADMIN, then can delete
    var rol = userRoleLib.getUserRoleByUserId(userId);
    var userRoleId = 0;
    if (rol) {
        userRoleId = Number(rol[0]['ROLE_ID']);
    }
    if (userRoleId !== 1 && userRoleId !== 2)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_NO_PRIVILEGE);

    if (!objLevel2.HL2_ID)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_NOT_FOUND);
    if (!util.validateIsNumber(objLevel2.HL2_ID))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_NOT_FOUND);
    if (hasChild(objLevel2.HL2_ID))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_CANT_DELETE);

    contactDataLib.deleteContactDataByContactTypeId("soft", "CENTRAL", objLevel2.HL2_ID, userId);
    dataExOut.deleteHl2ExpectedOutcomesDetail(objLevel2.HL2_ID, userId);
    dataExOut.deleteHl2ExpectedOutcomes(objLevel2.HL2_ID, userId);
    dataCategoryOptionLevel.deleteCategoryOption(objLevel2.HL2_ID, userId, 'HL2');
    hierarchyCategoryCountryLib.deleteCountryCategoryOptionLevel(objLevel2.HL2_ID, userId);
    eventManagementLib.deleteEventApprover('HL2', objLevel2.HL2_ID);
    return dataHl2.deleteHl2(objLevel2.HL2_ID, userId);
}

function getLevel2ByUser(userId) {
    if (!userId)
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "level2Services/handleGet/getLevel2ByUser", L1_MSG_USER_NOT_FOUND);

    return dataHl2.getLevel2ByUser(userId);
}

function getLevel2ById(hl2Id, carryOver) {
    if (!hl2Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter hl2Id is not found", "level2Services/handleGet/getLevel2ById", L1_MSG_PLAN_NOT_FOUND);

    var hl2Result = JSON.parse(JSON.stringify(dataHl2.getLevel2ById(hl2Id)));
    if (hl2Result.HL2_ID) {
        var hl1BudgetAllocated = dataHl1.getHl1AllocatedBudget(hl2Result.HL1_ID, 0);
        var hl2Users = userbl.getUserByHl2Id(hl2Id);
        var hl2BudgetAllocated = dataHl2.getHl2AllocatedBudget(hl2Result.HL2_ID, 0);
        var hl2TargetKpi = expectedOutcomesLib.getExpectedOutcomesByHl2Id(hl2Id, hl2Result.HL1_ID, carryOver);
        var eventApprover = eventManagementLib.getEventApproverByHlId('HL2',hl2Id, hl2Result.HL1_ID);
        hl2Result.ACRONYM = hl2Result.ORGANIZATION_ACRONYM;
        hl2Result.BUDGET = hl2Result.HL2_BUDGET_TOTAL;
        hl2Result.BUDGET_APPROVERS = budgetApprovers.getL2BudgetApproverByL2Id(hl2Id).assigned;
        hl2Result.BUDGET_APPROVERS_AVAILABLE = budgetApprovers.getL2BudgetApproverByL2Id(hl2Id).available;

        hl2Result.EVENT_APPROVERS = eventApprover.assigned;
        hl2Result.EVENT_APPROVERS_AVAILABLE = eventApprover.available;

        hl2Result.ASSIGNED_USERS = hl2Users.users_in;
        hl2Result.AVAILABLE_USERS = hl2Users.users_out;
        hl2Result.HL1_BUDGET_REMAINING = Number(hl2Result.HL1_BUDGET) - Number(hl1BudgetAllocated || 0);
        hl2Result.CONTACT_DATA = contactDataLib.getContactData(hl2Id, 'CENTRAL');
        hl2Result.HL2_BUDGET_REMAINING = Number(hl2Result.HL2_BUDGET_TOTAL) - Number(hl2BudgetAllocated || 0);
        hl2Result.TARGET_KPIS = carryOver ? expectedOutcomesLib.filterKpiByLevel(hl2TargetKpi, 'HL3') : hl2TargetKpi;
        hl2Result.CATEGORIES = carryOver ? hl3.getCarryOverHl2CategoryOption(hl2Id) : getCategoryOption(hl2Id);
        hl2Result.SUBREGION = !carryOver ? dataSubRegion.getSubRegionsByRegionId(hl2Result.REGION_ID) : undefined;
    }

    return hl2Result;
}

function getAllLevel2(hl1Id, userId) {
    return dataHl2.getAllLevel2(hl1Id);
}

function getLevel2ForSearch(userSessionID, budget_year_id, region_id, subregion_id, limit, offset) {
    var defaultBudgetYear = budgetYear.getDefaultBudgetYear();

    var resultDatabase = dataHl2.getLevel2ForSearch(userSessionID, util.isSuperAdmin(userSessionID) ? 1 : 0, budget_year_id || defaultBudgetYear.BUDGET_YEAR_ID
        , region_id || 0, subregion_id || 0, limit || -1, offset || 0);
    return resultDatabase;
}

function existHl2(objLevel2) {
    return getLevel2ById(objLevel2);
}

function getAllCentralTeam(centralTeamId, hlid, level) {
    var budgetYearId;
    if (hlid && level)
        budgetYearId = budgetYear.getBudgetYearByLevelParent(level, hlid, false);
    return dataHl2.getAllCentralTeam(centralTeamId, budgetYearId);
}

function hasChild(hl2Id) {
    return dataHl2.countRelatedObjects(hl2Id) > 0;
}

function validateInsertHl2(objLevel2) {
    var isValid = false;
    var isvalidOrganization = false;
    var errors = {};
    var BreakException = {};
    var keys = ['BUDGET', 'ACRONYM', 'ORGANIZATION_NAME'];

    if (!objLevel2)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NOT_FOUND);

    try {
        keys.forEach(function (key) {
            if (objLevel2[key] === null || objLevel2[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objLevel2[key]);
                if (!isValid) {
                    errors[key] = objLevel2[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;


    } catch (e) {
        if (e.code == 450)
            throw e.details;
        if (e !== BreakException)
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2"
                , JSON.stringify(errors));
    }
    return isValid;
}

function validateUpdateHl2(objLevel2) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['HL2_ID', 'BUDGET', 'ACRONYM', 'ORGANIZATION_NAME'];

    if (!objLevel2)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePut/updateHl2", L1_MSG_PLAN_NOT_FOUND);

    try {
        keys.forEach(function (key) {
            if (objLevel2[key] === null || objLevel2[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objLevel2[key]);

                if (!isValid) {
                    errors[key] = objLevel2[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;

        var hl1 = dataHl1.getLevel1ById(objLevel2.HL1_ID);

        var objHl2Other = dataHl2.getLevelByAcronymAndOrganizationAcronym(hl1.ACRONYM, hl1.BUDGET_YEAR_ID, objLevel2.ACRONYM);
        //check the same object
        if (objHl2Other && objLevel2.HL2_ID != objHl2Other.HL2_ID)
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/updateHl2", L1_MSG_PLAN_EXISTS);

    } catch (e) {
        if (e !== BreakException)
            throw e;
        else
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePut/updateHl2"
                , JSON.stringify(errors));
    }
    return isValid;
}

//Check data types
function validateType(key, value) {
    var valid = true;
    switch (key) {
        case 'ORGANIZATION_NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'USER_ID':
        case 'HL2_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'BUDGET':
            valid = Number(value) >= 0;
            break;
        case 'ACRONYM':
            valid = value.replace(/\s/g, "").length == 2;
            break;
    }
    return valid;
}

/*VALIDATE TYPES VALUES OF RELATED OBJECT TO HL2_USER*/
function validateHl2User(listObjHl2User) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = listObjHl2User[0].IN_USER_ID ? ['IN_USER_ID'] : ['USER_ID'];

    if (!listObjHl2User || !listObjHl2User.length)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateHl2User", "Assigned user list is empty.");

    try {

        for (var i = 0; i < listObjHl2User.length; i++) {
            keys.forEach(function (key) {
                if (listObjHl2User[i][key] === null || listObjHl2User[i][key] === undefined) {
                    errors[key] = null;
                    throw BreakException;
                } else {
                    // validate attribute type
                    isValid = validateType(key, listObjHl2User[i][key]);
                    if (!isValid) {
                        errors[key] = listObjHl2User[i][key];
                        throw BreakException;
                    }
                }
            });
        }
        isValid = true;
    } catch (e) {
        if (e !== BreakException)
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateHl2User", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateHl2User"
                , JSON.stringify(errors));
    }
    return isValid;
}

function validateKpi(data) {
    if (data.TARGET_KPIS) {
        var totalAvailable = expectedOutcomesLib.getExpectedOutcomeTotalAvailableByHlIdLevelId(data.HL1_ID, 'HL2', data.HL2_ID);

        if ((!data.TARGET_KPIS.KPIS || !data.TARGET_KPIS.KPIS.length)
            && !data.TARGET_KPIS.COMMENTS)
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_CAMPAIGN_FORECASTING_KPIS_COMMENT);

        data.TARGET_KPIS.KPIS.forEach(function (kpiDetail) {
            if (!kpiDetail.OUTCOMES_ID || !Number(kpiDetail.OUTCOMES_ID))
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_CAMPAIGN_FORECASTING_KPIS_NAME_NOT_VALID);
            if (!kpiDetail.OUTCOMES_TYPE_ID || !Number(kpiDetail.OUTCOMES_TYPE_ID))
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_CAMPAIGN_FORECASTING_KPIS_TYPE_NOT_VALID);

            if (Number(kpiDetail.VOLUME_VALUE) != 0 && !Number(kpiDetail.VOLUME_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/insertHl3", L1_CAMPAIGN_FORECASTING_KPIS_DETAILS);
            if (!kpiDetail.EURO_VALUE || !Number(kpiDetail.EURO_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl3Services/handlePost/insertHl3", L1_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO);

            if (totalAvailable && totalAvailable[kpiDetail.OUTCOMES_TYPE_ID] && totalAvailable[kpiDetail.OUTCOMES_TYPE_ID][kpiDetail.OUTCOMES_ID]) {
                if (Number(kpiDetail.VOLUME_VALUE) > totalAvailable[kpiDetail.OUTCOMES_TYPE_ID][kpiDetail.OUTCOMES_ID].VOLUME_AVAILABLE_TO_ALLOCATE)
                    throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_CAMPAIGN_FORECASTING_KPIS_VOLUME);

                if (Number(kpiDetail.EURO_VALUE) > totalAvailable[kpiDetail.OUTCOMES_TYPE_ID][kpiDetail.OUTCOMES_ID].VALUE_AVAILABLE_TO_ALLOCATE)
                    throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_CAMPAIGN_FORECASTING_KPIS_VALUE);
            }
        });
    }
    return true;
}

/*VALIDATE IF EXITS DE PAIR HL2_USER IN DATABASE*/
/*function validateHl2UserPair(objHl2User, objLevel2) {
    return dataHl2User.existsHl2UserPair(objHl2User, objLevel2);
}*/

/*function sendEmail(resBudgetStatus, userId) {

    if (config.getActivateNotificationLevel2()) {
        var stringInHl4 = "List In Budget: ";
        var stringOutHl4 = "List Out Budget: ";

        if (resBudgetStatus) {
            try {
                if (resBudgetStatus.emailListInBudget.length > 0) {
                    for (var i = 0; i < resBudgetStatus.emailListInBudget.length; i++) {
                        var objHl3 = resBudgetStatus.emailListInBudget[i];
                        if (objHl3)
                            stringInHl3 = stringInHl3 + "<p>" + i + " - " + "ACRONYM: " + objHl3.ACRONYM + ", DESCRIPTION: " + objHl3.HL3_DESCRIPTION + "</p>";
                    }
                }

                if (resBudgetStatus.emailListOutBudget.length > 0) {
                    for (var i = 0; i < resBudgetStatus.emailListOutBudget.length; i++) {
                        var objHl3 = resBudgetStatus.emailListOutBudget[i];
                        if (objHl3)
                            stringOutHl3 = stringOutHl3 + "<p>" + i + " - " + "ACRONYM: " + objHl3.ACRONYM + ", DESCRIPTION: " + objHl3.HL3_DESCRIPTION + "</p>";
                    }
                }


                var to = config.getNotifyLevel2Account();
                var body = '<p> Dear Colleague </p><p>We send the list of INITIATIVE/CAMPAIGN shipped in or out of budget</p>';
                body = body + stringInHl3;
                body = body + stringOutHl3;
                var mailObject = mail.getJson([{
                    "address": to
                }], "Marketing Planning Tool - Lits of TEAM/PRIORITY shipped in or out of budget", body);

                mail.sendMail(mailObject, true);
            }
            catch (e) {
                throw e;
            }
        }
    }
}*/

function checkBudgetStatus(hl1Id, userId, hl2Id, newHl2Budget) {
    if (hl1Id && newHl2Budget) {
        var hl1 = dataHl1.getLevel1ById(hl1Id);
        var hl1AllocatedBudget = dataHl1.getHl1AllocatedBudget(hl1Id, hl2Id);
        return (Number(hl1.BUDGET) - Number(hl1AllocatedBudget) - Number(newHl2Budget)) >= 0 ? 1 : 0;
    } else {
        var resultHl2 = getHl2ByHl1Id(hl1Id, userId);
        if (resultHl2.out_result.length) {
            var hl1 = dataHl1.getLevel1ById(hl1Id);
            var hl1Budget = Number(hl1.BUDGET);
            var total = 0;
            for (var i = 0; i < resultHl2.out_result.length; i++) {
                if (hl1Budget < total + parseFloat(resultHl2.out_result[i].BUDGET)) {
                    dataHl2.updateHl2BudgetStatus(resultHl2.out_result[i].HL2_ID, userId, 0);
                } else {
                    dataHl2.updateHl2BudgetStatus(resultHl2.out_result[i].HL2_ID, userId, 1);
                    total = total + parseFloat(resultHl2.out_result[i].BUDGET);
                }
            }
        }
        return true;
    }
}

function checkPermission(userSessionID, method, hl2Id) {
    if (((method && method == "HL2_ID") || !method) && !util.isSuperAdmin(userSessionID)) {
        var usersL2 = userbl.getUserByHl2Id(hl2Id).users_in;
        var users = usersL2.find(function (user) {
            return user.USER_ID == userSessionID
        });
        if (!users) {
            throw ErrorLib.getErrors().CustomError("", "level2/handlePermission", "User hasn´t permission for this resource.");
        }
    }
}

function getHistory(HL2_ID) {
    return dataHl2.getAllHl2VersionByHl2Id(HL2_ID);
}

//Check data types for version insert
function validateVersionType(key, value) {
    var valid = true;
    switch (key) {
        case 'ORGANIZATION_NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'HL2_ID':
        case 'HL1_ID':
        case 'TEAM_TYPE_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'HL2_BUDGET_TOTAL':
            valid = Number(value) >= 0;
            break;
        case 'ACRONYM':
            valid = value.replace(/\s/g, "").length == 2;
            break;
        case 'VERSION':
            valid = !isNaN(value) && value > 0;
            break;
        case 'CRT_RELATED':
        case 'IMPLEMENT_EXECUTION_LEVEL':
        case 'IN_BUDGET':
        case 'ALLOW_AUTOMATIC_BUDGET_APPROVAL':
            valid = !isNaN(value) && (value === 0 || value === 1);
            break;
    }
    return valid;
}

function validateLevel2Version(data) {
    var isValid = false;
    var errors = {};
    var BreakException = {};

    var keys = [
        'HL2_ID',
        'VERSION',
        'HL2_BUDGET_TOTAL',
        'CRT_RELATED',
        'IMPLEMENT_EXECUTION_LEVEL',
        'ORGANIZATION_NAME',
        'IN_BUDGET',
        'ALLOW_AUTOMATIC_BUDGET_APPROVAL',
        'HL1_ID'
    ];

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

        isValid = true;

    } catch (e) {
        if (e !== BreakException)
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePut/validateLevel2Version", e.toString());
        else
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePut/validateLevel2Version"
                , JSON.stringify(errors));
    }
    return isValid;
}

function validateChanges(originalHL2, newHL2) {
    return originalHL2.ORGANIZATION_NAME !== newHL2.ORGANIZATION_NAME
        || originalHL2.ORGANIZATION_ACRONYM !== newHL2.ACRONYM
        || Number(originalHL2.HL2_BUDGET_TOTAL) !== Number(newHL2.BUDGET)
        || originalHL2.IMPLEMENT_EXECUTION_LEVEL !== newHL2.IMPLEMENT_EXECUTION_LEVEL
        || originalHL2.ALLOW_AUTOMATIC_BUDGET_APPROVAL !== newHL2.ALLOW_AUTOMATIC_BUDGET_APPROVAL
        || originalHL2.CRT_RELATED !== newHL2.CRT_RELATED
        || originalHL2.SUBREGION_ID !== newHL2.SUBREGION_ID;
}

function getHistoryDetail(HL_ID, VERSION) {
    return dataHl2.getLevel2VersionById(HL_ID, VERSION);
}

function getHistoryAllFirstVersion(hl_id, userSessionID) {
    return dataHl2.getLevel2VersionForFilter(hl_id, userSessionID, userbl.isSuperAdmin(userSessionID));
}

function insertExpectedOutcomes(data, userId) {
    var hl2ExpectedOutcomesId = dataExOut.insertHl2ExpectedOutcomes(data.HL2_ID, data.TARGET_KPIS.COMMENTS || '', userId);
    var mapEOL = expectedOutcomesLevelLib.getKpiTypeOptionMapByHlId(HIERARCHY_LEVEL.HL2);
    if (data.TARGET_KPIS.KPIS.length) {
        var hl2ExpectedOutcomesDetail = [];
        data.TARGET_KPIS.KPIS.forEach(function (expectedOutcomeDetail) {
            var expectedOutcomeLevelId = mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID]
            && mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID][expectedOutcomeDetail.OUTCOMES_ID]
                ? mapEOL[expectedOutcomeDetail.OUTCOMES_TYPE_ID][expectedOutcomeDetail.OUTCOMES_ID]
                : expectedOutcomeDetail.EXPECTED_OUTCOME_LEVEL_ID;
            hl2ExpectedOutcomesDetail.push({
                in_hl2_expected_outcomes_id: hl2ExpectedOutcomesId,
                in_expected_outcome_level_id: expectedOutcomeLevelId,
                in_euro_value: expectedOutcomeDetail.EURO_VALUE,
                in_volume_value: Number(expectedOutcomeDetail.VOLUME_VALUE),
                in_created_user_id: userId
            });
        });
        dataExOut.insertHl2ExpectedOutcomesDetail(hl2ExpectedOutcomesDetail);
    }
    return true;
}

function updateExpectedOutcomes(data, userId) {
    dataExOut.deleteHl2ExpectedOutcomesDetail(data.HL2_ID || data.IN_HL2_ID, userId);
    dataExOut.deleteHl2ExpectedOutcomes(data.HL2_ID || data.IN_HL2_ID, userId);
    return insertExpectedOutcomes(data, userId);
}

function insertHl2FromUpload(hl2, userId) {
    var hl1 = dataHl1.getLevel1ById(hl2.PARENT_ID);
    if (!hl1.length)
        throw ErrorLib.getErrors().ImportError("", "uploadService/handlePost/insertHl2FromUpload", L1_MSG_PLAN_NOT_FOUND);

    if (dataHl2.getLevelByAcronymAndOrganizationAcronym(hl1.ACRONYM, hl1.BUDGET_YEAR_ID, hl2.ACRONYM)) {
        throw ErrorLib.getErrors().ImportError("", "uploadService/handlePost/insertHl2FromUpload", L1_MSG_LEVEL_1_EXISTS);
    }

    if(hl1.REGION_ID){
        if(!hl2.SUBREGION_ID){
            throw ErrorLib.getErrors().ImportError("", "uploadService/handlePost/insertHl2FromUpload", L2_MSG_LEVEL_2_SUB_REGION);
        }
    }

    hl2.IN_IN_BUDGET = 0;//checkBudgetStatus(objLevel2.IN_PLAN_ID, userId, null, objLevel2.IN_HL2_BUDGET_TOTAL);

    var objLevel2 = {
        BUDGET: hl2.HL2_BUDGET_TOTAL,
        ACRONYM: hl2.ACRONYM,
        ORGANIZATION_NAME: hl2.ORGANIZATION_NAME,
        IMPLEMENT_EXECUTION_LEVEL: hl2.IMPLEMENT_EXECUTION_LEVEL,
        CRT_RELATED: hl2.CRT_RELATED,
        HL1_ID: hl2.PARENT_ID,
        IN_BUDGET: 0,
        IMPORT_ID: hl2.IMPORT_ID,
        IMPORTED: 1,
        SUBREGION_ID: hl2.SUBREGION_ID
    };



    var objhl2 = dataHl2.insertLevel2(
        objLevel2.BUDGET
        , objLevel2.ACRONYM
        , objLevel2.ORGANIZATION_NAME
        , objLevel2.IMPLEMENT_EXECUTION_LEVEL
        , objLevel2.CRT_RELATED
        , objLevel2.HL1_ID
        , objLevel2.IN_BUDGET
        , objLevel2.ALLOW_AUTOMATIC_BUDGET_APPROVAL
        , userId
        , objLevel2.SUBREGION_ID  || null
        , objLevel2.IMPORT_ID
        , objLevel2.IMPORTED

    );

    if (objhl2) {
        if (objhl2 > 0) {
            //if (hl1.TEAM_TYPE_ID == TEAM_TYPE_CENTRAL && objLevel2.contactData && objLevel2.contactData.length)
            //    contactDataLib.insertContactData(objLevel2.contactData, userId, objhl2);

            //INSERT USERS RELATED TO HL2
            hl2.IN_HL2_ID = objhl2;
            validateHl2User(hl2.USERS);
            var listObjHl2User = util.parseAssignedUsers(hl2.USERS);

            /******************/
            listObjHl2User = completeUsers(listObjHl2User); //add SA users
            /******************/
            var arrHl2User = [];
            if (listObjHl2User) {
                // if (validateHl2User(listObjHl2User)) {
                for (var i = 0; i < listObjHl2User.length; i++) {
                    arrHl2User.push({
                        in_hl2_id: hl2.IN_HL2_ID
                        , in_user_id: listObjHl2User[i]
                        , in_created_user_id: userId
                    });
                }

                if (arrHl2User.length > 0) {
                    dataHl2User.insertLevel2User(arrHl2User);
                }

                //validate Approvers
                /*
                if(validateApprovers(listObjHl2User,listObjHl2Approvers)){

                    budgetApprovers.insertL2BudgetApprover(objLevel2.IN_HL2_ID, listObjHl2Approvers, userId)
                }else{
                    throw ErrorLib.getErrors().CustomError("","","The Approvers do not match the Assigned Users.")
                }*/

                // }
            }

            // insertExpectedOutcomes(hl2, userId);
            return hl2.IN_HL2_ID;
        }
        else
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NO_CREATED);
    }
    else
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NO_CREATED);

}

function getExpectedOutcomesByHl2Id(hl2Id, hl1Id) {
    return expectedOutcomesLib.getExpectedOutcomesByHl2Id(hl2Id, hl1Id);
}

function getLevel2Kpi(hl1Id, userId) {
    var isSA = false;
    var result = {};
    if (config.getApplySuperAdminToAllInitiatives()) {
        isSA = userbl.isSuperAdmin(userId);
    }

    var listFromData = dataHl2.getHl2KpiSummary(hl1Id, userId, isSA);

    var mapKpi = {};

    listFromData.forEach(function (hl) {
        mapKpi[hl.L2_ACRONYM] = mapKpi[hl.L2_ACRONYM] || {
            HL2_ID: hl.HL2_ID,
            CRM_ID: hl.CRM_ID,
            HL1_ID: hl.HL1_ID,
            ACRONYM: hl.L2_ACRONYM,
            ORGANIZATION_NAME: hl.ORGANIZATION_NAME,
            IS_LOCKED: hl.IS_LOCKED
        };
        var auxKpi = mapKpi[hl.L2_ACRONYM].kpi || [];
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
        mapKpi[hl.L2_ACRONYM].kpi = auxKpi;
    });
    var result = {};
    result.out_result = Object.keys(mapKpi).map(function (e) {
        return mapKpi[e]
    });
    return result;
}

function validateCategoryOption(data) {
    if (!data.CATEGORIES || !data.CATEGORIES.length)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_CATEGORY_NOT_EMPTY);

    if (!data.HL2_ID && data.CATEGORIES.length !== dataCategory.getAllocationCategoryCountByHlId("hl2"))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_CATEGORY_INCORRECT_NUMBER);
    var percentagePerOption = 0;
    var thereIsMandatoryCategory = false;
    for (var i = 0; i < data.CATEGORIES.length; i++) {
        var percentagePerCategory = 0;
        var hl2Category = data.CATEGORIES[i];
        thereIsMandatoryCategory = thereIsMandatoryCategory || !!hl2Category.MAKE_CATEGORY_MANDATORY;
        if (!hl2Category.CATEGORY_ID || !Number(hl2Category.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_CATEGORY_NOT_VALID);

        if (!hl2Category.OPTIONS || !hl2Category.OPTIONS.length)
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_CATEGORY_OPTIONS_NOT_EMPTY);

        hl2Category.OPTIONS.forEach(function (option) {
            if (!option.OPTION_ID || !Number(option.OPTION_ID))
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.AMOUNT) && !Number(option.AMOUNT)) || Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0)
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", "Option value is not valid (actual value " + option.AMOUNT + ")");

            percentagePerOption = percentagePerOption + Number(option.AMOUNT || 0);
            percentagePerCategory += Number(option.AMOUNT || 0);
        });

        if((Number(data.BUDGET) > 0) && hl2Category.MAKE_CATEGORY_MANDATORY && percentagePerCategory <= 0){
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_BUDGET_ZERO_CATEGORY_TOTAL_PERCENTAGE_ZERO);
        }
    }
    if(thereIsMandatoryCategory) {
        if ((Number(data.BUDGET) == 0) && percentagePerOption != 0) {
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_BUDGET_ZERO_CATEGORY_TOTAL_PERCENTAGE_ZERO);
        }

        if ((Number(data.BUDGET) > 0) && percentagePerOption != 100) {
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_CATEGORY_TOTAL_PERCENTAGE);
        }
    }

    return true;
}

function getCategoryOption(hl2_id) {
    return allocationCategoryOptionLevelLib.getHlCategoryOptionByLevelHlId('HL2', hl2_id);
}

function insertCategoryOption(data, userId) {
    var categoryOptionBulk = [];
    var mapCOL = util.getMapCategoryOption('hl2');

    data.CATEGORIES.forEach(function (hl1Category) {
        hl1Category.OPTIONS.forEach(function (hl1CategoryOption) {
            categoryOptionBulk.push({
                in_hl2_id: data.HL2_ID
                , in_category_option_level_id: mapCOL[hl1Category.CATEGORY_ID][hl1CategoryOption.OPTION_ID]
                , in_amount: hl1CategoryOption.AMOUNT || 0
                , in_user_id: userId
                , in_updated: 0
            });
        });
    });
    dataCategoryOptionLevel.insertCategoryOption(categoryOptionBulk, 'hl2');

    return true;
}

function updateCategoryoption(data, userId) {
    var insertBulk = [];
    var updateBulk = [];
    var mapCOL = util.getMapCategoryOption('hl2');
    data.CATEGORIES.forEach(function (hl2Category) {
        hl2Category.OPTIONS.forEach(function (option) {
            var categoryOption = {
                in_category_option_level_id: mapCOL[hl2Category.CATEGORY_ID][option.OPTION_ID]
                , in_amount: option.AMOUNT || 0
                , in_user_id: userId
                , in_updated: 0
                , in_hl2_id: data.HL2_ID
            };
            if (!option.CATEGORY_OPTION_ID) {
                categoryOption.in_hl2_id = data.HL2_ID;
                insertBulk.push(categoryOption);
            } else {
                updateBulk.push(categoryOption);
            }
        });
    });

    if (updateBulk && updateBulk.length)
        dataCategoryOptionLevel.updateCategoryOption(updateBulk, 'hl2');

    if (insertBulk && insertBulk.length)
        dataCategoryOptionLevel.insertCategoryOption(insertBulk, 'hl2');

    return true;
}

function checkOverBudget(hl1Id, hl1Budget, hl2Budget, hl2Id) {
    var hl1BudgetAllocated = dataHl1.getHl1AllocatedBudget(hl1Id, hl2Id || 0);

    if (!!Number(hl2Budget) && (Number(hl2Budget) > (Number(hl1Budget) - Number(hl1BudgetAllocated)).toFixed(2)))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/checkOverBudget", L1_MSG_OVER_BUDGET);

    return true;
}

function getCarryOverHl1CategoryOption(hl1_id) {
    var hl1_category = JSON.parse(JSON.stringify(blLevel1.getCategoryOption(hl1_id)));
    var hl2_category = JSON.parse(JSON.stringify(allocationCategory.getCategoryOptionByHierarchyLevelId(HIERARCHY_LEVEL.HL2)));

    return hl2_category.map(function (category) {
        var hl1Cat = extractElementByList(hl1_category, "CATEGORY_ID", category.CATEGORY_ID);
        if (hl1Cat) {
            category.OPTIONS.map(function (option) {
                var hl1option = extractElementByList(hl1Cat.OPTIONS, "OPTION_ID", option.OPTION_ID);
                option.AMOUNT = hl1option ? hl1option.AMOUNT : 0;
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

function deleteLevel2User(arrDelHl2User) {
    eventManagementLib.deleteEventApproverByHlIdUserId('HL2',arrDelHl2User);
    return dataHl2User.deleteLevel2User(arrDelHl2User);
}