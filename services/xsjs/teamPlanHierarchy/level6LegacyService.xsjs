/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var level6Legacy = mapper.getLevel6Legacy();
var config = mapper.getDataConfig();
/** *************************************** */

function processRequest() {
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level5()));
}

function handleGet(parameters, userId) {
	var result = null;
	var jsonParams = httpUtil.getJSONParameters();

	if(jsonParams.METHOD){
		switch(jsonParams.METHOD){
			case "GET_HL6_LEGACY_BY_ID":
				
				result = level6Legacy.getHl6LegacyById(jsonParams.HL6_LEGACY_ID, userId);
				break;
			default:

				throw ErrorLib.getErrors().BadRequest("","","invalid METHOD, can be: GET_HL6_LEGACY_BY_ID");
				break;
		}

	} else{
		throw ErrorLib.getErrors().BadRequest("","","missing parameter: METHOD");
	}

	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handlePost(reqBody, userId) {
	return httpUtil.notImplementedMethod();
};
function handlePut(reqBody, userId) {
	var result = level6Legacy.updateHl6Legacy(reqBody, userId);
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};
function handleDelete(reqBody, userId) {
	return httpUtil.notImplementedMethod();
};

processRequest();