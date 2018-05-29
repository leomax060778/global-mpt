/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blPath = mapper.getPath();
var config = mapper.getDataConfig();
/******************************************/

var LEVEL = "LEVEL";
var HL_ID = "HL_ID";

function processRequest(){
    httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, "", true);
}

//Implementation of GET call 
function handleGet(parameters, userSessionID){
    if(parameters[0].name === LEVEL && parameters[1].name === HL_ID){
        var isLegacy = httpUtil.getUrlParameters().get("IS_LEGACY");

        var rdo = blPath.getPathByLevelParent(parameters[0].value, parameters[1].value, isLegacy);
        httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
    }
    else{
        throw ErrorLib.getErrors().BadRequest("","pathService/handleGet","invalid parameters names (can be: LEVEL or HL_ID)");
    }
};

function handlePost(reqBody,userSessionID) {
    return httpUtil.notImplementedMethod();
}

function handlePut(reqBody,userSessionID){
    return httpUtil.notImplementedMethod();
};

function handleDelete(reqBody,userSessionID){
    return httpUtil.notImplementedMethod();
};

//Call request processing  
processRequest();