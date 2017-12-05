/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();

var crmAcronymLib = mapper.getCrmAcronym();

var upload = 'UPLOAD';
var upload_hl4 = 'UPLOAD_HL4';
var upload_hl3 = 'UPLOAD_HL3';
/******************HL4*******************/
var byId_HL4 = "GET_HL4_CRM_ACRONYM_BY_ID";
var getAll_HL4 = "GET_ALL_HL4_CRM_ACRONYM";
var byHL3Id_HL4 = "GET_HL4_CRM_ACRONYM_BY_HL3_ID";
var byHL3Acronym_HL4 = "GET_HL4_CRM_ACRONYM_BY_HL3_ACRONYM";
var updateByHl3CrmAcronym = "UPD_HL4_BY_HL3_CRM_ACRONYM";
var hl4 = "HL4";
/*****************HL3********************/
var byId_HL3 = "GET_HL3_CRM_ACRONYM_BY_ID";
var getAll_HL3 = "GET_ALL_HL3_CRM_ACRONYM";
var hl3 = "HL3";
/****************************************/

function processRequest(){
	return http.processRequest(handleGet, handlePost, handlePut, handleDelete,false, "", true);
	//return http.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level3()));
};

function handleGet(parameters, user_id) {
	var res = {};
    if(http.getUrlParameterByName("LEVEL") === hl4){
    	if(http.getUrlParameterByName("METHOD") === byId_HL4 ){
            res = crmAcronymLib.getHl4CrmAcronymById(http.getUrlParameterByName("ID"), user_id);
		}else if(http.getUrlParameterByName("METHOD") === getAll_HL4 ){
            res = crmAcronymLib.getAllHL4CrmAcronym();
		}else if(http.getUrlParameterByName("METHOD") === byHL3Id_HL4 ){
            res = crmAcronymLib.getHl4CrmAcronymByHL3Id(http.getUrlParameterByName("ID"));
        }else if(http.getUrlParameterByName("METHOD") === byHL3Acronym_HL4 ){
            res = crmAcronymLib.getHl4CrmAcronymByHL3Acronym(http.getUrlParameterByName("ACRONYM"));
        }
	}else if(http.getUrlParameterByName("LEVEL") === hl3){
        if(http.getUrlParameterByName("METHOD") === byId_HL3 ){
            res = crmAcronymLib.getHl3CrmAcronymById(http.getUrlParameterByName("ID"), user_id);
        }else if(http.getUrlParameterByName("METHOD") === getAll_HL3 ){
            res = crmAcronymLib.getAllHL3CrmAcronym();
        }
    }

	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePost(reqBody, userId) {
    if(http.getUrlParameterByName("METHOD") === upload){
        var req = crmAcronymLib.insertUploadCrmAcronym(reqBody, userId);
        return http.handleResponse(req,http.OK,http.AppJson);
    }else if(http.getUrlParameterByName("METHOD") === upload_hl3){
        var req = crmAcronymLib.insertUploadHL3CrmAcronym(reqBody, userId);
        return http.handleResponse(req,http.OK,http.AppJson);
    }else if(http.getUrlParameterByName("METHOD") === upload_hl4){
        var req = crmAcronymLib.insertUploadHL4CrmAcronym(reqBody, userId);
        return http.handleResponse(req,http.OK,http.AppJson);
    }else{
        if(http.getUrlParameterByName("LEVEL") === hl4){
            var req = crmAcronymLib.insertHl4CrmAcronym(reqBody, userId);
            return http.handleResponse(req,http.OK,http.AppJson);
        }else if(http.getUrlParameterByName("LEVEL") === hl3){
            var req = crmAcronymLib.insertHl3CrmAcronym(reqBody, userId);
            return http.handleResponse(req,http.OK,http.AppJson);
        }
    }
}

function handlePut(reqBody, userId) {

    if(http.getUrlParameterByName("LEVEL") === hl4){
        if(http.getUrlParameterByName("METHOD") === updateByHl3CrmAcronym){
            var req = crmAcronymLib.updateHl4ByHl3CrmAcronym(reqBody.hl3_id, reqBody.hl4_list , userId);
            return http.handleResponse(req,http.OK,http.AppJson);
        }else{
            var req = crmAcronymLib.updateHl4CrmAcronym(reqBody, userId);
            return http.handleResponse(req,http.OK,http.AppJson);
        }
    }else if(http.getUrlParameterByName("LEVEL") === hl3){
        var req = crmAcronymLib.updateHl3CrmAcronym(reqBody, userId);
        return http.handleResponse(req,http.OK,http.AppJson);
	}
}

function handleDelete(reqBody, userId) {
    if(http.getUrlParameterByName("LEVEL") === hl4){
        var req = crmAcronymLib.deleteHl4CrmAcronym(reqBody.HL4_CRM_ACRONYM_ID, userId);
        return http.handleResponse(req,http.OK,http.AppJson);
	}else if(http.getUrlParameterByName("LEVEL") === hl3){
        var req = crmAcronymLib.deleteHl3CrmAcronym(reqBody.HL3_CRM_ACRONYM_ID, userId);
        return http.handleResponse(req,http.OK,http.AppJson);
	}
}

processRequest();