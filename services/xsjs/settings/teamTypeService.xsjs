/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var teamType = mapper.getTeamTypeLib();
var errors = mapper.getErrors();
/******************************************/

function processRequest(){
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"", true);
}

function handleGet(param){
    var method = httpUtil.getUrlParameterByName("METHOD");
    var rdo = [];
    switch (method){
        case 'GET_ALL_TEAM_TYPE':
            rdo = teamType.getAllTeamType();
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","","Invalid parameter value.");
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePost(){
    return httpUtil.notImplementedMethod();
}
function handlePut(){
    return httpUtil.notImplementedMethod();
}
function handleDelete(){
    return httpUtil.notImplementedMethod();
}

processRequest();