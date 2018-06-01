/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var businessPlan = mapper.getLevel4DEReport();
var errors = mapper.getErrors();
var config = mapper.getDataConfig();
var budgetSpendRequest = mapper.getBudgetSpendRequest();
var budgetReportLib = mapper.getBudgetSpendReportLib();
var ErrorLib = mapper.getErrors();
/******************************************/

function processRequest(){
return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, false, false, config.getResourceIdByName(config.budgetSpendRequest()));
}

function handleGet(param){
    var method = httpUtil.getUrlParameters().get("method");
    var hlId = httpUtil.getUrlParameters().get("HL_ID");
    var level = httpUtil.getUrlParameters().get("LEVEL");
    var isLegacy = httpUtil.getUrlParameters().get("IS_LEGACY");
    isLegacy = isLegacy && isLegacy === "true";
    
    var result = {};
    switch (method) {
		case 'NO_CO_FUNDED':
            result = budgetSpendRequest.checkCountBudgetSpendRequestByHlIdLevel(hlId, level);
			break;
        case 'OTHER_BUDGET_APPROVER_VIEW':
            var hash = httpUtil.getUrlParameters().get("HASH");
            result = budgetReportLib.getSpendBudgetReportByHash(hash);
            break;
        case 'GET_REMAINING':
            result = budgetSpendRequest.getBudgetRemaining(hlId, level, isLegacy);
            break;
		default:
            throw ErrorLib.getErrors().BadRequest("","BudgetSpendRequestService/handleGet","Invalid parameter name");
	}
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
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