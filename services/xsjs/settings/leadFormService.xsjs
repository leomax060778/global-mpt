/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var leadLib = mapper.getLeadForm();
var ErrorLib = mapper.getErrors();
/** *************************************** */

function processRequest() {
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"",true);
}

function handleGet(parameters, userSessionID) {
    var method = httpUtil.getUrlParameterByName("METHOD");
    var rdo = [];
    switch(method){
        case "GET_LEAD_FORM_BY_HL4_ID":
            var hl4Id = httpUtil.getUrlParameterByName("HL4_ID");
            rdo = leadLib.getLeadFormByHl4Id(hl4Id);
            break;
        case "GET_LEAD_FORM_BY_ID":
            var leadFormId = httpUtil.getUrlParameterByName("LEAD_FORM_ID");
            rdo = leadLib.getLeadFormById(leadFormId);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","segmentationService/handleGet","invalid parameter name.");
            break;
    }

    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userSessionID) {
    return httpUtil.notImplementedMethod();
};

function handlePut(reqBody, userSessionID) {
    return httpUtil.notImplementedMethod();
};

function handleDelete(reqBody, userSessionID) {
    return httpUtil.notImplementedMethod();
};

processRequest();