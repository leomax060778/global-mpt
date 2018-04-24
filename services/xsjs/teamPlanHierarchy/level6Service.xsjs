/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var hl5 = mapper.getLevel5();
var hl6 = mapper.getLevel6();
var ErrorLib = mapper.getErrors();
var config = mapper.getDataConfig();
/******************************************/
var section = "FOR_SEARCH";
var method = "method";
var id = "id";
var setStatusInCRM = "SETINCRM";
var changeStatus = "CHANGESTATUS";
// var sendInCrmNotificationMail = "SENDMAIL";
var categories = "HL5_CATEGORIES";
var expectedOutcomes = "HL5_EXPECTED_OUTCOMES";
var getHl6ByUserId = 'GET_HL6_BY_USER_ID';
var CLONE = "CLONE";
/******************************************/

function processRequest(){
    return httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete,false, config.getResourceIdByName(config.level5()));
}

function handleGet(params, userId) {
    var in_hl5_id = httpUtil.getUrlParameters().get("HL5_ID");
    var in_hl6_id = httpUtil.getUrlParameters().get("HL6_ID");
    var param_section = httpUtil.getUrlParameters().get("section");
    var hl5_categories = httpUtil.getUrlParameters().get("HL5_CATEGORIES");
    var hl5_expectedOutcomes = httpUtil.getUrlParameters().get("HL5_EXPECTED_OUTCOMES");
    var result = {};

    if(in_hl5_id && in_hl6_id === "0" ){

        var acronym = hl6.getNewHl6Id(in_hl5_id);

        result = acronym ? acronym : 0;

    }else if(in_hl5_id && !hl5_categories && !hl5_expectedOutcomes && !param_section){
        result = hl6.getHl6ByHl5Id(in_hl5_id, userId);
    }else if(in_hl6_id){
        result = hl6.getHl6ById(in_hl6_id);
    }else if (param_section && param_section == section){
        var budget_year_id = httpUtil.getUrlParameters().get("BUDGET_YEAR_ID") || null;
        var region_id = httpUtil.getUrlParameters().get("REGION_ID") || null;
        var subregion_id = httpUtil.getUrlParameters().get("SUBREGION_ID") || null;
        var limit = httpUtil.getUrlParameters().get("LIMIT") || null;
        var offset = httpUtil.getUrlParameters().get("OFFSET") || null;
        result = hl6.getLevel6ForSearch(userId, budget_year_id, region_id, subregion_id, limit, offset);
    } else if(in_hl5_id && param_section && param_section == getHl6ByUserId){
        result = hl6.getHl6ByHl5IdUserId(in_hl5_id, userId);
    } else{
        throw ErrorLib.getErrors().BadRequest("","level6Services/handleGet","invalid parameter name (can be: HL5_ID, HL6_ID or section)");
    }
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of PUT call -- Update HL6
function handlePut(reqBody, userId){
    var parameters = httpUtil.getUrlParameters();
    if(parameters.length > 0){
        var aCmd = parameters.get('method');
        var hl6Id = !reqBody ? parameters.get('HL6_ID') : reqBody.hl6Ids;
        switch (aCmd) {
            case setStatusInCRM: //set status In CRM
                var rdo = hl6.setStatusInCRM(hl6Id, userId);
                return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
                break;
            case changeStatus:
                var CANCEL_CONFIRMATION = parameters.get('CANCEL_CONFIRMATION');
                var rdo = hl6.changeStatusOnDemand(hl6Id, userId, CANCEL_CONFIRMATION);
                return	httpUtil.handleResponse(rdo,httpUtil.OK,httpUtil.AppJson);
                break;
            default:
                throw ErrorLib.getErrors().BadRequest("","level6Services/handlePut","insufficient parameters");
        }
    }else{
        var result =  hl6.updateHl6(reqBody, userId);
        return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
    }
}

//Implementation of DELETE call -- Delete HL6
function handleDelete(reqBody, userId){
    var result =  hl6.deleteHl6(reqBody, userId);
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

//Implementation of POST call -- Insert HL6
function handlePost(reqBody, userId) {
    var result  =  '';
    var method = httpUtil.getUrlParameterByName("METHOD");
    if(method === CLONE){
        result = hl6.clone(reqBody.HL6_ID, userId); //return new L6 Id
    }else{
        result = hl6.insertHl6(reqBody, userId); //return new L6 Id
    }

    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
}

processRequest();