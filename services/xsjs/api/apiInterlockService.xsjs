/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var interlockLib = mapper.getInterlock();
/** *************************************** */

var getInterlockByHash = "HASH";
var getMessage = "GET_MESSAGE";

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete,
        false, "", true);
}

function handleGet(parameters, userId){
    var rdo = {};

    if(parameters.length > 0){
        if(!parameters[0].value){
            throw ErrorLib.getErrors().BadRequest("","interLockService/handleGet","invalid parameter value. Can not be null or empty");
        }

        switch(parameters[0].name){
            case getInterlockByHash:
                rdo = interlockLib.getInterlockByHash(parameters[0].value, userId);
                break;
            case getMessage:
                rdo.messages = interlockLib.getMessagesByInterlockRequest(parameters[0].value, userId);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("","interLockService/handleGet","invalid parameter name (can be: HASH or GET_MESSAGE)");
                break;
        }
    }

    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userId) {
    httpUtil.notImplementedMethod();
};

function handlePut(reqBody, userId) {
    var rdo = interlockLib.setInterlockStatus(reqBody, userId);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handleDelete(reqBody, userId) {
    httpUtil.notImplementedMethod();
};

processRequest();