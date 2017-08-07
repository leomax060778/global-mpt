/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blCampaignSubType = mapper.getCampaignSubTypeLib();
/** *************************************** */
var GET_BY_CAMPAIGN_ID = "GET_BY_CAMPAIGN_ID";
var GET_ALL_BY_CAMPAIGN_ID = "GET_ALL_BY_CAMPAIGN_ID";
var UPD_CAMPAIGN_TYPE_SUBTYPE_DATE_RULE = "UPD_DATE_RULES";
var BY_ID = "BY_ID";
function processRequest() {
    return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet(parameters, userSessionID) {
    var rdo = null;
    if (parameters.length > 0) {
        switch (parameters[0].name) {
            case GET_BY_CAMPAIGN_ID:
                rdo = blCampaignSubType.getAllCampaignSubTypeByTypeId(parameters[0].value, parameters[1] ? parameters[1].value : null);
                break;
            case BY_ID:
                rdo = blCampaignSubType.getAllCampaignSubTypeById(parameters[0].value);
                break;
            case GET_ALL_BY_CAMPAIGN_ID:
                rdo = blCampaignSubType.getAllCampaignSubTypeByTypeId(parameters[0].value, parameters[1].value, "All");
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("", "campaignSubType/handleGet", "invalid parameter name (can be: GET_BY_CAMPAIGN_ID, GET_ALL_BY_CAMPAIGN_ID or BY_ID)");
                break;
        }
    } else {
        rdo = blCampaignSubType.getAllCampaignSubType();
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userId) {
    var rdo = blCampaignSubType.insertCampaignSubType(reqBody, userId);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}
function handlePut(reqBody, userId) {
    var parameter = httpUtil.getUrlParameters()[0].name;
    if(parameter == UPD_CAMPAIGN_TYPE_SUBTYPE_DATE_RULE){
        var rdo = blCampaignSubType.updateDateRules(reqBody, userId);
        httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
    }else{
        var rdo = blCampaignSubType.updateCampaignSubType(reqBody, userId);
        httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
    }

}
function handleDelete(reqBody, userId) {
    var confirm = httpUtil.getUrlParameters().get("CONFIRM_OK");
    var rdo = blCampaignSubType.deleteCampaignSubType(reqBody, userId, confirm);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}
processRequest();