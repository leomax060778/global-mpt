/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var businessOwnerLib = mapper.getBusinessOwner();
/******************************************/

function processRequest(){
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handlePost(reqBody, userSessionID) {
    var result = businessOwnerLib.insertBusinessOwner(reqBody.DESCRIPTION, reqBody.CRM_KEY, userSessionID)
    return	httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handlePut(reqBody, userSessionID) {
    var result = businessOwnerLib.updateBusinessOwner(reqBody.BUSINESS_OWNER_ID, reqBody.DESCRIPTION, reqBody.CRM_KEY, userSessionID)
    return	httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handleDelete(reqBody, userSessionID) {
    var result = businessOwnerLib.deleteBusinessOwner(reqBody.BUSINESS_OWNER_ID, userSessionID);
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handleGet() {
    var rdo = businessOwnerLib.getAllBusinessOwner();
    return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

processRequest();