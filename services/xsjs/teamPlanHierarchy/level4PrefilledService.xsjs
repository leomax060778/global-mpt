/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var http = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();

var hl4Prefilled = mapper.getLevel4Prefilled();
/******************************************/

var byId = "GET_HL4_PREFILLED_BY_ID";
var getAll = "GET_ALL_HL4_PREFILLED";

function processRequest(){
	return http.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level3()));
};

function handleGet(parameters, user_id) {
	var res = {};
	if (parameters.length > 0) {
		if (parameters[0].name === byId) {
			if (!parameters[0].value || isNaN(parameters[0].value)) {
				throw ErrorLib.getErrors().BadRequest("","level4PrefilledService/handleGet","invalid value \'" + parameters[0].value + "\' for parameter " + parameters[0].name + " (it should be a valid id)");
			}
			res = hl4Prefilled.getHL4PrefilledById(parameters[0].value, user_id);
		} else if (parameters[0].name === getAll) {
			res = hl4Prefilled.getAllHL4Prefilled();
		} else {
			throw ErrorLib.getErrors().BadRequest("","level4PrefilledService/handleGet","invalid parameter name (can be: GET_HL4_PREFILLED_BY_ID or GET_ALL_HL4_PREFILLED)");
		}
	} else {
		throw ErrorLib.getErrors().BadRequest("","level4PrefilledService/handleGet","The parameter could not be found (can be: GET_HL4_PREFILLED_BY_ID or GET_ALL_HL4_PREFILLED)");
	}

	return http.handleResponse(res, http.OK, http.AppJson);
}

function handlePost(reqBody, userId) {
	var req = hl4Prefilled.insertHL4Prefilled(reqBody, userId);
	return http.handleResponse(req,http.OK,http.AppJson);
}

function handlePut(reqBody, userId) {
	var req = hl4Prefilled.updateHL4Prefilled(reqBody, userId);
	return http.handleResponse(req,http.OK,http.AppJson);
}
function handleDelete(reqBody, userId) {
	var req = hl4Prefilled.deleteHL4Prefilled(reqBody.HL4_PREFILLED_ID, userId);
	return http.handleResponse(req,http.OK,http.AppJson);
}

processRequest();