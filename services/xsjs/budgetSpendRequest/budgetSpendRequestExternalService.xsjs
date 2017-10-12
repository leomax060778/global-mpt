/****** libs ************/
$.import("mktgplanningtool.services.commonLib","mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var httpUtil = mapper.getHttp();
var errors = mapper.getErrors();
var config = mapper.getDataConfig();
var budgetReportLib = mapper.getBudgetSpendReportLib();
var ErrorLib = mapper.getErrors();
/******************************************/

function processRequest(){
    return	httpUtil.processRequest(handleGet,handlePost,handlePut,handleDelete, true, "", true);
}

function handleGet(param){
    var method = httpUtil.getUrlParameters().get("method");
    var result = {};
    switch (method) {
        case 'OTHER_BUDGET_APPROVER_VIEW':
            var hash = httpUtil.getUrlParameters().get("HASH");
            result = budgetReportLib.getSpendBudgetReportByHash(hash);
            break;
        default:
            throw ErrorLib.getErrors().BadRequest("","BudgetSpendRequestService/handleGet","Invalid parameter name");
    }
    return httpUtil.handleResponse(result,httpUtil.OK,httpUtil.AppJson);
};

function handlePost(){
    return httpUtil.notImplementedMethod();
};

function handlePut(reqBody, userId){
    var parameters = httpUtil.getUrlParameters();
    var rdo;
    if(parameters.length > 0){
        var method = parameters.get('METHOD');
        if(method === "APPROVE"){
            rdo = budgetReportLib.approveBudgetSpendRequest(reqBody, userId);
        } else if(method === "REJECT"){
            rdo = budgetReportLib.rejectBudgetSpendRequest(reqBody, userId);
        } else if(method === "DELETE"){
            rdo = budgetReportLib.deleteBudgetSpendRequest(reqBody, userId);
        } else{
            throw ErrorLib.getErrors().BadRequest(
                "",
                "dataEntryReport/handlePut",
                "invalid parameter (can be: APPROVE, DELETE or REJECT)"
            );
        }
    }else{
        throw ErrorLib.getErrors().BadRequest(
            "",
            "dataEntryReport/handlePut",
            "missing parameter (can be: METHOD)"
        );
    }

    httpUtil.handleResponse(rdo, httpUtil.OK, httpUtil.AppJson);
};

function handleDelete(){
    return httpUtil.notImplementedMethod();
};

processRequest();