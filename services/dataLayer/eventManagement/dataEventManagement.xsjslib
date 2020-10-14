$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

/** STORED PROCEDURES **/
var GET_ALL_EVENT_REQUEST = "GET_ALL_EVENT_REQUEST";
var GET_ALL_EVENT_REQUEST_APPROVED = "GET_ALL_EVENT_REQUEST_APPROVED";
var GET_ALL_EVENT_REQUEST_DETAILED = "GET_ALL_EVENT_REQUEST_DETAILED";
var INS_EVENT_REQUEST = "INS_EVENT_REQUEST";
var UPD_EVENT_REQUEST = "UPD_EVENT_REQUEST";
var GET_PATH_HL3_HL2_HL1 = "GET_PATH_HL3_HL2_HL1";
var GET_ALL_HL4_BY_FILTER = "GET_ALL_HL4_BY_FILTER";
var GET_EVENT_REQUEST_BY_ID = "GET_EVENT_REQUEST_BY_ID";
var UPD_EVENT_REQUEST_STATUS = "UPD_EVENT_REQUEST_STATUS";
var UPD_EVENT_REQUEST_HL5 = "UPD_EVENT_REQUEST_HL5";
var GET_EVENT_APPROVER_BY_EVENT_REQUEST_ID_USER_ID = "GET_EVENT_APPROVER_BY_EVENT_REQUEST_ID_USER_ID";
/** GET **/

function getAllEventRequest(userId, isSa){
    var parameters = {
    	in_user_id: userId,
		in_isSa: isSa
    };
    var rdo = db.executeProcedureManual(GET_ALL_EVENT_REQUEST, parameters);
    return db.extractArray(rdo.out_result);
}

function getAllEventRequestApproved(userId, isSa){
    var parameters = {
        in_user_id: userId,
        in_isSa: isSa
    };
	var rdo = db.executeProcedureManual(GET_ALL_EVENT_REQUEST_APPROVED, parameters);

	var result = {};

	result.EVENT_REQUEST_COLLECTION = db.extractArray(rdo.out_result);
	result.EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS_COLLECTION = db.extractArray(rdo.out_result_customer_demographics);
	result.EVENT_REQUEST_CATEGORIES_COLLECTION = db.extractArray(rdo.out_result_categories);

	return result;
}

function getAllEventRequestReport(hl1Id, hl2Id, hl3Id){
	var parameters = {};
	parameters.IN_HL1_ID = hl1Id;
	parameters.IN_HL2_ID = hl2Id;
	parameters.IN_HL3_ID = hl3Id;

	var rdo = db.executeProcedureManual(GET_ALL_EVENT_REQUEST_DETAILED, parameters);

	var result = {};

	result.EVENT_REQUEST_COLLECTION = db.extractArray(rdo.out_result);
	result.EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS_COLLECTION = db.extractArray(rdo.out_result_customer_demographics);
	result.EVENT_REQUEST_CATEGORIES_COLLECTION = db.extractArray(rdo.out_result_categories);

	return result;
}

function getPathHl1Hl2Hl3(budgetYear, regionId){
    var result = db.extractArray(db.executeProcedure(GET_PATH_HL3_HL2_HL1, {IN_BUDGET_YEAR_ID:budgetYear || 0, IN_REGION_ID:regionId || 0}).OUT_RESULT);
    return result;
}

function getAllHl4ByFilter(hl1_id, hl2_id, hl3_id){
    var param = {
        IN_HL1_ID:hl1_id||0,
        IN_HL2_ID:hl2_id||0,
        IN_HL3_ID:hl3_id||0
    };
    var result = db.executeProcedure(GET_ALL_HL4_BY_FILTER, param);
    return db.extractArray(result.out_result);
}

function getEventRequestById(event_request_id) {
    var result = db.extractArray(db.executeProcedure(GET_EVENT_REQUEST_BY_ID, {IN_EVENT_REQUEST_ID: event_request_id}).OUT_RESULT)[0];
    return result;
}
/** INSERT **/

function insertEventRequest(reqBody, userId){
	var params = {};
	
	params.IN_EVENT_REQUEST_STATUS_ID = reqBody.EVENT_REQUEST_STATUS_ID;
	params.IN_HL4_ID = reqBody.HL4_ID;
	params.IN_HL5_ID = reqBody.HL5_ID;
	params.IN_NAME = reqBody.NAME;
	params.IN_START_DATE = reqBody.START_DATE;
	params.IN_END_DATE = reqBody.END_DATE;
	params.IN_CITY = reqBody.CITY;
	params.IN_COUNTRY_ID = reqBody.COUNTRY_ID;
	params.IN_EVENT_OWNER = reqBody.EVENT_OWNER;
	params.IN_OBJECTIVE_ID = reqBody.OBJECTIVE_ID;
	params.IN_CAMPAIGN_TYPE_ID = reqBody.CAMPAIGN_TYPE_ID;
	params.IN_CAMPAIGN_SUB_TYPE_ID = reqBody.CAMPAIGN_SUB_TYPE_ID;
	params.IN_DES_TYPE_ID = reqBody.DES_TYPE_ID;
	params.IN_SUMMARY = reqBody.SUMMARY;
	params.IN_PARTICIPANTS_NUMBER = reqBody.PARTICIPANTS_NUMBER;
	params.IN_EXISTING_CUSTOMERS_PERCENTAGE = reqBody.EXISTING_CUSTOMERS_PERCENTAGE;
	params.IN_COST = reqBody.COST;
	params.IN_PARTNER_REVENUE = reqBody.PARTNER_REVENUE;
	params.IN_MNP_VALUE = reqBody.MNP_VALUE;
	params.IN_MNP_VOLUME = reqBody.MNP_VOLUME;
	params.IN_CREATED_USER_ID = userId;
	
	return db.executeScalarManual(INS_EVENT_REQUEST, params, 'out_result');
}

function insertEventApprover(level, eventApproverData){
	var spName = 'INS_' + level.toUpperCase() + '_EVENT_APPROVER';
	return db.executeScalarManual(spName, eventApproverData, 'out_result');
}

/** UPDATE **/

function updateEventRequest(reqBody, userId){
	var params = {};
	
	params.IN_EVENT_REQUEST_ID = reqBody.EVENT_REQUEST_ID;
	params.IN_EVENT_REQUEST_STATUS_ID = reqBody.EVENT_REQUEST_STATUS_ID;
	params.IN_HL4_ID = reqBody.HL4_ID;
	params.IN_HL5_ID = reqBody.HL5_ID;
	params.IN_NAME = reqBody.NAME;
	params.IN_START_DATE = reqBody.START_DATE;
	params.IN_END_DATE = reqBody.END_DATE;
	params.IN_CITY = reqBody.CITY;
	params.IN_COUNTRY_ID = reqBody.COUNTRY_ID;
	params.IN_VENUE = reqBody.VENUE;
	params.IN_EVENT_OWNER = reqBody.EVENT_OWNER;
	params.IN_OBJECTIVE_ID = reqBody.OBJECTIVE_ID;
	params.IN_CAMPAIGN_TYPE_ID = reqBody.CAMPAIGN_TYPE_ID;
	params.IN_CAMPAIGN_SUB_TYPE_ID = reqBody.CAMPAIGN_SUB_TYPE_ID;
	params.IN_DES_TYPE_ID = reqBody.DES_TYPE_ID;
	params.IN_SUMMARY = reqBody.SUMMARY;
	params.IN_PARTICIPANTS_NUMBER = reqBody.PARTICIPANTS_NUMBER;
	params.IN_EXISTING_CUSTOMERS_PERCENTAGE = reqBody.EXISTING_CUSTOMERS_PERCENTAGE;
	params.IN_COST = reqBody.COST;
	params.IN_PARTNER_REVENUE = reqBody.PARTNER_REVENUE;
	params.IN_MNP_VALUE = reqBody.MNP_VALUE;
	params.IN_MNP_VOLUME = reqBody.MNP_VOLUME;
	params.IN_MODIFIED_USER_ID = userId;
	
	return db.executeScalarManual(UPD_EVENT_REQUEST, params, 'out_result');
}

function updateEventRequestStatus(eventRequestId, statusId, userId) {
	var params = {};
	params.IN_EVENT_REQUEST_ID = eventRequestId;
	params.IN_EVENT_REQUEST_STATUS_ID = statusId;
	params.IN_USER_ID = userId;
    return db.executeScalarManual(UPD_EVENT_REQUEST_STATUS, params, 'out_result');
}

function updateEventRequestHl5Id(eventRequestId, hl5Id, userId) {
    var params = {};
    params.IN_EVENT_REQUEST_ID = eventRequestId;
    params.IN_HL5_ID = hl5Id;
    params.IN_USER_ID = userId;
    return db.executeScalarManual(UPD_EVENT_REQUEST_HL5, params, 'out_result');
}

function deleteEventApprover(level, hlId){
    var spName = 'DEL_' + level.toUpperCase() + '_EVENT_APPROVER';
    var parameters = {}
    parameters['IN_' + level.toUpperCase() + '_ID'] = hlId;
    return db.executeScalarManual(spName, parameters, 'out_result');
}

function getEventApproverByHlId(level, hlId, parentId){
    var parameters = {
        in_parent_id: parentId
        ,in_hl_id: hlId
    };
    
    var spName = 'GET_' + level.toUpperCase() + '_EVENT_APPROVER_BY_' + level.toUpperCase() + '_ID';

    var rdo = db.executeProcedureManual(spName, parameters);

    var result =  {
        assigned : db.extractArray(rdo.EVENT_APPROVER_ASSIGNED),
        available: db.extractArray(rdo.EVENT_APPROVER_AVAILABLE)
    };
    return result;
}

function getEventApproverByEventRequestIdUserId(eventRequestId, userId) {
    return db.extractArray(db.executeProcedure(GET_EVENT_APPROVER_BY_EVENT_REQUEST_ID_USER_ID, {IN_EVENT_REQUEST_ID: eventRequestId, IN_USER_ID: userId}).OUT_RESULT)[0];
}

function deleteEventApproverByHlIdUserId(level, data) {
    var spName = 'DEL_' + level.toUpperCase() + '_EVENT_APPROVER_BY_' + level.toUpperCase() + '_ID_USER_ID';
    return db.executeScalarManual(spName, data, 'out_result');
}
