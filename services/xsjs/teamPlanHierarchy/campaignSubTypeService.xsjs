/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blCampaignSubType = mapper.getCampaignSubTypeLib();
/** *************************************** */
var GET_BY_CAMPAIGN_ID = "GET_BY_CAMPAIGN_ID";
var BY_ID = "BY_ID";
function processRequest() {
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userSessionID) {
    var rdo = null;
    if(parameters.length > 0){
        switch(parameters[0].name){
            case GET_BY_CAMPAIGN_ID:
                rdo = blCampaignSubType.getAllCampaignSubTypeByTypeId(parameters[0].value);
                break;
            case BY_ID:
                rdo = blCampaignSubType.getAllCampaignSubTypeById(parameters[0].value);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("","campaignSubType/handleGet","invalid parameter name (can be: GET_BY_CAMPAIGN_ID or BY_ID)");
                break;
        }
    }else{
        rdo = blCampaignSubType.getAllCampaignSubType();
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userId) {
    return httpUtil.notImplementedMethod();
};
function handlePut(reqBody, userId) {
    return httpUtil.notImplementedMethod();
};
function handleDelete(reqBody, userId) {
    return httpUtil.notImplementedMethod();
};

processRequest();