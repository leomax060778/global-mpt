/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var requestAccess = mapper.getRequestAccess();
/******************************************/

function processRequest(){
	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,true,"",true);
}

function handleGet(){
	throw ErrorLib.getErrors().NotImplemented("","","");
}

function handlePost(reqBody){
    var rdo = requestAccess.insertRequestAccess(reqBody);
    return httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}

function handlePut(){
	throw ErrorLib.getErrors().NotImplemented("","","");
}

function handleDelete(){
    throw ErrorLib.getErrors().NotImplemented("","","");
}

//Call request processing  
processRequest();