$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var db = mapper.getdbHelper();
var ErrorLib = mapper.getErrors();
/*************END INCLUDE LIBRARIES****************/
//L2
var GET_L2_BUDGET_SPEND_APPROVER_BY_L2_ID = "GET_L2_BUDGET_SPEND_APPROVER_BY_L2_ID";
var GET_OTHER_BUDGET_APPROVER_BY_EMAIL = "GET_OTHER_BUDGET_APPROVER_BY_EMAIL";
var INS_OTHER_BUDGET_APPROVER = "INS_OTHER_BUDGET_APPROVER";
var INS_BUDGET_SPEND_REQUEST_OTHER_BUDGET_APPROVER = "INS_BUDGET_SPEND_REQUEST_OTHER_BUDGET_APPROVER";
var INS_L2_BUDGET_SPEND_APPROVER = "INS_L2_BUDGET_SPEND_APPROVER";
var DEL_L2_BUDGET_SPEND_APPROVER = "DEL_L2_BUDGET_SPEND_APPROVER";
//BUDGET SPEND REQUEST
var INS_BUDGET_SPEND_REQUEST = "INS_BUDGET_SPEND_REQUEST";
var UPD_BUDGET_SPEND_REQUEST = "UPD_BUDGET_SPEND_REQUEST";
var DEL_BUDGET_SPEND_REQUEST = "DEL_BUDGET_SPEND_REQUEST";
var DEL_ALL_BUDGET_SPEND_REQUEST_BY_HL_ID = "DEL_ALL_BUDGET_SPEND_REQUEST_BY_HL_ID";
var GET_ALL_BUDGET_SPEND_REQUEST_BY_HLID_AND_LEVEL = "GET_ALL_BUDGET_SPEND_REQUEST_BY_HLID_AND_LEVEL";
var UPD_BUDGET_SPEND_REQUEST_BY_HL_ID_LEVEL_TYPE = "UPD_BUDGET_SPEND_REQUEST_BY_HL_ID_LEVEL_TYPE";
//BUDGET SPEND REQUEST MESSAGE
var INS_BUDGET_SPEND_REQUEST_MESSAGE = "INS_BUDGET_SPEND_REQUEST_MESSAGE";
var UPD_BUDGET_SPEND_REQUEST_MESSAGE = "UPD_BUDGET_SPEND_REQUEST_MESSAGE";
var DEL_BUDGET_SPEND_REQUEST_MESSAGE_BY_HL_ID = "DEL_BUDGET_SPEND_REQUEST_MESSAGE_BY_HL_ID";
//BUDGET SPEND REQUEST LOG STATUS
var DEL_ALL_BUDGET_SPEND_REQUEST_LOG_STATUS_BY_HL_ID = "DEL_ALL_BUDGET_SPEND_REQUEST_LOG_STATUS_BY_HL_ID";
var DEL_HARD_BUDGET_SPEND_REQUEST_OTHER_BUDGET_APPROVER_BY_BUDGET_SPEND_REQUEST_ID = "DEL_HARD_BUDGET_SPEND_REQUEST_OTHER_BUDGET_APPROVER_BY_BUDGET_SPEND_REQUEST_ID";
//HL5
var GET_COUNT_BUDGET_SPEND_REQUEST_BY_HL5_ID_BUDGET_REQUEST_STATUS_ID = "GET_COUNT_BUDGET_SPEND_REQUEST_BY_HL5_ID_BUDGET_REQUEST_STATUS_ID";
//HL6
var GET_COUNT_BUDGET_SPEND_REQUEST_BY_HL6_ID_BUDGET_REQUEST_STATUS_ID = "GET_COUNT_BUDGET_SPEND_REQUEST_BY_HL6_ID_BUDGET_REQUEST_STATUS_ID";

var GET_HL5_BUDGET_APPROVER_EMAIL_BY_LEVEL_ID_USER_ID = "GET_HL5_BUDGET_APPROVER_EMAIL_BY_LEVEL_ID_USER_ID";
var GET_HL6_BUDGET_APPROVER_EMAIL_BY_LEVEL_ID_USER_ID = "GET_HL6_BUDGET_APPROVER_EMAIL_BY_LEVEL_ID_USER_ID";
var GET_REQUESTOR_EMAIL_BY_BUDGET_SPEND_REQUEST_ID = "GET_REQUESTOR_EMAIL_BY_BUDGET_SPEND_REQUEST_ID";
var GET_BUDGET_SPEND_REQUEST_BY_BUDGET_SPEND_REQUEST_ID = "GET_BUDGET_SPEND_REQUEST_BY_BUDGET_SPEND_REQUEST_ID";
var GET_OTHER_BUDGET_APPROVER_BY_OTHER_BUDGET_APPROVER_ID = "GET_OTHER_BUDGET_APPROVER_BY_OTHER_BUDGET_APPROVER_ID";
var GET_BUDGET_SPEND_REQUEST_BY_HASH = "GET_BUDGET_SPEND_REQUEST_BY_HASH";
var DEL_BUDGET_SPEND_REQUEST_OTHER_BUDGET_APPROVER = "DEL_BUDGET_SPEND_REQUEST_OTHER_BUDGET_APPROVER";
var GET_OTHER_BUDGET_APPROVERS_BY_BUDGET_SPEND_REQUEST_ID = "GET_OTHER_BUDGET_APPROVERS_BY_BUDGET_SPEND_REQUEST_ID";

var HIERARCHY_LEVEL = {
    HL2: 5,
    HL3: 4,
    HL4: 1,
    HL5: 2,
    HL6: 3
};

function getL2BudgetApproverByL2Id(l2Id, l1Id){
    var parameters = {
        in_hl2_id: l2Id
        ,in_hl1_id: l1Id
    };
    var rdo = db.executeProcedureManual(GET_L2_BUDGET_SPEND_APPROVER_BY_L2_ID, parameters);

    var result =  {
        assigned : db.extractArray(rdo.BUDGET_APPROVER_ASSIGNED),
        available: db.extractArray(rdo.BUDGET_APPROVER_AVAILABLE)
    };
    return result;
}

function insertL2BudgetApprover(l2BudgetApproverToInsert){

     return db.executeScalarManual(INS_L2_BUDGET_SPEND_APPROVER, l2BudgetApproverToInsert, 'out_hl2_user_id');
}

function deleteL2BudgetApprover(l2Id,l2BudgetApproverToDelete){
    var parameters = {
        in_l2_id: l2Id,
        in_budget_approver_id: l2BudgetApproverToDelete
    };

    return db.executeScalarManual(DEL_L2_BUDGET_SPEND_APPROVER, parameters, 'out_result');
}

function getSalesByHlIdOrganizationIdOrganizationType(arrSaleHl, level){
    var sp = "GET_" + level.toUpperCase() + "_SALES_BY_"+ level.toUpperCase() + "_ID_ORGANIZATION_ID_ORGANIZATION_TYPE"; //GET_HL5_SALES_BY_HL5_ID_ORGANIZATION_ID_ORGANIZATION_TYPE
    var rdo = db.executeProcedureManual(sp, arrSaleHl);
    return db.extractArray(rdo.out_result);
}

function insertBudgetSpendRequest(amount, hlId, level, description, requestTypeId, statusId, userId){
    var parameters = {};
    parameters.in_hl_id = hlId;
    parameters.in_hierarchy_level_id = HIERARCHY_LEVEL[level];
    parameters.in_description = description;
    parameters.in_amount = amount;
    parameters.in_budget_spend_request_status_id = statusId;
    parameters.in_budget_spend_request_type_id = requestTypeId;
    parameters.in_user_id = userId;
    return db.executeScalarManual(INS_BUDGET_SPEND_REQUEST, parameters, 'budget_spend_request_id');
}

function insertSaleBudgetSpendRequest(arrSale, level){
    var sp = "INS_"+ level.toUpperCase() +"_SALE_BUDGET_SPEND_REQUEST";//INS_HL5_SALE_BUDGET_SPEND_REQUEST
    return db.executeScalarManual(sp, arrSale, 'hl_sale_budget_spend_request_id');
}

function updateBudgetSpendRequest(arrBudgetSpendRequest){
    return db.executeScalarManual(UPD_BUDGET_SPEND_REQUEST, arrBudgetSpendRequest, 'out_result');
}

function deleteBudgetSpendRequestByPartner(arrBudgetSpendRequestToDelete){
    return db.executeScalarManual(DEL_BUDGET_SPEND_REQUEST, arrBudgetSpendRequestToDelete, 'out_result');
}

function insertBudgetSpendRequestMessage(arrBudgetSpendRequestMessage){
    return db.executeScalarManual(INS_BUDGET_SPEND_REQUEST_MESSAGE, arrBudgetSpendRequestMessage, 'budget_spend_request_message_id');
}

function updateBudgetSpendRequestMessage(arrBudgetSpendRequestMessage){
    return db.executeScalarManual(UPD_BUDGET_SPEND_REQUEST_MESSAGE, arrBudgetSpendRequestMessage, 'out_result');
}

function deleteBudgetSpendRequestBySale(arrSale, level){
    var sp = "DEL_"+ level.toUpperCase() +"_SALE_BUDGET_SPEND_REQUEST";//DEL_HL5_SALE_BUDGET_SPEND_REQUEST
    return db.executeScalarManual(sp, arrSale, 'out_result');
}

function getAllBudgetSpendRequestByHlIdAndLevel(hlId, level){
    var parameters = {};
    parameters.in_hl_id = hlId;
    parameters.in_hierarchy_level_id = HIERARCHY_LEVEL[level];
    var rdo = db.executeProcedureManual(GET_ALL_BUDGET_SPEND_REQUEST_BY_HLID_AND_LEVEL, parameters);
    return db.extractArray(rdo.out_result);
}

function getBudgetSpendRequestByBudgetSpendRequestId(budgetSpendRequestId){
    var parameters = {};
    parameters.in_budget_spend_request_id = budgetSpendRequestId;
    var rdo = db.executeProcedureManual(GET_BUDGET_SPEND_REQUEST_BY_BUDGET_SPEND_REQUEST_ID, parameters);
    return db.extractArray(rdo.out_result)[0];
}

function getHlSalesByHlId(hlId, level){
    var sp = "GET_"+level+"_SALES_BY_"+ level+"_ID";

    var parameters = {};
    parameters.in_hl_id = hlId;
    var rdo = db.executeProcedureManual(sp, parameters);
    return db.extractArray(rdo.out_result);
}

function updateBudgetSpendRequestByHlIdLevelType(hlId, level, amount, requestTypeId, statusId, userId) {
    var parameters = {
        in_hl_id: hlId
        , in_level_id: level
        , in_amount: amount
        , in_request_type_id: requestTypeId
        , in_status_id: statusId
        , in_user_id: userId
    };

    return db.executeScalarManual(UPD_BUDGET_SPEND_REQUEST_BY_HL_ID_LEVEL_TYPE, parameters, 'out_result');
}

function getHl5CountBudgetSpendRequestByBudgetRequestStatus(hl5Id, budgetRequestStatusId, hierarchyLevelId) {
    var parameters = {
        in_hl5_id: hl5Id,
        in_budget_spend_request_status_id: budgetRequestStatusId,
        in_hierarchy_level_id: hierarchyLevelId
    };

    return db.executeScalarManual(GET_COUNT_BUDGET_SPEND_REQUEST_BY_HL5_ID_BUDGET_REQUEST_STATUS_ID, parameters, 'out_result');
}

function getOtherBudgetApproversByBudgetSpendRequestId(budgetSpendRequestId){
    var rdo = db.executeProcedureManual(GET_OTHER_BUDGET_APPROVERS_BY_BUDGET_SPEND_REQUEST_ID, {in_budgetSpendRequestId: Number(budgetSpendRequestId)});
    return db.extractArray(rdo.out_result);
}

function getHl6CountBudgetSpendRequestByBudgetRequestStatus(hl6Id, budgetRequestStatusId, hierarchyLevelId) {
    var parameters = {
        in_hl6_id: hl6Id,
        in_budget_spend_request_status_id: budgetRequestStatusId,
        in_hierarchy_level_id: hierarchyLevelId
    };

    return db.executeScalarManual(GET_COUNT_BUDGET_SPEND_REQUEST_BY_HL6_ID_BUDGET_REQUEST_STATUS_ID, parameters, 'out_result');
}

function delAllBudgetSpendRequestByHlId(hl_id, userId, level){
    var parameters = {
        in_hl_id: hl_id
        , in_hierarchy_level_id: HIERARCHY_LEVEL[level]
        , in_user_id: userId
    };
    return db.executeScalarManual(DEL_ALL_BUDGET_SPEND_REQUEST_BY_HL_ID, parameters, 'out_result');
}

function delAllHlSaleBudgetSpendRequestByHlId(hl_id, userId, level){
    var sp = "DEL_"+level+"_SALE_BUDGET_SPEND_REQUEST_BY_"+level+"_ID";
    var parameters = {
        in_user_id: userId
    };
    parameters["in_" + level.toLowerCase() + "_id"] = hl_id;

    return db.executeScalarManual(sp, parameters, 'out_result');
}

function delAllBudgetSpendRequestLogStatusByHlId(hl_id, userId, level){
    var parameters = {
        in_hl_id: hl_id
        , in_hierarchy_level_id: HIERARCHY_LEVEL[level]
        , in_user_id: userId
    };
    return db.executeScalarManual(DEL_ALL_BUDGET_SPEND_REQUEST_LOG_STATUS_BY_HL_ID, parameters, 'out_result');
}

function delAllBudgetSpendRequestMessageByHlId(hl_id, userId, level){
    var parameters = {
        in_hl_id: hl_id
        , in_hierarchy_level_id: HIERARCHY_LEVEL[level]
        , in_user_id: userId
    };
    return db.executeScalarManual(DEL_BUDGET_SPEND_REQUEST_MESSAGE_BY_HL_ID, parameters, 'out_result');
}

function getOtherBudgetApproverByEmail(email){
    var rdo = db.executeProcedureManual(GET_OTHER_BUDGET_APPROVER_BY_EMAIL, {in_email: email});
    return db.extractArray(rdo.out_result)[0];
}

function insertOtherBudgetApprover(fullName, email, userId){
    var parameters = {
        in_full_name: fullName
        , in_email: email
        , in_user_id: userId
    };
    return db.executeScalarManual(INS_OTHER_BUDGET_APPROVER, parameters, 'out_result');
}

function insertBudgetSpendRequestOtherBudgetApprover(data) {
    return db.executeScalarManual(INS_BUDGET_SPEND_REQUEST_OTHER_BUDGET_APPROVER, data, 'out_result');
}

function deleteHardBudgetSpendRequestOtherBudgetApproverByBudgetSpendRequestId(budgetSpendRequestId){
    return db.executeScalarManual(DEL_HARD_BUDGET_SPEND_REQUEST_OTHER_BUDGET_APPROVER_BY_BUDGET_SPEND_REQUEST_ID, {in_budget_spend_request_id: budgetSpendRequestId}, 'out_result');
}

function getHl5BudgetApproverEmailByLevelIdUserId(statusId, userId, levelId) {
    var parameters = {
        in_excluded_status_id: statusId
        , in_user_id: userId
        , in_level_id: levelId
    };
    var rdo = db.executeProcedureManual(GET_HL5_BUDGET_APPROVER_EMAIL_BY_LEVEL_ID_USER_ID, parameters);
    return db.extractArray(rdo.out_result);
}

function getHl6BudgetApproverEmailByLevelIdUserId(statusId, userId, levelId) {
    var parameters = {
        in_excluded_status_id: statusId
        , in_user_id: userId
        , in_level_id: levelId
    };
    var rdo = db.executeProcedureManual(GET_HL6_BUDGET_APPROVER_EMAIL_BY_LEVEL_ID_USER_ID, parameters);
    return db.extractArray(rdo.out_result);
}

function getRequestorEmailByBudgetSpendRequestId(budgetSpendRequestId) {
    var parameters = {
        in_budget_spend_request_id: budgetSpendRequestId
    };
    var rdo = db.executeProcedureManual(GET_REQUESTOR_EMAIL_BY_BUDGET_SPEND_REQUEST_ID, parameters);
    return db.extractArray(rdo.out_result)[0];
}

function getOtherBudgetApproverByOtherBudgetApproverId(otherBudgetApproverId){
    var rdo = db.executeProcedureManual(GET_OTHER_BUDGET_APPROVER_BY_OTHER_BUDGET_APPROVER_ID, {in_other_budget_approver_id: otherBudgetApproverId});
    return db.extractArray(rdo.out_result)[0];
}

function getBudgetSpendRequestByHash(hash){
    var rdo = db.executeProcedureManual(GET_BUDGET_SPEND_REQUEST_BY_HASH, {in_hash: hash});
    return db.extractArray(rdo.out_result)[0];
}

function deleteBudgetSpendRequestOtherBudgetApprover(otherBudgetApprovers) {
    return db.executeScalarManual(DEL_BUDGET_SPEND_REQUEST_OTHER_BUDGET_APPROVER, {otherBudgetApprovers: otherBudgetApprovers}, 'out_result');
}