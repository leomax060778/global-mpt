/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var interlockLib = mapper.getInterlock();
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/** *************************************** */

var getGlobalTeams = "GET_ENTITIES_ORGANIZATIONS";
var getMessage = "GET_MESSAGE";
var getInterlockByHash = "HASH";
var getInterlockById = "GET_INTERLOCK_BY_ID";
var getInterlockByEmail = "GET_REQUEST_INTERLOCK_BY_EMAIL";
var getInterlockRequest = "GET_REQUEST_INTERLOCK_BY_USER_ID";
var getInterlockSend = "GET_SEND_INTERLOCK_BY_USER_ID";
var getContactDataByOrgRelOrgId = "GET_CONTACT_DATA_BY_ORG_REL_ORG_ID";
var saveInterlockMessage = "ADDMESSAGE";
var interlockRequest = "REQUEST_INTERLOCK";
var interlockSend = "SEND_INTERLOCK";
var getDefaultConfiguration = "GET_DEFAULT_CONFIGURATION";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, config.getResourceIdByName(config.interlock()));
}

function handleGet(parameters, userId) {
    var rdo = {};

    if (parameters.length > 0) {
        if (!parameters[0].value) {
            throw ErrorLib.getErrors().BadRequest("", "interLockService/handleGet", "invalid parameter value. Can not be null or empty");
        }

        switch (parameters[0].name) {
            case getGlobalTeams:
                rdo = interlockLib.getInterlockDefaults();
                break;
            case getInterlockById:
                rdo = interlockLib.getInterlockById(parameters[0].value, userId);
                break;
            case getInterlockByEmail:
                rdo = interlockLib.getRequestInterlockByEmail(parameters[0].value, userId);
                break;
            case getInterlockRequest:
                rdo = interlockLib.getRequestInterlockByUserId(userId);
                break;
            case getInterlockSend:
                rdo = interlockLib.getSendInterlockByUserId(userId);
                break;
            case getInterlockByHash:
                rdo = interlockLib.getInterlockByHash(parameters[0].value, userId);
                break;
            case getMessage:
                rdo.messages = interlockLib.getMessagesByInterlockRequest(parameters[0].value, userId);
                break;
            case getDefaultConfiguration:
                rdo = interlockLib.getUnformattedInterlockDefaults(parameters[0].value, userId);
                break;
            case getContactDataByOrgRelOrgId:
                 rdo = interlockLib.getContactDataByOrgRelatedAndOrgId(httpUtil.getUrlParameterByName("ORGANIZATION_RELATED_ID"),
                    httpUtil.getUrlParameterByName("ORGANIZATION_ID"));
                 break;
            default:
                throw ErrorLib.getErrors().BadRequest("", "interLockService/handleGet", "invalid parameter name (can be: GET_GLOBALS_TEAM)");
                break;
        }
    }

    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userId) {
    var parameters = httpUtil.getUrlParameters();
    var rdo;

    if (parameters.length > 0) {
        var aCmd = parameters.get('method');

        switch (aCmd) {
            case saveInterlockMessage: //save interlock message
                rdo = interlockLib.saveInterlockRequestMessage(reqBody.interlockId, reqBody.message, userId);
                break;
            case interlockRequest:
                rdo = interlockLib.insertInterlockRequest(reqBody, userId);
                break;
            case interlockSend:
                rdo = interlockLib.insertInterlockSend(reqBody, userId);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("", "interLockService/handlePost", "insufficient parameters");
        }
    } else {
        rdo = interlockLib.resendRequestEmail(reqBody.INTERLOCK_REQUEST_ID, userId);
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePut(reqBody, userId) {
    var rdo;
    var parameters = httpUtil.getUrlParameters();
    var method = parameters.get('method');
    if (method === "UPDATE_INTERLOCK_REQUEST") {
        rdo = interlockLib.updateInterlock(reqBody, userId);
    } else if (method === "UPDATE_DEFAULT_CONFIGURATION") {
        rdo = interlockLib.updateInterlockDefaults(reqBody, userId);
    } else {
        rdo = interlockLib.setInterlockStatus(reqBody, userId);
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handleDelete(reqBody, userId) {
    var rdo = interlockLib.deleteInterlock(reqBody, userId);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

processRequest();