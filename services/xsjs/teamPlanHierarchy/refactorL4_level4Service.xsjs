/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var hl4 = mapper.getRefactorLevel4();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var businessLevel3 = mapper.getLevel3();
/******************************************/
var section = "FOR_SEARCH";
var method = "method";
var id = "id";
var setStatusInCRM = "SETINCRM";
var changeStatus = "CHANGESTATUS";
var setStatusInCRMByUpload = "SET_IN_CRM_STATUS_BY_UPLOAD";
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
	var parameters = httpUtil.getJSONParameters();

	var result = {};
	if(parameters.METHOD){
        switch(parameters.METHOD){
			case "GET_HL4_BY_HL3_ID":

				result = hl4.getHl4(parameters.HL3_ID, userId);
				break;
			case "CARRY_OVER":

                result = hl4.getHL4CarryOverById(parameters.HL4_ID, userId);
				break;
			case "GET_HL4_BY_ID":

                result = hl4.getHl4ById(parameters.HL4_ID);
				break;
			case "FOR_SEARCH":

                var budgetYearId = parameters.BUDGET_YEAR_ID || null;
                var regionId = parameters.REGION_ID || null;
                var subRegionId = parameters.SUBREGION_ID || null;
                var limit = parameters.LIMIT || null;
                var offset = parameters.OFFSET || null;

                result = hl4.getLevel4ForSearch(budgetYearId, regionId, subRegionId, limit, offset, userId);
                break;
			case "GET_PARENT_REMAINING_BUDGET":

                result = hl4.getParentRemainingBudgetByParentId(parameters.PARENT_ID);
				break;
			default:

                throw ErrorLib.getErrors().BadRequest("","","invalid METHOD, can be: GET_HL4_BY_HL3_ID, CARRY_OVER, GET_HL4_BY_ID or GET_PARENT_REMAINING_BUDGET.");
				break;
		}

	} else{
		throw ErrorLib.getErrors().BadRequest("","","missing parameter: METHOD");
	}
	
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of PUT call -- Update HL4
function handlePut(reqBody, userId){
	var parameters = httpUtil.getUrlParameters();
    var rdo;

	if(parameters.length > 0){
		var aCmd = parameters.get('METHOD');
		var hl4Id = (!reqBody || Object.keys(reqBody).length === 0) ? parameters.get('HL4_ID') : reqBody.hl4Ids;
		
		switch (aCmd) {
		    case setStatusInCRM: //set status In CRM
				rdo = hl4.setHl4StatusInCRM(hl4Id, userId);
		        break;
			case setStatusInCRMByUpload:
                rdo = hl4.setStatusInCRMByUpload(reqBody, userId);
                break;
			case changeStatus:
				
				rdo = hl4.changeHl4StatusOnDemand(hl4Id, userId);
				break;
		    default:
		    	throw ErrorLib.getErrors().BadRequest("","","insufficient parameters");
		}

	}else{
		rdo =  hl4.updateHl4(reqBody, userId);
	}

    return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of DELETE call -- Delete HL4
function handleDelete(reqBody, userId){
	var result =  hl4.deleteHl4(reqBody, userId);
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of POST call -- Insert HL4
function handlePost(reqBody, userId) {
	var result = hl4.insertHl4(reqBody, userId); //return new L4 Id
	return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

processRequest();