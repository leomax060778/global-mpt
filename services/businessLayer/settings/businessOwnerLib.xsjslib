/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataBusinessOwner = mapper.getDataBusinessOwner();
/*************************************************/

var BUSINESS_OWNER_EXISTS = "Business Owner already exists.";
var BUSINESS_OWNER_NAME = "Business Owner description is missing.";
var BUSINESS_OWNER_CRM_KEY= "Business Owner CRM key is missing.";

function getAllBusinessOwner(){
    return dataBusinessOwner.getAllBusinessOwner();
}

function getBusinessOwnerById(id){
    return dataBusinessOwner.getBusinessOwnerById(id);
}

function insertBusinessOwner(description, crmKey, userId){
    validate(0, description, crmKey);
    return dataBusinessOwner.insertBusinessOwner(description, crmKey, userId);
}

function updateBusinessOwner(business_owner_id, description, crmKey,userId){
    validate(business_owner_id, description, crmKey);
    return dataBusinessOwner.updateBusinessOwner(business_owner_id, description, crmKey, userId);
}

function deleteBusinessOwner(business_owner_id, userId){
    return dataBusinessOwner.deleteBusinessOwner(business_owner_id, userId);
}

function validate(business_owner_id, description, crm_key) {

    if(!description)
        throw ErrorLib.getErrors().CustomError("", "businessOwnerService/handlePost/validateBusinessOwner", BUSINESS_OWNER_NAME);

    if(!crm_key)
        throw ErrorLib.getErrors().CustomError("", "businessOwnerService/handlePost/validateBusinessOwner", BUSINESS_OWNER_CRM_KEY);

    var dc = dataBusinessOwner.getBusinessOwnerByName(description);
    if(dc && Number(business_owner_id) !== Number(dc.BUSINESS_OWNER_ID))
        throw ErrorLib.getErrors().CustomError("", "businessOwnerService/handlePost/validateBusinessOwner", BUSINESS_OWNER_EXISTS);

    return true;
}