$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

/** STORED PROCEDURES **/

var GET_ALL_CUSTOMER_DEMOGRAPHICS = "GET_ALL_CUSTOMER_DEMOGRAPHICS";
var INS_EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS = "INS_EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS";
var DEL_EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS = "DEL_EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS";
var GET_EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS = "GET_EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS";

/** GET **/

function getAllCustomerDemographics(){
    var parameters = {};
    var rdo = db.executeProcedureManual(GET_ALL_CUSTOMER_DEMOGRAPHICS, parameters);
    return db.extractArray(rdo.out_result);
}

function getEventRequestCustomerDemographics(eventId){
	var params = {};
	params.IN_EVENT_REQUEST_ID = eventId;
	
	var rdo = db.executeProcedureManual(GET_EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS, params);
	return db.extractArray(rdo.out_result);
}

/** INSERT **/

function insertEventRequestCustomerDemographics(table){
	var params = {};
    params.CUSTOMER_DEMOGRAPHICS_TABLE = table;
    return db.executeScalarManual(INS_EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS, params, 'out_result');
}

/** DELETE **/

function deleteEventRequestCustomerDemographics(table){
	var params = {};
    params.IN_CUSTOMER_DEMOGRAPHICS_TABLE = table;
    return db.executeScalarManual(DEL_EVENT_REQUEST_CUSTOMER_DEMOGRAPHICS, params, 'out_result');
}