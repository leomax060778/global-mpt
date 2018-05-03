$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var dataCampaignSubType = mapper.getDataCampaignSubType();
var dataCampaignObjective = mapper.getDataCampaignObjective();
/** ***********END INCLUDE LIBRARIES*************** */


var CAMPAIGN_SUB_TYPE_EXISTS = "The campaign subtype already exists.";
var CAMPAIGN_SUB_TYPE_DATA = "No data found.";
var CAMPAIGN_SUB_TYPE_CRM_KEY_EXISTS = "Another campaign subtype has the same CRM key.";
var CAMPAIGN_SUB_TYPE_NAME = "Campaign subtype Name is missing.";
var CAMPAIGN_SUB_TYPE_CRM_KEY= "Campaign subtype CRM key is missing.";

function getAllCampaignSubType(idCampaignType) {
    return dataCampaignSubType.getAllCampaignSubType();
}

/**
 *
 * @param idCampaignType
 * @param idObjective
 * @param returnMode {string} - "All" or just the assigned C.S.T.
 * @returns {*}
 */
function getAllCampaignSubTypeByTypeId(idCampaignType, idObjective, returnMode) {

    if (returnMode === "All") {
        return {
            assigned: dataCampaignSubType.getAllCampaignSuTypeByCampaignTypeId(idCampaignType, idObjective),
            available: dataCampaignSubType.getAllAvailableCampaignSubTypeByCampaignTypeId(idCampaignType, idObjective)
        };
    } else {
        if(idObjective)
            return dataCampaignSubType.getAllCampaignSuTypeByCampaignTypeId(idCampaignType, idObjective);

        return dataCampaignSubType.getCampaignSuTypeByCampaignTypeId(idCampaignType);
    }
}

function getAllCampaignSubTypeById(idCampaignSubType) {
    return dataCampaignSubType.getCampaignSubTypeById(idCampaignSubType);
}
function insertCampaignSubType(payload, userId) {
    validateCampaignType(payload);
    return dataCampaignSubType.insertCampaignSubType(
        payload.IN_NAME.trim()
        , payload.IN_CRM_KEY.trim()
        , payload.IN_ROLLOVER_TEXT ? payload.IN_ROLLOVER_TEXT.trim() : null
        , payload.IN_EXAMPLE ? payload.IN_EXAMPLE.trim() : null
        , userId);
}

function validateCampaignType(data) {
    if(!data)
        throw ErrorLib.getErrors().CustomError("", "campaignSubTypeService/handlePost/validateCampaignSubType", CAMPAIGN_SUB_TYPE_DATA);

    if(!data.IN_NAME.trim())
        throw ErrorLib.getErrors().CustomError("", "campaignSubTypeService/handlePost/validateCampaignSubType", CAMPAIGN_SUB_TYPE_NAME);

    if(!data.IN_CRM_KEY.trim())
        throw ErrorLib.getErrors().CustomError("", "campaignSubTypeService/handlePost/validateCampaignSubType", CAMPAIGN_SUB_TYPE_CRM_KEY);

    var campaignSubType = dataCampaignSubType.getCampaignSubTypeByName(data.IN_NAME);
    if(campaignSubType && Number(data.IN_CAMPAIGN_SUB_TYPE_ID) !== Number(campaignSubType.CAMPAIGN_SUB_TYPE_ID))
        throw ErrorLib.getErrors().CustomError("", "campaignSubTypeService/handlePost/validateCampaignType", CAMPAIGN_SUB_TYPE_EXISTS);

    campaignSubType = dataCampaignSubType.getCampaignSubTypeByCrmKey(data.IN_CRM_KEY);
    if(campaignSubType && Number(data.IN_CAMPAIGN_SUB_TYPE_ID) !== Number(campaignSubType.CAMPAIGN_SUB_TYPE_ID))
        throw ErrorLib.getErrors().CustomError("", "campaignSubTypeService/handlePost/validateCampaignType", CAMPAIGN_SUB_TYPE_CRM_KEY_EXISTS);

    return true;
}

function updateCampaignSubType(campaignSubTypeData, userId) {
    validateCampaignType(campaignSubTypeData);
    return dataCampaignSubType.updateCampaignSubType(
        campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID
        , campaignSubTypeData.IN_NAME.trim()
        , campaignSubTypeData.IN_CRM_KEY.trim()
        , campaignSubTypeData.IN_ROLLOVER_TEXT ? campaignSubTypeData.IN_ROLLOVER_TEXT.trim() : null
        , campaignSubTypeData.IN_EXAMPLE ? campaignSubTypeData.IN_EXAMPLE.trim() : null
        , userId);
}

function updateDateRules(data, userId){
    return dataCampaignSubType.updateDateRules(
        data.CAMPAIGN_TYPE_ID,
        data.CAMPAIGN_SUBTYPE_ID,
        data.VALIDATE_DATE_RULE,
        data.ACTUAL_START_DATE_ROLLOVER_TEXT,
        data.ACTUAL_END_DATE_ROLLOVER_TEXT,
        userId
    );
}

function deleteCampaignSubType(campaignSubTypeData, userId, confirm) {

    if (!campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID)
        throw ErrorLib.getErrors().CustomError("",
            "campaignTypeServices/handleDelete/deleteCampaignSubType",
            "The CAMPAIGN_TYPE_ID is not found");

    if (confirm) {
        dataCampaignObjective.deleteObjectiveCampaignTypeByCampaignSubTypeId(campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID);
        return dataCampaignSubType.deleteCampaignSubType(campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID, userId);
    } else {
        var countRegisters = dataCampaignSubType.checkInUseCampaignSubTypeById(campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID);
        if (countRegisters > 0) {
            throw ErrorLib.getErrors().ConfirmDelete("",
                "objectiveServices/handleDelete/checkInUseCampaignSubTypeById",
                countRegisters);
        } else {
            dataCampaignObjective.deleteObjectiveCampaignTypeByCampaignSubTypeId(campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID);
            return dataCampaignSubType.deleteCampaignSubType(campaignSubTypeData.IN_CAMPAIGN_SUB_TYPE_ID, userId);
        }
    }
}

function getByName(name){
    return dataCampaignSubType.getCampaignSubTypeByName(name);
}

function insertEntity(data, userId) {
    return insertCampaignSubType(data, userId);
}

function updateEntity(data, userId) {
    return updateCampaignSubType(data, userId);
}