/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var ErrorLib = mapper.getErrors();
var dataDesTypeCampaignSubType = mapper.getDataDesTypeCampaignSubType();
var dataDesType = mapper.getDataDesType();
/**********************************************************************/

var DES_TYPE_NOT_EXIST = "The DES Type does not exist.";

function getDesTypeByCampaignSubTypeId(campaignSubtypeId, userId) {
    if(!campaignSubtypeId){
        throw ErrorLib.getErrors().CustomError("","", "The Campaign Sub Type ID can not be found.");
    }
    if(!userId){
        throw ErrorLib.getErrors().CustomError("","", "The User can not be found.");
    }

    var data = dataDesTypeCampaignSubType.getDesTypeCampaignSubType(campaignSubtypeId);

    //Build result
    var result = {};
    result.SHOW_IN_LEGACY = data.RESULT && data.RESULT.length? data.RESULT[0].SHOW_IN_LEGACY : 0;
    result.AVAILABLES = data.AVAILABLES;
    result.ASSIGNED = data.ASSIGNED;

    return result;
}

function updateDesCampaignSubType(data, userId) {
    if(!data){
        throw ErrorLib.getErrors().CustomError("","", "The Data can not be found.");
    }

    if(!userId){
        throw ErrorLib.getErrors().CustomError("","", "The User can not be found.");
    }

    var countInsert = 0;
    if (!data || !data.CAMPAIGN_SUB_TYPE_ID) {
        throw ErrorLib.getErrors().BadRequest();
    }

    if (data.DES_TYPE_IDS.length) {
        for (var i = 0; i < data.DES_TYPE_IDS.length; i++) {
            if (!existDesType(Number(data.DES_TYPE_IDS[i]))) {
                throw ErrorLib.getErrors().CustomError("", "", DES_TYPE_NOT_EXIST);
                break;
            }
        }
    }

    var totalDesType = data.DES_TYPE_IDS.length;

    var desTypeList = data.DES_TYPE_IDS.map(function (desTypeid) {
        return {in_des_type_id: Number(desTypeid)
            , in_campaign_sub_type_id: Number(data.CAMPAIGN_SUB_TYPE_ID)
            , in_created_user_id: userId}
    });

    var desTypeCampaignTypeDeletedCount = dataDesTypeCampaignSubType.deleteDesTypeCampaignSubType(data.CAMPAIGN_SUB_TYPE_ID);

    if(desTypeList.length) {
        dataDesTypeCampaignSubType.insertDesTypeCampaignSubType(desTypeList);
    }

    //Update Show In Legacy flag
    // dataDesTypeCampaignSubType.updateDesTypeCampaignSubTypeFlags(data, userId);

    return desTypeList.length;
}

function existDesType(desTypeId) {
    return Object.keys(dataDesType.getDesTypeById(desTypeId)).length;
}