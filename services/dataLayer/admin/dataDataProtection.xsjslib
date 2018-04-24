$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

/** STORED PROCEDURES **/

var GET_ALL_USER_DATA_PROTECTION = "GET_ALL_USER_DATA_PROTECTION";
var GET_USER_DATA_PROTECTION_BY_ID = "GET_USER_DATA_PROTECTION_BY_ID";
var INS_USER_DATA_PROTECTION = "INS_USER_DATA_PROTECTION";
var UPD_USER_DATA_PROTECTION_STATUS = "UPD_USER_DATA_PROTECTION_STATUS";
var UPD_MASK_SHOPPING_CART_APPROVER = "UPD_MASK_SHOPPING_CART_APPROVER";
var UPD_MASK_EMPLOYEE_RESPONSIBLE = "UPD_MASK_EMPLOYEE_RESPONSIBLE";
var UPD_MASK_USER_EMAIL = "UPD_MASK_USER_EMAIL";
var UPD_USER_EMAIL_INTERLOCK_CONTACT_DATA = "UPD_USER_EMAIL_INTERLOCK_CONTACT_DATA";
var UPD_USER_APPROVER_TO_DEFAULT_CONTACT_DATA = "UPD_USER_APPROVER_TO_DEFAULT_CONTACT_DATA";
var UPD_INTERLOCK_REPORT_DATA = "UPD_INTERLOCK_REPORT_DATA";

/** GET **/

function getAllUserDataProtection() {
	var parameters = {};
    var rdo = db.executeProcedureManual(GET_ALL_USER_DATA_PROTECTION, parameters);
    
    return db.extractArray(rdo.out_result);
}

function getUserDataProtectionById(userDataProtectionId){
	var parameters = {};
	parameters.IN_USER_DATA_PROTECTION_ID = userDataProtectionId;
	
    var rdo = db.executeProcedureManual(GET_USER_DATA_PROTECTION_BY_ID, parameters);
    
    var arrayResult = db.extractArray(rdo.out_result);
    
    if(arrayResult.length){
    	return arrayResult[0];
    }
    
    return {};
}

/** INSERT **/

function insertUserDataProtection(userId, userSessionId){
	var params = {};
	params.IN_USER_ID = userId;
	params.IN_CREATED_USER_ID = userSessionId;
	
	return db.executeScalar(INS_USER_DATA_PROTECTION, params, 'out_result');
}

/** UPDATE **/

function updateUserDataProtectionStatus(statusId, userDataProtectionId, userSessionId){
	var params = {};
	params.IN_STATUS_ID = statusId;
	params.IN_USER_DATA_PROTECTION_ID = userDataProtectionId;
	params.IN_MODIFIED_USER_ID = userSessionId;
	
	return db.executeScalar(UPD_USER_DATA_PROTECTION_STATUS, params, 'out_result');
}

function maskShoppingCartApprover(userName, mask, userSession){
	var params = {};
	params.IN_DEFAULT_MASK = mask;
	params.IN_USER_NAME = userName;
	params.IN_MODIFIED_USER_ID = userSession;
	
	return db.executeScalar(UPD_MASK_SHOPPING_CART_APPROVER, params, 'out_result');
}

function maskEmployeeResponsible(userName, mask, userSession){
	var params = {};
	params.IN_DEFAULT_MASK = mask;
	params.IN_USER_NAME = userName;
	params.IN_MODIFIED_USER_ID = userSession;
	
	return db.executeScalar(UPD_MASK_EMPLOYEE_RESPONSIBLE, params, 'out_result');
}

function maskInterlockContactData(userEmail, mask, userSession){
	var params = {};
	params.IN_DEFAULT_MASK = mask;
	params.IN_USER_EMAIL = userEmail;
	params.IN_MODIFIED_USER_ID = userSession;

	return db.executeScalar(UPD_MASK_USER_EMAIL, params, 'out_result');
}

function replaceBudgetSpendApprover(userEmail, userSession){
    var params = {};
    params.IN_USER_EMAIL = userEmail;
    params.IN_MODIFIED_USER_ID = userSession;

    return db.executeScalar(UPD_USER_APPROVER_TO_DEFAULT_CONTACT_DATA, params, 'out_result');
}

function replaceContactData(userEmail, userSession) {
    var params = {};
    params.IN_USER_EMAIL = userEmail;
    params.IN_MODIFIED_USER_ID = userSession;

   return db.executeScalar(UPD_USER_EMAIL_INTERLOCK_CONTACT_DATA, params, 'out_result');
}

function updateInterlockReportData(){
	return db.executeScalar(UPD_INTERLOCK_REPORT_DATA, {}, 'out_result');
}