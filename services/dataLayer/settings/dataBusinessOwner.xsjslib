/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************************************************/
//STORE PROCEDURE LIST NAME
var spGET_ALL_BUSINESS_OWNER = "GET_ALL_BUSINESS_OWNER";
var spGET_BUSINESS_OWNER_BY_ID = "GET_BUSINESS_OWNER_BY_ID";
var INS_BUSINESS_OWNER = "INS_BUSINESS_OWNER";
var UPD_BUSINESS_OWNER = "UPD_BUSINESS_OWNER";
var DEL_BUSINESS_OWNER = "DEL_BUSINESS_OWNER";
var GET_BUSINESS_OWNER_BY_NAME = "GET_BUSINESS_OWNER_BY_NAME";

function getAllBusinessOwner(){
    var params = {
    };
    var rdo = db.executeProcedureManual(spGET_ALL_BUSINESS_OWNER,params);
    return db.extractArray(rdo.output_result);
}

function getBusinessOwnerById(id){
    var params = {
        'in_business_owner_id' : id
    };
    var rdo = db.executeProcedureManual(spGET_BUSINESS_OWNER_BY_ID,params);
    return db.extractArray(rdo.out_result)[0];
}

function insertBusinessOwner(description, crmKey, userId){
    var params = {
        "in_description": description,
        "in_crm_key" : crmKey,
        "in_user_id":userId
    };
    return db.executeScalarManual(INS_BUSINESS_OWNER,params,"out_result");
}

function updateBusinessOwner(business_owner_id, description, crmKey, userId){
    var params = {
        "in_business_owner_id": business_owner_id,
        "in_description": description,
        "in_crm_key" : crmKey,
        "in_modified_user_id": userId
    };
    return db.executeScalarManual(UPD_BUSINESS_OWNER,params,"out_result");
}

function deleteBusinessOwner(business_owner_id, userId){
    var params = {
        "in_business_owner_id": business_owner_id,
        "in_modified_user_id": userId
    };
    return db.executeScalarManual(DEL_BUSINESS_OWNER,params,"out_result");
}

function getBusinessOwnerByName(description) {
    var parameters = {'in_description': description};
    var list = db.executeProcedureManual(GET_BUSINESS_OWNER_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if (result.length)
        return result[0];
    return null;
}