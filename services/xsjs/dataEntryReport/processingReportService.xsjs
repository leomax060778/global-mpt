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
    //return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false, config.getResourceIdByName(config.level3()));
	return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false,"", true);
}

function handleGet(param){
    var method = httpUtil.getUrlParameterByName("METHOD");
    var hierarchy = httpUtil.getUrlParameterByName("HL");
    var hl_id = httpUtil.getUrlParameterByName("HL_ID");
    var ALL = httpUtil.getUrlParameterByName("ALL");
    var filter = httpUtil.getUrlParameterByName("FILTER");
    var rdo;
    switch (hierarchy){
        case 'HL4':
            if(method === "DOWNLOAD_CREATE_IN_CRM")
                rdo = businessPlanL4.getAllL4CreateInCrmDEReportForDownload();
            else if(method === "DOWNLOAD_UPDATE_IN_CRM")
                rdo = businessPlanL4.getAllHL4ChangedFields();
            else if(method === "DOWNLOAD_DELETION_REQUEST")
                rdo = !ALL ? businessPlanL4.getAllHL4DeletionRequest('HL4') : businessPlanL4.getAllHL4DeletionRequest('ALL_LEVELS');
            else if (!hl_id){
                rdo = businessPlanL4.getAllL4DEReport();
            }
            else {
                rdo = businessPlanL4.getL4ChangedFieldsByHl4Id(hl_id);
            }
            break;
        case 'HL5':
            if(method === "DOWNLOAD_CREATE_IN_CRM")
                rdo = businessPlanL5.getAllL5CreateInCrmDEReportForDownload();
            else if(method === "DOWNLOAD_UPDATE_IN_CRM")
                rdo = businessPlanL5.getAllHL5ChangedFields(filter);
            else if(method === "DOWNLOAD_DELETION_REQUEST")
                rdo = !ALL ? businessPlanL5.getAllHL5DeletionRequest('HL5'): businessPlanL5.getAllHL5DeletionRequest('ALL_LEVELS');
            else if (method === "GET_COUNT_UPDATE_IN_CRM"){
                rdo = businessPlanL5.getCountHL5UpdateInCRM();
            }
            else if (method === "DOWNLOAD_EVENT_DATA"){
                rdo = businessPlanL5.getEventDataReport();
            }
            else if (!hl_id){
                rdo = businessPlanL5.getAllL5DEReport();
            }
            else {
                rdo = businessPlanL5.getL5ChangedFieldsByHl5Id(hl_id);
            }
            break;
        default:
            if(method === "DOWNLOAD_CREATE_IN_CRM")
                rdo = businessPlanL6.getAllL6CreateInCrmDEReportForDownload();
            else if(method === "DOWNLOAD_UPDATE_IN_CRM")
                rdo = businessPlanL6.getAllHL6ChangedFields(filter);
            else if(method === "DOWNLOAD_DELETION_REQUEST")
                rdo = !ALL ? businessPlanL6.getAllHL6DeletionRequest('HL6'): businessPlanL6.getAllHL6DeletionRequest('ALL_LEVELS');
            else if (method === "GET_COUNT_UPDATE_IN_CRM"){
                rdo = businessPlanL6.getCountHL6UpdateInCRM();
            }
            else if (method === "DOWNLOAD_EVENT_DATA"){
                rdo = businessPlanL6.getEventDataReport();
            }
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
