/****** libs ************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var priorityLib = mapper.getPriority();

/******************************************/

function processRequest() {
    return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handlePost(reqBody, userSessionID) {
    var result = priorityLib.insertPriority(reqBody.NAME, reqBody.CRM_KEY, userSessionID);
    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(reqBody, userSessionID) {
    var result = priorityLib.updatePriority(reqBody.PRIORITY_ID, reqBody.NAME, reqBody.CRM_KEY, userSessionID);
    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}

function handleDelete(reqBody, userSessionID) {
    var result = priorityLib.deletePriority(reqBody.PRIORITY_ID, userSessionID);
    return httpUtil.handleResponse(result, httpUtil.OK, httpUtil.AppJson);
}


function handleGet() {
    var rdo = priorityLib.getAllPriority();
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

processRequest();