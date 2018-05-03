/***************Import Library*******************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
/*************************************************/

var GET_CATEGORY_OPTION_BY_EVENT_REQUEST_ID = "GET_CATEGORY_OPTION_BY_EVENT_REQUEST_ID";
var INS_EVENT_REQUEST_CATEGORY_OPTION = "INS_EVENT_REQUEST_CATEGORY_OPTION";
var UPD_EVENT_REQUEST_CATEGORY_OPTION = "UPD_EVENT_REQUEST_CATEGORY_OPTION";

function getEventRequestCategoryOptions(eventRequestId){
    if(eventRequestId){
        var rdo = db.executeProcedureManual(GET_CATEGORY_OPTION_BY_EVENT_REQUEST_ID,{'IN_EVENT_REQUEST_ID': eventRequestId});
        return db.extractArray(rdo.out_result);
    }
    return [];
}

function insertEventRequestCategoryOption(data) {
    return db.executeScalarManual(INS_EVENT_REQUEST_CATEGORY_OPTION, data, 'out_result');
}

function updateEventRequestCategoryOption(data) {
    return db.executeScalarManual(UPD_EVENT_REQUEST_CATEGORY_OPTION, data, 'out_result');
}