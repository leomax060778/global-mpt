/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessPlanL4 = mapper.getLevel4DEReport();
var businessPlanL5 = mapper.getLevel5DEReport();
var businessPlanL6 = mapper.getLevel6DEReport();
var errors = mapper.getErrors();
var config = mapper.getDataConfig();
/******************************************/

function processRequest(){
    return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false, config.getResourceIdByName(config.level3()));
}

function handleGet(param){
    var method = httpUtil.getUrlParameterByName("METHOD");
    var hierarchy = httpUtil.getUrlParameterByName("HL");
    var hl_id = httpUtil.getUrlParameterByName("HL_ID");
    var rdo;
    switch (hierarchy){
        case 'HL4':
            if(method)
                rdo = businessPlanL4.getAllL4DEReportForDownload();
            else if (!hl_id){
                rdo = businessPlanL4.getAllL4DEReport();
            }
            else {
                rdo = businessPlanL4.getL4ChangedFieldsByHl4Id(hl_id);
            }
            break;
        case 'HL5':
            if(method)
                rdo = businessPlanL5.getAllL5DEReportForDownload();
            else if (!hl_id){
                rdo = businessPlanL5.getAllL5DEReport();
            }
            else {
                rdo = businessPlanL5.getL5ChangedFieldsByHl5Id(hl_id);
            }
            break;
        default:
            if(method)
                rdo = businessPlanL6.getAllL6DEReportForDownload();
            else if (!hl_id){
                rdo = businessPlanL6.getAllL6DEReport();
            }
            else {
                rdo = businessPlanL6.getL6ChangedFieldsByHl6Id(hl_id);
            }
            break;
    }
    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handlePost(){
    return httpUtil.notImplementedMethod();
};
function handlePut(){
    return httpUtil.notImplementedMethod();
};
function handleDelete(){
    return httpUtil.notImplementedMethod();
};

processRequest();