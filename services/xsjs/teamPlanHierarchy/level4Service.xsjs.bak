/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var hl4 = mapper.getLevel4();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var businessLevel3 = mapper.getLevel3();
/******************************************/
var section = "FOR_SEARCH";
var method = "method";
var id = "id";
var setStatusInCRM = "SETINCRM";
var changeStatus = "CHANGESTATUS";
// var sendInCrmNotificationMail = "SENDMAIL";

/******************************************/

function processRequest(){
	return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete,false, "", true);
}
/**
 * 
 * @param {bigInt} $.request.parameters.HL3_ID - Team ID
 * @param {bigInt} $.request.parameters.USER_ID - Loggin user_id
 * @param {tinyInt} $.request.parameters.IS_DATA_ENTRYE - Flag used to fliter by HL4 status_detail_id 
 *
 * @returns {collection} result
 * @returns {decimal} total_budget - HL4 Total Budget
 * 
 */
function handleGet(params, userId) {
	var in_hl3_id = httpUtil.getUrlParameters().get("HL3_ID");
	var in_hl4_id = httpUtil.getUrlParameters().get("HL4_ID");
	var param_section = httpUtil.getUrlParameters().get("section");
    var method = httpUtil.getUrlParameters().get("METHOD");
    var parentId = httpUtil.getUrlParameters().get("PARENT_ID");
	var result = {};

	if(in_hl3_id){
        // businessLevel3.checkPermission(userId, null, in_hl3_id);
		result = hl4.getHl4(in_hl3_id, userId);
	} else if (in_hl4_id && method && method === "CARRY_OVER"){
    	result = hl4.getHL4CarryOverById(in_hl4_id, userId);
	} else if (in_hl4_id) {
        // hl4.checkPermission(userId, null, in_hl4_id);
		result = hl4.getHl4ById(in_hl4_id);
	} else if (param_section && param_section === section){
        var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
        var regionId = httpUtil.getUrlParameters().get("REGION_ID") || null;
        var subRegionId = httpUtil.getUrlParameters().get("SUBREGION_ID") || null;
        var limit = httpUtil.getUrlParameters().get("LIMIT") || null;
        var offset = httpUtil.getUrlParameters().get("OFFSET") || null;
		result = hl4.getLevel4ForSearch(budgetYearId, regionId, subRegionId, limit, offset, userId);
	} else if (parentId && method && method === "GET_PARENT_REMAINING_BUDGET"){
        result = hl4.getParentRemainingBudgetByParentId(parentId);
    } else{
		throw ErrorLib.getErrors().BadRequest("","","invalid parameter name (can be: HL3_ID, HL4_ID or section)");
	}
	
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of PUT call -- Update HL4
function handlePut(reqBody, userId){
	var parameters = httpUtil.getUrlParameters();
    // hl4.checkPermission(userId, null, parameters.get('HL4_ID') || reqBody.hl4.in_hl4_id);
	if(parameters.length > 0){
		var aCmd = parameters.get('method');
		var hl4Id = !reqBody ? parameters.get('HL4_ID') : reqBody.hl4Ids;
		var rdo;
		switch (aCmd) {
			/*case sendInCrmNotificationMail:
					hl4.sendProcessingReportEmail(hl4Id, userId);
					//fallthrough*/
		    case setStatusInCRM: //set status In CRM
				rdo = hl4.setHl4StatusInCRM(hl4Id, userId);
		        break;
			case changeStatus:
				rdo = hl4.changeHl4StatusOnDemand(hl4Id, userId);
				break;
		    default:
		    	throw ErrorLib.getErrors().BadRequest("","","insufficient parameters");
		}
        return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
	}else{
		var result =  hl4.updateHl4(reqBody, userId);
		return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
	}
}

//Implementation of DELETE call -- Delete HL4
function handleDelete(reqBody, userId){
    // hl4.checkPermission(userId, null, reqBody.in_hl4_id);
	var result =  hl4.deleteHl4(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of POST call -- Insert HL4
function handlePost(reqBody, userId) {
    // businessLevel3.checkPermission(userId, null, reqBody.hl4.in_hl3_id);
	var result = hl4.insertHl4(reqBody, userId); //return new L4 Id
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

processRequest();