/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();
var blMarketingProgram = mapper.getMarketingProgramLib();
/** *************************************** */
function processRequest() {
    return httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet(parameters, userSessionID) {
    var rdo = blMarketingProgram.getAllMarketingProgram();
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}
function handlePost(reqBody, userId) {
    var method = $.request.parameters.get("METHOD");
    var result;
    switch (method){
        case "UPLOAD":
            result = reqBody.check ? blMarketingProgram.checkMarketingProgram(reqBody, userId) : blMarketingProgram.uploadMarketingProgram(reqBody, userId);
            break;
        default:
            result = blMarketingProgram.insertMarketingProgram(reqBody, userId);
            break;
    }
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}
function handlePut(reqBody, userId) {
    var rdo = blMarketingProgram.updateMarketingProgram(reqBody, userId);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}
function handleDelete(reqBody, userId) {
    var confirm = httpUtil.getUrlParameters().get("CONFIRM_OK");
    var rdo = blMarketingProgram.deleteMarketingProgram(reqBody, userId, confirm);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
}
processRequest();