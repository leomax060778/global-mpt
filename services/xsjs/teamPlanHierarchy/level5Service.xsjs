/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var hl5 = mapper.getLevel5();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
var hl4 = mapper.getLevel4();
var dataBudgetYear = mapper.getDataBudgetYear();
var dataValidation = mapper.getDataValidation();
/******************************************/
var section = "FOR_SEARCH";
var method = "method";
var id = "id";
var setStatusInCRM = "SETINCRM";
var setStatusInCRMByUpload = "SET_IN_CRM_STATUS_BY_UPLOAD";
var changeStatus = "CHANGESTATUS";
var updateBudget = "UPDATE_HL5_BUDGET";
// var sendInCrmNotificationMail = "SENDMAIL";
var getHl5ByUserId = 'GET_HL5_BY_USER_ID';
var getNewSerialAcronym = "GET_SERIAL";
var CLONE = "CLONE";

/******************************************/


function processRequest(){
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level4()));
}

function handleGet(params, userId) {
    var newSerial = httpUtil.getUrlParameters().get(getNewSerialAcronym);
    var in_hl4_id = httpUtil.getUrlParameters().get("HL4_ID");
    var in_hl5_id = httpUtil.getUrlParameters().get("HL5_ID");
    var search_section = httpUtil.getUrlParameters().get("METHOD");
    var param_section = httpUtil.getUrlParameters().get("section");
    var dataType = httpUtil.getUrlParameters().get("DATA");
    var in_sale_organization = httpUtil.getUrlParameters().get("SALE_ORGANIZATION_ID");
    var budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR");
    var currentHl5Id = httpUtil.getUrlParameters().get("CURRENT_HL5");
    var isMarketingTacticView = (httpUtil.getUrlParameters().get("IS_MARKETING_TACTIC_VIEW"))? 1: 0;
    var result = {};

    if(httpUtil.getUrlParameters().get("METHOD") == "CHECK_ENABLED_CRM_CREATION"){
        var budgetYear = dataValidation.getBudgetYearByIdLevel(in_hl5_id, "HL5");

        var budgetYearObj = dataBudgetYear.getBudgetYearId(budgetYear[0].BUDGET_YEAR_ID);

        result = {'ENABLE_CRM_CREATION' : budgetYearObj.ENABLE_CRM_CREATION === 1};
        return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
    }

    if(newSerial)
    {
        result = hl5.getNewSerialAcronym(in_hl4_id);
    }else if(in_hl4_id && !dataType){
        var includeLegacy = httpUtil.getUrlParameters().get("INCLUDE_LEGACY");
        result = hl5.getHl5ByHl4Id(in_hl4_id, userId, includeLegacy);
    } else if (in_hl5_id) {
        var isCarryOver = httpUtil.getUrlParameters().get("METHOD") == "CARRY_OVER";
        var isLegacy = httpUtil.getUrlParameters().get("METHOD") == "NEW_LEGACY";
        result = hl5.getHl5ById(in_hl5_id, isCarryOver, isLegacy);
    } else if (search_section && search_section == section){
        budgetYearId = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
        var regionId = httpUtil.getUrlParameters().get("REGION_ID") || null;
        var subRegionId = httpUtil.getUrlParameters().get("SUBREGION_ID") || null;
        var limit = httpUtil.getUrlParameters().get("LIMIT") || null;
        var offset = httpUtil.getUrlParameters().get("OFFSET") || null;
        result = hl5.getLevel5ForSearch(budgetYearId, regionId, subRegionId, limit, offset, userId);
    } else if (dataType && dataType == "MARKETING_PROGRAM"){
        result = hl5.getAllMarketingProgram();
    } else if (dataType && dataType == "MARKETING_ACTIVITY"){
        result = hl5.getMarketingActivityHl5(in_hl4_id,currentHl5Id);
    } else if (dataType && dataType == "BUSINESS_OWNER"){
        result = hl5.getAllBusinessOwner();
    } else if (dataType && dataType == "COST_CENTER"){
        result = hl5.getCostCenterByHl4IdMarketingOrganizationId(in_hl4_id,in_sale_organization);
    } else if(param_section && param_section == getHl5ByUserId){
        result = hl5.getHl5ByUserId(userId, isMarketingTacticView);
    } else{
        throw ErrorLib.getErrors().BadRequest("","level5Service/handleGet","invalid parameter name (can be: HL4_ID, HL5_ID or section)");
    }
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of PUT call -- Update HL5
function handlePut(reqBody, userId){
    var parameters = httpUtil.getUrlParameters();

    if(parameters.length > 0){
        var aCmd = parameters.get('method');
        var hl5Id = !reqBody ? parameters.get('HL5_ID') : reqBody.hl5Ids;

        /*throw JSON.stringify(aCmd);*/
        switch (aCmd) {
            case setStatusInCRM: //set status In CRM
                var rdo = hl5.setStatusInCRM(hl5Id, userId);
                return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
                break;
            case setStatusInCRMByUpload:
                var rdo = hl5.setStatusInCRMByUpload(reqBody, userId);
                return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
                break;
            case changeStatus:
                var CANCEL_CONFIRMATION = parameters.get('CANCEL_CONFIRMATION');
                var rdo = hl5.changeStatusOnDemand(hl5Id, userId, CANCEL_CONFIRMATION);
                return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
                break;
            case "UPD_ENABLED_CRM_CREATION":
                var enable_crm_creation = parameters.get('ENABLE_CRM_CREATION');

                rdo = hl5.updEnableCrmCreation(hl5Id, enable_crm_creation);
                return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
                break;
            case updateBudget:
                rdo = hl5.updateHl5Budget(reqBody, userId);
                return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("","level5Services/handlePut","insufficient parameters");
        }
    }else{
        var result =  hl5.updateHl5(reqBody, userId);
        return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
    }
}

//Implementation of DELETE call -- Delete HL5
function handleDelete(reqBody, userId){
    var result = hl5.deleteHl5(reqBody, userId);
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of POST call -- Insert HL5
function handlePost(reqBody, userId) {
    var result  =  '';
    var method = httpUtil.getUrlParameterByName("METHOD");
    if(method === CLONE){
        result = hl5.clone(reqBody.HL5_ID, userId); //return new L5 Id
    }else{
        result = hl5.insertHl5(reqBody, userId); //return new L5 Id
    }

    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

processRequest();