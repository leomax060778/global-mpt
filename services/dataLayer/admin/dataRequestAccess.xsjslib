/** *************Import Library****************** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/** ********************************************** */

var GET_ALL_REQUEST_ACCESS = "GET_ALL_REQUEST_ACCESS";
var GET_REQUEST_ACCESS_BY_USER_NAME = "GET_REQUEST_ACCESS_BY_USER_NAME";
var GET_REQUEST_ACCESS_BY_EMAIL = "GET_REQUEST_ACCESS_BY_EMAIL";
var UPD_REQUEST_ACCESS_STATUS_BY_ID = "UPD_REQUEST_ACCESS_STATUS_BY_ID";
var INS_REQUEST_ACCESS = "INS_REQUEST_ACCESS";
var DEL_REQUEST_ACCESS = "DEL_REQUEST_ACCESS";

/** *************************************************** */

function getAllRequestAccess() {
    var rdo = db.executeProcedureManual(GET_ALL_REQUEST_ACCESS, {});
    return db.extractArray(rdo.out_result);
}
function getRequestAccessByUserName(userName){
    var rdo = db.executeProcedureManual(GET_REQUEST_ACCESS_BY_USER_NAME, {
        'in_user_name' : userName
    });
    return db.extractArray(rdo.out_result)[0];
}

function getRequestAccessByEmail(email){
    var rdo = db.executeProcedureManual(GET_REQUEST_ACCESS_BY_EMAIL, {
        'in_email' : email
    });
    return db.extractArray(rdo.out_result)[0];
}

function insertRequestAccess(userName, firstName, lastName, email, phone, statusId) {
    var param = {
        in_user_id: 1
    	, in_user_name: userName
    	, in_first_name: firstName
    	, in_last_name: lastName
    	, in_email: email
    	, in_phone: phone
    	, in_request_access_status_id: statusId
	};

    return db.executeScalarManual(INS_REQUEST_ACCESS, param, "out_result");
}

function deleteRequestAccess(requestAccessId, userId) {
    var param = {
        in_user_id: userId
        , in_request_access_id: requestAccessId
    };
    return db.executeScalarManual(DEL_REQUEST_ACCESS, param, "out_result");
}

function updateRequestAccessStatus(requestAccessId, requestAccessStatusId, userId) {
    var param = {
        in_user_id: userId
        , in_request_access_id: requestAccessId
        , in_request_access_status_id: requestAccessStatusId
    };

    return db.executeScalarManual(UPD_REQUEST_ACCESS_STATUS_BY_ID, param, "out_result");
}