/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var validationLib = mapper.getValidationLib();
var config = mapper.getDataConfig();
var db = mapper.getdbHelper();
/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level1()), false);
}

//Implementation of GET call -- GET HL1
function handleGet(){
    throw ErrorLib.getErrors().NotImplemented();
}

function handlePost(reqBody) {

    var parameters = {
        IN_ACRONYM: reqBody.IN_ACRONYM,
        IN_HL3_ID : reqBody.IN_HL3_ID
    };
    var list = db.executeProcedureManual("INS_TOBEDELETE", parameters);

    var result = db.extractArray(list.out_result);
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

function handlePut(){
    throw ErrorLib.getErrors().NotImplemented();
}

function handleDelete(){
    throw ErrorLib.getErrors().NotImplemented();
}

processRequest();