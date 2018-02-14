/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
//STORE PROCEDURE LIST NAME
var DEL_MARKETING_ACTIVITY = "DEL_MARKETING_ACTIVITY";
var GET_ALL_MARKETING_ACTIVITY = "GET_ALL_MARKETING_ACTIVITY";
var GET_MARKETING_ACTIVITY_BY_NAME = "GET_MARKETING_ACTIVITY_BY_NAME";
var INS_MARKETING_ACTIVITY = "INS_MARKETING_ACTIVITY";
var UPD_MARKETING_ACTIVITY = "UPD_MARKETING_ACTIVITY";

function getAllMarketingActivity() {
    var params = {};
    var rdo = db.executeProcedureManual(GET_ALL_MARKETING_ACTIVITY, params);
    return db.extractArray(rdo.out_result);
}

function getMarketingActivityByName(name) {
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_MARKETING_ACTIVITY_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if (result.length)
        return result[0];
    return null;
}

function insertMarketingActivity(name, description, userId) {
    var parameters = {};
    parameters.IN_NAME = name;
    parameters.IN_DESCRIPTION = description;
    parameters.IN_CREATED_USER_ID = userId;
    return db.executeScalarManual(INS_MARKETING_ACTIVITY, parameters, "out_result");
}

function updateMarketingActivity(marketingActivityId, name, description,userId) {
    var parameters = {};
    parameters.IN_MARKETING_ACTIVITY_ID = marketingActivityId;
    parameters.IN_NAME = name;
    parameters.IN_DESCRIPTION = description;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(UPD_MARKETING_ACTIVITY, parameters, "out_result");
}

function deleteMarketingActivity(marketingActivityId, userId) {
    var parameters = {};
    parameters.IN_MARKETING_ACTIVITY_ID = marketingActivityId;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(DEL_MARKETING_ACTIVITY, parameters, "out_result");
}

function checkInUseMarketingActivityById(marketingActivityId){
    // var parameters = {'in_marketing_program_id': marketingActivityId};
    // return db.executeScalarManual(GET_COUNT_MARKETING_PROGRAM_IN_USE_BY_ID, parameters, "out_result");
    return 0;
}