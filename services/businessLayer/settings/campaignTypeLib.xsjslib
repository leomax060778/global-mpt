$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataCampaignType = mapper.getDataCampaignType();
var dataCampaignObjective = mapper.getDataCampaignObjective();
/** ***********END INCLUDE LIBRARIES*************** */

var CAMPAIGN_TYPE_EXISTS = "The campaign type already exists.";

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

    if (existCampaignTypeByName(payload)) {
        throw ErrorLib.getErrors().BadRequest("", "campaignTypeService/handlePost/insertCampaignType", CAMPAIGN_TYPE_EXISTS);
    }

    return dataCampaignType.insertCampaignType(payload.IN_NAME, payload.IN_SHOW_ADDITIONAL_FIELDS, userId);
}
function existCampaignTypeByName(payload) {
    return !!dataCampaignType.getCampaignTypeByName(payload.IN_NAME);

}

function updateCampaignType(campaignTypeData, userId){
    return dataCampaignType.updateCampaignType(campaignTypeData.IN_CAMPAIGN_TYPE_ID, campaignTypeData.IN_NAME, campaignTypeData.IN_SHOW_ADDITIONAL_FIELDS, userId);
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