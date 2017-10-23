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
var allocationCategory = mapper.getAllocationCategoryLib();
/** ***********END INCLUDE LIBRARIES*************** */
var blLevel1 = mapper.getLevel1();

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

var L1_MSG_CENTRAL_TEAM_EXISTS = "Another Central Team with the same acronym already exists.";
var L1_MSG_PLAN_EXISTS = "Another Plan with the same acronym already exists";
var L1_MSG_LEVEL_1_EXISTS = "Another Team with the same organization acronym already exists";
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
var L1_CATEGORY_OPTIONS_INCORRECT_NUMBER = "Incorrect number of options.";
var L1_CATEGORY_OPTION_NOT_VALID = "Option is not valid.";
var L1_CATEGORY_TOTAL_PERCENTAGE = "Budget Distribution should be equal to 100%.";
var L1_BUDGET_ZERO_CATEGORY_TOTAL_PERCENTAGE_ZERO = "When Team budget is zero then Category total percentage should be equal to 0%.";
var L1_CATEGORY_OPTIONS_NOT_EMPTY = "Option percentage should be less than or equal to 100%.";

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

function getExpectedOutcomeByL2Id(hl2Id, hl1Id){
    var listEO = expectedOutcomesLib.getExpectedOutcomesByHl2Id(hl2Id, hl1Id, true);
    return listEO.detail;
}

function getHl2AllowAutomaticBudgetApprovalByHl4Id(l4Id){
    return dataHl2.getHl2AllowAutomaticBudgetApprovalByHl4Id(l4Id);
}

function getHl2AllowAutomaticBudgetApprovalByHl5Id(l5Id){
    return dataHl2.getHl2AllowAutomaticBudgetApprovalByHl5Id(l5Id);
}

/*INSERT A NEW HL2 WITH CREO O MORE USERS ASICIATIONS*/
function insertHl2(objLevel2, userId) {
    var mapCOL = util.getMapCategoryOption('hl2');//Set Map for Category Option Level
    if (validateInsertHl2(objLevel2) && validateKpi(objLevel2) && validateCategoryOption(objLevel2)) {
        var hl1 = dataHl1.getLevel1ById(objLevel2.IN_PLAN_ID);
        checkOverBudget(objLevel2.IN_PLAN_ID, hl1.BUDGET, objLevel2.IN_HL2_BUDGET_TOTAL);

        if (dataHl2.getLevelByAcronymAndOrganizationAcronym(hl1.ACRONYM, hl1.BUDGET_YEAR_ID, objLevel2.IN_ORGANIZATION_ACRONYM)) {
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_LEVEL_1_EXISTS);
        }
        objLevel2.IN_IN_BUDGET = checkBudgetStatus(objLevel2.IN_PLAN_ID, userId, null, objLevel2.IN_HL2_BUDGET_TOTAL);
        var objhl2 = dataHl2.insertLevel2(objLevel2, userId);

        if (objhl2) {
            if (objhl2 > 0) {
                if (hl1.TEAM_TYPE_ID == TEAM_TYPE_CENTRAL && objLevel2.contactData && objLevel2.contactData.length)
                    contactDataLib.insertContactData(objLevel2.contactData, userId, objhl2);

                //INSERT USERS RELATED TO HL2
                objLevel2.IN_HL2_ID = objhl2;
                var listObjHl2User = objLevel2.USERS;
                var listObjHl2Approvers = objLevel2.BUDGET_APPROVERS;

                /******************/
                listObjHl2User = completeUsers(listObjHl2User); //add SA users
                /******************/
                var arrHl2User = [];
                if (listObjHl2User) {
                    if (validateHl2User(listObjHl2User)) {
                        for (var i = 0; i < listObjHl2User.length; i++) {
                            /*if (!validateHl2UserPair(listObjHl2User[i], objLevel2)) {
                                dataHl2User.insertLevel2User(listObjHl2User[i], objLevel2, userId);
                            }
                            */
                            arrHl2User.push({
                                in_hl2_id: objLevel2.IN_HL2_ID
                                ,in_user_id: listObjHl2User[i].IN_USER_ID
                                , in_created_user_id: userId
                            });
                        }

                        if(arrHl2User.length > 0){
                            dataHl2User.insertLevel2User(arrHl2User);
                        }

                        //validate Approvers
                        if(validateApprovers(listObjHl2User,listObjHl2Approvers)){

                            budgetApprovers.insertL2BudgetApprover(objLevel2.IN_HL2_ID, listObjHl2Approvers, userId)
                        }else{
                            throw ErrorLib.getErrors().CustomError("","","The Approvers do not match the Assigned Users.")
                        }

                    }
                }

                insertExpectedOutcomes(objLevel2, userId);
                insertCategoryOption(objLevel2, userId);

                return objLevel2.IN_HL2_ID;
            }
            else
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NO_CREATED);
        }
        else
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NO_CREATED);
    }
}

function validateApprovers(listObjHl2User,listObjHl2Approvers){

    return arrayContainsArray(listObjHl2User,listObjHl2Approvers);
}

function arrayContainsArray (superset, subset) {
   if(subset) subset.forEach(function(approver){
        if(!existUser(superset,approver)) return false;
    });
    return true;
}

function existUser(userArray,user){
    userArray.forEach(function(u){
        if(u.USER_ID == user.USER_ID) return true;
    });
    return false;
}

function completeUsers(users) {
    var id = config.getRoleEnum().SuperAdmin;
    var listUsers = [];
    for (var j = 0; j < users.length; j++) {
        listUsers.push(users[j]['IN_USER_ID']);
    }
    var saUsers = userbl.getUserByRoleId(id);

    for (var i = 0; i < saUsers.length; i++) {
        if (!contains(listUsers, saUsers[i]['USER_ID'])) {
            users.push(saUsers[i]);
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

//Insert new HL2 version based on the current HL1.
function insertLevel2Version(currentHL2, userId){
	//Insert the new version
	if(validateLevel2Version(currentHL2)){
		return dataHl2.insertLevel2Version(	currentHL2.HL2_ID, 
											currentHL2.VERSION,
											currentHL2.ACRONYM,
											currentHL2.DESCRIPTION,
											currentHL2.HL2_BUDGET_TOTAL,
											currentHL2.BUDGET_YEAR_ID,
											currentHL2.CRT_RELATED,
											currentHL2.IMPLEMENT_EXECUTION_LEVEL,
											currentHL2.TEAM_TYPE_ID,
											currentHL2.REGION_ID,
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


        if (validateUpdateHl2(objLevel2) && validateKpi(objLevel2) && validateCategoryOption(objLevel2)) {

            var updated = 0;
            var objHl2 = {};
            objHl2.IN_HL2_ID = objLevel2.IN_HL2_ID;

            if (canUpdate(objLevel2)) {
            	var currentHL2 = dataHl2.getLevel2ById(objHl2);
            	currentHL2 = JSON.parse(JSON.stringify(currentHL2));
            	objLevel2.VERSION = currentHL2.VERSION;
            	
            	//Insert new HL2 version, if the date is into the valid range
                if(budgetYear.getLockFlagByHlIdLevel(currentHL2.HL2_ID, 'HL2') && validateChanges(currentHL2, objLevel2)){
                	insertLevel2Version(currentHL2, userId);
                	//Update HL2 version
                	objLevel2.VERSION = currentHL2.VERSION + 1;
                }
                
                var budgetChanged = currentHL2.HL2_BUDGET_TOTAL != objLevel2.IN_HL2_BUDGET_TOTAL;
                var hl1 = dataHl1.getLevel1ById(objLevel2.IN_PLAN_ID);
                objLevel2.IN_IN_BUDGET = checkBudgetStatus(objLevel2.IN_PLAN_ID, userId, objLevel2.IN_HL2_ID, objLevel2.IN_HL2_BUDGET_TOTAL);
               
                //Update HL2
                dataHl2.updateLevel2(objLevel2, userId);

                /*************ALLOCATION CATEGORY OPTION*********/
                updateCategoryoption(objLevel2, userId);

                if (hl1.TEAM_TYPE_ID == TEAM_TYPE_CENTRAL && objLevel2.contactData && objLevel2.contactData.length) {
                    contactDataLib.deleteContactDataByContactTypeId("hard", "CENTRAL", objLevel2.IN_HL2_ID);
                    contactDataLib.insertContactData(objLevel2.contactData, userId, objLevel2.IN_HL2_ID);
                }
                updateExpectedOutcomes(objLevel2, userId);
            }
            else
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/updateHl2", L1_MSG_PLAN_EXISTS);

                if (budgetChanged) {
                    var resBudgetStatus = hl3.checkBudgetStatus(objLevel2.IN_HL2_ID, userId);
                    if (resBudgetStatus.hasChanged) {
                        //send all emails
                        try {
                            //sendEmail(resBudgetStatus, userId);
                        }
                        catch (e) {
                            //when error email exist, log error
                            businessError.log(ErrorLib.getErrors().CustomError("", "level2Lib/sendEmail", JSON.stringify(e)), userId, userId);
                        }
                    }
                }

                var listObjHl2User = objLevel2.USERS;
                var listObjHl2Approvers = objLevel2.BUDGET_APPROVERS;
                var hl3List = dataHl3.getAllLevel3(objLevel2.IN_HL2_ID, userId).out_result;
                var hl2Users = dataHl2User.getAllHl2User(objLevel2.IN_HL2_ID);
                var arrHl2User = [];
                var arrHl3User = [];
                var arrDelHl3User = [];
                if (listObjHl2User) {
                    if (validateHl2User(listObjHl2User)) {
                        dataHl2User.delAllLevel2User(objLevel2);
                        for (var i = 0; i < listObjHl2User.length; i++) {
                            /*if (!validateHl2UserPair(listObjHl2User[i], objLevel2)) {
                                dataHl2User.insertLevel2User(listObjHl2User[i], objLevel2, userId);
                                if (notExistHl2UserInList(hl2Users, listObjHl2User[i].IN_USER_ID)) {
                                    hl3List.forEach(function (hl3) {
                                        dataHl3User.insertLevel3User(listObjHl2User[i].IN_USER_ID, hl3.HL3_ID, userId);
                                    });
                                }
                            }*/
                            arrHl2User.push({
                                in_hl2_id: objLevel2.IN_HL2_ID
                                ,in_user_id: listObjHl2User[i].IN_USER_ID
                                , in_created_user_id: userId
                            });

                            //validate Approvers
                            if(!validateApprovers(listObjHl2User,listObjHl2Approvers)){
                                throw ErrorLib.getErrors().CustomError("","","The Approvers do not match the Assigned Users.");
                            }

                            if (notExistHl2UserInList(hl2Users, listObjHl2User[i].IN_USER_ID)) {
                                hl3List.forEach(function (hl3) {
                                    //dataHl3User.insertLevel3User(listObjHl2User[i].IN_USER_ID, hl3.HL3_ID, userId);
                                    arrHl3User.push({
                                         in_hl3_id: hl3.HL3_ID
                                        , in_user_id: listObjHl2User[i].IN_USER_ID
                                        , in_created_user_id: userId
                                    });
                                });
                            }
                        }

                        budgetApprovers.deleteL2BudgetApprover(objLevel2.IN_HL2_ID, listObjHl2Approvers);
                        budgetApprovers.insertL2BudgetApprover(objLevel2.IN_HL2_ID, listObjHl2Approvers, userId);

                        if (arrHl2User.length > 0){
                            dataHl2User.insertLevel2User(arrHl2User);
                        }
                        if (arrHl3User.length > 0){
                            dataHl3User.insertLevel3User(arrHl3User);
                        }

                        for (var j = 0; j < hl2Users.length; j++) {
                            if (notExistHl2UserInList(listObjHl2User, hl2Users[j].USER_ID)) {
                                hl3List.forEach(function (hl3) {
                                    /*dataHl3User.deleteLevel3User({
                                        IN_HL3_USER_ID: hl2Users[j].USER_ID,
                                        IN_HL3_ID: hl3.HL3_ID
                                    }, userId);
                                    */
                                    arrDelHl3User.push({
                                        in_hl3_id: hl3.HL3_ID
                                        , in_user_id: hl2Users[j].USER_ID
                                    });
                                });
                            }
                        }
                        if(arrDelHl3User.length > 0)
                            dataHl3User.deleteLevel3User(arrDelHl3User);
                    }
                }
                else {
                    dataHl2User.delAllLevel2User(objLevel2);
                    hl3List.forEach(function (hl3) {
                        dataHl3User.delAllLevel3User(hl3.HL3_ID, userId);
                    });
                }

                return updated;
        }
}

function notExistHl2UserInList(hl2Users, hl2UserId) {
    var exist = 0;
    hl2Users.forEach(function (hl2User) {
        if (hl2User.USER_ID == hl2UserId) {
            ++exist;
        }
    });

    return !exist;
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

    if (!objLevel2.IN_HL2_ID)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_NOT_FOUND);
    if (!util.validateIsNumber(objLevel2.IN_HL2_ID))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_NOT_FOUND);
    if (hasChild(objLevel2))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/deleteHl2", L1_MSG_PLAN_CANT_DELETE);

    contactDataLib.deleteContactDataByContactTypeId("soft", "CENTRAL", objLevel2.IN_HL2_ID, userId);
    dataExOut.deleteHl2ExpectedOutcomesDetail(objLevel2.IN_HL2_ID, userId);
    dataExOut.deleteHl2ExpectedOutcomes(objLevel2.IN_HL2_ID, userId);
    dataCategoryOptionLevel.deleteCategoryOption(objLevel2.IN_HL2_ID,userId, 'HL2');
    return dataHl2.deleteHl2(objLevel2, userId);
}

function getLevel2ByUser(userId) {
    if (!userId)
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found", "level2Services/handleGet/getLevel2ByUser", L1_MSG_USER_NOT_FOUND);

    return dataHl2.getLevel2ByUser(userId);
}

function getLevel2ById(objLevel2, carryOver) {
    if (!objLevel2)
        throw ErrorLib.getErrors().BadRequest("The Parameter hl2Id is not found", "level2Services/handleGet/getLevel2ById", L1_MSG_PLAN_NOT_FOUND);

    var hl2Result =  JSON.parse(JSON.stringify(dataHl2.getLevel2ById(objLevel2)));
    var hl1BudgetAllocated = dataHl1.getHl1AllocatedBudget(hl2Result.HL1_ID, 0);
    if(hl2Result.HL2_ID){
        var l2CategoryOption = getCategoryOption(hl2Result.HL2_ID);
        hl2Result.BUDGET_APPROVERS = budgetApprovers.getL2BudgetApproverByL2Id(objLevel2.IN_HL2_ID);
        hl2Result.HL1_BUDGET_REMAINING = Number(hl2Result.HL1_BUDGET) - Number(hl1BudgetAllocated || 0);
        hl2Result.expectedOutcomes = getExpectedOutcomesByHl2Id(hl2Result.HL2_ID, hl2Result.HL1_ID);

        if(carryOver) {
            var hl2BudgetAllocated = dataHl2.getHl2AllocatedBudget(hl2Result.HL2_ID, 0);
            hl2Result.HL2_BUDGET_REMAINING = Number(hl2Result.HL2_BUDGET_TOTAL) - Number(hl2BudgetAllocated || 0);
            hl2Result.hl3_category = hl3.getHl3Categories(hl2Result.HL2_ID);//hl3.getHl3CategoryOption(hl2Result.HL2_ID).result;
        }
        else {
            hl2Result.hl2_category = l2CategoryOption.result;
        }
    }

    return hl2Result;
}

/*function getHl2CategoryOption(hl2_id) {
    var hl2Categories = dataCategoryOptionLevel.getAllocationCategory(hl2_id, 'hl2');
    var result = [];
    var distributePercentage = false;
    if(hl2Categories && hl2Categories.length){
        var allocationOptions = util.getAllocationOptionByCategoryAndLevelId('hl2', hl2_id);
        var sumOptionPercentage = 0;
        hl2Categories.forEach(function (catgory) {
            var aux = util.extractObject(catgory);
            var hl2Category = {};
            aux["hl2_category_option"] = allocationOptions[aux.CATEGORY_ID];
            hl2Category.hl2_category_option = [];
            Object.keys(aux).forEach(function (key) {
                if (key === "hl2_category_option") {
                    for (var i = 0; i < aux[key].length; i++) {
                        var option = {};
                        Object.keys(aux[key][i]).forEach(function (auxKey) {
                            option[auxKey] = aux[key][i][auxKey];
                        });
                        sumOptionPercentage += (option.AMOUNT || 0);
                        hl2Category.hl2_category_option.push(option);
                    }
                } else {
                    hl2Category[key] = aux[key];
                }
            });
            result.push(hl2Category);
        });

        distributePercentage = sumOptionPercentage > 0;
    } else {
        result = allocationCategory.getCategoryByHierarchyLevelId(HIERARCHY_LEVEL.HL2).results;
    }
    return {result: result, distributePercentage: distributePercentage};
}*/

function getAllLevel2(hl1Id, userId) {
    return dataHl2.getAllLevel2(hl1Id);
}

function getLevel2ForSearch(userSessionID, budget_year_id, region_id, subregion_id, limit, offset) {
    var defaultBudgetYear = budgetYear.getDefaultBudgetYear();

    var resultDatabase = dataHl2.getLevel2ForSearch(userSessionID, util.isSuperAdmin(userSessionID) ? 1 : 0, budget_year_id || defaultBudgetYear.BUDGET_YEAR_ID
        , region_id || 0, subregion_id || 0, limit || -1 , offset || 0);

    var listFiltered = JSON.parse(JSON.stringify(resultDatabase.result));
    listFiltered.forEach(function (object) {
        object.PATH = "CRM-" + object.ACRONYM + (object.BUDGET_YEAR % 100) + '-' + object.ORGANIZATION_ACRONYM;
    });

    var resultFiltered = {};
    resultFiltered.result =  listFiltered;
    resultFiltered.total_rows = resultDatabase.total_rows;
    return resultFiltered;
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

function canUpdate(objLevel2) {
    var currentL2 = getLevel2ById(objLevel2);
    var hl1 = dataHl1.getLevel1ById(objLevel2.IN_PLAN_ID);

    checkOverBudget(objLevel2.IN_PLAN_ID, hl1.BUDGET, objLevel2.IN_HL2_BUDGET_TOTAL, objLevel2.IN_HL2_ID);

    var objHl2Other = dataHl2.getLevelByAcronymAndOrganizationAcronym(hl1.ACRONYM, hl1.BUDGET_YEAR_ID, objLevel2.IN_ORGANIZATION_ACRONYM);
    if (!objHl2Other) return true;
    //check the same object
    if (currentL2.HL2_ID != objHl2Other.HL2_ID)
        return false;
    else
        return true;
}

function hasChild(objLevel2) {
    return dataHl2.countRelatedObjects(objLevel2) > 0;
}

function validateInsertHl2(objLevel2) {
    var isValid = false;
    var isvalidOrganization = false;
    var errors = {};
    var BreakException = {};
    var keys = ['IN_HL2_BUDGET_TOTAL', 'IN_ORGANIZATION_ACRONYM', 'IN_ORGANIZATION_NAME'];

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
    var keys = ['IN_HL2_ID', 'IN_HL2_BUDGET_TOTAL', 'IN_ORGANIZATION_ACRONYM', 'IN_ORGANIZATION_NAME'];

    if (!objLevel2)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePut/updateHl2", L1_MSG_PLAN_NOT_FOUND);

    try {
        keys.forEach(function (key) {
            if (objLevel2[key] === null || objLevel2[key] === undefined) {
                errors[key] = null;
                throw BreakException;
            } else {
                // validate attribute type
                isValid = validateType(key, objLevel2[key])

                if (!isValid) {
                    errors[key] = objLevel2[key];
                    throw BreakException;
                }
            }
        });
        isValid = true;
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
        case 'IN_ORGANIZATION_NAME':
            valid = value.length > 0 && value.length <= 255;
            break;
        case 'IN_USER_ID':
        case 'IN_HL2_ID':
            valid = !isNaN(value) && value > 0;
            break;
        case 'IN_HL2_BUDGET_TOTAL':
            valid = Number(value) >= 0;
            break;
        case 'IN_ORGANIZATION_ACRONYM':
            valid = value.replace(/\s/g, "").length == 3;
            break;
    }
    return valid;
}

/*VALIDATE TYPES VALUES OF RELATED OBJECT TO HL2_USER*/
function validateHl2User(listObjHl2User) {
    var isValid = false;
    var errors = {};
    var BreakException = {};
    var keys = ['IN_USER_ID'];

    if (!listObjHl2User)
        return true;

    try {

        for (var i = 0; i < listObjHl2User.length; i++) {
            keys.forEach(function (key) {
                if (listObjHl2User[i][key] === null || listObjHl2User[i][key] === undefined) {
                    errors[key] = null;
                    throw BreakException;
                } else {
                    // validate attribute type
                    isValid = validateType(key, listObjHl2User[i][key])
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
    if (data.hl2_expected_outcomes) {
        var totalAvailable = expectedOutcomesLib.getExpectedOutcomeTotalAvailableByHlIdLevelId(data.IN_PLAN_ID, 'HL2', data.IN_HL2_ID);

        if ((!data.hl2_expected_outcomes.hl2_expected_outcomes_details || !data.hl2_expected_outcomes.hl2_expected_outcomes_details.length)
            && !data.hl2_expected_outcomes.COMMENTS)
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_CAMPAIGN_FORECASTING_KPIS_COMMENT);

        data.hl2_expected_outcomes.hl2_expected_outcomes_details.forEach(function (kpiDetail) {
            /*if (Number(kpiDetail.VOLUME_VALUE) != 0 && !Number(kpiDetail.VOLUME_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_CAMPAIGN_FORECASTING_KPIS_DETAILS);
            if (!kpiDetail.EURO_VALUE || !Number(kpiDetail.EURO_VALUE))
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_CAMPAIGN_FORECASTING_KPIS_DETAILS_EURO);*/
            if (!kpiDetail.OUTCOMES_ID || !Number(kpiDetail.OUTCOMES_ID))
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_CAMPAIGN_FORECASTING_KPIS_NAME_NOT_VALID);
            if (!kpiDetail.OUTCOMES_TYPE_ID || !Number(kpiDetail.OUTCOMES_TYPE_ID))
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_CAMPAIGN_FORECASTING_KPIS_TYPE_NOT_VALID);

            if(totalAvailable && totalAvailable[kpiDetail.OUTCOMES_TYPE_ID] && totalAvailable[kpiDetail.OUTCOMES_TYPE_ID][kpiDetail.OUTCOMES_ID]) {
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
function validateHl2UserPair(objHl2User, objLevel2) {
    return dataHl2User.existsHl2UserPair(objHl2User, objLevel2);
}

function sendEmail(resBudgetStatus, userId) {

    if(config.getActivateNotificationLevel2()){
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
}

function checkBudgetStatus(hl1Id, userId, hl2Id, newHl2Budget) {
    if (hl1Id && newHl2Budget) {
        var hl1 = dataHl1.getLevel1ById(hl1Id);
        var hl1AllocatedBudget = dataHl1.getHl1AllocatedBudget(hl1Id, hl2Id);
        return (Number(hl1.BUDGET) - Number(hl1AllocatedBudget) - Number(newHl2Budget)) >= 0 ? 1 : 0;
    } else {
        var result = {};
        result.hasChanged = 0;
        result.emailListInBudget = [];
        result.emailListOutBudget = [];
        var resultHl2 = dataHl2.getHl2ByHl1Id(hl1Id, userId);
        if (resultHl2.out_result.length) {
            var hl1 = dataHl1.getLevel1ById(hl1Id);
            var hl1Budget = Number(hl1.BUDGET);
            var total = 0;
            for (var i = 0; i < resultHl2.out_result.length; i++) {
                if (hl1Budget < total + parseFloat(resultHl2.out_result[i].HL2_BUDGET_TOTAL)) {
                    dataHl2.updateHl2BudgetStatus(resultHl2.out_result[i].HL2_ID, userId, 0);
                    result.emailListOutBudget.push(resultHl2.out_result[i]);
                } else {
                    dataHl2.updateHl2BudgetStatus(resultHl2.out_result[i].HL2_ID, userId, 1);
                    total = total + parseFloat(resultHl2.out_result[i].HL2_BUDGET_TOTAL);
                    result.emailListInBudget.push(resultHl2.out_result[i]);
                }
            }
            result.hasChanged = result.emailListInBudget.length || result.emailListOutBudget.length;
        }
        return result;
    }
}

function checkPermission(userSessionID, method, hl2Id){
    if(((method && method == "HL2_ID") || !method) && !util.isSuperAdmin(userSessionID)){
        var usersL2 = userbl.getUserByHl2Id(hl2Id).users_in;
        var users = usersL2.find(function(user){return user.USER_ID == userSessionID});
        if(!users){
            throw ErrorLib.getErrors().CustomError("","level2/handlePermission","User hasn´t permission for this resource.");
        }
    }
}

function getHistory(HL2_ID){
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
        case 'ORGANIZATION_ACRONYM':
            valid = value.replace(/\s/g, "").length == 3;
            break;
        case 'VERSION':
            valid = !isNaN(value) && value > 0;
            break;
        case 'ACRONYM':
            valid = !value || (value.length > 0 && value.length <= 25);
            break;
        case 'DESCRIPTION':
            valid = !value || (value.length > 0 && value.length <= 255);
            break;
        case 'BUDGET_YEAR_ID':
            valid = !value || (!isNaN(value) && value > 0);
            break;
        case 'CRT_RELATED':
        case 'IMPLEMENT_EXECUTION_LEVEL':
        case 'IN_BUDGET':
        case 'ALLOW_AUTOMATIC_BUDGET_APPROVAL':
            valid = !isNaN(value) && (value === 0 || value === 1);
            break;
        case 'REGION_ID':
            valid = !value || (!isNaN(value) && value > 0);
            break;
        case 'SUBREGION_ID':
            valid = !value || (!isNaN(value) && value > 0);
            break;            
    }
    return valid;
}

function validateLevel2Version(data){
	var isValid = false;
    var errors = {};
    var BreakException = {};
    
    var keys = [
                'HL2_ID', 
                'VERSION',
                'HL2_BUDGET_TOTAL',
                'CRT_RELATED',
                'IMPLEMENT_EXECUTION_LEVEL',
                'TEAM_TYPE_ID',
                'ORGANIZATION_ACRONYM',
                'ORGANIZATION_NAME',
                'IN_BUDGET',
                'ALLOW_AUTOMATIC_BUDGET_APPROVAL',
                'HL1_ID'
                ];
    
    var optionalKeys = [
                        'REGION_ID',
                        'SUBREGION_ID',
                        'BUDGET_YEAR_ID',
                        'ACRONYM',
                        'DESCRIPTION'
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
            
            optionalKeys.forEach(function(key) {
    			// validate attribute type
    			isValid = validateVersionType(key, data[key]);
    				if (!isValid) {
    					errors[key] = data[key];
    					throw BreakException;
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

function validateChanges(originalHL2, newHL2){
	var validation = false;
	
	Object.keys(newHL2).forEach(function(key){
		switch(key){
			case 'IN_ORGANIZATION_NAME':
				if(originalHL2.ORGANIZATION_NAME !== newHL2.IN_ORGANIZATION_NAME){
					validation = true;
				}
				break;
			case 'IN_ORGANIZATION_ACRONYM':
				if(originalHL2.ORGANIZATION_ACRONYM !== newHL2.IN_ORGANIZATION_ACRONYM){
					validation = true;
				}
				break;
			case 'IN_HL2_BUDGET_TOTAL':
				if(Number(originalHL2.HL2_BUDGET_TOTAL) !==  Number(newHL2.IN_HL2_BUDGET_TOTAL)){
					validation = true;
				}
				break;
			case 'IN_IMPLEMENT_EXECUTION_LEVEL':
				if(originalHL2.IMPLEMENT_EXECUTION_LEVEL !== newHL2.IN_IMPLEMENT_EXECUTION_LEVEL){
					validation = true;
				}
				break;
			case 'ALLOW_AUTOMATIC_BUDGET_APPROVAL':
				if(originalHL2.ALLOW_AUTOMATIC_BUDGET_APPROVAL !== newHL2.ALLOW_AUTOMATIC_BUDGET_APPROVAL){
					validation = true;
				}
				break;
			case 'IN_CRT_RELATED':
				if(originalHL2.CRT_RELATED !== newHL2.IN_CRT_RELATED){
					validation = true;
				}
				break;
		}
	});

	return validation;
}

function getHistoryDetail(HL_ID, VERSION){
    return dataHl2.getLevel2VersionById(HL_ID, VERSION);
}

function getHistoryAllFirstVersion(hl_id, userSessionID){
    return dataHl2.getLevel2VersionForFilter(hl_id,userSessionID, userbl.isSuperAdmin(userSessionID) );
}

function insertExpectedOutcomes(data, userId) {
    var outcome = {};
    outcome.CREATED_USER_ID = userId;
    outcome.HL2_ID = data.IN_HL2_ID;
    outcome.COMMENTS = data.hl2_expected_outcomes.COMMENTS || "";
    var hl2_expected_outcomes_id = dataExOut.insertHl2ExpectedOutcomes(outcome.HL2_ID, outcome.COMMENTS, outcome.CREATED_USER_ID);

    var arrL2Kpi = [];
    if (data.hl2_expected_outcomes.hl2_expected_outcomes_details && data.hl2_expected_outcomes.hl2_expected_outcomes_details.length) {
        data.hl2_expected_outcomes.hl2_expected_outcomes_details.forEach(function (expectedOutcomeDetail) {
            var objL2Kpi = {};
            objL2Kpi.in_hl2_expected_outcomes_id = hl2_expected_outcomes_id;
            objL2Kpi.in_expected_outcome_level_id = dataExOut.getExpectedOutcomeLevelByLevelAndOptionId(HIERARCHY_LEVEL.HL2, expectedOutcomeDetail.OUTCOMES_ID).EXPECTED_OUTCOME_LEVEL_ID;
            objL2Kpi.in_volume_value = Number(expectedOutcomeDetail.VOLUME_VALUE);
            objL2Kpi.in_euro_value = Number(expectedOutcomeDetail.EURO_VALUE);
            objL2Kpi.in_created_user_id = userId;
            arrL2Kpi.push(objL2Kpi);
        });
        if (arrL2Kpi.length)
            dataExOut.insertHl2ExpectedOutcomesDetail(arrL2Kpi);
    }
}

function updateExpectedOutcomes(data, userId) {
    dataExOut.deleteHl2ExpectedOutcomesDetail(data.IN_HL2_ID, userId);
    dataExOut.deleteHl2ExpectedOutcomes(data.IN_HL2_ID, userId);
    insertExpectedOutcomes(data, userId);
}

function insertHl2FromUpload(hl2, userId){
    var hl1 = dataHl1.getLevel1ById(hl2.PARENT_ID);
    if(!hl1.length)
        throw ErrorLib.getErrors().CustomError("", "uploadService/handlePost/insertHl2FromUpload", L1_MSG_PLAN_NOT_FOUND);

    if (dataHl2.getLevelByAcronymAndOrganizationAcronym(hl1.ACRONYM, hl1.BUDGET_YEAR_ID, hl2.ACRONYM)) {
        throw ErrorLib.getErrors().CustomError("", "uploadService/handlePost/insertHl2FromUpload", L1_MSG_LEVEL_1_EXISTS);
    }

    hl2.IN_IN_BUDGET = 0;//checkBudgetStatus(objLevel2.IN_PLAN_ID, userId, null, objLevel2.IN_HL2_BUDGET_TOTAL);

    var objLevel2={
        IN_HL2_BUDGET_TOTAL: hl2.HL2_BUDGET_TOTAL,
        IN_ORGANIZATION_ACRONYM: hl2.ACRONYM,
        IN_ORGANIZATION_NAME: hl2.ORGANIZATION_NAME,
        IN_IMPLEMENT_EXECUTION_LEVEL: hl2.IMPLEMENT_EXECUTION_LEVEL,
        IN_CRT_RELATED: hl2.CRT_RELATED,
        IN_PLAN_ID: hl2.PARENT_ID,
        IN_IN_BUDGET: 0,
        import_id: hl2.IMPORT_ID,
        imported: 1
    };

    var objhl2 = dataHl2.insertLevel2(objLevel2, userId);

    if (objhl2) {
        if (objhl2 > 0) {
            //if (hl1.TEAM_TYPE_ID == TEAM_TYPE_CENTRAL && objLevel2.contactData && objLevel2.contactData.length)
            //    contactDataLib.insertContactData(objLevel2.contactData, userId, objhl2);

            //INSERT USERS RELATED TO HL2
            hl2.IN_HL2_ID = objhl2;
            var listObjHl2User = hl2.USERS;
            //var listObjHl2Approvers = objLevel2.BUDGET_APPROVERS;

            /******************/
            listObjHl2User = completeUsers(listObjHl2User); //add SA users
            /******************/
            var arrHl2User = [];
            if (listObjHl2User) {
                if (validateHl2User(listObjHl2User)) {
                    for (var i = 0; i < listObjHl2User.length; i++) {
                        arrHl2User.push({
                            in_hl2_id: hl2.IN_HL2_ID
                            ,in_user_id: listObjHl2User[i].IN_USER_ID
                            , in_created_user_id: userId
                        });
                    }

                    if(arrHl2User.length > 0){
                        dataHl2User.insertLevel2User(arrHl2User);
                    }

                    //validate Approvers
                    /*
                    if(validateApprovers(listObjHl2User,listObjHl2Approvers)){

                        budgetApprovers.insertL2BudgetApprover(objLevel2.IN_HL2_ID, listObjHl2Approvers, userId)
                    }else{
                        throw ErrorLib.getErrors().CustomError("","","The Approvers do not match the Assigned Users.")
                    }*/

                }
            }

            insertExpectedOutcomes(hl2, userId);
            return hl2.IN_HL2_ID;
        }
        else
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NO_CREATED);
    }
    else
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/insertHl2", L1_MSG_PLAN_NO_CREATED);

}

function getExpectedOutcomesByHl2Id(hl2Id, hl1Id){
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

    listFromData.forEach(function(hl){
        mapKpi[hl.L2_ACRONYM] = mapKpi[hl.L2_ACRONYM] || { HL2_ID: hl.HL2_ID,  HL1_ID: hl.HL1_ID, ACRONYM: hl.L2_ACRONYM, IS_LOCKED: hl.IS_LOCKED };
        var auxKpi = mapKpi[hl.L2_ACRONYM].kpi || [];
        if(hl.KPI_TYPE_NAME) {
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
    result.out_result = Object.keys(mapKpi).map(function (e){ return mapKpi[e]});
    return result;
}

function validateCategoryOption(data) {
    if (!data.hl2_category || !data.hl2_category.length)
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_CATEGORY_NOT_EMPTY);

    if (!data.IN_HL2_ID && data.hl2_category.length !== dataCategory.getAllocationCategoryCountByHlId("hl2"))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_CATEGORY_INCORRECT_NUMBER);
    var percentagePerOption = 0;
    for (var i = 0; i < data.hl2_category.length; i++) {
        var hl2Category = data.hl2_category[i];

        if (!hl2Category.CATEGORY_ID || !Number(hl2Category.CATEGORY_ID))
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_CATEGORY_NOT_VALID);

        if (!hl2Category.hl2_category_option || !hl2Category.hl2_category_option.length)
            throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_CATEGORY_OPTIONS_NOT_EMPTY);

        // if (!data.IN_HL2_ID && hl2Category.hl2_category_option.length !== dataOption.getAllocationOptionCountByCategoryIdLevelId(hl2Category.CATEGORY_ID, 'hl1'))
        //     throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_CATEGORY_OPTIONS_INCORRECT_NUMBER);

        hl2Category.hl2_category_option.forEach(function (option) {
            if (!option.OPTION_ID || !Number(option.OPTION_ID))
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_CATEGORY_OPTION_NOT_VALID);
            if ((parseFloat(option.AMOUNT) && !Number(option.AMOUNT)) || Number(option.AMOUNT) > 100 || Number(option.AMOUNT) < 0)
                throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", "Option value is not valid (actual value " + option.AMOUNT + ")");

            percentagePerOption = percentagePerOption + Number(option.AMOUNT || 0);
        });
    }

    if ((Number(data.IN_HL2_BUDGET_TOTAL) == 0) && percentagePerOption != 0) {
        throw ErrorLib.getErrors().CustomError("", "hl1Services/handlePost/validateCategoryOption", L1_BUDGET_ZERO_CATEGORY_TOTAL_PERCENTAGE_ZERO);
    }

    if ((Number(data.IN_HL2_BUDGET_TOTAL) > 0) && percentagePerOption != 100) {
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/validateCategoryOption", L1_CATEGORY_TOTAL_PERCENTAGE);
    }

    return true;
}

function getCategoryOption(hl2_id) {
    var hl2Categories = dataCategoryOptionLevel.getAllocationCategory(hl2_id, 'hl2');
    var result = [];
    if (hl2Categories && hl2Categories.length) {
        var allocationOptions = util.getAllocationOptionByCategoryAndLevelId('hl2', hl2_id);
        hl2Categories.forEach(function (catgory) {
            var aux = util.extractObject(catgory);
            var hl2Category = {};
            aux.hl2_category_option = allocationOptions[aux.CATEGORY_ID];
            hl2Category.hl2_category_option = [];
            Object.keys(aux).forEach(function (key) {
                if (key === "hl2_category_option") {
                    for (var i = 0; i < aux[key].length; i++) {
                        var option = {};
                        Object.keys(aux[key][i]).forEach(function (auxKey) {
                            option[auxKey] = aux[key][i][auxKey];
                        });
                        hl2Category.hl2_category_option.push(option);
                    }
                } else {
                    hl2Category[key] = aux[key];
                }
            });
            result.push(hl2Category);
        });
    } else {
        result = allocationCategory.getCategoryByHierarchyLevelId(HIERARCHY_LEVEL.HL2).results;
    }
    return {result: result};
}

function insertCategoryOption(data, userId) {
    var categoryOptionBulk = [];
    // var mapAvailableCOL = util.getMapAvailableCategoryOptionByLevel('hl2');
    var mapCOL = util.getMapCategoryOption('hl2');

    data.hl2_category.forEach(function (hl2Category) {
        hl2Category.hl2_category_option.forEach(function (hl2CategoryOption) {
            // hl2Category.categoryOptionLevelId = mapAvailableCOL[hl2Category.CATEGORY_ID][hl2CategoryOption.OPTION_ID];
            hl2Category.categoryOptionLevelId = mapCOL[hl2Category.CATEGORY_ID][hl2CategoryOption.OPTION_ID];
            // if(hl2Category.categoryOptionLevelId) {
            categoryOptionBulk.push({
                in_hl2_id: data.IN_HL2_ID
                , in_category_option_level_id: hl2Category.categoryOptionLevelId
                , in_amount: hl2CategoryOption.AMOUNT || 0
                , in_user_id: userId
                , in_updated: 0
            });
            // }
        });
    });
    dataCategoryOptionLevel.insertCategoryOption(categoryOptionBulk, 'hl2');

    return true;
}

function updateCategoryoption(data, userId) {
    var insertBulk = [];
    var updateBulk = [];
    // var deleteBulk = [];
    // var mapAvailableCOL = util.getMapAvailableCategoryOptionByLevel('hl2');
    var mapCOL = util.getMapCategoryOption('hl2');
    data.hl2_category.forEach(function (hl2Category) {
        hl2Category.hl2_category_option.forEach(function (hl2CategoryOption) {
            // hl2Category.categoryOptionLevelId = mapAvailableCOL[hl2Category.CATEGORY_ID][hl2CategoryOption.OPTION_ID];
            hl2Category.categoryOptionLevelId = mapCOL[hl2Category.CATEGORY_ID][hl2CategoryOption.OPTION_ID];
            // if(hl2Category.categoryOptionLevelId){
            var categoryOption = {
                in_category_option_level_id: hl2Category.categoryOptionLevelId
                , in_amount: hl2CategoryOption.AMOUNT || 0
                , in_user_id: userId
                , in_updated: 0
                , in_hl2_id: data.IN_HL2_ID
            };
            if (!hl2CategoryOption.HL2_CATEGORY_OPTION_ID) {
                categoryOption.in_hl2_id = data.IN_HL2_ID;
                insertBulk.push(categoryOption);
            } else {
                updateBulk.push(categoryOption);
            }
            /*} else {
                var categoryOptionLevelId = mapCOL[hl2Category.CATEGORY_ID][hl2CategoryOption.OPTION_ID];
                deleteBulk.push({
                    in_category_option_level_id: categoryOptionLevelId
                    , in_user_id: userId
                    , in_hl2_id: data.HL2_ID
                });
            }*/
        });
    });

    if (updateBulk && updateBulk.length)
        dataCategoryOptionLevel.updateCategoryOption(updateBulk, 'hl2');

    if (insertBulk && insertBulk.length)
        dataCategoryOptionLevel.insertCategoryOption(insertBulk, 'hl2');

    // if (deleteBulk && deleteBulk.length)
    //     dataCategoryOptionLevel.deleteCategoryOption(deleteBulk, 'hl2');

    return true;
}

function checkOverBudget(hl1Id, hl1Budget, hl2Budget, hl2Id){
    var hl1BudgetAllocated = dataHl1.getHl1AllocatedBudget(hl1Id, hl2Id || 0);

    if(!!Number(hl2Budget) && (Number(hl2Budget) > Number(hl1Budget) - Number(hl1BudgetAllocated)))
        throw ErrorLib.getErrors().CustomError("", "hl2Services/handlePost/checkOverBudget", L1_MSG_OVER_BUDGET);

    return true;
}

function getCarryOverHl1CategoryOption(hl1_id) {
    var hl1_category = JSON.parse(JSON.stringify(blLevel1.getCategoryOption(hl1_id).result));
    var hl2_category = JSON.parse(JSON.stringify(allocationCategory.getCategoryByHierarchyLevelId(HIERARCHY_LEVEL['HL2']).results));
    hl2_category = hl2_category.map(function (category) {
        category.hl2_category_option = JSON.parse(JSON.stringify(dataCategoryOptionLevel.getAllocationOptionByCategoryAndLevel(category.CATEGORY_ID, 'hl2')));
        return category;
    });

    return hl2_category.map(function (category) {
        var hl1Cat = extractElementByList(hl1_category, "CATEGORY_ID", category.CATEGORY_ID);
        if (hl1Cat) {
            category.CATEGORY_NAME = category.NAME;
            category.hl2_category_option.map(function (option) {
                var hl1option = extractElementByList(hl1Cat.hl1_category_option, "OPTION_ID", option.OPTION_ID);
                option.AMOUNT = hl1option ? hl1option.AMOUNT : 0;
                option.NAME = option.OPTION_NAME;
                return option;
            });
        }
        category.Options = undefined;
        return category;
    });
}

function extractElementByList(list, criterion, value) {
    for (var i = 0; i < list.length; i++) {
        if (list[i][criterion] == value) return list[i];
    }

    return null;
}