$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataCampaignType = mapper.getDataCampaignType();
var dataCampaignObjective = mapper.getDataCampaignObjective();
/** ***********END INCLUDE LIBRARIES*************** */

var CAMPAIGN_TYPE_DATA = "No data found.";
var CAMPAIGN_TYPE_EXISTS = "The campaign type already exists.";
var CAMPAIGN_TYPE_CRM_KEY_EXISTS = "Another campaign type has the same CRM key.";
var CAMPAIGN_TYPE_NAME = "Campaign type Name is missing.";
var CAMPAIGN_TYPE_CRM_KEY= "Campaign type CRM key is missing.";

function getAllCampaignType() {
    return dataCampaignType.getAllCampaignType();
}

function getCampaignTypeById(idCampaignType) {
    return dataCampaignType.getCampaignTypeById(idCampaignType);
}

function getCampaignTypeByObjectiveId(objectiveId) {
    return dataCampaignType.getCampaignTypeByObjectiveId(objectiveId);
}

function insertCampaignType(payload, userId) {
    validateCampaignType(payload);
    return dataCampaignType.insertCampaignType(payload.IN_NAME, payload.IN_SHOW_ADDITIONAL_FIELDS, payload.IN_CRM_KEY, userId);
}
function validateCampaignType(data) {
    if(!data)
        throw ErrorLib.getErrors().CustomError("", "campaignTypeService/handlePost/validateCampaignType", CAMPAIGN_TYPE_DATA);

    if(!data.IN_NAME)
        throw ErrorLib.getErrors().CustomError("", "campaignTypeService/handlePost/validateCampaignType", CAMPAIGN_TYPE_NAME);

    if(!data.IN_CRM_KEY)
        throw ErrorLib.getErrors().CustomError("", "campaignTypeService/handlePost/validateCampaignType", CAMPAIGN_TYPE_CRM_KEY);

    var campaignType = dataCampaignType.getCampaignTypeByName(data.IN_NAME);
    if(campaignType && Number(data.IN_CAMPAIGN_TYPE_ID) !== Number(campaignType.CAMPAIGN_TYPE_ID))
        throw ErrorLib.getErrors().CustomError("", "campaignTypeService/handlePost/validateCampaignType", CAMPAIGN_TYPE_EXISTS);

    campaignType = dataCampaignType.getCampaignTypeByCrmKey(data.IN_CRM_KEY);
    if(campaignType && Number(data.IN_CAMPAIGN_TYPE_ID) !== Number(campaignType.CAMPAIGN_TYPE_ID))
        throw ErrorLib.getErrors().CustomError("", "campaignTypeService/handlePost/validateCampaignType", CAMPAIGN_TYPE_CRM_KEY_EXISTS);

    return true;
}

function updateCampaignType(campaignTypeData, userId){
    validateCampaignType(campaignTypeData);
    return dataCampaignType.updateCampaignType(campaignTypeData.IN_CAMPAIGN_TYPE_ID
        , campaignTypeData.IN_NAME
        , campaignTypeData.IN_SHOW_ADDITIONAL_FIELDS
        , campaignTypeData.IN_CRM_KEY
        , userId);
}

function deleteCampaignType(campaignTypeData, userId, confirm){
    if (!campaignTypeData.IN_CAMPAIGN_TYPE_ID)
        throw ErrorLib.getErrors().CustomError("",
            "campaignTypeServices/handleDelete/deleteCampaignType",
            "The CAMPAIGN_TYPE_ID is not found");

    if(confirm){
        dataCampaignObjective.deleteObjectiveCampaignTypeByCampaignTypeId(campaignTypeData.IN_CAMPAIGN_TYPE_ID);
        return dataCampaignType.deleteCampaignType(campaignTypeData.IN_CAMPAIGN_TYPE_ID, userId);
    } else {
        var countRegisters = dataCampaignType.checkInUseCampaignTypeById(campaignTypeData.IN_CAMPAIGN_TYPE_ID) || 0;
        var retValue = 0;
        if (countRegisters)
            throw ErrorLib.getErrors().ConfirmDelete("",
                "campaignTypeServices/handleDelete/checkInUseCampaignTypeById",
                countRegisters);
        else
            dataCampaignObjective.deleteObjectiveCampaignTypeByCampaignTypeId(campaignTypeData.IN_CAMPAIGN_TYPE_ID);
            retValue = dataCampaignType.deleteCampaignType(campaignTypeData.IN_CAMPAIGN_TYPE_ID, userId);

        return retValue;
    }



}