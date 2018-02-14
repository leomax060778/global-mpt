/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blMarketingActivity = mapper.getMarketingActivityLib();
/** *************************************** */
function processRequest() {
    return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet(parameters, userSessionID) {
    var rdo = blMarketingActivity.getAllMarketingActivity();
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}
function handlePost(reqBody, userId) {
    var method = httpUtil.getUrlParameters().get("METHOD");
    var result;
    switch (method){
        case "UPLOAD":
            result = reqBody.check ? blMarketingActivity.checkMarketingActivity(reqBody, userId) : blMarketingActivity.uploadMarketingActivity(reqBody, userId);
            break;
        default:
            result = blMarketingActivity.insertMarketingActivity(reqBody, userId);
            break;
    }
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}
function handlePut(reqBody, userId) {
    var rdo = blMarketingActivity.updateMarketingActivity(reqBody, userId);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}
function handleDelete(reqBody, userId) {
    var confirm = httpUtil.getUrlParameters().get("CONFIRM_OK");
    var rdo = blMarketingActivity.deleteMarketingActivity(reqBody, userId, confirm);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}
processRequest();