/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var desTypeCampaignSubTypeLib = mapper.getDesTypeCampaignSubTypeLib();
/******************************************/

function processRequest(){
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userSession){
    var result;
    var campaignSubTypeId = httpUtil.getUrlParameters().get("CAMPAIGN_SUB_TYPE_ID");
    result = desTypeCampaignSubTypeLib.getDesTypeByCampaignSubTypeId(campaignSubTypeId, userSession);
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePut(reqBody, userId){
    var result = desTypeCampaignSubTypeLib.updateDesCampaignSubType(reqBody, userId);
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePost(reqBody,userId){
    return httpUtil.notImplementedMethod();
}

function handleDelete(reqBody, userId){
    return httpUtil.notImplementedMethod();
}
processRequest();
