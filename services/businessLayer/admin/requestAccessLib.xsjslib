/** *************Import Library****************** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dbUser = mapper.getDataUser();
var dataRequestAccess = mapper.getDataRequestAccess();
var ErrorLib = mapper.getErrors();
var util = mapper.getUtil();
var config = mapper.getDataConfig();
var user = mapper.getUser();
var userMail = mapper.getUserMail();
var mail = mapper.getMail();

/** ********************************************** */

var REQUEST_ACCESS_STATUS = {
    PENDING: 1
    , REJECTED: 2
    , APPROVED: 3
};

function getAllRequestAccess() {
    return dataRequestAccess.getAllRequestAccess();
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

function insertRequestAccess(data) {
    validateRequestAccess(data);
    var requestAccessId = dataRequestAccess.insertRequestAccess(data.USER_NAME.trim(), data.FIRST_NAME.trim(), data.LAST_NAME.trim(), data.EMAIL, data.PHONE.trim() || null);
    notifyInsertByEmail(data);
    return requestAccessId;
}

function deleteRequestAccess(requestAccessId, userId) {
    if (!requestAccessId || !Number(requestAccessId))
        throw ErrorLib.getErrors().CustomError("",
            "reuqestAccessServices/handleDelete/deleteRequestAccess",
            "The Request Access ID is not found");

    if (!userId || !Number(userId))
        throw ErrorLib.getErrors().CustomError("",
            "reuqestAccessServices/handleDelete/deleteRequestAccess",
            "The User ID is not found");
    
    return dataRequestAccess.deleteRequestAccess(requestAccessId, userId);
}

function processRequestAccess(data, userId) {
    var result;
    switch (data.STATUS) {
        case 'REJECTED':
            result = dataRequestAccess.updateRequestAccessStatus(data.REQUEST_ACCESS_ID, REQUEST_ACCESS_STATUS[data.STATUS], userId);
            if(data.DELETE)
                dataRequestAccess.deleteRequestAccess(data.REQUEST_ACCESS_ID, userId);
            
            break;
        case 'APPROVED':
            result = user.insertUser(data, userId);
            dataRequestAccess.deleteRequestAccess(data.REQUEST_ACCESS_ID, userId);
            break;
    }
    return result;
}

function validateRequestAccess(data) {
    if (!data)
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "User is not found");

    if (!data.USER_NAME || !util.validateLength(data.USER_NAME, 255, 1, "User Name")
        || !util.validateIsString(data.USER_NAME))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The USER_NAME is invalid");

    if (!data.FIRST_NAME || !util.validateLength(data.FIRST_NAME, 255, 1, "First Name")
        || !util.validateIsString(data.FIRST_NAME))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The FIRST_NAME is invalid");

    if (!data.LAST_NAME || !util.validateLength(data.LAST_NAME, 255, 1, "Last Name")
        || !util.validateIsString(data.LAST_NAME))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser",
            "The LAST_NAME is invalid");

    if (!data.EMAIL || !util.validateIsSapEmail(data.EMAIL))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The EMAIL is invalid");

    if (data.PHONE.trim() && (255 > data.PHONE || data.PHONE < 0))
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The PHONE is invalid");

    if (dbUser.getUserByUserName(data.USER_NAME)) {
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "The User Name already exists");
    }

    if (dbUser.getUserByEmail(data.EMAIL)) {
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "Another user with the same email already exists");
    }

    if (dataRequestAccess.getRequestAccessByUserName(data.USER_NAME)) {
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "A request access for " + data.USER_NAME + " already exists");
    }

    if (dataRequestAccess.getRequestAccessByEmail(data.EMAIL)) {
        throw ErrorLib.getErrors().CustomError("",
            "userServices/handlePost/insertUser", "A request access for " + data.EMAIL + " already exists");
    }

    return true;
}

function notifyInsertByEmail(data) {
    var basicData = {
        ENVIRONMENT: config.getMailEnvironment()
        , APP_URL: config.getLoginUrl()
        , SITE_ADMIN_ACCOUNT: config.getSiteAdminAccount()
        , SITE_ADMIN_NAME: null
    };

    var siteAdministrator = dbUser.getUserByEmail(basicData.SITE_ADMIN_ACCOUNT);
    basicData.SITE_ADMIN_NAME = siteAdministrator ? siteAdministrator.FIRST_NAME + ' ' + siteAdministrator.LAST_NAME : 'Collegue';

    var mailObj = userMail.parseNotifyCreateRequestAccess(basicData, data);

    var mailObject = mail.getJson([{
        "address": basicData.SITE_ADMIN_ACCOUNT
    }], mailObj.subject, mailObj.body);
    
    mail.sendMail(mailObject, true);
}