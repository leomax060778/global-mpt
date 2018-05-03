$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/** ***********END INCLUDE LIBRARIES*************** */

var GET_DES_TYPE_CAMPAIGN_SUB_TYPE_BY_DES_TYPE_ID = "GET_DES_TYPE_CAMPAIGN_SUB_TYPE_BY_DES_TYPE_ID";
var INS_DES_TYPE_CAMPAIGN_SUB_TYPE = "INS_DES_TYPE_CAMPAIGN_SUB_TYPE";
var DEL_DES_TYPE_CAMPAIGN_SUB_TYPE = "DEL_DES_TYPE_CAMPAIGN_SUB_TYPE";

function getDesTypeCampaignSubType(campaignSubtypeId){
    var params = {};
    params.IN_CAMPAIGN_SUB_TYPE_ID = campaignSubtypeId;

    var result = db.executeProcedureManual(GET_DES_TYPE_CAMPAIGN_SUB_TYPE_BY_DES_TYPE_ID, params);

    var object = {};
    object.AVAILABLES = db.extractArray(result.out_result_available);
    object.ASSIGNED = db.extractArray(result.out_result_assigned);
    object.RESULT = db.extractArray(result.out_result);

    return object;
}

function insertDesTypeCampaignSubType(desTypeTable){
    var params = {};
    params.desTypeTable = desTypeTable;
    return db.executeScalarManual(INS_DES_TYPE_CAMPAIGN_SUB_TYPE, params, 'out_des_type_campaign_id');
}

function deleteDesTypeCampaignSubType(campaignSubtypeId){
    var params = {};
    params.in_campaign_sub_type_id = campaignSubtypeId;
    return db.executeScalarManual(DEL_DES_TYPE_CAMPAIGN_SUB_TYPE, params, 'out_result');
}

