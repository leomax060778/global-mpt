$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

//STORE PROCEDURE LIST NAME
var GET_ALL_CAMPAIGN_SUB_TYPE = "GET_ALL_CAMPAIGN_SUB_TYPE";
var GET_ALL_CAMPAIGN_SUB_TYPE_BY_CAMPAIGN_TYPE_ID = "GET_ALL_CAMPAIGN_SUB_TYPE_BY_CAMPAIGN_TYPE_ID";
var GET_CAMPAIGN_SUB_TYPE_BY_CAMPAIGN_TYPE_ID = "GET_CAMPAIGN_SUB_TYPE_BY_CAMPAIGN_TYPE_ID";
var GET_ALL_AVAILABLE_CAMPAIGN_SUB_TYPE_BY_CAMPAIGN_TYPE_ID = "GET_ALL_AVAILABLE_CAMPAIGN_SUB_TYPE_BY_CAMPAIGN_TYPE_ID";
var GET_CAMPAIGN_SUB_TYPE_BY_ID = "GET_CAMPAIGN_SUB_TYPE_BY_ID";
var GET_CAMPAIGN_SUB_TYPE_BY_NAME = "GET_CAMPAIGN_SUB_TYPE_BY_NAME";
var GET_CAMPAIGN_SUB_TYPE_BY_CRM_KEY = "GET_CAMPAIGN_SUB_TYPE_BY_CRM_KEY";
var INS_CAMPAIGN_SUB_TYPE = "INS_CAMPAIGN_SUB_TYPE";
var UPD_CAMPAIGN_SUB_TYPE = "UPD_CAMPAIGN_SUB_TYPE";
var DEL_CAMPAIGN_SUB_TYPE = "DEL_CAMPAIGN_SUB_TYPE";
var GET_COUNT_CAMPAIGN_SUB_TYPE_IN_USE_BY_ID = "GET_COUNT_CAMPAIGN_SUB_TYPE_IN_USE_BY_ID";
var UPD_CAMPAIGN_TYPE_SUBTYPE_DATE_RULE = "UPD_CAMPAIGN_TYPE_SUBTYPE_DATE_RULE";

function getAllCampaignSubType() {
    var parameters = {};
    var data = db.executeProcedureManual(GET_ALL_CAMPAIGN_SUB_TYPE, parameters);
    return db.extractArray(data.out_result);
}

function getAllCampaignSuTypeByCampaignTypeId(idCampaignType, idObjective) {
    var parameters = {'in_campaign_type_id': idCampaignType, 'in_objective_id': idObjective};
    var data = db.executeProcedureManual(GET_ALL_CAMPAIGN_SUB_TYPE_BY_CAMPAIGN_TYPE_ID, parameters);
    return db.extractArray(data.out_result);
}
function getAllAvailableCampaignSubTypeByCampaignTypeId(idCampaignType, idObjective) {
    var parameters = {'in_campaign_type_id': idCampaignType, 'in_objective_id': idObjective};
    var data = db.executeProcedureManual(GET_ALL_AVAILABLE_CAMPAIGN_SUB_TYPE_BY_CAMPAIGN_TYPE_ID, parameters);
    return db.extractArray(data.out_result);
}

function getCampaignSuTypeByCampaignTypeId(idCampaignType) {
    var parameters = {'in_campaign_type_id': idCampaignType};
    var data = db.executeProcedureManual(GET_CAMPAIGN_SUB_TYPE_BY_CAMPAIGN_TYPE_ID, parameters);
    return db.extractArray(data.out_result);
}

function getCampaignSubTypeById(idCampaignSubType) {
    var parameters = {'in_campaign_sub_type_id': idCampaignSubType};
    var data = db.executeProcedureManual(GET_CAMPAIGN_SUB_TYPE_BY_ID, parameters);
    var result = db.extractArray(data.out_result);
    if (result.length)
        return result[0];
    else
        return null;
}

function insertCampaignSubType(name, crmKey, rolloverText, example, userId) {
    var parameters = {};
    parameters.IN_NAME = name;
    parameters.IN_CRM_KEY = crmKey;
    parameters.IN_ROLLOVER_TEXT = rolloverText;
    parameters.IN_EXAMPLE = example;
    parameters.IN_CREATED_USER_ID = userId;
    return db.executeScalarManual(INS_CAMPAIGN_SUB_TYPE, parameters, "out_result");
}

function getCampaignSubTypeByName(name) {
    var parameters = {'IN_NAME': name};
    var list = db.executeProcedureManual(GET_CAMPAIGN_SUB_TYPE_BY_NAME, parameters);
    var result = db.extractArray(list.out_result);
    if (result.length)
        return result[0];
    return null;
}

function getCampaignSubTypeByCrmKey(crmKey) {
    var parameters = {'IN_CRM_KEY': crmKey};
    var list = db.executeProcedureManual(GET_CAMPAIGN_SUB_TYPE_BY_CRM_KEY, parameters);
    var result = db.extractArray(list.out_result);
    if (result.length)
        return result[0];
    return null;
}

function updateCampaignSubType(campaignTypeId, name, crmKey, rolloverText, example, userId) {
    var parameters = {};
    parameters.IN_CAMPAIGN_SUB_TYPE_ID = campaignTypeId;
    parameters.IN_NAME = name;
    parameters.IN_CRM_KEY = crmKey;
    parameters.IN_ROLLOVER_TEXT = rolloverText;
    parameters.IN_EXAMPLE = example;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(UPD_CAMPAIGN_SUB_TYPE, parameters, "out_result");
}

function updateDateRules( CAMPAIGN_TYPE_ID,    CAMPAIGN_SUBTYPE_ID,    VALIDATE_DATE_RULE,    ACTUAL_START_DATE_ROLLOVER_TEXT,    ACTUAL_END_DATE_ROLLOVER_TEXT,    userId){
    var parameters = {
        in_campaign_sub_type_id : CAMPAIGN_SUBTYPE_ID,
        in_campaign_type_id : CAMPAIGN_TYPE_ID,
        in_validate_date_rule : VALIDATE_DATE_RULE,
        in_actual_start_date_rollover_text : ACTUAL_START_DATE_ROLLOVER_TEXT,
        in_actual_end_date_rollover_text : ACTUAL_END_DATE_ROLLOVER_TEXT,
        in_user_id : userId
    };
    return db.executeScalarManual(UPD_CAMPAIGN_TYPE_SUBTYPE_DATE_RULE, parameters, "out_result");
}

function deleteCampaignSubType(campaignTypeId, userId) {
    var parameters = {};
    parameters.IN_CAMPAIGN_SUB_TYPE_ID = campaignTypeId;
    parameters.IN_MODIFIED_USER_ID = userId;
    return db.executeScalarManual(DEL_CAMPAIGN_SUB_TYPE, parameters, "out_result");
}

function checkInUseCampaignSubTypeById(subTypeId){
    var parameters = {'in_campaign_subtype_id': subTypeId};
    return db.executeScalarManual(GET_COUNT_CAMPAIGN_SUB_TYPE_IN_USE_BY_ID, parameters, "out_result");
}