/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var blSaleOrganization = mapper.getSaleOrganizationLib();
/** *************************************** */

function processRequest() {
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userSessionID) {
    var rdo = blSaleOrganization.getAllSaleOrganization();
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userId) {
    var rdo = reqBody.check ? blSaleOrganization.checkMarketingOrganization(reqBody, userId) : blSaleOrganization.uploadMarketingOrganization(reqBody, userId);
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};
function handlePut(reqBody, userId) {
    return httpUtil.notImplementedMethod();
};
function handleDelete(reqBody, userId) {
    return httpUtil.notImplementedMethod();
};

processRequest();