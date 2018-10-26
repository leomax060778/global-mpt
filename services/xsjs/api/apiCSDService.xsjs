/** **** libs *********** */
$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var ErrorLib = mapper.getErrors();

var apiLib = mapper.getApiCSD();
/** *************************************** */

function processRequest() {
    httpUtil.processRequest(handleGet, handlePost, handlePut, handleDelete, false, "", true);
}

function handleGet(parameters, userId){
    var rdo = {};
    var method = httpUtil.getUrlParameterByName("METHOD");
    var hl4Id = httpUtil.getUrlParameterByName("HL4_ID");

    switch(method){
        case "GET_LEAD_FORM_INFORMATION":
            rdo = apiLib.getLeadFormInformation(hl4Id);
            break;
        case "GET_ACTIVITIES_FORM_INFORMATION":
            rdo = apiLib.getActivitiesFormInformation();
            break;
        case "GET_SEGMENTATION_FORM_INFORMATION":
            rdo = apiLib.getSegmentationFormInformation(hl4Id);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","apiCSDService/handleGet","invalid parameter name (can be: GET_LEAD_FORM_INFORMATION, GET_ACTIVITIES_FORM_INFORMATION or GET_SEGMENTATION_FORM_INFORMATION)");
            break;
    }

    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(reqBody, userId) {
    httpUtil.notImplementedMethod();
};

function handlePut(reqBody, userId) {
	httpUtil.notImplementedMethod();
};

function handleDelete(reqBody, userId) {
    httpUtil.notImplementedMethod();
};

processRequest();