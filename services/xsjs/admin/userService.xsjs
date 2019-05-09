/****** libs ************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var user = mapper.getUser();
var config = mapper.getDataConfig();
var requestAccess = mapper.getRequestAccess();
/******************************************/

var getAll = "ALL";
var getAllByUserName = "ALL_BY_USER_NAME";
var getUserbyId = "USERBYID";
var getUserApproversbyId = "USERAPPROVERSBYID";
var updatePassword = "UPDPASS";
var updateUser = "UPDUSER";
var method = "method";
var id = "id";
var getUsersByHl1Id = "USERSBYHL1ID";
var getUsersByHl2Id = "USERSBYHL2ID";
var getUsersByHl3Id = "USERSBYHL3ID";
var getPermissionsByUser = "PERMISSIONSBYUSER";
var getPermissionsByUserBudgetYearId = "PERMISSION_BY_USER_BUDGET_YEAR_ID";
var hl2Id = "hl2Id";
var level3 = "L3";
var getRequestAccess = "GET_ACCESS_REQUESTS";
var deleteRequestAccess = "DELETE_ACCESS_REQUEST";
var processRequestAccess = "PROCESS_ACCESS_REQUEST";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, config.getResourceIdByName(config.userAccess()));
}

function handleGet(parameters, userId) {
    var rdo;
    var parameters = httpUtil.getUrlParameters();
    if (parameters.length > 0) {
        var aCmd = parameters.get('method');
        var level = parameters.get('level');
        var userName = parameters.get('user_name');
        
        switch (aCmd) {
            case getAll: //get all users
                rdo = user.getAll();
                break;
            case getAllByUserName:
            	rdo = user.getAllUserByUserName(userName);
            	break;
            case getUserbyId: // get one user by id
                rdo = user.getUserById(parameters[1].value);
                break;
            case getUserApproversbyId: // get one user by id
                rdo = user.getUserApproversByHL1Id(parameters[1].value);
                break;
            case getUsersByHl1Id:
                rdo = user.getUserByHl1Id(parameters[1].value);
                break;
            case getUsersByHl2Id:
                if (level == level3){
                    rdo = user.getUserByHl2IdToNewL3(parameters[1].value);
                }else {
                    rdo = user.getUserByHl2Id(parameters[1].value);
                }
                break;
            case getUsersByHl3Id:
                rdo = user.getUserByHl3Id(parameters[1].value);
                break;
            case getPermissionsByUser:
                rdo = user.getPermissionForLevelByUser(
                    parameters.get('LEVEL'),
                    parameters.get('LEVEL_ID'),
                    parameters.get('USER_ID'));
                break;
            case getPermissionsByUserBudgetYearId:
                rdo = user.getPermissionForLevelByUserBudgetYearId(
                    parameters.get('LEVEL'),
                    parameters.get('LEVEL_ID') || null,
                    parameters.get('BUDGET_YEAR_ID'),
                    parameters.get('USER_ID'));
                break;
            case getRequestAccess:
                rdo = requestAccess.getAllRequestAccess();
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("", "userServices/handleGet", "insufficient parameters");
                break;
        }

        return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
    }
    //if not match with any request supported, then return a bad request error
    throw ErrorLib.getErrors().BadRequest("", "userServices/handleGet", parameters);
};

//Implementation of PUT call -- Update User
function handlePut(reqBody, userId) {
    var parameters = httpUtil.getUrlParameters();
    if (parameters.length > 0) {
        var aCmd = parameters.get('method');

        switch (aCmd) {
            case "updateUser":
                var rdo = user.updateUser(reqBody, userId);
                return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
                break;
            case "updatePassword":
                var rdo = user.updateUserPassword(reqBody, userId);
                return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
                break;
            case "reset":
                var rdo = user.resetPassword(reqBody, userId);
                return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
                break;
            case "USER_PERMISSION_LEVEL":
                var rdo = user.userLevelPermission(reqBody, userId);
                return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
                break;
            case processRequestAccess:
                var rdo = requestAccess.processRequestAccess(reqBody, userId);
                return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
                break;
            case "RESTORE_USER":
            	var rdo = user.restoreUser(reqBody, userId);
                return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
            	break;
            default:
                throw ErrorLib.getErrors().BadRequest("", "userServices/handlePut", parameters);

        }
    }
    //if not match with any request supported, then return a bad request error
    throw ErrorLib.getErrors().BadRequest("", "userServices/handlePut", parameters);
};

//Implementation of DELETE call -- Delete User
function handleDelete(reqBody, userId) {
    var parameters = httpUtil.getUrlParameters();
    var rdo = null;
    if (parameters.length > 0) {
        var aCmd = parameters.get('method');
        switch (aCmd) {
            case deleteRequestAccess:
                rdo = requestAccess.deleteRequestAccess(reqBody.REQUEST_ACCESS_ID, userId);
                break;
        }
    } else {
        rdo = user.deleteUser(reqBody, userId);
    }
    // var rdo = user.deleteUser(reqBody, userId);
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

//Implementation of POST call -- Insert User
function handlePost(reqBody, userId) {
    var rdo = user.insertUser(reqBody, userId);
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

// Call request processing  
processRequest();