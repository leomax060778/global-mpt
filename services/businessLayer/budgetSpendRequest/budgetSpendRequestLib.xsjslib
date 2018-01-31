$.import("mktgplanningtool.services.commonLib", "mapper");
var mapper = $.mktgplanningtool.services.commonLib.mapper;
var config = mapper.getDataConfig();
var dataBudgetSpendRequest = mapper.getDataBudgetSpendRequest();
var dataBudgetReport = mapper.getDataBudgetSpendReport();
var dataHl2 = mapper.getDataLevel2();
var util = mapper.getUtil();
var budgetReportLib = mapper.getBudgetSpendReportLib();
var dataPartner = mapper.getDataPartner();
/** ***********END INCLUDE LIBRARIES*************** */
var BUDGET_SPEND_REQUEST_ORIGIN = {
    BUDGET_REQUESTOR: 1,
    BUDGET_APPROVER: 2
};

var HIERARCHY_LEVEL = {
    HL2: 5,
    HL3: 4,
    HL4: 1,
    HL5: 2,
    HL6: 3
};

var ORGANIZATION_TYPE = {
    REGIONAL: 1,
    CENTRAL: 2,
    OTHER: 3
};

var BUDGET_SPEND_REQUEST_TYPE = {
    OWN_MONEY: 1,
    CO_FUNDING_EXTERNAL: 2,
    CO_FUNDING_INTERNAL: 3
};

var BUDGET_SPEND_REQUEST_STATUS = {
    'PENDING': 1,
    'APPROVED': 2,
    'NO_LONGER_REQUESTED': 3,
    'REJECTED': 4
};

var PARTNER_TYPE = {
    EXTERNAL_PARTNER: 1,
    MDF: 2,
    INTEL: 3
};

var L2_ID_MISSING = "Team ID was not found.";
var L3_ID_MISSING = "Team ID was not found.";

var DEFAULT_DELETE_MESSAGE = "Budget Spend Request deleted by user.";
var INVALID_REQUEST_AMOUNT = "Budget Spend Request amount is invalid.";
var INVALID_INTEL_PROJECT_ID = "Budget Spend Request Intel Project ID is invalid.";
var INVALID_REQUEST_MESSAGE = "Budget Spend Request message is invalid.";

function getBudgetSpendRequestsStatus() {
    return BUDGET_SPEND_REQUEST_STATUS;
}

function getL2BudgetApproverByL2Id(l2Id) {
    if (!l2Id || !Number(l2Id))
        throw ErrorLib
            .getErrors()
            .CustomError(
                "",
                "budgetSpendRequestServices/handleGet/getL2BudgetApproverByL2Id",
                L2_ID_MISSING);

    var hl2 = dataHl2.getLevel2ById(l2Id);
    return dataBudgetSpendRequest.getL2BudgetApproverByL2Id(l2Id, hl2.HL1_ID);
}

function getL3BudgetApproverByL3Id(l3Id) {
    if (!l3Id || !Number(l3Id))
        throw ErrorLib
            .getErrors()
            .CustomError(
                "",
                "",
                L3_ID_MISSING);

    return dataBudgetSpendRequest.getL3BudgetApproverByL3Id(l3Id);
}

function insertL2BudgetApprover(l2Id, budgetApproverIds, userId) {
    if (budgetApproverIds && budgetApproverIds.length) {
        var l2BudgetApproverToInsert = budgetApproverIds.map(function (elem) {
            return {
                in_hl2_id: l2Id,
                in_budget_approver_id: elem.USER_ID,
                in_user_id: userId
            };
        });
        return dataBudgetSpendRequest
            .insertL2BudgetApprover(l2BudgetApproverToInsert);
    }
    return true;
}

function insertL3BudgetApprover(l3Id, budgetApproverIds, userId) {
    if (budgetApproverIds && budgetApproverIds.length) {
        var l3BudgetApproverToInsert = budgetApproverIds.map(function (elem) {
            return {
                in_hl3_id: l3Id,
                in_budget_approver_id: elem.USER_ID,
                in_user_id: userId
            };
        });
        return dataBudgetSpendRequest
            .insertL3BudgetApprover(l3BudgetApproverToInsert);
    }
    return true;
}

function insertOwnMoneyBudgetSpendRequest(amount, id, level, userId, budgetRequestApproved) {
    var message = 'Own money Budget Request';

    var budgetSpendRequestId = dataBudgetSpendRequest.insertBudgetSpendRequest(
        amount, id, level, message, BUDGET_SPEND_REQUEST_TYPE.OWN_MONEY,
        budgetRequestApproved ? BUDGET_SPEND_REQUEST_STATUS.APPROVED
            : BUDGET_SPEND_REQUEST_STATUS.PENDING, userId);

    /*var arrBudgetSpendRequestMessage = [];
    arrBudgetSpendRequestMessage.push({
        in_budget_spend_request_id: budgetSpendRequestId,
        in_message: message,
        in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
        in_user_id: userId
    });*/

    return 1; // dataBudgetSpendRequest.insertBudgetSpendRequestMessage(arrBudgetSpendRequestMessage,
    // level);
}

function insertSalesBudgetSpendRequest(sales, id, level, conversionValue, automaticBudgetApproval, userId) {
    var aux = {};
    var arrSaleHl = [];
    var arrBudgetSpendRequestOtherBudgetApprover = [];
    var statusId = automaticBudgetApproval ? BUDGET_SPEND_REQUEST_STATUS.APPROVED : BUDGET_SPEND_REQUEST_STATUS.PENDING;
    sales.forEach(function (sale) {
        if (!aux[sale.ORGANIZATION_ID]
            && aux[sale.ORGANIZATION_ID] != sale.ORGANIZATION_TYPE) {
            arrSaleHl
                .push({
                    in_hl_id: id,
                    in_organization_id: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE] !== 3 ? sale.ORGANIZATION_ID
                        : null,
                    in_organization_type: ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE]
                });
            aux[sale.ORGANIZATION_ID] = sale.ORGANIZATION_TYPE;
        }
    });

    // look for SALES ID
    var hlSales = dataBudgetSpendRequest.getSalesByHlIdOrganizationIdOrganizationType(arrSaleHl, level);

    arrSaleHl = [];
    var arrBudgetSpendRequestMessage = [];

    sales.forEach(function (sale) {
        if (Number(sale.AMOUNT) && sale.MESSAGE) {
            var budgetSpendRequestId = dataBudgetSpendRequest
                .insertBudgetSpendRequest(
                    Number(sale.AMOUNT) / conversionValue,
                    id,
                    level,
                    sale.MESSAGE,
                    BUDGET_SPEND_REQUEST_TYPE.CO_FUNDING_INTERNAL,
                    statusId,
                    userId);
            hlSales.forEach(function (hlSale) {
                if (hlSale.ORGANIZATION_TYPE_ID == ORGANIZATION_TYPE[sale.ORGANIZATION_TYPE]
                    && hlSale.ORGANIZATION_ID == sale.ORGANIZATION_ID) {
                    arrSaleHl
                        .push({
                            in_hl_sale_id: hlSale.HL_SALES_ID,
                            in_budget_spend_request_id: budgetSpendRequestId,
                            in_user_id: userId
                        });
                }
            });
            if (sale.OTHER_BUDGET_APPROVERS && sale.OTHER_BUDGET_APPROVERS.length) {
                sale.OTHER_BUDGET_APPROVERS.forEach(function (otherBudgetApprover) {
                    if (otherBudgetApprover.EMAIL && otherBudgetApprover.FULL_NAME) {
                        var budgetApprover = dataBudgetSpendRequest.getOtherBudgetApproverByEmail(otherBudgetApprover.EMAIL);

                        var otherBudgetApproverId = 0;
                        if (!budgetApprover || !budgetApprover.OTHER_BUDGET_APPROVER_ID)
                            otherBudgetApproverId = insertOtherBudgetApprover(otherBudgetApprover, userId);
                        else
                            otherBudgetApproverId = budgetApprover.OTHER_BUDGET_APPROVER_ID;

                        arrBudgetSpendRequestOtherBudgetApprover
                            .push({
                                in_other_budget_approver_id: otherBudgetApproverId,
                                in_budget_spend_request_id: budgetSpendRequestId,
                                in_hash: config.getHash(),
                                in_user_id: userId
                            });
                    }
                });
            }

            arrBudgetSpendRequestMessage
                .push({
                    in_budget_spend_request_id: budgetSpendRequestId,
                    in_message: sale.MESSAGE,
                    in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
                    in_user_id: userId
                });
        }
    });
    if (arrBudgetSpendRequestMessage.length)
        dataBudgetSpendRequest.insertBudgetSpendRequestMessage(arrBudgetSpendRequestMessage);

    if (arrBudgetSpendRequestOtherBudgetApprover.length) {
        dataBudgetSpendRequest.insertBudgetSpendRequestOtherBudgetApprover(arrBudgetSpendRequestOtherBudgetApprover);
        if (!automaticBudgetApproval) {
            notifyOtherBudgetApprover(arrBudgetSpendRequestOtherBudgetApprover, userId);
        }
    }

    if (arrSaleHl.length)
        return dataBudgetSpendRequest.insertSaleBudgetSpendRequest(arrSaleHl, level);

    return null;
}

function updateSalesBudgetSpendRequest(sales, id, level, conversionValue, automaticBudgetApproval, userId) {
    var arrBudgetSpendRequestToUpdate = [];
    var arrBudgetSpendRequestMessageToInsert = [];
    var arrBudgetSpendRequestMessageToUpdate = [];
    var arrBudgetSpendRequestOtherBudgetApprover = [];
    var arrSaleHl = [];
    var statusId;
    sales
        .forEach(function (sale) {
            statusId = automaticBudgetApproval ? BUDGET_SPEND_REQUEST_STATUS.APPROVED : BUDGET_SPEND_REQUEST_STATUS.PENDING;
            if (Number(sale.AMOUNT) && sale.MESSAGE) {
                var budgetSpendRequestId = sale.BUDGET_SPEND_REQUEST_ID;
                var insertMessage = false;
                if (!sale.BUDGET_SPEND_REQUEST_ID) {
                    insertMessage = true;
                    budgetSpendRequestId = dataBudgetSpendRequest
                        .insertBudgetSpendRequest(
                            Number(sale.AMOUNT) / conversionValue,
                            id,
                            level,
                            sale.MESSAGE,
                            BUDGET_SPEND_REQUEST_TYPE.CO_FUNDING_INTERNAL,
                            statusId,
                            userId);
                    arrSaleHl.push({
                        in_hl_sale_id: sales.HL5_SALE_ID || sale.HL_SALES_ID,
                        in_budget_spend_request_id: budgetSpendRequestId,
                        in_user_id: userId
                    });
                } else {
                    var budgetSpendRequestList = getHlSalesByHlId(id, level);
                    var budgetSpendRequest = getBudgetRequestByIdFromList(sale.BUDGET_SPEND_REQUEST_ID, budgetSpendRequestList);
                    if (budgetSpendRequest.length) {
                        budgetSpendRequest = budgetSpendRequest[0];
                    }

                    if (budgetSpendRequest && (Number(sale.AMOUNT) / conversionValue).toFixed(2) != Number(budgetSpendRequest.AMOUNT).toFixed(2)) {
                        insertMessage = true;
                    } else {
                        statusId = budgetSpendRequest.BUDGET_SPEND_REQUEST_STATUS_ID
                    }
                    if(insertMessage || (statusId == BUDGET_SPEND_REQUEST_STATUS.PENDING && sale.MESSAGE != budgetSpendRequest.MESSAGE)) {
                        arrBudgetSpendRequestToUpdate.push({
                            in_budget_spend_request_id: budgetSpendRequestId,
                            in_amount: Number(sale.AMOUNT) / conversionValue,
                            in_message: sale.MESSAGE,
                            in_budget_spend_request_status_id: statusId,
                            in_user_id: userId
                        });
                    }
                }

                var otherBudgetApprovers = [];
                if (insertMessage && arrBudgetSpendRequestToUpdate.length) {
                    if (sale.OTHER_BUDGET_APPROVERS && sale.OTHER_BUDGET_APPROVERS.length) {
                        sale.OTHER_BUDGET_APPROVERS.forEach(function (otherBudgetApprover) {
                            if (otherBudgetApprover.FULL_NAME && otherBudgetApprover.EMAIL) {

                                var budgetApprover = dataBudgetSpendRequest.getOtherBudgetApproverByEmail(otherBudgetApprover.EMAIL);

                                var otherBudgetApproverId = 0;
                                if (!budgetApprover || !budgetApprover.OTHER_BUDGET_APPROVER_ID) {
                                    otherBudgetApproverId = insertOtherBudgetApprover(otherBudgetApprover, userId);
                                }
                                else {
                                    otherBudgetApproverId = budgetApprover.OTHER_BUDGET_APPROVER_ID;
                                }

                                arrBudgetSpendRequestOtherBudgetApprover
                                    .push({
                                        in_other_budget_approver_id: otherBudgetApproverId,
                                        in_budget_spend_request_id: budgetSpendRequestId,
                                        in_hash: config.getHash(),
                                        in_user_id: userId
                                    });

                                otherBudgetApprovers.push({
                                        in_other_budget_approver_id: otherBudgetApproverId,
                                        in_budget_spend_request_id: budgetSpendRequestId
                                    }
                                );
                            }
                        });
                    }
                }
                else {
                    var otherBudgetApproversEmail = dataBudgetSpendRequest.getOtherBudgetApproversByBudgetSpendRequestId(budgetSpendRequestId);
                    if (sale.OTHER_BUDGET_APPROVERS && sale.OTHER_BUDGET_APPROVERS.length) {
                        sale.OTHER_BUDGET_APPROVERS.forEach(function (otherBudgetApprover) {
                            if (otherBudgetApprover.FULL_NAME && otherBudgetApprover.EMAIL) {
                                var ba = otherBudgetApproversEmail.filter(function (elem) {
                                    return elem.EMAIL == otherBudgetApprover.EMAIL;
                                });

                                if (!ba.length) {
                                    var otherBudgetApproverId = insertOtherBudgetApprover(otherBudgetApprover, userId);

                                    arrBudgetSpendRequestOtherBudgetApprover
                                        .push({
                                            in_other_budget_approver_id: otherBudgetApproverId,
                                            in_budget_spend_request_id: budgetSpendRequestId,
                                            in_hash: config.getHash(),
                                            in_user_id: userId
                                        });

                                    otherBudgetApprovers.push({
                                            in_other_budget_approver_id: otherBudgetApproverId,
                                            in_budget_spend_request_id: budgetSpendRequestId
                                        }
                                    );
                                }
                            }
                        });
                    }
                }


                if (otherBudgetApprovers.length)
                    dataBudgetSpendRequest.deleteBudgetSpendRequestOtherBudgetApprover(otherBudgetApprovers);

                var message = {
                    in_budget_spend_request_id: budgetSpendRequestId,
                    in_message: sale.MESSAGE,
                    in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
                    in_user_id: userId
                };

                if (insertMessage) {
                    arrBudgetSpendRequestMessageToInsert.push(message);
                } else {
                    arrBudgetSpendRequestMessageToUpdate.push(message);
                }
            }
        });
    if (arrBudgetSpendRequestToUpdate.length)
        dataBudgetSpendRequest
            .updateBudgetSpendRequest(arrBudgetSpendRequestToUpdate);

    if (arrBudgetSpendRequestOtherBudgetApprover.length) {
        dataBudgetSpendRequest.insertBudgetSpendRequestOtherBudgetApprover(arrBudgetSpendRequestOtherBudgetApprover);
        notifyOtherBudgetApprover(arrBudgetSpendRequestOtherBudgetApprover, userId);
    }

    if (arrBudgetSpendRequestMessageToInsert.length)
        dataBudgetSpendRequest
            .insertBudgetSpendRequestMessage(arrBudgetSpendRequestMessageToInsert);

    if (arrBudgetSpendRequestMessageToUpdate.length)
        dataBudgetSpendRequest
            .updateBudgetSpendRequestMessage(arrBudgetSpendRequestMessageToUpdate);

    if (arrSaleHl.length)
        dataBudgetSpendRequest.insertSaleBudgetSpendRequest(arrSaleHl, level);
    return 1;
}

function insertPartnerBudgetSpendRequest(value, message, id, level, conversionValue, automaticBudgetApproval, userId) {
    var arrBudgetSpendRequestMessage = [];
    var statusId = automaticBudgetApproval ? BUDGET_SPEND_REQUEST_STATUS.APPROVED : BUDGET_SPEND_REQUEST_STATUS.PENDING;
    var budgetSpendRequestId = dataBudgetSpendRequest.insertBudgetSpendRequest(
        value / conversionValue, id, level, message || '',
        BUDGET_SPEND_REQUEST_TYPE.CO_FUNDING_EXTERNAL,
        statusId, userId);

    if (message && message.trim()) {
        arrBudgetSpendRequestMessage
            .push({
                in_budget_spend_request_id: budgetSpendRequestId,
                in_message: message,
                in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
                in_user_id: userId
            });

        dataBudgetSpendRequest
            .insertBudgetSpendRequestMessage(arrBudgetSpendRequestMessage);
    }

    return budgetSpendRequestId;
}

function updatePartnerBudgetSpendRequest(budgetSpendRequest, id, level, automaticBudgetApproval, userId) {

    var arrBudgetSpendRequestMessageToUpdate = [];
    var updateMessage = false;
    var statusId = automaticBudgetApproval ? BUDGET_SPEND_REQUEST_STATUS.APPROVED : BUDGET_SPEND_REQUEST_STATUS.PENDING;
    var budgetSpendRequestList = level == 'HL5' ? dataPartner.getPartnerByHl5Id(id, HIERARCHY_LEVEL.HL5).out_result : dataPartner.getPartnerByHl6Id(id);
    var arrBudgetSpendRequestToUpdate = [];
    
    budgetSpendRequest.forEach(function (request) {
            var budgetSpendRequest = getBudgetRequestByIdFromList(request.in_budget_spend_request_id, budgetSpendRequestList);
            if (budgetSpendRequest.length) {
                budgetSpendRequest = budgetSpendRequest[0];
            }

            if (budgetSpendRequest && Number(request.in_amount).toFixed(2) != Number(budgetSpendRequest.VALUE).toFixed(2)) {
                updateMessage = true;
            } else {
                statusId = budgetSpendRequest.BUDGET_SPEND_REQUEST_STATUS_ID
            }

            if(updateMessage || (statusId == BUDGET_SPEND_REQUEST_STATUS.PENDING && request.in_message != budgetSpendRequest.MESSAGE)) {
                arrBudgetSpendRequestToUpdate.push({
                    in_budget_spend_request_id: request.in_budget_spend_request_id,
                    in_amount: request.in_amount,
                    in_message: (request.in_message != budgetSpendRequest.MESSAGE) ? request.in_message || "" : budgetSpendRequest.MESSAGE,
                    in_budget_spend_request_status_id: statusId,
                    in_user_id: userId
                });

                arrBudgetSpendRequestMessageToUpdate.push({
                    in_budget_spend_request_id: request.in_budget_spend_request_id,
                    in_message: (request.in_message != budgetSpendRequest.MESSAGE) ? request.in_message || "" : budgetSpendRequest.MESSAGE,
                    in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
                    in_user_id: userId
                });
            }

    });

    if (arrBudgetSpendRequestToUpdate.length) {
        dataBudgetSpendRequest.updateBudgetSpendRequestMessage(arrBudgetSpendRequestMessageToUpdate);
        dataBudgetSpendRequest.updateBudgetSpendRequest(arrBudgetSpendRequestToUpdate)
    }

    return true;
}

function deleteBudgetSpendRequestBySale(arrSaleToDelete, level) {
    var aux = JSON.parse(JSON.stringify(arrSaleToDelete));
    deleteBudgetSpendRequest(arrSaleToDelete);
    return dataBudgetSpendRequest
        .deleteBudgetSpendRequestBySale(aux, level);
}

function deleteBudgetSpendRequest(budgetSpendRequests) {
    var arrBudgetSpendRequestMessageToInsert = budgetSpendRequests
        .map(function (request) {
            return {
                in_budget_spend_request_id: request.in_budget_spend_request_id,
                in_message: DEFAULT_DELETE_MESSAGE,
                in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
                in_user_id: request.in_user_id
            }
        });

    dataBudgetSpendRequest
        .insertBudgetSpendRequestMessage(arrBudgetSpendRequestMessageToInsert);

    budgetSpendRequests.forEach(function (bsr) {
        bsr.in_status_id = BUDGET_SPEND_REQUEST_STATUS.NO_LONGER_REQUESTED;
    });

    return dataBudgetReport.deleteBudgetSpendRequest(budgetSpendRequests);
}

function deleteL2BudgetApprover(l2Id, budgetApproverIds) {
    var l2BudgetApproverToDelete = [];
    budgetApproverIds.forEach(function (elem) {
        l2BudgetApproverToDelete.push({
            in_user_id: elem.USER_ID
        });
    });

    return dataBudgetSpendRequest.deleteL2BudgetApprover(l2Id,
        l2BudgetApproverToDelete);
}

function deleteL3BudgetApprover(l3Id, budgetApproverIds) {
    var l3BudgetApproverToDelete = [];
    budgetApproverIds.forEach(function (elem) {
        l3BudgetApproverToDelete.push({
            in_user_id: elem.USER_ID
        });
    });

    return dataBudgetSpendRequest.deleteL3BudgetApprover(l3Id,
        l3BudgetApproverToDelete);
}

function validateApprovers(listApprovers) {
    var approvers = dataBudgetSpendRequest.getAllApprovers();
}

function checkCountBudgetSpendRequestByHlIdLevel(hlId, level) {
    var budgetSpendRequests = dataBudgetSpendRequest
        .getAllBudgetSpendRequestByHlIdAndLevel(hlId, level);

    var countCoFundingRequest = 0;
    budgetSpendRequests
        .forEach(function (request) {
            if (request.BUDGET_SPEND_REQUEST_TYPE_ID != BUDGET_SPEND_REQUEST_TYPE.OWN_MONEY
                && request.BUDGET_SPEND_REQUEST_STATUS_ID != BUDGET_SPEND_REQUEST_STATUS.NO_LONGER_REQUESTED
                && request.BUDGET_SPEND_REQUEST_STATUS_ID != BUDGET_SPEND_REQUEST_STATUS.REJECTED)
                countCoFundingRequest = +1;
        });
    return !!countCoFundingRequest;
}

function countApprovedCoFundedBudgetSpendRequestByHlIdLevel(hlId, level) {
    var budgetSpendRequests = dataBudgetSpendRequest
        .getAllBudgetSpendRequestByHlIdAndLevel(hlId, level);

    var countCoFundingRequest = 0;
    budgetSpendRequests
        .forEach(function (request) {
            if (request.BUDGET_SPEND_REQUEST_TYPE_ID != BUDGET_SPEND_REQUEST_TYPE.OWN_MONEY
                && request.BUDGET_SPEND_REQUEST_STATUS_ID == BUDGET_SPEND_REQUEST_STATUS.APPROVED) {
                countCoFundingRequest = +1;
            }
        });
    return !!countCoFundingRequest;
}

function getOwnMoneyBudgetSpendRequestStatusByHlIdLevel(hlId, level) {
    var budgetSpendRequests = dataBudgetSpendRequest
        .getAllBudgetSpendRequestByHlIdAndLevel(hlId, level);

    var budgetSpendRequestType = null;
    budgetSpendRequests
        .forEach(function (request) {
            if (request.BUDGET_SPEND_REQUEST_TYPE_ID == BUDGET_SPEND_REQUEST_TYPE.OWN_MONEY)
                budgetSpendRequestType = request.BUDGET_SPEND_REQUEST_STATUS_ID;
        });

    return budgetSpendRequestType;
}

function updateOwnMoneyBudgetSpendRequestByHlIdLevel(hlId, level, amount, budgetRequestApproved, userId) {
    return dataBudgetSpendRequest.updateBudgetSpendRequestByHlIdLevelType(hlId,
        HIERARCHY_LEVEL[level], amount, BUDGET_SPEND_REQUEST_TYPE.OWN_MONEY,
        budgetRequestApproved ? BUDGET_SPEND_REQUEST_STATUS.APPROVED
            : BUDGET_SPEND_REQUEST_STATUS.PENDING, userId);
}

function setOwnMoneyBudgetSpendRequestNoLongerNeededByHlIdLevel(hlId, level, amount, userId) {
    return dataBudgetSpendRequest.updateBudgetSpendRequestByHlIdLevelType(hlId,
        HIERARCHY_LEVEL[level], amount, BUDGET_SPEND_REQUEST_TYPE.OWN_MONEY
        , BUDGET_SPEND_REQUEST_STATUS['NO_LONGER_REQUESTED'], userId);
}

function countPendingBudgetRequestByHl5Id(hl5Id) {
    if (!hl5Id)
        throw ErrorLib
            .getErrors()
            .BadRequest(
                "The HL5 ID was not found",
                "budgetSpendRequestServices/handleGet/getPendingBudgetRequestByHl5Id",
                L5_MSG_INITIATIVE_NOT_FOUND);

    try {
        return dataBudgetSpendRequest
            .getHl5CountBudgetSpendRequestByBudgetRequestStatus(hl5Id,
                BUDGET_SPEND_REQUEST_STATUS['PENDING'], HIERARCHY_LEVEL['HL5']);
    } catch (e) {
        throw e;
    }
}

function countApprovedBudgetRequestByHl5Id(hl5Id) {
    if (!hl5Id)
        throw ErrorLib
            .getErrors()
            .BadRequest(
                "The HL5 ID was not found",
                "budgetSpendRequestServices/handleGet/getPendingBudgetRequestByHl5Id",
                L5_MSG_INITIATIVE_NOT_FOUND);

    try {
        return dataBudgetSpendRequest
            .getHl5CountBudgetSpendRequestByBudgetRequestStatus(hl5Id,
                BUDGET_SPEND_REQUEST_STATUS['APPROVED'], HIERARCHY_LEVEL['HL5']);
    } catch (e) {
        throw e;
    }
}

function countPendingBudgetRequestByHl6Id(hl6Id) {
    if (!hl6Id)
        throw ErrorLib
            .getErrors()
            .BadRequest(
                "The HL6 ID was not found",
                "budgetSpendRequestServices/handleGet/getPendingBudgetRequestByHl6Id",
                L6_MSG_INITIATIVE_NOT_FOUND);

    try {
        return dataBudgetSpendRequest
            .getHl6CountBudgetSpendRequestByBudgetRequestStatus(hl6Id,
                BUDGET_SPEND_REQUEST_STATUS['PENDING'], HIERARCHY_LEVEL['HL6']);
    } catch (e) {
        throw e;
    }
}

function countApprovedBudgetRequestByHl6Id(hl6Id) {
    if (!hl6Id)
        throw ErrorLib
            .getErrors()
            .BadRequest(
                "The HL6 ID was not found",
                "budgetSpendRequestServices/handleGet/getPendingBudgetRequestByHl6Id",
                L6_MSG_INITIATIVE_NOT_FOUND);

    try {
        return dataBudgetSpendRequest
            .getHl6CountBudgetSpendRequestByBudgetRequestStatus(hl6Id,
                BUDGET_SPEND_REQUEST_STATUS['APPROVED'], HIERARCHY_LEVEL['HL6']);
    } catch (e) {
        throw e;
    }
}

function setBudgetSpendRequestStatusNoLongerRequested(hlId, level, userId, preserveOwnMoney) {
    return setBudgetSpendRequestStatus(hlId, level, userId, BUDGET_SPEND_REQUEST_STATUS.NO_LONGER_REQUESTED, preserveOwnMoney);
}

function disableCoFundedBudgetSpendRequests(hlId, level, userId) {
    return setBudgetSpendRequestStatus(hlId, level, userId, BUDGET_SPEND_REQUEST_STATUS.NO_LONGER_REQUESTED, true);
}

function setBudgetSpendRequestStatus(hlId, level, userId, status, preserveOwnMoney) {
    var budgetSpendRequests;
    if (preserveOwnMoney) {
        budgetSpendRequests = dataBudgetSpendRequest
            .getCoFundedBudgetSpendRequestByHlIdAndLevel(hlId, level);
    } else {
        budgetSpendRequests = dataBudgetSpendRequest
            .getAllBudgetSpendRequestByHlIdAndLevel(hlId, level);
    }

    var arrBudgSpendStatus = [];
    var arrBudgSpendStatusLog = [];
    var arrBudgetSpendRequestMessage = [];

    budgetSpendRequests.forEach(function (request) {
        arrBudgSpendStatus.push({
            in_budget_spend_request_id: request.BUDGET_SPEND_REQUEST_ID
            , in_status_id: status
            , in_user_id: userId
        });
        arrBudgetSpendRequestMessage.push({
            in_budget_spend_request_id: request.BUDGET_SPEND_REQUEST_ID,
            in_message: DEFAULT_DELETE_MESSAGE,
            in_budget_spend_request_origin_id: BUDGET_SPEND_REQUEST_ORIGIN.BUDGET_REQUESTOR,
            in_user_id: userId
        });

        arrBudgSpendStatusLog.push({
            in_budget_spend_request_id: request.BUDGET_SPEND_REQUEST_ID
            , in_status_id: request.BUDGET_SPEND_REQUEST_STATUS_ID
            , in_created_user_id: userId
            , in_other_budget_approver_id: request.BUDGET_SPEND_REQUEST_OTHER_BUDGET_APPROVER || null
        });
    });


    if (arrBudgSpendStatus.length) {
        dataBudgetReport.insertBudgetSpendRequestStatusLog(arrBudgSpendStatusLog);
        dataBudgetSpendRequest.insertBudgetSpendRequestMessage(arrBudgetSpendRequestMessage);
        dataBudgetReport.deleteBudgetSpendRequest(arrBudgSpendStatus);
    }
    return true;
}

function insertOtherBudgetApprover(otherBudgetApprover, userId) {
    return dataBudgetSpendRequest.insertOtherBudgetApprover(otherBudgetApprover.FULL_NAME, otherBudgetApprover.EMAIL, userId);
}

function getHlSalesByHlId(id, level) {
    var saleRequests = JSON.parse(JSON.stringify(dataBudgetSpendRequest.getHlSalesByHlId(id, level)));
    var result = {};

    saleRequests.forEach(function (request) {
        request.AMOUNT = Number(request.AMOUNT).toFixed(2);
        if (request.FULL_NAME && request.EMAIL) {
            if (result[request.BUDGET_SPEND_REQUEST_ID]) {
                result[request.BUDGET_SPEND_REQUEST_ID].OTHER_BUDGET_APPROVERS.push({
                    FULL_NAME: request.FULL_NAME,
                    EMAIL: request.EMAIL
                });
            } else {
                result[request.BUDGET_SPEND_REQUEST_ID] = JSON.parse(JSON.stringify(request));
                result[request.BUDGET_SPEND_REQUEST_ID].OTHER_BUDGET_APPROVERS = [{
                    FULL_NAME: request.FULL_NAME,
                    EMAIL: request.EMAIL,
                    OTHER_BUDGET_APPROVER_ID: request.OTHER_BUDGET_APPROVER_ID
                }];
            }
        } else {
            result[request.BUDGET_SPEND_REQUEST_ID] = request;
        }
    });
    return util.objectToArray(result);
}

function notifyOtherBudgetApprover(arrBudgetSpendRequestOtherBudgetApprover, userId) {
    var appUrl = config.getAppUrl();
    arrBudgetSpendRequestOtherBudgetApprover.forEach(function (elem) {
        var link = '<p>A budget spend request has been created and needs your approval. Please follow the link: </p>';
        link += '<p>' + appUrl + '/#BudgetSpendRequestManagement/' + elem.in_hash + '</p>';
        var budgetApprover = dataBudgetSpendRequest.getOtherBudgetApproverByOtherBudgetApproverId(elem.in_other_budget_approver_id);
        var budgetRequest = dataBudgetSpendRequest.getBudgetSpendRequestByBudgetSpendRequestId(elem.in_budget_spend_request_id);
        var mailObject = {
            BUDGET_SPEND_REQUEST_ID: elem.in_budget_spend_request_id
            , HL5_ID: budgetRequest.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL5 ? budgetRequest.HL_ID : undefined
            , HL6_ID: budgetRequest.HIERARCHY_LEVEL_ID == HIERARCHY_LEVEL.HL6 ? budgetRequest.HL_ID : undefined
            , RECIPIENTS: [{address: budgetApprover.EMAIL}]
            , NOTE: link
        };

        budgetReportLib.sendBudgetSpendRequestInformationByEmail(mailObject, userId);
    });
}

function validateExternalCofunding(data) {
    data.forEach(function (partner) {
        if (!partner.AMOUNT || !partner.AMOUNT.trim() || !Number(partner.AMOUNT.trim()))
            throw ErrorLib.getErrors().CustomError("", "budgetSpendRequestServices/handlePost/validateExternalCoFunding", INVALID_REQUEST_AMOUNT);

        if (PARTNER_TYPE.INTEL == partner.PARTNER_TYPE_ID && !partner.INTEL_PROJECT_ID.trim()) {
            throw ErrorLib.getErrors().CustomError("", "budgetSpendRequestServices/handlePost/validateExternalCoFunding", INVALID_INTEL_PROJECT_ID);
        }
    });
    return true;
}

function validateInternalCofunding(data) {
    data.forEach(function (saleRequest) {
        if (!saleRequest.AMOUNT || !saleRequest.AMOUNT.trim() || !Number(saleRequest.AMOUNT.trim()))
            throw ErrorLib.getErrors().CustomError("", "budgetSpendRequestServices/handlePost/validateInternalCoFunding", INVALID_REQUEST_AMOUNT);

        if (!saleRequest.MESSAGE.trim()) {
            throw ErrorLib.getErrors().CustomError("", "budgetSpendRequestServices/handlePost/validateInternalCoFunding", INVALID_REQUEST_MESSAGE);
        }
    });
    return true;
}

function getBudgetRequestByIdFromList(budgetSpendRequestId, budgetSpendRequestList) {
    var budgetSpendRequest = null;

    budgetSpendRequest = budgetSpendRequestList.filter(function (elem) {
        return elem.BUDGET_SPEND_REQUEST_ID == budgetSpendRequestId;
    });

    return budgetSpendRequest;

}