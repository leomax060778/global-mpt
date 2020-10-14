/** *************Import Library****************** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dbUser = mapper.getDataUser();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var mail = mapper.getMail();
var db = mapper.getdbHelper();
var dbUserRole = mapper.getDataUserRole();
var RoleLib = mapper.getRole();
var config = mapper.getDataConfig();
var businessLavel3 = mapper.getLevel3();
var dataHl1User = mapper.getDataLevel1User();
var dataHl2User = mapper.getDataLevel2User();
var dataHl3User = mapper.getDataLevel3User();
var dataHl1 = mapper.getDataLevel1();
var dataHl2 = mapper.getDataLevel2();
var dataHl3 = mapper.getDataLevel3();
var userMail = mapper.getUserMail();
var dataProtectionLib = mapper.getDataProtection();
/** ********************************************** */

var DATA_NOT_FOUND = "Data is missing.";
var USER_NOT_FOUND = "User was not found.";
var PERMISSIONS_NOT_FOUND = "Permissions cannot be empty.";
var HIERARCHY_LEVEL_NOT_FOUND = "Hierarchy level was not found.";
var INVALID_HIERARCHY_LEVEL_NUMBER = "Invalid Hierarchy level.";
var NOT_PERMISSION_PARENT_LEVEL = "User should have permission for parent level.";
var L1_MSG_PLAN_NOT_FOUND = "The Plan can not be found.";
var L2_MSG_PLAN_NOT_FOUND = "The Plan to new Priority/Sub-Team can not be found.";
var L3_MSG_TEAM_NOT_FOUND = "The Priority/Sub-Team can not be found.";

var defaultPassword = config.getDefaultPassword();

var roleMap = {
    SuperAdmin: 1,
    Admin: 2,
    DataEntry: 3,
    CampaignManager: 4
};

function getAll() {
    return dbUser.getAllUser();
}

function getAllUserByUserName(userName) {
    if (!userName) {
        throw ErrorLib.getErrors().BadRequest("The Parameter User Name is not found",
            "userServices/handleGet/getAllUserByUserName", userName);
    }

    return dbUser.getAllUserByUserName(userName);
}

function getUserById(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserById", id);
    return dbUser.getUserById(id);
}

function getUserApproversByHL1Id(id) {
    if (!id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserApproversByHL1Id", id);
    return dbUser.getUserApproversByHl1Id(id);
}

function getUserByUserName(userName) {
    if (!userName)
        throw ErrorLib.getErrors().BadRequest("The Parameter userName is not found",
            "userServices/handleGet/getUserByUserName", userName);
    return dbUser.getUserByUserName(userName);
}

function getUserByEmail(email) {
    return dbUser.getUserByEmail(email);
}

function getUserByHl1Id(hl1Id) {
    if (!hl1Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserByHl1Id", hl1Id);
    return dbUser.getUserByHl1Id(hl1Id);

}

function getUserByHl2Id(hl2Id) {
    if (!hl2Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserByHl2Id", hl2Id);
    return dbUser.getUserByHl2Id(hl2Id);

}

function getUserByHl3Id(hl3Id, hl2Id) {
    if (!hl3Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserByHl3Id", hl3Id);

    return dbUser.getUserByHl3Id(hl3Id, hl2Id);

}

function getUserByHl2IdToNewL3(hl2Id) {
    if (!hl2Id)
        throw ErrorLib.getErrors().BadRequest("The Parameter ID is not found",
            "userServices/handleGet/getUserByHl2IdToNelL3", hl2Id);
    return dbUser.getUserByHl2IdToNewL3(hl2Id);
}

function getParseCollection(data, userId) {
    var arrPermissionInsertL1 = [];
    var arrPermissionDeleteL1 = [];
    var arrPermissionInsertL2 = [];
    var arrPermissionDeleteL2 = [];
    var arrPermissionInsertL3 = [];
    var arrPermissionDeleteL3 = [];

    var arrPermissionInsertL2AndAllChildren = [];
    var arrPermissionDeleteL2AndAllChildren = [];
    var arrPermissionInsertL1AndAllChildren = [];
    var arrPermissionDeleteL1AndAllChildren = [];

    if (!data)
        throw ErrorLib.getErrors().CustomError("", "", DATA_NOT_FOUND);

    Object.keys(data).forEach(function (keyL1) {
        var objPerm = {};
        //ask how is first level
        var nodeL1 = data[keyL1];
        nodeValidation(nodeL1); //validate L1

        if (nodeL1.NODES && Object.keys(nodeL1.NODES).length) {            //L1 has children
            var L2Collection = nodeL1.NODES;
            Object.keys(L2Collection).forEach(function (keyL2) {
                var nodeL2 = L2Collection[keyL2];
                nodeValidation(nodeL2, nodeL1.LEVEL_ID);    //validate L2 node and his parent

                if (nodeL2.NODES && Object.keys(nodeL2.NODES).length) {    //L2 has children
                    var L3Collection = nodeL2.NODES;
                    Object.keys(L3Collection).forEach(function (keyL3) {
                        var nodeL3 = L3Collection[keyL3];
                        nodeValidation(nodeL3, nodeL2.LEVEL_ID);    //validate L3 node and his parent

                        if (nodeL3.PERMISSION){
                            //check id already exist into HL2_USER
                            if (!dbUser.existsHlUserPair(nodeL3.USER_ID, nodeL3.LEVEL_ID, nodeL3.LEVEL)) {
                                arrPermissionInsertL3.push(parseObjectForArray(nodeL3, userId));
                            }
                        } else {
                            arrPermissionDeleteL3.push(parseObjectForArray(nodeL3, userId, true));
                        }
                    });
                    if (nodeL2.PERMISSION){
                        //check id already exist into HL2_USER
                        if (!dbUser.existsHlUserPair(nodeL2.USER_ID, nodeL2.LEVEL_ID, nodeL2.LEVEL)) {
                            arrPermissionInsertL2.push(parseObjectForArray(nodeL2, userId)); //add L2 and all L3 children
                        }
                    }
                    else{
                        arrPermissionDeleteL2.push(parseObjectForArray(nodeL2, userId, true)); //delete L2
                    }
                } else {
                    //L2 has not children
                    //if L2 has PERMISSION then insert All child
                    //else (L2 has no PERMISSION) then delete All child
                    if (nodeL2.PERMISSION){
                        //check id already exist into HL2_USER
                        arrPermissionInsertL2AndAllChildren.push(parseObjectForArray(nodeL2, userId)); //add L2 and all L3 children
                    } else {
                        arrPermissionDeleteL2AndAllChildren.push(parseObjectForArray(nodeL2, userId)); //delete L2 and all L3 children
                    }
                }
            });
            if (nodeL1.PERMISSION){
                //check id already exist into HL1_USER
                if (!dbUser.existsHlUserPair(nodeL1.USER_ID, nodeL1.LEVEL_ID, nodeL1.LEVEL)) {
                    arrPermissionInsertL1.push(parseObjectForArray(nodeL1, userId)); //add L1
                }
            }
            else{
                arrPermissionDeleteL1.push(parseObjectForArray(nodeL1, userId, true)); //delete L1
            }
        }
        else{
            //insert L1 decendents (L2 and L3)
            // if L1 has PERMISSION then insert All child (L2 & L3)
            // else (L1 has no PERMISSION) then delete All child (L2 & L3)
            if (nodeL1.PERMISSION){
                //check id already exist into HL1_USER
                arrPermissionInsertL1AndAllChildren.push(parseObjectForArray(nodeL1,userId));
            }
            else {
                arrPermissionDeleteL1AndAllChildren.push(parseObjectForArray(nodeL1,userId));
            }
        }
    });

    if (arrPermissionDeleteL1AndAllChildren.length > 0){
        deleteLevelUserDecendants(arrPermissionDeleteL1AndAllChildren, 1, arrPermissionDeleteL1AndAllChildren[0].in_user_id, userId);
    }
    if (arrPermissionInsertL1AndAllChildren.length > 0){
        insertLevelUserDecendants(arrPermissionInsertL1AndAllChildren, 1, arrPermissionInsertL1AndAllChildren[0].in_user_id, userId);
    }

    if (arrPermissionDeleteL2AndAllChildren.length > 0){
        deleteLevelUserDecendants(arrPermissionDeleteL2AndAllChildren, 2, arrPermissionDeleteL2AndAllChildren[0].in_user_id, userId);
    }
    if (arrPermissionInsertL2AndAllChildren.length > 0){
        insertLevelUserDecendants(arrPermissionInsertL2AndAllChildren, 2, arrPermissionInsertL2AndAllChildren[0].in_user_id, userId);
    }

    if (arrPermissionInsertL1.length > 0)
        dbUser.insertLevelUser(arrPermissionInsertL1, 1);
    if (arrPermissionInsertL2.length > 0)
        dbUser.insertLevelUser(arrPermissionInsertL2, 2);
    if (arrPermissionInsertL3.length > 0)
        dbUser.insertLevelUser(arrPermissionInsertL3, 3);

    if (arrPermissionDeleteL1.length > 0)
        dbUser.deleteLevelUser(arrPermissionDeleteL1, 1);
    if (arrPermissionDeleteL2.length > 0)
        dbUser.deleteLevelUser(arrPermissionDeleteL2, 2);
    if (arrPermissionDeleteL3.length > 0)
        dbUser.deleteLevelUser(arrPermissionDeleteL3, 3);


    return {arrPermissionInsertL1:arrPermissionInsertL1, arrPermissionDeleteL1: arrPermissionDeleteL1
        , arrPermissionInsertL2:arrPermissionInsertL2, arrPermissionDeleteL2: arrPermissionDeleteL2
        , arrPermissionInsertL3:arrPermissionInsertL3, arrPermissionDeleteL3:arrPermissionDeleteL3
        , arrPermissionInsertL1AndAllChildren: arrPermissionInsertL1AndAllChildren, arrPermissionDeleteL1AndAllChildren:arrPermissionDeleteL1AndAllChildren
        , arrPermissionInsertL2AndAllChildren: arrPermissionInsertL2AndAllChildren, arrPermissionDeleteL2AndAllChildren:arrPermissionDeleteL2AndAllChildren
    };
}

function deleteLevelUserDecendants(arrNodes, level, user_id, sessionUserId) {
    dbUser.deleteLevelUserDecendants(arrNodes, level, user_id, sessionUserId);
}

function insertLevelUserDecendants(arrNodes, level, user_id, sessionUserId) {
    dbUser.deleteLevelUserDecendants(arrNodes, level, user_id, sessionUserId);
    dbUser.insertLevelUserDecendants(arrNodes, level, user_id, sessionUserId);
}

function parseObjectForArray(node, userId, forDelete) {
    var objectToArray = {};
    var hl_id = "in_hl" + node.LEVEL + "_id";
    objectToArray[hl_id] = node.LEVEL_ID;
    objectToArray.in_user_id = node.USER_ID;
    if(!forDelete) {
        objectToArray.in_created_user_id = userId;
    }
    return objectToArray;
}

function userLevelPermission(data, userId) {
    return getParseCollection(data, userId);

/*
    validate(data);


    var arrPermissionInsertL1 = [];
    var arrPermissionDeleteL1 = [];
    var arrPermissionInsertL2 = [];
    var arrPermissionDeleteL2 = [];
    var arrPermissionInsertL3 = [];
    var arrPermissionDeleteL3 = [];
    data.forEach(function (PERMISSIONS) {
        var objPerm = {};
        var hl_id = "in_hl" + PERMISSIONS.LEVEL + "_id";
        objPerm[hl_id] = PERMISSIONS.LEVEL_ID;
        objPerm.in_user_id = PERMISSIONS.USER_ID;

        switch (PERMISSIONS.LEVEL) {
            case 1:
                if (PERMISSIONS.PERMISSION) {
                    objPerm.in_created_user_id = userId;
                    if (!dbUser.existsHlUserPair(PERMISSIONS.USER_ID, PERMISSIONS.LEVEL_ID, PERMISSIONS.LEVEL))
                        arrPermissionInsertL1.push(objPerm);
                } else {
                    arrPermissionDeleteL1.push(objPerm);
                }
                break;
            case 2:
                if (PERMISSIONS.PERMISSION) {
                    objPerm.in_created_user_id = userId;
                    if (!dbUser.existsHlUserPair(PERMISSIONS.USER_ID, PERMISSIONS.LEVEL_ID, PERMISSIONS.LEVEL))
                        arrPermissionInsertL2.push(objPerm);
                } else {
                    arrPermissionDeleteL2.push(objPerm);
                }
                break;
            case 3:
                if (PERMISSIONS.PERMISSION) {
                    objPerm.in_created_user_id = userId;
                    if (!dbUser.existsHlUserPair(PERMISSIONS.USER_ID, PERMISSIONS.LEVEL_ID, PERMISSIONS.LEVEL))
                        arrPermissionInsertL3.push(objPerm);
                } else {
                    arrPermissionDeleteL3.push(objPerm);
                }
                break;
        }
    });

    if (arrPermissionInsertL1.length > 0)
        dbUser.insertLevelUser(arrPermissionInsertL1, 1);
    if (arrPermissionInsertL2.length > 0)
        dbUser.insertLevelUser(arrPermissionInsertL2, 2);
    if (arrPermissionInsertL3.length > 0)
        dbUser.insertLevelUser(arrPermissionInsertL3, 3);

    if (arrPermissionDeleteL1.length > 0)
        dbUser.deleteLevelUser(arrPermissionDeleteL1, 1);
    if (arrPermissionDeleteL2.length > 0)
        dbUser.deleteLevelUser(arrPermissionDeleteL2, 2);
    if (arrPermissionDeleteL3.length > 0)
        dbUser.deleteLevelUser(arrPermissionDeleteL3, 3);
    return data;
    */
}


function nodeValidation(node, parentId) {
    if (!node.USER_ID || !Number(node.USER_ID))
        throw ErrorLib.getErrors().CustomError("", "", USER_NOT_FOUND);

    if (!node.LEVEL || !Number(node.LEVEL))
        throw ErrorLib.getErrors().CustomError("", "", INVALID_HIERARCHY_LEVEL_NUMBER);

    if (!node.LEVEL_ID || !Number(node.LEVEL_ID))
        throw ErrorLib.getErrors().CustomError("", "", HIERARCHY_LEVEL_NOT_FOUND);


    if (!node.LEVEL_ID || !Number(node.LEVEL_ID))
        throw ErrorLib.getErrors().CustomError("", "", HIERARCHY_LEVEL_NOT_FOUND);

    if (!node.LEVEL || !Number(node.LEVEL) || node.LEVEL < 1 || node.LEVEL > 3)
        throw ErrorLib.getErrors().CustomError("", "", INVALID_HIERARCHY_LEVEL_NUMBER);

    switch (node.LEVEL) {
        case 1:
            var hl1 = dataHl1.getLevel1ById(node.LEVEL_ID);
            if (!hl1.length)
                throw ErrorLib.getErrors().ImportError("", "", L1_MSG_PLAN_NOT_FOUND);

            break;
        case 2:
            var hl2 = dataHl2.getLevel2ById(node.LEVEL_ID);
            if (!hl2 || !hl2.HL2_ID)
                throw ErrorLib.getErrors().CustomError("", "", L2_MSG_PLAN_NOT_FOUND);

            if (hl2.HL1_ID !== parentId)
                throw ErrorLib.getErrors().CustomError("", "", NOT_PERMISSION_PARENT_LEVEL);

            break;
        case 3:
            var hl3 = dataHl3.getLevel3ById(node.LEVEL_ID);
            if (!hl3)
                throw ErrorLib.getErrors().CustomError("", "", L3_MSG_TEAM_NOT_FOUND);

            if (hl3.HL2_ID !== parentId)
                throw ErrorLib.getErrors().CustomError("", "", NOT_PERMISSION_PARENT_LEVEL);

            break;
    }
}

function validate(data) {

    if (!data)
        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", DATA_NOT_FOUND);

    data.forEach(function (user) {
        if (!user.USER_ID || !Number(user.USER_ID))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", USER_NOT_FOUND);


        if (!user.LEVEL || !Number(user.LEVEL))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", INVALID_HIERARCHY_LEVEL_NUMBER);

        if (!user.LEVEL_ID || !Number(user.LEVEL_ID))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", HIERARCHY_LEVEL_NOT_FOUND);


        if (!user.LEVEL_ID || !Number(user.LEVEL_ID))
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", HIERARCHY_LEVEL_NOT_FOUND);

        if (!user.LEVEL || !Number(user.LEVEL) || user.LEVEL < 1 || user.LEVEL > 3)
            throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", INVALID_HIERARCHY_LEVEL_NUMBER);

        if (user.PERMISSION) {
            var objLevel = {};
            var level2Id = null;
            switch (user.LEVEL) {
                case 3:
                    objLevel.IN_HL3_ID = user.LEVEL_ID;
                    var hl3 = dataHl3.getLevel3ById(objLevel.IN_HL3_ID);
                    var level2 = data.filter(function (permission) {
                        return permission.LEVEL_ID == hl3.HL2_ID;
                    });
                    if (!level2.length) {
                        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", NOT_PERMISSION_PARENT_LEVEL);
                    }
                    level2Id = hl3.HL2_ID;
                case 2:
                    objLevel.IN_HL2_ID = level2Id || user.LEVEL_ID;
                    var hl2 = dataHl2.getLevel2ById(objLevel.IN_HL2_ID);

                    var level1 = data.filter(function (permission) {
                        return permission.LEVEL_ID == hl2.HL1_ID;
                    });
                    if (!level1.length) {
                        throw ErrorLib.getErrors().CustomError("", "hl5Services/handlePost/insertHl5", NOT_PERMISSION_PARENT_LEVEL);
                    }

                    break;
            }
        }
    });

    return data;
}

function insertUser(user, createUser) {
    if (!user.PASSWORD && !user.USE_DEFAULT_PASSWORD)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The PASSWORD is not found");

    if (!user.CONFIRM_PASSWORD && !user.USE_DEFAULT_PASSWORD)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The CONFIRM_PASSWORD is not found");

    if (!user.ROLE_ID)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The ROLE_ID is not found");

    try {
        var outUserId = null;
        var transactionDone = false;
        var userPassHashed = null;
        var userPassword = null;

        user.USER_NAME = user.USER_NAME.trim();
        user.FIRST_NAME = user.FIRST_NAME.trim();
        user.LAST_NAME = user.LAST_NAME.trim();
        user.EMAIL = user.EMAIL.trim();
        if (user.PHONE) {
            user.PHONE = user.PHONE.trim();
        }
        user.PASSWORD = user.PASSWORD ? user.PASSWORD.trim() : '';
        user.CONFIRM_PASSWORD = user.CONFIRM_PASSWORD ? user.CONFIRM_PASSWORD.trim() : '';

        // validate user
        if (validateUser(user)) {
            if (getUserByUserName(user.USER_NAME)) {
                throw ErrorLib.getErrors().CustomError("",
                    "userServices/handlePost/insertUser", "The User Name already exists");
            }

            if (getUserByEmail(user.EMAIL)) {
                throw ErrorLib.getErrors().CustomError("",
                    "userServices/handlePost/insertUser", "Another user with the same email already exists");
            }
            // Hash password
            userPassword = !user.USE_DEFAULT_PASSWORD
            && validatePassword(user.PASSWORD) ? user.PASSWORD
                : defaultPassword;
            userPassHashed = dbUser.getPasswordHash(userPassword);

            if (userPassHashed.length > 0) {
                // insert user
                var outUserId = dbUser.insertUser(user, createUser);

                if (outUserId) {
                    // set user password
                    var resultUpdPass = dbUser.updatePass(outUserId,
                        userPassHashed[0].HASH, "", createUser);

                    // Insert user role
                    var resultInsUserRole = dbUserRole.insertUserRole(
                        outUserId, user.ROLE_ID, createUser);

                    // check if transaction was completed
                    transactionDone = !!outUserId && !!resultUpdPass
                        && !!resultInsUserRole;
                }

                if (transactionDone) {
                    db.commit();
                    try {
                        notifyInsertByEmail(user.EMAIL, user.USER_NAME, userPassword);
                    } catch (e) {
                        throw ErrorLib.getErrors().MailError("", e, "The user was created, but the notification email failed to be sent.");
                    }

                } else {
                    db.rollback();
                }
                return outUserId;
            }
        }
    } catch (e) {
        db.rollback();
        throw e;
    } finally {
        db.closeConnection();
    }
}

function updateUser(user, updateUser) {

    user.USER_NAME = user.USER_NAME ? user.USER_NAME.trim() : null;
    user.FIRST_NAME = user.FIRST_NAME ? user.FIRST_NAME.trim() : null;
    user.LAST_NAME = user.LAST_NAME ? user.LAST_NAME.trim() : null;
    user.EMAIL = user.EMAIL ? user.EMAIL.trim() : null;
    user.PHONE = user.PHONE ? user.PHONE.trim() : null;
    user.DATA_PROTECTION_ENABLED = user.DATA_PROTECTION_ENABLED ? 1 : 0;

    if (!user.USER_ID)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/updateUser",
            "The USER_ID is not found");

    if (!util.validateIsNumber(user.USER_ID))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/updateUser", "The USER_ID is invalid");

    var userByUserName = getUserByUserName(user.USER_NAME);
    if (userByUserName && userByUserName.USER_ID != user.USER_ID) {
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The User Name already exists");
    }

    var userByEmail = getUserByEmail(user.EMAIL);
    if (userByEmail && userByEmail.USER_ID != user.USER_ID) {
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "Another user with the same email already exists");
    }

    try {
        var updUserId = null;
        var transactionDone = false;

        // insert user
        updUserId = dbUser.updateUser(user, updateUser);

        if (user.DATA_PROTECTION_ENABLED) {
            dataProtectionLib.insertUserDataProtection(user.USER_ID, updateUser);
        }

        if (updUserId) {
            // Update user role
            var resultUserRole = dbUserRole.updateUserRoleByUserId(
                user.USER_ID, user.ROLE_ID, updateUser);

            // check if transaction was completed
            transactionDone = !!updUserId && !!resultUserRole;
        }

        // check transaction status
        if (transactionDone) {
            db.commit();
        } else {
            db.rollback();
        }
        return updUserId;
    } catch (e) {
        db.rollback();
        throw e;
    } finally {
        db.closeConnection();
    }
}

function updateDataProtection(dataProtection, userId, userSession) {
    return dbUser.updateDataProtection(dataProtection, userId, userSession);
}

function updateUserWithMask(userId, userSession) {
    var mask = config.getDataProtectionMask();

    return dbUser.updateUserWithMask(mask, userId, userSession);
}

function restoreUser(reqBody, userId) {
    if (!reqBody.USER_ID || !userId) {
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePut/restoreUser", "The USER is not found");
    }

    return dbUser.restoreUser(reqBody, userId);
}

function deleteUser(data, deleteUser) {
    if (!data.USER_IDS) {
        data.USER_IDS = [data.USER_ID];
    }

    var users = data.USER_IDS.map(function (userId) {
        return {'in_user_id': userId}
    });

    dbUser.deleteUser(users, deleteUser);

    return true;
}

function updateUserPassword(value, modUser) {
    if (!value)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The USER is not found");
    if (!value.USER_ID)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The USER_ID is not found");
    if (!value.PASSWORD)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The PASSWORD is not found");

    if (validatePassword(value.PASSWORD)) {
        var userPassHashed = dbUser.getPasswordHash(value.PASSWORD);
        return dbUser.updatePass(value.USER_ID, userPassHashed.HASH,
            value.PASSWORD_SALT, modUser);
    }
}

function updateUserPasswordHashed(value, modUser) {
    if (!value)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The USER is not found");
    if (!value.USER_ID)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The USER_ID is not found");
    if (!value.PASSWORD)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The PASSWORD is not found");
    var resultUpdPass = dbUser.updatePass(value.USER_ID, value.PASSWORD,
        value.PASSWORD_SALT, modUser);

    // check if transaction was completed
    if (!!resultUpdPass) {
        db.commit();

        // TODO: notify user via email with a link to set the password
        // again
    } else {
        db.rollback();
    }
    return resultUpdPass;

}

function resetPassword(user, modUser) {

    if (!user)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The USER is not found");
    if (!user.USER_ID)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The USER_ID is not found");

    // Password is reset to default password
    try {
        var userPassHashed = null;
        var resultUpdPass = null;

        // Hash password
        userPassHashed = dbUser.getPasswordHash(defaultPassword);

        if (userPassHashed.length > 0) {
            // set user password
            resultUpdPass = dbUser.updatePass(user.USER_ID,
                userPassHashed[0].HASH, "", modUser);

            // check if transaction was completed
            if (!!resultUpdPass) {
                db.commit();

                // TODO: notify user via email with a link to set the password
                // again
            } else {
                db.rollback();
            }
            return resultUpdPass;
        }

    } catch (e) {
        db.rollback();
        throw e;
    } finally {
        db.closeConnection();
    }
}

function getUserByRoleId(id) {
    return dbUser.getUserByRoleId(id);
}

function validatePassword(pass) {
    // TODO: set regex to validate pass
    // Business rules: SAP wants to set the default password and it might be 6
    // letters
    // New passwords must be 6 letters (and/or numbers and/or most special
    // characters) in length
    /*if (!util.validateLength(pass, 15, 6, 'PASSWORD') || !util.validateIsPassword(pass))
        throw ErrorLib.getErrors()
            .CustomError("", "userServices/handlePost/insertUser",
                "The PASSWORD is invalid");*/
    util.validateLength(pass, 15, 6, 'PASSWORD');
    util.validateIsPassword(pass);

    return true;
}

function validateUser(user) {
    if (!user)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "User is not found");

    if (!user.USER_NAME)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "USER_NAME is not found");

    if (!user.FIRST_NAME)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The FIRST_NAME is not found");

    if (!user.LAST_NAME)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The LAST_NAME is not found");

    if (!user.EMAIL)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The EMAIL is not found");

    if (!util.validateLength(user.USER_NAME, 255, 1, "User Name")
        || !util.validateIsString(user.USER_NAME))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The USER_NAME is invalid");

    if (!util.validateLength(user.FIRST_NAME, 255, 1, "First Name")
        || !util.validateIsString(user.FIRST_NAME))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The FIRST_NAME is invalid");

    if (!util.validateLength(user.LAST_NAME, 255, 1, "Last Name")
        || !util.validateIsString(user.LAST_NAME))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The LAST_NAME is invalid");

    if (!util.validateIsEmail(user.EMAIL))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The EMAIL is invalid");

    if (user.PHONE && user.PHONE.trim() && !util.validateLength(user.PHONE, 255, 0, "Phone"))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The PHONE is invalid");

    return true;
}

function notifyInsertByEmail(TO, username, password) {
    var basicData = {};
    var reqBody = {};

    basicData.ENVIRONMENT = config.getMailEnvironment();
    basicData.APP_URL = config.getLoginUrl();
    basicData.SITE_ADMIN_ACCOUNT = config.getSiteAdminAccount();

    reqBody.USERNAME = username;
    reqBody.PASSWORD = password;

    var userMailObj = userMail.parseNotifyCreateUser(reqBody, basicData, "Colleague");

    var mailObject = mail.getJson([{
        "address": TO
    }], userMailObj.subject, userMailObj.body);

    mail.sendMail(mailObject, true);
}

function isSuperAdmin(userId) {
    var rol = dbUserRole.getUserRoleByUserId(userId);

    return (rol && rol.length > 0 && rol[0].ROLE_ID == roleMap.SuperAdmin);
}

function isAdmin(userId) {
    var rol = dbUserRole.getUserRoleByUserId(userId);

    return (rol && rol.length > 0 && rol[0].ROLE_ID == roleMap.Admin);
}

function getPermissionForLevelByUser(level, levelId, userId) {
    return dbUser.getPermissionForLevelByUser(level, levelId, userId);
}

function getPermissionForLevelByUserBudgetYearId(level, levelId, budgetYearId, userId) {
    return dbUser.getPermissionForLevelByUserBudgetYearId(level, levelId, budgetYearId, userId);
}

//Verify if the user is in the HL2 Budget Approver list
function validateHL2BudgetApproverByUserId(HL2Id, userId) {
    if (!HL2Id) {
        throw ErrorLib.getErrors().BadRequest("The Parameter HL2Id is not found",
            "/validateHL2BudgetApprover", HL2Id);
    }

    if (!userId) {
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
            "/validateHL2BudgetApprover", userId);
    }

    var userList = getUserByHl2Id(HL2Id);
    var approversList = userList.users_in;
    var listLengh = approversList.length;

    //Check if the HL2 has any approver
    if (listLengh > 0) {
        //Search the user ID in the list of Approvers
        for (var i = 0; i < listLengh; i++) {
            if (Number(approversList[i]["USER_ID"]) === Number(userId)) return true;
        }
    }

    return false;
}

/**
 * Specific to Upload
 * @param {string} user_name
 * @returns {user}
 */
function getByName(user_name) {
    return this.getUserByUserName(user_name);
}

/**
 * Specific to Upload
 * @param entity
 * @param userId
 */
function insertEntity(entity, userId) {

    var user = {};
    user.USER_NAME = entity.IN_NAME;
    user.FIRST_NAME = entity.IN_FIRST_NAME;
    user.LAST_NAME = entity.IN_LAST_NAME;
    user.EMAIL = entity.IN_EMAIL;
    user.PHONE = entity.IN_PHONE;
    user.USE_DEFAULT_PASSWORD = 1;
    user.ROLE_ID = RoleLib.getRoleByName(entity.IN_ROLE_NAME).ROLE_ID || "";
    return insertUser(user, userId);
}

/**
 * Specific to Upload
 * @param entity
 * @param userId
 */
function updateEntity(entity, userId) {
    var user = {};
    user.USER_ID = getUserByUserName(entity.IN_NAME.trim()).USER_ID;
    user.USER_NAME = entity.IN_NAME;
    user.FIRST_NAME = entity.IN_FIRST_NAME;
    user.LAST_NAME = entity.IN_LAST_NAME;
    user.EMAIL = entity.IN_EMAIL;
    user.PHONE = entity.IN_PHONE;
    user.USE_DEFAULT_PASSWORD = 1;
    user.ROLE_ID = RoleLib.getRoleByName(entity.IN_ROLE_NAME).ROLE_ID || "";
    return updateUser(user, userId);
}

function getUserNavigationByRouteNameAndUserId(routeName, userId){
    return dbUser.getUserNavigationByRouteNameAndUserId(routeName, userId);
}

function updateUserNavigationSelectedItem(userId, selectedItemId, routeName){
    if(!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
            "/updateUserNavigationSelectedItem", userId);
    }
    if(!selectedItemId){
        throw ErrorLib.getErrors().BadRequest("The Parameter selectedItemId is not found",
            "/updateUserNavigationSelectedItem", selectedItemId);
    }
    if(!routeName){
        throw ErrorLib.getErrors().BadRequest("The Parameter routeName is not found",
            "/updateUserNavigationSelectedItem", routeName);
    }

    dbUser.updateUserNavigationSelectedItem(userId, selectedItemId, routeName);
}

function updateUserNavigationBudgetYearId(routeName, userId, budgetYearId){
    if(!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
            "/updateUserNavigationBudgetYearId", userId);
    }
    if(!budgetYearId){
        throw ErrorLib.getErrors().BadRequest("The Parameter budgetYearId is not found",
            "/updateUserNavigationBudgetYearId", budgetYearId);
    }
    if(!routeName){
        throw ErrorLib.getErrors().BadRequest("The Parameter routeName is not found",
            "/updateUserNavigationBudgetYearId", routeName);
    }

    dbUser.updateUserNavigationBudgetYearId(routeName, userId, budgetYearId);
}

function updateUserNavigationSearchString(routeName, userId, searchString){
    if(!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
            "/updateUserNavigationSearchString", userId);
    }
    if(!routeName){
        throw ErrorLib.getErrors().BadRequest("The Parameter routeName is not found",
            "/updateUserNavigationSearchString", routeName);
    }

    dbUser.updateUserNavigationSearchString(routeName, userId, searchString);
}

function updateUserNavigationRegionId(routeName, userId, regionId){
    if(!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
            "/updateUserNavigationRegionId", userId);
    }
    if(!regionId){
        throw ErrorLib.getErrors().BadRequest("The Parameter regionId is not found",
            "/updateUserNavigationRegionId", regionId);
    }
    if(!routeName){
        throw ErrorLib.getErrors().BadRequest("The Parameter routeName is not found",
            "/updateUserNavigationRegionId", routeName);
    }

    dbUser.updateUserNavigationRegionId(routeName, userId, regionId);
}

function deleteUserNavigationByRouteName(routeName, userId){
    if(!userId){
        throw ErrorLib.getErrors().BadRequest("The Parameter userId is not found",
            "/deleteUserNavigationByRouteName", userId);
    }
    if(!routeName){
        throw ErrorLib.getErrors().BadRequest("The Parameter routeName is not found",
            "/deleteUserNavigationByRouteName", routeName);
    }

    dbUser.deleteUserNavigationByRouteName(routeName, userId);
}
